import '@scss/main.scss';
import ScrollingPage from '@parts/scrolling-page';
import ScrollingLinks from '@parts/scrolling-links';

document.addEventListener('DOMContentLoaded', () => {

	const app = new ScrollingPage('.container');

	app.run().addNextScroll('.arrow-down__object');

	const links = new ScrollingLinks({
		wrapper: '.part-3__wrapper',
		target: '.range'
	})

	links.run();
});