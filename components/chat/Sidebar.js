import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth,db } from "../../firebase";
import { useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
// import Chat from "./Chat";
import {useRouter} from "next/router";

import Navbar from "../social/Navbar";
import ChatProfile from "./ChatProfile";

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users','array-contains',user.email);
    const [chatsSnapshot] = useCollection(userChatRef);

    const chatAlreadyExists = (recipientEmail) => {
        return !!chatsSnapshot?.docs.find(chat => chat.data().users.find(user => user === recipientEmail?.length > 0));

    }
    const createChat = () => {
        const input = prompt("please enter the email of the user you wish to chat");
        if(!input){
            return null;
        }
        if(EmailValidator.validate(input) && input != user.email && !chatAlreadyExists(input)){
            db.collection('chats').add({
                users:[user.email,input]
            })
        }
    }
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
          <div className="flex flex-col content-center w-full items-center sticky mt-0">
              
              
              <button className="bg-gray-100 outline-none w-full h-15 p-2" onClick={createChat}>Add a Chat</button>
          </div>
          
          <div className="flex items-center p-5">
              <SearchIcon  />
              <input className="flex-1 border-none border-4 border-light-blue-500 p-3" placeholder="search for chat" type="text"  />
          </div>
          <div className="overflow-y-scroll scrollbar-hide">
             {
                 chatsSnapshot?.docs.map(chat => (
                     <ChatProfile key={chat.id} id={chat.id} users = {chat.data().users} />
                 ))
             }
             


              
          </div>  
        </div>
    )
}

export default Sidebar
