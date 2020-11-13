const actions = {
  createNewProduct: "Create new product",
  listProduct: "List Product",
  sell: "Sell",
  deliver: "Deliver",
  manual: "Manually enter your commands",
};

const configValues = {
  priceMaxVal: 1000000,
  deliveredMaxVal: 1000000,
  sellMaxVal: 100000,
  defaultProductCount: 10,
  defaultPrice: 10,
  defaultDeliveredNumber: 0,
};

module.exports = {
  actions,
  configValues,
};
