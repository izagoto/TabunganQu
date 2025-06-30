const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { fullName, username, email, password, photo } = req.body;
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ status: 400, messages: 'Semua field wajib diisi.', data: null });
    }
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ status: 400, messages: 'Email sudah terdaftar.', data: null });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, username, email, password: hash, photo, isActive: false });
    res.status(201).json({ status: 201, messages: 'Registrasi berhasil, menunggu aktivasi admin.', data: { id: user.id, fullName: user.fullName, username: user.username, email: user.email, photo: user.photo } });
  } catch (err) {
    res.status(500).json({ status: 500, messages: 'Terjadi kesalahan server.', data: null });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ status: 400, messages: 'Email dan password wajib diisi.', data: null });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ status: 404, messages: 'Email tidak ditemukan.', data: null });
    if (!user.isActive) return res.status(403).json({ status: 403, messages: 'Akun belum diaktifkan admin.', data: null });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ status: 400, messages: 'Password salah.', data: null });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
    res.json({
      status: 200,
      messages: 'Login berhasil.',
      data: {
        token,
        user: { id: user.id, fullName: user.fullName, username: user.username, email: user.email, role: user.role, photo: user.photo }
      }
    });
  } catch (err) {
    res.status(500).json({ status: 500, messages: 'Terjadi kesalahan server.', data: null });
  }
};
