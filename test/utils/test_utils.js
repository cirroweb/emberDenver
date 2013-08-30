/* jshint camelcase: false */
require('test/utils/test_setup');

var TestUtils = window.TestUtils = {};

TestUtils.exists = function(selector) {
  return !!find(selector).length;
};

TestUtils.lookupStore = function() {
  return App.__container__.lookup('store:main');
};

TestUtils.lookupRouter = function() {
  return App.__container__.lookup('router:main');
};

TestUtils.lookupRouteNames = function() {
  return App.Router.router.recognizer.names;
};

TestUtils.lookupTemplateNames = function() {
  return Ember.keys(Ember.TEMPLATES);
};

TestUtils.lookupController = function(controllerName, options) {
  return App.__container__.lookup('controller:' + controllerName, options);
};

TestUtils.lookupView = function(viewName, options) {
  return App.__container__.lookup('view:' + viewName, options);
};

TestUtils.clearApp = function() {
  $( App.rootElement ).html('');
};

TestUtils.appendView = function(view) {
  Ember.run(function() {
    view.appendTo(App.rootElement);
  });
};

TestUtils.removeView = function(view) {
  Ember.run(function() {
    view.remove();
  });
};

// 2nd layer test utils

TestUtils.createTemplateView = function(templateName) {
  App.TESTView = Ember.View.extend({ templateName: templateName });
  var view = TestUtils.lookupView('TEST');
  TestUtils.appendView(view);
  return view;
};

TestUtils.getCurrentRoutePath = function() {
  return TestUtils.lookupController('application').get('currentPath');
};