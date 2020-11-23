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

const sellProdLogic = (val, prodObj) => {
  if (isNaN(parseInt(val))) {
    throw new Error("the value you provide is not a number");
  }
  prodObj.sold += parseInt(val);
  prodObj.quantity -= parseInt(val);
  if (
    parseInt(prodObj.sold) > parseInt(configValues.priceMinimumAmountDiscount)
  ) {
    prodObj.total =
      calculateDiscount(
        parseInt(prodObj.price),
        parseInt(configValues.priceDiscount)
      ) * parseInt(prodObj.sold);
    logYellow(
      `\nOn every ${configValues.priceMinimumAmountDiscount} products you buy, `
    );
    logYellow("you get one for FREE! ^_^\n");
    return;
  }
  prodObj.total = parseInt(prodObj.price) * parseInt(prodObj.sold);
  return;
};

const calculateDiscount = (price, discount) => {
  if (isNaN(price) || isNaN(discount)) {
    throw new Error("Arguments should be a number!");
  }
  // or floor ?
  return Math.ceil(price - (price * discount) / 100);
};

const filterStocksProd = (product, stocks) => {
  if (typeof product !== "string") {
    throw new Error("Input should be a string");
  }
  if (typeof stocks !== "object" || stocks.length === 0) {
    throw new Error("Unable to filter in an empty or undefined array");
  }
  return stocks.filter((res) => res.name === product)[0];
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
