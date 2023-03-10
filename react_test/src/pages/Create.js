import React, {Suspense, useRef, useState} from 'react'
import {Canvas, useLoader} from '@react-three/fiber'
import { TextureLoader} from 'three'
import { Center, OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'


import { getDownloadURL, getStorage,ref,uploadBytesResumable } from 'firebase/storage'
import initStor from '../components/firebaseInit'

const stor = getStorage(initStor)


var text = require("../img/In the Court of the Stone Defender.png")
const impMod = "https://firebasestorage.googleapis.com/v0/b/final-year-project-stora-c4785.appspot.com/o/modelURLTest.glb?alt=media&token=c60e98bb-38e1-4b2f-9a91-5a00fae63b35"



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

    const [fileName,setFileName] = useState('model')

    const fileChange = e => {
        //console.log(e.target.value)
        setFileName(e.target.value)
    }

    const imgHandle = (e) => {
        console.log()
        const b = URL.createObjectURL(e.target.files[0])
        console.log(b)
        setSelImg(b)
        text=b
    }

    const canvasRef = useRef(null)
    const imp = useLoader(GLTFLoader,impMod)
    
    
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
                    const storRef = ref(stor,`bruh/${fileName}.glb`)
                    
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
                    link.download = `${fileName}.glb`

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
        
        
        <div style = {{height:'50%',width:'50%',margin:'auto',border:'2px solid black'}}>
            
        <Canvas>
                <ambientLight/>
                <group ref={canvasRef}>
                    <Box 
                    position = {[0,0,-2]}
                    i={text}
                    scale={[16,9,.01]}
                    wf={false}
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
                {/* <Suspense fallback={null}>
                        <primitive object={imp.scene} position={[0,0,0]}></primitive>
                </Suspense> */}
                
                <OrbitControls />
        </Canvas>
        <input 
            type={'file'} 
            onChange= {imgHandle}
            accept={".jpg, .png"}
        />
        <button onClick={() => setBoxes([])}>Clear Boxes</button>
        <button onClick={() => {
                let l = [...boxes]
                l.splice(l.length-1,1)
                setBoxes(l)
            }
        }>Undo Box</button>
        </div>
        <br/><hr/>
        <div class='flextest' style={{ border:'2px solid black', height:'40%'}}>
        
        
        <div class='choice' style={{ margin:'auto', justifyContent:'Center'}}>
            <label>
				Bruh 
                <input type={"text"} name={"username"} onChange={fileChange}/>
                <button onClick={() => exportHandler(false)} >Download Model</button>
			</label> 
            
        </div>
        <div class="choice" style={{ margin:'auto', justifyContent:'Center'}}>
        <label>
		    Bruh <input type={"text"} name={"username"}/>
            <button onClick={() => exportHandler(true)} >Upload Model</button>
		</label> 
        </div>
        

        </div>
        </>
    )
}
