// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const   firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "blog-e5701.firebaseapp.com",
  projectId: "blog-e5701",
  storageBucket: "blog-e5701.appspot.com",
  messagingSenderId: "609235721120",
  appId: "1:609235721120:web:53f2cdbee855aa956f62c5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);