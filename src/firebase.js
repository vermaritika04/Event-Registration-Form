// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-zuhxuJLI0ZlCow1PdpkTFbreTKlXNxM",
  authDomain: "event-registration-form-4f60d.firebaseapp.com",
  databaseURL: "https://event-registration-form-4f60d-default-rtdb.firebaseio.com",
  projectId: "event-registration-form-4f60d",
  storageBucket: "event-registration-form-4f60d.appspot.com",
  messagingSenderId: "917561042066",
  appId: "1:917561042066:web:d3d420a78bd6fe7983324b",
  measurementId: "G-PF3LC5PS1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export default database;