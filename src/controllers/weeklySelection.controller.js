const { WeeklySelection, Song } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const weeks = await WeeklySelection.findAll({
      include: [{ model: Song, as: 'songs' }],
      order: [['weekStartDate', 'DESC']]
    });
    res.json(weeks);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { weekStartDate, weekEndDate, songIds } = req.body;

    if (!songIds || songIds.length < 3 || songIds.length > 4) {
      return res.status(400).json({ message: 'Debes seleccionar entre 3 y 4 canciones' });
    }

    const week = await WeeklySelection.create({ weekStartDate, weekEndDate });
    await week.setSongs(songIds);

    const weekWithSongs = await WeeklySelection.findByPk(week.id, {
      include: [{ model: Song, as: 'songs' }]
    });
    res.status(201).json(weekWithSongs);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear semana', error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { songIds, weekStartDate, weekEndDate } = req.body;
    const week = await WeeklySelection.findByPk(req.params.id);
    if (!week) return res.status(404).json({ message: 'Semana no encontrada' });

    if (weekStartDate || weekEndDate) {
      await week.update({
        weekStartDate: weekStartDate || week.weekStartDate,
        weekEndDate: weekEndDate || week.weekEndDate
      });
    }

    if (songIds) {
      await week.setSongs(songIds);
    }

    const updatedWeek = await WeeklySelection.findByPk(week.id, {
      include: [{ model: Song, as: 'songs' }]
    });
    res.json(updatedWeek);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar semana', error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const week = await WeeklySelection.findByPk(req.params.id);
    if (!week) return res.status(404).json({ message: 'Semana no encontrada' });
    await week.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};