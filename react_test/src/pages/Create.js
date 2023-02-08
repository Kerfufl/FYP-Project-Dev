import React, {useRef,useState} from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';


export default function Edit() 
{
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
        
        
        <div style = {{height:'90%',border:'2px solid black', justifyContent: 'center'}}>
        <Canvas>
                <ambientLight/>
                {/* <pointLight /> */}
                
                <Box position = {[-1.2,0,-2]}/>
                <OrbitControls />
        </Canvas>
        </div>

        
        </>
    );
}
