import React, {useRef} from 'react';
import {Canvas, useFrame} from '@react-three/fiber'
export default function Edit() 
{
    function Box(props)
    {
        const ref = useRef();

        useFrame((state,delta) => (ref.current.rotation.x += delta))

        return (
            <mesh
                {...props}
                ref={ref}
            >
                <boxGeometry args={[1,1,1]}/>
                <meshStandardMaterial color = 'hotpink' />
             
            </mesh>
        )
    }
    return(
        <>
        <h1>edit?</h1>
        <Canvas>
                <ambientLight/>
                <pointLight />
                <Box position = {[-1.2,0,0]}/>
            </Canvas>
        <div>
            
        </div>
        </>
    );
}
