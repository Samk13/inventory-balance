const inquirer = require("inquirer");
const Product = require("../Models/Product.js");
const store = require("../Store/index.js");
const { objIterator } = require("../utils/index");
const { actions, configValues } = require("../config.js");

const userActions = {
  type: "list",
  name: "mainMenu",
  message: "What action you wanna take?\n\n",
  choices: objIterator(actions),
};

function init() {
  inquirer
    .prompt(userActions)
    .then((answers) => {
      if (answers.mainMenu === actions.createNewProduct) {
        // encounter1();
        createProduct();
      } else {
        console.log("\nYou cannot go that way. Try again");
        main();
      }
    })
    .catch((err) => console.log(err));
}

function createProduct() {
  console.log("\nCreate new Product");
  console.log("__________________");
  console.log("here we ask questions about new product");
  inquirer
    .prompt([
      {
        type: "input",
        message: "enter your product name",
        name: "name",
        validate: function (value) {
          let pass = value.match(/^(?=.*[A-Za-z])[A-Za-z\d]{3,}$/i);
          if (pass) {
            return true;
          }

          return "Please enter a valid string with at least 3 chars";
        },
      },
      {
        type: "input",
        message: "enter product category",
        name: "category",
        validate: function (value) {
          let pass = value.match(/^(?=.*[A-Za-z])[A-Za-z\d]{3,}$/i);
          if (pass) {
            return true;
          }

          return "Please enter a valid string with at least 3 chars";
        },
        default: function () {
          return "general";
        },
      },
      {
        type: "input",
        message: "Enter product count",
        name: "quantity",
        validate: function (value) {
          if (Math.sign(value) === 1 && value < configValues.priceMaxVal) {
            return true;
          }
          return "Please enter a valid number";
        },
        default: function () {
          return configValues.defaultProductCount;
        },
      },
      {
        type: "input",
        message: "Enter product price in SEK",
        name: "price",
        validate: function (value) {
          if (Math.sign(value) === 1) {
            return true;
          }
          return "Please enter a valid number";
        },
        default: function () {
          return configValues.defaultPrice;
        },
      },
      {
        type: "input",
        message: "How many have been sold?",
        name: "sold ",
        validate: function (value) {
          if (
            typeof value !== NaN &&
            value >= 0 &&
            value < configValues.priceMaxVal
          ) {
            return true;
          }
          return "Please enter a valid number";
        },
        default: function () {
          return configValues.defaultDeliveredNumber;
        },
      },
      {
        type: "input",
        message: "How many have been delivered?",
        name: "delivered ",
        validate: function (value) {
          if (
            typeof value !== NaN &&
            value >= 0 &&
            value < configValues.deliveredMaxVal
          ) {
            return true;
          }
          return "Please enter a valid number";
        },
        default: function () {
          return configValues.defaultDeliveredNumber;
        },
      },
    ])
    .then((answers) => {
      console.log(JSON.stringify(answers, null, "  "));
      let collectedData = new Product.Product(answers);
      store.stocks.push(collectedData.getProduct());
      console.log("You can check your product buy selecting list");
      console.table(store.stocks);
      init();
    })
    .catch((err) => console.error(err));
}

function welcome() {
  // chalk dependency could be an option here
  console.log(
    "\x1b[33m%s\x1b[0m",
    "\n\n\n*************************************"
  );
  console.log("\033[94m", "\n** >> WELCOME TO STOCK BALANCER << **");
  console.log("\x1b[33m%s\x1b[0m", "** >> Created by Sam Arbid 2020 << **");
  console.log("\033[94m", "\n*************************************\n\n\n");
}

module.exports = {
  init,
  createProduct,
  welcome,
};
