const chalk = require("chalk");
function welcome() {
  console.log(chalk.bold.yellow("|*------------------------------*|"));
  console.log(chalk.bold.yellow("|********************************|"));
  console.log(chalk.bold.blue("|****  Sam Arbid store test *****|"));
  console.log(chalk.bold.blue("|***  Case-uppgift lagersaldo ***|"));
  console.log(chalk.bold.yellow("|********************************|"));
  console.log(chalk.bold.yellow("|________________________________|"));
}

module.exports = {
  welcome,
};
