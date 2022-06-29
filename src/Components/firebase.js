// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1OvFMNVBO1iSNtY4kR6G4-hdqC2m_ML0",
  authDomain: "mern-whatsapp-clone-2acd3.firebaseapp.com",
  projectId: "mern-whatsapp-clone-2acd3",
  storageBucket: "mern-whatsapp-clone-2acd3.appspot.com",
  messagingSenderId: "980574634862",
  appId: "1:980574634862:web:f1a3912f4df7289314f77f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
