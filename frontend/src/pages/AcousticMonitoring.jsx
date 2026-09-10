import '../App.css'
import BackButton from '../components/BackButton'

function AcousticMonitoring() {

  const readings = [
    {
      zone: 'Z-14',
      location: 'North River Area',
      level: 'High',
      frequency: '87%',
      activity: 'Heavy Machinery',
      time: '10:25 AM'
    },
    {
      zone: 'Z-03',
      location: 'East River Area',
      level: 'High',
      frequency: '82%',
      activity: 'Excavator Detected',
      time: '09:40 AM'
    },
    {
      zone: 'Z-07',
      location: 'Central River Area',
      level: 'Medium',
      frequency: '54%',
      activity: 'Vehicle Activity',
      time: '09:15 AM'
    },
    {
      zone: 'Z-21',
      location: 'South River Area',
      level: 'Low',
      frequency: '22%',
      activity: 'Normal Environment',
      time: '08:50 AM'
    }
  ]

  return (
    <div className="acoustic-page">

      {/* PAGE HEADER */}

      <div className="page-title">

        <div className="page-title-left">

          {/* BACK BUTTON */}
          <BackButton />

          <div>
            <h1>Acoustic Monitoring</h1>
            <p>
              Detect suspicious machinery and mining activity using acoustic signals
            </p>
          </div>

        </div>

        <div className="map-status">
          <span></span>
          Sensors Online
        </div>

      </div>


      {/* SUMMARY */}

      <div className="acoustic-summary">

        <div>
          <span>Active Sensors</span>
          <strong>18</strong>
        </div>

        <div>
          <span>Signals Detected</span>
          <strong>126</strong>
        </div>

        <div>
          <span>High Activity</span>
          <strong className="red-text">7</strong>
        </div>

        <div>
          <span>Processing Status</span>
          <strong className="green-text">Online</strong>
        </div>

      </div>


      {/* LIVE SENSOR */}

      <div className="acoustic-main">

        <div className="panel-header">

          <div>
            <h2>Live Acoustic Activity</h2>
            <p>Real-time sensor activity overview</p>
          </div>

          <span className="live-label">
            ● LIVE
          </span>

        </div>


        <div className="wave-container">

          <div className="wave-grid"></div>

          <div className="sound-wave">

            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>

          </div>

          <div className="wave-label">
            Acoustic Signal Strength
          </div>

        </div>

      </div>


      {/* SENSOR READINGS */}

      <div className="acoustic-readings">

        <div className="section-heading">

          <h2>Sensor Readings</h2>

          <span>
            Last updated: Just now
          </span>

        </div>


        <div className="sensor-grid">

          {readings.map((reading) => (

            <div
              className="sensor-card"
              key={reading.zone}
            >

              <div className="sensor-top">

                <div>
                  <strong>{reading.zone}</strong>
                  <p>{reading.location}</p>
                </div>

                <span
                  className={`risk-badge ${reading.level.toLowerCase()}`}
                >
                  {reading.level}
                </span>

              </div>


              <div className="sensor-data">

                <div>
                  <span>Signal Level</span>
                  <strong>{reading.frequency}</strong>
                </div>

                <div>
                  <span>Activity</span>
                  <strong>{reading.activity}</strong>
                </div>

              </div>


              <div className="signal-bar">

                <span
                  style={{ width: reading.frequency }}
                ></span>

              </div>


              <div className="sensor-bottom">

                <span>Last detected</span>

                <strong>
                  {reading.time}
                </strong>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default AcousticMonitoring