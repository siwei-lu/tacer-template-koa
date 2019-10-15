const { spawn } = require('child_process')
const { watch } = require('rollup')
const { resolve } = require('path')
const autoExternal = require('rollup-plugin-auto-external')
const typescript = require('rollup-plugin-typescript2')

const cwd = process.cwd()
const entrypoint = resolve(cwd, 'src', 'index.ts')
const outdir = resolve(__dirname, '..', '.tmp')
const cacheRoot = resolve(__dirname, '..', '.cache')

const tsconfigDefaults = {
  exclude: ['types/'],
}

function runner() {
  let cp = null

  return () => {
    if (cp) {
      cp.kill()
      cp = null
    }

    cp = spawn('node', [outdir], {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'development',
      },
    })
  }
}

module.exports = function start() {
  const run = runner()
  const watcher = watch({
    input: entrypoint,
    output: {
      file: outdir,
      format: 'cjs',
      sourcemap: 'inline',
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
