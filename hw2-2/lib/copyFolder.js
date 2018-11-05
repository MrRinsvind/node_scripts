const fs = require('fs')
const path = require('path')

module.exports = function (dist, watcher) {
  function copyFile(file){
    const firstsLetter = file
      .name
      .charAt(0)
      .toLowerCase()
    const dir = path.join(dist, firstsLetter)
    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir)
    }
    try{
      fs.copyFileSync(file.path, path.join(dir, file.name))
    } catch(err) {
      console.log(err)
    }
  }
  return function readFolder(base) {
    watcher.start(base)
    fs.readdir(base, (err, files) => {
      if(err){
        throw Error(err)
      }
      files.forEach((item) => {
        let localBase = path.join(base, item)
        const state = fs.statSync(localBase)
        if(state.isDirectory()){
          readFolder(localBase)
        } else {
          copyFile({ name: item, path: localBase})
        }
      })
      watcher.end(base)
    })
  }
}
