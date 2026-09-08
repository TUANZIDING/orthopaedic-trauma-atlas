import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const css=await fs.readFile(path.join(base,'src/style.css'),'utf8');
const license=await fs.readFile(path.join(base,'../THIRD_PARTY_LICENSES.txt'),'utf8');
for(const id of (process.argv[2]?[process.argv[2]]:['calcaneal','tibial','cranial'])){
 const out=path.join(base,id+'-traction');await fs.mkdir(path.join(out,'teaching-images'),{recursive:true});
 const bundle=await build({entryPoints:[path.join(base,'src/app.js')],bundle:true,write:false,minify:true,format:'iife',define:{MODULE_ID:JSON.stringify(id)},alias:{'anatomy-data':path.join(base,'src/models',id+'.json')}});
 const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Bilingual evidence-based adult skeletal traction teaching atlas. Independent educational adaptation."><title>Traction Atlas</title><style>${css}</style></head><body><noscript>请启用 JavaScript / Enable JavaScript. See teaching-images for static plates.</noscript><script>${bundle.outputFiles[0].text.replaceAll('</script','<\\/script')}</script><!-- ${license.replaceAll('--','—')} --></body></html>`;
 await fs.writeFile(path.join(out,'index.html'),html);await fs.writeFile(path.join(out,'THIRD_PARTY_LICENSES.txt'),license);console.log(id,Math.round(Buffer.byteLength(html)/1024)+' KiB');
}
