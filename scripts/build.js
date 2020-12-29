#!/usr/bin/env node
process.env.NODE_ENV = 'production'

const webpack = require('webpack')

const clientConfig = require('../config/client')
const serverConfig = require('../config/server')
const paths = require('../config/paths')

if (paths.clientSrc) {
  const clientCompiler = webpack(clientConfig(process.env))

  clientCompiler.hooks.done.tap('done', stats => {
    console.log(stats.toString({ colors: true }))

    if (!stats.hasErrors() && paths.serverSrc) {
      const serverCompiler = webpack(serverConfig(process.env))

      serverCompiler.hooks.done.tap('done', stats => {
        console.log(stats.toString({ colors: true }))
      })

      serverCompiler.run()
    }
  })

  console.log('Building...')

  clientCompiler.run()
} else {
  console.log('Error! `src/client.js` file is not exist!')
}
