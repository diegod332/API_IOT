const mongoose = require('mongoose');

// Esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'dentist', 'staff'] },
  createdAt: { type: Date, default: Date.now }
});

// Modelo de Usuario
const User = mongoose.model('User', userSchema);

module.exports = User;
