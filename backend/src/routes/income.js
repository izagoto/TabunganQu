const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/list', incomeController.getAll);
router.get('/:id/details', incomeController.getById);
router.post('/create', incomeController.create);
router.put('/:id/update', incomeController.update);
router.delete('/:id/delete', incomeController.delete);

module.exports = router; 