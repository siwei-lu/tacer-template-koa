const { spawn } = require('child_process')
const { watch } = require('rollup')
const { resolve } = require('path')
const autoExternal = require('rollup-plugin-auto-external')
const typescript = require('rollup-plugin-typescript2')

const entrypoint = resolve(`${process.cwd()}/src/index.ts`)
const distPath = resolve(`${process.cwd()}/dist/index.js`)
const cacheRoot = resolve(__dirname, '../.cache')
const bin = resolve(process.cwd(), '.bin/run.js')

const tsconfigDefaults = {
  exclude: ['__tests__/', 'types/'],
}

function runner() {
  let cp = null

  return () => {
    if (cp) {
      cp.kill()
      cp = null
    }

    cp = spawn('node', [bin], {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'development',
      },
    })
  }
}

function start() {
  const run = runner()
  const watcher = watch({
    input: entrypoint,
    output: {
      file: distPath,
      format: 'cjs',
    },
    watch: {
      clearScreen: true,
    },
    plugins: [
      autoExternal(),
      typescript({
        cacheRoot,
        tsconfigDefaults,
      }),
    ],
  })

  watcher.on('event', ({ code, error }) => {
    if (code === 'FATAL') {
      watcher.close()
      throw error
    }

    if (code === 'END') {
      run()
    }
  })
}

module.exports = start