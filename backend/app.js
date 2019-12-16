const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { dbURI, port } = require('./config/environment')
const errorHandler = require('./lib/errorHandler')
const router = require('./router')
const path = require('path')
const dist = path.join(__dirname, 'dist')

mongoose.connect(dbURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => console.log('Mongo is connected'))

const app = express()

app.use(bodyParser.json())

app.use((req, resp, next) => {
  console.log(`${req.method} to ${req.url}`)
  next()
})

app.use('/api', router)

app.use(errorHandler)

app.use('/', express.static(dist))

app.get('*', function(req, res) {
  res.sendFile(path.join(dist, 'index.html'))
})

app.use('/*', (req, res) => res.status(404).json({ message: 'Not Found' }))

app.listen(port, () => console.log(`We are good to go on port ${port}`))

module.exports = app