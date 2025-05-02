const Shift = require("../models/Shift");

exports.getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find();

    if (shifts.length === 0) {
      return res.status(404).json({ status: false, message: "No Data Found" });
    }

    res.json({
      status: true,
      message: "Shifts retrieved successfully",
      data: shifts
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.addShift = async (req, res) => {
  try {
    const { shift_name, start_time, end_time, break_time } = req.body;
    const newShift = new Shift({
      shift_name,
      start_time,
      end_time,
      break_time,
    });
    await newShift.save();

    res.status(201).json({
      status: true,
      message: "Shift created successfully"
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getShiftById = async (req, res) => {
  try {
    const shift = await Shift.findById(req.params.id);

    if (!shift) {
      return res
        .status(404)
        .json({ status: false, message: "Shift not found" });
    }
    res.json({ shift });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateShift = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: true,
      message: "Shift Updated successfully",
    });

    if (!shift) {
      return res
        .status(404)
        .json({ status: false, message: "Shift not found" });
    }
    res.json({ shift });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findByIdAndDelete(req.params.id);

    if (!shift) {
      return res
        .status(404)
        .json({ status: false, message: "Shift not found" });
    }

    res.json({ status: true, message: "Shift deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};