// src/routes/weeklySelection.routes.js
const express = require('express');
const router = express.Router();
const weeklyController = require('../controllers/weeklySelection.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, weeklyController.getAll);
router.post('/', authMiddleware, weeklyController.create);
router.put('/:id', authMiddleware, weeklyController.update);
router.delete('/:id', authMiddleware, weeklyController.remove);

module.exports = router;