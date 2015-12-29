const DATA = require('./data_day12');

const TEST_DATA = [
  {
    obj: [1, 2, 3],
    expected: 6
  },
  {
    obj: [[[3]]],
    expected: 3
  },
  {
    obj: {
      a: [-1, 2],
    },
    expected: 1
  }
];

const numSum = obj => {
  switch (typeof(obj)) {
  case 'number': return obj;

  case 'object':
    // array
    if (obj.length) {
      return sumArray(obj);
    }

    if (Object.values(obj).indexOf('red') === -1) {
      return numSum(Object.values(obj));
    }
    return 0;
  case 'string':
    return 0;

  default:
    throw new Error('unexpected: ' + typeof(obj));
  }

};

const sumArray = rg => {
  return rg.reduce((prev, cur) => prev + numSum(cur), 0);
};

assert(sumArray([1,2,3]) === 6);

TEST_DATA.forEach((item, index)  => {
  assert(numSum(item.obj) === item.expected, index);
});

console.log(numSum(DATA));
