module.exports = () => {

	// Libraries
	const YAML = require('js-yaml');
	const FS = require('fs');
	let clean = require('./cleanup');
	delete console;
	const console = require('conslog');

	// Locales input
	const input = (function () { return YAML.safeLoad(FS.readFileSync('locales.yaml')) })();
	const shared = input.shared;
	const home = input['/'];
	const names = input.names;
	const descs = input.descs;

	// Modules input
	const mods = (function () { return YAML.safeLoad(FS.readFileSync('modules.yaml')) })();

	// Easy access constants
	const md = FS.mkdir;
	const mf = FS.writeFile;
	const no = false;

	// The two 'different' pages.
	let root = "";
	let form = "";

	String.prototype.replace$ = function (thisArg) {
		let array = this.split('$');
		let repls = [...arguments];
		repls.shift();
		let r = "";
		array.forEach((el, id) => {
			r += el;
			if (typeof repls[id] == "undefined" || typeof repls[id] == "null" || repls[id] === false) {
				r += '';
			} else if (typeof repls[id] == "function") {
				r += repls[id].call(thisArg);
			} else {
				r += repls[id];
			}
		});
		return r;
	};

	console.group('root');

	console.info('Started root.');

	root += mods.head.replace$(
		this,
		"Home" + shared.htmlTitle,
		shared.ogTitle,
		shared.ogDescription,
		shared.ogimageAlt,
		shared.ogDescription,
	);

	root += mods.customBody.replace$(
		this,
		mods.navbar.replace$(
			this,
			false,
			names.museo,
			false,
			false,
			names.divertimento,
			false,
			false,
			names.rivista,
			false,
			false,
			names.libro,
			false,
			false,
			names.film,
			false,
			false,
			names.audio,
			false,
			false,
			names.green,
			false,
			false,
			names.new,
			false,
		),
		mods.root.replace$(
			this,
			home.title,
			home.motto,
			home.description,
			names.museo,
			descs.museo,
			names.divertimento,
			descs.divertimento,
			names.rivista,
			descs.rivista,
			names.libro,
			descs.libro,
			names.film,
			descs.film,
			names.audio,
			descs.audio,
			names.green,
			descs.green,
		),
		mods.foot,
	);

	console.info('Finished writing root.');

	console.info('Started saving root.')
	mf('index.html', root, (e) => { if (e) console.fatal(e); })
	console.success('Home done.');

	console.ungroup();

	console.group('new');
	console.info('Started new.');

	form += mods.head.replace$(
		this,
		shared.htmlTitles.new + shared.htmlTitle,
		shared.ogTitle,
		shared.ogDescription,
		shared.ogimageAlt,
		shared.ogDescription,
	);

	form += mods.customBody.replace$(
		this,
		mods.navbar.replace$(
			this,
			false,
			names.museo,
			false,
			false,
			names.divertimento,
			false,
			false,
			names.rivista,
			false,
			false,
			names.libro,
			false,
			false,
			names.film,
			false,
			false,
			names.audio,
			false,
			false,
			names.green,
			false,
			"active",
			names.new,
			" (current)",
		),
		mods.new.replace$(
			this,
			names.museo,
			names.divertimento,
			names.rivista,
			names.libro,
			names.film,
			names.audio,
			names.green,
			names.museo,
			names.divertimento,
			names.rivista,
			names.libro,
			names.film,
			names.audio,
			names.green,
		),
		mods.formScript,
	);

	console.info("Finished writing new.");

	console.info('Started saving new.');
	md('new', e => { console.catch(e); });
	mf('new/index.html', form, e => { if (e) console.fatal(e); })
	console.success('New done.');

	console.ungroup();

	console.group('list');
	console.info('Started the similar list pages.')
	console.group('museo');
	console.info('Started museo.');
	let museo = similar('museo');
	console.info('Finished writing museo.');
	console.info('Started saving museo.');
	md('museo', e => { console.catch(e); });
	mf('museo/index.html', museo, e => { if (e) console.fatal(e); });
	console.success('Museo done.');
	console.ungroup();
	console.group('divertimento');
	console.info('Started divertimento.');
	let divertimento = similar('divertimento');
	console.info('Finished writing divertimento');
	console.info('Started saving divertimento.');
	md('divertimento', e => { console.catch(e); });
	mf('divertimento/index.html', divertimento, e => { if (e) console.fatal(e); });
	console.success('Divertimento done.');
	console.ungroup();
	console.group('rivista');
	console.info('Started rivista.');
	let rivista = similar('rivista');
	console.info('Finished writing rivista');
	console.info('Started saving rivista.');
	md('rivista', e => { console.catch(e); });
	mf('rivista/index.html', rivista, e => { if (e) console.fatal(e); });
	console.success('Rivista done.');
	console.ungroup();
	console.group('libro');
	console.info('Started libro.');
	let libro = similar('libro');
	console.info('Finished writing libro');
	console.info('Started saving libro.');
	md('libro', e => { console.catch(e); });
	mf('libro/index.html', libro, e => { if (e) console.fatal(e); });
	console.success('Libro done.');
	console.ungroup();
	console.group('film');
	console.info('Started film.');
	let film = similar('film');
	console.info('Finished writing film');
	console.info('Started saving film.');
	md('film', e => { console.catch(e); });
	mf('film/index.html', film, e => { if (e) console.fatal(e); });
	console.success('Film done.');
	console.ungroup();
	console.group('audio');
	console.info('Started audio.');
	let audio = similar('audio');
	console.info('Finished writing audio');
	console.info('Started saving audio.');
	md('audio', e => { console.catch(e); });
	mf('audio/index.html', audio, e => { if (e) console.fatal(e); });
	console.success('Audio done.');
	console.ungroup();
	console.group('green');
	console.info('Started green.');
	let green = similar('green');
	console.info('Finished writing green');
	console.info('Started saving green.');
	md('green', e => { console.catch(e); });
	mf('green/index.html', green, e => { if (e) console.fatal(e); });
	console.success('Green done.');
	console.ungroup();
	console.success('Done the similar list pages.')
	console.ungroup();

	clean.cleanup(() => {
		while (console.INDENTATION != 0) {
			console.ungroup();
		}
		console.group('Catched problems');
		console.uncatch();
		console.ungroup();
	});

	function similar(name) {
		let result = "";
		result += mods.head.replace$(
			this,
			shared.htmlTitles[name] + shared.htmlTitle,
			shared.ogTitle,
			shared.ogDescription,
			shared.ogimageAlt,
			shared.ogDescription,
		);
		result += mods.customBody.replace$(
			this,
			mods.navbar.replace$(
				this,
				function () {
					if (name == 'museo') return 'active'
					else return ''
				},
				names.museo,
				function () {
					if (name == 'museo') return ' (corrente)'
					else return ''
				},
				function () {
					if (name == 'divertimento') return 'active'
					else return ''
				},
				names.divertimento,
				function () {
					if (name == 'divertimento') return ' (corrente)'
					else return ''
				},
				function () {
					if (name == 'rivista') return 'active'
					else return ''
				},
				names.rivista,
				function () {
					if (name == 'rivista') return ' (corrente)'
					else return ''
				},
				function () {
					if (name == 'libro') return 'active'
					else return ''
				},
				names.libro,
				function () {
					if (name == 'libro') return ' (corrente)'
					else return ''
				},
				function () {
					if (name == 'film') return 'active'
					else return ''
				},
				names.film,
				function () {
					if (name == 'film') return ' (corrente)'
					else return ''
				},
				function () {
					if (name == 'audio') return 'active'
					else return ''
				},
				names.audio,
				function () {
					if (name == 'audio') return ' (corrente)'
					else return ''
				},
				function () {
					if (name == 'green') return 'active'
					else return ''
				},
				names.green,
				function () {
					if (name == 'green') return ' (corrente)'
					else return ''
				},
				false,
				names.new,
				false,
			),
			mods.elementWrapper.replace$(
				this,
				function () {
					let res = "";

					let initialElements = shared.list;
					initialElements = initialElements.filter(el => { return el.cat.indexOf(name) !== -1 });
					initialElements.forEach((el, id) => {
						initialElements[id] = mods.element.replace$(
							this,
							function () { if (el.ref) { return `id='${el.ref}'` } else { return '' } },
							function () {
								try {
									FS.readFileSync(`img/${el.ref}.webp`);
									return `<img src='/img/${el.ref}.webp' width=100% loading=lazy class="card-img-top" alt="Image for ${el.title}">`
								} catch (e) {
									console.catch(e);
									return ""
								};
							},
							el.title,
							el.desc ? el.desc : "",
							el.warn ? `<div class="alert alert-warning"><small>${el.warn}</small></div>` : "",
							el.info ? `<div class="alert alert-info"   ><small>${el.info}</small></div>` : "",
							el.href ? `<div><a class="btn btn-outline-secondary" href="${el.href}">Vai al contenuto »</a></div>` : "",
							el.sc ? `<div class="d-flex justify-content-between align-items-center"><div class="btn-group">${(function () {
								let acc = "";
								el.sc.forEach(sc => {
									acc += `<span class="badge badge-secondary">#${sc.toLowerCase()}</span>`
								});
								return acc;
							})()}</div></div>` : ''
						)
					});
					// At this point, the array initialElements contains HTML strings.

					let howManyPerCol = [0, 0, 0];

					let lengthD3 = initialElements.length / 3, lengthM3 = initialElements.length % 3;

					if (lengthM3 == 0) {
						// The elements can be safely split in three parts.
						howManyPerCol = [lengthD3, lengthD3, lengthD3];
					} else if (lengthM3 == 1) {
						// The remaining 1 element goes in the center.
						howManyPerCol = [Math.floor(lengthD3), Math.ceil(lengthD3), Math.floor(lengthD3)];
					} else if (lengthM3 == 2) {
						// The remaining 2 elements go in the first two columns.
						howManyPerCol = [Math.ceil(lengthD3), Math.ceil(lengthD3), Math.floor(lengthD3)];
					} else {
						// Something strange happened!
						console.fatal(`Stupid division: ${initialElements.length} % 3 = ${lengthM3}???`.random);
					}

					let splitInThreeParts = [[], [], []];

					splitInThreeParts[0] = initialElements.slice(0, howManyPerCol[0]);

					splitInThreeParts[1] = initialElements.slice(howManyPerCol[0], howManyPerCol[0] + howManyPerCol[1]);

					splitInThreeParts[2] = initialElements.slice(howManyPerCol[0] + howManyPerCol[1], howManyPerCol[0] + howManyPerCol[1] + howManyPerCol[2]);

					let columnified = ["", "", ""];

					columnified = ["<div class='col-lg-4'>", "<div class='col-lg-4'>", "<div class='col-lg-4'>"];

					columnified.forEach((el, id) => {
						columnified[id] = el + splitInThreeParts[id].reduce((acc, el) => {
							return acc + el;
						}, "");
					});

					columnified.forEach((el, id) => {
						columnified[id] += "</div>";
					});

					res = columnified.reduce((acc, el) => {
						return acc + el;
					}, "");

					return res;
				}
			),
			mods.foot,
		);

		return result;
	}
}