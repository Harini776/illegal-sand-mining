import '../App.css'
import BackButton from '../components/BackButton'

function Alerts() {

  const alerts = [
    {
      zone: 'Z-14',
      title: 'High risk activity detected',
      type: 'High',
      change: '87%',
      time: '10:20 AM',
      date: '30 Aug 2026'
    },
    {
      zone: 'Z-07',
      title: 'Suspicious activity detected',
      type: 'Medium',
      change: '45%',
      time: '08:15 AM',
      date: '30 Aug 2026'
    },
    {
      zone: 'Z-03',
      title: 'High risk activity detected',
      type: 'High',
      change: '92%',
      time: '06:40 PM',
      date: '29 Aug 2026'
    },
    {
      zone: 'Z-18',
      title: 'Unusual machinery activity',
      type: 'Medium',
      change: '61%',
      time: '04:30 PM',
      date: '29 Aug 2026'
    },
    {
      zone: 'Z-21',
      title: 'Monitoring activity normal',
      type: 'Low',
      change: '18%',
      time: '11:10 AM',
      date: '28 Aug 2026'
    }
  ]

  return (
    <div className="alerts-page">

      {/* PAGE HEADER */}
      <div className="page-title">

        <div className="page-title-left">

          {/* BACK BUTTON */}
          <BackButton />

          <div>
            <h1>Alerts</h1>
            <p>Review suspicious and high-risk mining activity</p>
          </div>

        </div>

        <button className="add-zone-button">
          Mark All as Read
        </button>

      </div>


      {/* ALERT SUMMARY */}
      <div className="alert-summary">

        <div>
          <span>Total Alerts</span>
          <strong>12</strong>
        </div>

        <div>
          <span>High Risk</span>
          <strong className="red-text">4</strong>
        </div>

        <div>
          <span>Medium Risk</span>
          <strong className="yellow-text">5</strong>
        </div>

        <div>
          <span>Resolved</span>
          <strong className="green-text">3</strong>
        </div>

      </div>


      {/* ALERT FILTERS */}
      <div className="alert-filters">

        <button className="filter-active">
          All Alerts
        </button>

        <button>
          High Risk
        </button>

        <button>
          Medium Risk
        </button>

        <button>
          Unread
        </button>

      </div>


      {/* ALERTS */}
      <div className="alerts-container">

        {alerts.map((alert, index) => (

          <div className="full-alert" key={index}>

            <div className={`full-alert-icon ${alert.type.toLowerCase()}`}>
              {alert.type === 'High'
                ? '⚠'
                : alert.type === 'Medium'
                ? '!'
                : '✓'}
            </div>

            <div className="full-alert-content">

              <div className="full-alert-title">

                <strong>{alert.title}</strong>

                <span className={`risk-badge ${alert.type.toLowerCase()}`}>
                  {alert.type} Risk
                </span>

              </div>

              <p>
                Zone {alert.zone} · Change detected: {alert.change}
              </p>

            </div>

            <div className="full-alert-time">
              <strong>{alert.time}</strong>
              <span>{alert.date}</span>
            </div>

            <button className="details-button">
              View
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Alerts