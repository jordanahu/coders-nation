import {initializeApp} from "firebase/app";
import {getAuth, onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,sendPasswordResetEmail, 
  updateProfile,signOut,


} from "firebase/auth";


const app = initializeApp({
    apiKey:process.env.REACT_APP_API_KEY ,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN ,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STROGE_BUCKET ,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SENDER_ID ,
    appId:process.env.REACT_APP_APP_ID ,
    measurementId:process.env.REACT_APP_MESSAGING_SENDER_ID
  });


export const auth = {getAuth, onAuthStateChanged,createUserWithEmailAndPassword,
                     signInWithEmailAndPassword,sendPasswordResetEmail,
                     updateProfile,signOut};

export default app;