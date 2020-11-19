"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require("../Models/Product.js"),
    Product = _require.Product;

var _require2 = require("../Store/index.js"),
    stocks = _require2.stocks;

var inquirer = require("inquirer");

var _require3 = require("../config.js"),
    availableCommands = _require3.availableCommands,
    configValues = _require3.configValues,
    actions = _require3.actions;

var _require4 = require("../utils/index.js"),
    productIterator = _require4.productIterator,
    objIterator = _require4.objIterator,
    logYellow = _require4.logYellow,
    logGreen = _require4.logGreen,
    logRed = _require4.logRed;

var _require5 = require("./Logic"),
    createNewProductLogic = _require5.createNewProductLogic,
    listProductLogic = _require5.listProductLogic,
    filterStocksProd = _require5.filterStocksProd,
    sellProdLogic = _require5.sellProdLogic,
    handleInput = _require5.handleInput; //  ---------------------------------


var init = function init() {
  var prompt = inquirer.createPromptModule();
  prompt({
    type: "input",
    name: "mainMenu",
    choices: objIterator(actions),
    message: "What action you wanna take?\n\n"
  }).then(function (answers) {
    var commands = objIterator(availableCommands);
    var input = handleInput(answers.mainMenu);

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
      logGreen("Here is all available commands that I can understand for now:\n");
      logGreen("And Yes! it's case Sensitive\n");
      console.log(availableCommands);
      return init();
    }
  })["catch"](function (err) {
    return console.error(err);
  });
}; // ----------------------------------------------deliver product


var deliverProdLogic = function deliverProdLogic(val, product) {
  filterStocksProd(product, stocks).delivered += parseInt(val);
  return listAllProducts(stocks);
};

function deliverProduct(_x) {
  return _deliverProduct.apply(this, arguments);
} // ----------------------------------------------Sell product


function _deliverProduct() {
  _deliverProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userInput) {
    var selectedProd, deliveryAmount, selected;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return selectProduct();

          case 3:
            selectedProd = _context.sent;
            _context.next = 6;
            return validateUserInput(userInput);

          case 6:
            deliveryAmount = _context.sent;
            selected = stocks.filter(function (res) {
              return res.name === selectedProd;
            })[0];
            selected.quantity < deliveryAmount ? logRed("Deliver amount cannot exceed quantity!") : deliverProdLogic(deliveryAmount, selectedProd);
            return _context.abrupt("return", init());

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            console.error(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 12]]);
  }));
  return _deliverProduct.apply(this, arguments);
}

function sellMethodQuestion() {
  return new Promise(function (resolve) {
    var prompt = inquirer.createPromptModule();
    prompt({
      type: "list",
      name: "selectLogic",
      message: "Please select selling method",
      choices: ["Sell without delivery", "Sell with auto delivery"],
      filter: function filter(val) {
        return val;
      }
    }).then(function (answers) {
      switch (answers.selectLogic) {
        case "Sell without delivery":
          resolve(false);
          break;

        case "Sell with auto delivery":
          resolve(true);
          break;
      }
    })["catch"](function (err) {
      return logRed(err);
    });
  });
}

function sellProd(_x2) {
  return _sellProd.apply(this, arguments);
} // ----------------------------------------------Utils


function _sellProd() {
  _sellProd = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userInput) {
    var deliverQuestion, selectedProduct, sellAmount;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return sellMethodQuestion();

          case 3:
            deliverQuestion = _context2.sent;
            _context2.next = 6;
            return selectProduct();

          case 6:
            selectedProduct = _context2.sent;
            _context2.next = 9;
            return validateUserInput(userInput);

          case 9:
            sellAmount = _context2.sent;
            filterStocksProd(selectedProduct, stocks).quantity < sellAmount ? logRed("Sell amount cannot exceed quantity!") : sellProdLogic(sellAmount, selectedProduct, deliverQuestion, userInput[3], stocks), listAllProducts(stocks);
            return _context2.abrupt("return", init());

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return _sellProd.apply(this, arguments);
}

function validateUserInput(_x3) {
  return _validateUserInput.apply(this, arguments);
}

function _validateUserInput() {
  _validateUserInput = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(input) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            return _context3.abrupt("return", new Promise(function (resolve) {
              var value = input[1];

              if (!value) {
                var prompt = inquirer.createPromptModule();
                prompt({
                  type: "input",
                  name: "amount",
                  message: "Please enter the amount you want",
                  validate: function validate(value) {
                    var valid = !isNaN(parseInt(value));
                    return valid || "Please enter a number";
                  }
                }).then(function (answers) {
                  value = answers.amount;
                  resolve(value);
                })["catch"](function (err) {
                  return logRed(err.message);
                });
              } else {
                resolve(value);
              }
            }));

          case 4:
            _context3.prev = 4;
            _context3.t0 = _context3["catch"](0);
            console.error(_context3.t0);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 4]]);
  }));
  return _validateUserInput.apply(this, arguments);
}

function selectProduct() {
  return _selectProduct.apply(this, arguments);
}

