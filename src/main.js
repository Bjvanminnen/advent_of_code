global.assert = function (condition, message) {
  if (!condition) {
    console.error('FAILED: ' + message, (new Error()).stack);
  }
}

require('./day15');
