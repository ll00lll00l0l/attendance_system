const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    required: [true, "Department name is required"],
    unique: true,
  },
});

module.exports = mongoose.model("Department", DepartmentSchema);