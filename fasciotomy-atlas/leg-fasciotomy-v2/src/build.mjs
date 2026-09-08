import fs from 'node:fs/promises';
import {build} from 'esbuild';
import {fileURLToPath} from 'node:url';
const base=new URL('../',import.meta.url);
const js=await build({entryPoints:[fileURLToPath(new URL('app.js',import.meta.url))],bundle:true,write:false,minify:true,format:'iife'});
const css=await fs.readFile(new URL('style.css',import.meta.url),'utf8');
await fs.writeFile(new URL('index.html',base),`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>小腿筋膜室 · V2 三维分层样版</title><style>${css}</style></head><body><noscript>请启用 JavaScript / Enable JavaScript for the 3D pilot.</noscript><script>${js.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')}</script></body></html>`);
console.log('Standalone HTML built.');
