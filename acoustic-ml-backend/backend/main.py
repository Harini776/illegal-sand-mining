from fastapi import FastAPI, UploadFile, File
import tempfile
import os
import sys
from pathlib import Path


# Find the acoustic-ml folder
PROJECT_DIR = Path(__file__).resolve().parent.parent
ACOUSTIC_ML_DIR = PROJECT_DIR / "acoustic-ml"

# Add acoustic-ml to Python path
sys.path.insert(0, str(ACOUSTIC_ML_DIR))

# Import our Acoustic ML prediction function
from predict import predict_audio


app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "SandWatch AI Backend is running"
    }


@app.post("/api/analyze-audio")
async def analyze_audio(file: UploadFile = File(...)):

    # Create a temporary file
    suffix = Path(file.filename).suffix

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:

        # Read uploaded audio
        audio_data = await file.read()

        # Save audio temporarily
        temp_file.write(audio_data)

        temp_file_path = temp_file.name

    try:
        # Send audio to Acoustic ML
        result = predict_audio(temp_file_path)

        return {
            "filename": file.filename,
            "prediction": result["prediction"],
            "confidence": result["confidence"]
        }

    finally:
        # Delete temporary audio file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)