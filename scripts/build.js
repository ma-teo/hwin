#!/usr/bin/env node
console.log('Building...')

const webpack = require('webpack')

const clientConfig = require('../config/client')
const serverConfig = require('../config/server')

process.env.NODE_ENV = 'production'

const clientCompiler = webpack(clientConfig(process.env))
const serverCompiler = webpack(serverConfig(process.env))

clientCompiler.run(err => {
  err ? console.log(`${err}`) : console.log('Client Build Complete')

  serverCompiler.run(err => {
    err ? console.log(`${err}`) : console.log('Server Build Complete')
  })
})
