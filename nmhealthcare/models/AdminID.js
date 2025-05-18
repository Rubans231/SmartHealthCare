const mongoose = require('mongoose');

const adminIDSchema = new mongoose.Schema({
    adminId: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('AdminID', adminIDSchema);