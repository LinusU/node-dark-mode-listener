const path = require('path')
const { spawn } = require('child_process')
const { EventEmitter } = require('events')
const onExit = require('signal-exit')

const { platform } = process

let bin

if (platform === 'linux') {
  bin = path.join(__dirname, 'dark-mode-listener-linux')
} else if (platform === 'macos') {
  bin = path.join(__dirname, 'dark-mode-listener')
} else {
  throw new Error(`Unsupported platform: ${platform}`)
}

const child = spawn(bin, [], { stdio: ['ignore', 'pipe', 'ignore'] })

onExit(() => child.kill())

child.stdout.setEncoding('utf8')
child.stdout.on('data', (chunk) => {
  module.exports.currentValue = chunk.trim()
  module.exports.emit('change', chunk.trim())
})

module.exports = new EventEmitter()
module.exports.stop = () => child.kill()
