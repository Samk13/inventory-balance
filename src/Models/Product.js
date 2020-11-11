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
    return this.delivered;
  }

  setDelivered(value) {
    return (this.delivered = value);
  }

  getSold() {
    return this.sold;
  }

  setSold(value) {
    return (this.sold = value);
  }
}

module.exports = {
  Product,
};
