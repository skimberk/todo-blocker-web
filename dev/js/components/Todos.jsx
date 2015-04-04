var React = require('react');
var Fluxxor = require('fluxxor');
var Modal = require('react-modal');

var dateUtils = require('../utils/dateUtils');

var Todo = require('./Todo');

var Todos = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('ApplicationStore')
  ],

  getInitialState: function() {
    return {
      creatorOpen: false,
      creatorRecurring: true,
      creatorWhitelist: true
    };
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();

    return flux.store('ApplicationStore').getData();
  },

  creatorCloseHandler: function() {
    this.setState({
      creatorOpen: false,
      creatorRecurring: true,
      creatorWhitelist: true
    });
  },

  creatorSubmitHandler: function() {
    var reason = React.findDOMNode(this.refs.reason).value;
    var recurring = React.findDOMNode(this.refs.recurring).checked;

    var startTime;
    var endTime;

    if(recurring) {
      startTime = dateUtils.fixInput(React.findDOMNode(this.refs['startTime-time']).valueAsDate);
      endTime = dateUtils.fixInput(React.findDOMNode(this.refs['endTime-time']).valueAsDate);
    }
    else {
      var time = dateUtils.fixInput(React.findDOMNode(this.refs['startTime-time']).valueAsDate);
      var date = dateUtils.fixInput(React.findDOMNode(this.refs['startTime-date']).valueAsDate);
      startTime = dateUtils.mergeDateAndTime(date, time);

      var time = dateUtils.fixInput(React.findDOMNode(this.refs['endTime-time']).valueAsDate);
      var date = dateUtils.fixInput(React.findDOMNode(this.refs['endTime-date']).valueAsDate);
      endTime = dateUtils.mergeDateAndTime(date, time);
    }

    var whitelist = React.findDOMNode(this.refs.whitelist).checked;
    var urls = React.findDOMNode(this.refs.urls).value.split("\n");

    this.getFlux().actions.createTodo({
      reason: reason,
      recurring: recurring,
      startTime: startTime,
      endTime: endTime,
      whitelist: whitelist,
      urls: urls
    });

    this.creatorCloseHandler();
  },

  createHandler: function() {
    this.setState({
      creatorOpen: true
    });
  },

  creatorRecurringHandler: function(e) {
    this.setState({
      creatorRecurring: e.target.checked
    });
  },

  creatorWhitelistHandler: function(e) {
    this.setState({
      creatorWhitelist: e.target.value === 'true'
    });
  },

  render: function() {
    var todos = this.state.todos.map(function(todo) {
      return <Todo {...todo} key={todo.id} />
    });

    return (
      <div className="todos">
        <Modal isOpen={this.state.creatorOpen} onRequestClose={this.creatorCloseHandler}>
          <form action="javascript:void(0)" onSubmit={this.creatorSubmitHandler}>
            <h2>Create reminder</h2>
            <div className="field">
              <label htmlFor="creator-reason">Reason</label>
              <textarea id="creator-reason" ref="reason" required />
            </div>

            <div className="field">
              <label>
                <input type="checkbox" ref="recurring" className="partial" checked={this.state.creatorRecurring} onChange={this.creatorRecurringHandler} />
                Recurring reminder
              </label>
            </div>

            <div className="field">
              <label htmlFor="creator-startTime">Start time</label>
              <div>
                <input type="time" id="creator-startTime" ref="startTime-time" className="partial" required />
                {(this.state.creatorRecurring ? '' : <input type="date" ref="startTime-date" className="partial" required />)}
              </div>
            </div>

            <div className="field">
              <label htmlFor="creator-endTime">End time</label>
              <div>
                <input type="time" id="creator-endTime" ref="endTime-time" className="partial" required />
                {(this.state.creatorRecurring ? '' : <input type="date" ref="endTime-date" className="partial" required />)}
              </div>
            </div>

            <div className="field">
              <label>
                <input type="radio" className="partial" name="whitelist" ref="whitelist" value="true" checked={this.state.creatorWhitelist} onChange={this.creatorWhitelistHandler} />
                Block all except...
              </label>
              <label>
                <input type="radio" className="partial" name="whitelist" value="false" checked={!this.state.creatorWhitelist} onChange={this.creatorWhitelistHandler} />
                Allow all except...
              </label>
            </div>

            <div className="field">
              <label htmlFor="creator-urls">{this.state.creatorWhitelist ? 'Allowed' : 'Blocked'} URLs (on separate lines)</label>
              <textarea id="creator-urls" ref="urls" placeholder="Ex: facebook.com" />
            </div>

            <input type="submit" value="Create" />
          </form>
        </Modal>

        <a href="javascript:void(0)" className="button" onClick={this.createHandler}>Create a reminder!</a>
        {todos}
      </div>
    );
  }
});

module.exports = Todos;
