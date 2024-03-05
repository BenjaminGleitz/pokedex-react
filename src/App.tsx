import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import Show from './pages/show/Show';
import Navbar from './components/navbar/navbar';
import Count from './pages/count/count';
import PokeTeam from "./pages/pokeTeam/pokeTeam.tsx";

const App: React.FC = () => {
    return (
        <>
            <BrowserRouter>
                <div id="top"></div>
                <Navbar/>
                <section className='content' id='content'>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="show/:pokemonId" element={<Show/>}/>
                        <Route path="count/" element={<Count/>}/>
                        <Route path="team/" element={<PokeTeam/>}/>
                    </Routes>
                </section>
            </BrowserRouter>
        </>
    );
};

export default App;
