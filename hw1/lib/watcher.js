class Watcher{
  constructor(onComplete) {
    this.onComplete = onComplete
    this.process = []
    this.allStarted = false
  }

  startedAll() {
    this.allStarted = true
  }

  start(fileName) {
    this
      .process
      .push(fileName)
  }

  end(fileName) {
    let index = this
      .process
      .findIndex(item => {
        return item === fileName
      })
    this
      .process
      .splice(index, 1)
    this._checkForComplete()
  }

  _checkForComplete() {
    if(this.allStarted && this.process.length === 0){
      this.onComplete()
    }
  }
}

module.exports = Watcher
