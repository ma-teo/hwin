#!/usr/bin/env node
const command = process.argv[2]

switch (command) {
  case 'start':
    require('../scripts/start')
    break
  case 'build':
    require('../scripts/build')
    break
  default:
    console.log('Oops! Wrong command')
}
