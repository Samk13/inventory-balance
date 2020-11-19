"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _require = require("../utils/index.js"),
    GenerateId = _require.GenerateId;

var Product = function Product(answers) {
  (0, _classCallCheck2["default"])(this, Product);
  this.id = GenerateId();
  this.name = answers.name;
  this.category = answers.category;
  this.quantity = parseInt(answers.quantity);
  this.price = parseFloat(answers.price);
  this.delivered = parseInt(answers.delivered) || 0;
  this.sold = parseInt(answers.sold) || 0;
  this.total = parseInt(answers.price) * parseInt(answers.sold) || 0;
};

module.exports = {
  Product: Product
};