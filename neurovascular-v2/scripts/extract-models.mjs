import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const base=process.argv[2]??'/tmp/pelvis-human-atlas';
const atlas=JSON.parse(fs.readFileSync(path.join(base,'public/models/atlas.json')));
const commit=execFileSync('git',['-C',base,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
const specs={
 tibial:{center:[.083,.425,-.01],ids:['FJ3282','FJ3260','FJ3275','FJ3259'],crop:[.29,.59]},
 calcaneal:{center:[.080,.038,-.028],ids:['FJ3256','FJ3280','FJ3258','FJ3264','FJ3267','FJ3271','FJ3241','FJ3244','FJ3247','FJ3250','FJ3253','FJ3282','FJ3260'],crop:[-.1,.195]},
 cranial:{center:[0,1.59,-.025],ids:['FJ3200','FJ3274','FJ3380','FJ3281','FJ3386','FJ3309','FJ3289','FJ3269','FJ3375','FJ3287','FJ3392','FJ3272','FJ3378','FJ3394','FJ3176','FJ3177','FJ3161','FJ3164','FJ3167','FJ3170','FJ3172'],crop:null}
};
const names={'FJ3282':'左胫骨','FJ3260':'左腓骨','FJ3275':'左髌骨','FJ3259':'左股骨远端','FJ3256':'左跟骨','FJ3280':'左距骨','FJ3258':'左骰骨','FJ3264':'中间楔骨','FJ3267':'外侧楔骨','FJ3271':'内侧楔骨','FJ3200':'额骨','FJ3274':'左顶骨','FJ3380':'右顶骨','FJ3281':'左颞骨','FJ3386':'右颞骨','FJ3309':'枕骨','FJ3289':'下颌骨','FJ3269':'左上颌骨','FJ3375':'右上颌骨','FJ3287':'左颧骨','FJ3392':'右颧骨','FJ3272':'左鼻骨','FJ3378':'右鼻骨','FJ3394':'蝶骨','FJ3176':'寰椎 C1','FJ3177':'枢椎 C2','FJ3161':'颈椎 C3','FJ3164':'颈椎 C4','FJ3167':'颈椎 C5','FJ3170':'颈椎 C6','FJ3172':'颈椎 C7','FJ3241':'第一跖骨','FJ3244':'第二跖骨','FJ3247':'第三跖骨','FJ3250':'第四跖骨','FJ3253':'第五跖骨'};
// Clip display crops at a plane. Crops are not fractures and remain annotated as such.
function clip(poly,level,keepAbove){const out=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],ain=keepAbove?a[1]>=level:a[1]<=level,bin=keepAbove?b[1]>=level:b[1]<=level;if(ain)out.push(a);if(ain!==bin){const t=(level-a[1])/(b[1]-a[1]);out.push(a.map((v,d)=>v+t*(b[d]-v)))}}return out}
for(const [key,spec] of Object.entries(specs)){
 const parts=[];
 for(const id of spec.ids){const p=atlas.parts.find(p=>p.id===id);if(!p)throw Error(id);const b=fs.readFileSync(path.join(base,'public/models',path.basename(atlas.chunks[p.chunk].url)));const pos=Array.from(new Float32Array(b.buffer,b.byteOffset+p.positions,p.vertexCount*3));let indices=Array.from(new Uint32Array(b.buffer,b.byteOffset+p.indices,p.indexCount));let positions=pos;
  if(spec.crop&&(p.bounds[0][1]<spec.crop[0]||p.bounds[1][1]>spec.crop[1])){positions=[];const out=[];for(let i=0;i<indices.length;i+=3){let poly=indices.slice(i,i+3).map(k=>pos.slice(k*3,k*3+3));poly=clip(poly,spec.crop[0],true);if(poly.length)poly=clip(poly,spec.crop[1],false);if(poly.length<3)continue;const start=positions.length/3;poly.forEach(p=>positions.push(...p));for(let j=1;j<poly.length-1;j++)out.push(start,start+j,start+j+1)}indices=out}
  positions=positions.map((v,i)=>+((v-spec.center[i%3])*1000).toFixed(4));parts.push({id,name:{zh:names[id]??p.name,en:p.name},positions,indices});
 }
 fs.mkdirSync('traction-atlas/src/models',{recursive:true});fs.writeFileSync(`traction-atlas/src/models/${key}.json`,JSON.stringify({source:'BodyParts3D 4.0',commit,center:spec.center,parts}));
 console.log(key,parts.length,'structures',parts.reduce((s,p)=>s+p.indices.length/3,0),'triangles');
}
