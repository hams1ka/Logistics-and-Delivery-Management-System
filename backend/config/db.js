const mysql = require('mysql2');
require('dotenv').config();

 
const pool = mysql.createPool({
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASSWORD,
    database        : process.env.DB_NAME,
    waitForConnections  : true,
    connectionLimit     : 10,
    queueLimit          : 0
});

// Wrap the pool with promise support
// This lets us use async/await instead of callbacks
const promisePool = pool.promise();

// Test the connection immediately when this file is loaded
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection FAILED:', err.message);
        return;
    }
    console.log('Database connected successfully to:', process.env.DB_NAME);
    connection.release();
});

module.exports = promisePool;