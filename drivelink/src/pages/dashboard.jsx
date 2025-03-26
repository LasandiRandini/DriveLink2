// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { signOut } from "firebase/auth";
import { ref, onValue } from "firebase/database";

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [fuelLevel, setFuelLevel] = useState(0);
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [minLevel, setMinLevel] = useState(0);
  const [maxLevel, setMaxLevel] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchData(user.uid);
      } else {
        // If the user is not logged in, redirect to the login page
        window.location.href = "/login";
      }
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, []);

  const fetchData = (userId) => {
    const userRef = ref(database, `${userId}`);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setFuelLevel(data.fuel_level || 0);
        setBatteryLevel(data.battery_level || 0);
        setUsername(data.username || "User");
        setDeviceId(data.deviceId || "Unknown");

        setMinLevel(data.minLevel || 0);
        setMaxLevel(data.maxLevel || 100);
      }
    });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const clearLocalStorage = () => {
    localStorage.clear();
    alert("LocalStorage cleared!");
  };

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("close");
    const toggleButton = document.getElementById("toggle-btn");
    toggleButton.classList.toggle("rotate");
  };

  return (
    <div id="dashboardPage" className="bg-gray-900 text-white min-h-screen">
      <nav id="sidebar" className="bg-gray-800 p-4">
        <ul>
          <li>
            <p className="logo" id="usernametag">Hi, {username}!</p>
            <button onClick={toggleSidebar} id="toggle-btn">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" fill="#e8eaed">
                <path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Z" />
              </svg>
            </button>
          </li>
          <li className="active">
            <a href="/dashboard">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#e8eaed">
                <path d="M520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560q-17 0-28.5-11.5T520-640ZM120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160q-17 0-28.5-11.5T120-480Z" />
              </svg>
              Dashboard
            </a>
          </li>
          <li>
            <a href="/fuelstatus">
              Fuel Status
            </a>
          </li>
          <li>
            <a href="/batterystatus">
              Battery Status
            </a>
          </li>
          <li>
            <button onClick={handleLogout} className="bg-red-600 p-2 rounded text-white">Logout</button>
          </li>
        </ul>
      </nav>

      <main className="p-6">
        <div className="title-container">
          <h1>Drive<span className="highlight">Link</span></h1>
          <p>Dashboard</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Fuel Monitor */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2>Fuel Monitor</h2>
            <div className="bg-gray-600 h-64 rounded-lg relative">
              <div
                className="bg-green-500 absolute bottom-0 left-0 right-0 rounded-b-lg"
                style={{ height: `${(fuelLevel / maxLevel) * 100}%` }}
              ></div>
            </div>
            <p className="text-center mt-4">Fuel Level: {fuelLevel} L</p>
          </div>

          {/* Battery Monitor */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2>Battery</h2>
            <div className="bg-gray-600 h-64 rounded-lg relative">
              <div
                className="bg-blue-500 absolute bottom-0 left-0 right-0 rounded-b-lg"
                style={{ height: `${(batteryLevel / 12) * 100}%` }}
              ></div>
            </div>
            <p className="text-center mt-4">Battery: {batteryLevel}%</p>
          </div>
        </div>

        <div className="mt-6">
          <h2>Your Device ID: {deviceId}</h2>
          <h3>Min Level: {minLevel}</h3>
          <h3>Max Level: {maxLevel}</h3>
          <p id="ultrasonic-value">Distance: -- cm</p>
          <p id="led-status">LED Status: --</p>
          <button onClick={clearLocalStorage} className="bg-blue-500 p-2 rounded mt-4">Clear LocalStorage</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
