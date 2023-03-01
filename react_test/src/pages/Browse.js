import React, {useState, useEffect} from 'react';
import {Canvas} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import '../index.css';
import {Box} from './Create';
//import Box from '../Extra Functions/rend';

export default function Share() 
{
    
    
    var text = require("../img/In the Court of the Stone Defender.png")
    

    
    const [apiResponse, setApiResponse] = useState([])

    
    useEffect(() => {
        callAPI();
    },[])
    const addResp = (dat) => {
        setApiResponse(prevState => [...prevState,dat])
    }
    const clearResp = () => {
        setApiResponse([])
    }
    
    const callAPI = () => {
        fetch("http://localhost:9000/dbTest")
            .then(res => res.json())
            .then((data) => {
                //console.log(data)
                clearResp()
                data.forEach(element => {
                    //console.log(element)
                    addResp(element)
                });
            })
            
    }
    return(
        <>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center', marginBottom: '5px'}}>
            <input type={"search"} style={{width:'60%',height:'20px'}}/>
            
            <input type={"button"} value="Search models" onClick={callAPI}/>
            {/* <h1 style={{alignSelf:'center'}}>Browse test</h1> */}
        </div>
        <div class="flex-container" id="share" >
			
            {apiResponse.map((ap, index) => (
            <div class="choice"  id="div1" key={index}>
				<h1>Example {index+1}
                
                <button type='button' onClick={clearResp}>Remove</button></h1>
                
				<h3>By: {ap["first_name"]} {ap["last_name"]}</h3>
				<h3>Date: 08.12.2022</h3><hr/>
                <Canvas style={{width:300,height:260, margin:'auto'}}>
                    <ambientLight/>
                    
                    <Box position = {[0,0,-6]} i ={text} />
                    <OrbitControls />
                </Canvas>
			</div>
            ))}
			
		</div>
        </>
    );
}
