import express, { Router } from 'express'
import { json, urlencoded } from 'body-parser'
// import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

const port = 3000

app.use(cors()) /* cross domain resource sharing */
app.use(json()) /* allows json description for the client */
app.use(urlencoded({ extended: true }))
// app.use(bodyParser)
app.use(
  morgan('dev')
) /* displays on the console with timing it took for the request */

// middle ware

// app.use(log) used for the entire app

// create a router instance

const router = Router()

// a route could have different verbs but same end point like so
// const routes = [get '/cat', post '/cat', get '/cat/:id']

// you can do the verbs in one line with a router from express by

router
  .route('/cat')
  .get((req, res) => {
    res.send({ value: 'a get request' })
  })
  .post((req, res) => {
    res.send(req.body)
  })

app.use('/', router)
router.get('/end', (req, res) => {
  res.send({ done: 'yes' })
})

app.use(router) /* root controller for the router */
app.use('/anotherapi', router) /* root controller for the router */

const log = (req, res, next) => {
  console.log('loging')
  next()
}

app.put('/register', log, (req, res, next) => {
  console.log(req.body)
  res.send(req.body)
  next()
})

app.get('/register', (req, res) => {
  res.send('get request')
})

export const start = () => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`)
  })
}
