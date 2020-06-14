const express = require('express');
const router = express.Router();

//Add controller
const homeController = require('../controllers/home_controller');

router.use(express.urlencoded());

console.log('Router Loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/habits', require('./habits'));

module.exports = router;