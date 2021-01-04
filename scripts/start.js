#!/usr/bin/env node
process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const devServer = require('webpack-dev-server')

const clientConfig = require('../config/client')
const serverConfig = require('../config/server')
const devServerConfig = require('../config/devServer')
const paths = require('../config/paths')

if (paths.clientSrc) {
  const clientCompiler = webpack(clientConfig(process.env))

  const clientServer = new devServer(clientCompiler, devServerConfig)

  clientCompiler.hooks.done.tap('done', stats => {
    if (!stats.hasErrors() && paths.serverSrc) {
      const serverCompiler = webpack(serverConfig(process.env))

      serverCompiler.hooks.done.tap('done', stats => {
        console.log(stats.toString({ colors: true }))
      })

      serverCompiler.watch({}, () => {})
    }
  })

  console.log('Building...')

  clientServer.listen(5000)
} else {
  console.log('Error! `src/client.js` file is not exist!')
}
