const express = require('express');
const router = express.Router();
const songController = require('../controllers/song.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/current-week', songController.getCurrentWeekSongs);
router.get('/:id', songController.getById);

router.get('/', authMiddleware, songController.getAll);
router.post('/', authMiddleware, songController.create);
router.put('/:id', authMiddleware, songController.update);
router.delete('/:id', authMiddleware, songController.remove);

module.exports = router;