const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('successive/main', {
    title: 'Successive'
  })
})

module.exports = router
