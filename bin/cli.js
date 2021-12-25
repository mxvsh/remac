#!/usr/bin/env node

const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
	console.log(`Running in development mode`);
	process.exit();
}

try {
	console.log(`Running in production mode`);
	const remac = require('../dist');
	remac.default();
} catch (e) {}
