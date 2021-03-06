const paths = require('./paths')
const modules = require('./modules')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const development = env => {
  return {
    mode: env,
    entry: paths.clientSrc,
    output: {
      path: paths.clientOut,
      filename: 'js/[name].js',
      hotUpdateChunkFilename: 'js/[id].[fullhash:8].js',
      hotUpdateMainFilename: 'js/[runtime].[fullhash:8].json',
      publicPath: 'http://localhost:5000/'
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        name: 'vendors',
        chunks: 'all'
      }
    },
    devtool: 'source-map',
    module: {
      rules: [
        modules(env).js,
        modules(env).css,
        modules(env).svg,
        modules(env).file
      ]
    },
    plugins: [
      new Dotenv({
        silent: true
      }),
      paths.htmlIndexSrc && new HtmlWebpackPlugin({
        template: paths.htmlIndexSrc,
        filename: 'index.html'
      }),
      paths.html200Src && new HtmlWebpackPlugin({
        template: paths.html200Src,
        filename: '200.html'
      }),
      paths.serverSrc && new AssetsPlugin({
        path: paths.serverOut,
        filename: 'assets.json',
        removeFullPathAutoPrefix: true,
        entrypoints: true
      })
    ].filter(Boolean)
  }
}

const production = env => {
  return {
    mode: env,
    entry: paths.clientSrc,
    output: {
      path: paths.clientOut,
      filename: 'js/[name].[contenthash:8].js',
      publicPath: '/'
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        name: 'vendors',
        chunks: 'all'
      }
    },
    devtool: 'source-map',
    module: {
      rules: [
        modules(env).js,
        modules(env).css,
        modules(env).svg,
        modules(env).file
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv({
        silent: true
      }),
      new CopyPlugin({
        patterns: [{
          from: paths.publicDir,
          noErrorOnMissing: true,
          globOptions: {
            ignore: [
              '**/200.html',
              '**/index.html'
            ]
          }
        }]
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css'
      }),
      paths.htmlIndexSrc && new HtmlWebpackPlugin({
        template: paths.htmlIndexSrc,
        filename: 'index.html'
      }),
      paths.html200Src && new HtmlWebpackPlugin({
        template: paths.html200Src,
        filename: '200.html'
      }),
      paths.swSrc
        ? new InjectManifest({
          swSrc: paths.swSrc,
          exclude: ['CNAME']
        })
        : new GenerateSW({
          skipWaiting: true,
          navigateFallback: paths.html200Src ? '200.html' : paths.htmlIndexSrc ? 'index.html' : undefined,
          navigateFallbackDenylist: [/\/[^/?]+\.[^/]+$/],
          exclude: ['CNAME']
        }),
      paths.serverSrc && new AssetsPlugin({
        path: paths.serverOut,
        filename: 'assets.json',
        removeFullPathAutoPrefix: true,
        entrypoints: true
      })
    ].filter(Boolean)
  }
}

module.exports = env => env === 'production' ? production(env) : development(env)
