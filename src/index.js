#!/usr/bin/env node

"use strict";

const { init } = require("./Controllers/UIController.js");
const { welcome } = require("./utils/index");

function main() {
  welcome();
  init();
}

main();
