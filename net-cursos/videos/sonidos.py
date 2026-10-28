#!/usr/bin/env python3
# Efectos de sonido y música de fondo sintetizados (sin archivos externos). Efectos con pico de −13 dBFS.
import numpy as np, subprocess, os, sys
SR=48000; OUT=sys.argv[1]; TMP=sys.argv[2]; rng=np.random.default_rng(7)
def t(d): return np.arange(int(SR*d))/SR
def env(n,a,r): x=np.ones(n); A=int(SR*a); R=int(SR*r); x[:A]=np.linspace(0,1,A); x[-R:]*=np.linspace(1,0,R)**2; return x
def lp(x,k): k=max(1,int(k)); return np.convolve(x,np.ones(k)/k,'same')
def guarda(nombre,x,pico_db=-13,filtro=None):
  x=x/np.max(np.abs(x))*10**(pico_db/20); w=f'{TMP}/{nombre}.wav'
  open(w,'wb').write(wav(x)); args=['ffmpeg','-v','error','-y','-i',w]
  if filtro: args+=['-af',filtro]
  subprocess.run(args+['-c:a','libmp3lame','-q:a','2',f'{OUT}/{nombre}.mp3'],check=True)
def wav(x):
  import struct; d=(np.clip(x,-1,1)*32767).astype('<i2').tobytes()
  return b'RIFF'+struct.pack('<I',36+len(d))+b'WAVEfmt '+struct.pack('<IHHIIHH',16,1,1,SR,SR*2,2,16)+b'data'+struct.pack('<I',len(d))+d
# swoosh: ruido filtrado que sube y baja
n=t(0.55); r=rng.standard_normal(len(n)); s=np.zeros(len(n))
for k,(a,b) in enumerate([(0,.2),(.2,.4),(.4,.55)]): pass
s=lp(r,6)*np.sin(np.pi*n/n[-1])**2; guarda('swoosh',s)
# ui-pop: seno corto con caída de tono
n=t(0.12); f=900*np.exp(-n*18)+320; guarda('ui-pop',np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-n*38))
# check: dos tonos suaves hacia arriba
a=t(0.09); b=t(0.22); c=np.concatenate([np.sin(2*np.pi*660*a)*np.exp(-a*25),np.sin(2*np.pi*990*b)*np.exp(-b*14)]); guarda('check',c)
# papel: ruido con ráfagas
n=t(0.35); p=lp(rng.standard_normal(len(n)),3)*(0.5+0.5*np.sin(2*np.pi*23*n))**3*env(len(n),.01,.2); guarda('papel',p)
# sello: golpe grave suave + clic
n=t(0.3); g=np.sin(2*np.pi*95*n)*np.exp(-n*22)+0.25*lp(rng.standard_normal(len(n)),2)*np.exp(-n*80); guarda('sello',g)
# pluma: rasgueo de pluma
n=t(0.6); pl=lp(rng.standard_normal(len(n)),2)*(0.4+0.6*np.abs(np.sin(2*np.pi*7*n)))*env(len(n),.03,.25); guarda('pluma',pl,filtro='highpass=f=1800')
# tick: clic corto agudo
n=t(0.05); guarda('tick',np.sin(2*np.pi*2200*n)*np.exp(-n*120))
# chime: campana con armónicos
n=t(1.4); ch=sum(a*np.sin(2*np.pi*f*n)*np.exp(-n*d) for f,a,d in [(1046,1,3),(1568,.5,4),(2093,.3,5),(2637,.15,6)]); guarda('chime',ch)
# negativo: dos tonos suaves hacia abajo
a=t(0.12); b=t(0.2); guarda('negativo',np.concatenate([np.sin(2*np.pi*440*a)*np.exp(-a*16),np.sin(2*np.pi*330*b)*np.exp(-b*12)]))
# música: acordes suaves (C – Am – F – G) con pad y arpegio, 96 s
bpm=76; beat=60/bpm; acordes=[[261.6,329.6,392.0,493.9],[220.0,261.6,329.6,392.0],[174.6,220.0,261.6,329.6],[196.0,246.9,293.7,392.0]]
dur=96; N=int(SR*dur); m=np.zeros(N); tt=np.arange(N)/SR; comp=beat*8
for k in range(int(dur/comp)+1):
  ac=acordes[k%4]; i0=int(k*comp*SR); L=min(int(comp*SR*1.15),N-i0)
  if L<=0: break
  x=np.arange(L)/SR; e=np.minimum(1,x/1.2)*np.minimum(1,(L/SR-x)/1.0)
  for f in ac: m[i0:i0+L]+=0.12*e*(np.sin(2*np.pi*f/2*x)+0.3*np.sin(2*np.pi*f*x))
  for j in range(16):
    f=ac[[0,1,2,3,2,1,0,2][j%8]]*2; s0=i0+int(j*beat/2*SR); Lp=min(int(0.9*SR),N-s0)
    if Lp<=0: continue
    y=np.arange(Lp)/SR; m[s0:s0+Lp]+=0.05*np.sin(2*np.pi*f*y)*np.exp(-y*4.5)
m=m*np.minimum(1,tt/2)*np.minimum(1,(dur-tt)/3); m=m/np.max(np.abs(m))*0.7
open(f'{TMP}/musica.wav','wb').write(wav(m))
subprocess.run(['ffmpeg','-v','error','-y','-i',f'{TMP}/musica.wav','-af','lowpass=f=3200,aecho=0.8:0.6:90|170:0.25|0.15,loudnorm=I=-20:TP=-3','-ar','48000','-c:a','libmp3lame','-q:a','2',f'{os.path.dirname(OUT)}/musica-clc.mp3'],check=True)
print('ok')
