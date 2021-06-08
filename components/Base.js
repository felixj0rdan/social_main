// import {auth} from "../../firebase";
// import {useAuthState} from "react-firebase-hooks/auth";

import { auth } from "../firebase";
import Feed from "./social/Feed";
import Navbar from "./social/Navbar";


function Base() {
    return (
        <div>
            <Navbar />
            <Feed />
            {/* <button className="border-blue-200 bg-white text-color-white" onClick={()=> auth.signOut()}>signOut</button> */}
        </div>
    )
}

export default Base
