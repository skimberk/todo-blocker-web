var constants = {
  CREATE_USER: 'CREATE_USER',
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER',
  CREATE_TODO: 'CREATE_TODO'
};

var methods = {
  createUser: function(options) {
    this.dispatch(constants.CREATE_USER, options);
  },
  loginUser: function(options) {
    this.dispatch(constants.LOGIN_USER, options);
  },
  logoutUser: function() {
    this.dispatch(constants.LOGOUT_USER);
  },
  createTodo: function(options) {
    this.dispatch(constants.CREATE_TODO, options);
  }
};

module.exports = {
  constants: constants,
  methods: methods
};
