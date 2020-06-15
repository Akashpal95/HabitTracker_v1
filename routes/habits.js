const express = require('express');
const router = express.Router();

const habitsController = require('../controllers/habits_controller');

router.post('/create', habitsController.create);
router.get('/weekview', habitsController.display);
router.post('/update', habitsController.update);
router.get('/delete/:id', habitsController.delete);

module.exports = router;