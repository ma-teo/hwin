const fs = require('fs')
const path = require('path')

const resolve = file => path.resolve(process.cwd(), file)
const isExist = file => fs.existsSync(resolve(file)) ? resolve(file) : false

module.exports = {
  clientSrc: isExist('src/client.js'),
  serverSrc: isExist('src/server.js'),
  htmlIndexSrc: isExist('public/index.html'),
  html200Src: isExist('public/200.html'),
  swSrc: isExist('src/service-worker.js'),
  publicDir: resolve('public'),
  serverOut: resolve('build'),
  clientOut: resolve('build/public'),
}
