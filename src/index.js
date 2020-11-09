const chalk = require("chalk");

const structDatas = [
  {
    Product: "productx",
    Description: "Description of the product",
    price: "10$",
    In_Stock: "1",
  },
  {
    Product: "producty",
    Description: "Description of the product",
    price: "10$",
    In_Stock: "0",
  },
  {
    Product: "productz",
    Description: "Description of the product",
    price: "10$",
    In_Stock: "12",
  },
];

function logTable(data) {
  console.table(data);
}

//print the virtual store logo
console.log(chalk.bold.yellow("|*------------------------------*|"));
console.log(chalk.bold.yellow("|********************************|"));
console.log(chalk.bold.blue("|****  Sam Arbid store test *****|"));
console.log(chalk.bold.blue("|***  Case-uppgift lagersaldo ***|"));
console.log(chalk.bold.yellow("|********************************|"));
console.log(chalk.bold.yellow("|________________________________|"));

logTable(structDatas);
