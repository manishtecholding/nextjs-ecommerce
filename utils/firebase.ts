import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import { getDatabase } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDxMICaK4h2RoMAq_h-OtJwr8lZtO_ERg4",
    authDomain: "e-commerce-c1ebf.firebaseapp.com",
    databaseURL: "https://e-commerce-c1ebf-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "e-commerce-c1ebf",
    storageBucket: "e-commerce-c1ebf.appspot.com",
    messagingSenderId: "573150665589",
    appId: "1:573150665589:web:d3be5b0e56877f1386913c",
}

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const firebaseAuth = getAuth();

export { app, database, firebase, firebaseAuth }