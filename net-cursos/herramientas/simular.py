# Convierte la composición (salida de armar-leccion.py) en HTML como lo pinta Elementor, para revisar lecciones de pago.
import json,sys,re,html,os
import xml.etree.ElementTree as ET
D=os.path.dirname(os.path.abspath(__file__))
c=json.load(open(sys.argv[1]))
def fa(v):
  s=open(f'{D}/scratchpad/fa/{re.sub(r"^.*?fa-","",v)}.svg').read(); s=re.sub(r'<!--.*?-->','',s)
  return s.replace('<svg ','<svg fill="currentColor" style="width: 100%; height: 100%; overflow: unset;" ')
def r(e):
  i=e.get('configuration-id'); s=c['element_config'].get(i,{}); cl=' '.join(c['classes'].get(i,[]))
  css=re.sub(r'(@media\(--mobile\)|&:hover)\s*\{[^}]*\}','',c['style'].get(i,'')); sty=f' style="{html.escape(css)}"' if css else ''
  t=e.tag; k=''.join(r(x) for x in e)
  if t in('e-flexbox','e-grid'):
    return f'<div class="elementor-element e-con e-atomic-element {t}-base e-default-div {cl}"{sty}>{k}</div>'
  if t=='e-svg': return f'<div class="{cl} e-svg-base e-default-div"{sty}>{fa(s["svg"]["value"])}</div>'
  if t=='e-heading': return f'<h2 class="{cl} e-heading-base e-default-h2">{s["title"]}</h2>'
  if t=='e-paragraph': return f'<p class="{cl} e-paragraph-base e-default-p">{s["paragraph"]}</p>'
  if t=='e-button': return f'<a href="{s["link"]["destination"]}" target="_blank" class="{cl} e-button-base e-default-a"{sty}>{s["text"]}</a>'
  raise ValueError(t)
print(r(ET.fromstring(c['xml_structure'])))
