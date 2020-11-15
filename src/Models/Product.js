"use strict";
const utils = require("../utils/index.js");
class Product {
  constructor(answers) {
    this.id = utils.GenerateId();
    this.name = answers.name;
    this.category = answers.category;
    this.quantity = answers.quantity;
    this.price = answers.price;
    this.delivered = 0;
    this.sold = 0;
    this.total = 0;
  }

  getProduct() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      quantity: parseInt(this.quantity),
      price: `${this.price} KR`,
      delivered: this.delivered,
      sold: this.sold,
      total: this.total,
    };
  }

  getDelivered() {
    return this.delivered;
  }

  getProductId() {
    return this.id;
  }

  setDelivered(value) {
    this.delivered = value;
  }

  getCategory() {
    return this.category;
  }

  getSold() {
    return this.sold;
  }

  setSold(value) {
    this.sold = value;
    console.log(`${value} has been sold successfully`);
  }
}

module.exports = {
  Product,
};
