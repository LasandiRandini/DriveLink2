// src/components/GoogleLogin.jsx
import React from 'react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const GoogleLogin = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await userRef.get();

      if (!docSnap.exists()) {
        // If user does not exist, create a new document
        const username = prompt("Enter your username:");
        const deviceId = prompt("Enter your device ID:");
        const vehicleType = prompt("Enter your vehicle type:");
        const mileage = prompt("Enter your vehicle mileage:");

        await setDoc(userRef, {
          username,
          email: user.email,
          deviceId,
          vehicleType,
          mileage,
          timestamp: new Date(),
        });
      }

      alert("Login successful! Redirecting...");
      window.location.href = "/dashboard"; // Redirect to dashboard
    } catch (error) {
      console.error("Google Login error:", error.message);
      alert("Google login failed: " + error.message);
    }
  };

  return (
    <div className="container">
      <button onClick={handleGoogleLogin} className="google-btn">Login with Google</button>
    </div>
  );
};

export default GoogleLogin;
