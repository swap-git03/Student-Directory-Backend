const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true, unique: true },
  studentPhone: String,
  studentDOB: Date,
  studentAddress: String,
  image: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: () => new Date().setHours(0,0,0,0) } // only date
});

module.exports = mongoose.model('student', studentSchema);
