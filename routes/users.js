'use strict'

const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.get('/', userController.returnUserProfile);

router.get('/greetings', userController.returnPersonalGreetings);

router.get('/news', userController.returnNews);

router.get('/stocks', userController.returnStocks);

router.get('/weather', userController.returnWeatherData);


module.exports = router;
