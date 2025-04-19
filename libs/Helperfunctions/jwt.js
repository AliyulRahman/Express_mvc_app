const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Use a secure secret key in production
const JWT_EXPIRATION = '1h'; // Token expiration time

// Generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION
  });
};

// Verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null; // If the token is invalid or expired, return null
  }
};

module.exports = { generateToken, verifyToken };
