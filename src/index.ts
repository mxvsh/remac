import { init } from './main';
const dev = process.env.NODE_ENV === 'development';

if (dev) {
	init();
}

export default init;
