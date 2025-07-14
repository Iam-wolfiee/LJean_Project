require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const authRoutes = require('./auth');

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

// para macheck kung nagana ung api 
app.get('/', (req, res) => {
  res.send('API Server is running.');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
