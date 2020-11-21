"use strict";
const { GenerateId } = require("../utils/index.js");
class Product {
  constructor(answers) {
    this.id = GenerateId();
    this.name = answers.name || "newProduct";
    this.package = answers.package || 1;
    this.price = parseFloat(answers.price) || 1;
    this.quantity = parseInt(answers.quantity) || 0;
    this.sold = parseInt(answers.sold) || 0;
    this.delivered = parseInt(answers.delivered) || 0;
    this.total = parseInt(answers.price) * parseInt(answers.sold) || 0;
  }
}

module.exports = {
  Product,
};
