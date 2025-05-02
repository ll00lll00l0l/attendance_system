const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { authuploadImage, unauthuploadImage } = require('../controllers/mediaController');

router.post('/auth', upload.single('image'), authuploadImage);
router.post('/unauth', upload.single('image'), unauthuploadImage);

module.exports = router;