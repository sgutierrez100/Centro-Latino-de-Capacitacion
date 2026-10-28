import re,os,urllib.request
D=os.path.dirname(os.path.abspath(__file__))+'/../scratchpad/fa'
def fa(n):
  f=f'{D}/{n}.svg'
  if not os.path.exists(f): urllib.request.urlretrieve(f'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/svgs/solid/{n}.svg',f)
  return re.sub(r'<!--.*?-->','',open(f).read())
