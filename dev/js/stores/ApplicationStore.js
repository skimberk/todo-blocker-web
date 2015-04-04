var Fluxxor = require('fluxxor');

var actions = require('../actions');

var userUtils = require('../utils/userUtils');
var todoUtils = require('../utils/todoUtils');

var ApplicationStore = Fluxxor.createStore({
  initialize: function() {
    this.user;
    this.todos = [];

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
      this.user = user;

      this.getTodos();

      this.emit('change');
    }.bind(this)).catch(function(err) {
      alert(err.toString());
    });
  },

  loginUser: function(options) {
    userUtils.getUser(options.username, options.password).then(function(user) {
      this.user = user;

      this.getTodos();

      this.emit('change');
    }.bind(this)).catch(function(err) {
      alert(err.toString());
    });
  },

  logoutUser: function() {
    this.user = null;
    this.todos = [];

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
