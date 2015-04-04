var React = require('react');
var Fluxxor = require('fluxxor');

var Todo = require('./Todo');

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
    var todos = this.state.todos.map(function(todo) {
      return <Todo {...todo} key={todo.id} />
    });

    return (
      <div className="todos">
        <a href="javascript:void(0)" className="button">Create a reminder!</a>
        {todos}
      </div>
    );
  }
});

module.exports = Todos;
