const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');


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

// Provision of static documents(提供静态文件)
app.use(express.static(path.join(__dirname, '../clientside/public')));

// Start the server
app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});

// Get all active fundraisers(获取所有活跃的筹款活动)
app.get('/fundraisers', (req, res) => {
    const query = `
      SELECT f.*, c.NAME as CATEGORY_NAME
      FROM FUNDRAISER f
      JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
      WHERE f.ACTIVE = TRUE
    `;
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Query failed: ' + err.stack);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
});


// Get all categories(获取所有类别)
app.get('/categories', (req, res) => {
    const query = 'SELECT * FROM CATEGORY';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Query failed: ' + err.stack);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });



  // Search for active fundraisers by criteria(根据条件搜索活跃的筹款活动)
app.get('/search', (req, res) => {
    const { organizer, city, category } = req.query;
    let query = `
      SELECT f.*, c.NAME as CATEGORY_NAME
      FROM FUNDRAISER f
      JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
      WHERE f.ACTIVE = TRUE
    `;
    const conditions = [];
    if (organizer) conditions.push(`f.ORGANIZER LIKE '%${organizer}%'`);
    if (city) conditions.push(`f.CITY LIKE '%${city}%'`);
    if (category) conditions.push(`c.NAME LIKE '%${category}%'`);
    if (conditions.length > 0) query += ' AND ' + conditions.join(' AND ');
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Query failed: ' + err.stack);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });
  
  // Get fundraising event details by ID(根据 ID 获取筹款活动的详细信息)
app.get('/fundraiser/:id', (req, res) => {
    const { id } = req.params;
    const query = `
      SELECT f.*, c.NAME as CATEGORY_NAME
      FROM FUNDRAISER f
      JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID
      WHERE f.FUNDRAISER_ID = ?
    `;
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Query failed: ' + err.stack);
        res.status(500).send('Server error');
        return;
      }
      res.json(results[0]);
    });
  });
  