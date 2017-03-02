'use strict'

const _ = require('lodash');

const config = require('../config');

var todos = config.getTodos();


const createTodo = (req, res) => {
  const newTodo = {};

  newTodo.text = req.body.text.toString().trim();
  newTodo.status = req.body.status.toString().trim();

  todos.push(newTodo);
  res.json(todos);
};


const deleteTodo = (req, res) => {
  const index = req.params.id;

  todos.splice(index, 1); // remove todo at passed index

  res.json(todos);
};


const getTodos = (req, res) => {
  res.json(todos)
};


const updateTodo = (req, res) => {

  const index = req.params.id;
  const newTodo = {};

  if (parseInt(index) > (todos.length - 1) ) {
    return res.status(400).end("Invalid ID. Out of bounds");
  }

  newTodo.text = req.body.text.toString().trim();
  newTodo.status = req.body.status.toString().trim();

  todos[index] = newTodo;

  res.json(todos);
};


module.exports = {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo
}
