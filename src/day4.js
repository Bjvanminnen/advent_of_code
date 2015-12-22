var md5 = require('blueimp-md5');

const INPUT = 'bgvyzdsv';
// const INPUT = 'abcdef';

let num = 1;
while(true) {
  let result = md5(INPUT + num);
  if (/^000000/.test(result)) {
    console.log(num);
    console.log(result);
    break;
  }
  num++;
}
