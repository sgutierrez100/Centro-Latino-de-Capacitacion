import sys,os; sys.path.insert(0,os.path.dirname(__file__)); from fa import fa
pasos=[('envelope-open-text','Te llega el correo de aprobación','Con un archivo adjunto de instrucciones.','#1E88D6'),
       ('landmark','Vas con el Clerk of the Circuit Court','El de tu condado, en persona.','#7B61FF'),
       ('dollar-sign','Pagas $11','$10 de la comisión + $1 de registro.','#F28C28'),
       ('hand-paper','Haces tu juramento','Oath of office, ante el Clerk.','#0E9F5B'),
       ('file-signature','Recibes tu comisión','Por correo electrónico. ¡Ya eres notario!','#237a35')]
cards=''.join(f'''<div class="paso"><div class="izq"><div class="burbuja" style="background:{c}">{fa(i)}</div>{'' if k==len(pasos) else '<div class="linea"></div>'}</div>
<div class="txt"><div class="num" style="color:{c}">PASO {k}</div><div class="t">{t}</div><div class="s">{s}</div></div></div>''' for k,(i,t,s,c) in enumerate(pasos,1))
html=f'''<html><head><meta charset="utf-8"><link rel="stylesheet" href="base.css"><style>
.paso{{display:flex;gap:24px}}
.izq{{display:flex;flex-direction:column;align-items:center;flex:none}}
.burbuja{{width:80px;height:80px;border-radius:24px;display:flex;align-items:center;justify-content:center}}
.burbuja svg{{width:38px;height:38px;fill:#fff}}
.linea{{width:4px;flex:1;min-height:26px;background:#cfe0ea;border-radius:2px;margin:8px 0}}
.txt{{padding:4px 0 26px}}
.num{{font-family:Poppins;font-weight:800;font-size:18px;letter-spacing:2px}}
.t{{font-family:Poppins;font-weight:700;font-size:30px;line-height:1.15;margin:2px 0 6px}}
.s{{font-size:25px;color:#4a4a46;line-height:1.3}}
.plazo{{margin-top:6px;display:flex;align-items:center;gap:16px;background:#fff3e2;border:3px solid #F28C28;border-radius:20px;padding:20px 24px;font-size:25px;line-height:1.3}}
.plazo svg{{width:36px;height:36px;fill:#F28C28;flex:none}}
</style></head><body><div class="lienzo"><div class="kicker">Lección 3.1 · Maryland</div><h1>Del aviso de aprobación a tu comisión</h1>
{cards}<div class="plazo">{fa('hourglass-half')}<div>Los pasos 2 a 4 los haces <b>dentro de 30 días</b>. Si no, te revocan la comisión.</div></div>
</div></body></html>'''
open(sys.argv[1],'w').write(html)
