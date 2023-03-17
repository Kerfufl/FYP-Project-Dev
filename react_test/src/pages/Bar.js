import '../CSS/style.css'
import {Outlet,Link} from "react-router-dom"
import axios from 'axios'
import cookies from 'universal-cookie';
import {useState} from 'react'

export default function Bar() {

	const [username, setUsername] = useState(null)
	const [password, setPassword] = useState(null)
	const cki = new cookies;

	const handleUser = e => {
		setUsername(e.target.value)
	}

	const handlePass = e => {
		setPassword(e.target.value)
	}

	const regi = () => {
		axios.post('http://localhost:9000/users',{user: username, pass: password})
		.then(res => res.data)
		.then((data)=>
			{
				console.log(data)
			})
	}

	const logi = () => {
		axios.post('http://localhost:9000/logi',{user: username, pass: password})
		.then(res => res.data)
		.then((data)=>
			{
				console.log(data);
				cki.set("Token", data.token, {path: "/", sameSite:"None"});
			})
	}
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

			<div class = "log-div" >
				<label>
					User <input type={"text"} name={"username"} onChange={handleUser}/>
				</label> 
				<label>
					Password <input type={"password"} name={"username"} onChange={handlePass}/>
				</label> 
				<input type={'button'} value={'Register'} onClick={regi} style={{marginBottom:'auto'}}/>
				<input type={'button'} value={'Login'} onClick={logi} style={{marginBottom:'auto'}}/>				
			</div>
		</div>
		

        <Outlet/>
        </>
        
    );
}