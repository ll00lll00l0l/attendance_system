const Student = require("../models/Student.js");

exports.getAllStudents = async (req, res) => {
  try {
    const studentList = await Student.find();

    if (studentList.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No Data Found"
      });
    }

    res.json({ status: true, message: "Students retrieved successfully", data: studentList });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({
      status: true,
      message: "New Student Created"
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ status: false, message: "Student not found" });
    }

    res.json({ student });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return res.status(404).json({ status: false, message: "Student not found" });
    }

    res.status(200).json({
      status: true,
      message: "Student Updated Successfully"
    });
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ status: false, message: "Student not found" });
    }

    res
      .status(200)
      .json({ status: true, message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getStudentsByQuery = async (req, res) => {
  try {
    const students = await Student.find(req.query).populate(
      "_id",
      "student_name"
    );
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};