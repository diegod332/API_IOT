const express = require("express");
const { getNextAppointment, markNotified } = require("../controllers/appointmentController");

const router = express.Router();

router.get("/next-appointment", getNextAppointment);
router.post("/mark-notified/:id", markNotified);
router.put()

module.exports = router;
