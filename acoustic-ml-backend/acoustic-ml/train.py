import os
import random
import numpy as np
import joblib

from features import extract_features
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)


# ==========================================
# RANDOM SEED
# ==========================================

random.seed(42)


# ==========================================
# PATH CONFIGURATION
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

DATASET_PATH = os.path.join(BASE_DIR, "dataset")

MODELS_PATH = os.path.join(BASE_DIR, "models")

SAMPLES_PER_CLASS = 160


# ==========================================
# GET ALL WAV FILES
# ==========================================

def get_wav_files(folder):

    files = []

    if not os.path.exists(folder):
        print(f"Folder not found: {folder}")
        return files

    for root, dirs, filenames in os.walk(folder):

        for filename in filenames:

            if filename.lower().endswith(".wav"):

                files.append(
                    os.path.join(root, filename)
                )

    return files


# ==========================================
# NORMAL AUDIO
# ==========================================

normal_folder = os.path.join(
    DATASET_PATH,
    "normal"
)

normal_files = get_wav_files(normal_folder)

random.shuffle(normal_files)

normal_files = normal_files[
    :SAMPLES_PER_CLASS
]


# ==========================================
# VEHICLE AUDIO
# ==========================================

vehicle_folder = os.path.join(
    DATASET_PATH,
    "vehicle"
)

vehicle_files = get_wav_files(vehicle_folder)

random.shuffle(vehicle_files)

vehicle_files = vehicle_files[
    :SAMPLES_PER_CLASS
]


# ==========================================
# HEAVY MACHINERY AUDIO
# ==========================================

heavy_files = []

machinery_types = [

    "bulldozer",
    "cylinder",
    "dump_truck",
    "excavator",
    "grader",
    "loader",
    "mixer_truck"

]


for machinery_type in machinery_types:

    folder = os.path.join(

        DATASET_PATH,
        "heavy_machinery",
        machinery_type

    )

    files = get_wav_files(folder)

    random.shuffle(files)

    # Take maximum 23 files
    heavy_files.extend(
        files[:23]
    )


# Maximum 160 samples
random.shuffle(heavy_files)

heavy_files = heavy_files[
    :SAMPLES_PER_CLASS
]


# ==========================================
# DATASET CHECK
# ==========================================

print("\n=================================")
print("DATASET INFORMATION")
print("=================================")

print(
    "NORMAL files:",
    len(normal_files)
)

print(
    "VEHICLE files:",
    len(vehicle_files)
)

print(
    "HEAVY MACHINERY files:",
    len(heavy_files)
)


# Check if data exists
if len(normal_files) == 0:

    raise Exception(
        "No NORMAL audio files found"
    )


if len(vehicle_files) == 0:

    raise Exception(
        "No VEHICLE audio files found"
    )


if len(heavy_files) == 0:

    raise Exception(
        "No HEAVY MACHINERY audio files found"
    )


# ==========================================
# FEATURE EXTRACTION FUNCTION
# ==========================================

def process_files(files, label):

    X = []
    y = []

    total = len(files)

    for i, file_path in enumerate(
        files,
        start=1
    ):

        try:

            features = extract_features(
                file_path
            )

            X.append(
                features
            )

            y.append(
                label
            )

        except Exception as e:

            print(
                f"Error processing {file_path}"
            )

            print(e)


        if i % 20 == 0 or i == total:

            print(
                f"Processing {label}: "
                f"{i}/{total}"
            )


    return X, y


# ==========================================
# EXTRACT FEATURES
# ==========================================

print("\n=================================")
print("EXTRACTING FEATURES")
print("=================================")


X_normal, y_normal = process_files(

    normal_files,
    "NORMAL"

)


X_vehicle, y_vehicle = process_files(

    vehicle_files,
    "VEHICLE"

)


X_heavy, y_heavy = process_files(

    heavy_files,
    "HEAVY_MACHINERY"

)


# ==========================================
# COMBINE DATA
# ==========================================

X = (

    X_normal
    + X_vehicle
    + X_heavy

)


y = (

    y_normal
    + y_vehicle
    + y_heavy

)


print("\n=================================")
print("FINAL DATASET")
print("=================================")

print(
    "Total samples:",
    len(X)
)

print(
    "Total labels:",
    len(y)
)


# Convert to NumPy arrays

X = np.array(X)

y = np.array(y)


print(
    "X shape:",
    X.shape
)

print(
    "y shape:",
    y.shape
)


# ==========================================
# TRAIN TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(

    X,
    y,

    test_size=0.2,

    random_state=42,

    stratify=y

)


print("\n=================================")
print("TRAIN TEST SPLIT")
print("=================================")

print(
    "Training samples:",
    len(X_train)
)

print(
    "Testing samples:",
    len(X_test)
)


# ==========================================
# TRAIN MODEL
# ==========================================

print("\n=================================")
print("TRAINING MODEL")
print("=================================")


model = RandomForestClassifier(

    n_estimators=100,

    random_state=42,

    class_weight="balanced"

)


model.fit(

    X_train,
    y_train

)


print(
    "Random Forest training completed"
)


# ==========================================
# MODEL EVALUATION
# ==========================================

y_pred = model.predict(

    X_test
)


accuracy = accuracy_score(

    y_test,
    y_pred

)


print("\n=================================")
print("MODEL RESULTS")
print("=================================")

print(
    "Accuracy:",
    accuracy
)

print(
    "Accuracy percentage:",
    round(
        accuracy * 100,
        2
    ),
    "%"
)


print(
    "\nClassification Report:"
)

print(

    classification_report(

        y_test,
        y_pred

    )

)


print(
    "Confusion Matrix:"
)

print(

    confusion_matrix(

        y_test,
        y_pred

    )

)


# ==========================================
# SAVE MODEL
# ==========================================

os.makedirs(

    MODELS_PATH,

    exist_ok=True

)


MODEL_PATH = os.path.join(

    MODELS_PATH,

    "acoustic_model.pkl"

)


joblib.dump(

    model,

    MODEL_PATH

)


print("\n=================================")
print("MODEL SAVED SUCCESSFULLY")
print("=================================")

print(
    "Model saved at:"
)

print(
    MODEL_PATH
)