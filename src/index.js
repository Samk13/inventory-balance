#!/usr/bin/env node

"use strict";

const { init, welcome } = require("./Controllers/UIController.js");

function main() {
  welcome();
  init();
}

main();
