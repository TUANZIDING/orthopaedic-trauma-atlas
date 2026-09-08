"""Extract only the referenced bone meshes; original geometry remains unchanged."""
import json, struct, pathlib, subprocess, sys
base=pathlib.Path(sys.argv[1] if len(sys.argv)>1 else '../human-atlas')
atlas=json.loads((base/'public/models/atlas.json').read_text())
ids={'FJ3152':'右髋骨','FJ3288':'左髋骨','FJ3393':'骶骨','FJ3168':'第五腰椎','FJ3259':'左股骨近端','FJ3365':'右股骨近端'}
parts=[]
for p in atlas['parts']:
 if p['id'] not in ids:continue
 b=(base/'public/models'/pathlib.Path(atlas['chunks'][p['chunk']]['url']).name).read_bytes()
 pos=list(struct.unpack_from('<'+str(p['vertexCount']*3)+'f',b,p['positions']))
 idx=list(struct.unpack_from('<'+str(p['indexCount'])+'I',b,p['indices']))
 # Pelvic teaching coordinates are mm, recentered vertically at 0.93 m.
 for i in range(0,len(pos),3):
  pos[i]=round(pos[i]*1000,4);pos[i+1]=round((pos[i+1]-.93)*1000,4);pos[i+2]=round(pos[i+2]*1000,4)
 if 'femur' in p['name'].lower():
  # Clip triangles at a common shaft plane, preserving the proximal surface.
  newpos=[];newidx=[];edgepoints=[];cut=-145.
  for i in range(0,len(idx),3):
   poly=[pos[k*3:k*3+3] for k in idx[i:i+3]];out=[]
   for k,a in enumerate(poly):
    b=poly[(k+1)%len(poly)];ina=a[1]>=cut;inb=b[1]>=cut
    if ina:out.append(a)
    if ina!=inb:
     t=(cut-a[1])/(b[1]-a[1]);q=[a[d]+t*(b[d]-a[d]) for d in range(3)];out.append(q);edgepoints.append(q)
   if len(out)>=3:
    start=len(newpos)//3
    for q in out:newpos.extend(q)
    for k in range(1,len(out)-1):newidx.extend([start,start+k,start+k+1])
  # Flat shaft cut is a display crop, not a fracture surface.
  if edgepoints:
   import math
   center=[sum(q[d] for q in edgepoints)/len(edgepoints) for d in range(3)]
   unique=list({tuple(round(x,4) for x in q):q for q in edgepoints}.values())
   unique.sort(key=lambda q:math.atan2(q[2]-center[2],q[0]-center[0]))
   start=len(newpos)//3;newpos.extend(center)
   for q in unique:newpos.extend(q)
   for k in range(len(unique)):newidx.extend([start,start+1+k,start+1+(k+1)%len(unique)])
  pos=[round(x,4) for x in newpos];idx=newidx
 parts.append({'id':p['id'],'name':ids[p['id']],'sourceName':p['name'],'positions':pos,'indices':idx})
output={'source':'BodyParts3D 4.0 via TUANZIDING/human-atlas','commit':subprocess.check_output(['git','-C',str(base),'rev-parse','HEAD'],text=True).strip(),'parts':parts}
pathlib.Path('src/model.json').write_text(json.dumps(output,separators=(',',':'),ensure_ascii=False))
print('Extracted',len(parts),'meshes;',sum(len(p['indices'])//3 for p in parts),'triangles')
