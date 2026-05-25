const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');

router.get('/', schoolController.getAll);
router.get('/:id', schoolController.getById);
router.post('/', schoolController.create);
router.put('/:id', schoolController.update);
router.delete('/:id', schoolController.remove);

module.exports = router;
