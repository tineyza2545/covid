// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseApp = initializeApp({
  apiKey: "AIzaSyA1Obo0AScvvRAR5LzqxxEzD4Ln5y8qLys",
  authDomain: "database-64a5a.firebaseapp.com",
  projectId: "database-64a5a",
  storageBucket: "database-64a5a.appspot.com",
  messagingSenderId: "810768994689",
  appId: "1:810768994689:web:24fa60a3420762f40f5880",
  measurementId: "G-X70Y6FJN4X",
});

const db = getFirestore(firebaseApp);
export default db;
