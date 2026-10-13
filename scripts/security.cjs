const fs=require('fs'),path=require('path'),crypto=require('crypto');
const root=path.resolve(__dirname,'..');
const hashes=new Set();
for(const name of ['atelier.html','index.html']){
 const html=fs.readFileSync(path.join(root,'public',name),'utf8');
 for(const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi))hashes.add("'sha256-"+crypto.createHash('sha256').update(match[1].replace(/\r\n?/g,'\n')).digest('base64')+"'");
}
const csp=["default-src 'none'","script-src "+[...hashes].join(' '),"script-src-attr 'none'","style-src 'self' 'unsafe-inline'","img-src 'self' data: blob:","font-src 'self' data:","connect-src 'none'","object-src 'none'","base-uri 'none'","form-action 'self'","frame-ancestors 'none'","worker-src 'none'","upgrade-insecure-requests"].join('; ');
const headers=[['Content-Security-Policy',csp],['X-Content-Type-Options','nosniff'],['X-Frame-Options','DENY'],['Referrer-Policy','no-referrer'],['Strict-Transport-Security','max-age=31536000'],['Permissions-Policy','camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), serial=()']].map(([key,value])=>({key,value}));
const file=path.join(root,'vercel.json'),config=JSON.parse(fs.readFileSync(file,'utf8'));
config.headers=[...(config.headers||[]).filter(h=>h.source!=='/(.*)'),{source:'/(.*)',headers}];
fs.writeFileSync(file,JSON.stringify(config,null,2)+'\n');
console.log('Protection du navigateur générée : '+hashes.size+' empreintes de scripts.');
