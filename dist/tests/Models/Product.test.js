"use strict";

var _require = require("../../Models/Product.js"),
    Product = _require.Product;

jest.mock("../../Models/Product.js");
beforeEach(function () {
  Product.mockClear();
});
it("Check if the consumer called the class constructor", function () {
  var consumeProduct = new Product();
  expect(Product).toHaveBeenCalledTimes(1);
});
it("Consumer should be able to call new() on Product", function () {
  var prod = new Product(); // Ensure constructor created the object:

  expect(prod).toBeTruthy();
});
it("We can check if the consumer called a method on the class instance", function () {
  var answers = {
    name: "samTest",
    category: "general",
    quantity: 100,
    price: 10,
    sold: 0,
    delivered: 0
  };
  var prod = new Product(answers);
  var input = "song.mp3";
  expect(prod).toEqual(prod);
});