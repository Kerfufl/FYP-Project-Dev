import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
//import App from './App'
import Home from './pages/Home.js';
import Edit from './pages/Edit.js';
import Share from './pages/Share.js';
import Bar from './pages/Bar.js';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element ={<Bar />}>
                    <Route index element ={<Home />}></Route>
                    <Route path ="share" element ={<Share />}></Route>
                    <Route path ="edit" element ={<Edit />}></Route>
                </Route> 

            </Routes>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('root')).render(<App />)
