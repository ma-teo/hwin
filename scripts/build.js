#!/usr/bin/env node
const chalk = require('chalk')
const webpack = require('webpack')

const clientConfig = require('../config/client')
const serverConfig = require('../config/server')
const paths = require('../config/paths')

if (paths.clientSrc) {
  const clientCompiler = webpack(clientConfig('production'))

  clientCompiler.hooks.done.tap('done', stats => {
    if (!stats.hasErrors()) {
      console.log(chalk.green('Client Build Completed!'))

      if (paths.serverSrc) {
        const serverCompiler = webpack(serverConfig('production'))

        serverCompiler.hooks.done.tap('done', stats => {
          if (!stats.hasErrors()) {
            console.log(chalk.green('Server Build Completed!'))
          } else {
            console.log(chalk.red(stats.toJson().errors.map(({message}) => message)))
          }
        })

        serverCompiler.run()

        console.log(chalk.blue('Server Building...'))
      }
    } else {
      console.log(chalk.red(stats.toJson().errors.map(({message}) => message)))
    }
  })

  console.log(chalk.blue('Client Building...'))

  clientCompiler.run()
} else {
  console.log(chalk.red('Error! `src/client.js` file is not exist!'))
}
