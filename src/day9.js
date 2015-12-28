const DATA = [
  'Faerun to Tristram = 65',
  'Faerun to Tambi = 129',
  'Faerun to Norrath = 144',
  'Faerun to Snowdin = 71',
  'Faerun to Straylight = 137',
  'Faerun to AlphaCentauri = 3',
  'Faerun to Arbre = 149',
  'Tristram to Tambi = 63',
  'Tristram to Norrath = 4',
  'Tristram to Snowdin = 105',
  'Tristram to Straylight = 125',
  'Tristram to AlphaCentauri = 55',
  'Tristram to Arbre = 14',
  'Tambi to Norrath = 68',
  'Tambi to Snowdin = 52',
  'Tambi to Straylight = 65',
  'Tambi to AlphaCentauri = 22',
  'Tambi to Arbre = 143',
  'Norrath to Snowdin = 8',
  'Norrath to Straylight = 23',
  'Norrath to AlphaCentauri = 136',
  'Norrath to Arbre = 115',
  'Snowdin to Straylight = 101',
  'Snowdin to AlphaCentauri = 84',
  'Snowdin to Arbre = 96',
  'Straylight to AlphaCentauri = 107',
  'Straylight to Arbre = 14',
  'AlphaCentauri to Arbre = 46'
];

const parseLine = line => {
  let [origin, _, dest, __, distance] = line.split(' ');
  distance = parseInt(distance, 10);
  return { origin, dest, distance };
};

const graph = {};

DATA.forEach(line => {
  const { origin, dest, distance } = parseLine(line);
  graph[origin] = graph[origin] || {};
  graph[dest] = graph[dest] || {};
  graph[origin][dest] = distance;
  graph[dest][origin] = distance;
});

let allCities = Object.keys(graph);

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

const permutations = permute(allCities);

const getDistance = cities => {
  let distance = 0;
  for (let i = 1; i < cities.length; i++) {
    distance += graph[cities[i - 1]][cities[i]];
  }

  return distance;
};

let minDist = Infinity;
permutations.forEach(permutation => {
  const distance = getDistance(permutation);

  minDist = Math.min(minDist, distance);
});
console.log(minDist);

let maxDist = 0;
permutations.forEach(permutation => {
  const distance = getDistance(permutation);

  maxDist = Math.max(maxDist, distance);
});
console.log(maxDist);
