"use strict";

var chalk = require("chalk");

var _require = require("../Store/index.js"),
    stocks = _require.stocks;

function GenerateId() {
  var dt = new Date();
  var seed = dt.getYear() + dt.getDay() + dt.getMonth() + dt.getHours() + dt.getMinutes() + dt.getSeconds();
  return Math.floor(Math.pow(8, 8 - 1) + Math.random() * Math.floor(seed));
}

var objIterator = function objIterator(val) {
  return Object.values(val);
};

var productIterator = function productIterator(arr) {
  var result = [];

  for (var i = 0; i < stocks.length; i++) {
    result.push(arr[i].name.charAt(0).toUpperCase() + arr[i].name.slice(1));
  }

  return result;
};

var logGreen = function logGreen(log) {
  return console.log(chalk.green(log));
};

var logBlue = function logBlue(log) {
  return console.log(chalk.blue(log));
};

var logYellow = function logYellow(log) {
  return console.log(chalk.yellow(log));
};

var logRed = function logRed(log) {
  return console.log(chalk.bold.red(log));
};

var welcome = function welcome() {
  logYellow("\n\n\n*************************************");
  logBlue("\n** >> WELCOME TO STOCK BALANCER << **");
  logYellow("** >> Created by Sam Arbid 2020 << **");
  logBlue("\n*************************************\n\n\n");
};

module.exports = {
  objIterator: objIterator,
  productIterator: productIterator,
  GenerateId: GenerateId,
  logGreen: logGreen,
  logYellow: logYellow,
  logRed: logRed,
  logBlue: logBlue,
  welcome: welcome
};