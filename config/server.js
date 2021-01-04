const paths = require('./paths')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const Dotenv = require('dotenv-webpack')
const RunNodeWebpackPlugin = require('run-node-webpack-plugin')

const development = env => {
  return {
    mode: env.NODE_ENV,
    entry: {
      server: paths.serverSrc
    },
    output: {
      path: paths.serverOut,
      filename: '[name].js',
      hotUpdateChunkFilename: '[id].[fullhash:8].js',
      hotUpdateMainFilename: '[runtime].[fullhash:8].json',
    },
    target: 'node',
    externals: [
      nodeExternals()
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                require.resolve('@babel/plugin-transform-runtime')
              ],
              presets: [
                require.resolve('@babel/preset-env'),
                [
                  require.resolve('@babel/preset-react'),
                  {
                    'runtime': 'automatic'
                  }
                ]
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new Dotenv({
        silent: true
      }),
      new RunNodeWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.EnvironmentPlugin({
        STATIC_PATH: paths.publicDir
      })
    ],
    devtool: 'source-map'
  }
}

const production = env => {
  return {
    mode: env.NODE_ENV,
    entry: {
      server: paths.serverSrc,
    },
    output: {
      path: paths.serverOut,
      filename: '[name].js'
    },
    target: 'node',
    externals: [
      nodeExternals()
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                require.resolve('@babel/plugin-transform-runtime')
              ],
              presets: [
                require.resolve('@babel/preset-env'),
                [
                  require.resolve('@babel/preset-react'),
                  {
                    'runtime': 'automatic'
                  }
                ]
              ]
            }
          }
        }
      ]
    },
    plugins: [
      new Dotenv({
        silent: true
      }),
      new webpack.EnvironmentPlugin({
        STATIC_PATH: paths.clientOut
      })
    ],
    devtool: 'source-map'
  }
}

module.exports = env => env.NODE_ENV === 'production' ? production(env) : development(env)
