const Department = require("../models/Department");

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    if (departments.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No Data Found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Departments Retrieved Successfully",
      data: departments
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Fetching Data",
      error: error.message
    });
  }
};

exports.addDepartment = async (req, res) => {
  const { department_name } = req.body;

  try {
    const existingDepartment = await Department.findOne({ department_name });
    if (existingDepartment) {
      return res.status(400).json({
        status: false,
        message: "Department Already Exists"
      });
    }

    const newDepartment = new Department({ department_name });
    await newDepartment.save();

    res.status(201).json({
      status: true,
      message: "New Department Created"
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Saving Data",
      error: error.message
    });
  }
};

exports.getDepartmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({
        status: false,
        message: "Department Not Found"
      });
    }
    res.status(200).json({
      status: true,
      message: "Department Retrieved Successfully",
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Fetching Data",
      error: error.message
    });
  }
};

exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { department_name } = req.body;

  try {
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({
        status: false,
        message: "Department Not Found"
      });
    }

    const existingDepartment = await Department.findOne({ department_name });
    if (existingDepartment) {
      return res.status(400).json({
        status: false,
        message: "Department Already Exists"
      });
    }

    department.department_name = department_name;
    await department.save();

    res.status(200).json({
      status: true,
      message: "Department Updated Successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Updating Data",
      error: error.message
    });
  }
};

exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      return res.status(404).json({
        status: false,
        message: "Department Not Found"
      });
    }

    res.status(200).json({
      status: true,
      message: "Department Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error Deleting Data",
      error: error.message
    });
  }
};