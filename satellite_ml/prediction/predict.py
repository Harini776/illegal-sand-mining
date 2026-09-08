import os
import tensorflow as tf
import numpy as np
from PIL import Image


# Configuration
IMG_SIZE = 128


# Get satellite_ml folder path
BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


# Model path
MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "sand_mining_model.keras"
)


# Load trained model
model = tf.keras.models.load_model(
    MODEL_PATH
)


def predict_image(image_path):

    # Open image
    image = Image.open(
        image_path
    ).convert("RGB")


    # Resize image
    image = image.resize(
        (IMG_SIZE, IMG_SIZE)
    )


    # Convert image to NumPy array
    image_array = np.array(
        image
    )


    # Add batch dimension
    image_array = np.expand_dims(
        image_array,
        axis=0
    )


    # Get model prediction
    prediction = float(
        model.predict(
            image_array,
            verbose=0
        )[0][0]
    )


    # Dataset class mapping
    # mining = 0
    # normal = 1
    #
    # Sigmoid output represents NORMAL probability

    normal_probability = prediction

    mining_probability = 1 - prediction


    # Convert probabilities to percentage
    normal_percentage = (
        normal_probability * 100
    )

    mining_percentage = (
        mining_probability * 100
    )


    # Decide final result
    if mining_probability >= 0.5:

        result = "MINING"
        confidence = mining_probability

    else:

        result = "NORMAL"
        confidence = normal_probability


    # Calculate risk level
    if mining_probability >= 0.70:

        risk = "HIGH"

    elif mining_probability >= 0.40:

        risk = "MEDIUM"

    else:

        risk = "LOW"


    # Return complete prediction result
    return {

        "result": result,

        "confidence": round(
            confidence * 100,
            2
        ),

        "mining_probability": round(
            mining_percentage,
            2
        ),

        "normal_probability": round(
            normal_percentage,
            2
        ),

        # Score for Risk Engine
        "satelliteScore": round(
            mining_percentage,
            2
        ),

        "risk": risk
    }