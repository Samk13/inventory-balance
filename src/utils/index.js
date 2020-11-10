function welcome() {
  // chalk dependency could be an option here
  console.log(
    "\x1b[33m%s\x1b[0m",
    "\n\n\n*************************************"
  );
  console.log("\033[94m", "\n** >> WELCOME TO STOCK BALANCER << **");
  console.log("\x1b[33m%s\x1b[0m", "** >> Created by Sam Arbid 2020 << **");
  console.log("\033[94m", "\n*************************************\n\n\n");
}

function GenerateId() {
  let dt = new Date();
  let seed =
    dt.getYear() +
    dt.getDay() +
    dt.getMonth() +
    dt.getHours() +
    dt.getMinutes() +
    dt.getSeconds();

  return Math.floor(Math.pow(8, 8 - 1) + Math.random() * Math.floor(seed));
}

module.exports = {
  welcome,
  GenerateId,
};
