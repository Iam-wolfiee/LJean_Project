import { Routes, Route } from 'react-router-dom';
import Signup from './signup.jsx';
import Login from './login.jsx';
import OwnerDashboard from './dashboards/OwnerDashboard';
import ManagerDashboard from './dashboards/ManagerDashboard';
import StaffDashboard from './dashboards/StaffDashboard';
import SalesDashboard from './dashboards/SalesDashboard';



function Router() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/owner" element={<OwnerDashboard />} />
      <Route path="/manager" element={<ManagerDashboard />} />
      <Route path="/staff" element={<StaffDashboard />} />
      <Route path="/sales" element={<SalesDashboard />} />
    </Routes>
  );
}

export default Router;
