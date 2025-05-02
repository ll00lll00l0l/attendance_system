const express = require('express');
const router = express.Router();
const ShiftController = require('../controllers/shiftController');

router.get('/list-shifts', ShiftController.getAllShifts);
router.post('/add-shift', ShiftController.addShift);
router.get('/shift/:id', ShiftController.getShiftById);
router.put('/update-shift/:id', ShiftController.updateShift);
router.delete('/delete-shift/:id', ShiftController.deleteShift);

module.exports = router;