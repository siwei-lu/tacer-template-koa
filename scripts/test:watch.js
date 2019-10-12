const { spawn } = require('child_process')
const { resolve } = require('path')
const config = resolve(__dirname, '../jest.config.js')

module.exports = function test() {
  spawn('jest', ['-c', config, '--watch'], {
    stdio: 'inherit',
  })
}
