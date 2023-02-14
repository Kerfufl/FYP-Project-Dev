import React, {useRef, useState} from 'react';
import {Canvas, useLoader} from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';

var text = require("../img/In the Court of the Stone Defender.png")
export function Box(props)
    {
        const ref = useRef();
        //const text = require("../img/In the Court of the Stone Defender.png")
        const b =useLoader(TextureLoader,props.i)
        
        
        //useFrame((state,delta) => (ref.current.rotation.x += delta))

        return (
            <mesh
                {...props}
                ref={ref}
            >
                <boxGeometry args={[16,9,.01]}/>
                <meshStandardMaterial map={b} />
                
            </mesh>
        )
    }




export default function Create() 
{
    const [selImg, setSelImg] = useState(null)
    const imgHandle = (e) => {
        console.log()
        const b = URL.createObjectURL(e.target.files[0])
        console.log(b)
        setSelImg(b)
        text=b
    }
    return(
        <>
        
        
        <div style = {{height:'90%',border:'2px solid black'}}>
            
        <Canvas>
                <ambientLight/>
                
                <Box position = {[-1.2,0,-2]} i={text}/>
                <OrbitControls />
        </Canvas>
        </div>
        
        {/* <img style={{border: 'black 2px solid'}}src={selImg} alt={'bruh'}/> */}
        
        <input 
        type={'file'} 
        onChange= {imgHandle}
        accept={".jpg, .png"}
        />
        
        
        </>
    );
}
