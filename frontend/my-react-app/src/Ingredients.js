import React, { useState, useEffect } from 'react';
import './Ingredients.css'; // Importing CSS for styling
import axios from 'axios';

const backendURL = 'http://localhost:80/backend/ingredients_api';

const Ingredients = () => {
  // State variables to manage ingredient data and input fields
  const [ingredients, setIngredients] = useState([]); // Store ingredient data from backend
  const [id, setId] = useState(null); // Current ingredient ID being edited or viewed
  const [name, setName] = useState(''); // Ingredient name input field value
  const [details, setDetails] = useState(''); // Ingredient details input field value
  const [caloriesPerOz, setCaloriesPerOz] = useState(null); // Calories per ounce input field value

  // Fetch ingredient data from the backend on component mount
  useEffect(() => {
    console.log('Fetching ingredients from the server...');
    axios.get(backendURL).then((response) => {
      console.log('Ingredients fetched successfully:', response.data);
      setIngredients(response.data);
    });
  }, []);

  // Handle adding a new ingredient
  const handleAddIngredient = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('Adding ingredient...');
    axios
      .post(backendURL, {
        name: name,
        details: details,
        calories_per_oz: caloriesPerOz,
      })
      .then((response) => {
        console.log('Ingredient added successfully:', response.data);
        setIngredients([...ingredients, response.data]);
        // Reset the input fields after adding the ingredient
        setName('');
        setDetails('');
        setCaloriesPerOz(null);
      })
      .catch((error) => {
        console.error('Error adding ingredient:', error);
      });
  };

  // Handle updating an existing ingredient
  const handleEditIngredient = () => {
    console.log('Updating ingredient...');
    axios
      .put(`${backendURL}/${id}`, {
        id: id,
        name: name,
        details: details,
        calories_per_oz: caloriesPerOz,
      })
      .then((response) => {
        console.log('Ingredient updated successfully:', response.data);
        setIngredients((prevIngredients) =>
          prevIngredients.map((ingredient) =>
            ingredient.id === id ? response.data : ingredient
          )
        );
      })
      .catch((error) => {
        console.error('Error updating ingredient:', error);
      });
  };

  // Handle deleting an ingredient
  const handleDeleteIngredient = () => {
    console.log('Deleting ingredient...');
    axios.delete(`${backendURL}/${id}`).then((response) => {
      console.log('Ingredient deleted successfully:', response.data);
      setIngredients((prevIngredients) =>
        prevIngredients.filter((ingredient) => ingredient.id !== id)
      );
    });
  };

  // Display the details of a selected ingredient
  const viewIngredient = (ingredient) => {
    console.log('Viewing ingredient:', ingredient);
    setName(ingredient.name);
    setDetails(ingredient.details);
    setCaloriesPerOz(ingredient.calories_per_oz);
    setId(ingredient.id);
  };

  // Render the UI for managing ingredients
  return (
    <ingredients>
      <div>
        <h1>Ingredients:</h1>
        <ul>
          {/* Map through ingredients and render their names */}
          {ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name}
              <button onClick={() => viewIngredient(ingredient)}>View</button>
            </li>
          ))}
        </ul>
        {/* Form for adding a new ingredient */}
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
          <button type="submit">Add Ingredient</button>
        </form>

        {/* Buttons for editing and deleting an ingredient */}
        <div>
          <button onClick={handleEditIngredient}>Update Ingredient</button>
          <button onClick={handleDeleteIngredient}>Delete Ingredient</button>
        </div>
      </div>
    </ingredients>
  );
};

export default Ingredients;
