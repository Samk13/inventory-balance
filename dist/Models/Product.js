"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var utils = require("../utils/index.js")["default"];

var Product = function Product(answers) {
  (0, _classCallCheck2["default"])(this, Product);
  this.id = utils.GenerateId();
  this.name = answers.name;
  this.category = answers.category;
  this.quantity = parseInt(answers.quantity);
  this.price = parseFloat(answers.price);
  this.delivered = parseInt(answers.delivered) || 0;
  this.sold = parseInt(answers.sold) || 0;
  this.total = parseInt(answers.price) * parseInt(answers.sold) || 0;
} // getProduct() {
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
;

module.exports = {
  Product: Product
};