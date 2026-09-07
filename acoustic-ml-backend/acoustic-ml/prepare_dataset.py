import os
import shutil
import pandas as pd


# ==================================================
# ESC-50 LOCATION
# ==================================================

ESC50_PATH = r"C:\Users\gowsh\Downloads\ESC-50-master\ESC-50-master"

AUDIO_PATH = os.path.join(ESC50_PATH, "audio")
CSV_PATH = os.path.join(ESC50_PATH, "meta", "esc50.csv")


# ==================================================
# OUR PROJECT DATASET LOCATION
# ==================================================

PROJECT_DATASET = r"C:\Users\gowsh\OneDrive\Desktop\illegal-sand-mining\acoustic-ml-backend\acoustic-ml\dataset"

NORMAL_PATH = os.path.join(PROJECT_DATASET, "normal")
VEHICLE_PATH = os.path.join(PROJECT_DATASET, "vehicle")


# Create folders
os.makedirs(NORMAL_PATH, exist_ok=True)
os.makedirs(VEHICLE_PATH, exist_ok=True)


# ==================================================
# CHECK ESC-50
# ==================================================

if not os.path.exists(CSV_PATH):
    print("ERROR: esc50.csv not found!")
    print("Expected location:")
    print(CSV_PATH)
    exit()

if not os.path.exists(AUDIO_PATH):
    print("ERROR: audio folder not found!")
    print("Expected location:")
    print(AUDIO_PATH)
    exit()


# ==================================================
# READ CSV
# ==================================================

df = pd.read_csv(CSV_PATH)

print("ESC-50 loaded successfully!")
print("Total recordings:", len(df))


# ==================================================
# CATEGORIES
# ==================================================

normal_categories = [
    "rain",
    "sea_waves",
    "wind",
    "chirping_birds",
    "water_drops"
]

vehicle_categories = [
    "engine",
    "train",
    "helicopter",
    "airplane",
    
]


# ==================================================
# COPY NORMAL AUDIO
# ==================================================

normal_count = 0

print("\n========== NORMAL ==========")

for category in normal_categories:

    files = df[df["category"] == category]

    print(category, "->", len(files), "files")

    for filename in files["filename"]:

        source = os.path.join(AUDIO_PATH, filename)
        destination = os.path.join(NORMAL_PATH, filename)

        if os.path.exists(source):
            shutil.copy2(source, destination)
            normal_count += 1


# ==================================================
# COPY VEHICLE AUDIO
# ==================================================

vehicle_count = 0

print("\n========== VEHICLE ==========")

for category in vehicle_categories:

    files = df[df["category"] == category]

    print(category, "->", len(files), "files")

    for filename in files["filename"]:

        source = os.path.join(AUDIO_PATH, filename)
        destination = os.path.join(VEHICLE_PATH, filename)

        if os.path.exists(source):
            shutil.copy2(source, destination)
            vehicle_count += 1


# ==================================================
# RESULT
# ==================================================

print("\n================================")
print("DATASET PREPARATION COMPLETE")
print("================================")

print("Normal audio files :", normal_count)
print("Vehicle audio files:", vehicle_count)

print("\nFiles copied to:")
print(NORMAL_PATH)
print(VEHICLE_PATH)