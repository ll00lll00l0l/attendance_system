const mongoose = require("mongoose");

const shiftSchema = new mongoose.Schema({
  shift_name: {
    type: String,
    required: true,
    unique: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  break_time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Shift", shiftSchema);