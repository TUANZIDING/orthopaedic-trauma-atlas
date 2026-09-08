import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';
import {modules,sources} from '../src/content.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
await fs.mkdir(root+'/downloads',{recursive:true});
for(const [id,M] of Object.entries(modules)){
 const slug=id+'-fasciotomy',dir=root+'/'+slug;
 await fs.copyFile(root+'/research/EVIDENCE.md',dir+'/EVIDENCE.md');
 const readme=`# ${M.title.zh} / ${M.title.en}\n\n独立双语教学模块 V1.0 · 2026-09-08\n\n双击 index.html 可离线使用；切换语言、图层、步骤，导出当前 PNG/SVG。teaching-images 含6步骤各中英两个版本，共12张3840×2160 PNG和12张SVG。\n\n## 阅读图示\n\n左侧为入路与筋膜层展开示意；右侧为关系横断面。紫红虚线为皮肤切口，紫红实线为筋膜松解；红色动脉、蓝色静脉、黄色神经。表面图中不同层被展开，不能按图量取距离或盲切。\n\n${M.strategy.zh}\n\n${M.strategy.en}\n\n## GitHub Pages\n\n将本包解压内容上传到仓库根目录，使用 main 分支的根目录部署 Pages；无需构建或网络依赖。完整来源与限制见 EVIDENCE.md。\n\n## 来源\n\n${['A','B',M.ref].map(k=>'- ['+sources[k].title+']('+sources[k].url+')').join('\n')}\n\n原创二维解剖关系示意，非比例、非患者分割、非官方认证。适用于成人急性筋膜室综合征的专业教学；正式教学前需临床教师复核，软件检查不等于临床批准。\n`;
 await fs.writeFile(dir+'/README.md',readme);
 // Recreate only this generated archive; zip stores index.html at archive root.
 await fs.rm(root+'/downloads/'+slug+'.zip',{force:true});
 execFileSync('zip',['-q','-r',root+'/downloads/'+slug+'.zip','index.html','.nojekyll','README.md','EVIDENCE.md','teaching-images'],{cwd:dir});
 console.log(slug+': '+(await fs.stat(root+'/downloads/'+slug+'.zip')).size+' bytes');
}
