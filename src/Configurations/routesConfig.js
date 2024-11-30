import Dashboard from '../Components/Dashboard';
import ReportBrowser from '../Components/ReportBrowser';
import AuditReport from '../Components/AuditReport';
import ActionTrack from '../Components/ActionTrack';
import UpAudits from '../Components/UpAudits';
import StoreBrowserIn from '../Components/StoreBrowserIn';
import StoreBrowser from '../Components/StoreBrowser';
import StorePerformance from '../Components/StorePerf';
import Login from '../Components/Login';
import AI from '../Components/AI';

const routesConfig = [
  { path: '/', element: <Login />, navbarVisible: false },
  { path: '/dashboard', element: <Dashboard />, navbarVisible: true },
  { path: '/reportBrowser', element: <ReportBrowser />, navbarVisible: true },
  { path: '/auditReport', element: <AuditReport />, navbarVisible: true },
  { path: '/actionTrack', element: <ActionTrack />, navbarVisible: true },
  { path: '/upAudits', element: <UpAudits />, navbarVisible: true },
  { path: '/storeBrowser', element: <StoreBrowser />, navbarVisible: true },
  { path: '/storeBrowserInsights', element: <StoreBrowserIn />, navbarVisible: true },
  { path: '/storePerformance', element: <StorePerformance />, navbarVisible: true },
  { path: '/AI', element: <AI />, navbarVisible: true },
];

export default routesConfig;
