const jwt = require('jsonwebtoken');

// Hardcoded credentials for authentication
const HARDCODED_USERS = [
  {
    id: 1,
    email: 'testuser@example.com',
    password: 'password123' // Hardcoded password
  },
  {
    id: 2,
    email: 'admin@example.com',
    password: 'admin123' // Hardcoded password
  }
];

// Handle user login
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = HARDCODED_USERS.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h' // Token expires in 1 hour
  });

  res.json({ token });
};
