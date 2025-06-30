const User = require('../models/User');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');

// Konfigurasi multer untuk upload foto
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/img'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `avatar_${req.user.id}_${Date.now()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ['.png', '.jpg', '.jpeg', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error('Hanya file gambar yang diizinkan!'));
    }
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// ===== ADMIN CONTROLLERS =====

exports.createUser = async (req, res) => {
  try {
    const { fullName, username, email, password, role, photo, isActive } = req.body;
    
    // Validasi input
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ status: 400, messages: 'Nama lengkap, username, email, dan password wajib diisi.', data: null });
    }

    // Cek email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ status: 400, messages: 'Email sudah terdaftar.', data: null });
    }

    // Cek username sudah digunakan
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ status: 400, messages: 'Username sudah digunakan.', data: null });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru (default role user, isActive true)
    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
      isActive: isActive !== undefined ? isActive : true,
      photo: photo || null
    });

    res.status(201).json({
      status: 201,
      messages: 'User berhasil dibuat.',
      data: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        photo: user.photo
      }
    });
  } catch (err) {
    res.status(500).json({ status: 500, messages: 'Terjadi kesalahan server.', data: null });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ 
      attributes: { exclude: ['password'] }, 
      order: [['createdAt', 'DESC']] 
    });
    res.json({ status: 200, messages: 'Daftar semua user berhasil diambil.', data: users });
  } catch (err) {
    res.status(500).json({ status: 500, messages: 'Terjadi kesalahan server.', data: null });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, { 
      attributes: { exclude: ['password'] } 
    });
    if (!user) {
      return res.status(404).json({ status: 404, messages: 'User tidak ditemukan.', data: null });
    }
    res.json({ status: 200, messages: 'Data user berhasil diambil.', data: user });
  } catch (err) {
    res.status(500).json({ status: 500, messages: 'Terjadi kesalahan server.', data: null });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, username, email, password, role, isActive, photo } = req.body;

    // Cari user yang akan diupdate
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ status: 404, messages: 'User tidak ditemukan.', data: null });
    }

    // Cek email duplikat (jika email diubah)
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ status: 400, messages: 'Email sudah terdaftar.', data: null });
      }
    }

    // Cek username duplikat (jika username diubah)
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(400).json({ status: 400, messages: 'Username sudah digunakan.', data: null });
      }
    }

    // Update fields
    if (fullName) user.fullName = fullName;
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;
    if (photo !== undefined) user.photo = photo;
    
    // Hash password jika diubah
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({
      status: 200,
      messages: 'User berhasil diperbarui.',
      data: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        photo: user.photo
      }
    });
  } catch (err) {
    res.status(500).json({ status: 500, messages: 'Terjadi kesalahan server.', data: null });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 404, messages: 'User tidak ditemukan.', data: null });
    }
    
    // Toggle status
    user.isActive = !user.isActive;
    await user.save();
    
    const statusText = user.isActive ? 'diaktifkan' : 'dinonaktifkan';
    res.json({ 
      status: 200, 
      messages: `User berhasil ${statusText}.`, 
      data: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        photo: user.photo
      }
    });
  } catch (err) {
    res.status(500).json({ status: 500, messages: 'Terjadi kesalahan server.', data: null });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ status: 404, messages: 'User tidak ditemukan.', data: null });
    }
    
    // Cek apakah user yang akan dihapus adalah admin
    if (user.role === 'admin') {
      return res.status(403).json({ status: 403, messages: 'Tidak dapat menghapus akun admin.', data: null });
    }
    
    await user.destroy();
    res.json({ status: 200, messages: 'User berhasil dihapus.', data: null });
  } catch (err) {
    res.status(500).json({ status: 500, messages: 'Terjadi kesalahan server.', data: null });
  }
};

// ===== USER CONTROLLERS =====

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { 
      attributes: { exclude: ['password'] } 
    });
    if (!user) {
      return res.status(404).json({ status: 404, messages: 'User tidak ditemukan.', data: null });
    }
    res.json({ status: 200, messages: 'Data profil berhasil diambil.', data: user });
  } catch (err) {
    res.status(500).json({ status: 500, messages: 'Terjadi kesalahan server.', data: null });
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ status: 404, messages: 'User tidak ditemukan.', data: null });
    }
    
    const { fullName, username, email, password, photo } = req.body;

    // Cek email duplikat
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ status: 400, messages: 'Email sudah terdaftar.', data: null });
      }
    }

    // Cek username duplikat
    if (username && username !== user.username) {
      const existingUsername = await User.findOne({ where: { username } });
      if (existingUsername) {
        return res.status(400).json({ status: 400, messages: 'Username sudah digunakan.', data: null });
      }
    }

    if (fullName) user.fullName = fullName;
    if (username) user.username = username;
    if (email) user.email = email;
    if (photo !== undefined) user.photo = photo;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    
    await user.save();
    
    res.json({ 
      status: 200, 
      messages: 'Profil berhasil diperbarui.', 
      data: { 
        id: user.id, 
        fullName: user.fullName, 
        username: user.username,
        email: user.email, 
        role: user.role,
        isActive: user.isActive,
        photo: user.photo 
      } 
    });
  } catch (err) {
    res.status(500).json({ status: 500, messages: 'Terjadi kesalahan server.', data: null });
  }
};

exports.uploadPhoto = [upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 400, messages: 'File foto tidak ditemukan.', data: null });
    }
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ status: 404, messages: 'User tidak ditemukan.', data: null });
    }
    // Simpan url file ke database
    const fileUrl = `${req.protocol}://${req.get('host')}/public/img/${req.file.filename}`;
    user.photo = fileUrl;
    await user.save();
    res.json({ status: 200, messages: 'Foto profil berhasil diupload.', data: { photo: fileUrl } });
  } catch (err) {
    res.status(500).json({ status: 500, messages: err.message || 'Terjadi kesalahan server.', data: null });
  }
}];

exports.deletePhoto = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ status: 404, messages: 'User tidak ditemukan.', data: null });
    }
    // Simpan path file lama jika ada
    let oldPhotoPath = null;
    if (user.photo) {
      // Ekstrak path file lokal dari URL
      const match = user.photo.match(/\/public\/img\/(.+)$/);
      if (match) {
        oldPhotoPath = path.join(__dirname, '../../public/img', match[1]);
      }
    }
    user.photo = null;
    await user.save();
    // Hapus file foto lama jika ada
    if (oldPhotoPath) {
      const fs = require('fs');
      fs.unlink(oldPhotoPath, (err) => {
        // Tidak masalah jika gagal hapus file (file mungkin sudah tidak ada)
      });
    }
    res.json({ status: 200, messages: 'Foto profil berhasil dihapus.', data: { photo: null } });
  } catch (err) {
    res.status(500).json({ status: 500, messages: err.message || 'Terjadi kesalahan server.', data: null });
  }
}; 