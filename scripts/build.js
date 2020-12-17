#!/usr/bin/env node
const webpack = require('webpack')

const clientConfig = require('../config/client')
const serverConfig = require('../config/server')

process.env.NODE_ENV = 'production'

const clientCompiler = webpack(clientConfig(process.env))
const serverCompiler = webpack(serverConfig(process.env))

clientCompiler.run((err, stats) => {
  console.log(`${err}`)
  console.log(`${stats}`)

  serverCompiler.run((err, stats) => {
    console.log(`${err}`)
    console.log(`${stats}`)
  })
})
