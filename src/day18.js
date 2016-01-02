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

const isCorner = (row, col, grid) => {
  if (row === 0 || row === grid.length - 1) {
    if (col === 0 || col === grid[0].length - 1) {
      return true;
    }
  }
  return false;

};

const nextVal = (row, col, grid) => {
  if (isCorner(row, col, grid)) {
    return '#';
  }

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

const turnOnCorners = grid => {
  return grid.map((row, rowNum) => {
    return row.map((col, colNum) => {
      if (isCorner(rowNum, colNum, grid)) {
        return '#';
      }
      return grid[rowNum][colNum]; 
    });
  });
};

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

const printGrid = grid => {
  grid.forEach(row => console.log(row.join('')));
  console.log(' ');
};

let grid = turnOnCorners(startGrid);
for (var i = 0; i < 100; i++) {
  // printGrid(grid);
  grid = nextGrid(grid);
}
console.log(numLights(grid));
