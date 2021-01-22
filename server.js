const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000

const todoRoutes = require('./routes/todos');

/* this function must inside /models/index.js */
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = Promise;
/* ___________________________________________________________ */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.use('/api/todos', todoRoutes);

app.listen( PORT, function () {
    console.log('Todo API server strategy is success ' + PORT);
});