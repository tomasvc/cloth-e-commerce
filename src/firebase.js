// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZiDP7YVBUXtwPfr0i_b0FQnIL3e5nmGY",
  authDomain: "clothing-store-e17ce.firebaseapp.com",
  projectId: "clothing-store-e17ce",
  storageBucket: "clothing-store-e17ce.appspot.com",
  messagingSenderId: "377376276086",
  appId: "1:377376276086:web:cfc61b8164f55e45452957",
  measurementId: "G-MBNT92V8BT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
app();