const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({opts: 'This is an opt'})
})

router.get('/lion', (req, res) => {
  res.json({opts: 'There\'s a lion in this one'})
})

router.get('*', (req, res) => {
  res.json({opts: 'That\'s a 404, sonny-jim'})
})

module.exports = router
