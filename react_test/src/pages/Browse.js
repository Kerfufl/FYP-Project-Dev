import React, {useState} from 'react';
import {Canvas} from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei';
import '../index.css';
import {Box} from './Create';
//import Box from '../Extra Functions/rend';

export default function Share() 
{
    // function Box(props)
    // {
    //     const ref = useRef();
    //     const text = require("../img/In the Court of the Stone Defender.png")
    //     const b =useLoader(TextureLoader,text)
        
    //     //useFrame((state,delta) => (ref.current.rotation.x += delta))
        

    //     return (
    //         <mesh
    //             {...props}
    //             ref={ref}
    //         >
    //             <boxGeometry args={[16,9,.01]}/>
    //             <meshStandardMaterial map={b} />
             
    //         </mesh>
    //     )
    // }
    const [divList,setDivList] = useState([{comp: ''},{comp: ''},{comp: ''},{comp: ''}])
    var text = require("../img/In the Court of the Stone Defender.png")
    const addDiv = () => {
        setDivList([...divList, {comp: ""}])
}

    const remDiv = (ind) => {
        const list = [...divList]
        list.pop()
        setDivList(list)
    }

    return(
        <>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center', marginBottom: '5px'}}>
            <input type={"search"} style={{width:'60%',height:'20px'}}/>
            
            <input type={"button"} value="Search models" onClick={addDiv}/>
            {/* <h1 style={{alignSelf:'center'}}>Browse test</h1> */}
        </div>
        <div class="flex-container" id="share" >
			
            {divList.map((singleDiv, index) => (
            <div class="choice"  id="div1" >
				<h1>Example {index+1}
                
                <button type='button' onClick={() => remDiv(index)}
                >Remove</button></h1>
                
				<h3>By: Anonymous</h3>
				<h3>Date: 08.12.2022</h3><hr/>
                <Canvas style={{width:300,height:260, margin:'auto', border:"2px black solid"}}>
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
