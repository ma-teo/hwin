#!/usr/bin/env node
process.env.NODE_ENV = 'production'

const webpack = require('webpack')

const clientConfig = require('../config/client')
const serverConfig = require('../config/server')

const clientCompiler = webpack(clientConfig(process.env))
const serverCompiler = webpack(serverConfig(process.env))

clientCompiler.hooks.done.tap('done', stats => {
  console.log(stats.toString({ colors: true }))
  !stats.hasErrors() && serverCompiler.run()
})

serverCompiler.hooks.done.tap('done', stats => {
  console.log(stats.toString({ colors: true }))
})

console.log('Building...')

clientCompiler.run()
