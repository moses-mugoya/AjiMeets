import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCW9bwz_WQ3Imtju8KWFYqK5VdlIxSJjss",
    authDomain: "ajimeets-61bcd.firebaseapp.com",
    projectId: "ajimeets-61bcd",
    storageBucket: "ajimeets-61bcd.appspot.com",
    messagingSenderId: "934365920969",
    appId: "1:934365920969:web:43888b8441211392e5d718",
    measurementId: "G-LSGZS7ZZ7Y"
};

firebase.initializeApp(firebaseConfig);

export default firebase