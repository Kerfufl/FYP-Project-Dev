import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import Home from './pages/Home.js';
import Create from './pages/Create.js';
import Browse from './pages/Browse.js';
import Bar from './pages/Bar.js';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element ={<Bar />}>
                    <Route index element ={<Home />}></Route>
                    <Route path ="Browse" element ={<Browse />}></Route>
                    <Route path ="Create" element ={<Create />}></Route>
                </Route> 

            </Routes>
        </BrowserRouter>
    );
}

createRoot(document.getElementById('root')).render(<App />)
