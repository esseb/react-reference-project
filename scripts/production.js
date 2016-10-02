process.env.NODE_ENV = 'production'

// Load environment variables from .env file. Surpress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true})

var chalk = require('chalk')
var clearConsole = require('react-dev-utils/clearConsole')

var app = require('../server/server')

function runProductionServer (host, port, protocol) {
  app.listen(port, (err, result) => {
    if (err) {
      return console.log(err)
    }

    clearConsole()
    console.log(chalk.cyan('Production server started.'))
    console.log()
  })
}

function run (port) {
  var protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
  var host = process.env.HOST || 'localhost'
  runProductionServer(host, port, protocol)
}

run(3000)
