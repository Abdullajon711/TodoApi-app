$(document).ready(() => {
    $.getJSON("/api/todos")
        .then((data) => {
            addTodos(data)
        });
    $('#todoInput').keypress(event => {
        if (event.which === 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'li', function(e) {
        updateTodo($(this));
    });

    $('.list').on('click', 'span', function(e) {
        e.stopPropagation();
        removeTodo($(this));
    });
});

function addTodos(todos) {
    todos.forEach(todo => {
        addTodo(todo);
    });
}

function addTodo(todo) {
    let newTodo =$("<li class='task'>" + todo.name +"<span>x</span></li>")
    newTodo.data('id', todo._id)
    newTodo.data('completed', todo.completed);
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $('.list').append(newTodo);
}

function createTodo() {
    let usrInput = $('#todoInput').val();
    $.post('/api/todos', { name: usrInput })
        .then(newTodo => {
            $('#todoInput').val('')
            addTodo(newTodo)
        });
}

function removeTodo(todo) {
    let deleteUrl = `/api/todos/${todo.parent().data('id')}`;
    todo.parent().remove();
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    }).then(data => {
        data.remove();
    });
}

function updateTodo(todo){
    let updateUrl = `/api/todos/${todo.data('id')}`;
    let isDone = !todo.data('completed');
    let updateData = { completed: isDone}
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data:updateData
    }).then((e) => {
        todo.toggleClass('done');
        todo.data('complete', !todo.data('completed'))
    });
}