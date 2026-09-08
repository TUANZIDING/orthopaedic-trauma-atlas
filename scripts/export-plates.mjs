import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
const b=await chromium.launch({channel:'chrome',headless:true});const p=await b.newPage({viewport:{width:1500,height:1040},acceptDownloads:true});await p.goto('file://'+path.resolve('index.html'));await p.waitForFunction(()=>window.__pelvis?.ready);
for(const t of ['sa','ic']){await p.click('#tech-'+t);for(const v of ['front','oblique']){await p.click(`[data-view="${v}"]`);await p.waitForTimeout(600);const ev=p.waitForEvent('download');await p.click('#export');await(await ev).saveAs(`teaching-images/${t}-${v}-4k.png`)}}
await p.click('#tech-sa');await p.click('[data-view="front"]');await p.waitForTimeout(400);await p.screenshot({path:'docs/desktop-preview.png',fullPage:true});await p.click('[data-view="oblique"]');await p.waitForTimeout(400);await p.screenshot({path:'docs/oblique-preview.png'});await p.click('#tech-ic');await p.waitForTimeout(400);await p.screenshot({path:'docs/iliac-preview.png'});await p.setViewportSize({width:390,height:844});await p.click('[data-view="front"]');await p.waitForTimeout(400);await p.screenshot({path:'docs/mobile-preview.png',fullPage:true});
console.log('Final 4K plates and previews exported from standalone HTML.');await b.close();
