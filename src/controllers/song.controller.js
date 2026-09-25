const { Op } = require('sequelize');
const { Song, WeeklySelection } = require('../models');

// Público: canciones habilitadas de la semana actual
exports.getCurrentWeekSongs = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const currentWeek = await WeeklySelection.findOne({
      where: {
        weekStartDate: { [Op.lte]: today },
        weekEndDate: { [Op.gte]: today }
      },
      order: [['createdAt', 'DESC']],
      include: [{ model: Song, as: 'songs', where: { active: true }, required: false }]
    });

    if (!currentWeek) {
      return res.json({ weekStartDate: null, weekEndDate: null, songs: [] });
    }

    res.json({
      weekStartDate: currentWeek.weekStartDate,
      weekEndDate: currentWeek.weekEndDate,
      songs: currentWeek.songs
    });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) return res.status(404).json({ message: 'Canción no encontrada' });
    res.json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// Admin: CRUD completo
exports.getAll = async (req, res) => {
  try {
    const songs = await Song.findAll({ order: [['createdAt', 'DESC']] });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const song = await Song.create(req.body);
    res.status(201).json(song);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear canción', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) return res.status(404).json({ message: 'Canción no encontrada' });
    await song.update(req.body);
    res.json(song);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar canción', error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const song = await Song.findByPk(req.params.id);
    if (!song) return res.status(404).json({ message: 'Canción no encontrada' });
    await song.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};