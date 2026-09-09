import { useState } from 'react'
import '../App.css'
import BackButton from '../components/BackButton'
import { analyzeFiles } from '../api/api'

function SatelliteAnalysis() {
  const [imageFile, setImageFile] = useState(null)
  const [audioFile, setAudioFile] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const images = [
    {
      id: 'SAT-014',
      area: 'North River Area',
      date: '30 Aug 2026',
      change: '87%',
      risk: 'High'
    },
    {
      id: 'SAT-009',
      area: 'East River Area',
      date: '29 Aug 2026',
      change: '64%',
      risk: 'Medium'
    },
    {
      id: 'SAT-021',
      area: 'South River Area',
      date: '28 Aug 2026',
      change: '22%',
      risk: 'Low'
    }
  ]

  const handleAnalyze = async () => {
    if (!imageFile || !audioFile) {
      setError('Please select both a satellite image and an audio file.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    try {
      const data = await analyzeFiles(imageFile, audioFile)

      setResult(data)

      localStorage.setItem(
        'latestAnalysis',
        JSON.stringify(data)
      )
    } catch (err) {
      setError(err.message || 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="satellite-page">

      {/* PAGE HEADER */}
      <div className="page-title">

        <div className="page-title-left">

          <BackButton />

          <div>
            <h1>Satellite Analysis</h1>
            <p>
              Analyze satellite imagery to identify suspicious mining activity
            </p>
          </div>

        </div>

        <label className="add-zone-button">
          + Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </label>

      </div>


      {/* BACKEND ANALYSIS */}
      <div className="analysis-panel">

        <div className="analysis-header">

          <div>
            <h2>AI Risk Analysis</h2>
            <p>
              Upload satellite imagery and acoustic data for combined analysis
            </p>
          </div>

        </div>


        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginTop: '20px'
        }}>

          {/* IMAGE UPLOAD */}
          <div style={{
            border: '1px solid #26364a',
            borderRadius: '12px',
            padding: '20px',
            background: '#0b1726'
          }}>

            <h3>Satellite Image</h3>

            <p style={{ marginBottom: '15px' }}>
              Upload satellite image for detection
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />

            {imageFile && (
              <p style={{ marginTop: '12px' }}>
                Selected: <strong>{imageFile.name}</strong>
              </p>
            )}

          </div>


          {/* AUDIO UPLOAD */}
          <div style={{
            border: '1px solid #26364a',
            borderRadius: '12px',
            padding: '20px',
            background: '#0b1726'
          }}>

            <h3>Acoustic Recording</h3>

            <p style={{ marginBottom: '15px' }}>
              Upload audio recording for machinery detection
            </p>

            <input
              type="file"
              accept="audio/*,.wav,.mp3"
              onChange={(e) => setAudioFile(e.target.files[0])}
            />

            {audioFile && (
              <p style={{ marginTop: '12px' }}>
                Selected: <strong>{audioFile.name}</strong>
              </p>
            )}

          </div>

        </div>


        {/* ANALYZE BUTTON */}
        <button
          className="add-zone-button"
          onClick={handleAnalyze}
          disabled={loading}
          style={{ marginTop: '20px' }}
        >
          {loading ? 'Analyzing...' : 'Analyze Risk →'}
        </button>


        {/* ERROR */}
        {error && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            borderRadius: '10px',
            background: '#35151a',
            border: '1px solid #7f2933',
            color: '#ff8f9b'
          }}>
            {error}
          </div>
        )}


        {/* RESULT */}
        {result && (
          <div style={{
            marginTop: '25px',
            padding: '20px',
            borderRadius: '12px',
            background: '#0b1726',
            border: '1px solid #26364a'
          }}>

            <h2>Analysis Result</h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '15px',
              marginTop: '20px'
            }}>

              <div>
                <span>Satellite Score</span>
                <strong>
                  {result.satellite_score}
                </strong>
              </div>

              <div>
                <span>Acoustic Score</span>
                <strong>
                  {result.acoustic_score}
                </strong>
              </div>

              <div>
                <span>Historical Score</span>
                <strong>
                  {result.historical_score}
                </strong>
              </div>

              <div>
                <span>Final Risk Score</span>
                <strong>
                  {result.final_risk_score}
                </strong>
              </div>

            </div>


            {/* RISK LEVEL */}
            <div style={{
              marginTop: '20px'
            }}>

              <span>Final Risk Level</span>

              <h2 style={{
                marginTop: '8px'
              }}>
                {result.risk_level}
              </h2>

            </div>


            {/* ACOUSTIC PREDICTION */}
            {result.acoustic_result && (
              <div style={{
                marginTop: '20px'
              }}>

                <span>Acoustic Detection</span>

                <p>
                  Prediction:{' '}
                  <strong>
                    {result.acoustic_result.prediction || 'N/A'}
                  </strong>
                </p>

                <p>
                  Confidence:{' '}
                  <strong>
                    {result.acoustic_result.confidence ?? 'N/A'}
                  </strong>
                </p>

              </div>
            )}

          </div>
        )}

      </div>


      {/* SUMMARY */}
      <div className="sat-summary">

        <div>
          <span>Images Analyzed</span>
          <strong>48</strong>
        </div>

        <div>
          <span>Changes Detected</span>
          <strong className="yellow-text">16</strong>
        </div>

        <div>
          <span>High Risk Areas</span>
          <strong className="red-text">7</strong>
        </div>

        <div>
          <span>Last Analysis</span>
          <strong>Today</strong>
        </div>

      </div>


      {/* RECENT SATELLITE OBSERVATIONS */}
      <div className="analysis-panel">

        <div className="analysis-header">

          <div>
            <h2>Satellite Image Analysis</h2>
            <p>Recent satellite observations</p>
          </div>

          <select>
            <option>All Risk Levels</option>
            <option>High Risk</option>
            <option>Medium Risk</option>
            <option>Low Risk</option>
          </select>

        </div>


        {/* SATELLITE IMAGES */}
        <div className="satellite-grid">

          {images.map((image) => (

            <div
              className="satellite-card"
              key={image.id}
            >

              <div className="satellite-image">

                <div className="river-line"></div>

                <div
                  className={`sat-marker ${image.risk.toLowerCase()}`}
                >
                  !
                </div>

                <span className="image-label">
                  SATELLITE
                </span>

              </div>


              <div className="satellite-info">

                <div className="satellite-title">

                  <strong>{image.id}</strong>

                  <span
                    className={`risk-badge ${image.risk.toLowerCase()}`}
                  >
                    {image.risk}
                  </span>

                </div>

                <p>{image.area}</p>

                <small>
                  Captured: {image.date}
                </small>


                <div className="change-info">

                  <span>Detected Change</span>

                  <strong>
                    {image.change}
                  </strong>

                </div>


                <button className="details-button">
                  Analyze Image →
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default SatelliteAnalysis