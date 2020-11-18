"use strict";

var _require = require("../../utils/index"),
    objIterator = _require.objIterator,
    productIterator = _require.productIterator;

test("iterate throw an abject should returns an array of the values", function () {
  var values = {
    createNewProduct: "c",
    listProduct: "L",
    sell: "S",
    deliver: "l",
    deliverAuto: "lAuto",
    sellPackage: "SP"
  };
  expect(objIterator(values)).toStrictEqual(["c", "L", "S", "l", "lAuto", "SP"]);
});
test("iterate throw the product object and return an array of all obj.name with upper case ", function () {
  stocks = [{
    id: 13233,
    name: "test1",
    category: "test"
  }, {
    id: 13233,
    name: "test2",
    category: "test"
  }];
  expect(productIterator(stocks)).toStrictEqual(["Test1", "Test2"]);
});