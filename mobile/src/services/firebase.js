import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import firebaseConfig from "../services/firebaseConfig";

const app = firebase.initializeApp(firebaseConfig);


export { app };
