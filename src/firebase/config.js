import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: 'boards-698b7.firebaseapp.com',
  projectId: 'boards-698b7',
  storageBucket: 'boards-698b7.appspot.com',
  messagingSenderId: '216437906794',
  appId: '1:216437906794:web:5e3a7e25bf8eedd3315913',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

// Initialize Firebase Auth
const auth = getAuth();

export { db, auth };
