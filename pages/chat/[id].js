import { useState } from "react";
import uuid from "uuid";
import Head from "next/head";
import {auth,db} from "../../firebase";

import {AES,enc} from "crypto-js";
import getRecipientEmail from "../../utils/getRecipientEmail";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import ChatScreen from "../../components/chat/ChatScreen";





function ChatHere({chat,messages}) {
    const [input,setInput] = useState("");
    const [user] = useAuthState(auth);

    const encryptInput = (message) => {

        
        var secret = "ABCDEFGH";

        var encry = AES.encrypt(message,secret);
        encry = encry.toString();
        console.log(encry);
        var dec = AES.decrypt(encry,secret);
        dec=dec.toString(enc.Utf8);
        console.log(dec);

    }

    const sendMessage = () => {
        encryptInput(input);
        // console.log(input);
    }
    return (
        <div>
             <Head>
                    <title>Chat with {getRecipientEmail(chat.users,user)}</title>
              </Head>
              <div className="">
                  <ChatScreen chat={chat} messages={messages} />
              </div>
        
{/*            
           <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} />
           <button className="btn rounded border-black" onClick={sendMessage}>Send Message</button> */}
        </div>
    )
}

export default ChatHere

export async function getServerSideProps(context){
    const ref = db.collection('chats').doc(context.query.id);
    const messageRes = await ref
                            .collection('messages')
                            .orderBy('timestamp','asc')
                            .get()
    
    const messages = messageRes.docs?.map(doc => ({
        id: doc.id,
        ...doc.data()
    })).map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }))


    const chatRes = await ref.get()

    const chat = {
        id: chatRes.id,
        ...chatRes.data()

    }

    return {
        props:{
            messages: JSON.stringify(messages),
            chat
        }
    }
}
