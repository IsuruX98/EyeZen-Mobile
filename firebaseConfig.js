// Import the necessary functions from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from  "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCbxECAkqCl5zq-s1A_lCYTe1FMbQUQs2M",
    authDomain: "eyezenmobile.firebaseapp.com",
    projectId: "eyezenmobile",
    storageBucket: "eyezenmobile.appspot.com",
    messagingSenderId: "846094005610",
    appId: "1:846094005610:web:d85ce31ee484d69e686113"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistent state
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(AsyncStorage)
});

// Get Firestore instance
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
