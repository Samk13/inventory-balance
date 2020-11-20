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
  sellProduct: "S",
  deliverProduct: "l",
  sellPackage: "SP",
};

const configValues = {
  priceMaxVal: 1000000,
  deliveredMaxVal: 1000000,
  sellMaxVal: 100000,
  defaultProductCount: 100,
  defaultPrice: 10,
  defaultDeliveredNumber: 0,
  priceMinimumAmountDiscount: 3,
  priceDiscount: (1 / 4) * 100,
};

module.exports = {
  actions,
  configValues,
  availableCommands,
};
