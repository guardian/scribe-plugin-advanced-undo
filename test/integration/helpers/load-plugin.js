var helpers = require('scribe-test-harness/helpers');
var driver;

before(function(){
  driver = helpers.driver;
});

module.exports = function loadPlugin() {
  return driver.executeAsyncScript(function (done) {
    require(['scribe', '../../../build/main'], function (Scribe, plugin) {
      window.scribe.use(plugin());
      done();
    });
  });
};
