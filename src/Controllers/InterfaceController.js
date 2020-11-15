const { actions, configValues } = require("../config.js");
const { objIterator, productIterator } = require("../utils/index");
const Product = require("../Models/Product.js");
const { stocks } = require("../Store/index.js");
const inquirer = require("inquirer");

const { createNewProduct, listProduct, sell, deliver, manual } = actions;

const init2 = () => {
  inquirer
    .prompt({
      type: "list",
      name: "mainMenu",
      choices: objIterator(actions),
      message: "What action you wanna take?\n\n",
    })
    .then((answers) => {
      if (answers.mainMenu === createNewProduct) {
        createProduct();
      } else if (answers.mainMenu === listProduct) {
        listProducts();
      } else if (answers.mainMenu === sell) {
        // selectProduct();
        sellProduct();
      } else if (answers.mainMenu === deliver) {
        // productAmount();
        deliverProduct();
      }
    })
    .catch((err) => console.log(err));
};

let res = { product: "", amount: null };

function selectProduct() {
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
        // if (actionType.toLowerCase() === deliver) {
        //   return deliverProduct(answers.selectedProduct);
        // } else if (actionType.toLowerCase() === sell) {
        //   return selectProduct(answers.selectProduct);
        // }
        return productAmount(answers.selectedProduct);
      })
      .catch((err) => console.error(err));
  }
  return;
}

function productAmount(prod) {
  prompt = inquirer.createPromptModule();
  prompt({
    type: "input",
    name: "sellingAmount",
    message: "enter the amount:",
    validate: function (value) {
      var valid = !isNaN(parseFloat(value));
      return valid || "Please enter a valid number between 0 and 100000";
    },
    filter: Number,
  })
    .then((answers) => {
      res.amount = parseInt(answers.sellingAmount);
      res.product = prod;
      console.log(res);
      return;
    })
    .catch((err) => console.error(err));
}

// function manualCommands() {
//   inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "manual",
//         message: "please enter your command Example 'l5 , L':",
//       },
//     ])
//     .then((answers) => {
//       console.log(answers.manual);
//       // TODO  split the input into strings and number
//       // TODO validate
//       // TODO switch to the already created functionality
//     });
// }

function stocksHasProducts() {
  if (stocks.length === 0) {
    inquirer
      .prompt({
        type: "confirm",
        name: "CreateNewStock",
        message:
          "\x1b[33m Seems like you have no stocks yet, would you like to create a new one now ?",
        default: true,
      })
      .then((answers) => {
        if (answers.CreateNewStock === true) {
          return createProduct();
        } else {
          return init2();
        }
      })
      .catch((err) => console.error(err));
  } else {
    return true;
  }
}

function deliverProduct(theProduct) {
  if (stocksHasProducts()) {
    inquirer
      .prompt({
        type: "input",
        name: "AmountDelivered",
        message:
          "Enter the amount you want to deliver between 1 and sold amount!",
        validate: function (value) {
          if (value > 0) {
            return true;
          } else {
            console.log(
              "\n \x1b[31m Please enter a valid number between 1 and sold amount!\n"
            );
          }
        },
      })
      .then((answers) => {
        const selected = stocks.filter(
          (res) => (res.name = answers.deliveredProduct)
        )[0];
        if (
          selected.sold < answers.AmountDelivered ||
          (selected.delivered +=
            parseInt(answers.AmountDelivered) > selected.sold)
        ) {
          console.log(
            "\x1b[31m The delivered amount is exceeding the sold amount run the process again."
          );
          console.log(
            "\n \x1b[31m and make sure you sold your product before you deliver it!\n"
          );
          console.table(stocks);
          return init2();
        } else {
          selected.delivered += parseInt(answers.AmountDelivered);
          console.table(stocks);
          return init2();
        }
      })
      .catch((err) => console.error(err));
  }
}

function sellProduct() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "sellingAmount",
        message: "enter the amount:",
        validate: function (value) {
          if (value > 0 && value < configValues.sellMaxVal) {
            return true;
          }
          return "Please enter a valid number between 0 and 100000";
        },
      },
    ])
    .then((answers) => {
      const selected = stocks.filter(
        (res) => res.name === answers.sellProduct
      )[0];
      selected.sold += parseInt(answers.sellingAmount);
      selected.total = selected.sold * parseInt(selected.price);
      console.table(stocks);
      return init2();
    })
    .catch((err) => console.error(err));
}

function listProducts() {
  console.log("\nList all Product");
  console.log("__________________");
  if (stocksHasProducts()) {
    console.table(stocks);
    init2();
  }
}

function createProduct() {
  console.log("\nCreate new Product");
  console.log("__________________");
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
      stocks.push(new Product.Product(answers).getProduct());
      console.table(stocks);
      init2();
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
  init2,
  createProduct,
  welcome,
};
