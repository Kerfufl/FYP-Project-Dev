import React, {useRef, useState} from 'react';
import {Canvas, useLoader} from '@react-three/fiber';
import { TextureLoader, BoxGeometry, MeshStandardMaterial, Mesh } from 'three';
import { OrbitControls } from '@react-three/drei';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { OBJExporter} from 'three/examples/jsm/exporters/OBJExporter';

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

    const canvasRef = useRef(null)

    
    const expHand = () => {
        //const exporter = new GLTFExporter()
        const exporter = new OBJExporter()
        const res = exporter.parse(
            canvasRef.current,
            (result) => {},
            (error) => { console.log(error)},
            (group) => {
                const mesh = new Mesh(
                    new BoxGeometry(1, 1, 1),
                    new MeshStandardMaterial({ color: 0xff0000 })
                )
                group.add(mesh)
            })
        const output = JSON.stringify(res)
        console.log(res)

        const blob = new Blob([res, {type: 'application/octet-stream'}])

        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = 'model.obj';

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
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
