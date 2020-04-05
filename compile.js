const fs = require("fs"), Input = (function() {
	const yaml = require('js-yaml');
	return yaml.safeLoad(fs.readFileSync('locales.yaml'));
})();
let Output = "", Output2 = "";
const utils = {
	/**
	 * @param {String} pagename
	 */
	head(pagename) {
		return `<!DOCTYPE html>
<html lang="it-IT">
	<head>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-162820131-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'UA-162820131-1');
	</script>

		<title>${pagename || "Home"}${Input.shared.htmlTitle}</title>
		<meta name="viewport" content= "width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta property="og:title" content="${Input.shared.ogTitle}">
		<meta property="og:type" content="website">
		<meta property="og:description" content="${Input.shared.ogDescription}">
		<meta property="og:url" content="/">
		<meta property="og:image" content="/media/logo.png">
		<meta property="og:image:alt" content="${Input.shared.ogimageAlt}">
		<meta name="description" content="${Input.shared.ogDescription}">
		<meta property="keywords" content="covid,coronavirus,tempobenspeso,tempo ben speso,casa,tempobenspesoonline,tempo ben speso online">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
		<link rel="stylesheet" href="/no-big-title.css">
		<link rel="shortcut icon" href="/media/logo.png" type="image/png">
	</head>
`},
/**
 * @param {String} name 
 */
	body(name) {
		let elements = [], _tempEl = "";
		Input.shared.list.forEach((el) => {
			if (el.cat.indexOf(name) != -1) {elements.push(el)}
		});
		elements.forEach((el, id) => {
			elements[id] = `<div id="${el.ref}" class="col-md-4">
				<div class="card mb-4 shadow-sm">
					${el.img ? `<img src="${el.img}" alt="${'Image for '+el.title}" class="card-img-top" style="width: 100%">` : ''}
					<div class="card-body">
						<h5 class="card-title">${el.title}</h5>
						<p class="card-text">
							${el.desc || ''}
							${el.warn ? `<div class="alert alert-warning">
								${el.warn}
							</div>` : ''}
							${el.info ? `<div class="alert alert-info">
								${el.info}
							</div>` : ''}
							${el.href ? `<div><a class="btn btn-outline-secondary" href="${el.href}">Vai al contenuto »</a></div>` : ''}
						</p>
						${el.sc ? `<div class="d-flex justify-content-between align-items-center">
							<div class="btn-group">
								${(function(){
									let acc = "";
									el.scat.forEach(sc => {
										acc += `<span class="badge badge-secondary">#${sc.toLowerCase()}</span>`
									});
									return acc;
								})()}
							</div>
							<small class="text-muted">${el.dateAddded}</small>
						</div>` : ''}
					</div>
				</div>
			</div>`;
		});
		elements.forEach((el) => {_tempEl += el + "\n"})
		elements = _tempEl;
		return `  <body>
		${this.navbar(name)}
		<div class="album py-5">
			<div class=container>
				<div class=row>
					${elements}
				</div>
			</div>
		</div>
		${this.foot()}
	</body>
</html>`
	},
	navbar(cur = undefined) {
		return `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<a href="/" class="navbar-brand">TempoBenSpeso.online</a>
		<button class="navbar-toggler" type=button data-toggle=collapse data-target=#navbarContent aria-controls=navbarContent aria-expanded=false aria-label="Toggle navbar">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id=navbarContent>
			<ul class="navbar-nav mr-auto">
				<li class="nav-item ${(cur == 'museo') ? 'active' : ''}">
					<a href="/museo" class="nav-link">${Input['<museo']} ${(cur == 'museo') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
				</li>
				<li class="nav-item ${(cur == 'divertimento') ? 'active' : ''}">
					<a href="/divertimento" class="nav-link">${Input['<divertimento']} ${(cur == 'divertimento') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
				</li>
				<li class="nav-item ${(cur == 'rivista') ? 'active' : ''}">
					<a href="/rivista" class="nav-link">${Input['<rivista']} ${(cur == 'rivista') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
				</li>
				<li class="nav-item ${(cur == 'libro') ? 'active' : ''}">
					<a href="/libro" class="nav-link">${Input['<libro']} ${(cur == 'libro') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
				</li>
				<li class="nav-item ${(cur == 'film') ? 'active' : ''}">
					<a href="/film" class="nav-link">${Input['<film']} ${(cur == 'film') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
				</li>
				<li class="nav-item ${(cur == 'audio') ? 'active' : ''}">
					<a href="/audio" class="nav-link">${Input['<audio']} ${(cur == 'audio') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
				</li>
				<li class="nav-item ${(cur == 'green') ? 'active' : ''}">
					<a href="/green" class="nav-link">${Input['<green']} ${(cur == 'green') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
				</li>
				<li class="nav-item ${(cur == 'new') ? 'active' : ''}">
					<a href="/new" class="nav-link">Suggerisci un elemento ${(cur == 'new') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
				</li>
			</ul>
		</div>
	</nav>`
	},
	foot() {
		return `<footer class="footer mt-auto py-3"><div class=container><span class="text-muted">&middot; Realizzato da <a href="https://rubenverg.com">Ruben</a> &middot; <a href="https://github.com/tempobenspesoonline">GitHub</a> &middot; Powered by GitHub & Netlify &middot;</div></footer>
		<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>`
	},
	customBody(body, name) {
		return `<body>${this.navbar(name)}${body}${this.foot()}</body></html>`
	}
}
// Root
Output += utils.head(); //head
Output += utils.customBody(`
		<h1 class="display-1">${Input["/"].title}</h1>
		<h2 class="display-2">${Input["/"].motto}</h2>
		<h3 class="display-3">${Input["/"].description}</h3>
		<div class="container marketing">
			<div class="row">
				<div class="col-lg-4">
					<img src="/img/museo.webp" alt="Museo" class="rounded-circle" width=140 height=140>
					<h2>${Input["<museo"]}</h2>
					<p>${Input["<museo-desc"] || ""}</p>
					<p>
						<a href="/museo" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
				<div class="col-lg-4">
					<img src="/img/divertimento.webp" alt="Divertimento" class="rounded-circle" width=140 height=140>
					<h2>${Input["<divertimento"]}</h2>
					<p>${Input["<divertimento-desc"] || ""}</p>
					<p>
						<a href="/divertimento" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
				<div class="col-lg-4">
					<img src="/img/rivista.webp" alt="Rivista" class="rounded-circle" width=140 height=140>
					<h2>${Input["<rivista"]}</h2>
					<p>${Input["<rivista-desc"] || ""}</p>
					<p>
						<a href="/rivista" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
				<div class="col-lg-4">
					<img src="/img/libro.webp" alt="Libro" class="rounded-circle" width=140 height=140>
					<h2>${Input["<libro"]}</h2>
					<p>${Input["<libro-desc"] || ""}</p>
					<p>
						<a href="/libro" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
				<div class="col-lg-4">
					<img src="/img/film.webp" alt="Film" class="rounded-circle" width=140 height=140>
					<h2>${Input["<film"]}</h2>
					<p>${Input["<film-desc"] || ""}</p>
					<p>
						<a href="/film" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
				<div class="col-lg-4">
					<img src="/img/audio.webp" alt="Audio" class="rounded-circle" width=140 height=140>
					<h2>${Input["<audio"]}</h2>
					<p>${Input["<audio-desc"] || ""}</p>
					<p>
						<a href="/audio" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
				<div class="col-lg-4"></div>
				<div class="col-lg-4">
					<img src="/img/green.webp" alt="Green" class="rounded-circle" width=140 height=140>
					<h2>${Input["<green"]}</h2>
					<p>${Input["<green-desc"] || ""}</p>
					<p>
						<a href="/green" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
			</div>
		</div>
		`, undefined); //body
