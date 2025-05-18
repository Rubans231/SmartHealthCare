const mongoose = require('mongoose');
const AdminID = require('./models/AdminID');

mongoose.connect('mongodb://localhost:27017/smarthealthcare')
    .then(async () => {
        // Add your valid admin IDs here
        const adminIds = ['ADMIN123'];
        for (const id of adminIds) {
            await AdminID.updateOne({ adminId: id }, { adminId: id }, { upsert: true });
        }
        console.log('Admin IDs seeded');
        mongoose.disconnect();
    })
    .catch(err => console.error(err));