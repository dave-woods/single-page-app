const express = require('express')
const router = express.Router()
const multer = require('multer')
const axios = require('axios')
const fs = require('fs')

const upload = multer({
  dest: './tmp/uploads',
  fileFilter: function (req, file, next) {
    if (file.mimetype === 'text/xml' || (file.mimetype === 'application/octet-stream' && file.originalname.endsWith('.tml'))) {
      next(null, true)
    } else {
      next({ message: 'Filetype not allowed. Please ensure .xml' }, false)
    }
  }
}).single('tmlFile')

router.get('/', (req, res) => {
  res.render('tml/upload', {
    title: 'Upload TimeML File'
  })
})

router.post('/corpus', upload, (req, res) => {
  if (!req.file || !req.file.filename) {
    res.render('tml/data', {})
    return
  }
  const fpath = `./tmp/uploads/${req.file.filename}`
  axios.defaults.baseURL = req.protocol + '://' + req.get('host')
  axios.get(`/timeml/${req.file.filename}`)
    .then(results => {
      if (results.data && results.data.length) {
        res.render('tml/data', {
          file: req.file.originalname,
          data: results.data
        })
      } else {
        res.json({ err: 'No data found' })
      }
    })
    .catch(err => {
      res.json(err)
    })
    .then(() => {
      if (fs.existsSync(fpath)) {
        fs.unlinkSync(fpath)
      }
    })
})

router.get('*', (req, res) => {
  res.json({ error: {
    status: 404,
    message: 'Page not found'
  }})
})

module.exports = router
