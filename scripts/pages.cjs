const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const pages=JSON.parse(fs.readFileSync(path.join(root,'src/pages.json'),'utf8'));
const i18n=require('./i18n.cjs');
for(const [name,html] of Object.entries(pages)){
 fs.writeFileSync(path.join(root,'public',name),i18n.languageLinks(html,name,'fr'));
 fs.writeFileSync(path.join(root,'public',i18n.names[name]),i18n.languageLinks(i18n.englishPage(name,html),name,'en'));
}
