import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Import pages and components
import Dashboard from './pages/dashboard.jsx';
import FuelStatus from './pages/fuelstatus.jsx';
import BatteryStatus from './pages/batterystatus.jsx';
import LiveTracking from './pages/livetracking.jsx';
import TripManage from './pages/tripmanage.jsx';
import VehicleHealth from './pages/vehiclehealth.jsx';
import Reports from './pages/reports.jsx';
import BatteryReport from './pages/batteryreport.jsx';
import FuelReport from './pages/fuelreport.jsx';
import TripReport from './pages/tripreport.jsx';
import Profile from './pages/profile.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import GoogleLogin from './pages/GoogleLogin.jsx';

// Sidebar component for consistent navigation
import Sidebar from './components/sidebar.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-0 lg:ml-64">
          <Dashboard />
        </div>
      </div>
    ),
  },
  {
    path: "/fuelstatus",
    element: (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-0 lg:ml-64">
          <FuelStatus />
        </div>
      </div>
    ),
  },
  {
    path: "/batterystatus",
    element: (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-0 lg:ml-64">
          <BatteryStatus />
        </div>
      </div>
    ),
  },
  {
    path: "/livetracking",
    element: (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-0 lg:ml-64">
          <LiveTracking />
        </div>
      </div>
    ),
  },
  {
    path: "/tripmanage",
    element: (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-0 lg:ml-64">
          <TripManage />
        </div>
      </div>
    ),
  },
  {
    path: "/vehiclehealth",
    element: (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-0 lg:ml-64">
          <VehicleHealth />
        </div>
      </div>
    ),
  },
  {
    path: "/reports",
    element: (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-0 lg:ml-64">
          <Reports />
        </div>
      </div>
    ),
  },
  {
    path: "/batteryreport",
    element: (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-0 lg:ml-64">
          <BatteryReport />
        </div>
      </div>
    ),
  },
  {
    path: "/fuelreport",
    element: (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-0 lg:ml-64">
          <FuelReport />
        </div>
      </div>
    ),
  },
  {
    path: "/tripreport",
    element: (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-0 lg:ml-64">
          <TripReport />
        </div>
      </div>
    ),
  },
  {
    path: "/profile",
    element: (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-auto ml-0 lg:ml-64">
          <Profile />
        </div>
      </div>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/google-login",
    element: <GoogleLogin />,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;