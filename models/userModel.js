const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: String, required: false },
  name: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // optional if not using auth
}, { timestamps: true });

const User = mongoose.model('users', userSchema);

module.exports = User;
