const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const WeeklySelection = sequelize.define('WeeklySelection', {
  weekStartDate: { type: DataTypes.DATEONLY, allowNull: false },
  weekEndDate: { type: DataTypes.DATEONLY, allowNull: false }
}, {
  tableName: 'weekly_selections',
  timestamps: true
});

module.exports = WeeklySelection;