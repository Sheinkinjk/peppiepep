/**
 * READ-ONLY. Parts 3, 5, 6 and 8 in one pass over the rendered HTML:
 * self-answer tokens, emitted JSON-LD, provenance markers, page shape.
 * Writes reports/raw/content-signals.json.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = ".next/server/app";
const sitemap = new Set(fs.readFileSync("reports/raw/sitemap.txt","utf8").split("\n").map(s=>s.trim()).filter(Boolean));
const CODES = ["REFERRAL120","REFERAL55","referlab2mf","REFERLABS"];

const noScripts = (h:string)=>h.replace(/<script[\s\S]*?<\/script>/g,"").replace(/<!-- -->/g,"");
const plain = (h:string)=>noScripts(h).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
const unesc = (s:string)=>s.replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#x27;|&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&nbsp;/g," ");

function chromeless(h:string){
  return noScripts(h).replace(/<header[\s\S]*?<\/header>/g,"").replace(/<footer[\s\S]*?<\/footer>/g,"").replace(/<nav[\s\S]*?<\/nav>/g,"");
}

const rows:any[]=[];
(function walk(dir:string){
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory()) walk(p);
    else if(e.name.endsWith(".html")){
      let route="/"+path.relative(OUT,p).replace(/\.html$/,"");
      if(route==="/index") route="/";
      if(!sitemap.has(route)) continue;
      const raw=fs.readFileSync(p,"utf8");
      const body=chromeless(raw);
      const btxt=unesc(plain(body));

      // PART 3 — target query + self-answer tokens
      const title=unesc(plain(raw.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]??""));
      const h1=unesc(plain(raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]??""));
      const desc=unesc(raw.match(/<meta name="description" content="([^"]*)"/)?.[1]??"");
      const codesInRaw=CODES.filter(c=>body.includes(c));
      const dollar=/\$\d[\d,]*/.test(btxt);
      const dated=/\b\d{1,2} (January|February|March|April|May|June|July|August|September|October|November|December) 20\d\d\b/.test(btxt);
      const first200=btxt.split(" ").slice(0,200).join(" ");
      const firstCta=body.search(/rel="[^"]*sponsored/);
      const firstFact=body.search(/<p[^>]*>/);
      // PART 5 — emitted JSON-LD
      const types:string[]=[]; const problems:string[]=[];
      for(const m of raw.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)){
        let d:any; try{ d=JSON.parse(unesc(m[1])); }catch{ problems.push("unparseable JSON-LD"); continue; }
        for(const n of (Array.isArray(d)?d:[d])){
          if(!n||typeof n!=="object") continue;
          types.push(n["@type"]);
          if(n["@type"]==="Article"){ if(!n.author) problems.push("Article missing author"); if(!n.dateModified) problems.push("Article missing dateModified"); }
          if(n["@type"]==="FAQPage") for(const q of n.mainEntity??[]) if(!btxt.includes(q.name)) problems.push(`FAQ question not visible: "${String(q.name).slice(0,60)}"`);
          if(n["@type"]==="Offer"){ if(n.priceValidUntil) problems.push("Offer has priceValidUntil"); if(n.price&&!btxt.includes(String(n.price))) problems.push(`Offer price ${n.price} not on page`); }
          for(const [k,v] of Object.entries(n)) if(v===null||v===""||v==="TBD") problems.push(`null/placeholder: ${k}`);
        }
      }
      // PART 6 — provenance
      const outboundHosts=[...new Set([...body.matchAll(/href="https?:\/\/(?:www\.)?([^/"?]+)/g)].map(m=>m[1]))].filter(h=>!h.includes("referlabs"));
      const observations=[...btxt.matchAll(/[^.]{0,80}(last checked|verified by refer labs|read off|checked on|as published|last updated)[^.]{0,70}\./gi)].map(m=>m[0].trim());
      const numericClaims=(btxt.match(/\$\d[\d,]*|\b\d{1,3}%/g)??[]).length;
      const namedAuthor=/Jarred/.test(btxt);
      // PART 8 — shape
      const h2s=[...raw.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(m=>unesc(plain(m[1])));
      rows.push({route,title,titleLen:title.length,h1,desc,descLen:desc.length,
        codesInRaw,hasDollar:dollar,hasDate:dated,first200,
        ctaBeforeFirstParagraph: firstCta>-1&&firstFact>-1&&firstCta<firstFact,
        schemaTypes:[...new Set(types)],schemaProblems:[...new Set(problems)],
        outboundHosts,observations,observationCount:observations.length,numericClaims,namedAuthor,
        h2Count:h2s.length,h2s:h2s.slice(0,12),hasTable:/<table/.test(body),hasFaq:/FAQPage/.test(raw),
        words:btxt.split(" ").filter(Boolean).length});
    }
  }
})(OUT);

fs.writeFileSync("reports/raw/content-signals.json",JSON.stringify(rows,null,1));
const codePages=rows.filter(r=>r.codesInRaw.length);
console.log(`in-scope routes analysed: ${rows.length}`);
console.log(`routes with a code in server HTML: ${codePages.length}`);
console.log(`routes with schema problems: ${rows.filter(r=>r.schemaProblems.length).length}`);
console.log(`routes with zero observation dates: ${rows.filter(r=>r.observationCount===0).length}`);
console.log(`routes with CTA before first paragraph: ${rows.filter(r=>r.ctaBeforeFirstParagraph).length}`);
console.log(`routes with a named author in rendered text: ${rows.filter(r=>r.namedAuthor).length}`);
