// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDC924masX2xwyVs3p-394lm_AYmPkpXmQ",
  authDomain: "flashcardsaas-46534.firebaseapp.com",
  projectId: "flashcardsaas-46534",
  storageBucket: "flashcardsaas-46534.appspot.com",
  messagingSenderId: "482752017712",
  appId: "1:482752017712:web:caa639a33d4ad2c0ac44f5",
  measurementId: "G-YLN1E3FXY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}