const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const path = require('path')
const tml = require(path.resolve(__dirname, 'src', 'timeml.js'))
const testRouter = require('./routers/testRouter.js')

app.use(express.static(path.join(__dirname, '/src')))

app.use('/test', testRouter)

app.get('/5517', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'src', 'fergusbday.html'))
})

app.get('/timeml/:file', tml.handleTML)

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'src', 'index.html'))
})

app.listen(port, function () {
  console.log(`The app is listening on port ${port}.`)
})
