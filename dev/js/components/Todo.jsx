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
    var startTime;
    var endTime;

    if(this.props.recurring) {
      startTime = moment(this.props.startTime).format('h:mm A');
      endTime = moment(this.props.endTime).format('h:mm A');
    }
    else {
      startTime = moment(this.props.startTime).calendar();
      endTime = moment(this.props.endTime).calendar();
    }

    return (
      <div className={'todo ' + (this.props.active ? 'active' : '')}>
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
