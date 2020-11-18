"use strict";

var actions = {
  createNewProduct: "Create new product",
  listProduct: "List Product",
  sell: "Sell",
  deliver: "Deliver",
  manual: "Manually enter your commands"
};
var availableCommands = {
  createNewProduct: "c",
  listProduct: "L",
  sell: "S",
  deliver: "l",
  deliverAuto: "lAuto",
  sellPackage: "SP"
};
var configValues = {
  priceMaxVal: 1000000,
  deliveredMaxVal: 1000000,
  sellMaxVal: 100000,
  defaultProductCount: 100,
  defaultPrice: 10,
  defaultDeliveredNumber: 0,
  autoDeliverValues: [10, 5]
};
module.exports = {
  actions: actions,
  configValues: configValues,
  availableCommands: availableCommands
};