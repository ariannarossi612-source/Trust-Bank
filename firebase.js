import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "trust-bank-11868.firebaseapp.com",
  projectId: "trust-bank-11868",
  storageBucket: "trust-bank-11868.appspot.com",
  messagingSenderId: "351989319032",
  appId: "1:351989319032:web:7c7c413a80895cb8ef748d"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);