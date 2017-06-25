const router = require('express').Router()

router.get('/', (req, res) => {
  res.render('successive/main', {
    title: 'Successive'
  })
})

router.get('/todo', (req, res) => {
  res.render('successive/todo', {
    title: 'To Do',
    todos: [
      {
        desc: 'Gradient styles',
        completed: false
      },
      {
        desc: 'Add new tasks',
        completed: false
      },
      {
        desc: 'Daily labels',
        completed: false
      },
      {
        desc: 'One completion a day',
        completed: false
      },
      {
        desc: 'Check if day is missed',
        completed: false
      },
      {
        desc: 'Grid-like styling',
        completed: false
      },
      {
        desc: 'Updateable todos',
        completed: false
      }
    ]
  })
})

module.exports = router
