const { rollup } = require('rollup')
const { resolve } = require('path')
const { terser } = require('rollup-plugin-terser')
const autoExternal = require('rollup-plugin-auto-external')
const typescript = require('rollup-plugin-typescript2')

const cwd = process.cwd()
const entrypoint = resolve(cwd, 'src', 'index.ts')
const distFile = resolve(cwd, 'dist', 'index.js')
const cacheRoot = resolve(__dirname, '..', '.cache')

const plugins = [autoExternal(), typescript({ cacheRoot }), terser()]

const output = {
  file: distFile,
  format: 'cjs',
}

module.exports = function build() {
  return rollup({ input: entrypoint, plugins }).then(bundle =>
    bundle.write(output)
  )
}
