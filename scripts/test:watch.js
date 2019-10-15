const { spawn } = require('child_process')
const { resolve } = require('path')
const config = resolve(__dirname, '../jest.config.js')

module.exports = function test() {
  execSync(`jest -c ${config} --watch`, { stdio: 'inherit' })
}
