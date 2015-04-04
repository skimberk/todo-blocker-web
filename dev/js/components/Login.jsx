var React = require('react');
var Fluxxor = require('fluxxor');

var Login = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React)
  ],

  submitHandler: function(e) {
    e.preventDefault();

    this.getFlux().actions.loginUser({
      username: React.findDOMNode(this.refs.username).value,
      password: React.findDOMNode(this.refs.password).value,
    });
  },

  render: function() {
    return (
      <form action="javascript:void(0)" onSubmit={this.submitHandler}>
        <h2>Login</h2>

        <input type="text" ref="username" placeholder="Username" />
        <input type="password" ref="password" placeholder="Password" />
        <input type="submit" value="Login" />
      </form>
    );
  }
});

module.exports = Login;
