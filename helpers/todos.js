const Todo = require('../models/todo');

exports.getTodos = (req, res) => {
    Todo.find().then((todos) => {
        res.json(todos);
    }).catch(err => {
        console.log(err);
    })
}

exports.getTodo = (req, res) => {
    Todo.findById(req.params.todoId).then(foundTodo => {
        res.json(foundTodo);
    }).catch(err => {
        console.log(err);
    });
}

exports.createTodo = (req, res) => {
    Todo.create(req.body).then( newTodo => {
        res.status(201).json(newTodo);
    }).catch(err => {
        console.log(err);
    });
}

exports.updateTodo = (req, res) => {
    Todo.findOneAndUpdate({ _id: req.params.todoId}, req.body, {new: true})
        .then(updateTodo => {
            res.json(updateTodo);
        }).catch(err => {
        console.log(err);
    });
}

exports.deleteTodo = (req, res) => {
    Todo.findByIdAndDelete({ _id: req.params.todoId})
        .then(() => {
            res.json({ message: 'We delete it!'})
        }).catch(err => {
        console.log(err);
    });
}

module.exports = exports;