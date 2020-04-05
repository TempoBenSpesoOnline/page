const rqr = require('requireg')

const pptr = rqr('puppeteer');
const gulp = rqr('gulp');
const webp = rqr('gulp-webp');
const fs = rqr('fs');
const input = (() => { let yaml = rqr('js-yaml'); return yaml.safeLoad(fs.readFileSync('locales.yaml')) })();
const sleep = rqr('atomic-sleep');

(async () => {
	try {
		const chrome = await pptr.launch();
		const page = await chrome.newPage();
		for (const i of input.shared.list)
		{
			try {
				console.log(`${i.href} -> ${i.ref}`);
				await page.goto(i.href);
				sleep(5000);
				await page.screenshot({ path: `files/${i.ref}.png` });
				gulp.series(gulp.src(`files/${i.ref}.png`)
						.pipe(webp())
						.pipe(gulp.dest('files/'))
				);
			} catch (e) {
				console.error(e.message);
			}
		}
		await chrome.close();
	} catch (e) {
		console.error(e);
	}
})();
