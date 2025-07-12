// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCU1D2eNB10-gzsC44Y1YjcayAVqJwrxcE",
  authDomain: "wallet-web-6a734.firebaseapp.com",
  projectId: "wallet-web-6a734",
  storageBucket: "wallet-web-6a734.firebasestorage.app",
  messagingSenderId: "635348384537",
  appId: "1:635348384537:web:08a7002cae9a4ee7392388",
  measurementId: "G-YH8DVFNY45"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
