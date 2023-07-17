// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBpEDv77ODjAwjpV678LcmcKJD3n_TPIQI",
  authDomain: "todo-list-2d644.firebaseapp.com",
  projectId: "todo-list-2d644",
  storageBucket: "todo-list-2d644.appspot.com",
  messagingSenderId: "220049040181",
  appId: "1:220049040181:web:92db6435fe20dd5ee9e27c"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)