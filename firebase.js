import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyCCtn8FkfiQ4eOj-oZmKOZgMsRirWhId24",
  authDomain: "mysquare-4bc99.firebaseapp.com",
  projectId: "mysquare-4bc99",
  storageBucket: "mysquare-4bc99.appspot.com",
  messagingSenderId: "218868099414",
  appId: "1:218868099414:web:b64fc34585484ebf00cef7",
  measurementId: "G-FF1GHEDSD9"
};
  const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  const db = app.firestore();
  const auth = app.auth();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  export {db,auth,provider};