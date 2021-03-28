module.exports = env => {
  return {
    js: {
      test: /\.([jt]s|[jt]sx|mjs)$/,
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
    },
    css: {
      test: /\.(css|s[ac]ss)$/,
      use: [
        env === 'development' ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
        {
          loader: require.resolve('css-loader'),
          options: {
            url: url => url.startsWith('/') ? false : true
          }
        },
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
    svg: {
      test: /\.svg$/,
      use: [
        require.resolve('@svgr/webpack'),
        require.resolve('url-loader')
      ],
    },
    file: {
      exclude: /\.([jt]s|[jt]sx|mjs|css|s[ac]ss|html|json|svg)$/,
      loader: require.resolve('file-loader'),
      options: {
        name: 'media/[name].[contenthash:8].[ext]'
      }
    }
  }
}
