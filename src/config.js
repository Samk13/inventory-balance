const actions = {
  createNewProduct: "Create new product",
  listProduct: "List Product",
  sell: "Sell",
  deliver: "Deliver",
  manual: "Manually enter your commands",
};

const availableCommands = {
  createNewProduct: "c",
  listProduct: "L",
  sell: "S",
  deliver: "l",
  deliverAuto: "lAuto",
  sellPackage: "SP",
};

const configValues = {
  priceMaxVal: 1000000,
  deliveredMaxVal: 1000000,
  sellMaxVal: 100000,
  defaultProductCount: 100,
  defaultPrice: 10,
  defaultDeliveredNumber: 0,
};

module.exports = {
  actions,
  configValues,
  availableCommands,
};
