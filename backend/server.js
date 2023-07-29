const http = require('http');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chefschoice',
  password: 't',
  port: '5432',
});

const server = http.createServer(async (req, res) => {
    if (req.method === 'GET') {
      try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users');
        client.release();
  
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result.rows));
      } catch (err) {
        console.error('Error fetching data from the database:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error fetching data from the database.');
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Endpoint not found.');
    }
  });

const port = 5000; // Choose any available port number
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});