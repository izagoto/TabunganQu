const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const AccountBank = sequelize.define('AccountBank', {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bankNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

AccountBank.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(AccountBank, { foreignKey: 'userId' });

module.exports = AccountBank; 