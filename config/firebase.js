// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCHjAwqudLGMwauWaSruvK9wjrFEO1954",
  authDomain: "travel-forecast-weather.firebaseapp.com",
  projectId: "travel-forecast-weather",
  storageBucket: "travel-forecast-weather.appspot.com",
  messagingSenderId: "385421610067",
  appId: "1:385421610067:web:9e120d59d832b50dcbcaa6",
  measurementId: "G-MCL0JYH5GK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()