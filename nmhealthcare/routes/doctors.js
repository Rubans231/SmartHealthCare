const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Add a new doctor
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ msg: 'All fields required' });
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'Doctor already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = new User({ name, email, password: hashedPassword, role: 'doctor' });
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Remove a doctor
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Doctor removed' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;