const http = require('http');
const { Pool } = require('pg');
const cors = require('cors'); // Import the cors middleware

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chefschoice',
  password: 't',
  port: '5432',
});

async function handleRequest(req, res) {
  if (req.method === 'GET') {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM users');
      client.release();

      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }); // Set the 'Access-Control-Allow-Origin' header to allow all origins (*)
      res.end(JSON.stringify(result.rows));
    } catch (err) {
      console.error('Error fetching data from the database:', err);
      res.writeHead(500, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' }); // Set the 'Access-Control-Allow-Origin' header to allow all origins (*)
      res.end('Error fetching data from the database.');
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' }); // Set the 'Access-Control-Allow-Origin' header to allow all origins (*)
    res.end('Endpoint not found.');
  }
}

const server = http.createServer((req, res) => {
  handleRequest(req, res).catch((err) => {
    console.error('Error handling request:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*' }); // Set the 'Access-Control-Allow-Origin' header to allow all origins (*)
    res.end('Internal Server Error.');
  });
});

const port = 5000; // Choose any available port number
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});