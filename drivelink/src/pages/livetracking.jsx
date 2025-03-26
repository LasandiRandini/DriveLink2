import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LiveTracking = () => {
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    // Get device ID from localStorage
    const storedDeviceId = localStorage.getItem('deviceId');
    setDeviceId(storedDeviceId);

    // Initialize Firebase
    const firebaseConfig = {
      apiKey: 'your-api-key',
      authDomain: 'your-auth-domain',
      databaseURL: 'your-database-url',
      projectId: 'your-project-id',
      storageBucket: 'your-storage-bucket',
      messagingSenderId: 'your-sender-id',
      appId: 'your-app-id',
    };
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    
    // Initialize map
    const map = L.map('map').setView([0, 0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const marker = L.marker([0, 0]).addTo(map);
    const userRef = ref(db, `${storedDeviceId}/tracking`);
    
    // Firebase listener for tracking data
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newPos = [data.latitude, data.longitude];
        marker.setLatLng(newPos);
        map.setView(newPos);
      }
    });
  }, []);

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
          <li className="active">
            <a href="livetraking.html" className="flex items-center text-sm hover:text-gray-400">
              Live Tracking
            </a>
          </li>
          <li>
            <a href="fuelstatus.html" className="flex items-center text-sm hover:text-gray-400">
              Fuel Status
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
          <p className="text-xl">Live Tracking</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Live Location Tracker</h2>
          <h3 className="text-lg mb-4">
            Your Device ID: <span className="font-semibold">{deviceId}</span>
          </h3>

          {/* Map Container */}
          <div id="map" className="h-96 w-full mb-4 rounded-lg"></div>

          {/* Additional content if needed */}
          <div className="text-sm text-gray-500">
            <p>Your device's location is displayed in real-time on the map.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveTracking;
