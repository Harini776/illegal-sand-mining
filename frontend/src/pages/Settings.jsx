import '../App.css'
import { useState } from 'react'
import BackButton from '../components/BackButton'

function Settings() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  return (
    <div className="settings-page">

      {/* HEADER */}
      <div className="page-title">

        <div className="page-title-left">

          {/* BACK BUTTON */}
          <BackButton />

          <div>
            <h1>System Settings</h1>
            <p>Configure monitoring, alerts and system preferences</p>
          </div>

        </div>

        <button
          className="save-settings"
          onClick={handleSave}
        >
          Save Changes
        </button>

      </div>


      {/* SAVE MESSAGE */}
      {saved && (
        <div className="save-message">
          ✓ Settings saved successfully
        </div>
      )}


      {/* MONITORING */}
      <div className="settings-section">

        <div className="settings-section-title">

          <div className="settings-section-icon">
            ◉
          </div>

          <div>
            <h2>Monitoring Configuration</h2>
            <p>Control how monitoring zones are analyzed</p>
          </div>

        </div>


        <div className="settings-grid">

          <div className="setting-item">

            <div>
              <strong>Real-time Monitoring</strong>
              <span>Continuously monitor active zones</span>
            </div>

            <label className="toggle">
              <input
                type="checkbox"
                defaultChecked
              />
              <span></span>
            </label>

          </div>


          <div className="setting-item">

            <div>
              <strong>Automatic Risk Analysis</strong>
              <span>Automatically calculate zone risk scores</span>
            </div>

            <label className="toggle">
              <input
                type="checkbox"
                defaultChecked
              />
              <span></span>
            </label>

          </div>

        </div>

      </div>


      {/* ALERTS */}
      <div className="settings-section">

        <div className="settings-section-title">

          <div className="settings-section-icon">
            ⚠
          </div>

          <div>
            <h2>Alert Configuration</h2>
            <p>Set thresholds for mining activity alerts</p>
          </div>

        </div>


        <div className="threshold-settings">

          <div className="threshold-item">

            <label>High Risk Threshold</label>

            <div className="range-row">

              <input
                type="range"
                min="50"
                max="100"
                defaultValue="80"
              />

              <strong>80%</strong>

            </div>

            <span>
              Alert when risk score exceeds this value
            </span>

          </div>


          <div className="threshold-item">

            <label>Acoustic Activity Threshold</label>

            <div className="range-row">

              <input
                type="range"
                min="30"
                max="100"
                defaultValue="70"
              />

              <strong>70%</strong>

            </div>

            <span>
              Trigger alert for abnormal acoustic activity
            </span>

          </div>

        </div>

      </div>


      {/* DATA SOURCES */}
      <div className="settings-section">

        <div className="settings-section-title">

          <div className="settings-section-icon">
            ◈
          </div>

          <div>
            <h2>Data Sources</h2>
            <p>Manage connected monitoring systems</p>
          </div>

        </div>


        <div className="source-list">

          <div className="source-item">

            <div className="source-info">

              <div className="source-icon">
                🛰️
              </div>

              <div>
                <strong>Satellite Monitoring</strong>
                <span>
                  Satellite imagery and change detection
                </span>
              </div>

            </div>

            <span className="connection-status">
              ● Connected
            </span>

          </div>


          <div className="source-item">

            <div className="source-info">

              <div className="source-icon">
                🔊
              </div>

              <div>
                <strong>Acoustic Sensors</strong>
                <span>
                  Real-time machinery and sound detection
                </span>
              </div>

            </div>

            <span className="connection-status">
              ● Connected
            </span>

          </div>

        </div>

      </div>


      {/* NOTIFICATIONS */}
      <div className="settings-section">

        <div className="settings-section-title">

          <div className="settings-section-icon">
            🔔
          </div>

          <div>
            <h2>Notifications</h2>
            <p>
              Choose which events should generate notifications
            </p>
          </div>

        </div>


        <div className="notification-list">

          <div className="notification-item">

            <div>
              <strong>High-risk alerts</strong>
              <span>
                Receive notifications for high-risk zones
              </span>
            </div>

            <label className="toggle">

              <input
                type="checkbox"
                defaultChecked
              />

              <span></span>

            </label>

          </div>


          <div className="notification-item">

            <div>
              <strong>Satellite changes</strong>
              <span>
                Notify when significant changes are detected
              </span>
            </div>

            <label className="toggle">

              <input
                type="checkbox"
                defaultChecked
              />

              <span></span>

            </label>

          </div>


          <div className="notification-item">

            <div>
              <strong>Acoustic events</strong>
              <span>
                Notify about suspicious machinery activity
              </span>
            </div>

            <label className="toggle">

              <input type="checkbox" />

              <span></span>

            </label>

          </div>

        </div>

      </div>


      {/* SYSTEM STATUS */}
      <div className="system-status">

        <div>
          <span>System Status</span>
          <strong>All systems operational</strong>
        </div>

        <div className="online-status">

          <span></span>

          Online

        </div>

      </div>

    </div>
  )
}

export default Settings