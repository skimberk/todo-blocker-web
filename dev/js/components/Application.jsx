var React = require('react');
var Fluxxor = require('fluxxor');

var Login = require('./Login');
var Register = require('./Register');

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
      content = 'Logged in as: ' + this.state.user.username + '.';
    }
    else {
      content = (
        <div>
          <Login />
          <Register />
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
