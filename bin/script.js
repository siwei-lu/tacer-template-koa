#!/usr/bin/env node
const readdir = require('fs').readdirSync
const { resolve } = require('path')

const scriptsPath = resolve(__dirname, '../scripts')
const scripts = readdir(scriptsPath)

const targetName = process.argv[2]
if (scripts.indexOf(`${targetName}.js`) === -1) {
  throw new Error(`No method named ${targetName}!`)
}

const params = process.argv.slice(3)
const target = require(`${scriptsPath}/${targetName}`)
target(...params)
