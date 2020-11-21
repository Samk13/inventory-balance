const { Product } = require("../Models/Product.js");
const { stocks, packages } = require("../Store/index.js");
const inquirer = require("inquirer");
const { availableCommands, configValues, actions } = require("../config.js");
const {
  productIterator,
  objIterator,
  logYellow,
  logGreen,
  logRed,
} = require("../utils/index.js");

const { validateUserInputQuestions } = require("./InputValidationController");

const {
  createNewProductLogic,
  listProductLogic,
  filterStocksProd,
  filterPackage,
  sellProdLogic,
  handleInput,
} = require("./Logic");

// ----------------------------------------------App initialization

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
          case availableCommands.createNewProduct:
            createProduct();
            break;
          case availableCommands.listProduct:
            listProductsWithInit();
            break;
          case availableCommands.deliverProduct:
            deliverProduct(input);
            break;
          case availableCommands.sellProduct:
            sellProd(input);
            break;
          case availableCommands.sellPackage:
            sellPackage(input);
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

// ----------------------------------------------Sell Package product

const sellPackage = async (input) => {
  logGreen("\nSell Package");
  logGreen("__________________\n");
  try {
    const questionAnswers = await sellPackageQuestion();
    const sellPackageAmount = await validateUserInput(input);
    const selectedPackages = filterPackage(questionAnswers, packages);

    selectedPackages.forEach((prod) => {
      sellProdLogic(sellPackageAmount, prod);
    });
    console.table(selectedPackages);
  } catch (error) {
    console.error(error);
  }

  init();
};

const sellPackageQuestion = () => {
  return new Promise((resolve) => {
    const prompt = inquirer.createPromptModule();
    prompt({
      type: "list",
      name: "selectPackage",
      message: "Please select from our available packages",
      // Coding at friday night will make you hard code these choices -Bill Gates
      choices: [1, 2],
      filter: function (val) {
        return val;
      },
    })
      .then((answers) => {
        resolve(answers.selectPackage);
      })
      .catch((err) => logRed(err));
  });
};

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
    const autoDeliveryQuestion = await sellMethodQuestion();
    const productSelectQuestion = await selectProduct();
    const filterProduct = filterStocksProd(productSelectQuestion, stocks);
    const sellAmount = await validateUserInput(userInput);

    if (filterStocksProd(productSelectQuestion, stocks).quantity < sellAmount) {
      logRed("Sell amount cannot exceed quantity!");
    } else {
      if (autoDeliveryQuestion) {
        if (!userInput[3]) {
          logGreen("For delivery, you didn't provide me with the amount:");
          const deliverAmount = await validateUserInput(userInput);
          sellProdLogic(sellAmount, filterProduct);
          deliverProdValidate(deliverAmount, productSelectQuestion, stocks);
        } else {
          sellProdLogic(sellAmount, filterProduct);
          deliverProdValidate(userInput[3], productSelectQuestion, stocks);
        }
        return init();
      }
      sellProdLogic(sellAmount, filterProduct);
      listAllProducts(stocks);
    }

    return init();
  } catch (error) {
    console.error(error);
  }
}

// ----------------------------------------------deliver product
const deliverProdValidate = (val, product, stocks) => {
  if (
    filterStocksProd(product, stocks).delivered >
      filterStocksProd(product, stocks).sold ||
    val > filterStocksProd(product, stocks).sold
  ) {
    logRed("Deliver amount cannot exceed quantity!");
    return;
  }
  filterStocksProd(product, stocks).delivered += parseInt(val);
  return listAllProducts(stocks);
};

async function deliverProduct(userInput) {
  logGreen("\nDeliver Product");
  logGreen("__________________\n");
  try {
    const selectedProd = await selectProduct();
    const deliveryAmount = await validateUserInput(userInput);

    deliverProdValidate(deliveryAmount, selectedProd, stocks);
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
            return validateUserInputQuestions(value, "amount");
          },
        }).then((answers) => {
          resolve(parseInt(answers.amount));
        });
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
            return validateUserInputQuestions(value, "name");
          },
        },
        {
          type: "input",
          message: "Enter product count",
          name: "quantity",
          validate: function (value) {
            return validateUserInputQuestions(value, "quantity");
          },
          default: function () {
            return configValues.defaultProductCount;
          },
        },
        {
          type: "input",
          message: "Enter product package number",
          name: "package",
          validate: function (value) {
            return validateUserInputQuestions(value, "package");
          },
          default: function () {
            return 1;
          },
        },
        {
          type: "input",
          message: "Enter product price in SEK",
          name: "price",
          validate: function (value) {
            return validateUserInputQuestions(value, "price");
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
            return validateUserInputQuestions(value, "sold");
          },
          default: function () {
            return configValues.defaultSoldNumber;
          },
        },
        {
          type: "input",
          message: "How many have been delivered?",
          name: "delivered",
          validate: function (value) {
            return validateUserInputQuestions(value, "delivered");
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
