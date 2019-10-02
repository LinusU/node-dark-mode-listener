const os = require('os')
const path = require('path')
const { spawn } = require('child_process')
const { EventEmitter } = require('events')
const onExit = require('signal-exit')

const kChild = Symbol('child')

function start () {
  switch (os.platform()) {
    case 'darwin': {
      const bin = path.join(__dirname, 'dark-mode-listener')
      return spawn(bin, [], { stdio: ['ignore', 'pipe', 'ignore'] })
    }
    case 'win32': {
      const bin = path.join(__dirname, 'dark-mode-listener.vbs')
      return spawn('cscript.exe', ['/Nologo', bin], { stdio: ['ignore', 'pipe', 'ignore'] })
    }
  }
}

class DarkModeListener extends EventEmitter {
  constructor () {
    super()

    const child = start()
    if (!child) return

    onExit(() => child.kill())

    child.stdout.setEncoding('utf8')
    child.stdout.on('data', (chunk) => {
      this.currentValue = chunk.trim()
      this.emit('change', chunk.trim())
    })

    this[kChild] = child
  }

  stop () {
    if (this[kChild]) this[kChild].kill()
  }
}

module.exports = new DarkModeListener()
