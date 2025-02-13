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
        await Appointment.findByIdAndUpdate(req.params.id, { notified: true });
        res.json({ message: "Cita marcada como notificada." });
    } catch (error) {
        console.error("Error al marcar la cita:", error);
        res.status(500).json({ message: "Error al marcar la cita." });
    }
};

module.exports = { getNextAppointment, markNotified };
