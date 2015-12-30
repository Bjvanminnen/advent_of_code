const DATA = [
  'Frosting: capacity 4, durability -2, flavor 0, texture 0, calories 5',
  'Candy: capacity 0, durability 5, flavor -1, texture 0, calories 8',
  'Butterscotch: capacity -1, durability 0, flavor 5, texture 0, calories 6',
  'Sugar: capacity 0, durability 0, flavor -2, texture 2, calories 1'
];

// const DATA = [
//   'Butterscotch: capacity -1, durability -2, flavor 6, texture 3, calories 8',
//   'Cinnamon: capacity 2, durability 3, flavor -2, texture -1, calories 3'
// ];

const parseLine = (line) => {
  const [ingredient, other] = line.split(':');
  const [_, _, capacity, _, durability, _, flavor, _, texture, _, calories] = other.split(' ');

  return {
    ingredient,
    capacity: parseInt(capacity),
    durability: parseInt(durability),
    flavor: parseInt(flavor),
    texture: parseInt(texture),
    calories: parseInt(calories)
  };
}

let INFO = {};
DATA.forEach(line => {
  const result = parseLine(line);
  INFO[result.ingredient] = result;
});

console.log(INFO);

const sum = list => list.reduce((prev, next) => prev + next, 0);

const calcField = (ingredient, num, field) => {
  const val = INFO[ingredient][field] * num;
  return val;
};

const cookieScore = ingredientList => {
  const fields = ['capacity', 'durability', 'flavor', 'texture', 'calories'];
  let sums = {};
  ingredientList.forEach(([num, ingredient]) => {
    fields.forEach(field => {
      sums[field] = (sums[field] || 0) + calcField(ingredient, num, field);
    });
  });

  // console.log(sums);

  fields.forEach(field => sums[field] = Math.max(0, sums[field]));

  // let capacity = 0, durability = 0, flavor = 0, texture = 0, calories = 0;
  // ingredientList.forEach([num, ingredient] => {
  //   capacity += calcField(ingredient, num, 'capacity');
  //   durability += calcField(ingredient, num, 'durability');
  //   flavor += calcField(ingredient, num, 'flavor');
  //   texture += calcField(ingredient, num, 'texture');
  // });

  // console.log(sums);

  return [sums.capacity * sums.durability * sums.flavor * sums.texture, sums.calories];
};

const shortScore = (frosting, candy, butterscotch, sugar) => {
  return cookieScore([
    [frosting, 'Frosting'],
    [candy, 'Candy'],
    [butterscotch, 'Butterscotch'],
    [sugar, 'Sugar']
  ]);
};

const shortScore2 = (butterscotch, cinnamon) => {
  return cookieScore([
    [butterscotch, 'Butterscotch'],
    [cinnamon, 'Cinnamon']
  ]);
};


let best = 0;
let vals;

for (var a = 0; a <= 100; a++) {
  for (var b = 0; b <= 100 - a; b++) {
    for (var c = 0; c <= 100 - a - b; c++) {
      let d = 100 - a - b - c;
      if (d < 0) {
        continue;
      }
      const [score, calories] = shortScore(a, b, c, d);
      if (calories !== 500) {
        continue;
      }
      if (score > best) {
        best = score;
        vals = [a, b, c, d];
      }
    }
  }
}

// for (var a = 0; a <= 100; a++) {
//   let b = 100 - a;
//   const score = shortScore2(a, b);
//   if (score > best) {
//     best = score;
//     vals = [a, b];
//   }
// }


console.log(best);
console.log(vals);
// console.log(shortScore2(44, 56));
