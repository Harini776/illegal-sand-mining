import joblib
from pathlib import Path
from features import extract_features


# Get the folder where predict.py is located
BASE_DIR = Path(__file__).resolve().parent

# Model location
MODEL_PATH = BASE_DIR / "models" / "acoustic_model.pkl"

# Load the trained model
model = joblib.load(MODEL_PATH)


def predict_audio(file_path):
    # Extract features from audio
    features = extract_features(file_path)

    # Convert to 2D array for the ML model
    features = features.reshape(1, -1)

    # Prediction
    prediction = model.predict(features)[0]

    # Prediction probabilities
    probabilities = model.predict_proba(features)[0]

    # Highest probability
    confidence = max(probabilities) * 100

    return {
        "prediction": str(prediction),
        "confidence": round(float(confidence), 2)
    }