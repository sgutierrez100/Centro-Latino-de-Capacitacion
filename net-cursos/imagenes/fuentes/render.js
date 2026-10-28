// uso: node render.js entrada.html salida.png
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:800,height:800},deviceScaleFactor:2});
await p.goto('file://'+require('path').resolve(process.argv[2]),{waitUntil:'networkidle'});await p.waitForTimeout(500);
const el=await p.$('.lienzo');await el.screenshot({path:process.argv[3]});await b.close();})();
