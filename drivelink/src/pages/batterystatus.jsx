import React, { useState, useEffect } from "react";
import { FaBatteryFull, FaBatteryThreeQuarters, FaBatteryHalf, FaBatteryQuarter, FaBatteryEmpty, FaPlug, FaInfoCircle } from "react-icons/fa";

const BatteryStatus = () => {
  const [batteryLevel, setBatteryLevel] = useState(40);
  const [batteryHealth, setBatteryHealth] = useState("Good");
  const [batteryPower, setBatteryPower] = useState("12W");
  const [estimatedLife, setEstimatedLife] = useState("5 hours");
  const [chargingTime, setChargingTime] = useState("2 hours");
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    // Simulating battery level changes
    const interval = setInterval(() => {
      setBatteryLevel((prev) => {
        if (isCharging) {
          return prev >= 100 ? 100 : prev + 1;
        } else {
          return prev <= 0 ? 0 : prev - 1;
        }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isCharging]);

  const getBatteryIcon = () => {
    if (batteryLevel >= 80) return <FaBatteryFull className="text-green-500" />;
    if (batteryLevel >= 60) return <FaBatteryThreeQuarters className="text-green-400" />;
    if (batteryLevel >= 40) return <FaBatteryHalf className="text-yellow-500" />;
    if (batteryLevel >= 20) return <FaBatteryQuarter className="text-orange-500" />;
    return <FaBatteryEmpty className="text-red-500" />;
  };

  const toggleCharging = () => {
    setIsCharging(!isCharging);
  };

  return (
    <div className=" bg-gray-100 text-gray-900 flex">
      {/* Main Content */}
      <main className="p-6 lg:p-8 ml-0 lg:ml-64">
        <div className=" mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Battery Status</h1>
              <p className="text-gray-600">Monitor your vehicle's battery performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
                <FaInfoCircle className="text-gray-600" />
              </button>
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full absolute -top-1 -right-1 animate-pulse"></div>
                <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Battery Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500">Battery Level</p>
                  <h2 className="text-3xl font-bold mt-2">{batteryLevel}%</h2>
                </div>
                <div className="text-4xl">
                  {getBatteryIcon()}
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${batteryLevel <= 20 ? 'bg-red-500' : batteryLevel <= 50 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                    style={{ width: `${batteryLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500">Battery Health</p>
                  <h2 className="text-3xl font-bold mt-2">{batteryHealth}</h2>
                </div>
                <div className="text-4xl text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
              </div>
              <p className="mt-4 text-gray-600">Optimal condition</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500">Power Consumption</p>
                  <h2 className="text-3xl font-bold mt-2">{batteryPower}</h2>
                </div>
                <div className="text-4xl text-purple-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                  </svg>
                </div>
              </div>
              <p className="mt-4 text-gray-600">Current draw</p>
            </div>
          </div>

          {/* Battery Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Battery Visualization</h2>
              <div className="flex justify-center">
                <div className="relative w-40 h-64 bg-gray-100 rounded-lg border-8 border-gray-300">
                  {/* Battery terminals */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-300 rounded-t-lg"></div>
                  
                  {/* Battery fill */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 rounded-b-md transition-all duration-1000 ${isCharging ? 'animate-pulse' : ''}`}
                    style={{
                      height: `${batteryLevel}%`,
                      backgroundColor:
                        batteryLevel <= 20
                          ? "rgb(239, 68, 68)"
                          : batteryLevel <= 50
                          ? "rgb(234, 179, 8)"
                          : "rgb(34, 197, 94)",
                    }}
                  >
                    {/* Battery charging animation */}
                    {isCharging && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-2xl">
                          <FaPlug />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <button 
                  onClick={toggleCharging}
                  className={`px-6 py-2 rounded-full font-medium ${isCharging ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {isCharging ? 'Charging...' : 'Simulate Charging'}
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Battery Details</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Health Status</span>
                  <span className="font-medium">{batteryHealth}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Current Power</span>
                  <span className="font-medium">{batteryPower}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Estimated Life</span>
                  <span className="font-medium">{estimatedLife}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Charging Time</span>
                  <span className="font-medium">{chargingTime}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Charging Status</span>
                  <span className="font-medium">{isCharging ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Battery Tips */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Battery Maintenance Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Avoid deep discharges below 20%",
                "Keep battery between 20%-80% for daily use",
                "Avoid extreme temperatures",
                "Use manufacturer-approved chargers",
                "Update vehicle software regularly",
                "Perform regular battery checks"
              ].map((tip, index) => (
                <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                  <div className="bg-blue-100 p-1 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BatteryStatus;