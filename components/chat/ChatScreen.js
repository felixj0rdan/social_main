import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert,InsertEmoticon,Mic, ArrowLeft, KeyboardArrowLeftOutlined } from "@material-ui/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth ,db} from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import Navbar from "../social/Navbar";
import Message from "./Message";
import {useState,useRef} from "react";
import { useRouter } from "next/router";
import TimeAgo from "timeago-react";
import firebase from "firebase";
import {AES,enc} from "crypto-js";
import styled from "styled-components";


import {useCollection} from "react-firebase-hooks/firestore"
function ChatScreen({chat,messages}) {
    // console.log('====================================');
    // console.log(chat);
    // console.log('====================================');
    // console.log('====================================');
    // console.log(messages);
    // console.log('====================================');
    const [user] = useAuthState(auth);
    const [inputmes,setInputmes] = useState('');
    const router = useRouter();
    // const messageRef = useRef(null);
    const endOfMessagesRef = useRef(null);
    const [messagesSnapshot] = useCollection(
        db
            .collection('chats')
            .doc(router.query.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
    )
    
    const [recipientSnapshot] = useCollection(
        db 
          .collection('users')
          .where('email','==',getRecipientEmail(chat.users,user))

    );


    const recipient = recipientSnapshot?.docs[0]?.data();

    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(msg => {
                
                return <Message  
                    key={msg.id} 
                    user={msg.data().user}
                    message={{
                        ...msg.data(),
                        timestamp: msg.data().timestamp?.toDate().getTime()
                    }}
                />
            })
        }else{
            return JSON.parse(messages).map((msg)=>(
                <Message key={msg.id} user={msg.user} message={msg} />
            ))
        }

    
   
        
    }
    const sendMessage = (e) => {
        var secret = "ABCDEFGH";
        var encry = AES.encrypt(inputmes,secret);
        encry = encry.toString();
        // console.log(encry);
        e.preventDefault();
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),

        },{merge: true})
        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: encry,
            user: user.email,
            photoURL: user.photoURL
        })
        setInputmes('');
        scrollToBottom();
    }
    const scrollToBottom = () =>{
        endOfMessagesRef.current.scrollIntoView({
            behaviour: "smooth",
            block: "start"
        })
    }
    
    
    return (
        <div className="flex flex-col h-screen ">
        <Navbar />
           <div className="w-100 h-20 border-b-2 border-white flex bg-white text-center">
                <div className="ml-5 z-50 flex items-center content-center">
                    
                    <IconButton >
                    <KeyboardArrowLeftOutlined />
                    </IconButton>
                    <Avatar src={recipient?.photoURL} />
                    <div className="m-2">
                    <h1 className="p-2">{recipient?.email}</h1>
                    <p className="p-2">
                        Last Active: {" "}
                                {recipient?.lastSeen?.toDate() ? (
                                        <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                                    ):(
                                        "Unavailable"
                                    )
                                }</p>
                    </div>
                    <div className="flex flex-row items-center  content-center">
                                
                        <AttachFile />
                        <MoreVert />

                    </div>
                </div>
                
           </div>
            <div className="flex-1 p-3 overflow-y-scroll scrollbar-hide bg-blue-200">
                {
                    showMessages()
                   
                }
                {/* <div ref={endOfMessagesRef} /> */}
                <EndOfMessages ref={endOfMessagesRef} />
            </div>
            <div className="h-20  ml-4 p-2">
                <InsertEmoticon />
                <input value={inputmes} onChange={(e)=>setInputmes(e.target.value)} placeholder="enter a message" />
                <button className="" type="submit" onClick={sendMessage}>Send Message</button>
                <Mic />
            </div>
        </div>
    )
}

export default ChatScreen

const EndOfMessages = styled.div`
margin-bottom: 50px;
`;
