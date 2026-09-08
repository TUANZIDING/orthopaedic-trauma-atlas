"""Check displayed centerlines against the reference mesh, NOT clinical safety."""
import json
from pathlib import Path
import numpy as np
model=json.loads(Path('src/model.json').read_text());construct=json.loads(Path('src/constructs.json').read_text());results=[]
for side,id in [(1,'FJ3288'),(-1,'FJ3152')]:
 part=next(p for p in model['parts'] if p['id']==id)
 v=np.array(part['positions']).reshape(-1,3);idx=np.array(part['indices']).reshape(-1,3);tri=v[idx];a,b,c=tri[:,0],tri[:,1],tri[:,2];e1=b-a;e2=c-a
 for tech in ['sa','ic']:
  for i,cfg in enumerate(construct[tech]):
   entry=np.array(cfg['entry'],float)*[side,1,1];end=np.array(cfg['end'],float)*[side,1,1];d=end-entry;L=np.linalg.norm(d);d/=L;origin=entry-d*20
   h=np.cross(d,e2);det=np.einsum('ij,ij->i',e1,h);inv=np.zeros_like(det);np.divide(1,det,out=inv,where=np.abs(det)>1e-9);s=origin-a;u=inv*np.einsum('ij,ij->i',s,h);q=np.cross(s,e1);vv=inv*np.einsum('j,ij->i',d,q);t=inv*np.einsum('ij,ij->i',e2,q);valid=(abs(det)>1e-9)&(u>=0)&(vv>=0)&(u+vv<=1)&(t>0);cross=sorted(t[valid]-20)
   # 2 mm entry tolerance accommodates source mesh left/right asymmetry.
   ok=len(cross)>=2 and abs(cross[0])<2 and cross[1]>L
   row={'technique':tech,'side':'left' if side==1 else 'right','pin':i+1,'entry_surface_offset_mm':round(float(cross[0]),3),'displayed_segment_length_mm':round(float(L),3),'next_surface_distance_mm':round(float(cross[1]),3),'centerline_inside_after_entry':bool(ok)}
   results.append(row)
   assert ok,row
for p in model['parts']:
 assert all(np.isfinite(p['positions']))
 assert max(p['indices'])<len(p['positions'])//3
 assert len(p['indices'])%3==0
out={'scope':'Numerical centerline-versus-surface display consistency only. Does not verify full screw radius, bone density, patient safety, or clinical suitability. Coordinates are not clinical measurements.','source_commit':model['commit'],'meshes':len(model['parts']),'triangles':sum(len(p['indices'])//3 for p in model['parts']),'results':results}
Path('docs/geometry-check.json').write_text(json.dumps(out,indent=2))
print(json.dumps(out,indent=2))
