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

// console.log(numWaysToMakeSum(25, [20, 15, 10, 5, 5]));
console.log(numWaysToMakeSum(150, DATA));
