const express = require('express');
const router = express.Router();
const shiftRoutes = require('./shiftRoutes');
const departmentRoutes = require('./departmentRoutes');
const studentRoutes = require('./studentRoutes');
const authRoutes = require('./authRoutes');
const AttendanceRoutes = require('./attendanceRoutes');
const DashboardRoutes = require('./dashboardRoutes');

router.use('/api', shiftRoutes);
router.use('/api', authRoutes);
router.use('/api', departmentRoutes);
router.use('/api', studentRoutes);
router.use('/api', AttendanceRoutes);
router.use('/api', DashboardRoutes);

module.exports = router;