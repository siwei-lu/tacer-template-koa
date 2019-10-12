const { resolve } = require('path')

const cwd = process.cwd()
const src = resolve(cwd, './src')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: cwd,
  moduleNameMapper: {
    '^~$': src,
    '^~/(.*)$': `${src}/$1`,
  },
}
