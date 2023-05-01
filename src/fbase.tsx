import { initializeApp } from "firebase/app";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc, getDocFromCache, collection, getDocs, query, where, updateDoc, deleteDoc, onSnapshot, orderBy, startAfter } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const dbService = getFirestore(app);

export { firebaseAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, dbService, setDoc, doc, getDocFromCache, collection, getDocs, query, where, updateDoc, deleteDoc, onSnapshot, orderBy, startAfter, signOut };