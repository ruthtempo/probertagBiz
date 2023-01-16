const puppeteer = require("puppeteer");

async function getFlats() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://learnwebcode.github.io/practice-requests/");

  await browser.close();
}

getFlats();
