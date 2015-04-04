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
      return res.json(400, {
        error: err.toString()
      });
    }

    res.json({
      success: true
    });
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Todo blocker listening at http://localhost:%s', port);
});
