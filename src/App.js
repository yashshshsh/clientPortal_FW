import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar'
import Dashboard from './Components/Dashboard'
import ReportBrowser from './Components/ReportBrowser'
import ActionTrack from './Components/ActionTrack'
import UpAudits from './Components/UpAudits';
import StoreBrowserIn from './Components/StoreBrowserIn';
import StorePerformance from './Components/StorePerf'
import AI from './Components/AI'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path = '/dashboard' element={<Dashboard/>}></Route>
          <Route exact path = '/reportBrowser' element={<ReportBrowser/>}></Route>
          <Route exact path = '/actionTrack' element={<ActionTrack/>}></Route>
          <Route exact path = '/upAudits' element={<UpAudits/>}></Route>
          <Route exact path = '/storeBrowser' element={<StoreBrowserIn/>}></Route>
          <Route exact path = '/storePerformance' element={<StorePerformance/>}></Route>
          <Route exact path = '/AI' element={<AI/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
