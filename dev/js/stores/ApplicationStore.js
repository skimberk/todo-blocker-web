var Fluxxor = require('fluxxor');
var cookie = require('cookie');

var actions = require('../actions');

var userUtils = require('../utils/userUtils');
var todoUtils = require('../utils/todoUtils');

var ApplicationStore = Fluxxor.createStore({
  initialize: function() {
    this.user;
    this.todos = [];

    var cookies = cookie.parse(document.cookie);

    if(cookies.token) {
      this.loginUserFromToken(cookies.token);
    }

    this.bindActions(
      actions.constants.CREATE_USER, this.createUser,
      actions.constants.LOGIN_USER, this.loginUser,
      actions.constants.LOGOUT_USER, this.logoutUser
    );
  },

  getData: function() {
    return {
      loggedIn: !!this.user,
      user: this.user,
      todos: this.todos
    };
  },

  createUser: function(options) {
    userUtils.createUser(options.username, options.password).then(function(user) {
      this.setUser(user);
    }.bind(this)).catch(function(err) {
      alert(err.toString());
    });
  },

  loginUser: function(options) {
    userUtils.getUser(options.username, options.password).then(function(user) {
      this.setUser(user);
    }.bind(this)).catch(function(err) {
      alert(err.toString());
    });
  },

  loginUserFromToken: function(token) {
    userUtils.getUserWithToken(token).then(function(user) {
      this.setUser(user);
    }.bind(this)).catch(function(err) {
      alert(err.toString());
    });
  },

  setUser: function(user) {
    this.user = user;

    var expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    document.cookie = cookie.serialize('token', user.token, {
      expires: expires
    });

    this.getTodos();

    this.emit('change');
  },

  logoutUser: function() {
    this.user = null;
    this.todos = [];

    var expires = new Date(Date.now() - 24 * 60 * 60 * 1000);

    document.cookie = cookie.serialize('token', '', {
      expires: expires
    });

    this.emit('change');
  },

  getTodos: function() {
    todoUtils.getTodos(this.user.token).then(function(todos) {
      this.todos = todos.map(function(todo) {
        return {
          id: todo.id,
          reason: todo.reason,
          startTime: new Date(todo.startTime),
          endTime: new Date(todo.endTime),
          recurring: todo.recurring,
          whitelist: todo.whitelist,
          urls: todo.urls
        };
      });

      console.log(this.todos);

      this.emit('change');
    }.bind(this)).catch(function(err) {
      alert(err.toString());
    });
  }
});

module.exports = ApplicationStore;
