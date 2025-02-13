const Appointment = require("../models/appointmentModel");

const getNextAppointment = async (req, res) => {
  try {
    const now = new Date();
    const nowUTC = new Date(now.toISOString()); 
    
    const nextAppointment = await Appointment.findOne({ 
      notified: false, 
      appointment_date: { $gte: nowUTC }
  }).sort({ appointment_date: 1, appointment_time: 1 });
  
  console.log("Fecha y hora actuales:", nowUTC);
  console.log("Cita obtenida:", nextAppointment);
  
  if (!nextAppointment) {
      const allAppointments = await Appointment.find();
      console.log("Todas las citas en la base de datos:", allAppointments);
      return res.json({ message: "No hay citas pendientes." });
  }
  
    
    res.json(nextAppointment);
    
  } catch (error) {
      console.error("Error al obtener la cita:", error);
      res.status(500).json({ message: "Error al obtener la cita." });
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
        const { client_name, appointment_date, appointment_time } = req.body;

        if (!client_name || !appointment_date || !appointment_time) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        const newAppointment = new Appointment({
            client_name,
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



module.exports = { getNextAppointment, markNotified, createAppointment };
