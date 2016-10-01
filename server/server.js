var express = require('express')

// API routes
var pets = require('./api/pets')

var app = express()

app.use('/api/pets', pets)

// Respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
