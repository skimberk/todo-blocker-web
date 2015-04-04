var Fluxxor = require('fluxxor');

var actions = require('../actions');

var userUtils = require('../utils/userUtils');

var ApplicationStore = Fluxxor.createStore({
  initialize: function() {
    this.user;

    this.bindActions(
      actions.constants.CREATE_USER, this.createUser,
      actions.constants.LOGIN_USER, this.loginUser
    );
  },

  getData: function() {
    return {
      loggedIn: !!this.user,
      user: this.user
    };
  },

  createUser: function(options) {
    userUtils.createUser(options.username, options.password).then(function(user) {
      this.user = user;

      this.emit('change');
    }.bind(this));
  },

  loginUser: function(options) {
    userUtils.getUser(options.username, options.password).then(function(user) {
      this.user = user;

      this.emit('change');
    }.bind(this));
  }
});

module.exports = ApplicationStore;
