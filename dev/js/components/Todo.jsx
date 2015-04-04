var React = require('react');
var Fluxxor = require('fluxxor');
var moment = require('moment');

var Todos = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('ApplicationStore')
  ],

  getStateFromFlux: function() {
    var flux = this.getFlux();

    return flux.store('ApplicationStore').getData();
  },

  render: function() {
    var dateFormat;

    if(this.props.recurring) {
      dateFormat = 'h:m A';
    }
    else {
      dateFormat = 'h:m A MMMM Do, YYYY';
    }

    var startTime = moment(this.props.startTime).format(dateFormat);
    var endTime = moment(this.props.endTime).format(dateFormat);

    return (
      <div className="todo">
        <div>
          <span className="reason">{this.props.reason}</span>
        </div>
        <div>
          <span className="time">Active from {startTime} until {endTime}.</span>
        </div>
      </div>
    );
  }
});

module.exports = Todos;
