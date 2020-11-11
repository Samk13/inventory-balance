const { objIterator } = require("../utils/index");

const userActions = {
  type: "list",
  name: "mainMenu",
  message: "What action you wanna take?\n\n",
  choices: objIterator(actions),
};

module.exports = {
  userActions,
};
