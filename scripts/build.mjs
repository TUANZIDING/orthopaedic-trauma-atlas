import {build} from 'esbuild';
import fs from 'node:fs';
const result=await build({entryPoints:['src/app.js'],bundle:true,minify:true,format:'iife',target:['es2020'],write:false,legalComments:'inline'});
const html=fs.readFileSync('src/template.html','utf8').replace('/*__CSS__*/',fs.readFileSync('src/style.css','utf8')).replace('/*__APP__*/',()=>result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script'));
const output='legacy/pelvic-external-fixation-v1/index.html';
fs.mkdirSync('legacy/pelvic-external-fixation-v1',{recursive:true});
fs.writeFileSync(output,html+'\n<!--\n'+fs.readFileSync('THIRD_PARTY_LICENSES.txt','utf8')+'\n-->\n');console.log(`Built ${output}: ${(Buffer.byteLength(html)/1024/1024).toFixed(2)} MB`);
