const chalk = require("chalk");
const { stocks } = require("../Store/index.js");
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

const objIterator = (val) => Object.values(val);

const productIterator = (arr) => {
  let result = [];
  for (let i = 0; i < stocks.length; i++) {
    result.push(arr[i].name.charAt(0).toUpperCase() + arr[i].name.slice(1));
  }

  return result;
};

const logGreen = (log) => console.log(chalk.green(log));
const logBlue = (log) => console.log(chalk.blue(log));
const logYellow = (log) => console.log(chalk.yellow(log));
const logRed = (log) => console.log(chalk.bold.red(log));

const welcome = () => {
  logYellow("\n\n\n*************************************");
  logBlue("\n** >> WELCOME TO STOCK BALANCER << **");
  logYellow("** >> Created by Sam Arbid 2020 << **");
  logBlue("\n*************************************\n\n\n");
};

module.exports = {
  objIterator,
  productIterator,
  GenerateId,
  logGreen,
  logYellow,
  logRed,
  logBlue,
  welcome,
};
