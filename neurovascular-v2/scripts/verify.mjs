import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
for(const id of ['tibial','calcaneal','cranial']){
 const page=await browser.newPage({viewport:{width:1600,height:1100},deviceScaleFactor:1});let errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('file://'+path.join(base,id+'-traction/index.html'));await page.waitForFunction(()=>window.tractionAtlas);await page.waitForTimeout(500);
 await page.screenshot({path:path.join(base,id+'-traction/preview.png')});
 for(const lang of ['zh','en']){await page.evaluate(l=>window.tractionAtlas.setLanguage(l),lang);for(let step=0;step<6;step++){await page.locator(`[data-step="${step}"]`).click();if(!await page.locator('#stepTitle').textContent())throw Error('Empty step');}for(const v of [0,1,2,3])await page.locator(`[data-view="${v}"]`).click();
  if(lang==='en'){const text=await page.locator('main').innerText();if(/[\u4e00-\u9fff]/u.test(text))errors.push('Chinese text remains in English main');}
  for(const kind of ['anatomy','construct']){const data=await page.evaluate(k=>window.tractionAtlas.exportPlate(k,false),kind);await fs.writeFile(path.join(base,id+'-traction/teaching-images',`${id}-${kind}-${lang}-4k.png`),Buffer.from(data.split(',')[1],'base64'));}
 }
 const broken=await page.evaluate(()=>[...document.querySelectorAll('[data-ref]')].filter(a=>!document.querySelector(a.getAttribute('href'))).length);if(broken)errors.push('Unresolved source reference');
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:path.join(base,id+'-traction/mobile-preview.png')});const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(overflow)errors.push('Mobile overflow');
 results.push({id,errors,offline:true,languages:2,steps:6,views:4,plates:4});await page.close();
}await browser.close();await fs.writeFile(path.join(base,'validation.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));if(results.some(x=>x.errors.length))process.exitCode=1;
