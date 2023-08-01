import React, { useContext, useState,useEffect } from 'react';
import './Recipe.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Use the absolute URL of the backend server
const backendURL = 'http://localhost:80/backend/recipes_api';

const Recipe = () => {
  const [recipes, setRecipe] = useState([]);
  const [rid, setRid] = useState(null);
  const [recipe_name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [culture, setCulture] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(backendURL).then((response) => {
      setRecipe(response.data);
    });
  }, []);

  const handleAddRecipe = (e) => {
    e.preventDefault();
    console.log('Adding recipe...');
    axios.post(backendURL, {
      name: recipe_name,
      category: category,
      culture: culture,
      instructions: instructions,
    })
    .then((response) => {
      console.log('Recipe added successfully:', response.data);
      setRecipe([...recipes, response.data]);
      // Reset the input fields after adding the ingredient
      setName('');
      setCategory('');
      setCulture('');
      setInstructions('');
    })
    .catch((error) => {
      console.error('Error adding recipe:', error);
    });
  };

  const handleEditRecipe = () => {
    axios.put(backendURL + '/' + rid, {
      name: recipe_name,
      category: category,
      culture: culture,
      instructions: instructions,
    }).then((response) => {
      setRecipe([...recipes, response.data]);
    });
  };

  const handleDeleteRecipe = () => {
    axios.delete(backendURL + '/' + rid).then((response) => {
      setRecipe(recipes.filter((recipe) => recipe.rid !== rid));
    });
  };

  const viewRecipe = (recipe) => {
    setName(recipe.name);
    setCategory(recipe.category);
    setCulture(recipe.culture);
    setInstructions(recipe.instructions);
    setRid(recipe.rid);
  };

  return (
    <recipe>
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.name}
            <viewbutton onClick={() => viewRecipe(recipe)}>View</viewbutton>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddRecipe}>
        <input
          type="text"
          placeholder="Name"
          value={recipe_name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          placeholder="Culture"
          value={culture}
          onChange={(e) => setCulture(e.target.value)}
        />
        <input
          type="text"
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </form>

      <div>
        <button onClick={handleAddRecipe}>Add Recipe</button>
        <button onClick={() => navigate('/update')}>Update Recipe</button>
        <button onClick={handleEditRecipe}>Edit Recipe</button>
        <button onClick={handleDeleteRecipe}>Delete Recipe</button>
      </div>
    </div>
    </recipe>
  );
};

export default Recipe;