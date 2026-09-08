import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const browser=await chromium.launch({channel:'chrome',headless:true});
const context=await browser.newContext({viewport:{width:1500,height:1040},acceptDownloads:true});
const page=await context.newPage();const errors=[],network=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>network.push(r.url()));
await page.goto('http://localhost:8080');await page.waitForFunction(()=>window.__pelvis?.ready);await page.waitForTimeout(500);
assert.equal(await page.title(),'骨盆外固定 · 手术解剖教学');
await page.screenshot({path:'docs/desktop-preview.png',fullPage:true});
const checks=[];
for(const tech of ['sa','ic']){
 await page.click('#tech-'+tech);
 for(let i=0;i<6;i++){await page.click(`[data-step="${i}"]`);assert.equal(await page.locator('#play-status').textContent(),`步骤 ${i+1} / 6`);assert.equal(await page.locator('#detail-number').textContent(),`0${i+1}`)}
 checks.push(`${tech}: all 6 lesson steps`);
 for(const view of ['front','oblique','side','top']){await page.click(`[data-view="${view}"]`);assert(await page.locator(`[data-view="${view}"]`).evaluate(el=>el.classList.contains('active')))}
 checks.push(`${tech}: all 4 camera presets`);
}
for(const toggle of ['labels','risk','path']){await page.uncheck('#'+toggle+'-toggle');assert.equal(await page.evaluate(k=>window.__pelvis.state[k],toggle),false);await page.check('#'+toggle+'-toggle')}
checks.push('all visibility switches');
await page.locator('#opacity').fill('35');await page.locator('#opacity').dispatchEvent('input');assert.equal(await page.locator('#opacity-value').textContent(),'35%');await page.locator('#opacity').fill('82');await page.locator('#opacity').dispatchEvent('input');checks.push('opacity slider');
await page.click('#sources-open');assert(await page.locator('#source-dialog').evaluate(d=>d.open));await page.keyboard.press('Escape');assert(!(await page.locator('#source-dialog').evaluate(d=>d.open)));checks.push('sources dialog and Escape');
await page.click('#tech-sa');await page.click('[data-view="front"]');await page.waitForTimeout(500);
// Pick the central sacrum / vertebra region through the real pointer handler.
const box=await page.locator('canvas').boundingBox();await page.mouse.click(box.x+box.width*.5,box.y+box.height*.38);assert.notEqual(await page.locator('#selected-name').textContent(),'点击模型中的骨骼');checks.push('bone selection through canvas pointer');
await page.click('#tech-sa');await page.click('#play');assert.equal(await page.locator('#play-status').textContent(),'步骤 1 / 6');await page.waitForTimeout(6700);assert.equal(await page.locator('#play-status').textContent(),'步骤 2 / 6');await page.click('#play');const paused=await page.locator('#play-status').textContent();assert.equal(await page.locator('#play').textContent(),'▶ 分步播放');checks.push('timed step playback and pause');await page.click('[data-step="5"]');
// Actual export button downloads the file, rather than only testing an internal call.
for(const tech of ['sa','ic']){
 await page.click('#tech-'+tech);
 for(const view of ['front','oblique']){
  await page.click(`[data-view="${view}"]`);await page.waitForTimeout(600);
  const event=page.waitForEvent('download');await page.click('#export');const download=await event;const target=`teaching-images/${tech}-${view}-4k.png`;await download.saveAs(target);const png=fs.readFileSync(target);assert.equal(png.subarray(1,4).toString(),'PNG');assert.equal(png.readUInt32BE(16),3840);assert.equal(png.readUInt32BE(20),2160);
 }
}
checks.push('4 PNG files downloaded by the export button, each 3840 × 2160');
await page.click('#tech-ic');await page.click('[data-view="oblique"]');await page.waitForTimeout(500);await page.screenshot({path:'docs/iliac-preview.png'});
for(const width of [390,320,844]){await page.setViewportSize({width,height:844});await page.click('[data-view="front"]');await page.waitForTimeout(350);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`horizontal overflow at ${width}`);if(width===390)await page.screenshot({path:'docs/mobile-preview.png',fullPage:true})}
checks.push('responsive layout: 390, 320, 844 px without document horizontal overflow');
// Standalone file, with all HTTP(S) requests blocked, exercises embedded geometry/runtime.
const offline=await context.newPage();const remote=[];offline.on('pageerror',e=>errors.push(e.message));await offline.route(/^https?:/,r=>{remote.push(r.request().url());r.abort()});await offline.goto('file://'+path.resolve('index.html'));await offline.waitForFunction(()=>window.__pelvis?.ready);await offline.click('#tech-ic');await offline.click('[data-step="2"]');assert.equal(await offline.locator('#stage-name').textContent(),'髂嵴外固定');assert.equal(remote.length,0);checks.push('file:// standalone HTML, HTTP(S) blocked, no remote requests');
assert.equal(errors.length,0,errors.join('\n'));assert(network.every(u=>u.startsWith('http://localhost:8080')),network.join('\n'));checks.push('no uncaught browser errors or remote runtime requests');
fs.writeFileSync('docs/browser-check.json',JSON.stringify({date:'2026-09-08',browser:await browser.version(),checks,errors,remoteRuntimeRequests:network.filter(u=>!u.startsWith('http://localhost:8080'))},null,2));console.log(checks.join('\n'));
await browser.close();
