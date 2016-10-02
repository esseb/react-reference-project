var express = require('express')
var exphbs = require('express-handlebars')
var fs = require('fs')
var path = require('path')

var pets = require('./api/pets')
var paths = require('../config/paths')

var app = express()

// Set up the view directory.
// "./views" is the default, but setting it here makes the magic explicit for
// anyone who later wonders where Express knows where to find the templates
app.set('views', './views')

// Use Handlebars as our template engine
app.engine('.hbs', exphbs({extname: '.hbs'}))
app.set('view engine', 'handlebars')

// REST API.
app.use('/api/pets', pets)

var assets = null
if (process.env.NODE_ENV === 'production') {
  assets = getAssets()

  // Static files.
  app.use(express.static(path.join(__dirname, '../build')))
}

// Load ./views/index.hbs when a GET request is made to the homepage.
app.get('/', function (req, res) {
  res.render('index.hbs', {
    title: 'React Reference Project',
    assets: assets,
  })
})

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

module.exports = app
