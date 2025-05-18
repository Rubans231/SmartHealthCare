const express = require('express');
const Patient = require('../models/Patient');
const router = express.Router();

// Middleware to check if user is doctor
function requireDoctor(req, res, next) {
    // Assuming you have user info in req.user (set by auth middleware)
    if (req.user && req.user.role === 'doctor') {
        next();
    } else {
        res.status(403).json({ msg: 'Access denied' });
    }
}

// Get all patients for the logged-in doctor
router.get('/', requireDoctor, async (req, res) => {
    const patients = await Patient.find({ doctor: req.user.id });
    res.json(patients);
});

// Add a new patient
router.post('/', requireDoctor, async (req, res) => {
    const { name, age, gender, medicalHistory } = req.body;
    const patient = new Patient({
        name,
        age,
        gender,
        medicalHistory,
        doctor: req.user.id
    });
    await patient.save();
    res.status(201).json(patient);
});

module.exports = router;