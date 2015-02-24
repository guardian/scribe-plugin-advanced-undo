var helpers = require('scribe-test-harness/helpers');
var initializeScribe = helpers.initializeScribe.bind(null, 'scribe', { undo: { enabled: false} });
var loadPlugin = require('./integration/helpers/load-plugin.js');

beforeEach(function(){
  return initializeScribe();
});

beforeEach(function(){
  return loadPlugin();
});