fs.writeFile("index.html", Output, (err) => {
	if (err) throw err;
	console.log("home done");
});
// submit
Output2 += utils.head(Input.shared.htmlTitles['form']);
Output2 += utils.customBody(`
		<form data-netlify="true" name="submission" data-netlify-recaptcha="true" method="POST" class="ml-2">
			<label>Nome del sito: <input type="text" name="nome" placeholder="ABC def"></label><br>
			<label>URL del sito <span class="text-danger">*</span>: <input type="website" name="url" placeholder="abcdef.it/ciao" required></label><br>
			<label>Categorie <span class="text-danger">*</span>: 
				<label><input type="checkbox" name="c-museo">${Input["<museo"]}</label>
				<label><input type="checkbox" name="c-divertimento">${Input["<divertimento"]}</label>
				<label><input type="checkbox" name="c-rivista">${Input["<rivista"]}</label>
				<label><input type="checkbox" name="c-libro">${Input["<libro"]}</la>
				<label><input type="checkbox" name="c-film">${Input["<film"]}</label>
				<label><input type="checkbox" name="c-audio">${Input["<audio"]}</label>
				<label><input type="checkbox" name="c-green">${Input["<green"]}</label>
			</label><br>
			<label>Sottocategorie:
				<br><label><input type="checkbox" name="sc-idk" selected>Non lo so</label>
				<h6>➖ ${Input["<museo"]} ➖</h6>
				&Tab;<label><input type="checkbox" name="sc-musonline">Museo online</label>
				<h6>➖ ${Input["<divertimento"]} ➖</h6>
				&Tab;<label><input type="checkbox" name="sc-gioco">Gioco</label>
				&Tab;<label><input type="checkbox" name="sc-attivita">Attivitá</label>
				<h6>➖ ${Input["<rivista"]} ➖</h6>
				&Tab;<label><input type="checkbox" name="sc-tempolibero">Tempo libero</label>
				&Tab;<label><input type="checkbox" name="sc-edu">Educativo</label>
				<h6>➖ ${Input["<libro"]} ➖</h6>
				&Tab;<label><input type="checkbox" name="sc-audiobook">Audiolibro</label>
				&Tab;<label><input type="checkbox" name="sc-ebook">E-book</label>
				<h6>➖ ${Input["<film"]} ➖</h6>
				&Tab;<label><input type="checkbox" name="sc-doc">Documentario</label>
				&Tab;<label><input type="checkbox" name="sc-stream">Film in streaming</label>
				<h6>➖ ${Input["<audio"]} ➖</h6>
				&Tab;<label><input type="checkbox" name="sc-musica">Musica</label>
				&Tab;<label><input type="checkbox" name="sc-spartito">Spartito</label>
				<h6>➖ ${Input["<green"]} ➖</h6>
				&Tab;<label><input type="checkbox" name="sc-green">Materiale</label>
				&Tab;<label><input type="checkbox" name="sc-atgr">Attivitá</label>
				<h6>➖ Generale ➖</h6>
				&Tab;<label><input type="checkbox" name="sc-altro">Altro</label>
			</label><br>
			<label>Confermo che che...
				<ul>
					<li><span class="text-danger">*</span> capisco che il mio suggerimento non appare immediatamente ma verrá passato da una verifica. <input type="checkbox" name="a-verification" required /></li>
					<li><span class="text-danger">*</span> il contenuto del mio suggerimento non comprende contenuto pornografico, violento o comunque inadatto ai minori. <input type="checkbox" name="a-nsfw" required /></li>
					<li><span class="text-danger">*</span> il contenuto del mio suggerimento é in italiano, é gratuito ed é pubblico. <input type="checkbox" name="a-itfreepub" required /></li>
					<li><span class="text-danger">*</span> il contenuto del mio suggerimento é lo stesso che ho descritto. <input type="checkbox" name="a-real" required /></li>
					<li><span class="text-danger">*</span> l'aprire/utilizzare il link del suggerimento non mi porta guadagni o comunque benefici. (questo non include ovviamente i siti di tua proprietá) <input type="checkbox" name="a-referral" required /></li>
				</ul>
			</label>
			<div data-netlify-recaptcha="true"></div><br>
			<button type="submit" class="btn btn-outline-primary">Vai!</button>
		</form>`, 'new');
fs.mkdir("new", (err) => {if (err) console.log("Directory exists : new (", ""+err, ")")});
fs.writeFile("new/index.html", Output2, (err) => {
	if (err) throw err;
	console.log("form done");
});
function child(name) {
	fs.mkdir(name, (err) => {if (err) console.log("Directory exists :", name, "(", ""+err, ")")});
	fs.writeFile(name + "/index.html", utils.head(Input.shared.htmlTitles[name]) + utils.body(name), (err) => {
		if (err) throw err;
	});
	console.log(name, "done")
}
child("museo");
child("divertimento");
child("rivista");
child("libro");
child("film");
child("audio");
child("green");