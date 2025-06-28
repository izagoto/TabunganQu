const express = require('express');
const router = express.Router();
const accountBankController = require('../controllers/accountBankController');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/list', accountBankController.getAll);
router.get('/:id/details', accountBankController.getById);
router.post('/create', accountBankController.create);
router.put('/:id/update', accountBankController.update);
router.delete('/:id/delete', accountBankController.delete);

module.exports = router;