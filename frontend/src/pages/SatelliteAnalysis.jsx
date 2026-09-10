import { useState } from "react";
import BackButton from "../components/BackButton";
import { analyzeFiles } from "../api/api";

function SatelliteAnalysis() {
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setAudioFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imageFile || !audioFile) {
      setError("Please select both satellite image and acoustic recording.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await analyzeFiles(imageFile, audioFile);

      setResult(data);

      localStorage.setItem(
        "latestAnalysis",
        JSON.stringify(data)
      );
    } catch (err) {
      setError(err.message || "Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const satelliteScore = result?.satellite_score ?? 0;
  const acousticScore = result?.acoustic_score ?? 0;
  const historicalScore = result?.historical_score ?? 0;
  const finalRiskScore = result?.final_risk_score ?? 0;
  const riskLevel = result?.risk_level ?? "—";

  const acousticPrediction =
    result?.acoustic_prediction ||
    result?.prediction ||
    "NORMAL";

  const acousticConfidence =
    result?.acoustic_confidence ??
    result?.confidence ??
    0;

  return (
    <>
      <style>{`

        .sat-page {
          padding: 30px;
          background: #031d19;
          min-height: 100vh;
          color: #e3e3e3;
        }

        .sat-header {
          margin-bottom: 25px;
        }

        .sat-header h1 {
          margin: 15px 0 5px;
          font-size: 30px;
        }

        .sat-header p {
          margin: 0;
          color: #1b2331;
        }

        /* UPLOAD CARD */

        .upload-card {
          background: #293242;
          border: 1px solid #4e5156;
          border-radius: 16px;
          padding: 25px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
          color:white
    

        }

        .upload-card h2 {
          margin-top: 0;
          margin-bottom: 20px;
        }

        .upload-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .upload-box {
          border: 2px dashed #d6dce7;
          border-radius: 14px;
          padding: 25px;
          text-align: center;
          background: #fafbfe;
          min-height: 230px;
        }

        .upload-box h3 {
          margin: 10px 0;
          color:black;
          

        }

        .upload-box p {
          color: #030303;
          font-size: 14px;
          
        }

        .icon {
          font-size: 35px;
        }

        .choose-btn {
          display: inline-block;
          padding: 11px 22px;
          border-radius: 8px;
          background: #2868e8;
          color: white;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
        }

        .audio-btn {
          background: #7047d9;
        }

        .file-name {
          margin-top: 14px;
          padding: 9px;
          background: #c9d1db;
          border-radius: 7px;
          word-break: break-all;
          border:black;
          color:black;
        }

        .image-preview {
          width: 100%;
          max-height: 160px;
          object-fit: cover;
          border-radius: 9px;
          margin-top: 12px;
        }

        .audio-player {
          width: 100%;
          margin-top: 15px;
        }

        .analyze-btn {
          width: 100%;
          border: none;
          border-radius: 10px;
          padding: 15px;
          margin-top: 22px;
          background: #2868e8;
          color: white;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .analyze-btn:disabled {
          opacity: 0.6;
        }

        .error {
          margin-top: 15px;
          padding: 12px;
          border-radius: 8px;
          background: #fff0f0;
          border: 1px solid #ffbcbc;
          color: #c62828;
        }

        /* RESULTS */

        .results {
          margin-top: 30px;
        }

        .results h2 {
          margin-bottom: 20px;
        }

        .result-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .result-box {
          background: white;
          border: 1px solid #dce2eb;
          border-radius: 14px;
          padding: 22px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
          color:black;
        }

        .result-box h3 {
          margin-top: 0;
          font-size: 17px;
        }

        .score {
          font-size: 30px;
          font-weight: 700;
          color: #2868e8;
          margin-top: 15px;
        }

        /* RISK GAUGE */

        .risk-box {
          text-align: center;
        }

        .risk-circle {
          width: 180px;
          height: 180px;
          margin: 15px auto;
          border-radius: 50%;

          background: conic-gradient(
            #e53935 ${Math.min(finalRiskScore, 100) * 3.6}deg,
            #ff9800 ${Math.min(finalRiskScore, 100) * 3.6}deg,
            #e9edf3 ${Math.min(finalRiskScore, 100) * 3.6}deg
          );

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .risk-circle-inner {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: white;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .risk-number {
          font-size: 34px;
          font-weight: 800;
          color: #e53935;
        }

        .risk-label {
          font-size: 13px;
          color: #777;
        }

        /* RISK LEVEL */

        .risk-level {
          display: inline-block;
          padding: 12px 25px;
          border-radius: 9px;
          background: #fff2dc;
          color: #d47700;
          font-size: 24px;
          font-weight: 800;
          margin-top: 15px;
        }

        /* DETECTION */

        .detection-row {
          display: flex;
          justify-content: space-between;
          padding: 13px 0;
          border-bottom: 1px solid #edf0f4;
        }

        .detection-row:last-child {
          border-bottom: none;
        }

        /* MOBILE */

        @media (max-width: 800px) {
          .upload-grid,
          .result-grid {
            grid-template-columns: 1fr;
          }

          .sat-page {
            padding: 20px;
          }
        }

      `}</style>

      <div className="sat-page">

        {/* HEADER */}

        <div className="sat-header">

          <BackButton />

          <h1>Satellite Analysis</h1>

          <p>
            Analyze satellite imagery and acoustic recordings
            to detect illegal sand mining risk.
          </p>

        </div>

        {/* UPLOAD */}

        <div className="upload-card">

          <h2>1. Upload Data</h2>

          <div className="upload-grid">

            {/* IMAGE */}

            <div className="upload-box">

              <div className="icon">🛰️</div>

              <h3>Satellite Image</h3>

              <p>
                Upload a .jpg, .png or .tif file
              </p>

              <label className="choose-btn">

                Choose Image

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.tif,.tiff"
                  onChange={handleImageChange}
                  hidden
                />

              </label>

              {imageFile && (
                <div className="file-name">
                  {imageFile.name}
                </div>
              )}

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Satellite Preview"
                  className="image-preview"
                />
              )}

            </div>

            {/* AUDIO */}

            <div className="upload-box">

              <div className="icon">🎙️</div>

              <h3>Acoustic Recording</h3>

              <p>
                Upload a .wav or .mp3 file
              </p>

              <label className="choose-btn audio-btn">

                Choose Audio

                <input
                  type="file"
                  accept=".wav,.mp3"
                  onChange={handleAudioChange}
                  hidden
                />

              </label>

              {audioFile && (
                <>
                  <div className="file-name">
                    {audioFile.name}
                  </div>

                  <audio
                    controls
                    className="audio-player"
                    src={URL.createObjectURL(audioFile)}
                  />
                </>
              )}

            </div>

          </div>

          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Risk"}
          </button>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

        </div>

        {/* RESULTS */}

        {result && (

          <div className="results">

            <h2>2. Analysis Results</h2>

            <div className="result-grid">

              {/* SATELLITE */}

              <div className="result-box">

                <h3>🛰️ Satellite Score</h3>

                <div className="score">
                  {Number(satelliteScore).toFixed(2)}
                </div>

              </div>

              {/* ACOUSTIC */}

              <div className="result-box">

                <h3>🎙️ Acoustic Score</h3>

                <div className="score">
                  {Number(acousticScore).toFixed(2)}
                </div>

              </div>

              {/* HISTORICAL */}

              <div className="result-box">

                <h3>📊 Historical Score</h3>

                <div className="score">
                  {Number(historicalScore).toFixed(2)}
                </div>

              </div>

              {/* RISK LEVEL */}

              <div className="result-box">

                <h3>⚠️ Final Risk Level</h3>

                <div className="risk-level">
                  {riskLevel}
                </div>

              </div>

              {/* ACOUSTIC DETECTION */}

              <div className="result-box">

                <h3>🔊 Acoustic Detection</h3>

                <div className="detection-row">
                  <span>Prediction</span>
                  <strong>{acousticPrediction}</strong>
                </div>

                <div className="detection-row">
                  <span>Confidence</span>
                  <strong>
                    {Number(acousticConfidence).toFixed(0)}%
                  </strong>
                </div>

              </div>

              {/* FINAL RISK */}

              <div className="result-box risk-box">

                <h3>🎯 Final Risk Score</h3>

                <div className="risk-circle">

                  <div className="risk-circle-inner">

                    <div className="risk-number">
                      {Number(finalRiskScore).toFixed(2)}
                    </div>

                    <div className="risk-label">
                      / 100
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>
    </>
  );
}

export default SatelliteAnalysis;