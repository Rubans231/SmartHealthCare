const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    gender: String,
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to doctor
    medicalHistory: String
});

module.exports = mongoose.model('Patient', patientSchema);