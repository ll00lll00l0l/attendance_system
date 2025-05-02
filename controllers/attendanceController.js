const Attendance = require('../models/Attendance');
const AttendanceList = require('../models/Attendancelist');

exports.getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.find().populate('student_id');
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendance records", details: error.message });
  }
};

exports.addAttendance = async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json({
      status: true,
      message: "Attendance created successfully",
      data: attendance,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to create attendance",
      error: error.message,
    });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;
    const attendance = await Attendance.findById(id).populate('student_id');
    if (!attendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendance", details: error.message });
  }
}

exports.updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, student_image, status } = req.body;

    const updatedAttendance = await Attendance.findByIdAndUpdate(
      id,
      { student_id, student_image, status },
      { new: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({ error: "Attendance not found" });
    }

    if (status === true) {
      const existingEntry = await AttendanceList.findOne({
        attendance_id: updatedAttendance._id,
      });

      if (!existingEntry) {
        const newAttendanceList = new AttendanceList({
          student_id: updatedAttendance.student_id,
          attendance_id: updatedAttendance._id,
          status: updatedAttendance.status,
        });

        await newAttendanceList.save();
      }
    }

    res.status(200).json({
      message: "Attendance updated successfully",
      data: updatedAttendance,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update attendance",
      details: error.message,
    });
  }
};

exports.getAllAttendancelists = async (req, res) => {
  try {
    const attendances = await AttendanceList.find(req.query).populate('student_id');
    res.status(200).json(attendances);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch attendance records", details: error.message });
  }
};