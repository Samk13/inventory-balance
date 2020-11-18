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
  const prompt = inquirer.createPromptModule();
  prompt({
    type: "input",
    name: "mainMenu",
    choices: objIterator(actions),
    message: "What action you wanna take?\n\n",
  })
    .then((answers) => {
      const commands = objIterator(availableCommands);
      // validate and split the input into string and number
      const input = answers.mainMenu.trim().split(/([0-9]+)/);

      if (commands.includes(input[0])) {
        switch (input[0]) {
          case "c":
            createProduct();
            break;
          case "L":
            listProducts();
            break;
          case "l":
            deliverProduct(input);
            break;
          case "S":
            sellProd(input);
            break;
          case "lAuto":
            logGreen("Automatic delivery for sold items");
          default:
            logGreen("default case!");
            break;
        }
      } else {
        logRed("Wrong command!\nHere is all available commands:\n");

        console.log(availableCommands);
        return init();
      }
    })
    .catch((err) => console.error(err));
};

// ----------------------------------------------deliver product
const deliverProdLogic = (val, product) => {
  selectProdLogic(product, stocks).delivered += parseInt(val);
  return listProductsLogic();
};

async function deliverProduct(userInput) {
  try {
    const selectedProd = await selectProduct();
    const deliveryAmount = await validateUserInput(userInput);
    const selected = stocks.filter((res) => res.name === selectedProd)[0];
    selected.quantity < deliveryAmount
      ? logRed("Deliver amount cannot exceed quantity!")
      : deliverProdLogic(deliveryAmount, selectedProd);

    return init();
  } catch (error) {
    console.error(error);
  }
}

// ----------------------------------------------Sell product
const sellProdLogic = (val, product, delivery) => {
  const prod = selectProdLogic(product, stocks);
  prod.sold += parseInt(val);
  prod.quantity -= parseInt(val);
  prod.total = parseInt(prod.price) * parseInt(prod.sold);
  if (delivery && configValues.autoDeliverValues.includes(parseInt(val))) {
    prod.delivered += parseInt(val);
  }
  return listProductsLogic();
};

function sellDeliveryQuestion() {
  return new Promise((resolve) => {
    const prompt = inquirer.createPromptModule();
    prompt({
      type: "list",
      name: "selectLogic",
      message: "Please select selling method",
      choices: [
        "Sell without delivery",
        "Sell with delivery for only 5 and 10 orders",
      ],
      filter: function (val) {
        return val;
      },
    })
      .then((answers) => {
        switch (answers.selectLogic) {
          case "Sell without delivery":
            resolve(false);
            break;
          case "Sell with delivery for only 5 and 10 orders":
            resolve(true);
            break;
        }
      })
      .catch((err) => logRed(err));
  });
}

async function sellProd(userInput) {
  try {
    const deliverQuestion = await sellDeliveryQuestion();
    const selectedProduct = await selectProduct();
    const sellAmount = await validateUserInput(userInput);
    const selected = stocks.filter((res) => res.name === selectedProduct)[0];
    selected.quantity < sellAmount
      ? logRed("Sell amount cannot exceed quantity!")
      : sellProdLogic(sellAmount, selectedProduct, deliverQuestion);
    return init();
  } catch (error) {
    console.error(error);
  }
}

// ----------------------------------------------Utils
const selectProdLogic = (product, stocks) => {
  return stocks.filter((res) => res.name === product)[0];
};

async function validateUserInput(input) {
  try {
    return new Promise((resolve) => {
      let value = input[1];
      if (!value) {
        const prompt = inquirer.createPromptModule();
        prompt({
          type: "input",
          name: "amount",
          message: "Please enter the amount you want",
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
  } catch (error) {
    console.error(error);
  }
}

async function selectProduct() {
  try {
    return new Promise((resolve) => {
      if (stocksHasProducts()) {
        const prompt = inquirer.createPromptModule();
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
  } catch (error) {
    console.error(error);
  }
}

const stocksHasProducts = () => {
  if (stocks.length === 0) {
    const prompt = inquirer.createPromptModule();
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
            "\nTo perform this command,You need at least one product in the store "
          );
          logYellow("You can enter 'c' to create new product\n");
          return init();
        }
      })
      .catch((err) => logRed(err));
  } else {
    return true;
  }
};

// ----------------------------------------------List product

async function listProductsLogic() {
  try {
    return new Promise((resolve) => {
      logGreen("\nList all Product");
      logGreen("__________________\n");
      if (stocksHasProducts()) {
        const results = JSON.parse(JSON.stringify(stocks));
        results.forEach((prod) => {
          prod.delivered = `${prod.delivered} X`;
          prod.quantity = `${prod.quantity} X`;
          prod.price = `${prod.price} KR`;
          prod.total = `${prod.total} KR`;
          prod.sold = `${prod.sold} X`;
        });
        resolve(console.table(results));
        // resolve(console.table(stocks));
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function listProducts() {
  try {
    await listProductsLogic();
    init();
  } catch (error) {
    console.error();
  }
}

// ----------------------------------------------Create product

async function createProduct() {
  try {
    return new Promise((resolve) => {
      logGreen("\nCreate new Product");
      logGreen("__________________\n");
      const prompt = inquirer.createPromptModule();
      prompt([
        {
          type: "input",
          message: "Please enter your product name",
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
          message: "Enter product category",
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
          name: "sold",
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
          name: "delivered",
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
          stocks.push(new Product.Product(answers));
          resolve(listProductsLogic());
          init();
        })
        .catch((err) => logRed(err));
    });
  } catch (error) {
    console.error(error);
  }
}

const welcome = () => {
  logYellow("\n\n\n*************************************");
  logBlue("\n** >> WELCOME TO STOCK BALANCER << **");
  logYellow("** >> Created by Sam Arbid 2020 << **");
  logBlue("\n*************************************\n\n\n");
};

module.exports = {
  createProduct,
  welcome,
  init,
};
