const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const AssetsPlugin = require('assets-webpack-plugin')

const development = env => {
  return {
    mode: env.NODE_ENV,
    entry: path.resolve(process.cwd(), 'src/client.js'),
    output: {
      path: path.resolve(process.cwd(), 'build/public'),
      filename: 'js/[name].js',
      hotUpdateChunkFilename: 'js/[id].[fullhash:8].js',
      hotUpdateMainFilename: 'js/[runtime].[fullhash:8].json',
      publicPath: 'http://localhost:5000/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
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
        },
        {
          test: /\.(css|s[ac]ss)$/,
          use: [
            require.resolve('style-loader'),
            require.resolve('css-loader'),
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: {
                  plugins: [
                    require.resolve('autoprefixer')
                  ]
                }
              }
            },
            require.resolve('sass-loader')
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          loader: require.resolve('file-loader'),
          options: {
            name: 'media/[name].[contenthash:8].[ext]'
          }
        }
      ]
    },
    plugins: [
      new Dotenv({
        silent: true
      }),
      new AssetsPlugin({
        path: path.resolve(process.cwd(), 'build'),
        filename: 'assets.json',
        removeFullPathAutoPrefix: true,
        entrypoints: true
      })
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    devtool: 'source-map'
  }
}

const production = env => {
  return {
    mode: env.NODE_ENV,
    entry: path.resolve(process.cwd(), 'src/client.js'),
    output: {
      path: path.resolve(process.cwd(), 'build/public'),
      filename: 'js/[name].[contenthash:8].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
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
        },
        {
          test: /\.(css|s[ac]ss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            require.resolve('css-loader'),
            {
              loader: require.resolve('postcss-loader'),
              options: {
                postcssOptions: {
                  plugins: [
                    require.resolve('autoprefixer')
                  ]
                }
              }
            },
            require.resolve('sass-loader')
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          loader: require.resolve('file-loader'),
          options: {
            name: 'media/[name].[contenthash:8].[ext]'
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new Dotenv({
        silent: true
      }),
      new CopyPlugin({
        patterns: [{
          from: 'public',
          noErrorOnMissing: true
        }]
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css'
      }),
      new AssetsPlugin({
        path: path.resolve(process.cwd(), 'build'),
        filename: 'assets.json',
        removeFullPathAutoPrefix: true,
        entrypoints: true
      })
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    devtool: 'source-map'
  }
}

module.exports = env => env.NODE_ENV === 'production' ? production(env) : development(env)
