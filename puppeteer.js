const gulp = require('gulp');
const webp = require('gulp-webp');
const fs = require('fs');
const input = (() => { let yaml = require('js-yaml'); return yaml.safeLoad(fs.readFileSync('locales.yaml')) })();
const sleep = require('atomic-sleep');
const pptr = require('puppeteer');

(async () => {
	try {
		const chrome = await pptr.launch();
		const page = await chrome.newPage();
		for (const i of input.shared.list)
		{
			try {
				if (i.ref) {
					console.log(`${i.href} -> ${i.ref}`);
					await page.goto(i.href);
					sleep(5000);
					await page.screenshot({ path: `img/${i.ref}.png` });
					gulp.series(gulp.src(`img/${i.ref}.png`)
							.pipe(webp())
							.pipe(gulp.dest('img/'))
					);
				} else {
					console.warn(`${i.href} !-> no ref! (skipped)`)
				}
			} catch (e) {
				console.error(e.message);
			}
		}
		await chrome.close();
	} catch (e) {
		console.error(e);
	}
})();
