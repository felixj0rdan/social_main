import '../styles/globals.css';
import {useState,useEffect} from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import { auth, db } from '../firebase';
import firebase from "firebase";
import Loading from '../components/Loading';

function MyApp({ Component, pageProps }) {
  const [user,loading] = useAuthState(auth);
  useEffect(()=>{
      if(user){
        db.collection('users').doc(user.uid).set({
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },{merge: true})
      }
  },[user])
  if(loading){
    return <Loading />
  }else{
    return <Component {...pageProps} />
  }
 
}

export default MyApp
