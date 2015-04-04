var constants = {
  CREATE_USER: 'CREATE_USER',
  LOGIN_USER: 'LOGIN_USER'
};

var methods = {
  createUser: function(options) {
    this.dispatch(constants.CREATE_USER, options);
  },
  loginUser: function(options) {
    this.dispatch(constants.LOGIN_USER, options);
  }
};

module.exports = {
  constants: constants,
  methods: methods
};
