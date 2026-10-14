"""Arma las páginas del rediseño: une encabezado, pie y contenido de cada página.
Uso: python3 construir.py  ->  genera rediseno/salida/*.html
"""
import pathlib, re

BASE = pathlib.Path(__file__).parent
PARTES = BASE / 'partes'
SALIDA = BASE / 'salida'
SALIDA.mkdir(exist_ok=True)

ICONO = (PARTES / 'logo-icono.svg').read_text(encoding='utf-8').replace('<svg ', '<svg aria-hidden="true" ', 1)
ICONO = re.sub(r'role="img" aria-label="[^"]*" ', '', ICONO)
CSS = (PARTES / 'estilos.css').read_text(encoding='utf-8')
U = 'https://centrolatinodecapacitacion.com/wp-content/uploads/'
NUEVAS = '../imagenes-cursos/'
from cursos import AREAS, ICONOS, IMAGENES_ACTUALES

def catalogo():
    total = sum(len(a[4]) for a in AREAS)
    nav = ''.join(f'<a class="chip" href="#{k}">{t} <b>{len(l)}</b></a>' for k, t, _, _, l in AREAS)
    bloques = []
    for k, t, ic, color, l in AREAS:
        cards = ''.join(f'<a class="cc" href="{N_}{url}"><img src="{U}{IMAGENES_ACTUALES[arch]}" alt="{n} en español – Centro Latino de Capacitación"><span><b>{n}</b><i>Ver curso →</i></span></a>' for n, arch, _, url in l)
        cls = 'ico v' if color == 'verde' else 'ico'
        bloques.append(f'<div class="area" id="{k}"><div class="area-cab"><span class="{cls}"><svg viewBox="0 0 24 24">{ICONOS[ic]}</svg></span><h3>{t}</h3><span class="cuenta">{len(l)} {"curso" if len(l) == 1 else "cursos"}</span></div><div class="cgrid">{cards}</div></div>')
    return ('<section class="sec sec-gris" id="cursos"><div class="cont"><div class="cab"><span class="eti">Todos nuestros cursos</span>'
            f'<p>Elige un área para ir directo a sus cursos.</p></div>'
            f'<div class="area-nav">{nav}</div></div><div class="cat-full">{"".join(bloques)}</div></section>')
N_ = 'https://centrolatinodecapacitacion.net/'

def logo(href='#'):
    return f'<a class="logo" href="{href}">{ICONO}<div><b>Centro Latino</b><span>de Capacitación</span></div></a>'

MENU = [('inicio', 'Inicio', False), ('cursos', 'Cursos', True), ('servicios', 'Servicios', False),
        ('calendario', 'Calendario', False), ('tienda', 'Tienda', False), ('blog', 'Blog', False),
        ('contacto', 'Contacto', False)]

USR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6"/></svg>'
PC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>'

def mega():
    cols = [
        ('Income Tax', ['Curso de Income Tax Online', 'Curso de Income Tax por Zoom', 'Curso de Taxes Corporativos', 'Certificación Anual AFSP', 'Curso Agente ITIN (CAA)', 'Cursos CTEC California', 'Curso de Sales Tax']),
        ('Notarios', ['Notario Público', 'Notario Remoto', 'Firmas Hipotecarias', 'Oficiante de Bodas', 'Divorcio Simplificado', 'Traducción de Documentos']),
        ('Migración', ['Curso Intensivo de Inmigración', 'Módulos 1, 2 y 3', 'Taller Naturalización N-400', 'Taller de Visa Juvenil', 'Taller de Mociones', 'Petición Familiar Online']),
        ('Contabilidad y más', ['QuickBooks Online y Desktop', 'Nóminas (Payroll)', 'Creación de Empresas', 'Contabilidad con IA', 'Agente / Broker de Seguros', 'Dealer de Autos']),
    ]
    h = ''.join(f'<div class="col"><h4>{t}</h4><ul>' + ''.join(f'<li><a href="#">{x}</a></li>' for x in l) + '</ul></div>' for t, l in cols)
    dest = (f'<div class="dest"><img src="{U}2026/08/Curso-de-Income-Tax-Online-en-Espanol-1.webp" alt="">'
            '<b>Curso de Income Tax</b><p>Aprende a preparar taxes desde cero. Primer módulo gratis.</p>'
            '<a class="btn btn-verde btn-sm" href="#">Ver curso →</a></div>')
    return f'<div class="mega"><div class="cont">{h}{dest}</div></div>'

