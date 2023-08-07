import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext'; // Import the UserProvider
import Recipe from './Recipe.js';
import Login from './Login.js';
import Ingredients from './Ingredients.js';
import Recipe_Ingredient from './Recipe_Ingredient.js';

function App() {
  return (
    <UserProvider> {/* Wrap your app with the UserProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/recipe_ingredient" element={<Recipe_Ingredient/>} />
          <Route path='/Ingredients' element={<Ingredients />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}



 

export default App;