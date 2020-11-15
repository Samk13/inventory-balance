const chalk = require("chalk");

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
  return Object.values(val);
}

function productIterator(arr) {
  const result = [];
  for (let i = 0; i < stocks.length; i++) {
    result.push(arr[i].name.charAt(0).toUpperCase() + arr[i].name.slice(1));
  }

  return result;
}

function logGreen(log) {
  return console.log(chalk.green(log));
}
function logBlue(log) {
  return console.log(chalk.blue(log));
}
function logYellow(log) {
  return console.log(chalk.yellow(log));
}
function logRed(log) {
  return console.log(chalk.bold.red(log));
}

module.exports = {
  GenerateId,
  logGreen,
  logYellow,
  logRed,
  logBlue,
  objIterator,
  productIterator,
};
