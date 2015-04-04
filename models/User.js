var mongoose = require('mongoose');

var todoScheme = mongoose.Schema({
  reason: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  recurring: {
    type: Boolean,
    required: true
  },
  whitelist: {
    type: Boolean,
    required: true
  },
  urls: [String]
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
