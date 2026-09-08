import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const browser=await chromium.launch({headless:true});const results=[];
for(const id of ['leg','thigh','foot']){
 const dir=base+'/'+id+'-fasciotomy',p=await browser.newPage({viewport:{width:1680,height:1120}}),errors=[];
 p.on('pageerror',e=>errors.push(e.message));await p.route(/^https?:/,r=>r.abort());
 await p.goto('file://'+dir+'/index.html');await p.waitForFunction(()=>window.fasciotomy);
 assert.equal(await p.locator('[data-step]').count(),6);
 await p.locator('[data-step="3"]').click();assert.match(await p.locator('#stageNo').innerText(),/04/);
 await p.locator('[data-layer="nv"]').uncheck();assert.equal(await p.locator('[data-layer="nv"]').isChecked(),false);await p.locator('[data-layer="nv"]').check();
 const first=await p.locator('[data-part]').first().getAttribute('data-part');await p.locator('[data-part]').first().click();assert.ok((await p.locator('#detail').innerText()).startsWith(String(Number(first)+1)));
 await p.locator('#zoomIn').click();assert.equal(await p.locator('#reset').innerText(),'125%');await p.locator('#reset').click();
 await p.locator('#language').click();assert.equal(await p.locator('html').getAttribute('lang'),'en');
 for(const lang of ['zh','en']){
  await p.evaluate(l=>window.fasciotomy.setLanguage(l),lang);
  for(let stage=0;stage<6;stage++){
   await p.evaluate(s=>window.fasciotomy.setStage(s),stage);
   const stem=`${id}-${lang}-step-${stage+1}`;
   assert.ok(!(await p.locator('#diagram').textContent()).includes('undefined'));
   const png=await p.evaluate(()=>window.fasciotomy.exportPlate());
   const buffer=Buffer.from(png.split(',')[1],'base64');assert.equal(buffer.readUInt32BE(16),3840);assert.equal(buffer.readUInt32BE(20),2160);
   await fs.writeFile(dir+'/teaching-images/'+stem+'-4k.png',buffer);
   await fs.writeFile(dir+'/teaching-images/'+stem+'.svg',await p.evaluate(()=>window.fasciotomy.svg()));
  }
 }
 await p.evaluate(()=>{window.fasciotomy.setLanguage('zh');window.fasciotomy.setStage(4);});
 await p.screenshot({path:dir+'/preview.png',fullPage:true});
 await p.setViewportSize({width:390,height:844});
 assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await p.screenshot({path:dir+'/mobile.png',fullPage:true});
 assert.deepEqual(errors,[]);results.push({id,offline:true,stages:6,languages:['zh','en'],png:12,svg:12,pngSize:[3840,2160],mobileOverflow:false,errors});await p.close();
}
await browser.close();await fs.writeFile(base+'/validation.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
