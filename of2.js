const puppeteer=require('puppeteer');
(async()=>{const b=await puppeteer.launch({args:['--no-sandbox']});const p=await b.newPage();
for(const w of [390,1920,3840]){await p.setViewport({width:w,height:900});
await p.goto('http://localhost:8099/art-brut.html',{waitUntil:'networkidle0'});
const o=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
console.log('art-brut',w,'scrollW',o.sw,'clientW',o.cw,o.sw>o.cw+1?'OVERFLOW!':'ok');}
await b.close();})();
