const http = require('http'), fs = require('fs');

const root = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(fs.readFileSync('index.html'));
});

const callback = () => {}

root
  .listen(
    12345, 
    '127.0.0.1',
    callback
  );

const museo = folder('museo'), form = folder('new');

museo
  .listen(
    12346,
    '127.0.0.1',
    callback
  );

form
  .listen(
    12347,
    '127.0.0.1',
    callback
  )

function folder(name) {
  return http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync(`${name}/index.html`));
  })
}