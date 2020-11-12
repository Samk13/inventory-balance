"use strict";
const utils = require("../utils/index.js");
class Product {
  constructor(answers) {
    this._id = utils.GenerateId();
    this._name = answers.name;
    this._category = answers.category;
    this._quantity = answers.quantity;
    this._price = answers.price;
    this._delivered = 0;
    this._sold = 0;
  }

  getProduct() {
    return {
      id: this._id,
      name: this._name,
      category: this._category,
      quantity: parseInt(this._quantity),
      price: `${this._price} KR`,
      delivered: this._delivered,
      sold: this._sold,
    };
  }

  getDelivered() {
    return this._delivered;
  }

  setDelivered(value) {
    this._delivered = value;
  }

  getCategory() {
    return this._category;
  }

  getSold() {
    return this._sold;
  }

  setSold(value) {
    this.sold = value;
    console.log(`${value} has been sold successfully`);
  }
}

module.exports = {
  Product,
};
