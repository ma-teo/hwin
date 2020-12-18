#!/usr/bin/env node
process.env.NODE_ENV = 'production'

const webpack = require('webpack')

const clientConfig = require('../config/client')
const serverConfig = require('../config/server')

const clientCompiler = webpack(clientConfig(process.env))
const serverCompiler = webpack(serverConfig(process.env))

console.log('Building...')

clientCompiler.run((err, stats) => {
  err && console.log(`${err}`)
  console.log(stats.toString({ colors: true }))
})

clientCompiler.compile(() => {
  serverCompiler.run((err, stats) => {
    err && console.log(`${err}`)
    console.log(stats.toString({ colors: true }))
  })
})
