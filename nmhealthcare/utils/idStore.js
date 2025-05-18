const fs = require('fs');
const path = require('path');

const idsPath = path.join(__dirname, '..', 'ids.json');

function readIds() {
  if (!fs.existsSync(idsPath)) {
    fs.writeFileSync(idsPath, JSON.stringify({ doctorIds: [], patientIds: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(idsPath, 'utf-8'));
}

function writeIds(data) {
  fs.writeFileSync(idsPath, JSON.stringify(data, null, 2));
}

function addDoctorId(doctorId) {
  const ids = readIds();
  if (!ids.doctorIds.includes(doctorId)) {
    ids.doctorIds.push(doctorId);
    writeIds(ids);
  }
}

function addPatientId(patientId) {
  const ids = readIds();
  if (!ids.patientIds.includes(patientId)) {
    ids.patientIds.push(patientId);
    writeIds(ids);
  }
}

module.exports = {
  readIds,
  addDoctorId,
  addPatientId
};