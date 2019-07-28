const { rollup } = require('rollup')
const { resolve } = require('path')
const { terser } = require('rollup-plugin-terser')
const autoExternal = require('rollup-plugin-auto-external')
const typescript = require('rollup-plugin-typescript2')

const cwd = process.cwd()
const entrypoint = resolve(cwd, 'src', 'index.ts')
const distFile = resolve(cwd, 'dist', 'index.js')
const cacheRoot = resolve(__dirname, '..', '.cache')

const tsconfigDefaults = {
  exclude: ['__tests__/', 'types/'],
}

const isDevelopment = process.env.NODE_ENV === 'development'

const plugins = [
  autoExternal(),
  typescript({
    cacheRoot,
    tsconfigDefaults,
    useTsconfigDeclarationDir: true,
  }),
]

const output = {
  file: distFile,
  format: 'cjs',
}

function build() {
  if (!isDevelopment) {
    plugins.push(terser())
  } else {
    output.sourcemap = 'inline'
  }

  return rollup({
    input: entrypoint,
    plugins,
  }).then(bundle => bundle.write(output))
}

module.exports = build
