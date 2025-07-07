import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBajJPVgLBqbcfIt6YzmRccCVYYzRZSWls",
  authDomain: "signup-authentication-dc652.firebaseapp.com",
  projectId: "signup-authentication-dc652",
  storageBucket: "signup-authentication-dc652.firebasestorage.app",
  messagingSenderId: "1090697047736",
  appId: "1:1090697047736:web:05952158029c0584364e4d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth() 
export default app