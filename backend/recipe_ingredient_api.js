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
    case 'GET':
      try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM recipe_ingredient');
        client.release();

        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify(result.rows));
      } catch (err) {
        console.error('Error fetching data from the database:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' });
        res.end('Error fetching data from the database.');
      }
      break;
    case 'POST':
      try {
        // Parse the request body to get the ingredient data
        const recipe_ingredients = req.body;

        // Insert the ingredient into the database
        const client = await pool.connect();
        const result = await client.query(
          'INSERT INTO recipe_ingredient (rid, id, qty) VALUES ($1, $2, $3) RETURNING *',
          [recipe_ingredients.rid, recipe_ingredients.id, recipe_ingredients.qty]
        );
        client.release();

        res.status(201).json(result.rows[0]);
      } catch (err) {
        console.error('Error inserting data into the database:', err);
        res.status(500).json({ error: 'Error inserting data into the database.' });
      }
      break;
    case 'PUT':
      try {
        // Parse the request body to get the ingredient data
        const recipe_ingredients = req.body;

        // Update the ingredient in the database
        const client = await pool.connect();
        const result = await client.query(
          'UPDATE recipe_ingredient SET rid=$1, id=$2, qty=$3 WHERE rid=$1 AND id=$2 RETURNING *',
          [recipe_ingredients.rid, recipe_ingredients.id, recipe_ingredients.qty]
        );
        client.release();

        res.status(200).json(result.rows[0]);
      } catch (err) {
        console.error('Error updating data in the database:', err);
        res.status(500).json({ error: 'Error updating data in the database.' });
      }
      break;
    case 'DELETE':
      try {
        const rid = Number(req.params.rid);
        const id = Number(req.params.id);

        const client = await pool.connect();
        const result = await client.query('DELETE FROM recipe_ingredient WHERE rid=$1 AND id=$2', [rid, id]);
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
router.route('/:rid/:id').get(handleRequest).post(handleRequest);

module.exports = router;
