const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/login for user login
router.post('/login', authController.login);
router.get('/register', authController.renderRegisterPage);
router.post('/register', authController.registerUser);

module.exports = router;