function _selectProduct() {
  _selectProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            return _context4.abrupt("return", new Promise(function (resolve) {
              if (stocksHasProducts()) {
                var prompt = inquirer.createPromptModule();
                prompt({
                  type: "list",
                  name: "selectedProduct",
                  message: "Please select the product",
                  choices: productIterator(stocks),
                  filter: function filter(val) {
                    return val.toLowerCase();
                  }
                }).then(function (answers) {
                  resolve(answers.selectedProduct);
                })["catch"](function (err) {
                  return logRed(err);
                });
              }

              return;
            }));

          case 4:
            _context4.prev = 4;
            _context4.t0 = _context4["catch"](0);
            console.error(_context4.t0);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 4]]);
  }));
  return _selectProduct.apply(this, arguments);
}

var stocksHasProducts = function stocksHasProducts() {
  if (stocks.length === 0) {
    var prompt = inquirer.createPromptModule();
    prompt({
      type: "confirm",
      name: "CreateNewStock",
      message: logYellow("\nSeems like you have no stocks yet!\n"),
      "default": true
    }).then(function (answers) {
      if (answers.CreateNewStock === true) {
        return createProduct();
      } else {
        logRed("\nTo perform this command,You need at least one product in the store ");
        logYellow("You can enter 'c' to create new product\n");
        return init();
      }
    })["catch"](function (err) {
      return logRed(err);
    });
  } else {
    return true;
  }
}; // ----------------------------------------------List product


function listAllProducts(_x4) {
  return _listAllProducts.apply(this, arguments);
}

function _listAllProducts() {
  _listAllProducts = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(stocks) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            return _context5.abrupt("return", new Promise(function (resolve, reject) {
              logGreen("\nList all Product");
              logGreen("__________________\n");

              if (stocksHasProducts()) {
                resolve(console.table(listProductLogic(stocks)));
              }

              reject("something wrong happen");
            }));

          case 4:
            _context5.prev = 4;
            _context5.t0 = _context5["catch"](0);
            console.error(_context5.t0);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 4]]);
  }));
  return _listAllProducts.apply(this, arguments);
}

function listProductsWithInit() {
  return _listProductsWithInit.apply(this, arguments);
} // ----------------------------------------------Create product


function _listProductsWithInit() {
  _listProductsWithInit = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return listAllProducts(stocks);

          case 3:
            init();
            _context6.next = 9;
            break;

          case 6:
            _context6.prev = 6;
            _context6.t0 = _context6["catch"](0);
            console.error();

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 6]]);
  }));
  return _listProductsWithInit.apply(this, arguments);
}

function createProduct() {
  return _createProduct.apply(this, arguments);
}

function _createProduct() {
  _createProduct = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            return _context7.abrupt("return", new Promise(function (resolve) {
              logGreen("\nCreate new Product");
              logGreen("__________________\n");
              var prompt = inquirer.createPromptModule();
              prompt([{
                type: "input",
                message: "Please enter your product name",
                name: "name",
                validate: function validate(value) {
                  // No it does not accept number or spaces
                  var pass = value.match(/^([a-zA-Z_$][a-zA-Z\\d_$]*)$/i);

                  if (pass) {
                    return true;
                  }

                  return "Please enter a valid string with at least 3 chars";
                }
              }, {
                type: "input",
                message: "Enter product category",
                name: "category",
                validate: function validate(value) {
                  var pass = value.match(/^(?=.*[A-Za-z])[A-Za-z\d]{3,}$/i);

                  if (pass) {
                    return true;
                  }

                  return "Please enter a valid string with at least 3 chars";
                },
                "default": function _default() {
                  return "general";
                }
              }, {
                type: "input",
                message: "Enter product count",
                name: "quantity",
                validate: function validate(value) {
                  if (Math.sign(value) === 1 && value < configValues.priceMaxVal) {
                    return true;
                  }

                  return "Please enter a valid number";
                },
                "default": function _default() {
                  return configValues.defaultProductCount;
                }
              }, {
                type: "input",
                message: "Enter product price in SEK",
                name: "price",
                validate: function validate(value) {
                  if (Math.sign(value) === 1) {
                    return true;
                  }

                  return "Please enter a valid number";
                },
                "default": function _default() {
                  return configValues.defaultPrice;
                }
              }, {
                type: "input",
                message: "How many have been sold?",
                name: "sold",
                validate: function validate(value) {
                  if (!isNaN(value) && value >= 0 && value < configValues.priceMaxVal) {
                    return true;
                  }

                  return "Please enter a valid number";
                },
                "default": function _default() {
                  return configValues.defaultDeliveredNumber;
                }
              }, {
                type: "input",
                message: "How many have been delivered?",
                name: "delivered",
                validate: function validate(value) {
                  if (!isNaN(value) && value >= 0 && value < configValues.deliveredMaxVal) {
                    return true;
                  }

                  return "Please enter a valid number";
                },
                "default": function _default() {
                  return configValues.defaultDeliveredNumber;
                }
              }]).then(function (answers) {
                createNewProductLogic(answers, Product, stocks);
                resolve(listAllProducts(stocks));
                init();
              })["catch"](function (err) {
                return logRed(err);
              });
            }));

          case 4:
            _context7.prev = 4;
            _context7.t0 = _context7["catch"](0);
            console.error(_context7.t0);

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 4]]);
  }));
  return _createProduct.apply(this, arguments);
}

module.exports = {
  createProduct: createProduct,
  init: init
};