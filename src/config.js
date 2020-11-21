const actions = {
  createNewProduct: "Create new product",
  listProduct: "List Product",
  sell: "Sell",
  deliver: "Deliver",
  manual: "Manually enter your commands",
};

const availableCommands = {
  createNewProduct: "C",
  listProduct: "L",
  sellProduct: "S",
  deliverProduct: "I",
  sellPackage: "SP",
};

const configValues = {
  priceMaxVal: 1000000,
  quantityMaxVal: 500,
  deliveredMaxVal: 1000000,
  sellMaxVal: 100000,
  defaultProductCount: 100,
  maxProductCount: 1000,
  defaultPrice: 10,
  defaultDeliveredNumber: 0,
  defaultSoldNumber: 0,
  priceMinimumAmountDiscount: 3,
  priceDiscount: (1 / 4) * 100,
};

module.exports = {
  actions,
  configValues,
  availableCommands,
};
