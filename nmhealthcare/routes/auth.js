const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AdminID = require('../models/AdminID');
const router = express.Router();
const { addPatientId } = require('../utils/idStore');

// Register
router.post('/register', async (req, res) => {
    const { name, email, password, role, doctorId, adminId } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });

        // Admin ID verification
        if (role === 'admin') {
            if (!adminId) return res.status(400).json({ msg: 'Admin ID is required' });
            const validAdmin = await AdminID.findOne({ adminId });
            if (!validAdmin) return res.status(400).json({ msg: 'Invalid Admin ID' });
        }

        // Doctor ID verification (if you want to add similar logic for doctors)
        // if (role === 'doctor') {
        //     if (!doctorId) return res.status(400).json({ msg: 'Doctor ID is required' });
        //     // Add doctor ID verification logic here if needed
        // }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        if (role === 'patient') {
            // Generate a patient ID (e.g., using MongoDB _id or custom logic)
            const patientId = newUser._id.toString(); // or your custom ID
            addPatientId(patientId);
        }
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;