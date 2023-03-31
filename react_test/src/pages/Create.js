import React, {useRef, useState, useEffect, forwardRef} from 'react';
import {Canvas, useLoader, useThree} from '@react-three/fiber';
import { TextureLoader, Vector3} from 'three';
import { OrbitControls } from '@react-three/drei';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import axios from 'axios';
import Cookies from 'universal-cookie';


import { getDownloadURL, getStorage,ref,uploadBytesResumable } from 'firebase/storage';
import initStor from '../components/firebaseInit';

import '../CSS/style.css';
const stor = getStorage(initStor)


var text = require("../img/In the Court of the Stone Defender.png")

export function Box(props)
{
    /*
		Deprecated model function, superceded by forwardRef box
    */
    const bref = useRef(null)
    const text = props.i
    const b =useLoader(TextureLoader,text)
   
   
    //useFrame((state,delta) => (ref.current.rotation.x += delta))
    return (
        <mesh
            {...props}
            ref={bref}
            scale={props.scale}
        >
            <boxGeometry attach = "geometry" args={[1,1,1,160,160]}/>
            <meshStandardMaterial attach ="material" map={b} wireframe={props.wf}/>
            
        </mesh>
   )
}

const BoxRef = forwardRef(function BoxTest(props,ref) 
{
    /* 
        Used separate from original box function so that
        mesh reference can be passed into main function
    */
    const text = props.i
    const b =useLoader(TextureLoader,text)
    const THREE = useThree()

    
    //useFrame((state,delta) => (ref.current.rotation.x += delta))
    return (
        <>
        <mesh
            {...props}
            ref={ref}
            scale={props.scale}
            
        >
            <boxGeometry attach = "geometry" args={[1,1,1,16,9]}/>
            <meshStandardMaterial attach ="material" map={b} wireframe={props.wf} vertexColors={THREE.faceColors}/>
            
            
        </mesh>
        </>
    )
 }
)



Box.defaultProps = {
    i: text,
    scale: [16,9,.01],
    wf: false
    
}


