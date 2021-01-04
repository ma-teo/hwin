module.exports = {
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
