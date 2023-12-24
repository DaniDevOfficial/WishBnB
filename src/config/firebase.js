// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);
export const postCollection = collection(db, "posts");
export const articleCollection = collection(db, "articles");
export const timelineCollection = collection(db, "timelineitems");
export const imagesCollection = collection(db, "images");
export const adminCollection = collection(db, "admin");
// Initialize Storage
const storage = getStorage(app);
export const imageStorage = ref(storage, "articles/images");

export const googleProvider = new GoogleAuthProvider();
