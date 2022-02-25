import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9GiP02FWyl95Vm24mUCh2tpPh-drzDLc",
  authDomain: "todo-lists-cc205.firebaseapp.com",
  projectId: "todo-lists-cc205",
  storageBucket: "todo-lists-cc205.appspot.com",
  messagingSenderId: "410658555597",
  appId: "1:410658555597:web:0266f8f6d4653023be8b84"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;