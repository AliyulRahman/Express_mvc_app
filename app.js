const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Serve static CSS from views folder
app.use('/css', express.static(path.join(__dirname, 'views')));

// CORS options for views
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Root Route to render user view
app.get('/', (req, res) => {
  const User = require('./models/userModel');
  const users = User.getAll();
  res.render('users', { users });
});

// Start the server here
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
