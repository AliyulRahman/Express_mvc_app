const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const validateUser = require('../libs/Middlewarefunctions/validateUser');
const logRoute = require('../libs/Middlewarefunctions/logRoute');

// Apply route-level middleware
router.get('/', logRoute, userController.getAllUsers);
router.post('/', logRoute, validateUser, userController.createUser);
router.get('/external', logRoute, userController.getExternalUsers);
// router.get('/view', logRoute, userController.renderUsersPage);

module.exports = router;
