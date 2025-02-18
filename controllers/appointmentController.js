const Appointment = require("../models/appointmentModel");

const getNextAppointment = async (req, res) => {
  try {
      // Buscar la cita con la fecha más próxima y que no haya sido notificada
      const nextAppointment = await Appointment.findOne({
          appointment_date: { $gte: new Date() }, // Fecha mayor o igual a la actual
          notified: false, 
      })
      .sort({ appointment_date: 1 })  // Ordenar por fecha ascendente para obtener la más próxima
      

      if (!nextAppointment) {
          return res.status(404).json({ message: 'No hay citas próximas' });
      }

      // Responder con la cita encontrada
      res.json(nextAppointment);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener la próxima cita' });
  }
};

const markNotified = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Se requiere un ID válido." });
    }

    const appointment = await Appointment.findByIdAndUpdate(id, { notified: true }, { new: true });

    if (!appointment) {
      return res.status(404).json({ message: "Cita no encontrada." });
    }

    res.json({ message: "Cita marcada como notificada.", appointment });

  } catch (error) {
    console.error("Error al marcar la cita:", error);
    res.status(500).json({ message: "Error al marcar la cita." });
  }
};


const createAppointment = async (req, res) => {
  try {
      const { first_name, last_name, appointment_date, appointment_time } = req.body;

      if (!first_name || !last_name || !appointment_date || !appointment_time) {
          return res.status(400).json({ message: "Todos los campos son obligatorios." });
      }

      const newAppointment = new Appointment({
          client: { first_name, last_name },
          appointment_date,
          appointment_time,
          notified: false
      });

      await newAppointment.save();

      res.status(201).json({
          message: "Cita creada exitosamente.",
          appointment: newAppointment
      });

  } catch (error) {
      console.error("Error al crear la cita:", error);
      res.status(500).json({ message: "Error al crear la cita." });
  }
};

const getAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Se requiere un ID válido." });
    }

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Cita no encontrada." });
    }

    res.json({ 
      message: "Estado de la cita obtenido correctamente.",
      status: appointment.notified ? "Notificada" : "Pendiente",
      appointment
    });

  } catch (error) {
    console.error("Error al obtener el estado de la cita:", error);
    res.status(500).json({ message: "Error al obtener el estado de la cita." });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { notified } = req.body; // Se espera un booleano en el cuerpo de la solicitud

    if (!id || typeof notified !== "boolean") {
      return res.status(400).json({ message: "Se requiere un ID válido y un estado de notificación válido." });
    }

    const appointment = await Appointment.findByIdAndUpdate(id, { notified }, { new: true });

    if (!appointment) {
      return res.status(404).json({ message: "Cita no encontrada." });
    }

    res.json({ 
      message: "Estado de la cita actualizado correctamente.",
      appointment
    });

  } catch (error) {
    console.error("Error al actualizar el estado de la cita:", error);
    res.status(500).json({ message: "Error al actualizar el estado de la cita." });
  }
};



module.exports = { getNextAppointment, markNotified, createAppointment, getAppointmentStatus, updateAppointmentStatus };
