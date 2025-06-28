const AccountBank = require('../models/AccountBank');

exports.getAll = async (req, res) => {
  try {
    const accounts = await AccountBank.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const account = await AccountBank.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!account) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, bankNumber, bankName } = req.body;
    if (!name || !bankNumber || !bankName) return res.status(400).json({ message: 'Semua field wajib diisi' });
    const account = await AccountBank.create({ userId: req.user.id, name, bankNumber, bankName });
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, bankNumber, bankName } = req.body;
    const account = await AccountBank.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!account) return res.status(404).json({ message: 'Data tidak ditemukan' });
    account.name = name ?? account.name;
    account.bankNumber = bankNumber ?? account.bankNumber;
    account.bankName = bankName ?? account.bankName;
    await account.save();
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const account = await AccountBank.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!account) return res.status(404).json({ message: 'Data tidak ditemukan' });
    await account.destroy();
    res.json({ message: 'Data dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 