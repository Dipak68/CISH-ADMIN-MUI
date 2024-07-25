// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf9yacg9HdJ1_dQHMu-haHz_QsstuK3fQ",
  authDomain: "cris-932e9.firebaseapp.com",
  projectId: "cris-932e9",
  storageBucket: "cris-932e9.appspot.com",
  messagingSenderId: "245978667892",
  appId: "1:245978667892:web:e44b1a60bb6f8f04746a21",
  measurementId: "G-RRNBJ2G94R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app)