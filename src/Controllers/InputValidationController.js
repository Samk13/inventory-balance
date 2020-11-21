const { configValues } = require("../config.js");
function assertString(input) {
  const isString = typeof input === "string" || input instanceof String;

  if (!isString) {
    let invalidType = typeof input;
    if (input === null) invalidType = "null";
    else if (invalidType === "object") invalidType = input.constructor.name;

    throw new TypeError(`Expected a string but received a ${invalidType}`);
  } else {
    return true;
  }
}

//  I can use a library to better validate edge cases but I decided to write it my self for now

const validateUserInputQuestions = (value, questionString) => {
  if (questionString === "name") {
    if (assertString(value)) {
      let pass = value.match(
        /(?=^.{3,16}$)([A-Za-z]{1})([A-Za-z0-9äöå_ ]{3,16})$/i
      );
      if (pass) {
        return true;
      }

      return "Please enter a valid string with at least 4 chars and ";
    }
  } else if (questionString === "quantity") {
    if (Math.sign(value) === 1 && value <= configValues.quantityMaxVal) {
      return true;
    }

    return `Please enter a valid number between 1 and ${configValues.quantityMaxVal}`;
  } else if (questionString === "package") {
    if (Math.sign(value) === 1 && value <= 2) {
      return true;
    }

    return "Please enter 1 or 2 only";
  } else if (questionString === "price") {
    if (
      Math.sign(parseInt(value)) === 1 &&
      parseInt(value) < configValues.priceMaxVal
    ) {
      return true;
    }
    return `Please enter a valid number between 1 and ${configValues.priceMaxVal}`;
  } else if (questionString === "sold") {
    if (!isNaN(value) && value >= 0 && value <= configValues.priceMaxVal) {
      return true;
    }
    return `Please enter a valid number between 0 and ${configValues.priceMaxVal}`;
  } else if (questionString === "amount") {
    if (
      !isNaN(parseInt(value)) &&
      value > 0 &&
      parseInt(value) < configValues.maxProductCount
    ) {
      return true;
    }
    // limit the max value with maxProductCount fot now
    return `Please enter a valid number between 0 and ${configValues.maxProductCount}`;
  } else if (questionString === "delivered") {
    if (!isNaN(value) && value >= 0 && value <= configValues.deliveredMaxVal) {
      return true;
    }
    return "Please enter a valid number";
  } else {
    console.log(
      "Your input did not match any case, you probably doing something wrong here "
    );
    return false;
  }
  return false;
};

module.exports = {
  validateUserInputQuestions,
  assertString,
};
