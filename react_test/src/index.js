import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
//import App from './App'
import Home from './pages/Home.js';
import Edit from './pages/Edit.js';
import Share from './pages/Share.js';

export default function App() {
return(
    <BrowserRouter>
        <Routes>
            <Route path ="home" element ={<Home />}></Route>
            <Route path ="Share" element ={<Share />}></Route>
            <Route path ="edit" element ={<Edit />}></Route>

        </Routes>
    </BrowserRouter>
);

}

createRoot(document.getElementById('root')).render(<App />)
