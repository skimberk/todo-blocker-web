var constants = {
  CREATE_USER: 'CREATE_USER',
  LOGIN_USER: 'LOGIN_USER',
  LOGOUT_USER: 'LOGOUT_USER'
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
  }
};

module.exports = {
  constants: constants,
  methods: methods
};
