import next from 'next'
import express from 'express'
import { action_route } from './api'

const { NODE_ENV } = process.env

let dev = false

if (NODE_ENV === 'development') {
  dev = true
}

const app = next({ dev, dir: __dirname + '/..' })
const handle = app.getRequestHandler()

const init = async (port: number = 11497) => {
  await app.prepare()
  const server = express()

  server.use(express.json())

  server.use('/api/action', action_route)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err?: any) => {
    console.log(`> Ready on http://localhost:${port}`)
    if (err) throw err
  })
}

export { init }
