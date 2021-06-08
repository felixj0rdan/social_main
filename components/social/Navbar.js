import {auth} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useState} from "react";
import {useRouter} from "next/router";
import { Home, HomeOutlined, Info, InfoRounded, Message, MessageOutlined, ShoppingBasket, ShoppingCart } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";


function Navbar() {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [show,setShow] = useState(false);
    const Menu = () => {
        
            return(
                <div className="bg-blue-200 h-auto flex flex-col items-center" >
                <div className="hover:bg-white text-center w-screen cursor-pointer my-3"><a className="text-center" href="/"><HomeOutlined className="cursor-pointer transition duration-100 transform hover:scale-150 hover:text-black-900 active:text-red-500" /></a></div>
                <div className="hover:bg-white text-center w-screen cursor-pointer my-3"><a className="text-center" href="/messenger"><MessageOutlined className="cursor-pointer transition duration-100 transform hover:scale-150 hover:text-black-900 active:text-red-500" /></a></div>
                <div className="hover:bg-white text-center w-screen cursor-pointer my-3"><a className="text-center" href="/shopping"><ShoppingBasket className="cursor-pointer transition duration-100 transform hover:scale-150 hover:text-black-900 active:text-red-500" /></a></div>
                <div className="hover:bg-white text-center w-screen cursor-pointer my-3"><a className="text-center" href="/information"><InfoRounded className="cursor-pointer transition duration-100 transform hover:scale-150 hover:text-black-900 active:text-red-500" /></a></div>
                <div className="hover:bg-white text-center w-screen cursor-pointer my-3"><a className="text-center" href="/profile">Profile</a></div>
                <div className="hover:bg-white text-center w-screen cursor-pointer mt-3" onClick={()=>auth.signOut()}><h1>SignOut</h1></div>
            </div>
            )
        
        
    }
    const showMenu = () =>{
        console.log('====================================');
        console.log(screen.width);
        console.log(window.screen.width);
        console.log('====================================');
        setShow(!show);
        if(window.screen.width > 768){
            router.push("/profile")
        }else{
            setShow(!show)
        }
    }
    return (
        <div>
        <div className="flex md:flex  bg-blue-200 h-16 md:h-16  justify-around">
            
            <div className="my-auto text-xl">MySquare</div>
            <input type="text" className="h-8 my-auto rounded-lg" value=" Search...."/>
            <div className={"my-auto w-96 hidden md:flex flex-col md:flex-row md:justify-around"} >
                <div><a href="/"><HomeOutlined className="cursor-pointer transition duration-100 transform hover:scale-150 hover:animate-bounce hover:text-black-900 active:text-red-500" /></a></div>
                <div><a href="/messenger"><MessageOutlined className="cursor-pointer transition duration-100 transform hover:scale-150 hover:text-black-900 active:text-red-500"  /></a></div>
                <div><a href="/shopping"><ShoppingBasket className="cursor-pointer transition duration-100 transform hover:scale-150 hover:text-black-900 active:text-red-500" /></a></div>
                <div><a href="/information"><InfoRounded className="cursor-pointer transition duration-100 transform hover:scale-150 hover:text-black-900 active:text-red-500" /></a></div>
                <div><a href="/information"><InfoRounded className="cursor-pointer transition duration-100 transform hover:scale-150 hover:text-black-900 active:text-red-500" /></a></div>
            </div>
            <img onClick={showMenu} className="object-contain rounded-full cursor-pointer relative m-2" src={user?.photoURL}></img>
            
        </div>
        {
            show && <Menu />
        }
        </div>
    )
}

export default Navbar
