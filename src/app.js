const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const songRoutes = require('./routes/song.routes');
const weeklySelectionRoutes = require('./routes/weeklySelection.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/weekly-selection', weeklySelectionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API de Letras de Canciones funcionando' });
});

module.exports = app;