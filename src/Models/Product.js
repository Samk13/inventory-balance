const { GenerateId } = require("../utils/index.js");
class Product {
  constructor(answers) {
    this.id = GenerateId();
    this.name = answers.name;
    this.package = answers.package;
    this.price = parseFloat(answers.price);
    this.quantity = parseInt(answers.quantity);
    this.sold = parseInt(answers.sold);
    this.delivered = parseInt(answers.delivered);
    this.total = parseInt(answers.price) * parseInt(answers.sold) || 0;
  }
}

module.exports = {
  Product,
};
