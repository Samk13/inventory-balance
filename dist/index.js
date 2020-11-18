#!/usr/bin/env node
"use strict";

var _require = require("./Controllers/UIController.js"),
    init = _require.init,
    welcome = _require.welcome;

function main() {
  welcome();
  init();
}

main();