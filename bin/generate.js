#!/usr/bin/env node
const { resolve } = require('path')
const generate = require('tacer-seed').default

const path = resolve(__dirname, '../template.zip')

generate('tacer-template-bin', path, process.argv[2])
