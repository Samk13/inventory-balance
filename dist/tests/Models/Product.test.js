"use strict";

var _require = require("../../Models/Product.js"),
    Product = _require.Product;

jest.mock("../../Models/Product.js");
beforeEach(function () {
  // Clear all instances and calls to constructor and all methods:
  Product.mockClear();
});
it("Check if the consumer called the class constructor", function () {
  // eslint-disable-next-line no-unused-vars
  var consumeProduct = new Product();
  expect(Product).toHaveBeenCalledTimes(1);
});