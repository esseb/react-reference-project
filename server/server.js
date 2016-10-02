var express = require('express')
var exphbs = require('express-handlebars')

var pets = require('./api/pets')

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

// Load ./views/index.hbs when a GET request is made to the homepage.
app.get('/', function (req, res) {
  res.render('index.hbs', { title: 'React Reference Project' })
})

module.exports = app
