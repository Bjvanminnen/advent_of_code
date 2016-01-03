global.assert = function (condition, message) {
  if (!condition) {
    console.error('FAILED: ' + message, (new Error()).stack);
  }
}

//http://stackoverflow.com/a/9960925/2506748
var permArr = [],
  usedChars = [];
function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr;
};
global.permute = permute;

require('./day19');
