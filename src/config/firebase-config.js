// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
import Auth from "../pages/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqlPkrUzO9h2ggZ8RAKG6SB5RNRPpsjQ0",
  authDomain: "expense-1ccda.firebaseapp.com",
  projectId: "expense-1ccda",
  storageBucket: "expense-1ccda.appspot.com",
  messagingSenderId: "716899840475",
  appId: "1:716899840475:web:295fbc12a52d4ecb3e37fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db=getFirestore(app);