import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import model from './model.json';
import constructs from './constructs.json';
import {installNV} from '../../src/neurovascular.js';

const AO='https://surgeryreference.aofoundation.org/orthopedic-trauma/adult-trauma/pelvic-ring/basic-technique/external-fixation';
const $=id=>document.getElementById(id);
const state={tech:'sa',step:5,labels:true,risk:true,path:true,opacity:.82,playing:false,selected:null,lang:'zh'};
const steps=['解剖定位','识别入钉点','置入固定钉','连接前方架','复位与锁紧','最终检查'];
const lesson={
 sa:[
 ['解剖定位','ORIENT THE PELVIS','识别髂前上棘（ASIS）、髂前下棘（AIIS）及髋臼。以骨性标志理解髋臼上置钉区域。','本模型为完整参考骨盆；损伤后的两侧骨块位置可能改变。','§ 1 / § 4'],
 ['识别入钉点','IDENTIFY THE AIIS','髋臼上置钉以髂前下棘为起点；关注股外侧皮神经，并使用影像确认。','绿色标记为人工定位的教学点，不是经个体影像验证的入口。','§ 4'],
 ['置入固定钉','SUPRA-ACETABULAR PINS','钉道由髋臼上区域向髂骨后部延伸。确认位置与方向后，再推进固定钉。','注意避免进入髋关节。虚线仅表示骨内线段，不代表已验证的安全通道。','§ 4'],
 ['连接前方架','ASSEMBLE THE FRAME','前方连接杆与夹具连接双侧固定钉。复位前保留调整余地。','前方构型需为腹部与髋屈曲留出空间；本页未加载体表模型。','§ 6'],
 ['复位与锁紧','REDUCE, THEN LOCK','结合损伤进行复位，用影像评估满意后锁紧夹具。','此处仅说明操作顺序，不模拟具体骨折的复位动作或力学效果。','§ 6'],
 ['最终检查','CHECK THE CONSTRUCT','复核影像、钉口皮肤张力、腹部间隙及髋屈曲空间。','前方外固定主要稳定前环；后环损伤需另行评估与处理。','§ 7 / § 1']
 ],
 ic:[
 ['解剖定位','ORIENT THE ILIAC CREST','识别髂嵴、髂前上棘及髂骨内外板，观察髂嵴前部的骨性关系。','参照骨板走向理解钉道，不按体表轮廓推断骨内方向。','§ 5'],
 ['识别入钉点','IDENTIFY CREST ENTRY','在髂嵴前部、髂前上棘后方选择入钉区域，关注邻近股外侧皮神经。','教学点并非可直接套用的皮肤定位或统一距离。','§ 5'],
 ['置入固定钉','ILIAC CREST PINS','沿髂骨内外板之间置钉。本页示意双侧各两枚固定钉。','避免穿出内、外骨板；该模型未提供患者级骨板厚度测量。','§ 5'],
 ['连接前方架','ASSEMBLE THE FRAME','用连接杆与夹具组成前方支架；复位前仍可调整。','髂嵴置钉和髋臼上置钉的前方连接、复位原则相通。','§ 6'],
 ['复位与锁紧','REDUCE, THEN LOCK','按损伤情况完成复位与影像评估，然后锁紧夹具。','图中完整骨盆不代表不稳定骨折已获得复位或充分固定。','§ 6'],
 ['最终检查','CHECK THE CONSTRUCT','复核复位与固定、皮肤张力、腹部及髋屈曲所需空间。','同样以控制前环为主；不能据此认为后环不稳定已得到处理。','§ 7 / § 1']
 ]
};
let timer=null,renderer,scene,camera,controls,boneGroup,pinGroup,rodGroup,riskGroup,pathGroup,entryGroup,clampGroup;
const bones=[],labelDefs=[];const viewport=$('viewport');
const vec=a=>new THREE.Vector3(...a);
function toast(s){$('toast').textContent=s;$('toast').classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>$('toast').classList.remove('show'),3200)}
function init(){
 try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});}catch(e){$('loading').textContent='当前浏览器无法启用 WebGL，请使用支持三维加速的浏览器；随附 teaching-images 文件夹内有高清教学图。';$('export').disabled=true;return}
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0xf0f3e9,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;viewport.prepend(renderer.domElement);renderer.domElement.setAttribute('aria-label','可拖动旋转、滚轮缩放的骨盆三维模型');renderer.domElement.setAttribute('role','img');
 scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(36,1,1,3000);
 controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.09;controls.enablePan=true;controls.minDistance=260;controls.maxDistance=1250;controls.target.set(0,-18,-25);
 scene.add(new THREE.HemisphereLight(0xffffff,0x8b9175,2.1));
 for(const [color,intensity,pos] of [[0xfff4dc,2.5,[-260,350,450]],[0xffffff,1.7,[300,80,-260]],[0xe5f1e8,.8,[0,-200,250]]]){const l=new THREE.DirectionalLight(color,intensity);l.position.set(...pos);scene.add(l)}
 boneGroup=new THREE.Group();scene.add(boneGroup);
 for(const p of model.parts){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p.positions,3));g.setIndex(p.indices);g.computeVertexNormals();const mat=new THREE.MeshStandardMaterial({color:p.sourceName.includes('femur')?0xe3dac0:0xe9dfc5,roughness:.74,metalness:.02,transparent:true,opacity:state.opacity,side:THREE.DoubleSide,depthWrite:true});const m=new THREE.Mesh(g,mat);m.userData=p;boneGroup.add(m);bones.push(m)}
 pinGroup=new THREE.Group();rodGroup=new THREE.Group();riskGroup=new THREE.Group();pathGroup=new THREE.Group();entryGroup=new THREE.Group();clampGroup=new THREE.Group();scene.add(pinGroup,rodGroup,riskGroup,pathGroup,entryGroup,clampGroup);
 buildConstruct();resize();setView('front');$('loading').remove();
 new ResizeObserver(resize).observe(viewport);
 let down;renderer.domElement.addEventListener('pointerdown',e=>down=[e.clientX,e.clientY]);renderer.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>5)return;const rect=renderer.domElement.getBoundingClientRect();const pointer=new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);const ray=new THREE.Raycaster();ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(bones)[0];bones.forEach(b=>b.material.emissive.setHex(0));if(hit){hit.object.material.emissive.setHex(0x14382d);$('selected-name').textContent=hit.object.userData.name;$('selected-detail').textContent=`BodyParts3D · ${hit.object.userData.id} · ${hit.object.userData.sourceName}`;state.selected=hit.object.userData.id}});
 controls.addEventListener('start',()=>{document.querySelectorAll('[data-view]').forEach(b=>b.classList.remove('active'));document.querySelector('.orientation').style.opacity='0'});
 function animate(){requestAnimationFrame(animate);controls.update();renderer.render(scene,camera);positionLabels()};animate();renderUI();
 window.__pelvis={state,setTechnique,setStep,setView,exportPlate,model,renderer,scene,camera,controls,bones,ready:true};
 installNV({id:'pelvic',scene,renderer,camera,bones,host:viewport,getLang:()=>state.lang,getTitle:()=>state.lang==='en'?'Pelvic external fixation':'骨盆外固定',setView:i=>setView(i===0?'front':'oblique'),resize});
}
let previousAspect=null;
function resize(){if(!renderer)return;const w=viewport.clientWidth,h=viewport.clientHeight;const newAspect=w/h;if(previousAspect&&controls){const fit=a=>Math.max(600,180+400/(2*Math.tan(Math.PI/10)*Math.max(a,.45)));camera.position.sub(controls.target).multiplyScalar(fit(newAspect)/fit(previousAspect)).add(controls.target);controls.update()}previousAspect=newAspect;camera.aspect=newAspect;camera.updateProjectionMatrix();renderer.setSize(w,h);}
function setView(name){const aspect=viewport.clientWidth/viewport.clientHeight;const d=Math.max(600,180+400/(2*Math.tan(Math.PI/10)*Math.max(aspect,.45)));const dirs={front:[0,.02,1],oblique:[.8,.23,1],side:[1,.06,0],top:[0,1,.03]};const dir=vec(dirs[name]).normalize();controls.target.set(0,-18,-25);camera.up.set(0,1,0);camera.position.copy(controls.target).addScaledVector(dir,d);controls.update();document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===name));document.querySelector('.orientation').style.opacity=name==='front'?'1':'.0';}
function clearGroup(g){for(const o of [...g.children]){g.remove(o);o.traverse(n=>{n.geometry?.dispose();if(n.material){(Array.isArray(n.material)?n.material:[n.material]).forEach(m=>m.dispose())}})}}
function cylinder(a,b,r,mat,group){const av=vec(a),bv=vec(b),delta=bv.clone().sub(av);const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,delta.length(),20),mat);mesh.position.copy(av.add(bv).multiplyScalar(.5));mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());group.add(mesh);return mesh}
const steel=()=>new THREE.MeshStandardMaterial({color:0x779d96,metalness:.73,roughness:.27});
const teal=()=>new THREE.MeshStandardMaterial({color:0x126756,metalness:.35,roughness:.39});
function addEntry(point){const m=new THREE.Mesh(new THREE.SphereGeometry(3,18,12),new THREE.MeshBasicMaterial({color:0x008879,depthTest:false}));m.position.set(...point);m.renderOrder=7;entryGroup.add(m);}
function pin(entry,end,extension){const dir=vec(end).sub(vec(entry)).normalize();const outer=vec(entry).addScaledVector(dir,-extension);cylinder(outer.toArray(),end,2.65,steel(),pinGroup);
 // Small rings indicate threaded purchase; no manufacturer-specific thread pitch is implied.
 const length=vec(end).distanceTo(vec(entry));for(let t=4;t<length;t+=3.6){const m=new THREE.Mesh(new THREE.TorusGeometry(2.78,.36,5,12),new THREE.MeshStandardMaterial({color:0x95aba3,metalness:.65,roughness:.35}));m.position.copy(vec(entry).addScaledVector(dir,t));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),dir);pinGroup.add(m)}
 const lineG=new THREE.BufferGeometry().setFromPoints([vec(entry),vec(end)]);const line=new THREE.Line(lineG,new THREE.LineDashedMaterial({color:0x008b77,dashSize:4,gapSize:2,depthTest:false,transparent:true,opacity:.85}));line.computeLineDistances();line.renderOrder=10;pathGroup.add(line);addEntry(entry);return outer.toArray()}
