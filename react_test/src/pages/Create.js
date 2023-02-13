import React, {useRef, useState} from 'react';
import {Canvas, useLoader} from '@react-three/fiber';
import { TextureLoader } from 'three';
import { OrbitControls } from '@react-three/drei';

export function Box(props)
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




export default function Create() 
{
    const {selImg, setSelImg} = useState(null)
    const imgHandle = (e) => {
        setSelImg(e.target.files[0])
    }
    return(
        <>
        
        
        <div style = {{height:'90%',border:'2px solid black'}}>
            
        <Canvas>
                <ambientLight/>
                
                <Box position = {[-1.2,0,-2]}/>
                <OrbitControls />
        </Canvas>
        </div>
        {setSelImg && (
            <img src={setSelImg? URL.createObjectURL(setSelImg): null} alt={'bruh'}/>
        )}
        <input 
        type={'file'} 
        onChange= {imgHandle} 
        //     {
        //     // const egk = e.target.files[0];
        //     // console.log(egk);
        //     // setSelImg(prev => egk);
        //     // console.log(selImg);
        //     imgHandle;
        // }
        />
        
        
        </>
    );
}
