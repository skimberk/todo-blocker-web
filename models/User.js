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

todoScheme.methods.isActive = function() {
  var now = new Date();

  if(this.recurring) {
    now = new Date(1970, 0, 1, now.getHours(), now.getMinutes(), now.getSeconds());
  }

  console.log('Start', this.startTime);
  console.log('Now', new Date());
  console.log('End', this.endTime);

  return now > this.startTime && now < this.endTime;
};

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
