import { chromium } from 'playwright';
const UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const b=await chromium.launch({args:['--disable-blink-features=AutomationControlled']});
async function go(url){
  const c=await b.newContext({userAgent:UA,locale:'en-AU',viewport:{width:1440,height:900}});
  await c.addInitScript(()=>Object.defineProperty(navigator,'webdriver',{get:()=>undefined}));
  const p=await c.newPage();
  await p.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
  await p.waitForTimeout(3500);
  for(const rx of [/^accept all/i,/^accept cookies/i,/^allow all/i]){
    try{const x=p.getByRole('button',{name:rx}).first(); if(await x.isVisible({timeout:1000})){await x.click();await p.waitForTimeout(700);}}catch{}}
  return {c,p};
}
{
  const {c,p}=await go('https://www.comparethemarket.com.au/car-insurance/');
  const r=await p.evaluate(()=>({
    h1:document.querySelector('h1')?.textContent?.trim().slice(0,64),
    fields:[...document.querySelectorAll('input:not([type=hidden]):not([type=submit]),select')]
      .filter(i=>i.getBoundingClientRect().height>0)
      .map(i=>({t:i.type||i.tagName.toLowerCase(),l:(i.labels?.[0]?.textContent||i.placeholder||i.name||'').trim().slice(0,40)})),
    cta:[...document.querySelectorAll('button,a')].filter(e=>/start|compare now|get quote|let'?s go|continue/i.test(e.textContent||''))
      .slice(0,4).map(e=>e.textContent.trim().replace(/\s+/g,' ').slice(0,30)),
    steps:document.body.innerText.match(/step\s*\d+\s*(of|\/)\s*\d+/i)?.[0]||null,
  }));
  console.log('=== CTM /car-insurance/ (what a category click lands on) ===');
  console.log('  h1:', r.h1);
  console.log('  step indicator:', r.steps || 'none on landing');
  console.log(`  visible form fields on the landing page: ${r.fields.length}`);
  r.fields.slice(0,8).forEach(f=>console.log(`     ${f.t.padEnd(8)} ${f.l}`));
  console.log('  start CTAs:', r.cta.join(' | ') || 'none matched');
  await c.close();
}
{
  const {c,p}=await go('https://www.nerdwallet.com/h/category/credit-cards');
  const r=await p.evaluate(()=>{
    const ctas=[...document.querySelectorAll('a')].filter(a=>/apply now|read review|compare|see rates|learn more/i.test(a.textContent||''));
    const off=ctas.filter(a=>{try{return new URL(a.href).hostname!==location.hostname}catch{return false}});
    return { h1:document.querySelector('h1')?.textContent?.trim().slice(0,64),
      total:ctas.length, offsite:off.length,
      labels:[...new Set(ctas.map(a=>a.textContent.trim().replace(/\s+/g,' ').slice(0,24)))].slice(0,8),
      offsiteHosts:[...new Set(off.map(a=>{try{return new URL(a.href).hostname}catch{return ''}}))].slice(0,5),
      rel:[...new Set(ctas.map(a=>a.rel).filter(Boolean))].slice(0,4) };
  });
  console.log('\n=== NerdWallet /best/credit-cards (what a product-row CTA does) ===');
  console.log('  h1:', r.h1);
  console.log(`  CTA links: ${r.total}, offsite: ${r.offsite}`);
  console.log('  labels:', r.labels.join(' | '));
  console.log('  offsite hosts:', r.offsiteHosts.join(', ') || 'none');
  console.log('  rel values:', r.rel.join(' | ') || 'none');
  await c.close();
}
await b.close();
