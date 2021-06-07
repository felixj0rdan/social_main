function Navbar() {
    return (
        <div className=" bg-blue-200 h-16 flex justify-around">
            <div className="my-auto">Logo</div>
            <input type="text" className="h-8 my-auto rounded-lg" value=" Search...."/>
            <div className="my-auto w-96 flex justify-around">
                <a href="/">Home</a>
                <a href="/messenger">Messenger</a>
                <a href="/shopping">Shopping</a>
                <a href="/information">Information</a>
            </div>
            <img className=" my-auto rounded-full " src="https://lh3.googleusercontent.com/ogw/ADea4I56x6vpsDwbj4PIOJx2lzxt7nbNkb5zhKyf8HmIxg=s32-c-mo"></img>
        </div>
    )
}

export default Navbar
