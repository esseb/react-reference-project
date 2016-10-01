var express = require('express')
var router = express.Router()

// Middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', function (req, res) {
  res.send('Pets')
})

router.get('/:petId', function (req, res) {
  res.send('Pets > ' + req.params.petId)
})

module.exports = router
