const mongoose = require("mongoose");
const Department = require("./Department");
const Shift = require("./Shift");

const StudentSchema = new mongoose.Schema({
  student_name: {
    type: String,
    required: [true, "Student name is required"],
  },
  admission_no: {
    type: String,
    required: [true, "Admission number is required"],
    unique: [true, "Admission number already exists"]
  },
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Department,
    required: [true, "Department ID is required"]
  },
  contact_no: {
    type: String,
    required: [true, "Contact number is required"],
    match: [/^\d{10}$/, "Please enter a valid 10-digit contact number"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"]
  },
  status: {
    type: Number,
    required: [true, "Status is required"]
  },
  class: {
    type: String,
    required: [true, "Class is required"]
  },
  shift_type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Shift,
    required: [true, "Shift ID is required"]
  },
  student_image: {
    type: String,
    required: [true, "Student image path is required"]
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", StudentSchema);