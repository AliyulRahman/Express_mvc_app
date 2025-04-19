const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Middleware to verify JWT token
const verifyToken = require('../libs/Middlewarefunctions/verifyToken');

// Get all users (protected route)
router.get('/', verifyToken, userController.getAllUsers);

// Create a new user (protected route)
router.post('/', verifyToken, userController.createUser);

// Fetch external users (protected route)
router.get('/external', verifyToken, userController.getExternalUsers);

// Render user page (protected route)
router.get('/view', verifyToken, userController.renderUsersPage);

module.exports = router;
