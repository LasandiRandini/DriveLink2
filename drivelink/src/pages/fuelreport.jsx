import React from 'react';

const FuelReport = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white">
        <ul className="space-y-4 p-6">
          <li>
            <p className="text-xl font-semibold" id="usernametag">Hi, -- !</p>
            <button onClick={() => alert('Toggle Sidebar')} id="toggle-btn" className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" />
              </svg>
            </button>
          </li>
          <li><a href="/dashboard" className="flex items-center text-sm hover:text-gray-400"><span>Dashboard</span></a></li>
          <li><a href="/fuelstatus" className="flex items-center text-sm hover:text-gray-400"><span>Fuel Status</span></a></li>
          <li><a href="/batterystatus" className="flex items-center text-sm hover:text-gray-400"><span>Battery Status</span></a></li>
          <li><a href="/livetraking" className="flex items-center text-sm hover:text-gray-400"><span>Live Tracking</span></a></li>
          <li><a href="/tripmange" className="flex items-center text-sm hover:text-gray-400"><span>Trip Manage</span></a></li>
          <li><a href="/vehicalhelth" className="flex items-center text-sm hover:text-gray-400"><span>Vehicle Health</span></a></li>
          <li className="relative">
            <button onClick={() => alert('Toggle SubMenu')} className="flex items-center text-sm text-white">
              <span>Report</span>
            </button>
            <ul className="absolute left-64 bg-gray-700 text-white mt-2 space-y-2 p-2">
              <li><a href="/tripreport" className="hover:text-gray-400">Trip Report</a></li>
              <li><a href="/fuelreport" className="hover:text-gray-400">Fuel Report</a></li>
              <li><a href="/batteryreport" className="hover:text-gray-400">Battery Report</a></li>
            </ul>
          </li>
          <li><a href="/profile" className="flex items-center text-sm hover:text-gray-400"><span>Profile</span></a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-600">
            Drive<span className="text-blue-500">Link</span>
          </h1>
          <p className="text-xl">Reports</p>
        </div>
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold">Fuel Report</h1>
        </div>
      </main>
    </div>
  );
};

export default FuelReport;
