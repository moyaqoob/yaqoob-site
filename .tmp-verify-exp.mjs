import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({
  executablePath:
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: true,
  args: ['--disable-gpu'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 1600 });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });

const before = await page.evaluate(() => {
  const cards = [...document.querySelectorAll('.exp-card')];
  return cards.map((card) => ({
    title: card.querySelector('h3')?.textContent,
    previewCount: card.querySelectorAll('.exp-preview p').length,
    bodyOpen: card.querySelector('.exp-body')?.classList.contains('is-open'),
    techVisible:
      (card.querySelector('.exp-body .chip-row')?.getBoundingClientRect()
        .height ?? 0) > 4,
    toggleCount: card.querySelectorAll('.exp-toggle').length,
  }));
});

const toggles = await page.$$('.exp-toggle');
for (const t of toggles) await t.click();
await new Promise((r) => setTimeout(r, 500));

const after = await page.evaluate(() => {
  const cards = [...document.querySelectorAll('.exp-card')];
  return cards.map((card) => ({
    title: card.querySelector('h3')?.textContent,
    bodyOpen: card.querySelector('.exp-body')?.classList.contains('is-open'),
    hiddenBullets: card.querySelectorAll('.exp-bullets p').length,
    techVisible:
      (card.querySelector('.exp-body .chip-row')?.getBoundingClientRect()
        .height ?? 0) > 4,
  }));
});

await page.goto('http://localhost:5173/#/work', { waitUntil: 'networkidle0' });
const work = await page.evaluate(() => ({
  toggles: document.querySelectorAll('.exp-toggle').length,
  cards: document.querySelectorAll('.exp-card').length,
  openBodies: document.querySelectorAll('.exp-body.is-open').length,
}));

const about = await page.goto('http://localhost:5173/', {
  waitUntil: 'networkidle0',
});
void about;
const aboutText = await page.evaluate(
  () => document.querySelector('.about-card p')?.textContent,
);

console.log(JSON.stringify({ before, after, work, aboutText }, null, 2));
await browser.close();
