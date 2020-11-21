const { configValues } = require("../config");
const { logYellow } = require("../utils");

const handleInput = (input) => {
  return input.trim().split(/([0-9]+)/);
};
const createNewProductLogic = (answersObj, prodClass, storeArr) =>
  storeArr.push(new prodClass(answersObj));

const listProductLogic = (stocks) => {
  const results = JSON.parse(JSON.stringify(stocks));
  results.forEach((prod) => {
    prod.delivered = `${prod.delivered} X`;
    prod.quantity = `${prod.quantity} X`;
    prod.price = `${prod.price} KR`;
    prod.total = `${prod.total} KR`;
    prod.sold = `${prod.sold} X`;
  });
  return results;
};

const filterStocksProd = (product, stocks) => {
  return stocks.filter((res) => res.name === product)[0];
};

const sellProdLogic = (val, prod) => {
  prod.sold += parseInt(val);
  prod.quantity -= parseInt(val);
  if (parseInt(prod.sold) > parseInt(configValues.priceMinimumAmountDiscount)) {
    prod.total =
      calculateDiscount(
        parseInt(prod.price),
        parseInt(configValues.priceDiscount)
      ) * parseInt(prod.sold);
    logYellow(
      `\nOn every ${configValues.priceMinimumAmountDiscount} products you buy, `
    );
    logYellow("you get one for FREE! ^_^");
    return;
  }
  prod.total = parseInt(prod.price) * parseInt(prod.sold);
  return;
};

const calculateDiscount = (price, discount) => {
  // or floor ?
  return Math.ceil(price - (price * discount) / 100);
};

const filterPackage = (answerNum, packagesArr) =>
  packagesArr.filter((prod) => parseInt(prod.package) === parseInt(answerNum));

/**
 * Exports
 */
module.exports = {
  createNewProductLogic,
  calculateDiscount,
  listProductLogic,
  filterStocksProd,
  filterPackage,
  sellProdLogic,
  handleInput,
};
