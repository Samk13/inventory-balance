const { actions, configValues } = require("../config.js");
const { objIterator } = require("../utils/index");
const Product = require("../Models/Product.js");
const { stocks } = require("../Store/index.js");
const inquirer = require("inquirer");

const userActions = {
  type: "list",
  name: "mainMenu",
  choices: objIterator(actions),
  message: "What action you wanna take?\n\n",
};

const init = () => {
  inquirer
    .prompt(userActions)
    .then((answers) => {
      if (answers.mainMenu === actions.createNewProduct) {
        createProduct();
      } else if (answers.mainMenu === actions.listProduct) {
        listProducts();
      } else if (answers.mainMenu === actions.sell) {
        sellProduct();
      }
    })
    .catch((err) => console.log(err));
};

function sellProduct(product) {
  inquirer.prompt({
    message: "wish product you wanna sell?",
    type: "list",
    default: 1,
  });
}
// TODO make function to check if there is product

function listProducts() {
  if (stocks.length === 0) {
    inquirer
      .prompt({
        type: "confirm",
        name: "toCreateNewStock",
        message:
          "seems like you have no stocks yet, would you like to create a new one now ?",
        default: true,
      })
      .then((answers) => {
        if (answers.toCreateNewStock === true) {
          createProduct();
        } else {
          init();
        }
      });
  } else {
    console.log("\n List All products");
    console.table(stocks);
    init();
  }
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
          //  TODO accept space in the name and make better validation
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
      //   console.log(JSON.stringify(answers, null, "  "));

      stocks.push(new Product.Product(answers).getProduct());
      console.table(stocks);
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
