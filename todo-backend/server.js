var app = require('express')(),
    bodyParser = require('body-parser'),
    backend = require('./backend');

// ----- Parse JSON requests

app.use(bodyParser.json());

// ----- Allow CORS

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// ----- The API implementation

var todos = backend();

function createCallback(res, onSuccess) {
  return function callback(err, data) {
    if (err) {
      res.send(500, 'Something bad happened!');
      return;
    }

    onSuccess(data);
  }
}

function createTodo(req, data) {
  return {
    title: data.title,
    order: data.order,
    completed: data.completed || false,
    url: req.protocol + '://' + req.get('host') + '/' + data.id
  };
}

function getCreateTodo(req) {
  return function(data) {
    return createTodo(req, data);
  };
}

app.get('/', function(req, res) {
  todos.all(createCallback(res, function(todos) {
    console.log(todos)
    res.status(200).send(todos);
  }));
});

app.get('/:id', function(req, res) {
  todos.get(req.params.id, createCallback(res, function(todo) {
    res.status(200).send(createTodo(req, todo));
  }));
});

app.post('/', function(req, res) {
  console.log(req.body, req.url, req.params)
  todos.create(req.body.title, req.body.order, createCallback(res, function(todo) {
   // console.log(res)
    res.status(200).send("Data inserted Sucessfully !!!");
  }));
});

app.patch('/:id', function(req, res) {
  console.log(req.body)
  todos.update(req.params.id, req.body, createCallback(res, function(todo) {
    res.status(200).send("Data updated Sucessfully !!!");
  }));
});

app.delete('/', function(req, res) {
  todos.clear(createCallback(res, function(todos) {
    res.send(todos.map(getCreateTodo(req)));
  }));
});

app.delete('/:id', function(req, res) {
  todos.delete(req.params.id, createCallback(res, function(todo) {
    res.status(200).send('Todo task deleted !')
  }));
});

app.listen(Number(process.env.PORT || 5000), () => {
  console.log(`Server started on http://localhost:5000`);
});

// app.listen(Number(process.env.PORT || 5000));
