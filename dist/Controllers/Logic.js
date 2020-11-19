"use strict";

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

var sellProdLogic = function sellProdLogic(val, product, deliveryAuto, deliveryAmount, stocks) {
  var prod = filterStocksProd(product, stocks);
  prod.sold += parseInt(val);
  prod.quantity -= parseInt(val);
  prod.total = parseInt(prod.price) * parseInt(prod.sold);

  if (deliveryAuto && deliveryAmount) {
    prod.delivered += parseInt(deliveryAmount);
  }

  return;
};

module.exports = {
  createNewProductLogic: createNewProductLogic,
  listProductLogic: listProductLogic,
  filterStocksProd: filterStocksProd,
  sellProdLogic: sellProdLogic,
  handleInput: handleInput
};