from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

import tensorflow as tf
import numpy as np
from PIL import Image

import cv2
import io
import base64


# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="Illegal Sand Mining Detection API"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# LOAD TRAINED TENSORFLOW MODEL
# =========================================================

model = tf.keras.models.load_model(
    "models/sand_mining_model.keras"
)

IMG_SIZE = 128


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "message": "Illegal Sand Mining Detection API is running"
    }


# =========================================================
# PROCESS IMAGE FOR TENSORFLOW
# =========================================================

def process_image(contents):

    image = Image.open(
        io.BytesIO(contents)
    ).convert("RGB")

    image = image.resize(
        (IMG_SIZE, IMG_SIZE)
    )

    image_array = np.array(
        image,
        dtype=np.float32
    )

    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    return image_array


# =========================================================
# TENSORFLOW PREDICTION
# =========================================================

def get_prediction(image_array):

    prediction = float(
        model.predict(
            image_array,
            verbose=0
        )[0][0]
    )

    # Dataset mapping:
    # mining = 0
    # normal = 1

    normal_probability = prediction
    mining_probability = 1 - prediction


    # -----------------------------------------------------
    # RESULT
    # -----------------------------------------------------

    if mining_probability >= 0.5:

        result = "MINING"
        confidence = mining_probability

    else:

        result = "NORMAL"
        confidence = normal_probability


    # -----------------------------------------------------
    # SATELLITE RISK
    # -----------------------------------------------------

    if mining_probability >= 0.70:

        risk = "HIGH"

    elif mining_probability >= 0.40:

        risk = "MEDIUM"

    else:

        risk = "LOW"


    # -----------------------------------------------------
    # RETURN PREDICTION
    # -----------------------------------------------------

    return {
        "result": result,

        "confidence": round(
            confidence * 100,
            2
        ),

        "mining_probability": round(
            mining_probability * 100,
            2
        ),

        "normal_probability": round(
            normal_probability * 100,
            2
        ),

        # Integration score
        # For the prototype:
        # Satellite Score = Mining Probability
        "satelliteScore": round(
            mining_probability * 100,
            2
        ),

        "risk": risk
    }


# =========================================================
# FEATURE 1
# SINGLE IMAGE PREDICTION
# =========================================================

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):

    contents = await file.read()

    image_array = process_image(
        contents
    )

    result = get_prediction(
        image_array
    )

    return result


# =========================================================
# FEATURE 2
# BEFORE AND AFTER IMAGE COMPARISON
# =========================================================

