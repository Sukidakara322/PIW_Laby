import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMzcJKxV22BfPnQSx5fQeakoFUqiHW-1k",
  authDomain: "piw-lab3-project.firebaseapp.com",
  projectId: "piw-lab3-project",
  storageBucket: "piw-lab3-project.appspot.com",
  messagingSenderId: "536355846799",
  appId: "1:536355846799:web:c513f81c1db143a29d24efa",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
