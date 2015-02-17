var helpers = require('scribe-test-harness/helpers');
var initializeScribe = helpers.initializeScribe.bind(null, '../../bower_components/scribe/src/scribe');
var loadPlugin = require('./integration/helpers/load-plugin.js');

before(function(){

});

beforeEach(function(){
  loadPlugin();
  return initializeScribe();
});
