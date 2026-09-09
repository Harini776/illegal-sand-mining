import '../App.css'
import { Link } from 'react-router-dom'

function Layout({ children }) {
  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-logo">🛡️</div>

          <div>
            <h2>SandWatch AI</h2>
            <p>Illegal Sand Mining</p>
            <p>Detection System</p>
          </div>
        </div>

        <nav className="sidebar-nav">

          <Link to="/dashboard">
            <span>⌂</span>
            Dashboard
          </Link>

          <Link to="/live-map">
            <span>📍</span>
            Live Map
          </Link>

          <Link to="/alerts">
            <span>🔔</span>
            Alerts
          </Link>

          <Link to="/monitoring-zones">
            <span>▣</span>
            Monitoring Zones
          </Link>

          <Link to="/satellite-analysis">
            <span>◩</span>
            Satellite Analysis
          </Link>

          <Link to="/acoustic-monitoring">
            <span>◖</span>
            Acoustic Monitoring
          </Link>

          <Link to="/reports">
            <span>▤</span>
            Reports
          </Link>

          <Link to="/historical-data">
            <span>◷</span>
            Historical Data
          </Link>

          <Link to="/settings">
            <span>⚙</span>
            Settings
          </Link>

        </nav>

        <div className="system-status">
          <h3>System Status</h3>

          <div className="status-online">
            <span></span>
            All Systems Operational
          </div>

          <p>Last Updated: 30 Aug 2026</p>
          <p>10:30 AM</p>
        </div>

      </aside>


      {/* PAGE CONTENT */}
      <main className="main-content">
        {children}
      </main>

    </div>
  )
}

export default Layout