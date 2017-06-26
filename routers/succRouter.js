const router = require('express').Router()
const fs = require('fs')

router.get('/', (req, res) => {
  res.render('successive/main', {
    title: 'Successive'
  })
})

router.get('/todo', (req, res) => {
  const todos = JSON.parse(fs.readFileSync('data/todos.json', 'utf8'))
  res.render('successive/todo', {
    title: 'To Do',
    todos
  })
})

router.post('/todo', (req, res) => {
  fs.writeFileSync('data/todos.json', JSON.stringify(req.body, null, 2))
  res.json(req.body)
})

module.exports = router
