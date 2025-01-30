import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC02Nck-_PmXeNvR2xQtO8Usb7dIAFLeLc",
  authDomain: "foodsharingapp-dee7f.firebaseapp.com",
  projectId: "foodsharingapp-dee7f",
  storageBucket: "foodsharingapp-dee7f.appspot.com", // Corrected this line
  messagingSenderId: "99896046771",
  appId: "1:99896046771:web:669a42cc22029129172cc6",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app); // Added auth export
