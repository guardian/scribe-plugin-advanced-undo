var webdriver = require('selenium-webdriver');
var helpers = require('scribe-test-harness/helpers');
var scribeNode;

beforeEach(function(){
  scribeNode = helpers.scribeNode;
});

module.exports = function undo() {
  return scribeNode.sendKeys(webdriver.Key.chord(webdriver.Key.META, 'z'));
};
