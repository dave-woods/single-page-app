const express = require('express')
const router = express.Router()
const path = require('path')

const viewDir = path.resolve(__dirname, '../views', 'evermore')

router.get('/', (req, res) => {
  res.sendFile(path.resolve(viewDir, 'index.html'))
})

router.get('*', (req, res) => {
  res.json({error: {
    status: 404,
    message: 'Page not found'
  }})
})

module.exports = router
