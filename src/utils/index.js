function GenerateId() {
  let dt = new Date();
  let seed =
    dt.getYear() +
    dt.getDay() +
    dt.getMonth() +
    dt.getHours() +
    dt.getMinutes() +
    dt.getSeconds();

  return Math.floor(Math.pow(8, 8 - 1) + Math.random() * Math.floor(seed));
}

function objIterator(val) {
  // for ([key, value] of Object.entries(val)) {
  //   return value;
  // }
  const result = [];
  const x = Object.entries(val);
  for (let i = 0; i < x.length; i++) {
    result.push(x[i][1]);
  }
  return result;
}

module.exports = {
  GenerateId,
  objIterator,
};
