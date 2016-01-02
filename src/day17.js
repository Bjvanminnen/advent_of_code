const DATA = [
  50,
  44,
  11,
  49,
  42,
  46,
  18,
  32,
  26,
  40,
  21,
  7,
  18,
  43,
  10,
  47,
  36,
  24,
  22,
  40
];

const INFO = DATA.sort((a, b) => a - b).reverse();
console.log(INFO);

const numWaysToMakeSum = (sum, vals) => {
  if (sum === 0) {
    return 1;
  }

  let total = 0;
  vals.forEach((val, index) => {
    if (val > sum) {
      return;
    }
    total += numWaysToMakeSum(sum - val, vals.slice(index + 1));
  });


  return total;
};

const waysToMakeSum = (sum, vals, prefix) => {
  // console.log('wtms: ', sum, vals, prefix);
  let ways = [];
  if (sum === 0) {
    // console.log('  ', prefix);
    return [prefix];
  }

  let total = 0;
  vals.forEach((val, index) => {
    if (val > sum) {
      return;
    }
    let newWays = waysToMakeSum(sum - val, vals.slice(index + 1), [...prefix, val]);
    ways = ways.concat(newWays);
  });

  // console.log('  ', ways);
  return ways;
};

console.log('----');

// console.log(numWaysToMakeSum(25, [20, 15, 10, 5, 5]));
// console.log(numWaysToMakeSum(150, DATA));
// console.log(waysToMakeSum(25, [20, 15, 10, 5, 5], []));
const allWays = waysToMakeSum(150, DATA, []);

const minSize = Math.min(...allWays.map(way => way.length));

const minWays = allWays.filter(way => way.length === minSize);

// const toStr = way => way.join(',');

// const deDupped = {};
// minWays.forEach(way => {
//   deDupped[toStr(way)] = true;
// });

// console.log(Object.keys(deDupped).length);
console.log(minWays.length);
