const { Product } = require("../../Models/Product.js");

jest.mock("../../Models/Product.js");

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Product.mockClear();
});

it("Check if the consumer called the class constructor", () => {
  const consumeProduct = new Product();
  expect(Product).toHaveBeenCalledTimes(1);
});
