import '../App.css'
import { Link } from 'react-router-dom'

function Dashboard() {

  const stats = [
    {
      title: 'Total Monitored Zones',
      value: '24',
      change: '2 new this week',
      icon: '📡',
      type: 'blue'
    },
    {
      title: 'High Risk Zones',
      value: '4',
      change: '1 from last week',
      icon: '⚠️',
      type: 'red'
    },
    {
      title: 'Medium Risk Zones',
      value: '7',
      change: '2 from last week',
      icon: '!',
      type: 'yellow'
    },
    {
      title: 'Low Risk Zones',
      value: '13',
      change: '1 from last week',
      icon: '🛡️',
      type: 'green'
    },
    {
      title: 'Alerts (This Week)',
      value: '12',
      change: '4 from last week',
      icon: '🔔',
      type: 'purple'
    }
  ]

  const alerts = [
    {
      icon: '⚠️',
      title: 'High risk activity detected in Zone Z-14',
      info: 'Change detected: 87% | Machinery activity: High',
      time: '10:20 AM',
      date: '30 Aug 2026',
      type: 'danger'
    },
    {
      icon: '⚠️',
      title: 'Suspicious activity in Zone Z-07',
      info: 'Change detected: 45% | Machinery activity: Medium',
      time: '08:15 AM',
      date: '30 Aug 2026',
      type: 'warning'
    },
    {
      icon: '⚠️',
      title: 'High risk activity detected in Zone Z-03',
      info: 'Change detected: 92% | Machinery activity: High',
      time: '06:40 PM',
      date: 'Yesterday',
      type: 'danger'
    }
  ]

  const highRiskZones = [
    ['Zone Z-14', '91%'],
    ['Zone Z-03', '88%'],
    ['Zone Z-21', '82%'],
    ['Zone Z-18', '77%']
  ]

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <header className="header">

        <div className="header-left">

          <button className="menu-button">
            ☰
          </button>

          <div>
            <h1>Dashboard</h1>
            <p>Overview of monitored areas and mining risk</p>
          </div>

        </div>

        <div className="header-right">

          <div className="date-box">
            📅 &nbsp; 24 Aug 2026 - 30 Aug 2026
            <span>⌄</span>
          </div>

          <div className="notification">
            🔔
            <span className="notification-count">3</span>
          </div>

          <div className="admin">

            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>

            <span>⌄</span>

          </div>

        </div>

      </header>


      {/* DASHBOARD CONTENT */}
      <div className="content">

        {/* STAT CARDS */}
        <section className="stats-grid">

          {stats.map((stat) => (

            <div
              className={`stat-card ${stat.type}`}
              key={stat.title}
            >

              <div>

                <p className="stat-title">
                  {stat.title}
                </p>

                <h2>
                  {stat.value}
                </h2>

                <p className="stat-change">
                  ↑ {stat.change}
                </p>

              </div>

              <div className="stat-icon">
                {stat.icon}
              </div>

            </div>

          ))}

        </section>


        {/* MAP + RISK TREND */}
        <section className="middle-grid">

          {/* LIVE MAP */}
          <div className="panel map-panel">

            <div className="panel-header">

              <h2>
                Live Monitoring Map
              </h2>

              <div className="map-controls">

                <button className="selected">
                  Map
                </button>

                <button>
                  Satellite
                </button>

                <button>
                  ⛶
                </button>

              </div>

            </div>


            <div className="map-area">

              <div className="river"></div>

              <div className="map-marker red-marker marker-one">
                4
              </div>

              <div className="map-marker red-marker marker-two">
                3
              </div>

              <div className="map-marker red-marker marker-three">
                3
              </div>

              <div className="map-marker yellow-marker marker-four">
                6
              </div>

              <div className="map-marker yellow-marker marker-five">
                7
              </div>

              <div className="map-marker green-marker marker-six">
                2
              </div>

              <div className="map-marker green-marker marker-seven">
                2
              </div>

              <div className="map-marker green-marker marker-eight">
                2
              </div>

              <div className="map-marker green-marker marker-nine">
                3
              </div>


              <div className="map-zoom">

                <button>+</button>
                <button>−</button>
                <button>◉</button>
                <button>▽</button>

              </div>


              <div className="map-legend">

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


              <Link
                className="view-zones"
                to="/monitoring-zones"
              >
                View All Zones →
              </Link>

            </div>

          </div>


          {/* RISK CHART */}
          <div className="panel chart-panel">

            <div className="panel-header">

              <h2>
                Risk Trend <span>(This Week)</span>
              </h2>

              <button className="week-button">
                This Week ⌄
              </button>

            </div>


            <div className="chart">

              <div className="y-axis">
                <span>100</span>
                <span>75</span>
                <span>50</span>
                <span>25</span>
                <span>0</span>
              </div>


              <div className="chart-area">

                <div className="grid-line one"></div>
                <div className="grid-line two"></div>
                <div className="grid-line three"></div>
                <div className="grid-line four"></div>
                <div className="grid-line five"></div>


                <svg
                  viewBox="0 0 700 260"
                  preserveAspectRatio="none"
                >

                  <polyline
                    points="20,115 130,130 240,55 350,75 460,120 570,115 680,130"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="high-line"
                  />

                  <polyline
                    points="20,160 130,165 240,125 350,130 460,165 570,160 680,170"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="medium-line"
                  />

                  <polyline
                    points="20,205 130,200 240,165 350,180 460,205 570,200 680,205"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="low-line"
                  />

                </svg>

              </div>


              <div className="x-axis">

                <span>24 Aug</span>
                <span>25 Aug</span>
                <span>26 Aug</span>
                <span>27 Aug</span>
                <span>28 Aug</span>
                <span>29 Aug</span>
                <span>30 Aug</span>

              </div>

            </div>


            <div className="chart-legend">

              <span>
                <i className="legend-red"></i>
                High Risk
              </span>

              <span>
                <i className="legend-yellow"></i>
                Medium Risk
              </span>

              <span>
                <i className="legend-green"></i>
                Low Risk
              </span>

            </div>

          </div>

        </section>


        {/* BOTTOM SECTION */}
        <section className="bottom-grid">

          {/* RECENT ALERTS */}
          <div className="panel">

            <div className="panel-header">

              <h2>
                Recent Alerts
              </h2>

              <Link to="/alerts">
                View All
              </Link>

            </div>


            <div className="alerts-list">

              {alerts.map((alert) => (

                <div
                  className="alert-item"
                  key={alert.title}
                >

                  <div
                    className={`alert-icon ${alert.type}`}
                  >
                    {alert.icon}
                  </div>

                  <div className="alert-info">

                    <strong>
                      {alert.title}
                    </strong>

                    <p>
                      {alert.info}
                    </p>

                  </div>

                  <div className="alert-time">

                    <span>
                      {alert.time}
                    </span>

                    <small>
                      {alert.date}
                    </small>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* ZONE OVERVIEW */}
          <div className="panel zone-panel">

            <div className="panel-header">

              <h2>
                Zone Overview
              </h2>

              <Link to="/monitoring-zones">
                View All
              </Link>

            </div>


            <div className="zone-content">

              <div className="donut">

                <div>
                  <strong>24</strong>
                  <span>Total Zones</span>
                </div>

              </div>


              <div className="zone-legend">

                <div>

                  <span className="legend-red"></span>

                  <section>
                    <strong>High Risk (4)</strong>
                    <small>16.7%</small>
                  </section>

                </div>


                <div>

                  <span className="legend-yellow"></span>

                  <section>
                    <strong>Medium Risk (7)</strong>
                    <small>29.2%</small>
                  </section>

                </div>


                <div>

                  <span className="legend-green"></span>

                  <section>
                    <strong>Low Risk (13)</strong>
                    <small>54.1%</small>
                  </section>

                </div>

              </div>

            </div>

          </div>


          {/* HIGH RISK ZONES */}
          <div className="panel">

            <div className="panel-header">

              <h2>
                Top High Risk Zones
              </h2>

              <Link to="/monitoring-zones">
                View All
              </Link>

            </div>


            <div className="risk-zones">

              {highRiskZones.map((zone, index) => (

                <div
                  className="risk-zone"
                  key={zone[0]}
                >

                  <div className="rank">
                    {index + 1}
                  </div>

                  <div className="zone-name">

                    <strong>
                      {zone[0]}
                    </strong>

                    <div className="risk-bar">

                      <span
                        style={{
                          width: zone[1]
                        }}
                      ></span>

                    </div>

                  </div>


                  <div className="risk-score">

                    <small>
                      Risk Score
                    </small>

                    <strong>
                      {zone[1]}
                    </strong>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* QUICK ACTIONS */}
          <div className="panel">

            <div className="panel-header">
              <h2>Quick Actions</h2>
            </div>

            <div className="quick-actions">

              <Link to="/monitoring-zones">
                <span>📍</span>
                Add New Zone
              </Link>

              <Link to="/reports">
                <span>📄</span>
                Generate Report
              </Link>

              <Link to="/alerts">
                <span>🔔</span>
                View Alerts
              </Link>

              <Link to="/settings">
                <span>⚙️</span>
                System Settings
              </Link>

            </div>

          </div>

        </section>

      </div>


      {/* FOOTER */}
      <footer>
        SandWatch AI – Protecting Rivers. Protecting Future.
      </footer>

    </div>
  )
}

export default Dashboard