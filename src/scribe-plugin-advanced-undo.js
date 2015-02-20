var UndoController = require('./UndoController');

module.exports = function(config) {

  return function(scribe, attrs) {
    return new UndoController(scribe, attrs);
  };

};
