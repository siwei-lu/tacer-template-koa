const { spawn } = require('child_process')
const { resolve } = require('path')
const config = resolve(__dirname, '../jest.config.js')

function test() {
  spawn('jest', ['-c', config], {
    stdio: 'inherit',
  })
}

module.exports = test
