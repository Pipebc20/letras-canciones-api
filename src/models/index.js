const Song = require('./song');
const WeeklySelection = require('./WeeklySelection');
const Admin = require('./admin');

WeeklySelection.belongsToMany(Song, { through: 'weekly_selection_songs', as: 'songs' });
Song.belongsToMany(WeeklySelection, { through: 'weekly_selection_songs', as: 'weeklySelections' });

module.exports = { Song, WeeklySelection, Admin };