const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { fullName, username, email, password, photo } = req.body;
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ message: 'Semua field wajib diisi.' });
    }
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: 'Email sudah terdaftar.' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, username, email, password: hash, photo });
    res.status(201).json({ message: 'Registrasi berhasil', user: { id: user.id, fullName: user.fullName, username: user.username, email: user.email, photo: user.photo } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email dan password wajib diisi.' });
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Email tidak ditemukan.' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Password salah.' });
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });
    res.json({
      message: 'Login berhasil',
      token,
      user: { id: user.id, fullName: user.fullName, username: user.username, email: user.email, role: user.role, photo: user.photo }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
