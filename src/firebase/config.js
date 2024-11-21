import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyABskJhHMaSSj0WoLggpVZxTgIfDxbwGTA",
    authDomain: "prog3juarez.firebaseapp.com",
    projectId: "prog3juarez",
    storageBucket: "prog3juarez.firebasestorage.app",
    messagingSenderId: "187368048747",
    appId: "1:187368048747:web:a0ff971c506b1bf33e892e"
  };
  

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
