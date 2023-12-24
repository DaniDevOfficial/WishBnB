import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection, } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBGLOdMAnOhkEDFQ3RemNjsoKv039vZkyI",
  authDomain: "wishbnbdani.firebaseapp.com",
  projectId: "wishbnbdani",
  storageBucket: "wishbnbdani.appspot.com",
  messagingSenderId: "3996564084",
  appId: "1:3996564084:web:3eab71b925f34708baaf21"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export const postCollection = collection(db, "posts");
export const articleCollection = collection(db, "articles");
export const timelineCollection = collection(db, "timelineitems");
export const imagesCollection = collection(db, "images");
export const adminCollection = collection(db, "admin");

const storage = getStorage(app);
export const imageStorage = ref(storage, "articles/images");

export const googleProvider = new GoogleAuthProvider();
