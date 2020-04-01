# Come posso modificare i testi?
É facilissimo! Nel file `locales.json`, ad ogni testo (_value_) corrisponde una _key_, cioé quella parte a **sinistra** dell'uguale.
La key **non** va modificata, é quella che fa funzionare il sito.
Tu puoi modificare le value.
Le value possono non essere solo di testo, ma anche di _lista_ o di _modulo_.
Una lista o _array_, delimitata da `[` e `]`, contiene una serie di _value_, che possono essere testi o moduli (o altre liste, ma qui non ce ne sono).
Un modulo o _oggetto_, delimitato da `{` e `}`, é semplicemente un altro blocco di _key-value pairs_, cioé key e value uniti da `:` (come puoi vedere, tutto il documento é in realtá un modulo, delimitato da `{}`.).
## Ok, ma cosa devo modificare?
### `shared`
Nella key `shared` ci sono i testi per i titoli, le preview e la lista delle cose da fare.
|_Key_|Contenuto|Tipo|
|---|---|---|
|`htmlTitle`|Il titolo che vedi nella tab del browser (preceduto da Home o la _entry_ in `htmlTitles`|Testo|
|`ogTitle`|Il titolo che vedi nella preview che c'é ad esempio su WhatsApp o Facebook|Testo|
|`ogDescription`|La descrizione nella preview|
|`ogimageAlt`|Il testo che c'é in preview quando l'immagine non carica o per _screen-reader_|Testo|
|`htmlTitles`|Nella tab del browser, la parte che viene prima dell'`htmlTitle`. (se vuoi lo posso spostare a dopo, np)|Array[Testo]|
|`list`|Una lista con tutte le cose da fare, spiegata dopo.|Array[Modulo]|
### `/`
Dopo `shared`, c'é `/`. `/` indica le cose presenti _solo_ nella home (tipi: Testo).
|_Key_|Contenuto|
|---|---|
|`title`|Il titolo in cima, io non lo cambierei tanto perché il sito alla fine é quello...|
|`motto`|Un sottotitolo che fa parte del nome|
|`description`|la descrizione di cos'é il sito|
### Key `#`
Ultime, ci sono le key che iniziano con `#`. Queste rappresentano il titolo della categoria, ad esempio `#museo` é il titolo della categoria dei musei. (tipo: Testo)
### `list`: cosa c'é dentro?
List é un Array[Modulo], quindi una lista con dentro tanti gruppi di valori (in questo caso punti dell'elenco).
Per ogni oggetto:
|_Key_|Contenuto|Tipo|
|---|---|---|
|`cat`|Categorie in cui va il punto. Se vuoi, modificale.|Array[Testo]|
|`ref`|'Codice' assegnato al punto, accessibile a `tempobenspeso.online/<pagina>/#<ref>`|Testo
|`text`|Descrizione del link|Testo|
|`href`|Link del sito, non cambiarlo.|Testo|
|`info`|(Opzionale) Eventuali informazioni su come usufruire del punto|Testo\*|
|`warn`|(Opzionale) Eventuali informazioni **necessarie** per usufruire del punto.|Testo\*|
\*: potrebbe contenere codice HTML, in qual caso **non** modificare le cose contenute tra &lt; e &gt; (oppure chiamami e basta)
## Aggiungere
Puoi ovviamente aggiungere cose, basta aggiungere un elemento alla lista (aggiungi una virgola dopo l'ultimo, peró.)
## Quando hai modificato qualcosa, dimmelo che devo ricompilare.
## Trivia
- Non ho la piú pallida idea di perché le key sono in inglese
- Il tipo 'testo' si chiama in veritá Stringa
- É stranissimo usare i nomi italiani delle cose, quindi se vuoi puoi dire string/object/array al posto di stringa/oggetto/lista.
- Le key `href` si chiamano cosí perché in HTML un link si indica con `<a href="<link>">testo</a>`