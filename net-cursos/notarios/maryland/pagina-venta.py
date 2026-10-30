#!/usr/bin/env python3
# Builds the Maryland sales page from the Georgia one (page 159876): same design, Maryland texts.
# usage: pagina-venta.py georgia_data.json out_data.json
# All facts come from the published Maryland lessons. No number of lessons on the sales page.
import json, sys

CURSO = 'https://centrolatinodecapacitacion.net/course/curso-de-notario-publico-para-maryland/'
MEMB = 'https://centrolatinodecapacitacion.net/membresia/membresia-notario-maryland/'
WA = 'https://wa.me/19093440703?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20el%20curso%20de%20Notario%20P%C3%BAblico%20de%20Maryland'

TEXTOS = {
 # Hero
 '4a56eb23': 'Curso en línea · 100% en español · Maryland',
 '25e8e609': 'Curso de Notario Público para Maryland',
 '1de50a8e': 'Aprende paso a paso a ser Notario Público de Maryland: la solicitud, el juramento, los actos notariales, las tarifas y cómo empezar tu negocio, cumpliendo la ley de Maryland.',
 '3e99cb44': 'Solicitud paso a paso',
 '21948577': 'Actos notariales de Maryland',
 '20242c7c': 'Tarifas, ética y límites del notario',
 '18eee9b0': '2 meses de acceso',
 '78e581df': 'Notario Público de Maryland',
 '62b19c69': 'pago único<br>2 meses de acceso',
 '65a00019': 'Ley notarial de Maryland',
 '5c4014f': 'La solicitud y el juramento',
 '75d71c2f': 'Acknowledgments, jurats y copias',
 '6068b007': 'Tu negocio de notario',
 # What a notary does
 '610d3157': 'Qué hace un notario de Maryland',
 '4274fc8e': 'Es un funcionario nombrado por el Gobernador para ser testigo imparcial en la firma de documentos, con el objetivo de prevenir el fraude.',
 '252b8380': 'Ser testigo de una firma',
 '2559ed93': 'Witnessing: ves a la persona firmar frente a ti.',
 '38dcbbf6': 'Tomar reconocimientos',
 '3e2bc305': 'Acknowledgments: la persona declara ante ti que la firma es suya.',
 '6b922fe8': 'Tomar juramentos',
 '5f6f148d': 'Oaths, affirmations y jurats, para declaraciones juradas.',
 'fb14b34': 'Certificar copias',
 '48239a0f': 'Certified copies: confirmas que la copia es completa, fiel y exacta.',
 '355bba4': 'Protestos',
 '2d8c3333': 'De documentos negociables, como un cheque o un pagaré, cuando no se pagan o no se aceptan.',
 '3afd3bc7': 'Firmas de hipotecas',
 '204ac7f4': 'Como agente de firmas notariales (Notary Signing Agent).',
 # Syllabus (the chapters 7, 8 and 9 are added later as copies of the 6th card)
 '3d3d5f68': 'A tu ritmo y desde tu casa, con ejemplos, casos de la oficina y ejercicios.',
 '21ac24cc': '1. Bienvenida y el notario en Maryland',
 '244cd789': 'Qué es un notario en Estados Unidos, quién te nombra en Maryland, la ley y el inglés que necesitas.',
 '3ebb545': '2. El curso, el examen y la solicitud',
 '2c2d043': 'El certificado que pide el estado, la solicitud en línea paso a paso, antecedentes y aprobación.',
 '4e54d0d5': '3. El juramento y tus herramientas',
 '78227931': 'El juramento ante el Clerk of the Circuit Court, tu comisión, el sello, el journal y el seguro E&O.',
 '249123e9': '4. Los actos notariales',
 '157b8d23': 'Acknowledgment, jurat, oath y affirmation · Copias certificadas · Cómo llenar los certificados · Casos especiales y apostillas.',
 '62227b3d': '5. La notarización correcta',
 '54166dd2': 'Los pasos de toda notarización · Cómo identificar al firmante · Cuándo negarte, con casos de la oficina.',
 'af72b8e': '6. Tarifas, ética y límites',
 '6429b39': 'Lo que puedes cobrar · Lo que no puedes hacer · Conflictos de interés y sanciones.',
 # Price
 '50591c3f': 'Antes de pagar, mira gratis las lecciones del capítulo 1 en la página del curso.',
 '7a8bfc5': 'Notario Público de Maryland',
 '1991b9bf': 'Pago único · 2 meses de acceso.',
 '1c11c9bb': 'Ley notarial de Maryland',
 '4a23bc97': 'La solicitud, paso a paso',
 '12a1fb58': 'Actos notariales y tarifas',
 '2c3207fc': 'Tu negocio de notario',
 # How it works
 '11d435c5': 'Mira el capítulo 1 gratis',
 '47217342': 'Las lecciones del capítulo 1 son gratis: qué es el notario, quién te nombra en Maryland y tu ruta para ser notario.',
 '65f30c1c': 'Paga $95 en un solo pago y tienes 2 meses de acceso.',
 '657f0efc': 'Solicita tu comisión',
 '5535f29c': 'Pide tu certificado, haz tu solicitud en línea y jura ante el Clerk of the Circuit Court.',
 # Grow your business: the remote course card becomes the Maryland membership
 '7330c4aa': 'Membresía Notario Maryland',
 '6de9c00': 'Mantén tu curso abierto por $6 al mes, para volver a las lecciones cuando lo necesites.',
 # FAQ
 '78f5563': '$95 en un solo pago, con 2 meses de acceso. Si quieres mantener el curso abierto después, tienes la Membresía Notario Maryland por $6 al mes.',
 '53f789bf': f'Los explicamos en la lección 1.4 del curso, «Tu ruta para ser notario en Maryland», que es gratis. Mírala en la <a href="{CURSO}" target="_blank">página del curso</a>.',
 '1711f736': 'Acknowledgments, jurats, oaths y affirmations, testigo de firma, copias certificadas y protestos, con los certificados de Maryland, el sello y el journal.',
 '489d58c0': 'El curso te explica cuándo renovar tu comisión. El proceso completo lo verás en nuestro curso de renovación, que estará disponible próximamente.',
 '143188f7': '¿Cómo me comunico con ustedes?',
 '555df3ad': 'Por WhatsApp o por teléfono. Te atendemos en español de lunes a sábado, de 1 a 7 pm (hora del Este).',
 # Final call
 '3501b01': 'Conviértete en Notario Público de Maryland',
 '6790372b': 'Aprende a ejercer con seguridad y cumpliendo la ley de Maryland.',
}
LINKS = {'5c702022': CURSO, '1c23d036': CURSO, '1f2d68e6': CURSO, '5c965861': CURSO, '3cc4f342': CURSO,
         '5a73f048': MEMB, '2e0c2680': WA}
ICONOS = {'697355f9': 'fas fa-copy', '7ce3b868': 'fas fa-file-invoice-dollar', '5a73f048': None}

D = json.loads(open(sys.argv[1]).read())
hechos = set()
def walk(n):
    s = n.get('settings', {}); i = n['id']
    if i in TEXTOS:
        for k in ('title', 'paragraph', 'text'):
            if k in s: s[k]['value'] = TEXTOS[i]; hechos.add(i)
    if i in LINKS:
        s['link']['value']['destination']['value'] = LINKS[i]; hechos.add(i)
    if ICONOS.get(i) and 'svg' in s:
        s['svg']['value']['value']['value'] = ICONOS[i]; hechos.add(i)
    for c in n.get('elements', []): walk(c)
for e in D: walk(e)
falta = (set(TEXTOS) | set(LINKS) | {k for k, v in ICONOS.items() if v}) - hechos
assert not falta, falta
# Nothing from Georgia may stay
txt = json.dumps(D, ensure_ascii=False)
for p in ('Georgia', 'georgia', 'Francisco Arce', '3 meses', '22 lecciones'):
    assert p not in txt, p
open(sys.argv[2], 'w').write(json.dumps(D, ensure_ascii=False))
print('ok', len(hechos))
