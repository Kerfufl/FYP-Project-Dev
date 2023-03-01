import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../CSS/style.css'

export default function Home() 
{   
    return(
        <>
        <h1 style={{textAlign: 'center'}}>Welcome to Upcast</h1>
		<h1 style={{textAlign: 'center'}}>Which service would you like to access?</h1> 
		
		<div class="flextest">
			<div class="choice"><Link to='/Create' class = 'linkbar'><h1>Create</h1></Link></div>
			<div class="choice"><Link to='/Browse' class= 'linkbar'><h1>Browse</h1></Link></div>
		</div>
		
        </>
    );
}