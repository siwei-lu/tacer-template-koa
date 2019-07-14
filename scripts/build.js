const { rollup } = require('rollup')
const { resolve } = require('path')
const { terser } = require('rollup-plugin-terser')
const autoExternal = require('rollup-plugin-auto-external')
const typescript = require('rollup-plugin-typescript2')

const entrypoint = resolve(`${process.cwd()}/src/index.ts`)
const distPath = resolve(`${process.cwd()}/dist/index.js`)
const cacheRoot = resolve(__dirname, '../.cache')

const tsconfigDefaults = {
  exclude: ['__tests__/', 'types/'],
}

function build() {
  return rollup({
    input: entrypoint,
    plugins: [
      autoExternal(),
      typescript({
        cacheRoot,
        tsconfigDefaults,
        useTsconfigDeclarationDir: true,
      }),
      terser(),
    ],
  }).then(bundle => bundle.write({ file: distPath, format: 'cjs' }))
}

module.exports = build
