#!/usr/bin/env python3
# The atomic paragraph strips <form> and <script>, so a Gravity Forms shortcode inside it shows as code.
# After publishing a lesson, this swaps every paragraph whose dynamic shortcode is a [gravityform ...]
# for the classic Elementor «Shortcode» widget (it renders inside atomic containers) and clears Elementor's cache.
# usage: CLC_AUTH=user:password formulario-v3.py <post_id>
import json, os, subprocess, sys
U = f'https://centrolatinodecapacitacion.net/wp-json/llms/v1/lessons/{sys.argv[1]}'
def curl(*a): return subprocess.run(['curl', '-sS', '--retry', '3', '-u', os.environ['CLC_AUTH'], *a], capture_output=True, text=True).stdout
ed = json.loads(json.loads(curl(U + '?context=edit'))['meta']['_elementor_data'] or '[]')
cambios = 0
def cambia(n):
    global cambios
    p = (n.get('settings') or {}).get('paragraph') or {}
    sc = ((p.get('value') or {}).get('settings') or {}).get('shortcode', {}).get('value', '') if p.get('$$type') == 'dynamic' else ''
    if n.get('widgetType') == 'e-paragraph' and sc.startswith('[gravityform'):
        i = n.get('id') or os.urandom(4).hex()
        n.clear(); n.update({'id': i, 'elType': 'widget', 'widgetType': 'shortcode', 'settings': {'shortcode': sc}, 'elements': []})
        cambios += 1
    for e in n.get('elements', []): cambia(e)
for e in ed: cambia(e)
if cambios:
    curl('-X', 'POST', U, '-H', 'Content-Type: application/json', '-d', json.dumps({'meta': {'_elementor_data': json.dumps(ed, ensure_ascii=False)}}), '-o', '/dev/null')
    curl('-X', 'DELETE', 'https://centrolatinodecapacitacion.net/wp-json/elementor/v1/cache', '-o', '/dev/null')
print('formularios cambiados:', cambios)
