import '../CSS/style.css'
import {Outlet,Link} from "react-router-dom"
import axios from 'axios'
import cookies from 'universal-cookie';
import {useState, useEffect} from 'react'

export default function Bar() {

	const [username, setUsername] = useState(null)
	const [password, setPassword] = useState(null)
	const [login, setLogin] = useState(false)
	const [useName, setUseName] = useState('')
	const cki = new cookies();
	
	useEffect(() => {
		/*
			When page is loaded or login function is altered, update login status on nav bar 
		*/
        if (cki.get("Token"))
        {
            setLogin(true)
			setUseName(cki.get("Token").uname)
        } else {
            setLogin(false)
        }
    },[useName])
	const handleUser = e => {
		setUsername(e.target.value)
	}

	const handlePass = e => {
		setPassword(e.target.value)
	}

	const regi = () => {

		/*
			Sends username and password to be registered in database, if not already registered 
		*/
		axios.post('http://localhost:9000/users',{user: username, pass: password})
		.then(res => res.data)
		.then((data)=>
			{
				console.log(data)
			})
	}

	const logi = () => {
		/*
			Sends username and password to check if user exists, then if password is correct,
			setting a browser cookie on success
		*/
		axios.post('http://localhost:9000/logi',{user: username, pass: password})
		.then(res => res.data)
		.then((data)=>
			{
				if (data.logi)
				{
					console.log(data.message)
					cki.set("Token", {tok: data.token, uname:username}, {path: "/", sameSite:"None", maxAge: 3600, Secure: true})
					setLogin(cki.get("Token"))
					setUseName(data.uname)
				} else {
					console.log(data.message)
				}
			})
	}

	const unlog = () => {
		cki.remove("Token")
		setLogin(null)
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
		
			{!(login) ? <div class = "log-div" >
				<label>
					User <input type={"text"} name={"username"} onChange={handleUser}/>
				</label> 
				<label>
					Password <input type={"password"} name={"username"} onChange={handlePass}/>
				</label> 
				<input type={'button'} value={'Register'} onClick={regi} style={{marginBottom:'auto'}}/>
				<input type={'button'} value={'Login'} onClick={logi} style={{marginBottom:'auto'}}/>				
			</div> : 
			<div class="log-div">
				<label>
					Hello, {useName} <input type={'button'} value={'Logout'} onClick={unlog} style={{marginBottom:'auto'}}/>
	
				</label>
			</div>}
		</div>
		

        <Outlet/>
        </>
        
    );
}