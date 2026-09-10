import '../App.css'
import { useState } from 'react'
import BackButton from '../components/BackButton'

function HistoricalData() {
  const [selectedZone, setSelectedZone] = useState('Z-14')

  const zones = {
    'Z-14': {
      name: 'North River Area',
      risk: 91,
      satellite: 90,
      acoustic: 87,
      machinery: 94,
      river: 76,
      alerts: 88
    },
    'Z-03': {
      name: 'East River Area',
      risk: 88,
      satellite: 82,
      acoustic: 85,
      machinery: 90,
      river: 72,
      alerts: 84
    },
    'Z-07': {
      name: 'Central River Area',
      risk: 64,
      satellite: 61,
      acoustic: 54,
      machinery: 68,
      river: 58,
      alerts: 52
    },
    'Z-21': {
      name: 'South River Area',
      risk: 32,
      satellite: 28,
      acoustic: 22,
      machinery: 35,
      river: 40,
      alerts: 25
    }
  }

  const zone = zones[selectedZone]

  const points = [
    [50, 8],
    [82, 28],
    [70, 72],
    [30, 72],
    [18, 28]
  ]

  const values = [
    zone.satellite,
    zone.acoustic,
    zone.machinery,
    zone.river,
    zone.alerts
  ]

  const center = 50
  const radius = 38

  const getPoint = (value, index) => {
    const angle = (-90 + index * 72) * (Math.PI / 180)
    const r = (value / 100) * radius

    return [
      center + r * Math.cos(angle),
      center + r * Math.sin(angle)
    ]
  }

  const polygonPoints = values
    .map((value, index) => {
      const [x, y] = getPoint(value, index)
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="historical-page">

      {/* HEADER */}
      <div className="page-title">

        <div className="page-title-left">

          {/* BACK BUTTON */}
          <BackButton />

          <div>
            <h1>Historical Data</h1>
            <p>
              Analyze historical mining activity and risk patterns across
              monitored zones
            </p>
          </div>

        </div>

        <div className="history-filter">
          <button className="active">30 Days</button>
          <button>3 Months</button>
          <button>6 Months</button>
        </div>

      </div>


      {/* ZONE SELECTOR */}
      <div className="zone-selector">

        <div>
          <span>SELECT MONITORING ZONE</span>
          <h2>{zone.name}</h2>
        </div>

        <div className="zone-buttons">

          {Object.keys(zones).map((zoneId) => (

            <button
              key={zoneId}
              className={selectedZone === zoneId ? 'selected' : ''}
              onClick={() => setSelectedZone(zoneId)}
            >
              {zoneId}
            </button>

          ))}

        </div>

      </div>


      {/* MAIN ANALYSIS */}
      <div className="history-main">

        {/* RADAR CHART */}
        <div className="radar-panel">

          <div className="panel-header">

            <div>
              <h2>Risk Factor Analysis</h2>
              <p>Multi-factor historical risk assessment</p>
            </div>

            <div className="risk-score">
              <span>Overall Risk</span>
              <strong>{zone.risk}%</strong>
            </div>

          </div>


          <div className="radar-container">

            <svg
              viewBox="0 0 100 100"
              className="radar-chart"
            >

              {/* GRID */}
              {[1, 0.75, 0.5, 0.25].map((scale) => (

                <polygon
                  key={scale}
                  points={points
                    .map(([x, y]) => {

                      const x2 =
                        center + (x - center) * scale

                      const y2 =
                        center + (y - center) * scale

                      return `${x2},${y2}`

                    })
                    .join(' ')}
                  className="radar-grid"
                />

              ))}


              {/* AXIS */}
              {points.map(([x, y], index) => (

                <line
                  key={index}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  className="radar-axis"
                />

              ))}


              {/* DATA */}
              <polygon
                points={polygonPoints}
                className="radar-data"
              />


              {/* DATA POINTS */}
              {values.map((value, index) => {

                const [x, y] = getPoint(value, index)

                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="1.8"
                    className="radar-point"
                  />
                )

              })}


              {/* LABELS */}
              <text
                x="50"
                y="5"
                className="radar-label"
              >
                Satellite
              </text>

              <text
                x="91"
                y="29"
                className="radar-label"
              >
                Acoustic
              </text>

              <text
                x="75"
                y="94"
                className="radar-label"
              >
                Machinery
              </text>

              <text
                x="25"
                y="94"
                className="radar-label"
              >
                River Impact
              </text>

              <text
                x="2"
                y="29"
                className="radar-label"
              >
                Alerts
              </text>

            </svg>

          </div>


          <div className="radar-legend">

            <span>
              <i></i> Risk intensity
            </span>

            <span>
              Scale: 0 – 100
            </span>

          </div>

        </div>


        {/* SIDE PANEL */}
        <div className="history-side">

          <div className="history-card">

            <span>
              Historical Risk Score
            </span>

            <strong>
              {zone.risk}%
            </strong>

            <p>
              Based on combined monitoring signals
            </p>

          </div>


          <div className="factor-list">

            <h3>Risk Factors</h3>


            <div className="factor">

              <div>
                <span>Satellite Change</span>
                <b>{zone.satellite}%</b>
              </div>

              <div className="factor-bar">
                <span
                  style={{
                    width: `${zone.satellite}%`
                  }}
                ></span>
              </div>

            </div>


            <div className="factor">

              <div>
                <span>Acoustic Activity</span>
                <b>{zone.acoustic}%</b>
              </div>

              <div className="factor-bar">
                <span
                  style={{
                    width: `${zone.acoustic}%`
                  }}
                ></span>
              </div>

            </div>


            <div className="factor">

              <div>
                <span>Machinery Detection</span>
                <b>{zone.machinery}%</b>
              </div>

              <div className="factor-bar">
                <span
                  style={{
                    width: `${zone.machinery}%`
                  }}
                ></span>
              </div>

            </div>


            <div className="factor">

              <div>
                <span>River Impact</span>
                <b>{zone.river}%</b>
              </div>

              <div className="factor-bar">
                <span
                  style={{
                    width: `${zone.river}%`
                  }}
                ></span>
              </div>

            </div>


            <div className="factor">

              <div>
                <span>Alert Frequency</span>
                <b>{zone.alerts}%</b>
              </div>

              <div className="factor-bar">
                <span
                  style={{
                    width: `${zone.alerts}%`
                  }}
                ></span>
              </div>

            </div>

          </div>

        </div>

      </div>


      {/* TIMELINE */}
      <div className="activity-history">

        <div className="panel-header">

          <div>
            <h2>Recent Historical Activity</h2>
            <p>
              Important events recorded in {selectedZone}
            </p>
          </div>

        </div>


        <div className="history-timeline">

          <div className="timeline-item">

            <span className="timeline-dot"></span>

            <div>
              <strong>
                Heavy machinery detected
              </strong>

              <p>
                Acoustic monitoring • 30 Aug 2026 • 10:25 AM
              </p>
            </div>

          </div>


          <div className="timeline-item">

            <span className="timeline-dot"></span>

            <div>
              <strong>
                Satellite change detected
              </strong>

              <p>
                Satellite analysis • 29 Aug 2026 • 02:15 PM
              </p>
            </div>

          </div>


          <div className="timeline-item">

            <span className="timeline-dot"></span>

            <div>
              <strong>
                High-risk alert generated
              </strong>

              <p>
                Risk monitoring • 28 Aug 2026 • 04:40 PM
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default HistoricalData