import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Recipe from './Recipe.js';
import Login from './Login.js';
import Ingredients from './Ingredients.js';


function App() {

    return (

        <Router>
            <Navbar />

            <Routes>
                <Route exact path='/' exact element={<Login />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Recipe' element={<Recipe />} />
                <Route path='/Ingredients' element={<Ingredients/>}/>
            </Routes>
            </Router>
        
    );
}

export default App;