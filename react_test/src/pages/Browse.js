import React, {useState, useEffect, Suspense} from 'react';
import {Canvas, useLoader} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import axios from 'axios'

import '../index.css';
import {Box} from './Create';
//import Box from '../Extra Functions/rend';

export default function Share() 
{
    
    
    var text = require("../img/In the Court of the Stone Defender.png")
    

    
    const [apiResponse, setApiResponse] = useState([])

    
    useEffect(() => {
        //callAPI();
        postSearch();
    },[])

    const addResp = (dat) => {
        setApiResponse(prevState => [...prevState,dat])
    }
    const clearResp = () => {
        setApiResponse([])
    }

    function Comp({e}) {
        const mod = useLoader(GLTFLoader,e)
        return <primitive object={mod.scene}/>
    }
    
    const callAPI = () => {
        //fetch("http://localhost:9000/dbTest")
        axios.get("http://localhost:9000/dbTest")
            .then(res => res.data)
            .then((data) => {
                //console.log(data)
                clearResp()
                data.forEach(element => {
                    element["date_created"] = element["date_created"].slice(0,10)
                    addResp(element)
                });
            }).catch(e => {
                console.log("Oops, ",e," happened")
            })
            
    }

    const postSearch = () => {
    axios.post("http://localhost:9000/dbTest", {name:'Joh'})
            .then(res => res.data)
            .then((data) => {
                //console.log(data)
                clearResp()
                data.forEach(element => {
                    element["date_created"] = element["date_created"].slice(0,10)
                    addResp(element)
                });
            }).catch(e => {
                console.log("Oops, ",e," happened")
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
			
            {apiResponse.map((ap, index) => {
                
                return(
                    <div class="choice"  id="div1" key={index}>
                        <h1>Example {index+1}
                        
                        <button type='button' onClick={clearResp}>Remove</button></h1>
                        
                        <h3>By: {ap["first_name"]} {ap["last_name"]}</h3>
                        <h3>Date: {ap["date_created"]}</h3><hr/>
                        
                        <Canvas style={{width:300,height:260, margin:'auto'}}>
                            <ambientLight/>
                            
                            {/* <Box position = {[0,0,-6]} i ={text} /> */}
                            <Suspense fallback={null}>
                                <Comp e={ap["model_link"]}/>
                            </Suspense>
                            <OrbitControls />
                        </Canvas>
                    </div>
                )
            })}
			
		</div>
        </>
    );
}
