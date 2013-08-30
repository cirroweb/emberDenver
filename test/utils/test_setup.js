/* jshint evil: true, unused: false */
/* global console */

// Add preview for testing in the bottom right of the window
document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
document.write('<style>#ember-testing-container { position: absolute; background: white; bottom: 0; right: 0; width: 640px; height: 384px; overflow: auto; z-index: 9999; border: 1px solid #ccc; } #ember-testing { zoom: 50%; }</style>');

// Testing boilerplate
App.rootElement = '#ember-testing';
App.setupForTesting();
App.injectTestHelpers();

// Runs before all tests
QUnit.begin(function() {
  console.log('\n');
  App.LOG_TRANSITIONS = false;
  App.LOG_ACTIVE_GENERATION = false;
  App.LOG_VIEW_LOOKUPS = false;
});

// Runs before all modules
QUnit.moduleStart(function(details) {
  console.log(details.name + ' tests');
});

// Run before each test case
QUnit.testStart(function() {
  Ember.run(App, App.advanceReadiness);
});

// Run after each test case
QUnit.testDone(function() {
  App.reset();
});

// Runs after all modules
QUnit.moduleDone(function() {
  console.log('\n');
});

// First test to simply run the app for errors
module('App');

test('the app loads without errors', function() {
  ok(true);
});