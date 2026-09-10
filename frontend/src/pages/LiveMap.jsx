import '../App.css'
import BackButton from '../components/BackButton'

function LiveMap() {
  const zones = [
    {
      id: 'Z-14',
      location: 'River North',
      risk: 'High',
      score: 91
    },
    {
      id: 'Z-03',
      location: 'River East',
      risk: 'High',
      score: 88
    },
    {
      id: 'Z-07',
      location: 'River Central',
      risk: 'Medium',
      score: 64
    },
    {
      id: 'Z-21',
      location: 'River South',
      risk: 'Low',
      score: 32
    }
  ]

  return (
    <div className="map-page">

      {/* PAGE HEADER */}
      <div className="page-title">

        <div className="page-title-left">

          {/* BACK BUTTON */}
          <BackButton />

          <div>
            <h1>Live Monitoring Map</h1>
            <p>
              Real-time monitoring of suspected illegal sand mining zones
            </p>
          </div>

        </div>

        <div className="map-status">
          <span></span>
          Live Monitoring
        </div>

      </div>


      {/* FILTERS */}
      <div className="map-filters">

        <select>
          <option>All Risk Levels</option>
          <option>High Risk</option>
          <option>Medium Risk</option>
          <option>Low Risk</option>
        </select>

        <select>
          <option>All Zones</option>
          <option>Active Zones</option>
          <option>Under Observation</option>
        </select>

        <button>🔄 Refresh</button>

      </div>


      {/* MAP */}
      <div className="full-map-panel">

        <div className="map-toolbar">

          <div>
            <strong>Monitoring Area</strong>
            <span>24 zones monitored</span>
          </div>

          <div className="map-mode">
            <button className="selected">Map</button>
            <button>Satellite</button>
          </div>

        </div>


        <div className="large-map">

          {/* RIVER */}
          <div className="large-river"></div>


          {/* MAP MARKERS */}
          <div className="large-marker high m1">91</div>
          <div className="large-marker high m2">88</div>

          <div className="large-marker medium m3">64</div>

          <div className="large-marker low m4">32</div>
          <div className="large-marker low m5">28</div>
          <div className="large-marker low m6">21</div>


          {/* MAP CONTROLS */}
          <div className="large-map-controls">
            <button>+</button>
            <button>−</button>
            <button>◎</button>
          </div>


          {/* LEGEND */}
          <div className="large-map-legend">

            <strong>Risk Level</strong>

            <div>
              <span className="legend-red"></span>
              High Risk
            </div>

            <div>
              <span className="legend-yellow"></span>
              Medium Risk
            </div>

            <div>
              <span className="legend-green"></span>
              Low Risk
            </div>

          </div>

        </div>

      </div>


      {/* ZONE INFORMATION */}
      <div className="zone-section">

        <div className="section-heading">
          <h2>Monitored Zones</h2>
          <span>Last updated: Just now</span>
        </div>


        <div className="zone-cards">

          {zones.map((zone) => (

            <div className="zone-card" key={zone.id}>

              <div className="zone-card-top">

                <div>
                  <strong>{zone.id}</strong>
                  <p>{zone.location}</p>
                </div>

                <span className={`risk-badge ${zone.risk.toLowerCase()}`}>
                  {zone.risk}
                </span>

              </div>


              <div className="zone-score">

                <span>Risk Score</span>

                <strong>{zone.score}%</strong>

              </div>


              <div className="score-bar">
                <span
                  style={{ width: `${zone.score}%` }}
                ></span>
              </div>


              <button className="view-zone">
                View Zone Details →
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default LiveMap