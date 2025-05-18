const mongoose = require('mongoose');
const DoctorID = require('./models/DoctorID');

mongoose.connect('mongodb://localhost:27017/smarthealthcare')
    .then(async () => {
        // Add your valid doctor IDs here
        const doctorIds = ['DOC1001', 'DOC1002'];
        for (const id of doctorIds) {
            await DoctorID.updateOne({ doctorId: id }, { doctorId: id }, { upsert: true });
        }
        console.log('Doctor IDs seeded');
        mongoose.disconnect();
    })
    .catch(err => console.error(err));