function clamp(point){const material=new THREE.MeshStandardMaterial({color:0x344b48,metalness:.7,roughness:.3});const m=new THREE.Mesh(new THREE.BoxGeometry(13,12,14),material);m.position.set(...point);clampGroup.add(m);const screw=new THREE.Mesh(new THREE.CylinderGeometry(3.3,3.3,7,6),steel());screw.rotation.x=Math.PI/2;screw.position.copy(m.position).add(new THREE.Vector3(0,0,9));clampGroup.add(screw)}
function riskHalo(point,r){const m=new THREE.Mesh(new THREE.SphereGeometry(r,20,14),new THREE.MeshBasicMaterial({color:0xd9963e,transparent:true,opacity:.12,depthWrite:false}));m.scale.set(1,1,.65);m.position.set(...point);riskGroup.add(m);const ring=new THREE.Mesh(new THREE.TorusGeometry(r,.7,5,48),new THREE.MeshBasicMaterial({color:0xc28830,transparent:true,opacity:.55,depthWrite:false}));ring.position.set(...point);riskGroup.add(ring)}
function label(text,point,type='',offset=[0,0]){labelDefs.push({text,point,type,offset});}
function buildConstruct(){[pinGroup,rodGroup,riskGroup,pathGroup,entryGroup,clampGroup].forEach(clearGroup);labelDefs.length=0;
 const endpoints=[];
 for(const s of [-1,1]){
 if(state.tech==='sa'){
  const cfg=constructs.sa[0],entry=cfg.entry.map((v,i)=>i===0?v*s:v),end=cfg.end.map((v,i)=>i===0?v*s:v);const out=pin(entry,end,cfg.extension);endpoints.push(out);clamp(out);
  riskHalo([s*122,25,39],12);riskHalo([s*84,-33,-2],20);
 }else{
  const entries=constructs.ic.map(c=>c.entry.map((v,i)=>i===0?v*s:v)),ends=constructs.ic.map(c=>c.end.map((v,i)=>i===0?v*s:v));
  const out=entries.map((e,i)=>pin(e,ends[i],50));out.forEach(clamp);cylinder(out[0],out[1],5.5,teal(),rodGroup);endpoints.push(out[0]);riskHalo([s*125,28,39],12);
 }
 }
 // Anterior bars stand away from bone; no soft-tissue clearance measurement is implied.
 const center=[0,state.tech==='sa'?-47:82,state.tech==='sa'?139:141];
 endpoints.forEach(out=>{const elbow=[out[0],center[1],center[2]];cylinder(out,elbow,5.5,teal(),rodGroup);clamp(elbow);cylinder(elbow,center,5.5,teal(),rodGroup)});clamp(center);
 label('髂前上棘 ASIS',[-129,43,38],'',[-30,-25]);
 label(state.tech==='sa'?'髂前下棘 AIIS · 入钉点':'髂嵴 · 入钉区域',state.tech==='sa'?[106,2,14]:[134,66,22],'entry',[48,-8]);
 label('骶骨',[0,20,-52],'',[0,-35]);
 label('前方连接架',[0,center[1],center[2]],'frame',[0,24]);
 label('神经邻近风险区 · 示意',[-122,25,39],'risk',[-20,37]);
 if(state.tech==='sa')label('髋关节邻近风险 · 示意',[84,-33,-2],'risk',[50,36]);
 document.getElementById('label-leaders')?.remove();const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.id='label-leaders';viewport.append(svg);svg.innerHTML=labelDefs.map((l,i)=>`<g data-leader="${i}"><line stroke="${l.type==='risk'?'#ba8a43':'#809581'}" stroke-width="1"/><circle r="2" fill="${l.type==='risk'?'#ba8a43':'#50836c'}"/></g>`).join('');$('labels').innerHTML=labelDefs.map((l,i)=>`<span class="anatomy-label ${l.type}" data-label="${i}">${l.text}</span>`).join('');updateVisibility();
}
function updateVisibility(){if(!pinGroup)return;pinGroup.visible=state.step>=2;rodGroup.visible=state.step>=3;clampGroup.visible=state.step>=3;entryGroup.visible=state.step>=1;pathGroup.visible=state.path&&state.step>=2;riskGroup.visible=state.risk;boneGroup.children.forEach(m=>{m.material.opacity=state.opacity;m.material.depthWrite=state.opacity>.6;});clampGroup.children.forEach(m=>{if(m.geometry.type==='BoxGeometry')m.material.color.setHex(state.step>=4?0x254f45:0x69716b)});}
function positionLabels(){if(!camera)return;const w=viewport.clientWidth,h=viewport.clientHeight;const placed=[];for(const [i,l] of labelDefs.entries()){const el=$('labels').children[i];const hidden=!state.labels||(l.type==='risk'&&!state.risk)||(l.type==='frame'&&state.step<3)||(l.type==='entry'&&state.step<1);el.style.display=hidden?'none':'block';const lead=$('label-leaders').children[i];lead.style.display=hidden?'none':'block';if(hidden)continue;const p=vec(l.point).project(camera);if(p.z>1||p.z< -1){el.style.display='none';lead.style.display='none';continue}let x=(p.x*.5+.5)*w+l.offset[0],y=(-p.y*.5+.5)*h+l.offset[1];const ew=el.offsetWidth,eh=el.offsetHeight;x=Math.max(ew/2+8,Math.min(w-ew/2-8,x));y=Math.max(90,Math.min(h-72,y));for(const q of placed){if(Math.abs(x-q.x)<(ew+q.w)/2+3&&Math.abs(y-q.y)<(eh+q.h)/2+3)y=q.y+q.h/2+eh/2+5}y=Math.min(h-72,y);el.style.left=x+'px';el.style.top=y+'px';const px=(p.x*.5+.5)*w,py=(-p.y*.5+.5)*h;const line=lead.children[0],dot=lead.children[1];line.setAttribute('x1',px);line.setAttribute('y1',py);line.setAttribute('x2',x);line.setAttribute('y2',y);dot.setAttribute('cx',px);dot.setAttribute('cy',py);placed.push({x,y,w:ew,h:eh});}}
function stop(){state.playing=false;clearInterval(timer);timer=null;$('play').textContent='▶ 分步播放'}
function setStep(n,fromPlay=false){if(!fromPlay)stop();state.step=Math.max(0,Math.min(5,n));updateVisibility();renderUI()}
function setTechnique(t){stop();state.tech=t;buildConstruct();$('selected-name').textContent='点击模型中的骨骼';$('selected-detail').textContent='查看其名称与数据来源编号';bones.forEach(b=>b.material.emissive.setHex(0));renderUI()}
function renderUI(){const l=lesson[state.tech][state.step];$('tech-sa').classList.toggle('active',state.tech==='sa');$('tech-ic').classList.toggle('active',state.tech==='ic');$('tech-sa').setAttribute('aria-selected',String(state.tech==='sa'));$('tech-ic').setAttribute('aria-selected',String(state.tech==='ic'));$('stage-name').textContent=state.tech==='sa'?'髋臼上外固定':'髂嵴外固定';document.querySelector('.stage-subtitle').textContent=steps[state.step];$('step-counter').textContent=`0${state.step+1} / 06`;$('detail-number').textContent='0'+(state.step+1);$('steps').innerHTML=steps.map((s,i)=>`<button class="step ${i===state.step?'active':''}" data-step="${i}" ${i===state.step?'aria-current="step"':''}><span class="number">${i+1}</span><span class="step-label">${s}</span><span class="step-arrow">›</span></button>`).join('');$('step-content').innerHTML=`<div class="en">${l[1]}</div><h2>${l[0]}</h2><p>${l[2]}</p><div class="key-point">${l[3]}</div><a class="source-ref" href="${AO}" target="_blank" rel="noopener">AO Surgery Reference · ${l[4]} ↗</a>`;$('progress-bar').style.width=(state.step+1)/6*100+'%';$('play-status').textContent=`步骤 ${state.step+1} / 6`;$('prev').disabled=state.step===0;$('next').disabled=state.step===5;}
$('tech-sa').onclick=()=>setTechnique('sa');$('tech-ic').onclick=()=>setTechnique('ic');$('steps').onclick=e=>{const b=e.target.closest('[data-step]');if(b)setStep(Number(b.dataset.step))};$('prev').onclick=()=>setStep(state.step-1);$('next').onclick=()=>setStep(state.step+1);$('play').onclick=()=>{if(state.playing){stop();return}if(state.step===5)setStep(0);state.playing=true;$('play').textContent='Ⅱ 暂停';timer=setInterval(()=>{if(state.step>=5){stop();return}setStep(state.step+1,true)},6500)};
for(const k of ['labels','risk','path'])$(k+'-toggle').onchange=e=>{state[k]=e.target.checked;updateVisibility();positionLabels()};$('opacity').oninput=e=>{state.opacity=Number(e.target.value)/100;$('opacity-value').textContent=e.target.value+'%';updateVisibility()};document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(b.dataset.view));$('reset').onclick=()=>setView('front');$('sources-open').onclick=()=>$('source-dialog').showModal();$('sources-close').onclick=()=>$('source-dialog').close();$('source-dialog').onclick=e=>{if(e.target===$('source-dialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close()}};
function wrap(ctx,text,x,y,width,lineHeight){let line='';for(const ch of text){if(ctx.measureText(line+ch).width>width){if('，。；：！？、）】》'.includes(ch)){ctx.fillText(line+ch,x,y);y+=lineHeight;line=''}else{ctx.fillText(line,x,y);y+=lineHeight;line=ch}}else line+=ch}if(line)ctx.fillText(line,x,y);return y+lineHeight}
async function exportPlate(download=true){if(!renderer)throw Error('WebGL unavailable');stop();await document.fonts.ready;
 const W=3840,H=2160,c=document.createElement('canvas');c.width=W;c.height=H;const ctx=c.getContext('2d');ctx.fillStyle='#f5f7ef';ctx.fillRect(0,0,W,H);
 const title=state.tech==='sa'?'髋臼上外固定':'髂嵴外固定';const l=lesson[state.tech][state.step];ctx.fillStyle='#174b3d';ctx.font='500 28px "PingFang SC",sans-serif';ctx.fillText('HUMAN ATLAS   /   骨盆外固定手术解剖教学',110,100);ctx.font='600 80px "PingFang SC",sans-serif';ctx.fillText(title,105,215);ctx.font='32px "PingFang SC",sans-serif';ctx.fillStyle='#7b8976';ctx.fillText(`${state.tech==='sa'?'SUPRA-ACETABULAR':'ILIAC CREST'}   ·   步骤 ${state.step+1}/6：${l[0]}`,110,285);
 const oldSize=renderer.getSize(new THREE.Vector2()),ratio=renderer.getPixelRatio(),aspect=camera.aspect;const rw=2520,rh=1530,ox=60,oy=390;
 try{renderer.setPixelRatio(1);renderer.setSize(rw,rh,false);camera.aspect=rw/rh;camera.updateProjectionMatrix();renderer.render(scene,camera);ctx.drawImage(renderer.domElement,ox,oy,rw,rh);
  if(state.labels){const used=[];ctx.font='27px "PingFang SC",sans-serif';for(const a of labelDefs){if((a.type==='risk'&&!state.risk)||(a.type==='frame'&&state.step<3)||(a.type==='entry'&&state.step<1))continue;const p=vec(a.point).project(camera);if(p.z>1||p.z< -1)continue;const px=ox+(p.x/2+.5)*rw,py=oy+(-p.y/2+.5)*rh;const tw=ctx.measureText(a.text).width;let x=Math.max(90,Math.min(2460-tw,px+(a.offset[0]>0?55:a.offset[0]<0?-tw-55:-tw/2))),y=py+a.offset[1]*2;for(const u of used)if(Math.abs(y-u.y)<65&&x<u.x+u.w&&x+tw>u.x)y=u.y+72;used.push({x,y,w:tw});ctx.strokeStyle=a.type==='risk'?'#bd893e':'#7b9784';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(x+tw/2,y-10);ctx.stroke();ctx.fillStyle='#fcfff4';ctx.fillRect(x-12,y-36,tw+24,52);ctx.fillStyle=a.type==='risk'?'#a06e2d':'#215e4e';ctx.fillText(a.text,x,y);}}
 }finally{renderer.setPixelRatio(ratio);renderer.setSize(oldSize.x,oldSize.y,false);camera.aspect=aspect;camera.updateProjectionMatrix();renderer.render(scene,camera);}
 ctx.strokeStyle='#d5ddcf';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(2670,370);ctx.lineTo(2670,1920);ctx.stroke();ctx.fillStyle='#1b5143';ctx.font='600 46px "PingFang SC",sans-serif';ctx.fillText('示教要点',2800,450);ctx.font='38px "PingFang SC",sans-serif';ctx.fillStyle='#53694e';let yy=wrap(ctx,l[2],2800,540,890,66);ctx.fillStyle='#a37a3c';yy=wrap(ctx,l[3],2800,yy+80,880,62);ctx.fillStyle='#1b5143';ctx.font='600 40px "PingFang SC",sans-serif';ctx.fillText('阅读这张图',2800,1170);ctx.font='32px "PingFang SC",sans-serif';ctx.fillStyle='#71836a';wrap(ctx,'骨骼：真实参考解剖网格\n'.trim(),2800,1250,880,56);wrap(ctx,'器械与骨内钉道：教学性几何',2800,1320,880,56);wrap(ctx,'橙色区域：邻近风险示意，非真实神经走行',2800,1390,880,56);wrap(ctx,'完整参考骨盆；不表示骨折复位效果',2800,1510,880,56);wrap(ctx,'未作患者级安全通道验证，不用于手术导航',2800,1630,880,56);ctx.font='26px "PingFang SC",sans-serif';wrap(ctx,`当前骨骼不透明度 ${Math.round(state.opacity*100)}% · 标注 ${state.labels?'开':'关'} · 风险 ${state.risk?'开':'关'} · 钉道 ${state.path?'开':'关'}`,2800,1800,880,45);
 ctx.fillStyle='#e2e8da';ctx.fillRect(90,1980,3660,2);ctx.font='25px "PingFang SC",sans-serif';ctx.fillStyle='#6c7c61';ctx.fillText('术式依据：AO Surgery Reference / External fixation · 独立教学改编，非 AO 官方制作或认证 · 核对：2026-09-08',110,2040);ctx.font='22px sans-serif';ctx.fillText(AO,110,2082);ctx.fillText('BodyParts3D © DBCLS · CC BY 4.0 · via TUANZIDING/human-atlas · 器械与标注为新增示意',110,2125);
 const url=c.toDataURL('image/png');if(download){const a=document.createElement('a');a.href=url;a.download=`pelvic-${state.tech}-step${state.step+1}-4k.png`;a.click();toast('已生成 3840 × 2160 PNG 教学图')}return url;
}
$('export').onclick=async()=>{const b=$('export');b.disabled=true;b.textContent='正在生成…';try{await exportPlate()}catch(e){toast('导出失败：'+e.message)}finally{b.disabled=false;b.textContent='↓ 导出 4K 教学图'}};
const enSteps=['Anatomy orientation','Identify entry point','Insert fixation pins','Connect anterior frame','Reduce and lock','Final checks'];
function updateLanguage(){const en=state.lang==='en';$('lang-toggle').textContent=en?'中 / EN':'EN / 中';document.documentElement.lang=en?'en':'zh-CN';$('stage-name').textContent=en?(state.tech==='sa'?'Supra-acetabular external fixation':'Iliac crest external fixation'):(state.tech==='sa'?'髋臼上外固定':'髂嵴外固定');document.querySelectorAll('#steps .step-label').forEach((el,i)=>el.textContent=en?enSteps[i]:steps[i]);$('step-content').querySelector('h2').textContent=en?lesson[state.tech][state.step][1]:lesson[state.tech][state.step][0];$('sources-open').textContent=en?'Sources ↗':'依据与说明 ↗';$('export').textContent=en?'↓ Export 4K plate':'↓ 导出 4K 教学图';}
$('lang-toggle').onclick=()=>{state.lang=state.lang==='zh'?'en':'zh';renderUI();updateLanguage()};
const originalSetTechnique=setTechnique;
$('tech-sa').onclick=()=>{originalSetTechnique('sa');updateLanguage()};
$('tech-ic').onclick=()=>{originalSetTechnique('ic');updateLanguage()};
init();
$('export').onclick=()=>window.neurovascular.exportPlate(0);
state.risk=false;state.labels=false;$('risk-toggle').checked=false;$('labels-toggle').checked=false;updateVisibility();
$('lang-toggle').onclick=()=>{state.lang=state.lang==='zh'?'en':'zh';renderUI();updateLanguage()};
$('tech-sa').onclick=()=>{setTechnique('sa');updateLanguage()};
$('tech-ic').onclick=()=>{setTechnique('ic');updateLanguage()};
