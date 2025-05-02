const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/attendance', attendanceController.getAllAttendances);
router.post('/add-attendance', attendanceController.addAttendance);
router.get('/attendance/:id', attendanceController.getAttendanceById);
router.put('/attendance/:id', attendanceController.updateAttendance);
router.get('/attendancelist', attendanceController.getAllAttendancelists);

module.exports = router;