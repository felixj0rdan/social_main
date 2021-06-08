import {auth} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import {useState} from "react";
import {useRouter} from "next/router";
function Navbar() {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [show,setShow] = useState(false);
    const Menu = () => {
        
            return(
                <div className="bg-blue-200 h-auto flex flex-col items-center" >
                <div className="hover:bg-white text-center w-screen"><a className="text-center" href="/">Home</a></div>
                <div className="hover:bg-white text-center w-screen"><a className="text-center" href="/messenger">Messenger</a></div>
                <div className="hover:bg-white text-center w-screen"><a className="text-center" href="/shopping">Shopping</a></div>
                <div className="hover:bg-white text-center w-screen"><a className="text-center" href="/information">Information</a></div>
                <div className="hover:bg-white text-center w-screen"><a className="text-center" href="/profile">Profile</a></div>
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
            
            <div className="my-auto">Logo</div>
            <input type="text" className="h-8 my-auto rounded-lg" value=" Search...."/>
            <div className={"my-auto w-96 hidden md:flex flex-col md:flex-row md:justify-around"} >
                <a href="/">Home</a>
                <a href="/messenger">Messenger</a>
                <a href="/shopping">Shopping</a>
                <a href="/information">Information</a>
            </div>
            <img onClick={showMenu} className="object-contain rounded-full cursor-pointer relative mr-0" src={user?.photoURL}></img>
            
        </div>
        {
            show && <Menu />
        }
        </div>
    )
}

export default Navbar
