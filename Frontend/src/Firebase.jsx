// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIAPmdtZOjtgr6_69kcXah10mKAAw4Oe0",
  authDomain: "shopnest-774f9.firebaseapp.com",
  projectId: "shopnest-774f9",
  storageBucket: "shopnest-774f9.appspot.com",
  messagingSenderId: "778297671642",
  appId: "1:778297671642:web:12ec14457f9e980e1a8ae3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;