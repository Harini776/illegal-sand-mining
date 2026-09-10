import '../App.css'
import BackButton from '../components/BackButton'

function Reports() {
  const reports = [
    {
      id: 'RPT-014',
      title: 'North River Area Mining Report',
      zone: 'Z-14',
      date: '30 Aug 2026',
      risk: 'High',
      status: 'Ready'
    },
    {
      id: 'RPT-009',
      title: 'East River Area Monitoring Report',
      zone: 'Z-03',
      date: '29 Aug 2026',
      risk: 'High',
      status: 'Ready'
    },
    {
      id: 'RPT-021',
      title: 'South River Area Activity Report',
      zone: 'Z-21',
      date: '28 Aug 2026',
      risk: 'Low',
      status: 'Submitted'
    },
    {
      id: 'RPT-007',
      title: 'Central River Area Analysis',
      zone: 'Z-07',
      date: '27 Aug 2026',
      risk: 'Medium',
      status: 'Pending Review'
    }
  ]

  return (
    <div className="reports-page">

      {/* PAGE HEADER */}
      <div className="page-title">

        <div className="page-title-left">

          {/* BACK BUTTON */}
          <BackButton />

          <div>
            <h1>Reports</h1>
            <p>
              Generate and manage illegal sand mining monitoring reports
            </p>
          </div>

        </div>

        <button className="generate-btn">
          + Generate Report
        </button>

      </div>


      {/* REPORT SUMMARY */}
      <div className="report-summary">

        <div className="report-stat">
          <span>Reports Generated</span>
          <strong>48</strong>
        </div>

        <div className="report-stat">
          <span>Pending Review</span>
          <strong className="yellow-text">6</strong>
        </div>

        <div className="report-stat">
          <span>Submitted</span>
          <strong className="green-text">32</strong>
        </div>

        <div className="report-stat">
          <span>This Month</span>
          <strong>18</strong>
        </div>

      </div>


      {/* REPORT PANEL */}
      <div className="report-panel">

        <div className="report-toolbar">

          <input
            type="text"
            placeholder="Search reports..."
          />

          <select>
            <option>All Risk Levels</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select>
            <option>All Status</option>
            <option>Ready</option>
            <option>Submitted</option>
            <option>Pending Review</option>
          </select>

        </div>


        {/* REPORT LIST */}
        <div className="reports-list">

          {reports.map((report) => (

            <div
              className="report-card"
              key={report.id}
            >

              <div className="report-icon">
                📄
              </div>


              <div className="report-info">

                <h3>
                  {report.title}
                </h3>

                <p>
                  {report.id} • {report.zone} • {report.date}
                </p>

              </div>


              <span
                className={`risk-badge ${report.risk.toLowerCase()}`}
              >
                {report.risk}
              </span>


              <span
                className={`status-badge ${
                  report.status
                    .toLowerCase()
                    .replaceAll(' ', '-')
                }`}
              >
                {report.status}
              </span>


              <button className="view-report">
                View
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}

export default Reports