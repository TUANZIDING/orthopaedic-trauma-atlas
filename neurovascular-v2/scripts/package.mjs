import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {modules} from '../src/content.js';
import cranial from '../src/cranial.js';
const base=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const attribution=`# Attribution / 署名与模型边界

BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International.

- Model source: https://lifesciencedb.jp/bp3d/ ; licence: https://creativecommons.org/licenses/by/4.0/
- Adapted through https://github.com/TUANZIDING/human-atlas at commit 1c38bf35c254a891200d3cedecfd57abebe83d8d.
- Changes: selected adult bones, limb display cropping, recentered coordinates, recomputed surface normals, bilingual labels and original schematic traction devices. No patient images or patient data.
- Three.js r159 / MIT; human-atlas code acknowledgement and licences in THIRD_PARTY_LICENSES.txt and the embedded HTML comment.
- Original reference anatomy, not patient-specific surgical planning. Pin paths, proximity cues and devices are unvalidated educational geometry, not vendor CAD or demonstrated safe corridors.
- AO, WFNS, AAOS and manufacturer texts/figures have not been republished as official illustrations. Linked references retain their own rights. This independent adaptation is not endorsed by those organisations.
`;
for(const m of [...Object.values(modules),cranial]){
 const dir=path.join(base,m.slug);await fs.writeFile(path.join(dir,'.nojekyll'),'');await fs.writeFile(path.join(dir,'ATTRIBUTION.md'),attribution);
 const references=m.sources.map(s=>`- [${s.id}] [${s.title}](${s.url})\n  - ${s.detail.zh}\n  - ${s.detail.en}`).join('\n');
 const readme=`# ${m.title.zh} / ${m.title.en}

${m.scope.zh}\n\n${m.scope.en}

## 打开与使用 / Use

直接打开 index.html。单文件嵌入模型、脚本和样式，不依赖 CDN；浏览器需支持 WebGL。右上角切换中英；也可用 ?lang=en 打开英文。拖动旋转、滚轮缩放、点击骨骼查看名称。六步播放仅为教学顺序，绝不表示实际复位或自动加重。下方提供场景限定的参数、解释及原始来源。

Open index.html in a WebGL-capable browser. All scripts, models and styles are embedded; no CDN or build is needed. Switch language at the top or append ?lang=en. Orbit, zoom, select bones and explore six teaching steps. Playback is educational, not a reduction simulation or automatic loading sequence.

## 高清图 / Plates

teaching-images/ contains four 3840 × 2160 PNG plates: anatomy and construct, each in Chinese and English. The webpage can regenerate both plate types in the active language.

## 当前诊疗定位 / Current role

${m.strategy.zh}\n\n${m.strategy.en}

${m.protocolNotice?m.protocolNotice.zh+'\n\n'+m.protocolNotice.en:''}

## 上传 GitHub / Publish with GitHub Pages

1. 新建仓库（建议 ${m.slug}），将本文件夹内文件上传到仓库根目录，保留 index.html 文件名。
2. Settings → Pages → Deploy from a branch → main → /(root) → Save。
3. 等待 GitHub Pages 部署完成，使用 Pages 给出的地址。英文入口附加 ?lang=en。

Upload this folder's contents to the root of a repository, then select Settings → Pages → Deploy from a branch → main → /(root). Keep the attribution and licence files. No compilation is required. These local deliverables have not been published automatically.

## 验证与边界 / Validation and limitations

2026-09-08：已在 Chrome 中验证离线打开、中英文、六步、四个视角、引用锚点与 390 px 移动布局；4K 图已生成。软件检查不构成临床安全或专家审核。参考骨骼保持正常解剖，不模拟骨折或复位效果；器械为教学示意，未验证患者级针道、神经位置或操作安全。

Offline Chrome checks cover both languages, six stages, four views, source anchors and a 390 px mobile layout. Software verification is not clinical or expert approval. Normal reference bones do not simulate injury or successful reduction. Device geometry and risk cues are schematic, with no patient-specific corridor validation.

## Sources / 来源（核对 2026-09-08）

${references}
`;
 await fs.writeFile(path.join(dir,'README.md'),readme);await fs.copyFile(path.join(base,'research',m.id+'-evidence.md'),path.join(dir,'EVIDENCE.md'));
}
await fs.writeFile(path.join(base,'index.html'),`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Traction Atlas / 骨牵引教学图谱</title><style>body{font:18px/1.7 system-ui;background:#f5f7f0;color:#20453e;max-width:1100px;margin:60px auto;padding:25px}h1{font-size:44px}article{background:white;border:1px solid #d4dfd1;padding:25px;margin:20px 0;border-radius:14px}a{color:#146657}p{color:#647366}img{width:240px;float:right;margin:0 0 15px 20px}article:after{content:'';display:block;clear:both}@media(max-width:600px){img{float:none;width:100%;margin:0}}</style><h1>骨牵引教学图谱<br>Traction Atlas</h1><p>三个独立模块 · 中英切换 · 可离线运行 · 12 张 4K 教学图<br>Three standalone modules · Chinese / English · Offline · 12 teaching plates</p>${[...Object.values(modules),cranial].map(m=>`<article><img alt="${m.title.en} preview" src="${m.slug}/preview.png"><h2>${m.title.zh}</h2><p>${m.title.en}</p><a href="${m.slug}/index.html">进入中文版</a>　<a href="${m.slug}/index.html?lang=en">English version</a><p>${m.scope.zh}</p></article>`).join('')}<p>独立教学改编，不是相关学会官方制品。参数必须连同适用场景与原始来源阅读。<br>Independent educational adaptation. Read all parameters with their source-specific context.</p></html>`);
await fs.writeFile(path.join(base,'.nojekyll'),'');
await fs.writeFile(path.join(base,'README.md'),`# Traction Atlas / 骨牵引教学图谱\n\n三个独立、自包含、可离线运行的双语 HTML 模块。打开 index.html 选择模块，或单独使用各子目录。每项包括 4 张 3840×2160 PNG、中英解释、场景限定参数、参考文献与署名许可。\n\n- tibial-traction/：胫骨结节骨牵引\n- calcaneal-traction/：跟骨牵引\n- cranial-traction/：Gardner–Wells 成人下颈椎创伤牵引\n\n每个文件夹可独立作为 GitHub Pages 仓库根目录；也可上传整个合集并从总目录进入。当前只生成本地成品，尚未将本轮三个模块上传 GitHub。\n\n研究依据与访问限制：research/；结构和交互验证：validation.json。模型和器械未经过患者级安全验证或独立临床专家终审。\n\n开发：复用上级项目的 three、esbuild、playwright 依赖；运行 node traction-atlas/scripts/build.mjs，再运行 node traction-atlas/scripts/verify.mjs。src/models 保留嵌入模型，常规构建无需重新下载 human-atlas。\n`);
console.log('Documentation and hub generated.');
