import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBXYVU9NxxlMzbPevQDeQgXRxlARGmvlds",
    authDomain: "social-app-7024c.firebaseapp.com",
    projectId: "social-app-7024c",
    storageBucket: "social-app-7024c.appspot.com",
    messagingSenderId: "247062181270",
    appId: "1:247062181270:web:b0f6c31eafd3b1487259b7",
    measurementId: "G-W2TFGXJZ6L"
  };
  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  const db = app.firestore();
  const auth = app.auth();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  export {db,auth,provider};