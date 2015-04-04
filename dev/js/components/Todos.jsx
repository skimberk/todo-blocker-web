var React = require('react');
var Fluxxor = require('fluxxor');
var Modal = require('react-modal');

var Todo = require('./Todo');

var Todos = React.createClass({
  mixins: [
    Fluxxor.FluxMixin(React),
    Fluxxor.StoreWatchMixin('ApplicationStore')
  ],

  getInitialState: function() {
    return {
      creatorOpen: false
    };
  },

  getStateFromFlux: function() {
    var flux = this.getFlux();

    return flux.store('ApplicationStore').getData();
  },

  creatorCloseHandler: function() {
    this.setState({
      creatorOpen: false
    });
  },

  createHandler: function() {
    this.setState({
      creatorOpen: true
    });
  },

  render: function() {
    var todos = this.state.todos.map(function(todo) {
      return <Todo {...todo} key={todo.id} />
    });

    return (
      <div className="todos">
        <Modal isOpen={this.state.creatorOpen} onRequestClose={this.creatorCloseHandler}></Modal>

        <a href="javascript:void(0)" className="button" onClick={this.createHandler}>Create a reminder!</a>
        {todos}
      </div>
    );
  }
});

module.exports = Todos;
