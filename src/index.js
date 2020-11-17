// const { init2, welcome } = require("./Controllers/InterfaceController.js");

const { init, welcome } = require("./Controllers/UIController.js");

function main() {
  welcome();
  init();
}

main();
