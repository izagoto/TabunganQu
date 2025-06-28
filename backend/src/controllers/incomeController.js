const Income = require('../models/Income');
const AccountBank = require('../models/AccountBank');
const Category = require('../models/Category');

exports.getAll = async (req, res) => {
  try {
    const incomes = await Income.findAll({
      where: { userId: req.user.id },
      order: [['date', 'DESC']],
      include: [AccountBank, Category],
    });
    res.json(incomes);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const income = await Income.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [AccountBank, Category],
    });
    if (!income) return res.status(404).json({ message: 'Data tidak ditemukan' });
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { amount, description, accountBankId, categoryId, date } = req.body;
    if (!amount || !date || !accountBankId || !categoryId) return res.status(400).json({ message: 'Amount, date, accountBankId, dan categoryId wajib diisi' });
    const income = await Income.create({ userId: req.user.id, amount, description, accountBankId, categoryId, date });
    res.status(201).json(income);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { amount, description, accountBankId, categoryId, date } = req.body;
    const income = await Income.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!income) return res.status(404).json({ message: 'Data tidak ditemukan' });
    income.amount = amount ?? income.amount;
    income.description = description ?? income.description;
    income.accountBankId = accountBankId ?? income.accountBankId;
    income.categoryId = categoryId ?? income.categoryId;
    income.date = date ?? income.date;
    await income.save();
    res.json(income);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const income = await Income.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!income) return res.status(404).json({ message: 'Data tidak ditemukan' });
    await income.destroy();
    res.json({ message: 'Data dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}; 