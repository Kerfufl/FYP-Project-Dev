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
        if (cki.get("Token"))
        {
            console.log(cki.get("Token").uname)
            setLogin(true)
			setUseName(cki.get("Token").uname)
			//console.log(useName)
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
				//console.log(data);
				cki.set("Token", {tok: data.token, uname:username}, {path: "/", sameSite:"None", maxAge: 3600, Secure: true})
				setLogin(cki.get("Token"))
				setUseName(data.uname)
				//ckTest()
				//window.location.reload("false");
			})
	}

	const unlog = () => {
		cki.remove("Token")
		setLogin(null)
		//window.location.reload("false");
	}

	const ckTest = () => {
		let b =cki.get("Token")
		if(b)
		{
			console.log(b['uname']);
		} else {
			console.log("No valid token");
		}
		
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
					<input type={'button'} value={'Logout'} onClick={unlog} style={{marginBottom:'auto'}}/> Hello, {useName}
	
				</label>
			</div>}
		</div>
		

        <Outlet/>
        </>
        
    );
}