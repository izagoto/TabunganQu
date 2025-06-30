require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const User = require('./models/User');
const incomeRoutes = require('./routes/income');
const accountBankRoutes = require('./routes/accountBank');
const categoryRoutes = require('./routes/category');
const userRoutes = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static('public'));

// Test route
app.get('/api', (req, res) => {
  res.json({ message: 'TabunganQu API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/accounts', accountBankRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);

// Test koneksi database
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
    // Sinkronisasi model
    sequelize.sync().then(() => console.log('Database synced!'));
  })
  .catch(err => console.error('Database connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
