const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const connectDB = require('./libs/Helperfunctions/dbConnection');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./libs/Middlewarefunctions/verifyToken');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// Serve static CSS from views folder
app.use('/css', express.static(path.join(__dirname, 'views')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', verifyToken, userRoutes);

// Public views
app.get('/', (req, res) => res.render('login'));
app.get('/register', (req, res) => res.render('register'));
app.get('/users', async (req, res) => {
  const User = require('./models/userModel');
  const users = await User.find();
  res.render('users', { users });
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
