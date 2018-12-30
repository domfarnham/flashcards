import express from 'express'
import bodyParser from 'body-parser'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/cards', (req, res) => {
  res.render('card', { prompt: "Who is burried in Grant's tomb?", hint: 'Think about whose tomb it is.' })
})

app.get('/hello', (req, res) => {
  res.render('hello')
})

app.post('/hello', (req, res) => {
  console.dir(req.body)
  res.render('hello')
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
