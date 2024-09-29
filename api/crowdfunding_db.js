const mysql = require('mysql');

//  Creating a Database Connection
const connection = mysql.createConnection({
  host: 'localhost', // Database hosting
  user: 'root', // Database User Name
  password: '1128', // Database Password
  database: 'crowdfunding_db' // Database name
});

// Connecting to the database
connection.connect((err) => {
  if (err) {
    console.error('Failed to connect to database: ' + err.stack);
    return;
  }
  console.log('Successfully connected to the database, Connection ID: ' + connection.threadId);
});

// Close the database connection
connection.end();
