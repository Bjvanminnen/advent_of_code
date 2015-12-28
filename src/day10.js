const transform = seq => {
  seq = seq + '|';
  let newSeq = '';
  let curItem = seq[0];
  let curCount = 1;

  for (let i = 1; i < seq.length; i++) {
    if (seq[i] === curItem) {
      curCount++;
    } else {
      newSeq += curCount + curItem;
      curItem = seq[i];
      curCount = 1;
    }
  }
  return newSeq;
};

let val = '1321131112';
for (let i = 0; i < 50; i++) {
  val = transform(val);
  // console.log(val);
}
console.log(val.length);
