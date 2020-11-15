const { actions, configValues, availableCommands } = require("../config.js");
const {
  objIterator,
  productIterator,
  logBlue,
  logRed,
  logYellow,
  logGreen,
} = require("../utils/index.js");
const Product = require("../Models/Product.js");
const { stocks } = require("../Store/index.js");
const inquirer = require("inquirer");

const init = () => {
  prompt = inquirer.createPromptModule();
  prompt({
    type: "input",
    name: "mainMenu",
    choices: objIterator(actions),
    message: "What action you wanna take?\n\n",
  }).then((answers) => {
    const commands = objIterator(availableCommands);
    // validate and split the input into string and number
    const input = answers.mainMenu.trim().split(/([0-9]+)/);

    if (commands.includes(input[0])) {
      logGreen("we got you now", input[0]);
      switch (input[0]) {
        case "c":
          createProduct();
          break;
        case "L":
          logGreen("List all products");
          listProducts();
          break;
        case "l":
          logGreen("deliver product");
          break;
        case "S":
          logGreen("sell selected product");
          sellProduct(input);
          break;
        case "lAuto":
          logGreen("automatic delivery for sold items");
        default:
          logGreen("default case!");
          break;
      }
    } else {
      logRed("wrong command!\nHere is all available commands:\n");
      // logGreen(commands);
      console.table(commands);
      return init();
    }
  });
};

// ----------------------------------------------Sell product
function sellProdLogic(val, product) {
  const selected = stocks.filter((res) => res.name === product)[0];
  selected.sold += parseInt(val);
  selected.quantity -= parseInt(val);
  selected.total = parseInt(selected.price) * parseInt(selected.sold);
  return console.table(stocks);
}

async function sellProduct(userInput) {
  try {
    const selectedProduct = await selectProduct();
    const sellAmount = await validateUserInput(userInput);
    const selected = stocks.filter((res) => res.name === selectedProduct)[0];
    selected.quantity < sellAmount
      ? logRed("sell amount cannot exceed quantity!")
      : sellProdLogic(sellAmount, selectedProduct);

    return init();
  } catch (error) {
    console.error(error);
  }
}

// ----------------------------------------------Utils

async function validateUserInput(input) {
  return new Promise((resolve) => {
    let value = input[1];
    if (!value) {
      prompt = inquirer.createPromptModule();
      prompt({
        type: "input",
        name: "amount",
        message: "please enter the amount you want",
        validate: function (value) {
          var valid = !isNaN(parseInt(value));
          return valid || "Please enter a number";
        },
      })
        .then((answers) => {
          value = answers.amount;
          resolve(value);
        })
        .catch((err) => logRed(err.message));
    } else {
      resolve(value);
    }
  });
}

async function selectProduct() {
  return new Promise((resolve) => {
    if (stocksHasProducts()) {
      prompt = inquirer.createPromptModule();
      prompt({
        type: "list",
        name: "selectedProduct",
        message: "Please select the product",
        choices: productIterator(stocks),
        filter: function (val) {
          return val.toLowerCase();
        },
      })
        .then((answers) => {
          resolve(answers.selectedProduct);
        })
        .catch((err) => logRed(err));
    }
    return;
  });
}

function stocksHasProducts() {
  if (stocks.length === 0) {
    prompt = inquirer.createPromptModule();
    prompt({
      type: "confirm",
      name: "CreateNewStock",
      message: logYellow("\nSeems like you have no stocks yet!\n"),
      default: true,
    })
      .then((answers) => {
        if (answers.CreateNewStock === true) {
          return createProduct();
        } else {
          logRed(
            "\nto perform this command,You need at least one product in the store "
          );
          logYellow("you can enter 'c' to create new product\n");
          return init();
        }
      })
      .catch((err) => logRed(err));
  } else {
    return true;
  }
}

// ----------------------------------------------List product

function listProducts() {
  logGreen("\nList all Product");
  logGreen("__________________");
  if (stocksHasProducts()) {
    console.table(stocks);
    init();
  }
}

// ----------------------------------------------Create product

async function createProduct() {
  return new Promise((resolve, reject) => {
    logGreen("\nCreate new Product");
    logGreen("__________________\n");
    prompt = inquirer.createPromptModule();
    prompt([
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
        stocks.push(new Product.Product(answers).getProduct());
        resolve(console.table(stocks));
        init();
      })
      .catch((err) => logRed(err));
  });
}

function welcome() {
  logYellow("\n\n\n*************************************");
  logBlue("\n** >> WELCOME TO STOCK BALANCER << **");
  logYellow("** >> Created by Sam Arbid 2020 << **");
  logBlue("\n*************************************\n\n\n");
}

module.exports = {
  createProduct,
  welcome,
  init,
};
