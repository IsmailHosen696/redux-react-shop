import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCag1uM_-wLQJxfVfvw1AdDycLgNqPDoPM",
    authDomain: "ecommerce-website-e26e3.firebaseapp.com",
    databaseURL: "https://ecommerce-website-e26e3-default-rtdb.firebaseio.com",
    projectId: "ecommerce-website-e26e3",
    storageBucket: "ecommerce-website-e26e3.appspot.com",
    messagingSenderId: "201888341008",
    appId: "1:201888341008:web:b654657bcda4bc233b3e95",
    measurementId: "G-67CWYPHJ6W"
};

const app = firebase.initializeApp(firebaseConfig);

export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export const firestore = app.firestore();

export const auth = app.auth();

export const provider = new firebase.auth.GoogleAuthProvider();