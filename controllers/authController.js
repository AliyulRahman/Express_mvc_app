const User = require('../models/userModel');
const { generateToken } = require('../libs/Helperfunctions/jwt');

exports.renderRegisterPage = (req, res) => {
  res.render('register');
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password, // You may hash this in production
      id: Date.now()
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = generateToken(user);
  res.json({ token });
};
