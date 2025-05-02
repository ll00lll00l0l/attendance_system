const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

router.get('/list-departments', departmentController.getAllDepartments);
router.post('/add-department', departmentController.addDepartment);
router.get('/department/:id', departmentController.getDepartmentById);
router.put('/update-department/:id', departmentController.updateDepartment);
router.delete('/delete-department/:id', departmentController.deleteDepartment);

module.exports = router;