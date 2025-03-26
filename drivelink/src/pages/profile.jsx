import React from 'react';

const Profile = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-4">
        <ul className="space-y-4">
          <li>
            <p className="text-xl font-semibold" id="usernametag">Hi, -- !</p>
            <button onClick={() => alert("Toggle Sidebar")} className="text-white mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path
                  d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" />
              </svg>
            </button>
          </li>
          <li>
            <a href="dashboard.html" className="flex items-center text-sm hover:text-gray-400">
              Dashboard
            </a>
          </li>
          <li>
            <a href="fuelstatus.html" className="flex items-center text-sm hover:text-gray-400">
              Fuel Status
            </a>
          </li>
          <li>
            <a href="batterystatus.html" className="flex items-center text-sm hover:text-gray-400">
              Battery Status
            </a>
          </li>
          <li>
            <a href="livetraking.html" className="flex items-center text-sm hover:text-gray-400">
              Live Tracking
            </a>
          </li>
          <li>
            <a href="tripmange.html" className="flex items-center text-sm hover:text-gray-400">
              Trip Manage
            </a>
          </li>
          <li>
            <a href="vehicalhelth.html" className="flex items-center text-sm hover:text-gray-400">
              Vehicle Health
            </a>
          </li>
          <li>
            <button onClick={() => alert('Toggle Report Submenu')} className="text-sm hover:text-gray-400">
              Report
            </button>
            <ul className="sub-menu ml-4">
              <li><a href="tripreport.html">Trip Report</a></li>
              <li><a href="fuelreport.html">Fuel Report</a></li>
              <li><a href="batteryreport.html">Battery Report</a></li>
            </ul>
          </li>
          <li className="active">
            <a href="profile.html" className="flex items-center text-sm text-blue-500">
              Profile
            </a>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            Drive<span className="text-blue-500">Link</span>
          </h1>
          <p className="text-xl">Profile</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

          {/* Profile Content */}
          <div className="text-sm text-gray-500 mb-4">
            <p><strong>Name:</strong> --</p>
            <p><strong>Email:</strong> --</p>
            <p><strong>Device ID:</strong> --</p>
          </div>

          {/* Profile Actions */}
          <div className="space-y-4">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400">
              Edit Profile
            </button>
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400">
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
