import DATA from './data_day18.js';

const numNeighborsOn = (row, col, grid) => {
  let neighbors = [
    [row - 1, col - 1],
    [row - 1, col - 0],
    [row - 1, col + 1],
    [row - 0, col - 1],
    [row - 0, col + 1],
    [row + 1, col - 1],
    [row + 1, col - 0],
    [row + 1, col + 1]
  ];

  return neighbors.map(n => lightOn(...n, grid))
    .reduce((prev, cur) => prev + (cur ? 1 : 0));

};

const lightOn = (row, col, grid) => {
  const gridRow = grid[row];
  if (!gridRow) {
    return false;
  }
  return gridRow[col] === '#';
};

const nextVal = (row, col, grid) => {
  const numNeighbors = numNeighborsOn(row, col, grid);

  const curVal = grid[row][col];
  let isOn;
  if (curVal === '.') {
    isOn = numNeighbors === 3;
  } else {
    isOn = numNeighbors === 3 || numNeighbors === 2;
  }

  return isOn ? '#' : '.';
};

const startGrid = DATA.map(line => line.split(''));

const nextGrid = (grid) => {
  return grid.map((row, rowNum) => {
    return row.map((col, colNum) => {
      return nextVal(rowNum, colNum, grid);
    });
  });
};

const numLights = (grid) => {
  let sum = 0;
  grid.forEach(row => {
    row.forEach(col => {
      if (col === '#') { sum++; }
    });
  });
  return sum;
};

const testGrid = [
  '.#.#.#',
  '...##.',
  '#....#',
  '..#...',
  '#.#..#',
  '####..'
].map(line => line.split(''));

let grid = startGrid;
for (var i = 0; i < 100; i++) {
  grid = nextGrid(grid);
}
console.log(numLights(grid));
