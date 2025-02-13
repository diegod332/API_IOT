const express = require("express");
const { getNextAppointment, markNotified,createAppointment } = require("../controllers/appointmentController");

const router = express.Router();

router.get("/next-appointment", getNextAppointment);
router.post("/mark-notified/:id", markNotified);
router.post("/create-appointment", createAppointment);

module.exports = router;
