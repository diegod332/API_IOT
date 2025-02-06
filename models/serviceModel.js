const mongoose = require('mongoose');

// Esquema de servicio
const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Modelo de Servicio
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
