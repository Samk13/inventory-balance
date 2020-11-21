const { Product } = require("../../Models/Product.js");

jest.mock("../../Models/Product.js");

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  Product.mockClear();
});

describe("Product class testing", () => {
  it("Checks if the user called the class constructor", () => {
    // eslint-disable-next-line no-unused-vars
    const consumeProduct = new Product();
    expect(Product).toHaveBeenCalledTimes(1);
  });

  it("Create new class to be an instance of Product", () => {
    expect(new Product()).toBeInstanceOf(Product);
  });
});
