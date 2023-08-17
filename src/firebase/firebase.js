
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCcBc8B9ikkPr0kjcoyHlameKGZmPFSW4w",
  authDomain: "hotstar-clone-b3d59.firebaseapp.com",
  projectId: "hotstar-clone-b3d59",
  storageBucket: "hotstar-clone-b3d59.appspot.com",
  messagingSenderId: "310409512107",
  appId: "1:310409512107:web:1f3dc9f67f00384b4d23ee",
  measurementId: "G-J3KNG9ZE9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

