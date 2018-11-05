const fs = require('fs')
const path = require('path')


const Watcher = require('./lib/watcher')
const del = require('del')
const program = require('./lib/commander')
program.parse(process.argv)

const watcher = new Watcher(() => {
  console.log('Sorting completed')
  if(program.delete){
    del(program.folder).then(() => {
      console.log('Input folder delete')
    })
  }
})

const copyFolder = require('./lib/copyFolder')(program.output, watcher)

if(!fs.existsSync(program.folder)) {
  console.log('Not found folder: ' + program.folder)
} else {
  if(fs.existsSync(program.output)) {
    fs.mkdirSync(program.output)
  }
  copyFolder(program.folder)
  watcher.startedAll()
}
