const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const util = require('util')

const viewDir = path.resolve(__dirname, '../views', 'evermore')

router.get('/', (req, res) => {
  res.sendFile(path.resolve(viewDir, 'index.html'))
})

router.get('/fs', async (req, res) => {
  const readfile = util.promisify(fs.readFile)
  const fname = path.resolve(__dirname, '../README.md')
  /* readfile(fname, 'utf8')
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.json(err)
    })
  */
  try {
    const data = await readfile(fname, 'utf8')
    res.send(data)
  } catch (err) {
    res.json(err)
  }
})

router.get('/sabers', (req, res) => {
  res.render('evermore/sabers')
})

router.get('*', (req, res) => {
  res.json({error: {
    status: 404,
    message: 'Page not found'
  }})
})

module.exports = router
