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

const INFO = {};

DATA.forEach(line => {
  const {src, dst} = parseLine(line);
  INFO[src] = INFO[src] || [];
  INFO[src].push(dst);
});

let i = 0;
let strs = [];
while (i < start.length) {
  let key = start[i++];
  if (!INFO[key]) {
    key += start[i++];
  }

  
}
