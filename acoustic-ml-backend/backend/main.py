from fastapi import FastAPI, UploadFile, File, HTTPException
import tempfile
import os
import sys
import requests
from pathlib import Path


# ==========================================
# PROJECT PATH
# ==========================================

PROJECT_DIR = Path(__file__).resolve().parent.parent

ACOUSTIC_ML_DIR = PROJECT_DIR / "acoustic-ml"

# Add acoustic-ml folder to Python path
sys.path.insert(0, str(ACOUSTIC_ML_DIR))


# ==========================================
# IMPORT ACOUSTIC ML
# ==========================================

from predict import predict_audio


# ==========================================
# IMPORT RISK ENGINE
# ==========================================

from backend.risk_engine import calculate_risk


# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI(
    title="Illegal Sand Mining Detection API"
)


# ==========================================
# SATELLITE API URL
# ==========================================

SATELLITE_API_URL = "http://127.0.0.1:8000/predict"


# ==========================================
# HOME API
# ==========================================

@app.get("/")
def home():

    return {
        "message": "Illegal Sand Mining Detection API is running"
    }


# ==========================================
# CHECK SATELLITE API
# ==========================================

@app.get("/api/check-satellite")
def check_satellite():

    try:

        response = requests.get(
            "http://127.0.0.1:8000/",
            timeout=10
        )

        return {
            "message": "Satellite API connected successfully",
            "satellite_response": response.json()
        }

    except requests.exceptions.RequestException as e:

        raise HTTPException(
            status_code=500,
            detail=f"Satellite API connection error: {str(e)}"
        )


# ==========================================
# COMBINED ANALYSIS
# ==========================================

@app.post("/api/analyze")
async def analyze(

    image: UploadFile = File(...),

    audio_file: UploadFile = File(...)

):

    temp_file_path = None

    try:

        # ==================================
        # SATELLITE ANALYSIS
        # ==================================

        image_data = await image.read()


        # Satellite API expects field name "file"

        satellite_files = {

            "file": (
                image.filename,
                image_data,
                image.content_type
            )

        }


        # Send image to Satellite API

        satellite_response = requests.post(

            SATELLITE_API_URL,

            files=satellite_files,

            timeout=60

        )


        # Check Satellite API response

        if satellite_response.status_code != 200:

            raise HTTPException(

                status_code=500,

                detail={
                    "message": "Satellite ML prediction failed",
                    "response": satellite_response.text
                }

            )


        # Get Satellite result

        satellite_result = satellite_response.json()


        # ==================================
        # GET SATELLITE SCORE
        # ==================================

        satellite_score = satellite_result.get(

            "satelliteScore",

            0

        )

        satellite_score = float(satellite_score)


        # ==================================
        # ACOUSTIC ANALYSIS
        # ==================================

        suffix = Path(audio_file.filename).suffix


        # Create temporary audio file

        with tempfile.NamedTemporaryFile(

            delete=False,

            suffix=suffix

        ) as temp_file:

            audio_data = await audio_file.read()

            temp_file.write(audio_data)

            temp_file_path = temp_file.name


        # Run Acoustic ML

        acoustic_result = predict_audio(
            temp_file_path
        )


        # ==================================
        # GET ACOUSTIC SCORE
        # ==================================

        acoustic_score = acoustic_result.get(

            "confidence",

            0

        )

        acoustic_score = float(acoustic_score)


        # ==================================
        # HISTORICAL SCORE
        # ==================================

        historical_score = round(

            (satellite_score + acoustic_score) / 2,

            2

        )


        # ==================================
        # FINAL RISK CALCULATION
        # ==================================

        risk_result = calculate_risk(

            satellite_score,

            acoustic_score,

            historical_score

        )


        # ==================================
        # FINAL RESPONSE
        # ==================================

        return {

            "satellite_result": satellite_result,

            "satellite_score": satellite_score,

            "acoustic_result": acoustic_result,

            "acoustic_score": acoustic_score,

            "historical_score": historical_score,

            "final_risk_score": risk_result[
                "final_risk_score"
            ],

            "risk_level": risk_result[
                "risk_level"
            ]

        }


    except requests.exceptions.RequestException as e:

        raise HTTPException(

            status_code=500,

            detail=f"Satellite API connection error: {str(e)}"

        )


    except HTTPException:

        raise


    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail=str(e)

        )


    finally:

        # Delete temporary audio file

        if temp_file_path and os.path.exists(
            temp_file_path
        ):

            os.remove(
                temp_file_path
            )
            