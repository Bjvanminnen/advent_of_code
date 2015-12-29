const incrementLetter = letter => {
  if (letter === 'z') {
    return 'a'
  }
  const val = letter.charCodeAt(0);
  return String.fromCharCode(val + 1);
};

// TODO - did this wrong
const increment = str => {
  let letters = str.split('');
  
  for (let i = letters.length - 1; i >= 0; i--) {
    if (letters[i] === 'z') {
      letters[i] = 'a';
    } else {
      letters[i] = incrementLetter(letters[i]);
      return letters.join('');
    }
  }
  return letters.join('');
};

assert(increment('x') === 'y');
assert(increment('xy') === 'xz');
assert(increment('xz') === 'ya');

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const triplets = alphabet.map((_, index) => {
  return alphabet.slice(index, index + 3).join('');
}).slice(0, 24);

const hasStraight = str => {
  return triplets.some(triplet => str.indexOf(triplet) !== -1);
};

const validPassword = str => {
  if (!hasStraight(str)) {
    return false;
  }

  if (str.indexOf('i') !== -1) {
    return false;
  }
  if (str.indexOf('o') !== -1) {
    return false;
  }
  if (str.indexOf('l') !== -1) {
    return false;
  }

  return hasTwoRepeated(str); 
};

const hasTwoRepeated = str => {
  const result = /(.)\1/.exec(str);
  if (!result) {
    return false;
  }
  const [_, char] = result;

  return /([a-z])\1/.test(str.replace(new RegExp(char, 'g'), '_'));
};

const TEST_DATA = [
  'hijklmmn',
  'abbceffg',
  'abbcegjk'
];


let count = 1000000;
const nextPassword = pwd => {
  if (count === 0) {
    throw new Error('bailing');
  }
  count--;
  console.log(pwd);
  const next = increment(pwd);
  if (validPassword(next)) {
    return next;
  }
  return nextPassword(next);
};

console.log(nextPassword('hxbxxyzz'));

