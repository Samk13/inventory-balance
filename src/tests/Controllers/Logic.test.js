const {
  handleInput,
  createNewProductLogic,
  listProductLogic,
  sellProdLogic,
  calculateDiscount,
  filterStocksProd,
  filterPackage,
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

describe("createNewProductLogic", () => {
  it("createNewProductLogic should return a new Product class instance", () => {
    const answers = {};
    const store = [];
    expect(createNewProductLogic(answers, Product, store)).toBeDefined();
    expect(createNewProductLogic(answers, Product, store)).not.toBeFalsy();
  });
});

describe("listProductLogic", () => {
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

describe("sellProdLogic", () => {
  const product = {
    id: 2097198,
    name: "packageItem2",
    category: "general",
    package: 1,
    quantity: 100,
    price: 10,
    delivered: 0,
    sold: 0,
    total: 0,
  };

  it("Make sure that the example has 0 values", () => {
    expect(product.sold).toEqual(0);
    expect(product.total).toEqual(0);
    expect(product.quantity).toEqual(100);
  });

  it("Throw an error if you pass wrong argument type", () => {
    expect(() => {
      sellProdLogic(undefined, product);
    }).toThrow("the value you provide is not a number");
  });

  it("Add given value to the sold object val", () => {
    sellProdLogic(1, product);
    expect(product.sold).toEqual(1);
  });

  it("Subtract the given value from quantity", () => {
    expect(product.quantity).toEqual(99);
  });

  it("Calculate the total by multiply the price by sold", () => {
    expect(product.total).toEqual(10);
  });
});

describe("Discount behaviour in sellProdLogic function", () => {
  const prod = {
    id: 2097198,
    name: "packageItem2",
    category: "general",
    package: 1,
    quantity: 100,
    price: 10,
    delivered: 0,
    sold: 0,
    total: 0,
  };
  it("Calculate the discount if the value is over 3", () => {
    sellProdLogic(4, prod);
    expect(prod.total).toEqual(32);
  });
});

describe("calculateDiscount", () => {
  it("Throw error if input is not a number", () => {
    expect(() => calculateDiscount(undefined, "blaBla")).toThrow(
      "Arguments should be a number!"
    );
  });

  it("Return truthy value if it get the right data", () => {
    expect(calculateDiscount(10, (1 / 4) * 100)).not.toBeFalsy;
  });

  it("Return the correct discount value and ceil it", () => {
    expect(calculateDiscount(10, (1 / 4) * 100)).toEqual(8);
  });
});

describe("filterStocksProd", () => {
  const stocks = [
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
    {
      id: 2097199,
      name: "packageItem3",
      category: "general",
      package: 1,
      quantity: 100,
      price: 10,
      delivered: 0,
      sold: 0,
      total: 0,
    },
  ];

  it("Return the filtered stock", () => {
    expect(filterStocksProd("packageItem2", stocks)).toEqual({
      id: 2097198,
      name: "packageItem2",
      category: "general",
      package: 1,
      quantity: 100,
      price: 10,
      delivered: 0,
      sold: 0,
      total: 0,
    });
  });

  it("Throw an error if it get wrong input", () => {
    expect(() => filterStocksProd(undefined, stocks)).toThrow(
      "Input should be a string"
    );
  });

  it("Throw error if stocks is empty", () => {
    expect(() => filterStocksProd("packageItem2", [])).toThrow(
      "Unable to filter in an empty or undefined array"
    );
  });

  it("Should not throw error if stocks is not empty", () => {
    expect(() => filterStocksProd("packageItem2", [1])).not.toThrow(
      "Unable to filter in an empty or undefined array"
    );
  });
});

describe("filterPackage", () => {
  it("should filter through package array", () => {
    const packageArray = [
      {
        id: 2097197,
        name: "packageItem1",
        category: "general",
        package: 1,
        quantity: 100,
        price: 10,
        delivered: 0,
        sold: 0,
        total: 0,
      },
      {
        id: 2097198,
        name: "packageItem2",
        category: "general",
        package: 2,
        quantity: 100,
        price: 10,
        delivered: 0,
        sold: 0,
        total: 0,
      },
    ];
    expect(filterPackage(1, packageArray)).toEqual([
      {
        id: 2097197,
        name: "packageItem1",
        category: "general",
        package: 1,
        quantity: 100,
        price: 10,
        delivered: 0,
        sold: 0,
        total: 0,
      },
    ]);
  });
});
