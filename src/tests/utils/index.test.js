const { objIterator, productIterator } = require("../../utils/index.js");

test("iterate throw object should returns an array of the values only", () => {
  const values = {
    createNewProduct: "c",
    listProduct: "L",
    sell: "S",
    deliver: "l",
    deliverAuto: "lAuto",
    sellPackage: "SP",
  };

  expect(objIterator(values)).toEqual(["c", "L", "S", "l", "lAuto", "SP"]);
});

// test("iterate throw the product object and return an array of all obj.name with upper case ", () => {
//   const stocks = [
//     {
//       id: 13233,
//       name: "test1",
//       category: "test",
//     },
//     {
//       id: 13233,
//       name: "test2",
//       category: "test",
//     },
//   ];
//   expect(productIterator(stocks)).toEqual(["Test1", "Test2"]);
// });

test("It should Pass!", () => {
  expect(1).toBe(1);
});
