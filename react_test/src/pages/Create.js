import React, {useRef, useState} from 'react';
import {Canvas, useLoader} from '@react-three/fiber';
import { TextureLoader} from 'three';
import { OrbitControls } from '@react-three/drei';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

var text = require("../img/In the Court of the Stone Defender.png")
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
                <boxGeometry attach = "geometry" args={[16,9,.01]}/>
                <meshStandardMaterial attach ="material"map={b} />
                
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

    const canvasRef = useRef(null)

    
    const expHand = () => {
        const exporter = new GLTFExporter()
        //const exporter = new OBJExporter()
        exporter.parse(
            canvasRef.current,
            (gltf) => {
                const output = JSON.stringify(gltf)
                console.log(output)
                
                const glbBlob = new Blob([gltf], { type: 'application/octet-stream'})
                const link = document.createElement('a')
                link.href = URL.createObjectURL(glbBlob)
                link.download = 'model.glb';

                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            },
            (error) => { console.log(error)},
            {
                binary: true,
                includeCustomExtensions: true,
            }
            )
        
    }
    return(
        <>
        
        
        <div style = {{height:'90%',border:'2px solid black'}}>
            
        <Canvas>
                <ambientLight/>
                <group ref={canvasRef}>
                    <Box position = {[-1.2,0,-2]} i={text}/>
                </group>
                <OrbitControls />
        </Canvas>
        
        </div>
        
        <input 
        type={'file'} 
        onChange= {imgHandle}
        accept={".jpg, .png"}
        />
        
        <button onClick={expHand}>bruh</button>
        
        </>
    );
}
