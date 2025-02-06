const mongoose = require('mongoose');

// Esquema de cliente
const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: String,
  createdAt: { type: Date, default: Date.now }
});

// Modelo de Cliente
const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
