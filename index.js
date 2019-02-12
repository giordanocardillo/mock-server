const jsonServer = require('json-server')
const fs = require('fs')
const path = require('path')

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.use(jsonServer.bodyParser)

const files = fs.readdirSync(`${__dirname}/api`)
files.forEach(file => {
  const fileName = path.parse(file).name
  server.use(`/${fileName}`, require(`${__dirname}/api/${fileName}`))
})

server.use((req, res, next) => {
  if (res.locals.data) {
    return res.jsonp({
      success: true,
      data: res.locals.data,
    })
  }
  next()
})

server.use((err, req, res, next) => {
  if (err) {
    return res.status(err.status || 500).jsonp({
      success: false,
      error: err.message,
    })
  }
  next()
})

server.use('*', (req, res, next) => {
  res.status(404).jsonp({
    success: false,
    data: 'Not found',
  })
})

server.listen(3000, () => {
  console.log('JSON Server is running')
})
