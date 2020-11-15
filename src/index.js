const { init2, welcome } = require("./Controllers/InterfaceController.js");

const { init } = require("./Controllers/UIController.js");

function main() {
  welcome();
  init2();
}

main();
