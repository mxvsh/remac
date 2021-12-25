const app = require('../dist/main');
app.init();

process.on('message', (msg) => {
	console.log(msg);
});
