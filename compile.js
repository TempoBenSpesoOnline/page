const fs = require("fs"), Input = (function() {
	const yaml = require('js-yaml');
	return yaml.safeLoad(fs.readFileSync('locales.yaml'));
})();
let Output = "", Output2 = "";
const utils = {
	/**
	 * @param {String} pagename
	 */
	head: function(pagename) {
		return `<!DOCTYPE html>
<html>
	<head>
		<title>${pagename || "Home"}${Input.shared.htmlTitle}</title>
		<base id="base" />
		<meta name="viewport" content= "width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta property="og:title" content="${Input.shared.ogTitle}">
		<meta property="og:type" content="website">
		<meta property="og:description" content="${Input.shared.ogDescription}">
		<meta property="og:url" content="/">
		<meta property="og:image" content="/media/logo.png">
		<meta property="og:image:alt" content="${Input.shared.ogimageAlt}">
		<meta property="keywords" content="covid,coronavirus,tempobenspeso,tempo ben speso,casa,tempobenspesoonline,tempo ben speso online">
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
		<link rel="stylesheet" href="/no-big-title.css">
		<link rel="shortcut icon" href="/media/logo.png" type="image/png">
	</head>
`},
/**
 * @param {String} name 
 */
	body: function(name) {
		let elements = [], _tempEl = "";
		Input.shared.list.forEach((el) => {
			if (el.cat.indexOf(name) != -1) {elements.push(el)}
		});
		elements.forEach((el, id) => {
			elements[id] = `<div id="${el.ref}" class="col-md-4">
				<div class="card mb-4 shadow-sm">
					<img src="${el.img || "https://dummyimage.com/1000x1000/000/fff.png&text=(la+foto+va+qui!)"}" alt="${'Image for '+el.title}" class="card-img-top" style="width: 100%; height: 225px">
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
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a href="/" class="navbar-brand">TempoBenSpeso.online</a>
			<button class="navbar-toggler" type=button data-toggle=collapse data-target=#navbarContent aria-controls=navbarContent aria-expanded=false aria-label="Toggle navbar">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id=navbarContent>
				<ul class="navbar-nav mr-auto">
					<li class="nav-item ${(name == 'museo') ? 'active' : ''}">
						<a href="/museo" class="nav-link">${Input['<museo']} ${(name == 'museo') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
					</li>
					<li class="nav-item ${(name == 'divertimento') ? 'active' : ''}">
						<a href="/divertimento" class="nav-link">${Input['<divertimento']} ${(name == 'divertimento') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
					</li>
					<li class="nav-item ${(name == 'rivista') ? 'active' : ''}">
						<a href="/rivista" class="nav-link">${Input['<rivista']} ${(name == 'rivista') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
					</li>
					<li class="nav-item ${(name == 'libro') ? 'active' : ''}">
						<a href="/libro" class="nav-link">${Input['<libro']} ${(name == 'libro') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
					</li>
					<li class="nav-item ${(name == 'film') ? 'active' : ''}">
						<a href="/film" class="nav-link">${Input['<film']} ${(name == 'film') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
					</li>
					<li class="nav-item ${(name == 'audio') ? 'active' : ''}">
						<a href="/audio" class="nav-link">${Input['<audio']} ${(name == 'audio') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
					</li>
					<li class="nav-item ${(name == 'green') ? 'active' : ''}">
						<a href="/green" class="nav-link">${Input['<green']} ${(name == 'green') ? '<span class="sr-only">(corrente)</span>' : ''}</a>
					</li>
				</ul>
			</div>
		</nav>
		<div class="album py-5">
			<div class=container>
				<div class=row>
					${elements}
				</div>
			</div>
		</div>
		<br>
		<!--<footer style='background-color: white; position: fixed; bottom: 0'>Realizzato da <a href="https://rubenverg.com">Ruben</a> &middot; <a href="https://github.com/tempobenspesoonline">Organizzazione</a> &middot; Powered by GitHub & Netlify &middot; <a href="/fonti">Fonti</a></footer>-->
		<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	</body>
</html>`
	}
}
// Root
Output += utils.head(); //head
Output += `  <body>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a href="/" class="navbar-brand">TempoBenSpeso.online <span class="sr-only">(corrente)</span></a>
			<button class="navbar-toggler" type=button data-toggle=collapse data-target=#navbarContent aria-controls=navbarContent aria-expanded=false aria-label="Toggle navbar">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id=navbarContent>
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<a href="/museo" class="nav-link">${Input['<museo']}</a>
					</li>
					<li class="nav-item">
						<a href="/divertimento" class="nav-link">${Input['<divertimento']}</a>
					</li>
					<li class="nav-item">
						<a href="/rivista" class="nav-link">${Input['<rivista']}</a>
					</li>
					<li class="nav-item">
						<a href="/libro" class="nav-link">${Input['<libro']}</a>
					</li>
					<li class="nav-item">
						<a href="/film" class="nav-link">${Input['<film']}</a>
					</li>
					<li class="nav-item">
						<a href="/audio" class="nav-link">${Input['<audio']}</a>
					</li>
					<li class="nav-item">
						<a href="/green" class="nav-link">${Input['<green']}</a>
					</li>
					<li class="nav-item">
						<a href="/new" class="nav-link">Suggerisci un elemento</a>
					</li>
				</ul>
			</div>
		</nav>
		<h1 class="display-1">${Input["/"].title}</h1>
		<h2 class="display-2">${Input["/"].motto}</h2>
		<h3 class="display-3">${Input["/"].description}</h3>
		<div class="container marketing">
			<div class="row">
				<div class="col-lg-4">
					<img src="/img/museo.png" alt="Museo" class="rounded-circle" width=140 height=140>
					<h2>${Input["<museo"]}</h2>
					<p>${Input["<museo-desc"] || ""}</p>
					<p>
						<a href="/museo" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
				<div class="col-lg-4">
					<img src="/img/divertimento.png" alt="Divertimento" class="rounded-circle" width=140 height=140>
					<h2>${Input["<divertimento"]}</h2>
					<p>${Input["<divertimento-desc"] || ""}</p>
					<p>
						<a href="/divertimento" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
				<div class="col-lg-4">
					<img src="/img/rivista.png" alt="Rivista" class="rounded-circle" width=140 height=140>
					<h2>${Input["<rivista"]}</h2>
					<p>${Input["<rivista-desc"] || ""}</p>
					<p>
						<a href="/rivista" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
				<div class="col-lg-4">
					<img src="/img/libro.png" alt="Libro" class="rounded-circle" width=140 height=140>
					<h2>${Input["<libro"]}</h2>
					<p>${Input["<libro-desc"] || ""}</p>
					<p>
						<a href="/libro" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
				<div class="col-lg-4">
					<img src="/img/film.png" alt="Film" class="rounded-circle" width=140 height=140>
					<h2>${Input["<film"]}</h2>
					<p>${Input["<film-desc"] || ""}</p>
					<p>
						<a href="/film" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
				<div class="col-lg-4">
					<img src="/img/audio.png" alt="Audio" class="rounded-circle" width=140 height=140>
					<h2>${Input["<audio"]}</h2>
					<p>${Input["<audio-desc"] || ""}</p>
					<p>
						<a href="/audio" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
				<div class="col-lg-4"></div>
				<div class="col-lg-4">
					<img src="/img/green.png" alt="Green" class="rounded-circle" width=140 height=140>
					<h2>${Input["<green"]}</h2>
					<p>${Input["<green-desc"] || ""}</p>
					<p>
						<a href="/green" class="btn btn-secondary" role="button">Vai alla categoria »</a>
					</p>
				</div>
			</div>
		</div>
		<br>
		<!--<footer style='background-color: white; position: fixed; bottom: 0'>Realizzato da <a href="https://rubenverg.com">Ruben</a> &middot; <a href="https://github.com/tempobenspesoonline">Organizzazione</a> &middot; Powered by GitHub & Netlify &middot; <a href="/fonti">Fonti</a></footer>-->
		<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
	</body>
</html>`; //body
fs.writeFile("index.html", Output, (err) => {
	if (err) throw err;
	console.log("home done");
});
// submit
Output2 += utils.head(Input.shared.htmlTitles['form']);
Output2 += `  <body>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a href="/" class="navbar-brand">TempoBenSpeso.online <span class="sr-only">(corrente)</span></a>
			<button class="navbar-toggler" type=button data-toggle=collapse data-target=#navbarContent aria-controls=navbarContent aria-expanded=false aria-label="Toggle navbar">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id=navbarContent>
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<a href="/museo" class="nav-link">${Input['<museo']}</a>
					</li>
					<li class="nav-item">
						<a href="/divertimento" class="nav-link">${Input['<divertimento']}</a>
					</li>
					<li class="nav-item">
						<a href="/rivista" class="nav-link">${Input['<rivista']}</a>
					</li>
					<li class="nav-item">
						<a href="/libro" class="nav-link">${Input['<libro']}</a>
					</li>
					<li class="nav-item">
						<a href="/film" class="nav-link">${Input['<film']}</a>
					</li>
					<li class="nav-item">
						<a href="/audio" class="nav-link">${Input['<audio']}</a>
					</li>
					<li class="nav-item">
						<a href="/green" class="nav-link">${Input['<green']}</a>
					</li>
					<li class="nav-item">
						<a href="/new" class="nav-link">Suggerisci un elemento</a>
					</li>
				</ul>
			</div>
		</nav>
		<form data-netlify="true" name="submission" data-netlify-recaptcha="true" method="POST" style="text-align: center">
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
		</form>
		<!--<footer style='background-color: white; position: fixed; bottom: 0'>Realizzato da <a href="https://rubenverg.com">Ruben</a> &middot; <a href="https://github.com/tempobenspesoonline">Organizzazione</a> &middot; Powered by GitHub & Netlify &middot; <a href="/fonti">Fonti</a></footer>-->
	</body>
</html>`
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