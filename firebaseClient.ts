// firebaseClient.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword as _signInWithEmailAndPassword,
  signInWithPopup as _signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword as _createUserWithEmailAndPassword,
  sendPasswordResetEmail as _sendPasswordResetEmail,
  confirmPasswordReset as _confirmPasswordReset
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // …añade aquí el resto de tus claves de .env.local
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db   = getFirestore(app);


export const signInWithEmailAndPassword = _signInWithEmailAndPassword;
export const signInWithPopup           = _signInWithPopup;
export const createUserWithEmailAndPassword = _createUserWithEmailAndPassword;
export const sendPasswordResetEmail    = _sendPasswordResetEmail;
export const confirmPasswordReset      = _confirmPasswordReset;

