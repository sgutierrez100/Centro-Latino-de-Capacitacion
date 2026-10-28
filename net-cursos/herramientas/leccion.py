#!/usr/bin/env python3
# uso: leccion.py armar <json> <captura>   |   leccion.py publicar <post_id>
import json,subprocess,sys,time,os
D=os.path.dirname(os.path.abspath(__file__)); R='/home/user/Centro-Latino-de-Capacitacion/net-cursos/notarios'
def call(t,a):
  for k in range(5):
    out=subprocess.run(['python3','-I',D+'/mcp.py','call',t,json.dumps(a,ensure_ascii=False)],capture_output=True,text=True).stdout
    try: return json.loads(json.loads(out)['result']['content'][0]['text'])
    except Exception:
      if os.path.exists(D+'/.mcp-session'): os.remove(D+'/.mcp-session')
      time.sleep(2**(k+1))
  sys.exit('sin respuesta: '+t)
def curl(*a): return subprocess.run(['curl','-sS','--retry','4','-u','CLC:<CLAVE>',*a],capture_output=True,text=True).stdout
if sys.argv[1]=='armar':
  L=json.load(open(sys.argv[2])); pid=L['post']; cap=sys.argv[3]
  curl('-X','POST',f'https://centrolatinodecapacitacion.net/wp-json/llms/v1/lessons/{pid}','-H','Content-Type: application/json','-d','{"meta":{"_elementor_edit_mode":"builder","_elementor_template_type":"wp-post"}}','-o','/dev/null')
  comp=json.loads(subprocess.run(['python3',R+'/armar-leccion.py',sys.argv[2]],capture_output=True,text=True,check=True).stdout)
  c=dict(comp,post_id=pid,parent_id='document',mode='replace_children'); d=call('elementor-build-composition',c); print('build',d.get('success'),d.get('root_element_ids'),d.get('warnings'))
  json.dump(comp,open(D+'/scratchpad/comp-actual.json','w'),ensure_ascii=False)
  open(D+'/scratchpad/prev14.txt','w').write(call('elementor-create-preview-link',{'post_id':183055})['url'])
  html=subprocess.run(['python3',D+'/simular.py',D+'/scratchpad/comp-actual.json'],capture_output=True,text=True,check=True).stdout
  open(D+'/scratchpad/sim-actual.html','w').write(html)
  print(subprocess.run(['node',D+'/cap2.js',D+'/scratchpad/prev14.txt',D+'/scratchpad/sim-actual.html',L['titulo'],cap],capture_output=True,text=True,cwd=D+'/scratchpad').stdout)
else:
  pid=int(sys.argv[2]); d=call('elementor-publish-document',{'post_id':pid}); print('publish',d.get('status'))
  d=call('elementor-get-page-structure',{'post_id':pid}); print('raíces',len(d['elements']),[x.get('title') for x in d['elements'][0]['elements']] if d['elements'] else 'VACÍA')
  print('cache',curl('-X','DELETE','https://centrolatinodecapacitacion.net/wp-json/elementor/v1/cache','-o','/dev/null','-w','%{http_code}'))
