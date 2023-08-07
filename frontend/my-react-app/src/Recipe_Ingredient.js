import React, { useState, useEffect } from 'react';
import './Recipe_Ingredient.css';
import axios from 'axios';
const backendURL = 'http://localhost:80/backend/recipe_ingredient_api';

const RecipeIngredient = () => {
  const [recipes, setRecipes] = useState([]); 
  const [ingredients, setIngredients] = useState([]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [qty, setQty] = useState('');
  
  useEffect(() => {
    // Fetch list of recipes from the server
    axios.get( 'http://localhost:80/backend/recipes_api') 
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });

    // Fetch list of ingredients from the server
    axios.get('http://localhost:80/backend/ingredients_api')
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching ingredients:', error);
      });


    // Fetch recipe-ingredient associations from the server
    axios.get(backendURL)
      .then((response) => {
        setRecipeIngredients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recipe-ingredient associations:', error);
      });
  }, []);

  const handleAddRecipeIngredient = (e) => {
    e.preventDefault();
    console.log('Adding recipe-ingredient association...');

    axios.post(backendURL, {
      RID: selectedRecipe,
      ID: selectedIngredient,
      QTY: qty,
    })
    .then((response) => {
      console.log('Recipe-ingredient association added successfully:', response.data);
      setRecipeIngredients([...recipeIngredients, response.data]);
      // Reset input fields after adding association
      setSelectedRecipe(null);
      setSelectedIngredient(null);
      setQty('');
    })
    .catch((error) => {
      console.error('Error adding recipe-ingredient association:', error);
    });
  };

  return (
    <recipe_ingredient>
    <div>
      <h1>Recipe Ingredient</h1>
      <ul>
        {recipeIngredients.map((association) => (
          <li key={`${association.RID}-${association.ID}`}>
            Recipe: {association.RID}, Ingredient: {association.ID}, Quantity: {association.QTY}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddRecipeIngredient}>
        <select
          value={selectedRecipe}
          onChange={(e) => setSelectedRecipe(e.target.value)}
        >
          <option value="">Select Recipe</option>
            {recipes.map((recipe) => (
              <option key={recipe.rid} value={recipe.rid}>
                {recipe.recipe_name}
              </option>
            ))}
        </select>
        <select
          value={selectedIngredient}
          onChange={(e) => setSelectedIngredient(e.target.value)}
        >
          <option value="">Select Ingredient</option>
          {ingredients.map((ingredient) => (
            <option key={ingredient.ID} value={ingredient.ID}>
              {ingredient.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
        <button type="submit">Add Recipe-Ingredient</button>
      </form>
    </div>
    </recipe_ingredient>
  );
};

export default RecipeIngredient;