var helpers = require('scribe-test-harness/helpers');
var driver;

before(function(){
  driver = helpers.driver;
})

module.exports = function loadPlugin() {
  return driver.executeAsyncScript(function (done) {
    require(['../../build/main.build'], function (scribePluginAdvancedUndo) {
      window.scribe.use(scribePluginAdvanceUndo({

      }));
      done();
    });
  });
}

