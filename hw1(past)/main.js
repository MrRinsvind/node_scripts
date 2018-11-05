const fs = require('fs');
const path = require('path');
const del = require('del')
const base = path.normalize('./example')

const searchFiles = (base, move) => {
  const files = fs.readdirSync(base)
  files.forEach((item) => {
    let localBase = path.join(base, item)
    let state = fs.statSync(localBase)
    if (state.isDirectory()) {
      searchFiles(localBase, move)
    } else {
      move(item, localBase, base)
    }
  })
}

const moveToResult = (item, url, directiry) => {
  if(!fs.existsSync(`./result/${item[0]}`)){
    fs.mkdirSync(`./result/${item[0]}`)
  }
  fs.rename(url, `./result/${item[0]}/${item}`, (err) => {
    if (err) throw err
  })

}


const  startScript = async () => {
  if(!fs.existsSync('./result')){
    fs.mkdirSync('./result')
  }
  await searchFiles(base, moveToResult)
  del(base)
}

startScript()
