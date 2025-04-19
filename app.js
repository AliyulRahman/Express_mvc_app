const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static CSS from views folder
app.use('/css', express.static(path.join(__dirname, 'views')));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));

// Express JSON middleware to parse JSON payloads
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (Login)
app.use('/api/users', userRoutes); // User-related routes

// Serve the login page as the default page
app.get('/', (req, res) => {
  res.render('login');
});

// Serve the user management page (after login)
app.get('/users', (req, res) => {
  const User = require('./models/userModel');
  const users = User.getAll();
  res.render('users', { users });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
