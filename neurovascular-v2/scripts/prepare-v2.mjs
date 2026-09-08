import fs from 'node:fs';
import path from 'node:path';
const dst='neurovascular-v2';fs.mkdirSync(dst,{recursive:true});
for(const d of ['src','scripts'])fs.cpSync('traction-atlas/'+d,dst+'/'+d,{recursive:true,errorOnExist:true,force:false});
fs.cpSync('traction-atlas/research',dst+'/research',{recursive:true});
fs.mkdirSync(dst+'/pelvic-external-fixation/src',{recursive:true});
for(const f of ['app.js','template.html','style.css','model.json','constructs.json'])fs.copyFileSync('src/'+f,dst+'/pelvic-external-fixation/src/'+f);
for(const f of ['ATTRIBUTION.md','THIRD_PARTY_LICENSES.txt','LICENSE'])fs.copyFileSync(f,dst+'/pelvic-external-fixation/'+f);
const atlas=JSON.parse(fs.readFileSync('/tmp/pelvis-human-atlas/public/models/atlas.json'));
const spec={calcaneal:{center:[.080,.038,-.028],crop:[0,.195],ids:['FJ2087','FJ2118']},tibial:{center:[.083,.425,-.01],crop:[.29,.59],ids:['FJ2086','FJ2117','FJ2087','FJ2118','FJ2065']},pelvic:{center:[0,.93,0],crop:[.76,1.04],ids:['FJ2074','FJ2102','FJ2143','FJ2144']},cranial:{center:[0,1.59,-.025],crop:[1.46,1.7],ids:['FJ1725','FJ1725M']}};
const names={FJ2087:'左胫后动脉',FJ2118:'左胫后静脉',FJ2086:'左腘动脉',FJ2117:'左腘静脉',FJ2065:'左胫前动脉',FJ2074:'左股动脉',FJ2102:'左股静脉',FJ2143:'右股动脉',FJ2144:'右股静脉',FJ1725:'右椎动脉',FJ1725M:'左椎动脉'};
function clip(poly,y,above){let o=[];for(let i=0;i<poly.length;i++){let a=poly[i],b=poly[(i+1)%poly.length],ai=above?a[1]>=y:a[1]<=y,bi=above?b[1]>=y:b[1]<=y;if(ai)o.push(a);if(ai!==bi){let t=(y-a[1])/(b[1]-a[1]);o.push(a.map((v,j)=>v+t*(b[j]-v)));}}return o;}
for(const [key,s]of Object.entries(spec)){let parts=[];for(const id of s.ids){const p=atlas.parts.find(p=>p.id===id),buf=fs.readFileSync('/tmp/pelvis-human-atlas/public/models/'+path.basename(atlas.chunks[p.chunk].url));const pos=Array.from(new Float32Array(buf.buffer,buf.byteOffset+p.positions,p.vertexCount*3)),ind=Array.from(new Uint32Array(buf.buffer,buf.byteOffset+p.indices,p.indexCount)),positions=[],indices=[];for(let i=0;i<ind.length;i+=3){let poly=ind.slice(i,i+3).map(k=>pos.slice(k*3,k*3+3));poly=clip(clip(poly,s.crop[0],true),s.crop[1],false);if(poly.length<3)continue;let start=positions.length/3;poly.forEach(p=>positions.push(...p.map((v,j)=>+((v-s.center[j])*1000).toFixed(4))));for(let j=1;j<poly.length-1;j++)indices.push(start,start+j,start+j+1);}parts.push({id,name:{zh:names[id],en:p.name},type:/vein/i.test(p.name)?'vein':'artery',positions,indices});}fs.writeFileSync(dst+'/src/models/'+key+'-nv.json',JSON.stringify({source:'BodyParts3D reference mesh; display crop only',parts}));}
console.log('Preserved v1; prepared four additive v2 modules and cropped reference vessels.');
