#!/usr/bin/env node
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
  console.log(`${err}`)

  serverCompiler.watch({}, (err, stats) => {
    console.log(`${err}`)
    console.log(`${stats}`)
  })
})
