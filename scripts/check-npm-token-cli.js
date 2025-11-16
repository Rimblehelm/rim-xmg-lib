const { runTokenCheck } = require('./check-npm-token-runner');

function main() {
  const res = runTokenCheck();
  console.log(res);
}

if (require.main === module) {
  main();
}

module.exports = { main };
