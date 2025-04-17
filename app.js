const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const logger = require('./libs/Middlewarefunctions/logger');

dotenv.config();

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// CORS options for views
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/users', userRoutes);

module.exports = app;
