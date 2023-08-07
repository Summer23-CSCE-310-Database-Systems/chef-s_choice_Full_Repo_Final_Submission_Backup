const ps = require('./password')
const http = require('http');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chefschoice',
  password: ps,
  port: '5432',
});

async function createTables() {
    const client = await pool.connect();
  
try {
      await client.query(`
        CREATE TABLE Users (
          UID SERIAL PRIMARY KEY,
          FName varchar(100),
          LName varchar(100)
        );
  
        CREATE TABLE Recipes (
          RID SERIAL PRIMARY KEY,
          UID int,
          Recipe_name varchar(100),
          Category varchar(100),
          Culture varchar(100),
          Instructions varchar(100),
          CONSTRAINT fk_orders_client FOREIGN KEY (UID) REFERENCES Users (UID)
        );
  
        CREATE TABLE Recipe_Ingredient (
          RID int,
          IID int,
          QTY varchar(100),
          PRIMARY KEY (RID, IID)
        );
  
        CREATE TABLE Ingredients (
          ID SERIAL PRIMARY KEY,
          Name varchar(100),
          Details varchar(100),
          calories_per_oz varchar(100)
        );
      `);
      console.log('Tables created successfully!');
    } catch (err) {
      console.error('Error creating tables', err);
    } finally {
      client.release();
    }
 }
  
createTables();

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

const port = 3000; // Choose any available port number
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});