def encabezado(act, con_mega=False):
    items = ''.join(f'<a href="#" class="{"act " if k == act else ""}{"dd" if dd else ""}">{t}</a>' for k, t, dd in MENU)
    top = ('<div class="top"><div class="cont"><span>Lunes a sábado · 1 a 7 pm (hora del Este)</span><div class="tels">'
           '<a href="#">(760) 553-3256</a><a href="#">(909) 344-0703</a><a href="#">(909) 788-0445</a></div>'
           '</div></div>')
    lupa = '<span class="lupa"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg></span>'
    head = (f'<header class="head"><div class="cont">{logo()}<nav class="menu">{items}</nav>'
            f'<div class="head-der"><a class="btn btn-verde btn-sm" href="#">{USR}Mis cursos</a><a class="btn btn-linea btn-sm" href="#">{PC}Login software</a><span class="ham"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span></div></div>'
            f'{mega() if con_mega else ""}</header>')
    return top + head

RS = {
 'Facebook': '<path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6Z"/>',
 'Instagram': '<path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.7 0 3 0 4.1.1 2.8.1 4.1 1.4 4.2 4.2.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.8-1.4 4.1-4.2 4.2-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1C5 20.2 3.8 18.9 3.7 16.1 3.6 15 3.6 14.7 3.6 12s0-3 .1-4.1C3.8 5.1 5.1 3.8 7.9 3.7 9 3.6 9.3 3.6 12 3.6Z"/>',
 'YouTube': '<path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3Z"/>',
}

def pie():
    redes = ''.join(f'<a href="#" aria-label="{n}"><svg viewBox="0 0 24 24">{p}</svg></a>' for n, p in RS.items())
    def col(t, l): return f'<div><h4>{t}</h4><ul>' + ''.join(f'<li><a href="#">{x}</a></li>' for x in l) + '</ul></div>'
    return ('<footer class="pie"><div class="cont"><div class="grid">'
            f'<div class="marca">{logo()}<p>Aprende un oficio desde tu casa con cursos en línea 100% en español, diseñados para las regulaciones de cada estado.</p>'
            '<a class="tel" href="#">(760) 553-3256</a><a class="tel" href="#">(909) 344-0703</a><a class="tel" href="#">(909) 788-0445</a>'
            '<span class="hor">Lunes a sábado · 1 a 7 pm (hora del Este)</span>'
            f'<div class="redes">{redes}</div></div>'
            + col('Income Tax', ['Curso de Income Tax Online', 'Curso de Income Tax por Zoom', 'Taxes Corporativos', 'Certificación AFSP', 'Agente ITIN (CAA)', 'Cursos CTEC', 'Software de Income Tax'])
            + col('Notarios', ['Notario Público', 'Notario Remoto', 'Firmas Hipotecarias', 'Oficiante de Bodas', 'Divorcio Simplificado', 'Traducción de Documentos'])
            + col('Más cursos', ['Inmigración', 'Agente de Seguros', 'QuickBooks', 'Payroll', 'Creación de Empresas', 'Dealer de Autos'])
            + col('Centro Latino', ['Servicios', 'Calendario de cursos', 'Tienda empresarial', 'Librería digital', 'Blog', 'Contacto'])[:-6]
            + '<h4 class="h4-sep">Asistencia con AnyDesk</h4><ul><li><a href="#">Descargar AnyDesk</a></li><li><a href="#">Tutorial de AnyDesk</a></li></ul></div>'
            + '</div>'
            '<div class="base"><span>© 2026 Centro Latino de Capacitación · Aprende un oficio desde tu casa</span>'
            '<nav><a href="#">Política de Privacidad</a><a href="#">Política de Reembolso</a><a href="#">Política de Cumplimiento</a></nav></div>'
            '</div></footer>')

PLANTILLA = '''<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{titulo}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Nunito+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style>{css}{extra}</style></head><body>{cuerpo}</body></html>'''

def construir():
    for f in sorted((BASE / 'paginas').glob('*.html')):
        src = f.read_text(encoding='utf-8')
        titulo = re.search(r'<!--TITULO (.*?)-->', src).group(1)
        extra = ''
        m = re.search(r'<style>(.*?)</style>', src, re.S)
        if m:
            extra, src = m.group(1), src.replace(m.group(0), '')
        src = re.sub(r'<!--ENCABEZADO (\w+)( mega)?-->', lambda m: encabezado(m.group(1), bool(m.group(2))), src)
        src = src.replace('<!--CATALOGO-->', catalogo()).replace('<!--PIE-->', pie()).replace('<!--LOGO-->', logo()).replace('<!--ICONO-->', ICONO).replace('{U}', U)
        src = re.sub(r'<!--TITULO .*?-->', '', src)
        (SALIDA / f.name).write_text(PLANTILLA.format(titulo=titulo, css=CSS, extra=extra, cuerpo=src), encoding='utf-8')
        print('ok', f.name)

if __name__ == '__main__':
    construir()
