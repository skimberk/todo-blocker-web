var React = require('react');
var Fluxxor = require('fluxxor');

var Login = require('./Login');
var Register = require('./Register');
var Todos = require('./Todos');

var Application = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('ApplicationStore')
  ],

  getStateFromFlux: function() {
    var flux = this.getFlux();

    return flux.store('ApplicationStore').getData();
  },

  render: function() {
    var content;

    if(this.state.loggedIn) {
      content = (
        <div>
          <p>Hello {this.state.user.username}! <a href="javascript:void(0)" onClick={this.getFlux().actions.logoutUser}>Logout</a></p>
          <Todos />
        </div>
      );
    }
    else {
      content = (
        <div>
          <div className="info">
            <h1>Procastinate Away</h1>
            <p>This is an application which you can use to block distracting website at predefined times. It functions with the assistance of a browser extension, which does the actual blocking.</p>
          </div>
          <div className="auth">
            <Login />
            <Register />
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        {content}
      </div>
    );
  }
});

module.exports = Application;
