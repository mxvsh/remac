#!/usr/bin/env node

require('colors');
const { NODE_ENV } = process.env;
const { spawn } = require('child_process');
const ConfigStore = require('configstore');
const pidusage = require('pidusage');
const { program } = require('commander');
const packageJson = require('../package.json');

program.version(packageJson.version);
program;
// process configuration
const config = new ConfigStore('remac', { pid: -1 });
const service_pid = config.get('pid');

if (NODE_ENV === 'development') {
	console.log(`Cannot run cli in development mode. Exiting...`.bold.red);
	process.exit();
}

const start = () => {
	const p = spawn('node', [__dirname + '/process.js'], {
		stdio: ['ignore'],
		detached: true,
	});
	config.set('pid', p.pid);
	console.log(`[info] remac service started`.bold.green);
	p.unref();
	process.exit(1);
};

program
	.command('start')
	.description('start the process')
	.action(() => {
		pidusage(service_pid, (err) => {
			if (err) {
				start();
				return;
			}
			console.log(`[info] remac is already running`.bold.yellow);
			process.exit();
		});
	});

program
	.command('stop')
	.description('stop the process')
	.action(() => {
		if (service_pid === -1) {
			console.log('[info] no service running'.yellow);
			return;
		}
		process.kill(service_pid);
		config.set('pid', -1);
		console.log(`[info] successfully stopped remac process`.bold.blue);
	});

program.parse(process.argv);
