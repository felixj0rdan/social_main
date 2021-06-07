import Feed from "../components/social/Feed"
import Navbar from "../components/social/Navbar"

function social() {
    return (
        <div className="bg-blue-50 flex-col">
            <Navbar/>
            <Feed/>
        </div>
    )
}

export default social
