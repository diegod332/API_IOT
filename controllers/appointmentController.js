const Appointment = require('../models/appointmentModel');

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('client user services.service');
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createAppointment = async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Cita eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
