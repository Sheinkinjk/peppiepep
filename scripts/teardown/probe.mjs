import { chromium } from 'playwright';

const SITES = [
  ['nerdwallet', 'https://www.nerdwallet.com/'],
  ['ctm',        'https://www.comparethemarket.com.au/'],
  ['finder',     'https://www.finder.com.au/'],
  ['canstar',    'https://www.canstar.com.au/'],
  ['bankrate',   'https://www.bankrate.com/'],
];

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

const b = await chromium.launch({ args: ['--disable-blink-features=AutomationControlled'] });
for (const [name, url] of SITES) {
  const ctx = await b.newContext({ userAgent: UA, viewport: { width: 1440, height: 900 }, locale: 'en-AU' });
  await ctx.addInitScript(() => Object.defineProperty(navigator, 'webdriver', { get: () => undefined }));
  const p = await ctx.newPage();
  let status = 'n/a';
  try {
    const r = await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    status = r?.status();
    await p.waitForTimeout(3000);
    const info = await p.evaluate(() => ({
      title: document.title.slice(0, 60),
      h1: document.querySelector('h1')?.textContent?.trim().slice(0, 60) || null,
      nodes: document.querySelectorAll('*').length,
      imgs: document.querySelectorAll('img').length,
      text: document.body.innerText.length,
      blocked: /just a moment|attention required|access denied|are you a robot|verify you are human|captcha/i.test(document.body.innerText.slice(0, 2000)),
    }));
    console.log(`  ${name.padEnd(11)} ${String(status).padEnd(4)} nodes=${String(info.nodes).padStart(5)} imgs=${String(info.imgs).padStart(3)} text=${String(info.text).padStart(6)} blocked=${info.blocked}  "${info.title}"`);
  } catch (e) {
    console.log(`  ${name.padEnd(11)} FAILED: ${e.message.split('\n')[0].slice(0, 70)}`);
  }
  await ctx.close();
}
await b.close();
