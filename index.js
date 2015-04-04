var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var bcrypt = require('bcrypt');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var BearerStrategy = require('passport-http-bearer').Strategy;

var User = require('./models/User');

mongoose.connect('mongodb://localhost/todo-blocker');

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

passport.use(new BearerStrategy(function(token, done) {
  User.findOne({token: token}, function(err, user) {
    if(err) {
      return done(err);
    }
    if(!user) {
      return done(null, null);
    }

    return done(null, user);
  });
}));

var authenticate = passport.authenticate('bearer', {
  session: false
});

app.post('/create-user', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  var passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  var user = new User({
    username: username,
    password: passwordHash,
    token: uuid.v4()
  });

  user.save(function(err) {
    if(err) {
      return res.status(400).json({
        error: err.toString()
      });
    }

    return res.json({
      username: user.username,
      token: user.token
    });
  });
});

app.post('/get-user', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function(err, user) {
    if(err) {
      return res.status(400).json({
        error: err.toString()
      });
    }
    if(!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        error: 'Either username or password is incorrect.'
      });
    }

    return res.json({
      username: user.username,
      token: user.token
    });
  });
});

app.post('/create-todo', authenticate, function(req, res) {
  var user = req.user;

  user.todos.push({
    reason: req.body.reason,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    recurring: req.body.recurring,
    whitelist: req.body.whitelist,
    urls: req.body.urls
  });

  user.save(function(err) {
    if(err) {
      return res.status(400).json({
        error: err.toString()
      });
    }

    res.json({
      success: true
    });
  });
});

app.get('/get-todos', authenticate, function(req, res) {
  var todos = [];

  req.user.todos.forEach(function(todo) {
    todos.push({
      id: todo.id,
      reason: todo.reason,
      startTime: todo.startTime,
      endTime: todo.endTime,
      recurring: todo.recurring,
      whitelist: todo.whitelist,
      urls: todo.urls
    });
  });

  res.json(todos);
});

var server = app.listen(process.env.NODE_ENV === 'production' ? 80 : 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Todo blocker listening at http://localhost:%s', port);
});
