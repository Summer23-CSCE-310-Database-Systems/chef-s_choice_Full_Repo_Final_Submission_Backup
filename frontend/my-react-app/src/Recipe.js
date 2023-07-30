import React, { useContext, useState,useEffect } from 'react';
import './Recipe.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Use the absolute URL of the backend server
const backendURL = 'http://localhost:5000/backend/api/recipe';

const Recipe = () => {
  const [recipes, setRecipe] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [culture, setCulture] = useState('');
  const [instructions, setInstructions] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(backendURL).then((response) => {
      setRecipe(response.data);
    });
  }, []);

  const handleAddRecipe = () => {
    axios.post(backendURL, {
      name: name,
      category: category,
      culture: culture,
      instructions: instructions,
    }).then((response) => {
      setRecipe([...recipes, response.data]);
    });
  };

  const handleEditRecipe = () => {
    axios.put(backendURL + '/' + id, {
      name: name,
      category: category,
      culture: culture,
      instructions: instructions,
    }).then((response) => {
      setRecipe([...recipes, response.data]);
    });
  };

  const handleDeleteRecipe = () => {
    axios.delete(backendURL + '/' + id).then((response) => {
      setRecipe(recipes.filter((recipe) => recipe.id !== id));
    });
  };

  const viewRecipe = (recipe) => {
    setName(recipe.name);
    setCategory(recipe.category);
    setCulture(recipe.culture);
    setInstructions(recipe.instructions);
    setId(recipe.id);
  };

  return (
    <recipe>
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.name}
            <button onClick={() => viewRecipe(recipe)}>View</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddRecipe}>
        <input
          type="text"
          placeholder="Name"
          value={name}
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
        <button type="submit">Submit Change</button>
      </form>

      <div>
        <button onClick={() => navigate('/create')}>Create Recipe</button>
        <button onClick={() => navigate('/update')}>Update Recipe</button>
        <button onClick={() => navigate('/edit')}>Edit Recipe</button>
        <button onClick={() => navigate('/delete')}>Delete Recipe</button>
      </div>
    </div>
    </recipe>
  );
};

export default Recipe;