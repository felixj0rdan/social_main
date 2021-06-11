import { useState } from "react";



import {AES,enc} from "crypto-js";
import Sidebar from "./Sidebar";




function ChatHome() {
    const [input,setInput] = useState("");
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
           <Sidebar />
           {/* <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} />
           <button className="btn rounded border-black" onClick={sendMessage}>Send Message</button> */}
        </div>
    )
}

export default ChatHome
