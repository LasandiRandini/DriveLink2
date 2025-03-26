import React from "react";

const BatteryReport = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">Hi, -- !</p>
          <button className="text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 10.5C11.17 10.5 10.5 11.17 10.5 12C10.5 12.83 11.17 13.5 12 13.5C12.83 13.5 13.5 12.83 13.5 12C13.5 11.17 12.83 10.5 12 10.5ZM12 1C5.37 1 0 6.37 0 12C0 17.63 5.37 23 12 23C18.63 23 24 17.63 24 12C24 6.37 18.63 1 12 1ZM12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C16.97 3 21 7.03 21 12C21 16.97 16.97 21 12 21Z" />
            </svg>
          </button>
        </div>
      </nav>

      <main className="p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Battery Report</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Battery Health</h2>
            <p>Battery Health: Excellent</p>
            <p>Battery Power: 25W</p>
            <p>Estimated Battery Life: 5 hours</p>
            <p>Battery Charging Time: 2 hours</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl mb-4">Battery Status</h2>
            <p id="battery-percentage" className="text-2xl">
              Battery: 0%
            </p>
            <div className="relative bg-gray-600 h-48 rounded-xl mt-4">
              <div className="absolute bottom-0 left-0 right-0 bg-green-500 h-[0%] rounded-b-xl" id="charge"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BatteryReport;
