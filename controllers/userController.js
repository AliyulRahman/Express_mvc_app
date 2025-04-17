const axios = require('axios');
const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
  res.json(User.getAll());
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  const createdUser = User.create(newUser);
  res.status(201).json(createdUser);
};

exports.getExternalUsers = async (req, res) => {
  try {
    const response = await axios.get('https://reqres.in/api/users');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching external users', error: error.message });
  }
};

exports.renderUsersPage = (req, res) => {
  const users = User.getAll();
  res.render('users', { users });
};
