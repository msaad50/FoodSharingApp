import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC02Nck-_PmXeNvR2xQtO8Usb7dIAFLeLc",
  authDomain: "foodsharingapp-dee7f.firebaseapp.com",
  projectId: "foodsharingapp-dee7f",
  storageBucket: "foodsharingapp-dee7f.appspot.com",
  messagingSenderId: "99896046771",
  appId: "1:99896046771:web:669a42cc22029129172cc6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Export Firestore, Storage, and Auth
export const db = getFirestore(app);
export const storage = getStorage(app);
export { auth };
