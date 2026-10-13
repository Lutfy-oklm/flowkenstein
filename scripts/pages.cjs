const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const pages=JSON.parse(fs.readFileSync(path.join(root,'src/pages.json'),'utf8'));
for(const [name,html] of Object.entries(pages))fs.writeFileSync(path.join(root,'public',name),html);
