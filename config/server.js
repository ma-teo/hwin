const paths = require('./paths')
const babel = require('./babel')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack')
const RunNodeWebpackPlugin = require('run-node-webpack-plugin')

module.exports = env => {
  return {
    mode: env,
    entry: {
      server: paths.serverSrc
    },
    output: {
      path: paths.serverOut,
      filename: '[name].js',
      hotUpdateChunkFilename: '[id].[fullhash:8].js',
      hotUpdateMainFilename: '[runtime].[fullhash:8].json',
    },
    devtool: 'source-map',
    target: 'node',
    externals: [
      nodeExternals()
    ],
    module: {
      rules: [
        babel
      ]
    },
    plugins: [
      new Dotenv({
        silent: true
      }),
      env === 'development' && new RunNodeWebpackPlugin(),
      env === 'development' && new webpack.HotModuleReplacementPlugin(),
      new webpack.EnvironmentPlugin({
        STATIC_PATH: env === 'development' ? paths.publicDir : paths.clientOut
      })
    ].filter(Boolean)
  }
}
