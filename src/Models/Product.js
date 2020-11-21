const { GenerateId } = require("../utils/index.js");
class Product {
  constructor(answers) {
    this.id = GenerateId();
    this.name = answers.name || "Product";
    this.package = answers.package || 1;
    this.price = parseFloat(answers.price) || 10;
    this.quantity = parseInt(answers.quantity) || 100;
    this.sold = parseInt(answers.sold) || 0;
    this.delivered = parseInt(answers.delivered) || 0;
    this.total = parseInt(answers.price) * parseInt(answers.sold) || 0;
  }
}

module.exports = {
  Product,
};
