import _ from 'lodash';

let DATA = [ 
  'Al => ThF',
  'Al => ThRnFAr',
  'B => BCa',
  'B => TiB',
  'B => TiRnFAr',
  'Ca => CaCa',
  'Ca => PB',
  'Ca => PRnFAr',
  'Ca => SiRnFYFAr',
  'Ca => SiRnMgAr',
  'Ca => SiTh',
  'F => CaF',
  'F => PMg',
  'F => SiAl',
  'H => CRnAlAr',
  'H => CRnFYFYFAr',
  'H => CRnFYMgAr',
  'H => CRnMgYFAr',
  'H => HCa',
  'H => NRnFYFAr',
  'H => NRnMgAr',
  'H => NTh',
  'H => OB',
  'H => ORnFAr',
  'Mg => BF',
  'Mg => TiMg',
  'N => CRnFAr',
  'N => HSi',
  'O => CRnFYFAr',
  'O => CRnMgAr',
  'O => HP',
  'O => NRnFAr',
  'O => OTi',
  'P => CaP',
  'P => PTi',
  'P => SiRnFAr',
  'Si => CaSi',
  'Th => ThCa',
  'Ti => BP',
  'Ti => TiTi',
  'e => HF',
  'e => NAl',
  'e => OMg'
];

let start = 'ORnPBPMgArCaCaCaSiThCaCaSiThCaCaPBSiRnFArRnFArCaCaSiThCaCaSiThCaCaCaCaCaCaSiRnFYFArSiRnMgArCaSiRnPTiTiBFYPBFArSiRnCaSiRnTiRnFArSiAlArPTiBPTiRnCaSiAlArCaPTiTiBPMgYFArPTiRnFArSiRnCaCaFArRnCaFArCaSiRnSiRnMgArFYCaSiRnMgArCaCaSiThPRnFArPBCaSiRnMgArCaCaSiThCaSiRnTiMgArFArSiThSiThCaCaSiRnMgArCaCaSiRnFArTiBPTiRnCaSiAlArCaPTiRnFArPBPBCaCaSiThCaPBSiThPRnFArSiThCaSiThCaSiThCaPTiBSiRnFYFArCaCaPRnFArPBCaCaPBSiRnTiRnFArCaPRnFArSiRnCaCaCaSiThCaRnCaFArYCaSiRnFArBCaCaCaSiThFArPBFArCaSiRnFArRnCaCaCaFArSiRnFArTiRnPMgArF';

// const mods = {
//   Al: '@',
//   Ca: '(',
//   Mg: '^',
//   Si: '$',
//   Th: '#',
//   Ti: '!'
// };

const parseLine = line => {
  const [src, dst] = line.split(' => ');
  return { src, dst };
};

const generateInfo = (data) => {
  let info = {};
  data.forEach(line => {
    const {src, dst} = parseLine(line);
    info[src] = info[src] || [];
    info[src].push(dst);
  });
  return info;
};

const INFO = generateInfo(DATA);

const numInstances = (str, substr) => {
  const next = str.indexOf(substr);
  if (next === -1) {
    return 0;
  }
  return 1 + numInstances(str.slice(next + 1), substr);

};

assert(numInstances('a', 'a') === 1);
assert(numInstances('aaa', 'a') === 3);
assert(numInstances('aba', 'a') === 2);
assert(numInstances('ababa', 'ab') === 2);

const replaceNthInstance = (str, substr, replacement, n) => {
  if (n < 1) { throw new Error(); }
  let fromIndex = -1;
  while (n >= 1) {
    fromIndex = str.indexOf(substr, fromIndex + 1);
    if (fromIndex === -1) {
      throw new Error('unexpected');
    }
    n--;
  }

  return str.slice(0, fromIndex) + replacement + str.slice(fromIndex + substr.length);
};

assert(replaceNthInstance('aba', 'a', 'b', 1) === 'bba');
assert(replaceNthInstance('aba', 'a', 'b', 2) === 'abb');
assert(replaceNthInstance('ThisStr', 'is', '__', 1) === 'Th__Str');
assert(replaceNthInstance('ThisStr', 'is', '__**', 1) === 'Th__**Str');

const replaceAllInstances = (str, substr, replacement) => {
  const num = numInstances(str, substr);

  return _.range(1, num + 1).map(n => replaceNthInstance(str, substr, replacement, n));
};

assert(_.isEqual(replaceAllInstances('aba', 'a', 'z'), ['zba', 'abz']));

const replace = (str, substr, replacements) => {
  return _.flatten(
    replacements.map(replacement => replaceAllInstances(str, substr, replacement))
  );
};

const TEST_DATA = [
  'H => HO',
  'H => OH',
  'O => HH'
];
const TEST_STR = 'HOH';

const getNumUniq = (info, startStr) => {
  const list = (_.flatten(
    Object.keys(info).map(k => replace(startStr, k, info[k]))
  ));
  return _.uniq(list).length;
};

// console.log(replace(start, 'Al', INFO['Al'])); 

// console.log(INFO);

console.log(getNumUniq(INFO, start));
// console.log(getNumUniq(generateInfo(TEST_DATA), 'HOH'));

