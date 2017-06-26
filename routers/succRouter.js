const router = require('express').Router()
const fs = require('fs')
const crypto = require('crypto')

function checkAuth (req, res, next) {
  if (!req.session.user) {
    res.send('Unauthorised access. Please <a href="login">log in</a>.')
  } else {
    next()
  }
}

router.use(function (req, res, next) {
  const session = JSON.parse(fs.readFileSync('data/session.json', 'utf8'))
  if (!req.session) {
    req.session = {}
  }
  req.session = Object.assign({}, session, req.session)
  return next()
})

router.get('/', (req, res, next) => {
  res.render('successive/main', {
    title: 'Successive'
  })
})

router.get('/login', (req, res, next) => {
  res.render('successive/login')
})

router.get('/logout', (req, res, next) => {
  if (req.session.user) {
    delete req.session.user
  }
  res.redirect('login')
  return next()
})

router.post('/login', (req, res, next) => {
  const users = JSON.parse(fs.readFileSync('data/users.json', 'utf8'))
  const pw = crypto.createHash('sha256').update(req.body.password).digest('hex')
  if (users[req.body.user] && users[req.body.user].password === pw) {
    req.session.user = req.body.user
    res.redirect('todo')
    return next()
  } else {
    res.render('successive/login', {
      error: 'Username or Password not found'
    })
  }
})

router.get('/todo', checkAuth, (req, res, next) => {
  const todos = JSON.parse(fs.readFileSync('data/todos.json', 'utf8'))
  res.render('successive/todo', {
    title: 'To Do',
    todos,
    user: req.session.user
  })
})

router.post('/todo', (req, res, next) => {
  fs.writeFileSync('data/todos.json', JSON.stringify(req.body, null, 2))
  res.json(req.body)
})

router.use(function (req, res, next) {
  fs.writeFileSync('data/session.json', JSON.stringify(req.session, null, 2))
  // return next()
})

module.exports = router
