import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Layout from './components/Layout'

import Dashboard from './pages/Dashboard'
import LiveMap from './pages/LiveMap'
import MonitoringZones from './pages/MonitoringZones'
import Alerts from './pages/Alerts'
import SatelliteAnalysis from './pages/SatelliteAnalysis'
import AcousticMonitoring from './pages/AcousticMonitoring'
import Reports from './pages/Reports'
import HistoricalData from './pages/HistoricalData'
import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/live-map"
          element={
            <Layout>
              <LiveMap />
            </Layout>
          }
        />

        <Route
          path="/alerts"
          element={
            <Layout>
              <Alerts />
            </Layout>
          }
        />

        <Route
          path="/monitoring-zones"
          element={
            <Layout>
              <MonitoringZones />
            </Layout>
          }
        />

        <Route
          path="/satellite-analysis"
          element={
            <Layout>
              <SatelliteAnalysis />
            </Layout>
          }
        />

        <Route
          path="/acoustic-monitoring"
          element={
            <Layout>
              <AcousticMonitoring />
            </Layout>
          }
        />

        <Route
          path="/reports"
          element={
            <Layout>
              <Reports />
            </Layout>
          }
        />

        <Route
          path="/historical-data"
          element={
            <Layout>
              <HistoricalData />
            </Layout>
          }
        />

        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />



        {/* DEFAULT */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* UNKNOWN URL */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App