#!/usr/bin/env node
process.env.NODE_ENV = 'production'
process.env.SCRIPT = 'export'

const webpack = require('webpack')

const serverConfig = require('../config/server')

const serverCompiler = webpack(serverConfig(process.env))

serverCompiler.hooks.done.tap('done', stats => {
  console.log(stats.toString({ colors: true }))
  !stats.hasErrors() && require(process.cwd() + '/build/export')
})

console.log('Building...')

serverCompiler.run()
