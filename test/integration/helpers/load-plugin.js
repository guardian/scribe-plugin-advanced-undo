var helpers = require('scribe-test-harness/helpers');
var driver;

before(function(){
  driver = helpers.driver;
});

module.exports = function loadPlugin() {
  return driver.executeAsyncScript(function (done) {
    require(['scribe', '../../../build/main'], function (Scribe, plugin) {
      var scribe = window.scribe = new Scribe(document.querySelector('.scribe'), {
        undo: { enabled: false }
      });
      scribe.use(plugin());
      done();
    });
  });
};
