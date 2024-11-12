import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import ReportBrowser from './Components/ReportBrowser';
import AuditReport from './Components/AuditReport';
import ActionTrack from './Components/ActionTrack';
import UpAudits from './Components/UpAudits';
import StoreBrowserIn from './Components/StoreBrowserIn';
import StoreBrowser from './Components/StoreBrowser';
import StorePerformance from './Components/StorePerf';
import Login from './Components/Login';
import AI from './Components/AI';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from 'react';

function App() {
  return (
    <Router>
      <AppWithRouter />
    </Router>
  );
}

function AppWithRouter() {
  const location = useLocation();
  const isNavbarVisible = location.pathname !== "/";

  const [state, setState] = useState("trends");

  return (
    <>
      {isNavbarVisible && <Navbar />}
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/reportBrowser" element={<ReportBrowser />} />
        <Route exact path="/auditReport" element={<AuditReport />} />
        <Route exact path="/actionTrack" element={<ActionTrack />} />
        <Route exact path="/upAudits" element={<UpAudits />} />
        <Route exact path="/storeBrowser" element={<StoreBrowser />} />
        <Route exact path="/storeBrowserInsights" element={<StoreBrowserIn state={state} setState={setState}/>} />
        <Route exact path="/storePerformance" element={<StorePerformance setState={setState}/>} />
        <Route exact path="/AI" element={<AI />} />
      </Routes>
    </>
  );
}

export default App;
