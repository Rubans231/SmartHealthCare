const express = require('express');
const DoctorID = require('../models/DoctorID');
const { addDoctorId } = require('../utils/idStore');
const router = express.Router();

router.post('/', async (req, res) => {
  const { doctorId } = req.body;
  if (!doctorId) return res.status(400).json({ msg: 'Doctor ID required' });
  const exists = await DoctorID.findOne({ doctorId });
  if (exists) return res.status(400).json({ msg: 'Doctor ID already exists' });
  const newId = new DoctorID({ doctorId });
  await newId.save();
  addDoctorId(doctorId);
  res.status(201).json(newId);
});

module.exports = router;