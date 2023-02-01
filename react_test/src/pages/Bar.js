import '../CSS/style.css'
import {Outlet,Link} from "react-router-dom"
export default function Bar() {
    return(
        <>
        <div class="flex-container">
			<div class = "home-div">
				<Link to="/" class = "linkbar">Home</Link>
			</div>
			<div class = "home-div">
				<Link to="/Share" class = "linkbar">Share</Link>
			</div>
			<div class = "home-div">
				<Link to="/Edit" class = "linkbar">Edit</Link>
			</div>
		</div>

        <Outlet/>
        </>
        
    );
}