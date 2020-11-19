"use strict";

var utils = require("../utils/index.js");

function Product(answers) {
  return {
    id: utils.GenerateId(),
    name: answers.name,
    category: answers.category,
    quantity: answers.quantity,
    price: answers.price,
    delivered: 0,
    sold: 0,
    total: 0
  };
}

module.exports = {
  Product: Product
};