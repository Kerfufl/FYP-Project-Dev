import React, {useRef} from 'react';
import {Canvas, useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';
import '../index.css';
export default function Share() 
{
    const im = require("../img/modelplaceholder.png")
    function Box(props)
    {
        const ref = useRef();
        const text = require("../img/In the Court of the Stone Defender.png")
        const b =useLoader(TextureLoader,text)
        
        //useFrame((state,delta) => (ref.current.rotation.x += delta))

        return (
            <mesh
                {...props}
                ref={ref}
            >
                <boxGeometry args={[16,9,.01]}/>
                {/* //<planeGeometry args={[16,9,1]}/> */}
                <meshStandardMaterial map={b} />
             
            </mesh>
        )
    }

    return(
        <>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center', marginBottom: '5px'}}>
            <input type={"search"} style={{width:'60%',height:'20px'}}/>
            <input type={"button"} value="Search models"/>
            {/* <h1 style={{alignSelf:'center'}}>Browse test</h1> */}
        </div>
        <div class="flex-container" id="share" >
			<div class="choice"  id="div1" >
				<h1>Example</h1>
				<h3>By: Anonymous</h3>
				<h3>Date: 08.12.2022</h3><hr/>
                <Canvas style={{width:300,height:260, margin:'auto', border:"2px black solid"}}>
                    <ambientLight/>
                    {/* <pointLight /> */}
                    
                    <Box position = {[0,0,-6]} />
                    <OrbitControls />
                </Canvas>
			</div>
			<div class="choice"  id="div1">
				<h1>Example</h1>
				<h3>By: Anonymous</h3>
				<h3>Date: 08.12.2022</h3> <hr/>
				{/* <img src={im} alt=""/> */}
                <Canvas style={{width:300,height:260, margin:'auto', border:"2px black solid"}}>
                    <ambientLight/>
                    {/* <pointLight /> */}
                    
                    <Box position = {[0,0,-6]} />
                    <OrbitControls />
                </Canvas>
			</div>
			<div class="choice"  id="div1">
				<h1>Example</h1>
				<h3>By: Anonymous</h3>
				<h3>Date: 08.12.2022</h3> <hr/>
				{/* <img src={im} alt=""/> */}
                <Canvas style={{width:300,height:260, margin:'auto', border:"2px black solid"}}>
                    <ambientLight/>
                    {/* <pointLight /> */}
                    
                    <Box position = {[0,0,-6]} />
                    <OrbitControls />
                </Canvas>
			</div>
			<div class="choice"  id="div1">
				<h1>Example</h1>
				<h3>By: Anonymous</h3>
				<h3>Date: 08.12.2022</h3> <hr/>
				{/* <img src={im} alt=""/> */}
                <Canvas style={{width:300,height:260, margin:'auto', border:"2px black solid"}}>
                    <ambientLight/>
                    {/* <pointLight /> */}
                    
                    <Box position = {[0,0,-6]} />
                    <OrbitControls />
                </Canvas>
			</div>
			
		</div>
        </>
    );
}
