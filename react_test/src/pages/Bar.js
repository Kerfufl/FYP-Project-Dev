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
				<Link to="/Create" class = "linkbar">Create</Link>
			</div>
			<div class = "home-div">
				<Link to="/Browse" class = "linkbar">Browse</Link>
			</div>
		</div>
		

        <Outlet/>
        </>
        
    );
}