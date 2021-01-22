const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');
const helpers = require('../helpers/todos');

router.route('/')
    .get(helpers.getTodos)
    .post(helpers.createTodo);

router.route('/:todoId')
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo);

module.exports = router;

/*
    Small different:
    old =>
        const Todo = require('../models/todo');
        inside get or post =>
            Todo.find().then(() => { blah blah })
    new =>
        const db = require('../models');
        inside get or post =>
            db.Todo.find().then(() => { blah blah })
 */