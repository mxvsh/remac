import { Router } from 'express'
import { spawn } from 'child_process'

const action_route = Router()

action_route.post('/run', async (req, res) => {
  const { action } = req.body
  const { cwd, file } = action
  let file_location = file

  if (!file.includes('/')) {
    file_location = cwd + '/' + file
  }

  let logs = ''
  const child = spawn('sh', [file_location])

  child.stdout.on('data', (data) => {
    logs += Buffer.from(data).toString()
  })

  child.on('close', () => {
    res.json({ ok: true, logs })
  })
})

export { action_route }
