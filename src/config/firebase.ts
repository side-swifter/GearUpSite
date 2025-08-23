// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpd-dzCJDsJcMnivSmPR2kFJfwvfAm8V0",
  authDomain: "gear-up-foundation.firebaseapp.com",
  projectId: "gear-up-foundation",
  storageBucket: "gear-up-foundation.firebasestorage.app",
  messagingSenderId: "758177485430",
  appId: "1:758177485430:web:ceede16604abc718a10557",
  measurementId: "G-238YR9EL8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
