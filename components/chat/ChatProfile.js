import { Avatar } from "@material-ui/core";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

import { auth,db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import {useRouter} from "next/router";



function ChatProfile({id,users}) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(db.collection('users').where('email','==',getRecipientEmail(users,user)));
    const recipientEmail = getRecipientEmail(users,user);
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const enterChat = () => {
        router.push(`/chat/${id}`);
    }
    console.log('====================================');
    console.log(getRecipientEmail(users,user));
    console.log('====================================');
    return (
        <div onClick={enterChat} className="flex flex-row content-between items-center cursor-pointer p-2 break-words hover:bg-gray-200">
        
            {recipient ? (
            <Avatar src={recipient?.photoURL} />
        ):(
            <Avatar src={recipientEmail[0]} />
        )}
        
         <p className="p-3">{recipientEmail}</p>
        </div>
    )
}

export default ChatProfile
