const Config = require("../models/configModel");

// 1️⃣ Obtener TODA la configuración
exports.getConfig = async (req, res) => {
  try {
    const configuraciones = await Config.find();
    const respuesta = {};
    configuraciones.forEach(config => {
      respuesta[config.elemento] = config.valor;
    });
    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener configuraciones", error });
  }
};

// 2️⃣ Crear o actualizar configuración (Evita duplicados)
exports.createOrUpdateConfig = async (req, res) => {
  try {
    const { elemento, estado, valor, unidadMedida } = req.body;

    const config = await Config.findOneAndUpdate(
      { elemento }, // Busca por elemento
      { estado, valor, unidadMedida },
      { new: true, upsert: true } // Crea si no existe
    );

    res.status(201).json({ mensaje: "Configuración guardada/actualizada", data: config });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al guardar configuración", error });
  }
};

// 3️⃣ Obtener configuración específica para Arduino
exports.getConfigForArduino = async (req, res) => {
  try {
    const configuraciones = await Config.find({}, "elemento estado valor");
    const respuesta = {};
    configuraciones.forEach(config => {
      respuesta[config.elemento] = { estado: config.estado, valor: config.valor };
    });
    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener configuración para Arduino", error });
  }
};

// 4️⃣ Actualizar configuración por ELEMENTO (sin usar ID)
exports.updateConfigByElemento = async (req, res) => {
  try {
    const { elemento } = req.params;
    const { estado, valor } = req.body;

    const configActualizada = await Config.findOneAndUpdate(
      { elemento },
      { estado, valor },
      { new: true }
    );

    if (!configActualizada) {
      return res.status(404).json({ mensaje: "Configuración no encontrada" });
    }

    res.json({ mensaje: "Configuración actualizada", data: configActualizada });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al actualizar configuración", error });
  }
};