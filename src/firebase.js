import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyB5yzSe6Ta7K1qHAuduJRBrelB4WiPh2F0",
    authDomain: "clone-8baba.firebaseapp.com",
    projectId: "clone-8baba",
    storageBucket: "clone-8baba.appspot.com",
    messagingSenderId: "43702106846",
    appId: "1:43702106846:web:5f97ec6642ab37f33b604f",
    measurementId: "G-JN225WQFW1"
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export {db, auth, provider };