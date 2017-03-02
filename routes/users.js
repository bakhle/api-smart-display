'use strict'

const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todos');
const userController = require('../controllers/users');

// middleware to allow CORS
router.use(function(req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];
  var origin = req.headers.origin;

  if(allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

router.get('/', userController.returnUserProfile);

router.get('/greetings', userController.returnPersonalGreetings);

router.get('/news', userController.returnNews);

router.get('/stocks', userController.returnStocks);

router.get('/todos', todoController.getTodos);
router.post('/todos', todoController.createTodo);
router.post('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);


router.get('/weather', userController.returnWeatherData);


module.exports = router;
