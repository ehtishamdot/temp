// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDEsvEAGUe6FIENvim-zMW9FGI42oqKWwo",
    authDomain: "seedinov-10c6d.firebaseapp.com",
    projectId: "seedinov-10c6d",
    storageBucket: "seedinov-10c6d.appspot.com",
    messagingSenderId: "236955398977",
    appId: "1:236955398977:web:a3720758783694be06e7c0",
    measurementId: "G-BMPF4GQYBL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;