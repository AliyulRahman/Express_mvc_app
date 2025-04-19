const axios = require('axios');
const User = require('../models/userModel');
const { generateToken } = require('../libs/Helperfunctions/jwt'); // Import JWT helper

// Get all users - public route (no authentication required)
exports.getAllUsers = (req, res) => {
  res.json(User.getAll());
};

// Create a new user - public route (no authentication required)
exports.createUser = (req, res) => {
  const newUser = req.body;
  const createdUser = User.create(newUser);
  res.status(201).json(createdUser);
};

// Fetch external users from reqres.in - public route (no authentication required)
exports.getExternalUsers = async (req, res) => {
  try {
    const response = await axios.get('https://reqres.in/api/users');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching external users', error: error.message });
  }
};

// Render the users page for the frontend (public view)
exports.renderUsersPage = (req, res) => {
  const users = User.getAll();
  res.render('users', { users });
};
