import ReactThreeTestRenderer from '@react-three/test-renderer';
//import { Box } from '../pages/Create';
import Home from '../pages/Home'

test('mesh to have two children', async () => {
    const renderer = await ReactThreeTestRenderer.create(<Box/>);
    const mesh = renderer.scene.children[0].allChildren;
    expect(mesh.length).toBe(2);
  })
  
test('Render home module', async () => {
    const renderer = await ReactThreeTestRenderer.create(<Home/>);
    
  })
  