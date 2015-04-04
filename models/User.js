var mongoose = require('mongoose');

var todoScheme = mongoose.Schema({
  reason: {
    type: String,
    required: true
  },
  startTime: Date,
  endTime: Date,
  activated: Boolean
});

var userScheme = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  todos: [todoScheme]
});

module.exports = mongoose.model('User', userScheme);
