import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaGasPump, FaBatteryFull, FaMapMarkerAlt, FaCar, FaClipboard, FaUser, FaCog, FaBell } from 'react-icons/fa';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const handleSidebarToggle = () => {
    setCollapsed(!collapsed);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  return (
    <div className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white p-4 h-screen fixed transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} shadow-xl z-10`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-8">
        {!collapsed && <h1 className="text-xl font-bold">EV Dashboard</h1>}
        <button
          className="text-white focus:outline-none hover:bg-gray-700 p-2 rounded-lg"
          onClick={handleSidebarToggle}
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* User Profile */}
      {!collapsed && (
        <div className="flex items-center space-x-3 mb-8 p-3 bg-gray-700 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="font-bold">U</span>
          </div>
          <div>
            <p className="font-semibold">Welcome Back</p>
            <p className="text-sm text-gray-300">User</p>
          </div>
        </div>
      )}

      {/* Sidebar Links */}
      <ul className="space-y-2">
        {[
          { path: "/", icon: <FaTachometerAlt className="text-xl" />, label: "Dashboard" },
          { path: "/fuelstatus", icon: <FaGasPump className="text-xl" />, label: "Fuel Status" },
          { path: "/batterystatus", icon: <FaBatteryFull className="text-xl" />, label: "Battery Status" },
          { path: "/livetracking", icon: <FaMapMarkerAlt className="text-xl" />, label: "Live Tracking" },
          { path: "/tripmanage", icon: <FaCar className="text-xl" />, label: "Trip Manage" },
          { path: "/vehiclehealth", icon: <FaClipboard className="text-xl" />, label: "Vehicle Health" },
          { path: "/reports", icon: <FaClipboard className="text-xl" />, label: "Reports" },
          { path: "/profile", icon: <FaUser className="text-xl" />, label: "Profile" },
        ].map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 ${activeLink === item.path ? 'bg-blue-600 text-white' : 'hover:bg-gray-700'}`}
              onClick={() => handleLinkClick(item.path)}
            >
              <span className={`${activeLink === item.path ? 'text-white' : 'text-gray-300'}`}>
                {item.icon}
              </span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Bottom Settings */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-gray-400">
            <button className="p-2 hover:text-white">
              <FaCog className="text-xl" />
            </button>
            <button className="p-2 hover:text-white">
              <FaBell className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;