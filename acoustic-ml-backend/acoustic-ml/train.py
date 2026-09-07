import os
import random
random.seed(42)

from features import extract_features

DATASET_PATH = "dataset"
SAMPLES_PER_CLASS = 160

print("Dataset configuration loaded")

def get_wav_files(folder):
    files = []
    for root, dirs, filenames in os.walk(folder):
        for filename in filenames:
            if filename.lower().endswith(".wav"):
                files.append(os.path.join(root, filename))
    return files

normal_files = get_wav_files(os.path.join(DATASET_PATH, "normal"))
random.shuffle(normal_files)
normal_files = normal_files[:SAMPLES_PER_CLASS]

vehicle_files = get_wav_files(os.path.join(DATASET_PATH, "vehicle"))
random.shuffle(vehicle_files)
vehicle_files = vehicle_files[:SAMPLES_PER_CLASS]

heavy_files = []

machinery_types = [
    "bulldozer",
    "dump_truck",
    "excavator",
    "grader",
    "loader",
    "mixer_truck",
    "cylinder"
]

for machinery_type in machinery_types:
    folder = os.path.join(
        DATASET_PATH,
        "heavy_machinery",
        machinery_type
    )

    files = get_wav_files(folder)
    random.shuffle(files)

    heavy_files.extend(files[:23])

heavy_files = heavy_files[:160]

print("NORMAL files:", len(normal_files))
print("VEHICLE files:", len(vehicle_files))
print("HEAVY MACHINERY files:", len(heavy_files))


def process_files(files, label):
    X = []
    y = []
    for i, file_path in enumerate(files, 1):
        features = extract_features(file_path)
        X.append(features)
        y.append(label)
        if i % 20 == 0 or i == len(files):
            print(f"Processing {label}: {i}/{len(files)}")
    return X, y

X_normal, y_normal = process_files(normal_files, "NORMAL")
X_vehicle, y_vehicle = process_files(vehicle_files, "VEHICLE")
X_heavy, y_heavy = process_files(heavy_files, "HEAVY_MACHINERY")

X = X_normal + X_vehicle + X_heavy
y = y_normal + y_vehicle + y_heavy

print("Total samples:", len(X))
print("Total labels:", len(y))
print("Features per sample:", len(X[0]))

import numpy as np

X = np.array(X)
y = np.array(y)

print("X shape:", X.shape)
print("y shape:", y.shape)

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

print("Training samples:", len(X_train))
print("Testing samples:", len(X_test))
print("Training shape:", X_train.shape)
print("Testing shape:", X_test.shape)

from sklearn.ensemble import RandomForestClassifier

model = RandomForestClassifier(n_estimators=100, random_state=42, class_weight="balanced")
model.fit(X_train, y_train)

print("Random Forest training completed")

from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

y_pred = model.predict(X_test)

accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
print("Accuracy percentage:", accuracy * 100, "%")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))

import os
import joblib

os.makedirs("models", exist_ok=True)
joblib.dump(model, "models/acoustic_model.pkl")
print("Model saved successfully")
