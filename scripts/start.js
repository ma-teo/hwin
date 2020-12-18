#!/usr/bin/env node
process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const devServer = require('webpack-dev-server')

const clientConfig = require('../config/client')
const serverConfig = require('../config/server')
const devServerConfig = require('../config/devServer')

const clientCompiler = webpack(clientConfig(process.env))
const serverCompiler = webpack(serverConfig(process.env))

const clientServer = new devServer(clientCompiler, devServerConfig)

console.log('Building...')

clientServer.listen(5000, 'localhost', err => {
  err && console.log(`${err}`)

  serverCompiler.watch({}, (err, stats) => {
    err && console.log(`${err}`)
    console.log(stats.toString({ colors: true }))
  })
})
