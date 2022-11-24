// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw92KZZZGM61_DmrSUeZVUJu6scQuxyoM",
  authDomain: "tiendamundial-react.firebaseapp.com",
  projectId: "tiendamundial-react",
  storageBucket: "tiendamundial-react.appspot.com",
  messagingSenderId: "391916108070",
  appId: "1:391916108070:web:0403405695fffdc72029e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);