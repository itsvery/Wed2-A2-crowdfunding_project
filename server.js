const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parsing request bodies with the body-parser middleware
app.use(bodyParser.json());

// Creating a Database Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1128',
  database: 'crowdfunding_db'
});

// Connecting to the database
connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to database: ' + err.stack);
    return;
  }
  console.log('Successfully connected to the database, Connection ID: ' + connection.threadId);
});

// Start the server
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});