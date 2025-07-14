require('dotenv').config();
const pool = require('./db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to PostgreSQL:', res.rows[0]);
  }
  pool.end();
});