export default function Create() 
{
    const [selImg, setSelImg] = useState(null)
    // const [boxes, setBoxes] = useState([])

    const [fileName,setFileName] = useState('model')
    const [uFileName,setUFileName] = useState('model')
    const [aspect,setAspect] = useState([12,12])
    const [uplPer, setUplPer] = useState(0)
    //const [fileURL,setFileURL] = useState(null)
    const [scl, setScl] = useState(0)
    const [tags, setTags] = useState("")

    const dFileChange = e => {
        setFileName(e.target.value)
        
    }

    const uFileChange = e => {
        setUFileName(e.target.value)
    }

    const tagChange = e => {
        setTags(e.target.value)
    }
    
    const imgHandle = (e) => {
        if(cki.get("Token")) {
            console.log(cki.get("Token").uname)
        }
        const b = URL.createObjectURL(e.target.files[0])
        setSelImg(b)
        text=b
    }

    const canvasRef = useRef(null)
    const meshRef = useRef()
    //const imp = useLoader(GLTFLoader,impMod)

    const cki = new Cookies()
    const [user,setUser] = useState(null)
    const [date,setDate] = useState(null)

    useEffect(() => {
        /*
			Checks for login status on an interval
            Used to determine if user can upload models
		*/
        const inter = setInterval(() => {
            if (cki.get("Token"))
            {
                //console.log(cki.get("Token").uname)
                setUser(cki.get('Token').uname)
            } else {
                setUser(null)
            }
            let k = new Date()
            setDate(k.toISOString().split('T')[0])
            //console.log(date)
        }, 30)
        return () => clearInterval(inter)
        
    }, [user,cki] )
    
    const exportHandler = (upl=true) => {
        
        /*
            Function used to export a model and then either 
            download directly to device or upload to firebase
        */
        
        const exporter = new GLTFExporter()
        exporter.parse(
            canvasRef.current,
            (gltf) => {
                
                const glbBlob = new Blob([gltf], { type: 'application/octet-stream'})
                
                    
                if (upl)   
                {
                    const storRef = ref(stor,`${cki.get("Token").uname}/${uFileName}.glb`)
                    
                    const metadata = 
                    {
                        contentType: 'model/glb'
                    }
                    const upTask = uploadBytesResumable(storRef, glbBlob, metadata)
                    
                    upTask.on(
                        "state_changed", 
                        (snapshot) => {
                            let prog = Math.round(snapshot.bytesTransferred/snapshot.totalBytes * 100)
                            console.log(prog + "%")
                            setUplPer(prog)
                        },
                         (error) => {
                            console.log("Error with upload: ", error)
                         },
                         () => {

                            let p = tags.split(',')
                            p.map((t, ind) => {
                                p[ind] = '"' + t.trim() + '"'
                                console.log(p[ind])
                            })

                            getDownloadURL(upTask.snapshot.ref).then((downloadURL) => {
                                console.log('File available at', downloadURL)
                                axios.post("http://localhost:9000/model",{
                                    title:uFileName,
                                    uname:user,
                                    date: date,
                                    url: downloadURL,
                                    tag: p
                                })
                            })
                            setTimeout(() => {setUplPer(0)}, 3000)
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

    const dCLickHandle = (e) => {
        /* 
            Returns intersected face of the model, increasing height by
            specified scale and updating the mesh so that it can render
            the changes
        */
        
        let face = e.intersections[0].face;
        let mes = meshRef.current.geometry
        let geo = mes.attributes.position

        let va = new Vector3();
        va.fromBufferAttribute(geo,face.a);
        let vb = new Vector3();
        let vc = new Vector3();

        let ceil = 5*(scl*5)
        
        va.z += 5*(5*scl);

        if(va.z >= ceil)
        {
            va.z = ceil;
        }
        //These are not affected but are needed to maintain stability of points
        vb.fromBufferAttribute(geo,face.b);
        vc.fromBufferAttribute(geo,face.c);
        
        geo.setXYZ(face.a,va.x,va.y,va.z)
        geo.setXYZ(face.b,vb.x,vb.y,vb.z)
        geo.setXYZ(face.c,vc.x,vc.y,vc.z)
        
        geo.needsUpdate = true;

        //Back up box placing functionality, in case point extrusion falls through
        //let pos = e.intersections[0].point
        //pos.z = pos.z + .25
        //setBoxes((boxes) => [...boxes,pos])
        // console.log(boxes)
    }
    return(
        <>
        
        { selImg ? 
        <div style = {{height:'50%',width:'50%',margin:'auto',border:'2px solid black'}}>
        
        <Canvas>
                <ambientLight/>
                <pointLight/>
                <group ref={canvasRef}>
                    <BoxRef
                    ref={meshRef} 
                    position = {[0,0,-2]}
                    i={text}
                    scale={[aspect[0],aspect[1],.01]}
                    wf={false}
                    onDoubleClick={dCLickHandle}
                    />
                    
                    {/* {boxes.map((position,index) => 
                        (
                        <Box key={index} position={position} scale={[.5,.5,.5]}/>
                        )
                    )} */}
                    
                </group>
                
                <OrbitControls />
        </Canvas>
        
        
        
        </div>
        : <></>
    }
        <div className="flextest" style={{margin:'auto', width:'50%'}}>
        
        { selImg ? <>
        <input 
            type={'file'} 
            onChange= {imgHandle}
            accept={".jpg, .png"}
        />
        <select name="Scale" style={{marginLeft:"55%"}} onChange={(e) => {
            /* 
                Change the elevation used in extruding vertices
            */
            setScl(parseInt(e.target.value))
            }}>
                <option value="0">Flat</option>
                <option value='3'>5ft</option>
                <option value="6">10ft</option>
                <option value="9">15ft</option>
                <option value="12">20ft</option>
                <option value="15">25ft</option>
                <option value="18">30ft</option>
        </select>

        <select name="Aspect" onChange={(e) => {
            /*
                Used to change the aspect ratio of map to
                better fit a given image
            */
            
            let b = JSON.parse(e.target.value)
            setAspect(b)
            }}>
                <option value={JSON.stringify([12,12])}>Square</option>
                <option value={JSON.stringify([16,9])}>Wide</option>
                <option value={JSON.stringify([9,16])}>Tall</option>
        </select>
        
        </>
        : <div className="flextest" style={{margin:'auto', width:'50%', flexDirection:'column', marginTop:"20%"}}>
            Select an image to begin editing
            <input 
            type={'file'} 
            onChange= {imgHandle}
            accept={".jpg, .png"}
        />
            </div>
        }
        </div>
        
            {selImg ? <>
            <br/><hr/>
            <div className='flextest' style={{height:'40%'}}>
            <div className='choice' id="upl" style={{ justifyContent:'Center'}}>
                <h3>Download Model</h3>
                <label>
                    <p>Filename: <input type={"text"}  onChange={dFileChange}/> </p>
                    <button onClick={() => exportHandler(false)} >Download</button>
                </label>

            </div>

            <div className="choice" id="upl" style={{ bottom:'21'}}>
            <h3>Share Model</h3>
            {user ?
                <>
                    <label style={{}}>
                        <p style={{width:'100%'}}>Filename: <input type={"text"}  onChange={uFileChange}/> </p>
                    </label>
                        <label style={{position:'relative', left:'10px'}}>
                        <p style={{width:'100%'}}>Tags: <input type={"text"} onChange={tagChange} /> </p>
                    </label>
                    <button style={{width:'50%', alignSelf:'center'}} onClick={() => exportHandler(true)} >Upload</button>
                        
                    
                    {uplPer > 0 ?
                        <p>Upload Progress: {uplPer}%</p>
                        
                    :
                        <></>
                    }
                    {
                        uplPer == 100 ?
                        <p>File uploaded successfully!</p>
                        :
                        <></>

                    }
                </>
                :
                <label>
                    Please log in to be able to share
                </label>
            }
            </div>
            
            
            </div>
            </> 
            : <></>
        }
        </>
    )
}
