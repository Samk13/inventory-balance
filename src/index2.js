#!/usr/bin/env node
const inquirer = require("inquirer");
const store = require("./Store/index.js");
const models = require("./Models/Product.js");
const utils = require("./utils/index.js");

const stocks = store.stocks;
utils.welcome();

function main() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "What do you want to do?",
        choices: [
          "show stocks",
          "add stock",
          "remove task",
          "mark as completed",
        ],
      },
      {
        name: "new",
        type: "input",
        message: "What is your product name?",
        when: (answers) => {
          return answers.action === "add stock";
        },
      },
      {
        name: "name",
        type: "input",
        message: "What is your product name?",
        when: (answers) => {
          return answers.action === "add stock";
        },
      },
      {
        name: "dedicated",
        type: "list",
        message: "Which task?",
        when: (answers) => {
          return (
            answers.action === "remove task" ||
            answers.action === "mark as completed"
          );
        },
        choices: function () {
          let i,
            ids = [];
          for (i = 0; i < stocks.length; i++) {
            ids.push(i);
          }
          return ids;
        },
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "show stocks":
          console.table(stocks);
          break;
        case "remove task":
          stocks.splice(answers.dedicated, 1);
          break;
        case "add stock":
          stocks.push(
            new models.Product(answers)
            // { title: answers.new, done: false }
          );
          break;
        case "mark as completed":
          stocks[answers.dedicated].done = true;
          break;
      }
      save();
      main();
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error(error);
      } else {
        console.log("something went wrong ...");
      }
    });
}
function save() {
  JSON.stringify(stocks);
}

main();

// const productController = require("./Controllers/ProductsController.js");
// const welcome = require("./Controllers/welcome.js");

// const theProducts = store.Products;
// const structDatas = productController.structDatas;

// function logTable(data) {
//   console.table(data);
// }

// logTable(structDatas);
// welcome.welcome();
// console.log(theProducts);
