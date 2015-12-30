const DATA = [  
  'Dancer can fly 27 km/s for 5 seconds, but then must rest for 132 seconds',
  'Cupid can fly 22 km/s for 2 seconds, but then must rest for 41 seconds',
  'Rudolph can fly 11 km/s for 5 seconds, but then must rest for 48 seconds',
  'Donner can fly 28 km/s for 5 seconds, but then must rest for 134 seconds',
  'Dasher can fly 4 km/s for 16 seconds, but then must rest for 55 seconds',
  'Blitzen can fly 14 km/s for 3 seconds, but then must rest for 38 seconds',
  'Prancer can fly 3 km/s for 21 seconds, but then must rest for 40 seconds',
  'Comet can fly 18 km/s for 6 seconds, but then must rest for 103 seconds',
  'Vixen can fly 18 km/s for 5 seconds, but then must rest for 84 seconds'
];

const parseLine = line => {
  const [name, _, _, speed, _, _, length1, _, _, _, _, _, _, length2, _] = line.split(' ');

  return {
    name,
    speed,
    length1,
    restTime: length2
  };
};

let infos = {};
DATA.forEach(line => {
  const obj = parseLine(line);
  infos[obj.name] = obj;
});

const distance = (info, n) => {
  const { speed, length1, restTime } = info;

  let dist = 0;

  while (n > 0) {
    const flyTime = Math.min(length1, n);
    dist += flyTime * speed;
    n -= flyTime;
    n -= restTime;
  }
  return dist;
};

// console.log(dists.sort());
// console.log(Math.max(...dists));
let points = {};
Object.keys(infos).forEach(name => points[name] = 0);

const allNames = Object.keys(infos);

for (var i = 1; i <= 2503; i++) {
  const pairs = allNames.map(name => {
    return [
      name,
      distance(infos[name], i)
    ];
  });

  const max = Math.max(...pairs.map(pair => pair[1]));
 
  pairs.forEach(pair => {
    if (pair[1] === max) {
      points[pair[0]]++;
    }
  });
}

console.log(points);
