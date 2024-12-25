import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID_KEY,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET_KEY,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGESENDERID_KEY,
  appId: import.meta.env.VITE_FIREBASE_APPID_KEY,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await updateProfile(user,{
      displayName: name,
    });
    toast.success("Account created sudfsccessfully!");
  } catch (error) {
    console.log(error);
    if (error.code) {
      toast.error(error.code.split("/")[1].split("-").join(" "));
    } else {
      toast.error("Unexpected error happend");
    }
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Signed in successfully!");
  } catch (error) {
    console.log(error);
    if (error.code) {
      toast.error(error.code.split("/")[1].split("-").join(" "));
    } else {
      toast.error("Unexpected error happend");
    }
  }
};

const logout = () => {
  signOut(auth);
  toast.success("Logged out successfully!");
};

export { auth, db, login, signup, logout };
