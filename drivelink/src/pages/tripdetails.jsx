import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // React Router to handle dynamic routes
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import L from "leaflet";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  databaseURL: "your-database-url",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

const TripDetails = () => {
  const { tripId } = useParams(); // Retrieve the tripId from URL params
  const [tripData, setTripData] = useState(null);
  
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    // Fetch trip data from Firestore based on tripId
    const loadTripData = async () => {
      try {
        const deviceId = localStorage.getItem("deviceId");
        const tripRef = doc(db, `tripReports/${deviceId}/trips`, tripId);
        const tripSnapshot = await getDoc(tripRef);

        if (tripSnapshot.exists()) {
          setTripData(tripSnapshot.data());
          renderMap(tripSnapshot.data().route);
        } else {
          console.log("No trip found with ID:", tripId);
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    loadTripData();
  }, [tripId]);

  const renderMap = (route) => {
    const map = L.map("map").setView([route[0].lat, route[0].lon], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const latLngs = route.map((point) => [point.lat, point.lon]);
    L.polyline(latLngs, { color: "blue" }).addTo(map);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">DriveLink</h1>
      <h2 className="text-xl text-center mb-4">Trip Details</h2>

      {tripData ? (
        <div className="bg-white shadow-md p-4 rounded-lg">
          <h3 className="text-xl font-bold mb-4">{`Trip - ${tripData.tripDate}`}</h3>
          <p>
            <strong>Distance:</strong> {tripData.distance}
          </p>
          <p>
            <strong>Duration:</strong> {tripData.duration}
          </p>
          <p>
            <strong>Top Speed:</strong> {tripData.topSpeed}
          </p>
          <p>
            <strong>Moving Time:</strong> {tripData.movingTime}
          </p>
          <p>
            <strong>Start Time:</strong> {tripData.startTime}
          </p>
          <p>
            <strong>End Time:</strong> {tripData.endTime}
          </p>

          <div id="map" className="w-full h-96 mt-6"></div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading trip details...</p>
      )}
    </div>
  );
};

export default TripDetails;
