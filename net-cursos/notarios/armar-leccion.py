#!/usr/bin/env python3
"""Arma una lección del curso en Elementor atómico (V4) con las clases clc-lec-* del sitio .net.

Uso: python3 armar-leccion.py <leccion.json> > composicion.json
El JSON de la lección describe las secciones; la salida son los parámetros de
elementor-build-composition (xml_structure, element_config, classes, style).
Mismo diseño que las lecciones del capítulo 1 (generadas con leccion-v4.ps1).
"""
import json, sys

ICONO_CSS = 'width: 22px; height: 22px;'
GRID_CSS = ('padding: 0px; display: grid; gap: 14px; grid-template-columns: repeat(auto-fill, minmax(min(100%, 240px), 1fr)); '
            'grid-template-rows: none; @media(--mobile) { gap: 16px; }')
_BTN = ('font-family: Poppins; font-weight: 600; font-size: 15px; line-height: 1.3; padding: 13px 22px; border-radius: 12px; '
        'border: 1px solid {b}; background-color: {f}; color: {c}; text-decoration: none; transition: background-color 0.2s; '
        '&:hover {{ background-color: {h}; }} @media(--mobile) {{ width: 100%; text-align: center; }}')
BTN_CSS = _BTN.format(b='#61ce70', f='#61ce70', c='#111111', h='#4fbf60')
BTN2_CSS = _BTN.format(b='#cdefd3', f='#ffffff', c='#237a35', h='#effaf1')


