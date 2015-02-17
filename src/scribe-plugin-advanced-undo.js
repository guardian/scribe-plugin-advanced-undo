module.exports = function(config) {

  return function(scribe) {
    console.log('-----------------------');
    console.log('THIS IS WOKRING');
    console.log('-----------------------');
    throw 'pause';
  };

};
