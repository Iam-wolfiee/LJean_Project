const express = require('express');
const pool = require('./db'); 
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    let { fullName, email, password } = req.body;

    fullName = fullName.trim();
    email = email.trim();
    password = password.trim();

    // para macheck kung nagamit na ba ung email
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // roles 
    let role = '';
    if (email.includes('owner')) role = 'owner';
    else if (email.includes('manager')) role = 'manager';
    else if (email.includes('staff')) role = 'staff';
    else if (email.includes('sales')) role = 'sales';
    else role = 'guest';

    // Insert 
    await pool.query(
      'INSERT INTO users (full_name, email, password, role) VALUES ($1, $2, $3, $4)',
      [fullName, email, password, role]
    );

    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    // trim para maavoid ung mga errors sa spacing
    email = email.trim();
    password = password.trim();

    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = userResult.rows[0];

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    res.status(200).json({
      message: 'Login successful.',
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

// para maview lahat ng users
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, full_name, email, password, role FROM users');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Fetch users error:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
