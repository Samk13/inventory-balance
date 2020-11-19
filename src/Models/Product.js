"use strict";
const { GenerateId } = require("../utils/index.js");
class Product {
  constructor(answers) {
    this.id = GenerateId();
    this.name = answers.name;
    this.category = answers.category;
    this.quantity = parseInt(answers.quantity);
    this.price = parseFloat(answers.price);
    this.delivered = parseInt(answers.delivered) || 0;
    this.sold = parseInt(answers.sold) || 0;
    this.total = parseInt(answers.price) * parseInt(answers.sold) || 0;
  }
}

module.exports = {
  Product,
};
