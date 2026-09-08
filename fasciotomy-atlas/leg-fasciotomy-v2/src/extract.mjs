import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
const base='/tmp/pelvis-human-atlas';
const atlas=JSON.parse(fs.readFileSync(base+'/public/models/atlas.json'));
const specs=[
['FJ3282','胫骨','bone'],['FJ3260','腓骨','bone'],['FJ1392M','骨间膜','membrane'],
['FJ1439M','胫骨前肌','anterior'],['FJ1406M','趾长伸肌','anterior'],['FJ1408M','拇长伸肌','anterior'],['FJ1411M','第三腓骨肌','anterior'],
['FJ1409M','腓骨短肌','lateral'],['FJ1410M','腓骨长肌','lateral'],
['FJ1394M','腓肠肌外侧头','superficial'],['FJ1397M','腓肠肌内侧头','superficial'],['FJ1437M','比目鱼肌','soleus'],
['FJ1440M','胫骨后肌','deep'],['FJ1414M','趾长屈肌','deep'],['FJ1415M','拇长屈肌','deep'],
['FJ2065','胫前动脉','artery'],['FJ2087','胫后动脉','artery'],['FJ2118','胫后静脉','vein'],['FJ2183','胫前静脉','vein'],['FJ2103','大隐静脉','vein']];
function clip(poly,y,above){let out=[];for(let i=0;i<poly.length;i++){let a=poly[i],b=poly[(i+1)%poly.length],ai=above?a[1]>=y:a[1]<=y,bi=above?b[1]>=y:b[1]<=y;if(ai)out.push(a);if(ai!==bi){let t=(y-a[1])/(b[1]-a[1]);out.push(a.map((v,j)=>v+t*(b[j]-v)));}}return out;}
const parts=specs.map(([id,zh,group])=>{let p=atlas.parts.find(p=>p.id===id);if(!p)throw Error(id);let b=fs.readFileSync(base+'/public/models/'+atlas.chunks[p.chunk].url.split('/').pop());let pos=new Float32Array(b.buffer,b.byteOffset+p.positions,p.vertexCount*3),ind=new Uint32Array(b.buffer,b.byteOffset+p.indices,p.indexCount),positions=[];
for(let i=0;i<ind.length;i+=3){let poly=Array.from(ind.slice(i,i+3),k=>Array.from(pos.slice(k*3,k*3+3)));poly=clip(poly,.085,true);if(poly.length)poly=clip(poly,.465,false);for(let j=1;j<poly.length-1;j++)for(let v of [poly[0],poly[j],poly[j+1]])positions.push(...v.map((n,k)=>+((n-[.080,.275,-.025][k])*1000).toFixed(3)));}
return {id,zh,en:p.name,group,positions};});
fs.writeFileSync(new URL('./anatomy.json',import.meta.url),JSON.stringify({source:'BodyParts3D 4.0 / DBCLS',commit:execFileSync('git',['-C',base,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),side:'left',center:[.080,.275,-.025],crop:[.085,.465],parts}));
console.log(parts.length+' atlas structures extracted; left, no mirroring.');
