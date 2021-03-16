const paths = require('./paths')

module.exports = {
  compress: true,
  contentBase: paths.publicDir,
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  hotOnly: true,
  port: 5000,
  quiet: true
}
