const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// ===== USER ROUTES (untuk user biasa) =====
// User biasa hanya bisa akses profil sendiri
router.get('/profile', auth, userController.getMyProfile);
router.put('/profile', auth, userController.updateMyProfile);
router.post('/profile/photo', auth, userController.uploadPhoto);
router.delete('/profile/photo', auth, userController.deletePhoto);

// ===== ADMIN ROUTES =====
// Semua endpoint admin memerlukan auth dan role admin
router.use(auth, isAdmin);

// CRUD User Management (Admin Only)
router.post('/create', userController.createUser);
router.get('/list', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id/update', userController.updateUser);
router.patch('/:id/toggle-status', userController.toggleUserStatus);
router.delete('/:id/delete', userController.deleteUser);

module.exports = router; 