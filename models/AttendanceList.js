const mongoose = require('mongoose');
const Student = require('./Student');
const Attendance = require('./Attendance');

const attendanceListSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Student,
    required: true,
  },
  attendance_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Attendance,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Number,
    enum: [0, 1, 2],
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('AttendanceList', attendanceListSchema);