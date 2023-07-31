import React, { useContext, useState,useEffect } from 'react';
import './Ingredients.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Use the absolute URL of the backend server

const backendURL = 'http://localhost:5000/backend/api/ingredients';


const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [caloriesPerOz, setCaloriesPerOz] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(backendURL).then((response) => {
      setIngredients(response.data);
    });
  }, []);

  const handleAddIngredient = () => {
    axios.post(backendURL, {
      name: name,
      details: details,
      calories_per_oz: caloriesPerOz,
    }).then((response) => {
      setIngredients([...ingredients, response.data]);
    });
  };

  const handleEditIngredient = () => {
    axios.put(backendURL + '/' + id, {
      name: name,
      details: details,
      calories_per_oz: caloriesPerOz,
    }).then((response) => {
      setIngredients([...ingredients, response.data]);
    });
  };

  const handleDeleteIngredient = () => {
    axios.delete(backendURL + '/' + id).then((response) => {
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    });
  };

  const viewIngredient = (ingredient) => {
    setName(ingredient.name);
    setDetails(ingredient.details);
    setCaloriesPerOz(ingredient.calories_per_oz);
    setId(ingredient.id);
  };

  return (
    <ingredients>
    <div>
      <h1>Ingredients</h1>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name}
            <button onClick={() => viewIngredient(ingredient)}>View</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddIngredient}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories per oz"
          value={caloriesPerOz}
          onChange={(e) => setCaloriesPerOz(e.target.value)}
        />
      </form>

      <div>
        <button onClick={() => navigate('/create')}>Create Ingredient</button>
        <button onClick={() => navigate('/update')}>Update Ingredient</button>
        <button onClick={() => navigate('/edit')}>Edit Ingredient</button>
        <button onClick={() => navigate('/delete')}>Delete Ingredient</button>
      </div>
    </div>
        </ingredients>
  );
};

export default Ingredients;