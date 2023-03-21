import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import '../CSS/style.css'

export default function Home() 
{   
    const cki = new Cookies()
    const [user,setUser] = useState()

    useEffect(() => {
        const inter = setInterval(() => {
            if (cki.get("Token"))
            {
                //console.log(cki.get("Token").uname)
                setUser(cki.get('Token').uname)
            } else {
                setUser("new user")
            }
        }, 30)
        return () => clearInterval(inter)
        
    }, [user])

    const getName = () => {
        if (cki.get("Token")) {
            //console.log("Is thing on?")
            setUser(cki.get("Token").uname);
        } else {
            setUser("new user")
        }
        

    }
    return(
        <>
        <h1 style={{textAlign: 'center'}}>Welcome to Upcast, {user}</h1>
		<h1 style={{textAlign: 'center'}}>Which service would you like to access?</h1>
        <input type={"button"} value="Test" onClick={getName}/>
		<div class="flextest" style={{border:'2px black solid', height:'70%'}}>
			<div class="choice"><Link to='/Create' class = 'linkbar'><h1>Create</h1></Link></div>
			<div class="choice"><Link to='/Browse' class= 'linkbar'><h1>Browse</h1></Link></div>
		</div>
        </>
    );
}