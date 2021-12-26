import next from 'next'
import express from 'express'

const { PORT = 3000, NODE_ENV } = process.env

let dev = false

if (NODE_ENV === 'development') {
  dev = true
}

const app = next({ dev, dir: __dirname + '/..' })
const handle = app.getRequestHandler()

const init = async () => {
  await app.prepare()
  const server = express()

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(PORT, (err?: any) => {
    if (err) throw err
  })
}

export { init }
