#!/usr/bin/env node
"use strict";

var _require = require("./Controllers/UIController.js"),
    init = _require.init;

var _require2 = require("./utils/index"),
    welcome = _require2.welcome;

function main() {
  welcome();
  init();
}

main();