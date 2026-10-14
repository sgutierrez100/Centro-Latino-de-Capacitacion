"""Genera la hoja HTML con una tarjeta de 1200x800 por curso.
Luego tomar-imagenes.cjs captura cada tarjeta y guarda imagenes-cursos/<archivo>.webp
Uso: python3 generar_imagenes.py  ->  salida/imagenes.html"""
import pathlib, re
from cursos import AREAS, ICONOS

BASE = pathlib.Path(__file__).parent
ICONO_LOGO = (BASE / 'partes/logo-icono.svg').read_text(encoding='utf-8')
ICONO_LOGO = re.sub(r'role="img" aria-label="[^"]*" ', 'aria-hidden="true" ', ICONO_LOGO).replace('cl-globo', 'cl-g')

FONDOS = {
    'verde': ('linear-gradient(135deg,#61CE70 0%,#86DA92 100%)', '#6EC1E4', '#2E9E44'),
    'celeste': ('linear-gradient(135deg,#6EC1E4 0%,#97D4EE 100%)', '#61CE70', '#1B7FAE'),
}

def tarjeta(nombre, archivo, icono, area, color):
    fondo, circulo, trazo = FONDOS[color]
    largo = len(nombre)
    tam = 76 if largo <= 22 else 66 if largo <= 32 else 58
    return f'''<div class="t" id="{archivo}" style="background:{fondo}">
  <div class="c1" style="background:{circulo}"></div><div class="c2"></div>
  <div class="txt">
    <span class="area">{area}</span>
    <h1 style="font-size:{tam}px">{nombre}</h1>
    <p>Curso en línea · 100% en español</p>
  </div>
  <div class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="{trazo}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">{ICONOS[icono]}</svg></div>
  <div class="marca">{ICONO_LOGO}<span>Centro Latino <b>de Capacitación</b></span></div>
</div>'''

CSS = '''*{margin:0;padding:0;box-sizing:border-box}body{background:#ccc;font-family:'Nunito Sans',Arial,sans-serif}
.t{width:1200px;height:800px;position:relative;overflow:hidden;margin-bottom:20px;color:#1F2A33}
.c1{position:absolute;width:620px;height:620px;border-radius:50%;right:-120px;top:-150px;opacity:.55}
.c2{position:absolute;width:300px;height:300px;border-radius:50%;left:-90px;bottom:-130px;background:rgba(255,255,255,.25)}
.txt{position:absolute;left:80px;top:150px;width:640px}
.area{display:inline-block;background:#fff;border-radius:999px;padding:10px 24px;font-family:Poppins,Arial,sans-serif;font-weight:700;font-size:24px;letter-spacing:2px;text-transform:uppercase}
h1{font-family:Poppins,Arial,sans-serif;font-weight:700;line-height:1.08;letter-spacing:-1px;margin:30px 0 22px}
.txt p{font-size:28px;font-weight:700}
.ico{position:absolute;right:90px;top:200px;width:360px;height:360px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 30px 60px rgba(20,60,80,.18)}
.ico svg{width:200px;height:200px}
.marca{position:absolute;left:80px;bottom:56px;display:flex;align-items:center;gap:14px;background:#fff;border-radius:999px;padding:10px 24px 10px 10px}
.marca svg{width:52px;height:52px}
.marca span{font-family:Poppins,Arial,sans-serif;font-weight:700;font-size:22px}
.marca b{font-weight:600;color:#1B7FAE}'''

def construir():
    tarjetas = []
    for _, area, _, color, cursos in AREAS:
        for nombre, archivo, icono, _ in cursos:
            tarjetas.append(tarjeta(nombre, archivo, icono, area, color))
    html = ('<!doctype html><html lang="es"><head><meta charset="utf-8">'
            '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Nunito+Sans:wght@700&display=swap" rel="stylesheet">'
            f'<style>{CSS}</style></head><body>{"".join(tarjetas)}</body></html>')
    (BASE / 'salida').mkdir(exist_ok=True)
    (BASE / 'salida/imagenes.html').write_text(html, encoding='utf-8')
    print(len(tarjetas), 'tarjetas')

if __name__ == '__main__':
    construir()
