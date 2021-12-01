import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC8HHRGwp_uTpqMtAngTTiFWS1P0XrJXQQ",
    authDomain: "cursos-cd2f4.firebaseapp.com",
    projectId: "cursos-cd2f4",
    storageBucket: "cursos-cd2f4.appspot.com",
    messagingSenderId: "592669634890",
    appId: "1:592669634890:web:ce8b73336e4507a17011b3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const loginWithGoogle = async function () {
    let provider = new firebase.auth.GoogleAuthProvider();
    const snap = await firebase.auth().signInWithPopup(provider);
    return snap.user;
}

export const signOutGoogle = function () {
    firebase.auth().signOut();
}