import React, { useState, useEffect } from 'react';
import './Recipe.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RecipeIngredient from './Recipe_Ingredient';

// Use the absolute URL of the backend server
const backendURL = 'http://localhost:80/backend/recipes_api';

// Recipe component
const Recipe = () => {
  // State variables to manage recipe data and input fields
  const [recipes, setRecipe] = useState([]); // Store recipe data from backend
  const [rid, setRid] = useState(null); // Current recipe ID being edited or viewed
  const [recipe_name, setName] = useState(''); // Recipe name input field value
  const [category, setCategory] = useState(''); // Recipe category input field value
  const [culture, setCulture] = useState(''); // Recipe culture input field value
  const [instructions, setInstructions] = useState(''); // Recipe instructions input field value
  const navigate = useNavigate(); // Navigation function

  // Fetch recipe data from the backend on component mount
  useEffect(() => {
    axios.get(backendURL).then((response) => {
      setRecipe(response.data);
    });
  }, []);

  // Handle adding a new recipe
  const handleAddRecipe = (e) => {
    e.preventDefault();
    console.log('Adding recipe...');
    
    // Send POST request to add recipe to the backend
    axios.post(backendURL, {
      recipe_name: recipe_name,
      category: category,
      culture: culture,
      instructions: instructions,
    })
    .then((response) => {
      console.log('Recipe added successfully:', response.data);
      setRecipe([...recipes, response.data]);
      // Reset the input fields after adding the recipe
      setName('');
      setCategory('');
      setCulture('');
      setInstructions('');
    })
    .catch((error) => {
      console.error('Error adding recipe:', error);
    });
  };

  // Handle updating an existing recipe
  const handleEditRecipe = () => {
    console.log('Updating recipe...');
    // Send PUT request to update the recipe in the backend
    axios
      .put(`${backendURL}/${rid}`, {
        rid: rid,
        recipe_name: recipe_name,
        category: category,
        culture: culture,
        instructions: instructions,
      })
      .then((response) => {
        console.log('Recipe updated successfully:', response.data);
        setRecipe((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe.rid === rid ? response.data : recipe
          )
        );
      })
      .catch((error) => {
        console.error('Error updating recipe:', error);
      });
  };

  // Handle deleting a recipe
  const handleDeleteRecipe = () => {
    console.log('Deleting recipe...');
    // Send DELETE request to delete the recipe from the backend
    axios.delete(`${backendURL}/${rid}`).then((response) => {
      console.log('Recipe deleted successfully:', response.data);
      setRecipe((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.rid !== rid)
      );
    });
  };

  // Display the details of a selected recipe
  const viewRecipe = (recipe) => {
    setName(recipe.recipe_name);
    setCategory(recipe.category);
    setCulture(recipe.culture);
    setInstructions(recipe.instructions);
    setRid(recipe.rid);
  };

  // Render the recipe list, form for adding a new recipe, and buttons for editing and deleting
  return (
    <recipe>
      <div>
        <h1>Recipes</h1>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.rid}>
              {recipe.recipe_name}
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
          <button type="submit">Add Recipe</button>
        </form>

        <div>
          <button onClick={handleEditRecipe}>Update Recipe</button>
          <button onClick={handleDeleteRecipe}>Delete Recipe</button>
        </div>
      </div>
    </recipe>
  );
};

export default Recipe;
