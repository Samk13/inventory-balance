const { Product } = require("../Models/Product.js");
const { stocks } = require("../Store/index.js");
const inquirer = require("inquirer");
const { availableCommands, configValues, actions } = require("../config.js");
const {
  productIterator,
  objIterator,
  logYellow,
  logGreen,
  logRed,
} = require("../utils/index.js");

const {
  createNewProductLogic,
  listProductLogic,
  filterStocksProd,
  sellProdLogic,
  handleInput,
} = require("./Logic");

//  ---------------------------------

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
      const input = handleInput(answers.mainMenu);

      if (commands.includes(input[0])) {
        switch (input[0]) {
          case "c":
            createProduct();
            break;
          case "L":
            listProductsWithInit();
            break;
          case "l":
            deliverProduct(input);
            break;
          case "S":
            sellProd(input);
            break;
          case "SP":
            logGreen("Sell packages");
            break;
          default:
            init();
            break;
        }
      } else {
        logRed("I didn't get your command!\n");
        logGreen(
          "Here is all available commands that I can understand for now:\n"
        );
        logGreen("And Yes! it's case Sensitive\n");

        console.log(availableCommands);
        return init();
      }
    })
    .catch((err) => console.error(err));
};

// ----------------------------------------------deliver product
const deliverProdLogic = (val, product) => {
  filterStocksProd(product, stocks).delivered += parseInt(val);
  return listAllProducts(stocks);
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

function sellMethodQuestion() {
  return new Promise((resolve) => {
    const prompt = inquirer.createPromptModule();
    prompt({
      type: "list",
      name: "selectLogic",
      message: "Please select selling method",
      choices: ["Sell without delivery", "Sell with auto delivery"],
      filter: function (val) {
        return val;
      },
    })
      .then((answers) => {
        switch (answers.selectLogic) {
          case "Sell without delivery":
            resolve(false);
            break;
          case "Sell with auto delivery":
            resolve(true);
            break;
        }
      })
      .catch((err) => logRed(err));
  });
}

async function sellProd(userInput) {
  try {
    const deliverQuestion = await sellMethodQuestion();
    const selectedProduct = await selectProduct();
    const sellAmount = await validateUserInput(userInput);
    filterStocksProd(selectedProduct, stocks).quantity < sellAmount
      ? logRed("Sell amount cannot exceed quantity!")
      : sellProdLogic(
          sellAmount,
          selectedProduct,
          deliverQuestion,
          userInput[3],
          stocks
        ),
      listAllProducts(stocks);

    return init();
  } catch (error) {
    console.error(error);
  }
}

// ----------------------------------------------Utils

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
            resolve(answers.amount);
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

async function listAllProducts(stocks) {
  try {
    return new Promise((resolve, reject) => {
      logGreen("\nList all Product");
      logGreen("__________________\n");
      if (stocksHasProducts()) {
        resolve(console.table(listProductLogic(stocks)));
      }
      reject("something wrong happen");
    });
  } catch (error) {
    console.error(error);
  }
}

async function listProductsWithInit() {
  try {
    await listAllProducts(stocks);
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
            // No it does not accept number or spaces
            let pass = value.match(/^([a-zA-Z_$][a-zA-Z\\d_$]*)$/i);
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
              !isNaN(value) &&
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
              !isNaN(value) &&
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
          createNewProductLogic(answers, Product, stocks);
          resolve(listAllProducts(stocks));
          init();
        })
        .catch((err) => logRed(err));
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createProduct,
  init,
};
