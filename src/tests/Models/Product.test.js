const { Product } = require("../../Models/Product.js");

jest.mock("../../Models/Product.js");

beforeEach(() => {
  Product.mockClear();
});

it("Check if the consumer called the class constructor", () => {
  const consumeProduct = new Product();
  expect(Product).toHaveBeenCalledTimes(1);
});

it("Consumer should be able to call new() on Product", () => {
  const prod = new Product();
  // Ensure constructor created the object:
  expect(prod).toBeTruthy();
});

it("We can check if the consumer called a method on the class instance", () => {
  const answers = {
    name: "samTest",
    category: "general",
    quantity: 100,
    price: 10,
    sold: 0,
    delivered: 0,
  };
  expect(Product).not.toHaveBeenCalled();
  const prod = new Product(answers);
  expect(Product).toHaveBeenCalledTimes(1);
});
