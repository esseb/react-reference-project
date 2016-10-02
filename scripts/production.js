process.env.NODE_ENV = 'production'

// Load environment variables from .env file. Surpress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({silent: true})

var express = require('express')
var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var clearConsole = require('react-dev-utils/clearConsole')

var paths = require('../config/paths')
var app = require('../server/server')
var handleRender = require('../build/handle-render')

var assets = getAssets()

// Static files.
app.use(express.static(path.join(__dirname, '../build')))

// Serve normal requests with our handleRender function.
app.get('*', handleRender(assets))

// Get paths of JS and CSS assets from the build directory
function getAssets () {
  var jsFiles = fs.readdirSync(path.join(paths.appBuild, 'static/js'))
    .filter(file => path.extname(file) === '.js')
    .map(file => path.join('static/js/', file))

  var cssFiles = fs.readdirSync(path.join(paths.appBuild, 'static/css'))
    .filter(file => path.extname(file) === '.css')
    .map(file => path.join('static/css/', file))

  return {
    js: jsFiles,
    css: cssFiles,
  }
}

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
