const express = require('express');
const app = express();

const puppeteer = require('puppeteer');
const fs = require('fs');

const port = 3000;
app.use(express.static('p5sketch'));

const server = app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`);

  const canvas = await page.$('#defaultCanvas0');
  await canvas.screenshot({path: "./images/sketch.png"});

  await page.close();
  await browser.close();
  server.close();

  console.log('Done!');
})();