@app.post("/detect-change")
async def detect_change(

    before_image: UploadFile = File(...),

    after_image: UploadFile = File(...)

):

    # -----------------------------------------------------
    # READ IMAGES
    # -----------------------------------------------------

    before_contents = await before_image.read()

    after_contents = await after_image.read()


    # -----------------------------------------------------
    # OPEN IMAGES
    # -----------------------------------------------------

    before_pil = Image.open(
        io.BytesIO(before_contents)
    ).convert("RGB")

    after_pil = Image.open(
        io.BytesIO(after_contents)
    ).convert("RGB")


    # -----------------------------------------------------
    # CONVERT TO NUMPY
    # -----------------------------------------------------

    before = np.array(
        before_pil
    )

    after = np.array(
        after_pil
    )


    # -----------------------------------------------------
    # MAKE SAME SIZE
    # -----------------------------------------------------

    height = min(
        before.shape[0],
        after.shape[0]
    )

    width = min(
        before.shape[1],
        after.shape[1]
    )


    before = cv2.resize(
        before,
        (width, height)
    )

    after = cv2.resize(
        after,
        (width, height)
    )


    # -----------------------------------------------------
    # CONVERT RGB → GRAYSCALE
    # -----------------------------------------------------

    before_gray = cv2.cvtColor(
        before,
        cv2.COLOR_RGB2GRAY
    )

    after_gray = cv2.cvtColor(
        after,
        cv2.COLOR_RGB2GRAY
    )


    # -----------------------------------------------------
    # REDUCE NOISE
    # -----------------------------------------------------

    before_blur = cv2.GaussianBlur(
        before_gray,
        (5, 5),
        0
    )

    after_blur = cv2.GaussianBlur(
        after_gray,
        (5, 5),
        0
    )


    # -----------------------------------------------------
    # FIND DIFFERENCE
    # -----------------------------------------------------

    difference = cv2.absdiff(
        before_blur,
        after_blur
    )


    # -----------------------------------------------------
    # THRESHOLD
    # -----------------------------------------------------

    _, threshold = cv2.threshold(
        difference,
        30,
        255,
        cv2.THRESH_BINARY
    )


    # -----------------------------------------------------
    # MORPHOLOGICAL PROCESSING
    # -----------------------------------------------------

    kernel = np.ones(
        (5, 5),
        np.uint8
    )

    threshold = cv2.morphologyEx(
        threshold,
        cv2.MORPH_CLOSE,
        kernel
    )

    threshold = cv2.dilate(
        threshold,
        kernel,
        iterations=1
    )


    # -----------------------------------------------------
    # CALCULATE CHANGE PERCENTAGE
    # -----------------------------------------------------

    changed_pixels = np.count_nonzero(
        threshold
    )

    total_pixels = (
        threshold.shape[0]
        * threshold.shape[1]
    )

    change_percentage = (
        changed_pixels
        / total_pixels
    ) * 100


    # -----------------------------------------------------
    # CHANGE STATUS
    # -----------------------------------------------------

    if change_percentage >= 10:

        change_status = "SIGNIFICANT CHANGE"

    elif change_percentage >= 3:

        change_status = "MODERATE CHANGE"

    else:

        change_status = "MINOR CHANGE"


    # -----------------------------------------------------
    # GET MINING PREDICTION FOR AFTER IMAGE
    # -----------------------------------------------------

    after_image_array = process_image(
        after_contents
    )

    prediction_result = get_prediction(
        after_image_array
    )


    # -----------------------------------------------------
    # CREATE HIGHLIGHTED IMAGE
    # -----------------------------------------------------

    highlighted_image = after.copy()


    # -----------------------------------------------------
    # FIND CONTOURS
    # -----------------------------------------------------

    contours, _ = cv2.findContours(
        threshold,
        cv2.RETR_EXTERNAL,
        cv2.CHAIN_APPROX_SIMPLE
    )


    for contour in contours:

        area = cv2.contourArea(
            contour
        )

        # Ignore very small regions
        if area > 500:

            cv2.drawContours(
                highlighted_image,
                [contour],
                -1,
                (255, 0, 0),
                3
            )


    # -----------------------------------------------------
    # ADD TRANSPARENT HIGHLIGHT
    # -----------------------------------------------------

    overlay = highlighted_image.copy()

    overlay[
        threshold > 0
    ] = [255, 0, 0]


    highlighted_image = cv2.addWeighted(
        highlighted_image,
        0.75,
        overlay,
        0.25,
        0
    )


    # -----------------------------------------------------
    # CONVERT IMAGE TO PNG
    # -----------------------------------------------------

    success, buffer = cv2.imencode(
        ".png",
        cv2.cvtColor(
            highlighted_image,
            cv2.COLOR_RGB2BGR
        )
    )


    if not success:

        return {
            "error": "Could not generate highlighted image"
        }


    # -----------------------------------------------------
    # BASE64 IMAGE
    # -----------------------------------------------------

    highlighted_base64 = base64.b64encode(
        buffer
    ).decode("utf-8")


    # -----------------------------------------------------
    # FINAL RESPONSE
    # -----------------------------------------------------

    return {

        "change_status": change_status,

        "change_percentage": round(
            change_percentage,
            2
        ),

        "mining_probability": prediction_result[
            "mining_probability"
        ],

        "satelliteScore": prediction_result[
            "satelliteScore"
        ],

        "risk_level": prediction_result[
            "risk"
        ],

        "before_result": "BEFORE IMAGE",

        "after_result": prediction_result[
            "result"
        ],

        "highlighted_image":
            "data:image/png;base64,"
            + highlighted_base64
    }