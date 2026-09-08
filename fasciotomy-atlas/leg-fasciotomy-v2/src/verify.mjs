import fs from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const base=new URL('../',import.meta.url),dir=fileURLToPath(base),errors=[],checks=[];
await fs.mkdir(new URL('teaching-images/',base),{recursive:true});
const b=await chromium.launch({channel:'chrome',headless:true});
try{
const p=await b.newPage({viewport:{width:1600,height:1100}});p.on('pageerror',e=>errors.push(e.message));p.on('console',m=>{if(m.type()==='error')errors.push(m.text());});await p.route(/^https?:/,r=>r.abort());
for(const lang of ['zh','en']){await p.goto(new URL('index.html'+(lang==='en'?'?lang=en':''),base).href);await p.waitForFunction(()=>window.pilot);
assert.equal(await p.evaluate(()=>window.pilot.data.side),'left');
const sideCheck=await p.evaluate(()=>{const ms=window.pilot.meshes;const center=id=>{let m=ms.find(m=>m.userData.id===id);m.geometry.computeBoundingBox();let bb=m.geometry.boundingBox;return (bb.min.x+bb.max.x)/2;};return center('FJ3260')>center('FJ3282');});assert(sideCheck,'Fibula must remain lateral (+x) to tibia');
for(let i=0;i<4;i++){await p.locator(`[data-stage="${i}"]`).click();const state=await p.evaluate(()=>window.pilot.meshes.filter(m=>['superficial','soleus','deep'].includes(m.userData.group)).map(m=>({group:m.userData.group,visible:m.visible,opacity:m.material.opacity})));assert(state.filter(m=>m.group==='deep').every(m=>m.visible));if(i===2)assert(state.filter(m=>m.group==='soleus').every(m=>m.opacity===.15));if(i===3)assert(state.filter(m=>m.group==='soleus').every(m=>!m.visible));const url=await p.evaluate(()=>window.pilot.exportPNG(false));await fs.writeFile(new URL(`teaching-images/leg-v2-${lang}-stage-${i+1}-4k.png`,base),Buffer.from(url.split(',')[1],'base64'));}
checks.push(lang+': 4 exposure states, left-side geometry, 4K exports');
}
await p.goto(new URL('index.html',base).href);await p.waitForFunction(()=>window.pilot);
for(let i=0;i<5;i++){await p.locator(`[data-view="${i}"]`).click();assert((await p.locator('#viewtag').innerText()).includes('左小腿'));}
await p.locator('[data-stage="2"]').click();await p.screenshot({path:dir+'preview.png',fullPage:true});
const pixels=await p.evaluate(async()=>{const run=async value=>{window.pilot.uniforms.hiddenOpacity.value=value;window.pilot.render();const image=new Image();image.src=window.pilot.renderer.domElement.toDataURL();await image.decode();const c=document.createElement('canvas');c.width=image.width;c.height=image.height;const ctx=c.getContext('2d');ctx.drawImage(image,0,0);return ctx.getImageData(0,0,c.width,c.height).data;};let a=await run(.18),b=await run(0),count=0;for(let i=0;i<a.length;i+=4)if(Math.abs(a[i]-b[i])+Math.abs(a[i+1]-b[i+1])+Math.abs(a[i+2]-b[i+2])>3)count++;window.pilot.uniforms.hiddenOpacity.value=.18;return count;});assert(pixels>20,'Ghost toggle must change actual rendered pixels');checks.push('Occluded fragments: '+pixels+' changed pixels at 18% vs 0%');
const initial=await p.evaluate(()=>window.sectionSegmentCount);await p.locator('#slice').fill('90');const moved=await p.evaluate(()=>window.sectionSegmentCount);assert(initial>0&&moved>0&&initial!==moved);checks.push('Mesh-derived section changes at different levels');
await p.locator('[data-group="deep"]').uncheck();assert(await p.evaluate(()=>window.pilot.meshes.filter(m=>m.userData.group==='deep').every(m=>!m.visible)));await p.locator('#reset').click();
const download=p.waitForEvent('download');await p.locator('#export').click();assert((await download).suggestedFilename().endsWith('-4k.png'));checks.push('Layer toggle, reset, actual download event');
await p.setViewportSize({width:390,height:844});await p.screenshot({path:dir+'mobile.png',fullPage:true});assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));checks.push('390px mobile: no horizontal overflow');assert.deepEqual(errors,[]);
await fs.writeFile(new URL('validation.json',base),JSON.stringify({date:'2026-09-08',checks,errors,scope:'Software and source-coordinate checks only; no independent clinical sign-off'},null,2));console.log(checks);
}finally{await b.close();}
