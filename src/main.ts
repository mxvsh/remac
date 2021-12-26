import next from 'next'
import express from 'express'

const { NODE_ENV } = process.env

let dev = false

if (NODE_ENV === 'development') {
  dev = true
}

const app = next({ dev, dir: __dirname + '/..' })
const handle = app.getRequestHandler()

const init = async (port: number = 3000) => {
  await app.prepare()
  const server = express()

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err?: any) => {
    console.log(`> Ready on http://localhost:${port}`)
    if (err) throw err
  })
}

export { init }
