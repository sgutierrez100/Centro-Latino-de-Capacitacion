import sys,os; sys.path.insert(0,os.path.dirname(__file__)); from fa import fa
items=[('user','Tu nombre','Igual que en tu identificación. Sin apodos ni títulos.','#1E88D6'),
       ('map-marker-alt','El condado','Donde vives, o el que elegiste si vives en otro estado.','#7B61FF'),
       ('calendar-alt','La fecha en que vence','Dura 4 años. Anótala para tus certificados y para renovar.','#F28C28')]
cards=''.join(f'''<div class="it"><div class="burbuja" style="background:{c}">{fa(i)}</div><div><div class="t">{t}</div><div class="s">{s}</div></div></div>''' for i,t,s,c in items)
html=f'''<html><head><meta charset="utf-8"><link rel="stylesheet" href="base.css"><style>
.it{{display:flex;align-items:center;gap:22px;background:#fff;border:2px solid #dde8f0;border-radius:22px;padding:22px 24px;margin-bottom:16px}}
.burbuja{{width:76px;height:76px;flex:none;border-radius:22px;display:flex;align-items:center;justify-content:center}}
.burbuja svg{{width:36px;height:36px;fill:#fff}}
.t{{font-family:Poppins;font-weight:700;font-size:30px;line-height:1.15}}
.s{{font-size:25px;color:#4a4a46;margin-top:4px;line-height:1.3}}
.aviso{{display:flex;gap:16px;align-items:center;background:#e8f3fb;border:3px solid #1B7FAE;border-radius:20px;padding:20px 24px;font-size:25px;line-height:1.3;margin-top:4px}}
.aviso svg{{width:34px;height:34px;fill:#1B7FAE;flex:none}}
</style></head><body><div class="lienzo"><div class="kicker">Lección 3.1 · Maryland</div><h1>Qué revisar en tu comisión</h1>
{cards}<div class="aviso">{fa('info-circle')}<div>¿Ves un error? Avisa a la Notary Division <b>antes</b> de mandar a hacer tu sello.</div></div>
</div></body></html>'''
open(sys.argv[1],'w').write(html)
