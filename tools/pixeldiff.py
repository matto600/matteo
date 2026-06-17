#!/usr/bin/env python3
"""Pixel diff: confronta un render full-page con il mockup di design.
Uso: python3 tools/pixeldiff.py <render.png> <mockup.png> <out_prefix>
Stampa: delta altezza, score medio (0=identico,1=opposto) e score per banda.
Salva: <out_prefix>_side.png (mockup|render|heatmap) e <out_prefix>_heat.png
"""
import sys
from PIL import Image, ImageChops, ImageDraw, ImageFont
Image.MAX_IMAGE_PIXELS=None

render_p, mock_p, out = sys.argv[1], sys.argv[2], sys.argv[3]
R=Image.open(render_p).convert("RGB")
M=Image.open(mock_p).convert("RGB")
# normalizza alla larghezza del mockup
W=M.width
R=R.resize((W,int(R.height*W/R.width)))
H=min(M.height,R.height)
Rc=R.crop((0,0,W,H)); Mc=M.crop((0,0,W,H))
diff=ImageChops.difference(Mc,Rc).convert("L")
import statistics
px=list(diff.getdata())
mean=sum(px)/len(px)/255
print(f"mockup={M.size} render(scaled)={R.size} compared_h={H}")
print(f"height_delta_px={R.height-M.height}  (render-mockup, scaled to W={W})")
print(f"MEAN_DIFF={mean:.4f}")
# bande
N=12
print("per-band MEAN_DIFF (top->bottom):")
for i in range(N):
    y0=H*i//N; y1=H*(i+1)//N
    band=diff.crop((0,y0,W,y1))
    bp=list(band.getdata()); bm=sum(bp)/len(bp)/255
    bar="#"*int(bm*60)
    print(f"  band{i:02d} y{y0:5d}-{y1:5d}  {bm:.4f} {bar}")
# heatmap (rosso dove differisce)
heat=Image.new("RGB",(W,H),(0,0,0))
heat.paste(diff.point(lambda v: min(255,int(v*1.6))).convert("RGB"))
heat=Image.merge("RGB",(diff.point(lambda v:min(255,int(v*1.8))), diff.point(lambda v:0), diff.point(lambda v:0)))
heat.save(out+"_heat.png")
# side-by-side scaled down
th=1500
def fit(im): return im.resize((int(im.width*th/im.height),th))
m2,r2,h2=fit(Mc),fit(Rc),fit(heat)
gap=20
canvas=Image.new("RGB",(m2.width+r2.width+h2.width+gap*4,th+40),(250,250,250))
d=ImageDraw.Draw(canvas)
try: f=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",22)
except: f=ImageFont.load_default()
x=gap
for img,lbl,col in [(m2,"MOCKUP",(180,0,0)),(r2,"RENDER",(0,120,0)),(h2,"DIFF",(0,0,160))]:
    canvas.paste(img,(x,35)); d.text((x,8),lbl,fill=col,font=f); x+=img.width+gap
canvas.save(out+"_side.png")
print(f"saved {out}_side.png  {out}_heat.png")
