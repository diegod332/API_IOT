const mongoose = require("mongoose");

const ConfigSchema = new mongoose.Schema(
  {
    elemento: { type: String, required: true, unique: true }, // No permitir elementos duplicados
    estado: { type: Number, enum: [0, 1], default: 0 }, // Solo aceptar 0 o 1
    valor: { type: Number, default: 0, min: 0 }, // No permitir valores negativos
    unidadMedida: { type: String, default: "", trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Config", ConfigSchema);
