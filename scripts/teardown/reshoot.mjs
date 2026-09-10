import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const b=await chromium.launch({args:['--disable-blink-features=AutomationControlled']});
const ctx=await b.newContext({userAgent:UA,locale:'en-AU',viewport:{width:1440,height:900},deviceScaleFactor:2});
await ctx.addInitScript(()=>Object.defineProperty(navigator,'webdriver',{get:()=>undefined}));
const p=await ctx.newPage();
await p.goto('https://www.comparethemarket.com.au/',{waitUntil:'domcontentloaded',timeout:60000});
await p.waitForTimeout(3500);
for (const rx of [/^accept all/i,/^accept cookies/i,/^allow all/i]) {
  try{const btn=p.getByRole('button',{name:rx}).first();
    if(await btn.isVisible({timeout:1200})){await btn.click();await p.waitForTimeout(800);}}catch{}
}
await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
await p.waitForTimeout(2000);
await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
await p.waitForTimeout(1200);
console.log('  scrollY at capture:', await p.evaluate(()=>window.scrollY));
await p.screenshot({path:'scripts/teardown/shots/ctm-d-hero.png'});
await b.close();
