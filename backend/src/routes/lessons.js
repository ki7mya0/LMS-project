const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.get('/:courseId/lessons', lessonController.getAll);
router.get('/:courseId/lessons/:id', lessonController.getById);
router.post('/:courseId/lessons', lessonController.create);
router.put('/:courseId/lessons/:id', lessonController.update);
router.delete('/:courseId/lessons/:id', lessonController.remove);

module.exports = router;
