const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');

router.get('/list-students', StudentController.getAllStudents);
router.post('/add-student', StudentController.addStudent);
router.get('/student/:id', StudentController.getStudentById);
router.put('/update-student/:id', StudentController.updateStudent);
router.delete('/delete-student/:id', StudentController.deleteStudent);
router.get('/student/filter', StudentController.getStudentsByQuery);

module.exports = router;