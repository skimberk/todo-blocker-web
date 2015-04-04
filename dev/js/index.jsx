require('es6-promise').polyfill();

var React = require('react');
var Fluxxor = require('fluxxor');

var Application = require('./components/Application');

var actions = require('./actions');
var ApplicationStore = require('./stores/ApplicationStore');

var stores = {
  ApplicationStore: new ApplicationStore()
};

var flux = new Fluxxor.Flux(stores, actions.methods);
flux.on('dispatch', function(type, payload) {
  console.log('Dispatch:', type, payload);
});

React.render(
  <Application flux={flux} />,
  document.getElementById('application')
);
