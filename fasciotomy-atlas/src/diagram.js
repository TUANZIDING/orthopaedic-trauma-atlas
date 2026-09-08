const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const palette=['#a1cfc0','#efc68b','#b9add8','#a8cbdc','#d8b5c5','#c1cea3'];
export function diagram(id,M,lang,stage,layers={skin:.15,muscle:true,fascia:true,bone:true,nv:true,ghost:true}){
 const t=v=>typeof v==='object'?v[lang]:String(v), tr=(zh,en)=>lang==='zh'?zh:en;
 const text=(x,y,v,size=20,color='#254844',anchor='start')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="${anchor}">${esc(t(v))}</text>`;
 const path=(d,fill,stroke='#42655e',width=2,extra='')=>`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" ${extra}/>`;
 const ellipse=(cx,cy,rx,ry,fill,extra='')=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
 const line=(x1,y1,x2,y2,color,width=3,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" ${extra}/>`;
 const dot=(x,y,c,r=6)=>ellipse(x,y,r,r,c);
 const badge=(x,y,n)=>dot(x,y,'#173e38',17)+text(x,y+6,n,18,'white','middle');
 const incision=(d,release=false)=>path(d,'none','#aa2f76',release?7:4,release?'stroke-linecap="round"':'stroke-dasharray="11 8"');
 let skin='',muscle='',fascia='',bone='',nv='',inc='',labels='',section='';
 const longBone=(x,y,len,w=20)=>path(`M ${x-w} ${y} Q ${x-8} ${y+len*.3} ${x-11} ${y+len*.7} L ${x-w} ${y+len} Q ${x} ${y+len+12} ${x+w} ${y+len} L ${x+11} ${y+len*.7} Q ${x+8} ${y+len*.3} ${x+w} ${y} Z`,'#eee5cd','#a79c84',2);
 const bundle=(d,offset=0)=>path(d,'none','#ca494a',5)+path(d,'none','#397ca4',3,`transform="translate(${offset||8} 0)"`)+path(d,'none','#c39c20',5,`transform="translate(${offset||-9} 0)"`);
 const region=(d,i,nx,ny)=>`<g class="compartment" data-part="${i}" tabindex="0" role="button" aria-label="${esc(t(M.parts[i]))}">${path(d,palette[i%6],layers.fascia?'#667773':'none',layers.fascia?3:0,`opacity="${layers.muscle?1:.12}"`)}${badge(nx,ny,i+1)}</g>`;
 if(id==='leg'){
  for(const x of [235,565]){
   skin+=path(`M ${x-65} 232 Q ${x-100} 330 ${x-72} 465 Q ${x-48} 570 ${x-40} 680 L ${x+40} 680 Q ${x+46} 565 ${x+68} 445 Q ${x+105} 318 ${x+65} 232 Z`,'#d5ad89','#ab806b',2);
   muscle+=ellipse(x-26,422,42,175,palette[x===235?0:3])+ellipse(x+28,414,36,170,palette[x===235?1:2]);
   bone+=longBone(x-12,255,402,15)+longBone(x+50,276,370,7);
   fascia+=path(`M ${x-65} 242 Q ${x-89} 373 ${x-50} 575 L ${x-35} 665 M ${x+65} 242 Q ${x+90} 373 ${x+50} 575 L ${x+35} 665`,'none','#6f8580',3);
  }
  nv+=path('M 270 258 Q 309 270 292 310 Q 276 399 280 488 Q 278 550 245 608','none','#bf9c22',6)+path('M 293 506 Q 293 568 320 600','none','#bf9c22',3);
  nv+=bundle('M 561 276 Q 547 420 555 600 L 553 656')+path('M 509 270 Q 500 460 525 655','none','#397ca4',5)+path('M 516 270 Q 507 460 532 655','none','#bf9c22',4);
  if(stage>=1)inc+=incision('M 253 258 Q 275 413 259 635')+incision('M 536 258 Q 522 413 544 635');
  if(stage>=2)inc+=incision('M 222 290 L 235 620',true)+incision('M 280 304 L 281 617',true);
  if(stage>=3)inc+=incision('M 506 292 Q 485 440 520 620',true)+incision('M 554 300 L 548 625',true);
  labels+=text(235,201,tr('前外侧入路','Anterolateral approach'),23,'#214b44','middle')+text(565,201,tr('后内侧入路','Posteromedial approach'),23,'#214b44','middle');
  labels+=text(118,718,tr('虚线：皮切口','Dashes: skin incision'),19)+text(118,746,tr('实线：不同筋膜的松解（展开示意）','Solid: fascial releases (unfolded schematic)'),19)+text(118,785,tr('比目鱼肌深面 → 深后室，不能只松解浅层','Beneath soleus → deep posterior, not superficial only'),18);
  section+=region('M 1102 292 C 1214 260 1307 330 1323 410 L 1262 459 L 1140 447 L 1080 378 Z',0,1210,354);
  section+=region('M 1323 410 Q 1388 462 1336 577 L 1270 550 L 1262 459 Z',1,1330,490);
  section+=region('M 1080 378 L 1140 447 L 1262 459 L 1270 550 Q 1160 584 1042 541 L 1028 465 Z',2,1160,531);
  section+=region('M 1042 541 Q 1160 584 1270 550 L 1336 577 Q 1307 680 1170 681 Q 1039 675 997 581 L 1028 465 Z',3,1174,625);
  bone+=path('M 1096 332 L 1144 439 Q 1092 492 1054 446 L 1064 394 Z','#eee5cd','#a79c84',3)+ellipse(1265,474,21,28,'#eee5cd','stroke="#a79c84" stroke-width="3"');
  nv+=dot(1162,442,'#ca494a')+dot(1177,442,'#397ca4')+dot(1191,442,'#bf9c22')+dot(1100,512,'#ca494a')+dot(1114,512,'#397ca4')+dot(1128,512,'#bf9c22')+dot(1310,461,'#bf9c22');
  labels+=text(1167,222,tr('小腿中段 · 关系横断面','Mid-leg · relational section'),25,'#214b44','middle');
  labels+=text(1080,430,tr('胫','T'),20)+text(1265,481,tr('腓','F'),16,'#254844','middle');
  if(stage>=2)section+=incision('M 1292 335 L 1318 371',true)+incision('M 1350 475 L 1350 532',true);
  if(stage>=3)section+=incision('M 1025 484 L 1036 525',true)+incision('M 1016 566 L 1037 613',true);
 } else if(id==='thigh'){
  for(const x of [235,565]){
   skin+=path(`M ${x-84} 235 Q ${x-110} 402 ${x-50} 680 L ${x+48} 680 Q ${x+110} 400 ${x+78} 235 Z`,'#d5ad89','#ab806b',2);
   muscle+=ellipse(x-28,425,51,178,palette[x===235?0:1])+ellipse(x+32,430,43,168,palette[x===235?2:0]);
   bone+=longBone(x,245,418,20);
   fascia+=path(`M ${x+69} 250 Q ${x+83} 433 ${x+34} 657`,'none','#687e79',8);
  }
  nv+=bundle('M 535 262 Q 500 420 530 650')+path('M 247 290 Q 266 440 259 641','none','#bf9c22',6);
  for(const y of [348,402,464])nv+=path(`M 250 ${y} Q 287 ${y-10} 297 ${y+16}`,'none','#ca494a',5);
  if(stage>=1)inc+=incision('M 291 251 Q 309 430 271 654')+incision('M 517 281 Q 489 480 526 652');
  if(stage>=2)inc+=incision('M 278 272 Q 288 433 260 645',true);
  if(stage>=3)inc+=incision('M 251 307 L 254 626',true);
  if(stage>=4)inc+=incision('M 501 305 Q 484 436 512 617',true);
  labels+=text(235,201,tr('外侧：前室 → 后室','Lateral: anterior → posterior'),21,'#214b44','middle')+text(565,201,tr('内侧：收肌室','Medial: adductors'),23,'#214b44','middle');
  labels+=text(115,724,tr('肌间隔松解前识别股深动脉穿支','Identify profunda perforators before septal release'),18)+text(115,758,tr('前内侧股血管；后方坐骨神经','Femoral vessels anteromedially; sciatic nerve posteriorly'),18);
  section+=region('M 994 451 Q 1006 300 1160 285 Q 1326 287 1368 455 L 1180 492 L 1100 443 Z',0,1180,362);
  section+=region('M 994 451 L 1100 443 L 1180 492 L 1110 657 Q 990 620 994 451 Z',1,1050,535);
  section+=region('M 1180 492 L 1368 455 Q 1390 658 1205 682 L 1110 657 Z',2,1251,609);
  bone+=ellipse(1179,487,34,41,'#eee5cd','stroke="#a79c84" stroke-width="3"');
  nv+=dot(1074,428,'#ca494a',9)+dot(1096,432,'#397ca4',8)+dot(1090,449,'#bf9c22',6)+dot(1203,576,'#bf9c22',10)+line(1212,492,1304,469,'#ca494a',4);
  labels+=text(1179,494,tr('股','F'),20,'#254844','middle')+text(1167,222,tr('大腿中段 · 关系横断面','Mid-thigh · relational section'),25,'#214b44','middle');
  if(stage>=2)section+=incision('M 1363 413 L 1374 452',true);
  if(stage>=3)section+=incision('M 1280 474 L 1345 460',true);
  if(stage>=4)section+=incision('M 992 487 L 995 540',true);
 } else {
  skin+=path('M 248 667 Q 172 570 175 459 Q 149 391 190 310 Q 205 265 232 302 Q 242 246 268 277 Q 286 239 307 279 Q 336 253 348 309 Q 383 290 390 340 Q 437 429 390 550 L 348 671 Z','#d5ad89','#ab806b',2);
  for(let i=0;i<5;i++){
   const x=207+i*36,y=326+i*10;
   bone+=longBone(x,y,182-i*9,i===0?13:9);
   if(i<4)muscle+=ellipse(x+18,y+87,12,70,palette[0]);
  }
  bone+=ellipse(290,568,38,53,'#eee5cd','stroke="#a79c84"');
  fascia+=path('M 183 350 Q 262 310 389 366 M 195 485 Q 281 449 394 503','none','#687e79',3);
  nv+=bundle('M 285 647 Q 280 520 242 451 Q 227 391 225 345')+path('M 336 569 Q 367 492 350 382 M 350 455 L 384 412','none','#bf9c22',4);
  if(stage>=1)inc+=incision('M 243 326 L 250 490')+incision('M 316 347 L 322 500');
  if(stage>=2){for(let i=0;i<4;i++)inc+=incision(`M ${224+i*36} 359 L ${226+i*36} 470`,true);}
  labels+=text(290,212,tr('右足背面 · 第2/4跖骨轴线','Right dorsum · MT2 / MT4 axes'),22,'#214b44','middle');
  // Medial and lateral surfaces are separate views, not superimposed plantar incisions.
  for(const y of [305,510]){
   skin+=path(`M 485 ${y} Q 535 ${y-38} 590 ${y+5} L 708 ${y+32} Q 741 ${y+68} 700 ${y+72} L 488 ${y+70} Q 459 ${y+46} 485 ${y} Z`,'#d5ad89','#ab806b',2);
   muscle+=ellipse(585,y+42,93,15,palette[y===305?1:4]);
  }
  labels+=text(596,270,tr('内侧足弓 / 拇展肌','Medial arch / abductor hallucis'),19,'#214b44','middle')+text(596,474,tr('外侧 / 第5跖骨跖侧','Lateral / plantar to MT5'),19,'#214b44','middle');
  nv+=bundle('M 485 320 Q 525 345 664 347');
  if(stage>=3)inc+=incision('M 493 359 Q 560 336 697 356',true);
  if(stage>=4)inc+=incision('M 493 563 Q 605 551 705 565',true);
  labels+=text(130,721,tr('前足横断面不能代表后足已减压','Forefoot release does not establish hindfoot release'),20)+text(130,758,tr('示意入路须按受累范围个体化','Individualize access to the involved compartments'),20);
  // Forefoot at metatarsal shaft level. Calcaneal compartment is separate.
  section+=text(1170,207,tr('前足横断面 · 背侧向上','Forefoot section · dorsal up'),23,'#214b44','middle');
  section+=region('M 943 348 Q 972 305 1003 338 L 1012 449 Q 951 451 943 348 Z',1,974,401);
  section+=region('M 1012 416 L 1355 416 L 1380 470 Q 1180 529 986 470 Z',2,1180,478);
  section+=region('M 1012 367 Q 1170 350 1352 370 L 1355 416 L 1012 416 Z',3,1180,400);
  section+=region('M 1360 332 Q 1422 336 1419 400 L 1380 470 L 1355 416 Z',4,1390,399);
  for(let i=0;i<4;i++)section+=region(`M ${1010+i*85} 276 Q ${1038+i*85} 250 ${1062+i*85} 279 L ${1062+i*85} 361 L ${1010+i*85} 361 Z`,0,1036+i*85,317);
  for(let i=0;i<5;i++){bone+=ellipse(989+i*85,332,i===0?22:16,24,'#eee5cd','stroke="#a79c84" stroke-width="2"');labels+=text(989+i*85,339,String(i+1),17,'#254844','middle');}
  nv+=dot(1040,267,'#ca494a')+dot(1054,267,'#bf9c22')+dot(1008,424,'#ca494a')+dot(1024,425,'#bf9c22');
  section+=text(1170,571,tr('后足独立示意 · 跟骨室','Separate hindfoot schematic · calcaneal'),21,'#214b44','middle');
  section+=region('M 1084 655 Q 1175 697 1263 655 L 1271 718 Q 1173 753 1077 718 Z',5,1175,713);
  bone+=ellipse(1175,631,70,30,'#eee5cd','stroke="#a79c84" stroke-width="2"');labels+=text(1175,638,tr('跟骨','Calcaneus'),18,'#254844','middle');
  nv+=dot(1080,671,'#ca494a')+dot(1095,671,'#397ca4')+dot(1064,671,'#bf9c22');
  if(stage>=2)for(const x of [1036,1121,1206,1291])section+=incision(`M ${x-16} 272 L ${x+16} 272`,true);
  if(stage>=3)section+=incision('M 1078 688 L 1080 716',true);
 }
 if(layers.nv){
  const callout=(x,y,tx,ty,zh,en)=>line(x,y,tx,ty+5,'#788b7e',1)+text(tx,ty,tr(zh,en),15,'#7b6523');
  if(id==='leg')labels+=callout(1310,461,1376,355,'腓浅神经','Superficial fibular n.')+callout(1177,442,1347,293,'胫前血管/腓深神经','Ant. tibial / deep fibular')+callout(1114,512,844,489,'胫后束/胫神经','Post. tibial bundle');
  if(id==='thigh')labels+=callout(1085,430,844,352,'股动静脉','Femoral vessels')+callout(1203,576,1353,686,'坐骨神经','Sciatic nerve');
  if(id==='foot')labels+=callout(1045,267,845,288,'足背束','Dorsalis pedis bundle')+callout(1008,424,844,538,'足底内侧束','Medial plantar bundle');
 }
 const short=stage===0?tr('先辨认筋膜室与风险结构','Identify compartments and structures at risk'):t(M.steps[stage][0]);
 labels+=text(55,132,tr('紫红虚线＝切皮；紫红实线＝松解 · 入路展开，非比例解剖','Magenta dashes = skin; solid = fascia · Unfolded approaches, not-to-scale anatomy'),17,'#8a3970');
 const legend=M.parts.map((v,i)=>text(894+(i%2)*310,782+Math.floor(i/2)*26,`${i+1}  ${t(v)}`,17)).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-label="${esc(t(M.title))}" style="font-family:Arial,'Noto Sans CJK SC','PingFang SC',sans-serif"><defs><clipPath id="boneClip">${bone}</clipPath></defs><rect width="1600" height="900" fill="#f4f5ed"/><rect width="1600" height="10" fill="${M.color}"/>${text(55,66,t(M.title),36)}${text(55,104,`0${stage+1} / 06  ·  ${short}`,23)}${text(1545,62,'FASCIOTOMY / V1.0',17,'#657a70','end')}<rect x="45" y="145" width="732" height="678" rx="22" fill="#e7ece5"/><rect x="810" y="145" width="745" height="678" rx="22" fill="#fffdf6"/>${section}<g opacity="${layers.muscle?.85:0}">${muscle}</g><g opacity="${layers.fascia?1:0}">${fascia}</g><g opacity="${layers.nv?1:0}">${nv}</g><g opacity="${layers.bone?1:0}">${bone}</g><g clip-path="url(#boneClip)" opacity="${layers.bone&&layers.nv&&layers.ghost?.22:0}">${nv}</g><g opacity="${layers.skin}">${skin}</g>${inc}${labels}${legend}${text(900,250,tr('内侧 ←   示意方向   → 外侧','Medial ←  schematic axes  → Lateral'),17,'#6e7c70')}${text(55,851,tr('红：动脉  蓝：静脉  黄：神经  ·  皮切口 ≠ 筋膜松解','Red: artery  Blue: vein  Yellow: nerve  ·  Skin incision ≠ fascial release'),18)}${text(55,882,tr('非比例原创示意 · AO / BOASt 2025 / AAOS 2025 · 教学用，非手术导航','Original not-to-scale schematic · AO / BOASt 2025 / AAOS 2025 · Teaching, not surgical navigation'),17,'#6a7368')}</svg>`;
}
