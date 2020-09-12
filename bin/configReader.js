const fs = require('fs');

const configReader = () => {
  return JSON.parse(fs.readFileSync('./config.json').toString());
}

module.exports = {
  config: configReader()
}