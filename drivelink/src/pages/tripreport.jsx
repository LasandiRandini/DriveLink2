import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import L from 'leaflet';

const TripReport = () => {
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Firebase
    const firebaseConfig = {
      apiKey: 'your-api-key',
      authDomain: 'your-auth-domain',
      databaseURL: 'your-database-url',
      projectId: 'your-project-id',
      storageBucket: 'your-storage-bucket',
      messagingSenderId: 'your-messaging-sender-id',
      appId: 'your-app-id',
    };
    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const loadTripData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tripId = urlParams.get('tripId');
      const deviceId = localStorage.getItem('deviceId');

      if (!deviceId || !tripId) {
        console.error('Device ID or Trip ID is missing');
        return;
      }

      const tripRef = collection(db, `tripReports/${deviceId}/trips`);
      const snapshot = await getDocs(tripRef);

      if (!snapshot.empty) {
        const data = snapshot.docs.map(doc => doc.data());
        const trip = data.find(item => item.tripId === tripId); // Assuming tripId is available in data

        if (trip) {
          setTripData(trip);
        } else {
          console.error('No trip found with the given tripId');
        }
      } else {
        console.error('No data found for the trip');
      }

      setLoading(false);
    };

    loadTripData();
  }, []);

  useEffect(() => {
    if (tripData) {
      const { route } = tripData;

      if (route && route.length > 0) {
        const map = L.map('map').setView([route[0].lat, route[0].lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        const latLngs = route.map(point => [point.lat, point.lon]);
        L.polyline(latLngs, { color: 'blue' }).addTo(map);
      }
    }
  }, [tripData]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8">DriveLink</h1>
      <h2 className="text-xl font-semibold text-center mb-4">Trip Report</h2>

      <div className="mb-6">
        <div className="flex justify-between">
          <p className="font-semibold">Trip Date:</p>
          <span>{tripData.tripDate || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Start Time:</p>
          <span>{tripData.startTime || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">End Time:</p>
          <span>{tripData.endTime || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Total Duration:</p>
          <span>{tripData.duration || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Total Distance:</p>
          <span>{tripData.distance || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <p className="font-semibold">Top Speed:</p>
          <span>{tripData.topSpeed || 'N/A'}</span>
        </div>
      </div>

      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default TripReport;
