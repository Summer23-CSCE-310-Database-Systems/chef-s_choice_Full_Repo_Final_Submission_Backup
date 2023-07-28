const http = require('http');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chefschoice',
  password: 't',
  port: '5432',
});

async function createTables() {
    const client = await pool.connect();
  
try {
      await client.query(`
        CREATE TABLE Users (
          UID int,
          FName varchar(50),
          LName varchar(50),
          PRIMARY KEY (UID)
        );
  
        CREATE TABLE Recipes (
          RID int,
          UID int REFERENCES "User"(UID),
          RNAME varchar(50),
          CAT varchar(50),
          CUL varchar(50),
          INSTR varchar(50),
          PRIMARY KEY (RID)
        );
  
        CREATE TABLE Recipe_Ingredient (
          RID int,
          IID int,
          QTY varchar(50),
          PRIMARY KEY (RID, IID)
        );
  
        CREATE TABLE Ingredients (
          IID int,
          INAME varchar(50),
          DET varchar(50),
          CAL varchar(50),
          PRIMARY KEY (IID)
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