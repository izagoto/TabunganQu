const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/list', categoryController.getAll);
router.get('/:id/details', categoryController.getById);
router.post('/create', categoryController.create);
router.put('/:id/update', categoryController.update);
router.delete('/:id/delete', categoryController.delete);

module.exports = router; 