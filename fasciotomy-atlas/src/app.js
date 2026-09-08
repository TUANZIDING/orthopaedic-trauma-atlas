import {common,modules,sources} from './content.js';
import {diagram} from './diagram.js';
const M=modules[MODULE_ID],id=MODULE_ID,$=s=>document.querySelector(s);
let lang=new URLSearchParams(location.search).get('lang')==='en'?'en':'zh',stage=0,timer=null;
const layers={skin:.15,muscle:true,fascia:true,bone:true,nv:true,ghost:true};
const t=v=>typeof v==='string'?v:v[lang],tr=(zh,en)=>lang==='zh'?zh:en;
const ref=key=>`<a href="#source-${key}">[${key}]</a>`;
document.body.innerHTML=`<header><a href="https://tuanziding.github.io/orthopaedic-trauma-atlas/">ORTHOPAEDIC<br><b>TRAUMA ATLAS</b></a><span>FASCIOTOMY SERIES / 2026</span><button id="language"></button></header><main><section class="intro"><p id="tag" class="eyebrow"></p><h1></h1><p id="scope"></p><div id="strategy" class="strategy"></div></section><div class="work"><nav id="steps" aria-label="Procedure stages"></nav><section class="visual"><div class="toolbar"><b id="visualTitle"></b><div><button id="zoomOut" aria-label="Zoom out">−</button><button id="reset" aria-label="Reset zoom">100%</button><button id="zoomIn" aria-label="Zoom in">+</button></div></div><div class="viewport"><div id="diagram"></div></div><div id="layerControls"></div><p id="tip" class="subtle"></p></section><aside><p class="eyebrow" id="stageNo"></p><h2 id="stageTitle"></h2><p id="stageBody"></p><div class="transport"><button id="prev">←</button><button id="play"></button><button id="next">→</button></div><h3 id="riskTitle"></h3><ol id="risks"></ol><div id="detail" role="status" class="detail"></div></aside></div><section class="decision"><h2 id="decisionTitle"></h2><p id="decision"></p></section><section><div class="sectionhead"><div><p class="eyebrow">PARAMETERS & REASONING</p><h2 id="paramsTitle"></h2></div><button id="exportPng"></button><button id="exportSvg"></button></div><div class="tablewrap"><table><thead id="thead"></thead><tbody id="params"></tbody></table></div></section><section class="notes"><article><h2 id="afterTitle"></h2><p id="after"></p></article><article><h2 id="lateTitle"></h2><p id="late"></p></article></section><section class="boundary"><h2 id="boundaryTitle"></h2><p id="boundary"></p><p id="current"></p></section><section><h2 id="sourceTitle"></h2><div id="sourceList"></div></section><footer><span>© 2026 · TUANZIDING · Independent educational schematic</span><span id="footer"></span></footer></main><div id="status" role="status"></div>`;
let zoom=1;
function draw(){ $('#diagram').innerHTML=diagram(id,M,lang,stage,layers); $('#diagram').style.width=(zoom*100)+'%'; $('#reset').textContent=Math.round(zoom*100)+'%'; }
function ui(){
 document.documentElement.lang=lang==='zh'?'zh-CN':'en';document.title=t(M.title)+' · Fasciotomy Atlas';
 $('h1').textContent=t(M.title);$('#tag').textContent=t(M.tag);$('#scope').textContent=t(common.scope);$('#language').textContent=lang==='zh'?'English':'中文';
 $('#strategy').innerHTML=t(M.strategy)+' '+ref(M.ref)+' '+ref('B');
 $('#steps').innerHTML=M.steps.map((s,i)=>`<button data-step="${i}" aria-current="${i===stage?'step':'false'}"><span>0${i+1}</span>${t(s[0])}</button>`).join('');
 $('#visualTitle').textContent=tr('分层入路 × 横断面','Layered approach × cross-section');
 $('#stageNo').textContent=tr('教学步骤','TEACHING STAGE')+` 0${stage+1} / 06`;
 $('#stageTitle').textContent=t(M.steps[stage][0]);$('#stageBody').innerHTML=t(M.steps[stage][1])+' '+ref(M.ref);
 $('#riskTitle').textContent=tr('神经血管警示','Neurovascular warnings');$('#risks').innerHTML=M.risks.map(r=>`<li>${t(r)}</li>`).join('');
 $('#play').textContent=timer?tr('暂停','Pause'):tr('播放步骤','Play stages');
 $('#layerControls').innerHTML=`<label>${tr('皮肤透明度','Skin opacity')} <input id="skin" type="range" min="0" max="0.85" step="0.05" value="${layers.skin}"/><output>${Math.round(layers.skin*100)}%</output></label>`+[
  ['muscle','肌群','Muscles'],['fascia','筋膜边界','Fascial borders'],['bone','骨骼','Bones'],['nv','神经血管','Neurovascular'],['ghost','骨后虚化','Fade behind bone']
 ].map(([k,zh,en])=>`<label><input type="checkbox" data-layer="${k}" ${layers[k]?'checked':''}>${tr(zh,en)}</label>`).join('');
 $('#tip').textContent=tr('点击横断面编号查看筋膜室；放大后可滚动。骨后虚化仅说明该投影的遮挡关系。','Select a compartment number. Zoom then scroll. Fading denotes occlusion in this schematic projection only.');
 $('#detail').textContent=tr('选择横断面编号以定位筋膜室。','Select a cross-section number to identify a compartment.');
 $('#decisionTitle').textContent=tr('诊断与紧急处理','Recognition & urgent management');$('#decision').innerHTML=t(common.decision)+' '+ref('B')+' '+ref(M.ref);
 $('#paramsTitle').textContent=tr('参数及其适用范围','Parameters & interpretation');
 $('#thead').innerHTML='<tr>'+[tr('项目','Item'),tr('参照','Reference'),tr('解释与限制','Interpretation & limits'),tr('依据','Source')].map(v=>`<th>${v}</th>`).join('')+'</tr>';
 $('#params').innerHTML=[...M.params,...common.params].map(r=>`<tr><td>${t(r[0])}</td><td><b>${t(r[1])}</b></td><td>${t(r[2])}</td><td>${ref(r[3])}</td></tr>`).join('');
 $('#afterTitle').textContent=tr('减压后的创面','After decompression');$('#after').innerHTML=t(common.after)+' '+ref('A');
 $('#lateTitle').textContent=tr('迟发 / 漏诊病例','Late / missed cases');$('#late').innerHTML=t(common.late)+' '+ref('A')+' '+ref('B');
 $('#boundaryTitle').textContent=tr('模型与使用边界','Model & use limits');$('#boundary').textContent=t(common.boundary);
 $('#current').textContent=tr('本次核对 AAOS 2025 更新版、BOASt 2025 修订版与 AO 在线入路。证据更新不等于每个技术细节均有高质量试验证据；本页没有把实验性技术作为常规方案。','Reviewed AAOS 2025, BOASt 2025 and AO online approaches. Updated evidence does not mean high-quality trials support every technical detail; experimental methods are not presented as routine care.');
 $('#sourceTitle').textContent=tr('权威来源 · 点击回查原文','Authoritative sources · verify the originals');
 $('#sourceList').innerHTML=['B','A',M.ref].map(k=>`<article id="source-${k}"><b>[${k}]</b> <a href="${sources[k].url}" target="_blank" rel="noopener">${sources[k].title} ↗</a></article>`).join('');
 $('#footer').textContent=tr('来源核对：2026-09-08 · 软件验证不等于临床审定','Sources checked: 2026-09-08 · Software verification is not clinical approval');
 $('#exportPng').textContent=tr('导出当前 4K PNG','Export current 4K PNG');$('#exportSvg').textContent=tr('导出矢量 SVG','Export vector SVG');draw();
}
function stop(){if(timer){clearInterval(timer);timer=null;}}
document.addEventListener('click',e=>{const s=e.target.closest('[data-step]');if(s){stop();stage=+s.dataset.step;ui();}const part=e.target.closest('[data-part]');if(part){$('#detail').textContent=(+part.dataset.part+1)+' · '+t(M.parts[part.dataset.part]);}});
document.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.matches('[data-part]')){e.preventDefault();e.target.dispatchEvent(new MouseEvent('click',{bubbles:true}));}});
$('#layerControls').addEventListener('change',e=>{if(e.target.dataset.layer){layers[e.target.dataset.layer]=e.target.checked;draw();}});
$('#layerControls').addEventListener('input',e=>{if(e.target.id==='skin'){layers.skin=+e.target.value;e.target.nextElementSibling.textContent=Math.round(layers.skin*100)+'%';draw();}});
$('#language').onclick=()=>{lang=lang==='zh'?'en':'zh';ui();};$('#next').onclick=()=>{stop();stage=Math.min(5,stage+1);ui();};$('#prev').onclick=()=>{stop();stage=Math.max(0,stage-1);ui();};
$('#play').onclick=()=>{if(timer){stop();ui();return;}if(stage===5)stage=0;timer=setInterval(()=>{stage++;if(stage>=5){stage=5;stop();}ui();},4500);ui();};
$('#zoomIn').onclick=()=>{zoom=Math.min(2,zoom+.25);draw();};$('#zoomOut').onclick=()=>{zoom=Math.max(1,zoom-.25);draw();};$('#reset').onclick=()=>{zoom=1;draw();};
function download(url,name){const a=document.createElement('a');a.href=url;a.download=name;a.click();}
async function exportPlate(save=false){
 const svg=diagram(id,M,lang,stage,layers),url=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml;charset=utf-8'}));
 try{await document.fonts.ready;const img=new Image();img.src=url;await img.decode();const c=document.createElement('canvas');c.width=3840;c.height=2160;c.getContext('2d').drawImage(img,0,0,3840,2160);const data=c.toDataURL('image/png');if(save)download(data,`${id}-fasciotomy-${lang}-step-${stage+1}-4k.png`);return data;}finally{URL.revokeObjectURL(url);}
}
$('#exportPng').onclick=async()=>{try{await exportPlate(true);$('#status').textContent=tr('4K 教学图已生成','4K plate generated');}catch(e){$('#status').textContent=tr('导出失败：','Export failed: ')+e.message;}};
$('#exportSvg').onclick=()=>{const url=URL.createObjectURL(new Blob([diagram(id,M,lang,stage,layers)],{type:'image/svg+xml'}));download(url,`${id}-fasciotomy-${lang}-${stage+1}.svg`);setTimeout(()=>URL.revokeObjectURL(url),10000);};
window.fasciotomy={setLanguage(v){lang=v;ui();},setStage(v){stop();stage=v;ui();},exportPlate,svg:()=>diagram(id,M,lang,stage,layers),id};ui();
