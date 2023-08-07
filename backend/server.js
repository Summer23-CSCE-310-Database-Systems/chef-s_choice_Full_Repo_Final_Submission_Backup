const ps = require('./password')
const http = require('http');
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Set up a connection to our PostgreSQL server using pg's built-in module for pooling connections and executing
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chefschoice',
  password: ps,
  port: '5432',
});

// Enable CORS for all routes
app.use(cors());

// Middleware to parse request bodies as JSON
app.use(express.json());

// Import your API files for each entity
const ingredientsAPI = require('./ingredients_api');
const recipesAPI = require('./recipes_api');
const userAPI = require('./user_api');
const recipeIngredientAPI = require('./recipe_ingredient_api')


// Mount the API routers
app.use('/backend/ingredients_api', ingredientsAPI);
app.use('/backend/recipes_api', recipesAPI);
app.use('/backend/user_api', userAPI)
app.use('./backend/recipe_ingredient_api', recipeIngredientAPI);

const port = 80; // Choose any available port number
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
