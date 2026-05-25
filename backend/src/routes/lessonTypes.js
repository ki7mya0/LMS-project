const express = require('express');
const router = express.Router();
const lessonTypeController = require('../controllers/lessonTypeController');

router.get('/', lessonTypeController.getAll);

module.exports = router;
