#!/usr/bin/env python3
# Creates the Maryland renewal course in draft: course (same page design as course 183043), access plan,
# chapters and lessons. Only 1.1 is free. Writes estructura.json with the new IDs.
# usage: AUTH=user:password crear-curso.py curso-183043.json leccion-183051.json [course_id plan_id]
# With course_id and plan_id it resumes: chapters and lessons that already exist (same title) are reused.
import json, os, subprocess, sys
B = 'https://centrolatinodecapacitacion.net/wp-json/llms/v1'
AUTH = os.environ['AUTH']
def api(path, data=None):
    post = ['-X', 'POST', '-H', 'Content-Type: application/json', '-d', json.dumps(data, ensure_ascii=False)] if data is not None else []
    out = subprocess.run(['curl', '-sS', '--retry', '4', '-u', AUTH, *post, f'{B}/{path}'], capture_output=True, text=True).stdout
    d = json.loads(out)
    if data is not None and 'id' not in d: sys.exit(f'{path}: {out[:500]}')
    return d
def existentes(path):
    d = api(path + '?per_page=100&status=any')
    return {x['title']['rendered'].replace('&#8211;', '–'): x['id'] for x in d} if isinstance(d, list) else {}
base = json.load(open(sys.argv[1]))
leccion = json.load(open(sys.argv[2]))
meta_curso = {k: v for k, v in base['meta'].items() if v not in (None, '') or k.startswith('_elementor')}
meta_leccion = {k: v for k, v in leccion['meta'].items() if k != '_elementor_data' and v is not None}

CURSO = 'Curso de Renovación de Notario Público para Maryland'
TEMARIO = [
    ('1. Tu renovación', ['1.1 Bienvenida: cómo funciona el curso de renovación', '1.2 Cuándo renovar, requisitos y costos']),
    ('2. La renovación paso a paso', ['2.1 Solicitar tu certificado de renovación', '2.2 La solicitud de renovación en línea, paso a paso',
                                      '2.3 Aprobación, juramento y tu nueva comisión']),
    ('3. Repaso de la ley notarial de Maryland', ['3.1 La ley y tus deberes como notario', '3.2 Los actos notariales y sus certificados',
                                                  '3.3 La notarización correcta: pasos, identificación, sello y journal', '3.4 Cuándo negarte y casos especiales']),
    ('4. Tarifas, ética y sanciones', ['4.1 Tarifas del notario', '4.2 Lo que no puedes hacer y sanciones']),
    ('5. Repaso final y qué sigue', ['5.1 Repaso final', '5.2 Qué sigue']),
]
if len(sys.argv) > 4:
    c, plan = api(f'courses/{sys.argv[3]}'), {'id': int(sys.argv[4])}
else:
  c = api('courses', {'title': CURSO, 'slug': 'curso-de-renovacion-de-notario-publico-para-maryland', 'status': 'draft', 'content': '',
                    'catalog_visibility': 'catalog_search', 'categories': base['categories'], 'instructors': base['instructors'],
                    'comment_status': 'closed', 'ping_status': 'closed', 'restricted_message': base['restricted_message']['raw'], 'meta': meta_curso})
  plan = api('access-plans', {'title': CURSO, 'post_id': c['id'], 'price': 50, 'frequency': 0, 'access_expiration': 'limited-period',
                            'access_length': 1, 'access_period': 'month', 'enroll_text': 'COMPRAR CURSO', 'visibility': 'visible', 'redirect_type': 'self'})
est = {'curso': c['id'], 'plan': plan['id'], 'permalink': c['permalink'], 'capitulos': []}
caps = existentes(f"courses/{c['id']}/content")
for k, (cap, lecciones) in enumerate(TEMARIO, 1):
    sid = caps.get(cap) or api('sections', {'title': cap, 'parent_id': c['id'], 'order': k})['id']
    fila = {'id': sid, 'titulo': cap, 'lecciones': []}
    hay = existentes(f'sections/{sid}/content')
    for j, t in enumerate(lecciones, 1):
        lid = hay.get(t) or api('lessons', {'title': t, 'content': '', 'parent_id': sid, 'course_id': c['id'], 'order': j, 'status': 'draft',
                                            'public': t.startswith('1.1 '), 'comment_status': 'closed', 'ping_status': 'closed', 'points': 1,
                                            'meta': meta_leccion})['id']
        fila['lecciones'].append([lid, t])
    est['capitulos'].append(fila)
print(json.dumps(est, ensure_ascii=False, indent=1))
