const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const path = require('path')
const tml = require(path.resolve(__dirname, 'src', 'timeml.js'))
const testRouter = require('./routers/testRouter.js')
const emRouter = require('./routers/emRouter.js')
const tmlRouter = require('./routers/tmlRouter.js')
const bodyParser = require('body-parser')

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, '/src')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/test', testRouter)
app.use('/evermore', emRouter)
app.use('/tml', tmlRouter)

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'favicon.ico'))
})

app.get('/5517', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'views', 'fergusbday.html'))
})

app.get('/timeml/default/:file', tml.handleTML('defaults/'))
app.get('/timeml/:file', tml.handleTML('tmp/uploads/'))

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'src', 'index.html'))
})

app.listen(port, function () {
  console.log(`The app is listening on port ${port}.`)
})
