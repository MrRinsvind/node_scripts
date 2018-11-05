var program = require('commander')

module.exports = program
  .version('0.1.0')
  .option('-f, --folder [type]', 'Input folder for sorting [./img]', './example')
  .option('-o, --output [type]', 'Input output folder [./dist]', './dist')
  .option('-d, --delete', 'Delete folder for sorting')
