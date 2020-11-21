const {
  handleInput,
  createNewProductLogic,
  listProductLogic,
} = require("../../Controllers/Logic");
const { Product } = require("../../Models/Product");

describe("handleInput", () => {
  it("handleInput should be defined", () => {
    expect(handleInput("S1")).toBeDefined();
    expect(handleInput("S1")).not.toBeFalsy();
  });
  it("should return array with splitted values", () => {
    expect(handleInput("S1")).toEqual(["S", "1", ""]);
    expect(handleInput("  S1  ")).toEqual(["S", "1", ""]);
    expect(handleInput("  SP1  ")).toEqual(["SP", "1", ""]);
    expect(handleInput("  l1  ")).toEqual(["l", "1", ""]);
  });
});

describe("createNewProductLogic function tests", () => {
  it("createNewProductLogic should return a new Product class instance", () => {
    const answers = {};
    const store = [];
    expect(createNewProductLogic(answers, Product, store)).toBeDefined();
    expect(createNewProductLogic(answers, Product, store)).not.toBeFalsy();
  });
});

describe("listProductLogic test functionality", () => {
  it("listProductLogic should list all products in stock ", () => {
    const store = [
      {
        id: 2097198,
        name: "packageItem2",
        category: "general",
        package: 1,
        quantity: 100,
        price: 10,
        delivered: 0,
        sold: 0,
        total: 0,
      },
    ];
    expect(listProductLogic(store)).not.toBeFalsy();
    expect(listProductLogic(store)).toEqual([
      {
        category: "general",
        delivered: "0 X",
        id: 2097198,
        name: "packageItem2",
        package: 1,
        price: "10 KR",
        quantity: "100 X",
        sold: "0 X",
        total: "0 KR",
      },
    ]);
  });
});
