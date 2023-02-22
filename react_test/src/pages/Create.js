import React, {Suspense, useRef, useState} from 'react'
import {Canvas, useLoader} from '@react-three/fiber'
import { TextureLoader} from 'three'
import { OrbitControls } from '@react-three/drei'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'


import { getDownloadURL, getStorage,ref,uploadBytesResumable } from 'firebase/storage'
import initStor from '../components/firebaseInit'

const stor = getStorage(initStor)

var text = require("../img/In the Court of the Stone Defender.png")
export function Box(props)
    {
        const ref = useRef()
        const text = props.i
        const b =useLoader(TextureLoader,text)
        
        
        //useFrame((state,delta) => (ref.current.rotation.x += delta))

        return (
            <mesh
                {...props}
                ref={ref}
                scale={props.scale}
            >
                <boxGeometry attach = "geometry" args={[1,1,1,160,90]}/>
                <meshStandardMaterial attach ="material" map={b} wireframe={props.wf} />
                
            </mesh>
        )
    }

Box.defaultProps = {
    i: text,
    scale: [16,9,.01],
    wf: false
    
}


export default function Create() 
{
    const [selImg, setSelImg] = useState(null)
    const [boxes, setBoxes] = useState([])


    const imgHandle = (e) => {
        console.log()
        const b = URL.createObjectURL(e.target.files[0])
        console.log(b)
        setSelImg(b)
        text=b
    }

    const canvasRef = useRef(null)
    
    const exportHandler = (upl=true) => {
        
        /*
            Function used to export a model and then either 
            download directly to device or upload to firebase
        */
        
        const exporter = new GLTFExporter()
        exporter.parse(
            canvasRef.current,
            (gltf) => {
                const output = JSON.stringify(gltf)
                //console.log(output)
                
                
                
                const glbBlob = new Blob([gltf], { type: 'application/octet-stream'})
                
                    
                if (upl)   
                {
                    const storRef = ref(stor,'modelURLTest.glb')
                    
                    const metadata = 
                    {
                        contentType: 'model/glb',
                        customMetaData: {
                            'user': 'Eoin',
                            'shape' : 'flat'
                        }
                    }
                    const upTask = uploadBytesResumable(storRef, glbBlob, metadata)
                    
                    upTask.on(
                        "state_changed", 
                        (snapshot) => {

                        },
                         (error) => {
                            console.log("Error with upload: ", error)
                         },
                         () => {
                            getDownloadURL(upTask.snapshot.ref).then((downloadURL) => {
                                console.log('File available at', downloadURL)
                            })
                         }
                         )
                }

                else
                {
                    console.log("direct download goes here")
                    const link = document.createElement('a')
                    link.href = URL.createObjectURL(glbBlob)
                    console.log(link.href)
                    link.download = 'model.glb'

                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                }
                    
                
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
                    <Box 
                    position = {[0,0,0]} 
                    i={text}
                    scale={[16,9,.01]}
                    wf={true}
                    onDoubleClick={(e)=> {
                        var pos = e.intersections[0].point
                        pos.z = pos.z + .25
                        setBoxes((boxes) => [...boxes,pos])
                        // console.log(boxes)
                        }
                    }/>

                    {boxes.map((position,index) => 
                        (
                        <Box key={index} position={position} scale={[.5,.5,.5]}/>
                        )
                    )}
                    
                </group>
                
                
                <OrbitControls />
        </Canvas>
        
        </div>
        
        <input 
            type={'file'} 
            onChange= {imgHandle}
            accept={".jpg, .png"}
        />
        
        <button onClick={() => exportHandler(false)}>Download Model</button>
        <button onClick={() => exportHandler()}>Share Model</button>
        <button onClick={() => setBoxes([])}>Clear Boxes</button>
        <button onClick={() => {
                var l = [...boxes]
                l.splice(l.length-1,1)
                setBoxes(l)
            }
        }>Undo Box</button>
        </>
    )
}
