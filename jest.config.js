const { resolve } = require('path')

const cwd = process.cwd()
const src = resolve(cwd, './src')
const { compilerOptions } = require(resolve(cwd, './tsconfig.json'))

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: process.cwd(),
  testMatch: ['<rootDir>/__tests__/**/*.ts'],
  moduleNameMapper: {
    '^~$': src,
    '^~/(.*)$': `${src}/$1`,
  },
}
