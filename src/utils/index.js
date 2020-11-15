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

const logGreen = (log) => console.log(chalk.green(log));
const logBlue = (log) => console.log(chalk.blue(log));
const logYellow = (log) => console.log(chalk.yellow(log));
const logRed = (log) => console.log(chalk.bold.red(log));

module.exports = {
  GenerateId,
  logGreen,
  logYellow,
  logRed,
  logBlue,
  objIterator,
  productIterator,
};
