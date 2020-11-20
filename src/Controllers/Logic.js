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

const sellProdLogic = (val, product, stocks) => {
  const prod = filterStocksProd(product, stocks);
  prod.sold += parseInt(val);
  prod.quantity -= parseInt(val);
  prod.total = parseInt(prod.price) * parseInt(prod.sold);
  return;
};

/**
 * Exports
 */
module.exports = {
  createNewProductLogic,
  listProductLogic,
  filterStocksProd,
  sellProdLogic,
  handleInput,
};
