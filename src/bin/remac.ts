#!/usr/bin/env node

import colors from 'colors'
import { spawn } from 'child_process'
import { program } from 'commander'
import ConfigStore from 'configstore'
import pidusage from 'pidusage'
import { create_action } from '../lib/create-action'

const packageFile = require('../../package.json')

program.version(packageFile.version)

const config = new ConfigStore('remac', { pid: -1 })
const service_pid = config.get('pid')

const start = (port: string) => {
  const p = spawn('node', [__dirname + `/process.js`], {
    stdio: ['ignore'],
    detached: true,
  })
  config.set('pid', p.pid)
  p.unref()
  console.log(colors.bold.green(`[info] remac service started on port ${port}`))
  process.exit(1)
}

program
  .command('start')
  // .argument('[port]', 'port to run on')
  .description('start the process')
  .action(() => {
    pidusage(service_pid, (err) => {
      if (err) {
        start('11497')
        return
      }
      console.log(colors.bold.yellow(`[info] remac is already running`))
      process.exit()
    })
  })

program
  .command('stop')
  .description('stop the process')
  .action(() => {
    if (service_pid === -1) {
      console.log(colors.bold.yellow('[info] no service running'))
      return
    }
    config.set('pid', -1)
    try {
      process.kill(service_pid)
      console.log(colors.bold.red(`[info] successfully stopped remac service`))
    } catch (e) {
      console.log(colors.bold.yellow('[info] no service running'))
    }
  })

program
  .command('add')
  .argument('<file>', 'location of the executable')
  .argument('<label>', 'label of the action')
  .argument('[description...]', 'description of the action')
  .description('add a new action')
  .action((file, label, description = []) => {
    create_action(file, label, description.join(' '))
  })

program.parse(process.argv)
