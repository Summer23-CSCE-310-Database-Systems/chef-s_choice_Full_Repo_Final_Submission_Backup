const express = require('express');
const { Pool } = require('pg');
const ps = require('./password')
const router = express.Router();

// Set up a connection to our PostgreSQL server using pg's built-in module for pooling connections and executing
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chefschoice',
  password: ps,
  port: '5432',
});

async function handleRequest(req, res) {
  switch (req.method) {
    // Write a GET case to obtain data from the Recipe table
    case 'GET':
      try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM recipes');
        client.release();

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify(result.rows));
      } catch (err) {
        console.error('Error fetching data from the database:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
        res.end('Error fetching data from the database.');
      }
      break;

    // Write a POST case to Insert data to the Recipe table
    case 'POST':
      try {

        // Parse the request body to get the ingredient data
        const recipes = req.body;

        // Insert the ingredient into the database
        const client = await pool.connect();
        const result = await client.query(
          'INSERT INTO recipes (uid, recipe_name, category, culture, instructions) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [recipes.uid, recipes.recipe_name, recipes.category, recipes.culture, recipes.instructions]
        );
        client.release();

        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).json({ error: 'Error inserting data into the database.' });
      }
      break;
    // Write a PUT case to Update data in the Recipe table
    case 'PUT':
      try {

        // Parse the request body to get the ingredient data
        const recipes = req.body;

        // Update the ingredient in the database
        const client = await pool.connect();
        const result = await client.query(
          'UPDATE recipes SET recipe_name=$1, category=$2, culture=$3, instructions=$4 WHERE rid=$5 RETURNING *',
          [recipes.recipe_name, recipes.category, recipes.culture, recipes.instructions, recipes.rid]
        );
        client.release();

        res.status(200).json(result.rows[0]);
      } catch (err) {
        console.error('Error updating data in the database:', err);
        res.status(500).json({ error: 'Error updating data in the database.' });
      }
      break;
    // Write a DELETE case to remove data from the Recipe table
    case 'DELETE':
      try {
        const rid = Number(req.params.rid);

        const client = await pool.connect();
        const result = await client.query('DELETE FROM recipes WHERE rid=$1', [rid]);
        client.release();

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ rid }));
      } catch (err) {
        console.error('Error deleting data from the database:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
        res.end('Error deleting data from the database.');
      }
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
      res.end('Endpoint not found.');
      break;
  }
}

// Route for handling GET and POST requests to /backend/ingredients_api
router.route('/').get(handleRequest).post(handleRequest);

// Route for handling PUT and DELETE requests to /backend/ingredients_api/:rid
router.route('/:rid').put(handleRequest).delete(handleRequest);

module.exports = router;
