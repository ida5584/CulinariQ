// Import the functions you need from the SDKs you need
require("dotenv").config();

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "culinariq.firebaseapp.com",
  projectId: "culinariq",
  storageBucket: "culinariq.appspot.com",
  messagingSenderId: "31183889376",
  appId: "1:31183889376:web:f75a68800bc9fcf4d10185",
  measurementId: "G-XB7ET03M8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);