const images = require('./puppeteer');
const compilation = require('./compile3.js');

(async () => {
  await images();
  compilation();
})();
