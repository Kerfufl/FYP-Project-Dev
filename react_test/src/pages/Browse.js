import React, {useState, useEffect, Suspense} from 'react';
import {Canvas, useLoader} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import axios from 'axios'
import Cookies from 'universal-cookie';

import '../index.css';
import {Box} from './Create';
//import Box from '../Extra Functions/rend';

export default function Share() 
{
    
    
    var text = require("../img/In the Court of the Stone Defender.png")
    
    const cki = new Cookies()
    
    const [apiResponse, setApiResponse] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [searchType, setSearchType] = useState('user_name')
    
    
    useEffect(() => {
        callAPI();
        //postSearch();
    },[])

    const addResp = (dat) => {
        setApiResponse(prevState => [...prevState,dat])
    }
    const clearResp = () => {
        setApiResponse([])
    }

    const handleTypeChange = e => {
        //console.log(e.target.value)
        setSearchType(e.target.value)
    }
    const handleTermChange = e => {
        //console.log(e.target.value)
        setSearchTerm(e.target.value)
    }

    function Comp({e}) {
        const mod = useLoader(GLTFLoader,e)
        return <primitive object={mod.scene}/>
    }
    
    const callAPI = () => {
        axios.get("http://localhost:9000/dbTest")
            .then(res => res.data)
            .then((data) => {
                //console.log(data)
                clearResp()
                data.forEach(element => {
                    element["date_created"] = element["date_created"].slice(0,10)
                    //Marks a logged in user's creation, if applicable
                    if(cki.get("Token") && element["user_name"] ==cki.get("Token").uname) {
                        element["user_name"] = element["user_name"] + "**"
                    }
                    addResp(element)
                });
            }).catch(e => {
                console.log("Oops, ",e," happened")
            })
            
    }

    const postSearch = () => {
        axios.post("http://localhost:9000/dbTest", {term: searchTerm, stype: searchType})
            .then(res => res.data)
            .then((data) => {
                console.log(data)
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
            <select name="search-type" onChange={handleTypeChange}>
                <option value="user_name">Name</option>
                <option value="last_name">Last Name</option>
            </select>
            <input type={"search"} onChange={handleTermChange} style={{width:'60%',height:'20px'}}/>
            
            <input type={"button"} value="Search models" onClick={postSearch}/>
            {/* <h1 style={{alignSelf:'center'}}>Browse test</h1> */}
        </div>
        <div class="flex-container" id="share" >
			
            {apiResponse.map((ap, index) => {
                
                return(
                    <div class="choice"  id="div1" key={index} >
                        <h1>{ap["title"]}  </h1>
                        
                        <h3>By: {ap["user_name"]}</h3>
                        <h3>Date: {ap["date_created"]}</h3><hr/>
                        
                        <button type='button' style={{width:'30%', margin:'auto'}} onClick={ () =>
                        {
                            const link = document.createElement('a')
                            link.href = ap['model_link']
                            //console.log(link.href)
                            link.download = `${ap["title"]}.glb`
        
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)
                        }}>Download</button>

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
