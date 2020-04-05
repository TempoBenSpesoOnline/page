const images = require('./puppeteer');
const compilation = require('./compile.js');

(async () => {
  await images();
  compilation();
})();
