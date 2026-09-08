import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {modules} from '../src/content.js';
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const css=await fs.readFile(base+'/src/style.css','utf8');
for(const [id,M] of Object.entries(modules)){
 const out=base+'/'+id+'-fasciotomy';await fs.mkdir(out+'/teaching-images',{recursive:true});
 const js=await build({entryPoints:[base+'/src/app.js'],bundle:true,write:false,minify:true,format:'iife',define:{MODULE_ID:JSON.stringify(id)}});
 await fs.writeFile(out+'/index.html',`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${M.title.zh}</title><style>${css}</style></head><body><noscript>请启用 JavaScript，或查看 teaching-images 中的高清图。 Enable JavaScript or view teaching-images.</noscript><script>${js.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')}</script></body></html>`);
 await fs.writeFile(out+'/.nojekyll','');console.log(id+'-fasciotomy built');
}
