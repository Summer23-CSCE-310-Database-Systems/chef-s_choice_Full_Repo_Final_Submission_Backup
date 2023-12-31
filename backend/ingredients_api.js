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
    // Write a GET case to obtain data from the Ingredients table
    case 'GET':
      try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM ingredients');
        client.release();

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify(result.rows));
      } catch (err) {
        console.error('Error fetching data from the database:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
        res.end('Error fetching data from the database.');
      }
      break;
    // Write a POST case to Insert data to the Ingredients table
    case 'POST':
      try {
        // Parse the request body to get the ingredient data
        const ingredient = req.body;

        // Insert the ingredient into the database
        const client = await pool.connect();
        const result = await client.query(
          'INSERT INTO ingredients (name, details, calories_per_oz) VALUES ($1, $2, $3) RETURNING *',
          [ingredient.name, ingredient.details, ingredient.calories_per_oz]
        );
        client.release();

        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).json({ error: 'Error inserting data into the database.' });
      }
      break;
    // Write a PUT case to Update data in the Ingredients table
    case 'PUT':
      try {
        // Parse the request body to get the ingredient data
        const ingredient = req.body;

        // Update the ingredient in the database
        const client = await pool.connect();
        const result = await client.query(
          'UPDATE ingredients SET name=$1, details=$2, calories_per_oz=$3 WHERE id=$4 RETURNING *',
          [ingredient.name, ingredient.details, ingredient.calories_per_oz, ingredient.id]
        );
        client.release();

        res.status(200).json(result.rows[0]);
      } catch (err) {
        console.error('Error updating data in the database:', err);
        res.status(500).json({ error: 'Error updating data in the database.' });
      }
      break;
    // Write a DELETE case to remove data from the Ingredients table
    case 'DELETE':
      try {
        const id = Number(req.params.id);

        const client = await pool.connect();
        const result = await client.query('DELETE FROM ingredients WHERE id=$1', [id]);
        client.release();

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ id }));
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

// Route for handling PUT and DELETE requests to /backend/ingredients_api/:id
router.route('/:id').put(handleRequest).delete(handleRequest);

module.exports = router;
