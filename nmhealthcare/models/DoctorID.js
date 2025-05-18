const mongoose = require('mongoose');

const doctorIDSchema = new mongoose.Schema({
  doctorId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('DoctorID', doctorIDSchema);