class Armador:
    def __init__(self):
        self.cfg, self.cls, self.sty, self.usados = {}, {}, {}, {}

    def nid(self, base):
        n = self.usados.get(base, 0) + 1
        self.usados[base] = n
        return base if n == 1 else f'{base} #{n}'

    def el(self, tag, base, clases=None, cfg=None, css=None, hijos=()):
        i = self.nid(base)
        if clases: self.cls[i] = clases
        if cfg: self.cfg[i] = cfg
        if css: self.sty[i] = css
        return f'<{tag} configuration-id="{i}">' + ''.join(hijos) + f'</{tag}>'

    def p(self, txt, clase='clc-lec-txt', base='Texto'):
        return self.el('e-paragraph', base, [clase], {'paragraph': txt})

    def svg(self, fa, clases, css=None, base='Ícono'):
        return self.el('e-svg', base, clases, {'svg': {'value': fa, 'library': 'fa-solid'}}, css)

    def cab(self, titulo, fa):
        return self.el('e-flexbox', 'Título', ['clc-lec-cab'], hijos=[
            self.el('e-flexbox', 'Ícono', ['clc-lec-ico'], hijos=[self.svg(fa, ['clc-ico-svg'], ICONO_CSS)]),
            self.el('e-heading', 'Título', ['clc-lec-h2'], {'tag': 'h2', 'title': titulo})])

    def filas(self, items, contenedor, base, marca='fas fa-check-circle', clase_marca='clc-lec-marca', css=None):
        hijos = []
        for it in items:
            fa = it[0] if isinstance(it, (list, tuple)) else marca
            txt = it[1] if isinstance(it, (list, tuple)) else it
            hijos.append(self.el('e-flexbox', 'Punto', ['clc-lec-fila'], hijos=[self.svg(fa, [clase_marca]), self.p(txt)]))
        return self.el('e-flexbox', base, contenedor, css=css, hijos=hijos)

    def bloque(self, b):
        t = b['tipo']
        if t == 'texto': return self.p(b['texto'])
        if t == 'lista': return self.filas(b['items'], ['clc-columna'], 'Lista', css='gap: 10px;')
        if t == 'pasos':
            return self.el('e-flexbox', 'Pasos', ['clc-columna'], css='gap: 10px;', hijos=[
                self.el('e-flexbox', 'Paso', ['clc-lec-paso'], hijos=[self.p(str(k), 'clc-lec-num'), self.p(x)])
                for k, x in enumerate(b['items'], 1)])
        if t == 'nota':
            return self.el('e-flexbox', 'Nota', ['clc-lec-nota'], hijos=[
                self.svg('fas fa-info-circle', ['clc-lec-marca'], 'color: #1B7FAE;'), self.p(b['texto'])])
        if t == 'imagen':
            # Imagen de la biblioteca de medios (id); el alt sale de la biblioteca.
            return self.el('e-image', 'Imagen', cfg={'image': {'src': {'id': b['id']}, 'size': 'full'}},
                           css='width: 100%; height: auto; border-radius: 18px;')
        if t == 'formulario':
            # Gravity Forms por shortcode (etiqueta dinámica); span porque un <p> no puede llevar el <form> dentro.
            sc = f'[gravityform id="{b["id"]}" title="false" description="false" ajax="true"]'
            return self.el('e-flexbox', 'Formulario', ['clc-lec-caso'], hijos=[
                self.el('e-paragraph', 'Shortcode', cfg={'tag': 'span', 'paragraph': {'name': 'shortcode', 'settings': {'shortcode': sc}}})])
        if t == 'botones':
            # Estilo local: las clases clc-btn no se cargan en las lecciones.
            return self.el('e-flexbox', 'Botones', css='display: flex; flex-direction: row; flex-wrap: wrap; gap: 12px; padding: 0px;', hijos=[
                self.el('e-button', 'Botón', cfg={'text': x['texto'], 'link': {'destination': x['url'], 'isTargetBlank': True, 'tag': 'a'}},
                        css=BTN_CSS if k == 0 else BTN2_CSS)
                for k, x in enumerate(b['items'])])
        raise ValueError(t)

    def seccion(self, s):
        t = s.get('tipo', 'normal')
        hijos = [self.cab(s['titulo'], s['icono'])]
        if t == 'resumen':
            hijos.append(self.filas(s['items'], ['clc-lec-resumen'], 'Resumen'))
        elif t == 'glosario':
            hijos.append(self.el('e-grid', 'Glosario', css=GRID_CSS, hijos=[
                self.el('e-flexbox', en, ['clc-lec-termino'], hijos=[
                    self.p(en, 'clc-lec-en'), self.p(es, 'clc-lec-es'), self.p(df, 'clc-lec-def')])
                for en, es, df in s['items']]))
        elif t == 'casos':
            for k, (caso, hacer) in enumerate(s['items'], 1):
                hijos.append(self.el('e-flexbox', f'Caso {k}', ['clc-lec-caso'], hijos=[
                    self.p(f'Caso {k}', 'clc-lec-etq'), self.p(caso),
                    self.el('e-flexbox', 'Qué hacer', ['clc-lec-hacer'], hijos=[self.p('Qué hacer', 'clc-lec-etq'), self.p(hacer)])]))
        elif t == 'errores':
            hijos.append(self.filas(s['items'], ['clc-lec-alerta'], 'Errores', 'fas fa-exclamation-triangle', 'clc-lec-aviso'))
        elif t == 'no':
            hijos.append(self.filas(s['items'], ['clc-lec-no'], 'No hace', 'fas fa-times', 'clc-lec-x'))
        elif t == 'ejercicios':
            hijos.append(self.p(f"Elige una respuesta en cada pregunta ({len(s['items'])} en total).", 'clc-ej-puntaje'))
            hijos.append(self.el('e-flexbox', 'Ejercicios', ['clc-ej-lista'], hijos=[self.ejercicio(k, e) for k, e in enumerate(s['items'], 1)]))
        else:
            hijos += [self.bloque(b) for b in s['bloques']]
        return self.el('e-flexbox', s['titulo'], ['clc-lec-sec'], hijos=hijos)

    def ejercicio(self, k, e):
        vf = e['tipo'] == 'vf'
        ops = [('V', 'Verdadero'), ('F', 'Falso')] if vf else list(zip('abc', e['opciones']))
        ok = e['ok']  # 'V'/'F' o 'a'/'b'/'c'
        opciones = [self.el('e-flexbox', f'Opción {l}', ['clc-ej-op', 'clc-ej-ok'] if l == ok else ['clc-ej-op'],
                            hijos=[self.p(l, 'clc-ej-letra'), self.p(t, 'clc-ej-optxt')]) for l, t in ops]
        resp = dict(ops)[ok] if vf else f'{ok}) {dict(ops)[ok]}'
        r = [self.p(f'Respuesta correcta: {resp}', 'clc-ej-resp-tit')]
        if e.get('razon'): r.append(self.p(e['razon']))
        return self.el('e-flexbox', f'Ejercicio {k}', ['clc-ej'], hijos=[
            self.el('e-flexbox', 'Cabecera', ['clc-ej-cab'], hijos=[
                self.p(str(k), 'clc-ej-num'),
                self.p('Verdadero o falso' if vf else 'Opción múltiple', 'clc-ej-tipo-vf' if vf else 'clc-ej-tipo-om')]),
            self.p(e['pregunta'], 'clc-ej-preg'),
            self.el('e-flexbox', 'Opciones', ['clc-ej-ops'] if vf else ['clc-ej-ops-col'], hijos=opciones),
            self.el('e-flexbox', 'Respuesta', ['clc-ej-resp'], hijos=r)])


def armar(leccion):
    a = Armador()
    xml = a.el('e-flexbox', 'Lección', ['clc-lec'], hijos=[a.seccion(s) for s in leccion['secciones']])
    return {'xml_structure': xml, 'element_config': a.cfg, 'classes': a.cls, 'style': a.sty}


if __name__ == '__main__':
    print(json.dumps(armar(json.load(open(sys.argv[1], encoding='utf-8'))), ensure_ascii=False))
