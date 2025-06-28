const Category = require('../models/Category');

exports.getAll = async (req, res) => {
  try {
    const categories = await Category.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!category) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name || !type) return res.status(400).json({ message: 'Semua field wajib diisi' });
    const category = await Category.create({ userId: req.user.id, name, type });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, type } = req.body;
    const category = await Category.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!category) return res.status(404).json({ message: 'Data tidak ditemukan' });
    category.name = name ?? category.name;
    category.type = type ?? category.type;
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!category) return res.status(404).json({ message: 'Data tidak ditemukan' });
    await category.destroy();
    res.json({ message: 'Data dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 