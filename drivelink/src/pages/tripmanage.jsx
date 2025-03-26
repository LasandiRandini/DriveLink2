import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getDatabase, ref, onValue } from 'firebase/database';
import L from 'leaflet';

const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  databaseURL: 'your-database-url',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id',
};

const TripManage = () => {
  const [trackingActive, setTrackingActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [movingDuration, setMovingDuration] = useState(0);
  const [topSpeed, setTopSpeed] = useState(0);
  const [path, setPath] = useState([]);
  const [deviceId] = useState(localStorage.getItem("deviceId"));

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const firestore = getFirestore(app);

    // Leaflet map setup
    const map = L.map('map').setView([0, 0], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const marker = L.marker([0, 0]).addTo(map);
    const polyline = L.polyline([], { color: 'red' }).addTo(map);

    const userRef = ref(db, `${deviceId}/tracking`);
    onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const newPos = [data.latitude, data.longitude];

        if (startTime !== null && trackingActive) {
          const lastPos = path[path.length - 1];
          if (lastPos) setTotalDistance(prev => prev + calculateDistance(lastPos, newPos));

          const currentTime = new Date().getTime();
          setTotalDuration((currentTime - startTime) / 1000);
          if (data.speed > 0) setMovingDuration(totalDuration);
          if (data.speed > topSpeed) setTopSpeed(data.speed);
        }

        if (trackingActive) {
          setPath(prev => [...prev, newPos]);
          polyline.setLatLngs(path);
        }

        marker.setLatLng(newPos);
        map.setView(newPos);

        // Update UI elements
        if (document.getElementById("speed")) document.getElementById("speed").innerText = data.speed.toFixed(2);
        if (document.getElementById("satellites")) document.getElementById("satellites").innerText = data.satellites || "N/A";
        if (document.getElementById("distance")) document.getElementById("distance").innerText = totalDistance.toFixed(2);
        if (document.getElementById("duration")) document.getElementById("duration").innerText = totalDuration.toFixed(2);
        if (document.getElementById("movingTime")) document.getElementById("movingTime").innerText = movingDuration.toFixed(2);
        if (document.getElementById("topSpeed")) document.getElementById("topSpeed").innerText = topSpeed.toFixed(2);
      }
    });

    return () => {
      // Cleanup Firebase listener
      userRef.off();
    };
  }, [startTime, totalDuration, totalDistance, movingDuration, topSpeed, path, trackingActive, deviceId]);

  const calculateDistance = (latlng1, latlng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (latlng2[0] - latlng1[0]) * Math.PI / 180;
    const dLon = (latlng2[1] - latlng1[1]) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(latlng1[0] * Math.PI / 180) * Math.cos(latlng2[0] * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const startTracking = () => {
    setTrackingActive(true);
    setStartTime(new Date());
    setTotalDistance(0);
    setTotalDuration(0);
    setMovingDuration(0);
    setTopSpeed(0);
    setPath([]);
  };

  const endTracking = () => {
    setTrackingActive(false);
    setEndTime(new Date());
    setTotalDuration((endTime - startTime) / 1000);
  };

  const saveToFirestore = async () => {
    if (!startTime || !endTime) {
      alert("⚠️ Error: Start or end time missing.");
      return;
    }

    const firestore = getFirestore(initializeApp(firebaseConfig));
    const tripRef = collection(firestore, `tripReports/${deviceId}/trips`);

    const formattedPath = path.map(coords => ({ lat: coords[0], lon: coords[1] }));

    const tripData = {
      distance: totalDistance.toFixed(2) + " km",
      duration: totalDuration.toFixed(2) + " sec",
      movingTime: movingDuration.toFixed(2) + " sec",
      topSpeed: topSpeed.toFixed(2) + " km/h",
      timestamp: new Date().toISOString(),
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      tripDate: startTime.toISOString().split("T")[0],
      route: formattedPath,
    };

    try {
      await addDoc(tripRef, tripData);
      alert("✅ Trip report saved to Firestore!");
    } catch (error) {
      console.error("❌ Error saving to Firestore: ", error);
      alert("❌ Failed to save. Check console.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">DriveLink</h1>
      <h2 className="text-xl text-center mb-4">Live Tracking</h2>

      <div id="map" className="w-full h-96 mb-4"></div>

      <div className="bg-white shadow-md p-4 rounded-lg mb-6">
        <p className="mb-2"><strong>Speed:</strong> <span id="speed">0</span> km/h</p>
        <p className="mb-2"><strong>Distance:</strong> <span id="distance">0</span> km</p>
        <p className="mb-2"><strong>Total Duration:</strong> <span id="duration">0</span> sec</p>
        <p className="mb-2"><strong>Moving Time:</strong> <span id="movingTime">0</span> sec</p>
        <p className="mb-2"><strong>Top Speed:</strong> <span id="topSpeed">0</span> km/h</p>
        <p className="mb-2"><strong>Satellites:</strong> <span id="satellites"></span></p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={startTracking}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Start
        </button>
        <button
          onClick={endTracking}
          id="endButton"
          disabled={!trackingActive}
          className="bg-red-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
        >
          End
        </button>
        <button
          onClick={saveToFirestore}
          id="reportButton"
          disabled={trackingActive}
          className="bg-green-500 text-white py-2 px-4 rounded-lg disabled:opacity-50"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default TripManage;
