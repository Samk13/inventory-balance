"use strict";

var _require = require("../config"),
    configValues = _require.configValues;

var _require2 = require("../utils"),
    logYellow = _require2.logYellow;

var handleInput = function handleInput(input) {
  return input.trim().split(/([0-9]+)/);
};

var createNewProductLogic = function createNewProductLogic(answersObj, prodClass, storeArr) {
  return storeArr.push(new prodClass(answersObj));
};

var listProductLogic = function listProductLogic(stocks) {
  var results = JSON.parse(JSON.stringify(stocks));
  results.forEach(function (prod) {
    prod.delivered = "".concat(prod.delivered, " X");
    prod.quantity = "".concat(prod.quantity, " X");
    prod.price = "".concat(prod.price, " KR");
    prod.total = "".concat(prod.total, " KR");
    prod.sold = "".concat(prod.sold, " X");
  });
  return results;
};

var filterStocksProd = function filterStocksProd(product, stocks) {
  return stocks.filter(function (res) {
    return res.name === product;
  })[0];
};

var sellProdLogic = function sellProdLogic(val, product, stocks) {
  var prod = filterStocksProd(product, stocks);
  prod.sold += parseInt(val);
  prod.quantity -= parseInt(val);

  if (parseInt(prod.sold) > parseInt(configValues.priceMinimumAmountDiscount)) {
    prod.total = calculateDiscount(parseInt(prod.price), parseInt(configValues.priceDiscount)) * parseInt(prod.sold);
    logYellow("\nOn every ".concat(configValues.priceMinimumAmountDiscount, " products you buy, "));
    logYellow("you get one for FREE! ^_^");
    return;
  }

  prod.total = parseInt(prod.price) * parseInt(prod.sold);
  return;
};

var calculateDiscount = function calculateDiscount(price, discount) {
  // or floor ?
  return Math.ceil(price - price * discount / 100);
};
/**
 * Exports
 */


module.exports = {
  createNewProductLogic: createNewProductLogic,
  calculateDiscount: calculateDiscount,
  listProductLogic: listProductLogic,
  filterStocksProd: filterStocksProd,
  sellProdLogic: sellProdLogic,
  handleInput: handleInput
};