import { initializeApp } from 'firebase/app';
import { getFireStore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAPj1kXfnNU2_VYwm5mPmDwy6a_C95mm1s',
  authDomain: 'boards-698b7.firebaseapp.com',
  projectId: 'boards-698b7',
  storageBucket: 'boards-698b7.appspot.com',
  messagingSenderId: '216437906794',
  appId: '1:216437906794:web:5e3a7e25bf8eedd3315913',
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFireStore();

export { db };
