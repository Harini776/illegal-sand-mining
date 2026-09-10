import '../App.css'
import BackButton from '../components/BackButton'

function MonitoringZones() {

  const zones = [
    {
      id: 'Z-14',
      location: 'North River Area',
      risk: 'High',
      score: 91,
      status: 'Active Monitoring'
    },
    {
      id: 'Z-03',
      location: 'East River Area',
      risk: 'High',
      score: 88,
      status: 'Active Monitoring'
    },
    {
      id: 'Z-07',
      location: 'Central River Area',
      risk: 'Medium',
      score: 64,
      status: 'Under Observation'
    },
    {
      id: 'Z-21',
      location: 'South River Area',
      risk: 'Low',
      score: 32,
      status: 'Normal'
    },
    {
      id: 'Z-18',
      location: 'West River Area',
      risk: 'Medium',
      score: 58,
      status: 'Under Observation'
    },
    {
      id: 'Z-11',
      location: 'East Bank Area',
      risk: 'Low',
      score: 24,
      status: 'Normal'
    }
  ]

  return (
    <div className="zones-page">

      {/* PAGE HEADER */}
      <div className="page-title">

        <div className="page-title-left">

          {/* BACK BUTTON */}
          <BackButton />

          <div>
            <h1>Monitoring Zones</h1>
            <p>Manage and monitor registered sand mining zones</p>
          </div>

        </div>

        <button className="add-zone-button">
          + Add New Zone
        </button>

      </div>


      {/* ZONE SUMMARY */}
      <div className="zone-summary">

        <div>
          <span>Total Zones</span>
          <strong>24</strong>
        </div>

        <div>
          <span>High Risk</span>
          <strong className="red-text">4</strong>
        </div>

        <div>
          <span>Medium Risk</span>
          <strong className="yellow-text">7</strong>
        </div>

        <div>
          <span>Low Risk</span>
          <strong className="green-text">13</strong>
        </div>

      </div>


      {/* ZONE TOOLBAR */}
      <div className="zone-toolbar">

        <input
          type="text"
          placeholder="Search zones..."
        />

        <select>
          <option>All Risk Levels</option>
          <option>High Risk</option>
          <option>Medium Risk</option>
          <option>Low Risk</option>
        </select>

        <select>
          <option>All Status</option>
          <option>Active Monitoring</option>
          <option>Under Observation</option>
          <option>Normal</option>
        </select>

      </div>


      {/* ZONES TABLE */}
      <div className="zones-table">

        <div className="table-header">
          <span>Zone</span>
          <span>Location</span>
          <span>Risk Level</span>
          <span>Risk Score</span>
          <span>Status</span>
          <span>Action</span>
        </div>


        {zones.map((zone) => (

          <div className="table-row" key={zone.id}>

            <strong>{zone.id}</strong>

            <span>{zone.location}</span>

            <span className={`risk-badge ${zone.risk.toLowerCase()}`}>
              {zone.risk}
            </span>

            <div className="table-score">

              <strong>{zone.score}%</strong>

              <div className="mini-bar">
                <span
                  style={{ width: `${zone.score}%` }}
                ></span>
              </div>

            </div>

            <span className="zone-status">
              ● {zone.status}
            </span>

            <button className="details-button">
              View Details
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default MonitoringZones