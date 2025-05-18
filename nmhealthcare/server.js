const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
    res.send('Smart Healthcare API is running');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/smarthealthcare')
    .then(() => {
        console.log('MongoDB connected');
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch(err => console.error(err));

const auth = require('./middleware/auth');
const patientRoutes = require('./routes/patients');
app.use('/api/patients', auth, patientRoutes);
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const doctorIdRoutes = require('./routes/doctorids');
app.use('/api/doctorids', doctorIdRoutes);
const doctorRoutes = require('./routes/doctors');
app.use('/api/doctors', doctorRoutes);
// Keep only one of these lines

// Remove the duplicate declaration
// const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);