// Abre la vista previa de la 1.4, cambia su contenido por el HTML simulado y vuelve a correr el script de ejercicios.
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [url,htmlf,titulo,out]=[fs.readFileSync(process.argv[2],'utf8').trim(),process.argv[3],process.argv[4],process.argv[5]];
const frag=fs.readFileSync(htmlf,'utf8');const b=await chromium.launch();
for(const [n,w,h] of [['esc',1280,900],['cel',390,844]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:n=='cel'?2:1});
await p.goto(url,{waitUntil:'networkidle',timeout:90000});
await p.evaluate(([frag,titulo])=>{const r=document.querySelector('.clc-lec');r.outerHTML=frag;
 document.querySelectorAll('h1').forEach(h=>{if(/1\.4/.test(h.textContent))h.textContent=titulo;});
 document.querySelectorAll('video,iframe,.clc-lec-video,.llms-video-wrapper').forEach(v=>v.remove());
 for(const s of document.querySelectorAll('script')){if(s.textContent.includes('veredicto')){const x=document.createElement('script');x.textContent=s.textContent;document.body.appendChild(x);}}
},[frag,titulo]);
await p.waitForTimeout(1500);await p.screenshot({path:`${out}-${n}.png`,fullPage:true});console.log(n,await p.evaluate(()=>document.body.scrollHeight));}
await b.close();})();
