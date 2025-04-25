const axios = require('axios');
const User = require('../models/userModel');

// Get all users from MongoDB
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// Create a new user in MongoDB
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    newUser.id = Date.now();
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
};

// External API users (unchanged)
exports.getExternalUsers = async (req, res) => {
  try {
    const response = await axios.get('https://reqres.in/api/users');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching external users', error: error.message });
  }
};

// Render users.ejs view using MongoDB data
exports.renderUsersPage = async (req, res) => {
  try {
    const users = await User.find();
    res.render('users', { users });
  } catch (err) {
    res.status(500).send('Error loading user page');
  }
};
