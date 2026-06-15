
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDaUTFvZ2mCAHKOr9nYqfKpvUbwbbW3LOI",
  authDomain: "safehome-d8f73.firebaseapp.com",
  projectId: "safehome-d8f73",
  storageBucket: "safehome-d8f73.firebasestorage.app",
  messagingSenderId: "375234179018",
  appId: "1:375234179018:web:5f88290dddb5fc02ce2933"
};

const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.serverTimestamp = serverTimestamp;
