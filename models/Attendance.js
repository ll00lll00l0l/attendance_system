const mongoose = require('mongoose');
const Student = require('./Student');

const attendanceSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Student,
    required: false,
  },
  student_image: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    index: { expires: '7d' }
  },
  status: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model('Attendance', attendanceSchema);