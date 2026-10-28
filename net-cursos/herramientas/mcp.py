#!/usr/bin/env python3
# uso: mcp.py METHOD [PARAMS_JSON]   (o: mcp.py call TOOL ARGS_JSON)
import sys,json,os,urllib.request
U='https://centrolatinodecapacitacion.net/wp-json/elementor/mcp/'
A='Basic <CLAVE>'
SF=os.path.join(os.path.dirname(__file__),'.mcp-session')
def post(body,sid=None):
    h={'Authorization':A,'Content-Type':'application/json','Accept':'application/json, text/event-stream'}
    if sid: h['Mcp-Session-Id']=sid
    r=urllib.request.urlopen(urllib.request.Request(U,json.dumps(body).encode(),h),timeout=120)
    return r.headers.get('mcp-session-id'),r.read().decode()
def sid():
    if os.path.exists(SF): return open(SF).read().strip()
    s,_=post({"jsonrpc":"2.0","id":0,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"clc","version":"1"}}})
    post({"jsonrpc":"2.0","method":"notifications/initialized"},s); open(SF,'w').write(s); return s
m=sys.argv[1]; p=json.loads(sys.argv[2]) if len(sys.argv)>2 and m!="call" else {}
if m=='call': m,p='tools/call',{"name":sys.argv[2],"arguments":json.loads(sys.argv[3]) if len(sys.argv)>3 else {}}
_,out=post({"jsonrpc":"2.0","id":1,"method":m,"params":p},sid())
if 'Mcp-Session' in out or 'session' in out.lower()[:200] and '"error"' in out:
    os.remove(SF); _,out=post({"jsonrpc":"2.0","id":1,"method":m,"params":p},sid())
print(out)
