#!/usr/bin/env node
console.log('Building...')

const webpack = require('webpack')
const devServer = require('webpack-dev-server')

const clientConfig = require('../config/client')
const serverConfig = require('../config/server')
const devServerConfig = require('../config/devServer')

process.env.NODE_ENV = 'development'

const clientCompiler = webpack(clientConfig(process.env))
const serverCompiler = webpack(serverConfig(process.env))

const clientServer = new devServer(clientCompiler, devServerConfig)

clientServer.listen(5000, 'localhost', err => {
  err ? console.log(`${err}`) : console.log('Client Build Complete')

  serverCompiler.watch({}, err => {
    err ? console.log(`${err}`) : console.log('Server Build Complete')
  })
})
