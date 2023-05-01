// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALGSfKVMbRc0rE_BM6oCNuG1XJW8dZ9Mc",
  authDomain: "enu-ai.firebaseapp.com",
  projectId: "enu-ai",
  storageBucket: "enu-ai.appspot.com",
  messagingSenderId: "417157058262",
  appId: "1:417157058262:web:06ae01a8fa9ccab32d0377",
  measurementId: "G-E0HFRQHF9P",
  databaseURL:"https://enu-ai-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
