var express = require('express')
var router = express.Router()

router.post('/login', (req, res) => {
  console.log(req.body)
  res.send('Birds home page')
})

router.post('/logout', (req, res) => {
  res.send('About birds')
})

module.exports = router
