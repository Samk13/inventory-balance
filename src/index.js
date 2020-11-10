"use strict";
const inquirer = require("inquirer");
const Product = require("./Models/Product.js");
const utils = require("./utils/index.js");
const store = require("./Store/index.js");

const actions = {
  createNewProduct: "Create new product",
  listProduct: "List Product",
  sell: "Sell",
  deliver: "Deliver",
};
const configValues = {
  priceMaxVal: 1000000,
  deliveredMaxVal: 1000000,
  defaultProductCount: 10,
  defaultPrice: 10,
  defaultDeliveredNumber: 0,
};

const userActions = {
  type: "list",
  name: "mainMenu",
  message: "What action you wanna take?\n\n",
  choices: [
    actions.createNewProduct,
    new inquirer.Separator(),
    actions.listProduct,
    actions.sell,
    actions.deliver,
  ],
};

function main() {
  utils.welcome();
  init();
}

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
        message: `enter product category`,
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
        message: "How many has been sold?",
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
        message: "How many has been delivered?",
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

main();
