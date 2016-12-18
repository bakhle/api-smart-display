'use strict'

const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.get('/', userController.returnUserProfile);

router.get('/greetings', userController.returnPersonalGreetings);

router.get('/stocks', userController.returnStocks);

router.get('/news', userController.returnNews);


module.exports = router;
