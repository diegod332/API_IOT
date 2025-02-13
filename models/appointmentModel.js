const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    appointment_date: Date,
    appointment_time: String,
    client: {
        _id: mongoose.Schema.Types.ObjectId,
        first_name: String,
        last_name: String
    },
    notified: { type: Boolean, default: false }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
