const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Song = sequelize.define('Song', {
  title: { type: DataTypes.STRING, allowNull: false },
  artist: { type: DataTypes.STRING, allowNull: false },
  lyricsEs: { type: DataTypes.TEXT, allowNull: false },
  lyricsEn: { type: DataTypes.TEXT, allowNull: false },
  active: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'songs',
  timestamps: true
});

module.exports = Song;