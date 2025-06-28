const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const AccountBank = require('./AccountBank');
const Category = require('./Category');

const Income = sequelize.define('Income', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  amount: {
    type: DataTypes.DECIMAL(18,2),
    allowNull: false,
  },
  accountBankId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: AccountBank, key: 'id' },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Category, key: 'id' },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  timestamps: true,
});

Income.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Income, { foreignKey: 'userId' });
Income.belongsTo(AccountBank, { foreignKey: 'accountBankId' });
AccountBank.hasMany(Income, { foreignKey: 'accountBankId' });
Income.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Income, { foreignKey: 'categoryId' });

module.exports = Income; 