const {
  assertString,
  validateUserInputQuestions,
} = require("../../Controllers/InputValidationController");
const { configValues } = require("../../config");

describe("assertString", () => {
  it("Should return true is you pass a string", () => {
    expect(assertString("Sam test")).toBeTruthy();
  });

  it("Should throw error number if input is not a string", () => {
    expect(() => assertString(123123)).toThrow(
      "Expected a string but received a number"
    );
  });

  it("Should throw error array if input is not a string", () => {
    expect(() => assertString(["testing"])).toThrow(
      "Expected a string but received a Array"
    );
  });

  it("Should throw error undefined if input is empty", () => {
    expect(() => assertString()).toThrow(
      "Expected a string but received a undefined"
    );
  });
});

describe("validateUserInputQuestions", () => {
  it("Should return false if question input did not match one of the cases ", () => {
    expect(validateUserInputQuestions("test12", "somethingElse")).toBeFalsy();
  });

  it("Should return false if input value is empty", () => {
    expect(validateUserInputQuestions("", "somethingElse")).toBeFalsy();
  });

  it("Should return false if question value is empty", () => {
    expect(validateUserInputQuestions("test", "")).toBeFalsy();
  });

  it("Should return false if all inputs values is empty", () => {
    expect(validateUserInputQuestions()).toBeFalsy();
  });
});

describe("Case: name", () => {
  it("Should return true if I input correct string ", () => {
    expect(validateUserInputQuestions("test12", "name")).toBeTruthy();
  });

  it("Should  throw error message if I input number value", () => {
    expect(() => validateUserInputQuestions(121, "name")).toThrow(
      "Expected a string but received a number"
    );
  });

  it("Should return warning string message if input is special chars value", () => {
    expect(validateUserInputQuestions("s<p@ $email char", "name")).toEqual(
      "Please enter a valid string with at least 4 chars and"
    );
  });

  it("Should return warning string message if input is less then 3 chars", () => {
    expect(validateUserInputQuestions("abc", "name")).toEqual(
      "Please enter a valid string with at least 4 chars and"
    );
  });

  it("Should return warning string message if input exceed 16 chars", () => {
    expect(
      validateUserInputQuestions("abcde samArbid potato tomato", "name")
    ).toEqual("Please enter a valid string with at least 4 chars and");
  });

  it("Should return true if you enter swedish letters", () => {
    expect(validateUserInputQuestions("bacon äöå", "name")).toBeTruthy();
  });

  it("Should return true if you enter swedish letters and spaces", () => {
    expect(
      validateUserInputQuestions("abaca abc äö å ee", "name")
    ).toBeTruthy();
  });
});

describe("Case quantity", () => {
  it("Should return true if you enter number", () => {
    expect(validateUserInputQuestions(12, "quantity")).toBeTruthy();
  });

  it("Should return true if you enter number", () => {
    expect(validateUserInputQuestions(12, "quantity")).toBeTruthy();
  });
  it("Should return true if you enter number as string", () => {
    expect(validateUserInputQuestions("12", "quantity")).toBeTruthy();
  });

  it("Should return warning message if input isNot number", () => {
    expect(validateUserInputQuestions("string", "quantity")).toEqual(
      `Please enter a valid number between 1 and ${configValues.quantityMaxVal}`
    );
  });

  it("Should return warning message if input isNot number", () => {
    expect(validateUserInputQuestions("!#¤", "quantity")).toEqual(
      `Please enter a valid number between 1 and ${configValues.quantityMaxVal}`
    );
  });

  it("Should return warning message if input exceed max allowed number", () => {
    expect(validateUserInputQuestions(1091232323, "quantity")).toEqual(
      `Please enter a valid number between 1 and ${configValues.quantityMaxVal}`
    );
  });
});

describe("Case package", () => {
  it("Should return warning message if input is not 1 or 2", () => {
    expect(validateUserInputQuestions(3, "package")).toEqual(
      "Please enter 1 or 2 only"
    );
  });
  it("Should return true if input is 1 or 2", () => {
    expect(validateUserInputQuestions(1, "package")).toEqual(true);
    expect(validateUserInputQuestions("2", "package")).toEqual(true);
  });
});

describe("Case price", () => {
  it("Should return warning message if input is not allowed", () => {
    expect(validateUserInputQuestions(312123123, "price")).toEqual(
      `Please enter a valid number between 1 and ${configValues.priceMaxVal}`
    );
  });
  it("Should return true if input is allowed", () => {
    expect(validateUserInputQuestions(12, "price")).toEqual(true);
    expect(validateUserInputQuestions("212", "price")).toEqual(true);
  });
});
describe("Case amount", () => {
  it("Should return warning message if input is not allowed", () => {
    expect(validateUserInputQuestions(312123123, "amount")).toEqual(
      `Please enter a valid number between 0 and ${configValues.maxProductCount}`
    );
  });
  it("Should return true if input is allowed", () => {
    expect(validateUserInputQuestions(12, "amount")).toEqual(true);
    expect(validateUserInputQuestions("212", "amount")).toEqual(true);
  });
});
describe("Case delivered", () => {
  it("Should return warning message if input is not allowed", () => {
    expect(validateUserInputQuestions(312123123, "delivered")).toEqual(
      `Please enter a valid number`
    );
    expect(validateUserInputQuestions("sam test string", "delivered")).toEqual(
      `Please enter a valid number`
    );
  });
  it("Should return true if input is allowed", () => {
    expect(validateUserInputQuestions(12, "delivered")).toEqual(true);
    expect(validateUserInputQuestions("212", "delivered")).toEqual(true);
  });
});
