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

  // getProduct() {
  //   return {
  //     id: this.id,
  //     name: this.name,
  //     category: this.category,
  //     quantity: parseInt(this.quantity),
  //     sold: parseInt(this.sold),
  //     price: parseInt(this.price),
  //     delivered: parseInt(this.delivered),
  //     total: parseInt(this.total),
  //   };
  // }
}

module.exports = {
  Product,
};
