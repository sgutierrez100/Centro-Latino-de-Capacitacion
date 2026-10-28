#!/usr/bin/env python3
# Parte una narración completa en escenas con los tiempos por palabra de ElevenLabs Scribe.
# uso: partir.py guion.json palabras.json audio.mp3 carpeta_salida datos_salida.json
import json,sys,subprocess,re
g=json.load(open(sys.argv[1])); P=json.load(open(sys.argv[2])); P=P.get('words',P) if isinstance(P,dict) else P
P=[w for w in P if w.get('type','word')=='word']
norm=lambda s: re.sub(r'[^\wáéíóúñü]','',s.lower())
# primera palabra de cada escena, en orden
i=0; inicios=[]
for e in g['escenas']:
  prim=[norm(x) for x in e['voz'].split()[:2]]
  while not (norm(P[i]['text'])==prim[0] and norm(P[i+1]['text'])==prim[1]): i+=1
  inicios.append(i); i+=1
cortes=[0.0]+[(P[k-1]['end']+P[k]['start'])/2 for k in inicios[1:]]
total=float(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',sys.argv[3]],capture_output=True,text=True).stdout)
esc=[]
for n,e in enumerate(g['escenas']):
  a=cortes[n]; b=cortes[n+1] if n+1<len(cortes) else total
  fin=inicios[n+1] if n+1<len(inicios) else len(P)
  ws=[{'t':w['text'],'de':round(w['start']-a,3)} for w in P[inicios[n]:fin]]
  dura=round(P[fin-1]['end']-a+0.12,3)
  subprocess.run(['ffmpeg','-v','error','-y','-ss',f'{a:.3f}','-to',f'{b:.3f}','-i',sys.argv[3],'-c:a','libmp3lame','-q:a','2',f'{sys.argv[4]}/escena-{n+1}.mp3'],check=True)
  esc.append({'voz':e['voz'],'dura':dura,'palabras':ws})
  print(n+1,f'{a:.2f}-{b:.2f}',dura,ws[0]['t'],'…',ws[-1]['t'])
json.dump({'voz':g['voz'],'escenas':esc},open(sys.argv[5],'w'),ensure_ascii=False,indent=1)
