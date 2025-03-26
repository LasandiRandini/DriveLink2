import React, { useEffect, useState } from "react";
import { database } from "../firebase"; // Correct import path
import { ref, onValue } from "firebase/database"; // Firebase database functions

const FuelStatus = () => {
  const [fuelLevel, setFuelLevel] = useState(0);
  const [fuelDetails, setFuelDetails] = useState({
    fuelConsumptionRate: 0,
    fuelEfficiency: 0,
    fuelCostEstimation: 0,
  });

  useEffect(() => {
    const deviceId = localStorage.getItem("deviceId");

    if (deviceId) {
      const userRef = ref(database, `${deviceId}/fuel_sensor`);
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const currentLevel = data.value;
          setFuelLevel(currentLevel);
          updateFuelLevel(currentLevel);
          setFuelDetails({
            fuelConsumptionRate: 5, // Example data
            fuelEfficiency: 10, // Example data
            fuelCostEstimation: 20, // Example data
          });
        }
      });
    }
  }, []);

  const updateFuelLevel = (currentLevel) => {
    const min_value = parseFloat(localStorage.getItem("min_value"));
    const max_value = parseFloat(localStorage.getItem("max_value"));

    if (max_value === min_value) {
      console.error("Max level and min level are the same. Cannot calculate fuel level.");
      return;
    }

    let fuelPercentage = ((currentLevel - min_value) / (max_value - min_value)) * 100;
    fuelPercentage = Math.max(0, Math.min(100, fuelPercentage));
    setFuelLevel(fuelPercentage);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white p-4">
        <ul className="space-y-4">
          <li>
            <p className="text-xl font-semibold" id="usernametag">
              Hi, -- !
            </p>
            <button onClick={() => alert("Toggle Sidebar")} id="toggle-btn" className="text-white mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" fill="#e8eaed">
                <path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z" />
              </svg>
            </button>
          </li>
          <li>
            <a href="/dashboard" className="flex items-center text-sm hover:text-gray-400">
              Dashboard
            </a>
          </li>
          <li className="active">
            <a href="/fuelstatus" className="flex items-center text-sm hover:text-gray-400">
              Fuel Status
            </a>
          </li>
          <li>
            <a href="/batterystatus" className="flex items-center text-sm hover:text-gray-400">
              Battery Status
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
          <p className="text-xl">Fuel Status</p>
        </div>

        {/* Fuel Gauge */}
        <div className="bg-white shadow-lg p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Fuel Gauge</h2>
          <div className="relative h-64 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="absolute bottom-0 left-0 w-full bg-blue-600"
              style={{ height: `${fuelLevel}%` }}
            ></div>
            <div className="absolute inset-0 flex justify-center items-center">
              <span className="text-3xl font-semibold text-white" id="fuelText">
                {fuelLevel.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Fuel Details */}
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Fuel Details</h2>
          <div>
            <p className="text-lg">Fuel Level: {fuelLevel.toFixed(1)}%</p>
            <p className="text-lg">Fuel Consumption Rate: {fuelDetails.fuelConsumptionRate} L/h</p>
            <p className="text-lg">Fuel Efficiency: {fuelDetails.fuelEfficiency} km/L</p>
            <p className="text-lg">Fuel Cost Estimation: ${fuelDetails.fuelCostEstimation}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FuelStatus;
