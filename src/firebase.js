import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, 
        getAuth, 
        signInWithEmailAndPassword, 
        signOut, 
        signInAnonymously } from "firebase/auth";
import { addDoc, 
        collection, 
        getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBqfK-uE7r3p-g4yNdSQQFqHEic9GhlMyE",
  authDomain: "netflix-clone-25b1f.firebaseapp.com",
  projectId: "netflix-clone-25b1f",
  storageBucket: "netflix-clone-25b1f.firebasestorage.app",
  messagingSenderId: "1024654091803",
  appId: "1:1024654091803:web:22a582870170a628907abe"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const loginAsGuest = async () => {
  try {
    await signInAnonymously(auth);
    toast.success("Signed in as Guest");
  } catch (error) {
    console.log(error);
    toast.error("Guest login failed");
  }
};


const signUp = async (name, email, password) => {
  try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password) => {
  try {
      await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = () => {
  signOut(auth);
}

export {auth, db, login, signUp, logout, loginAsGuest};
