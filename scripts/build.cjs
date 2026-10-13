const fs=require('fs'),path=require('path');
process.chdir(path.resolve(__dirname,'..'));
fs.mkdirSync('public',{recursive:true});
const i18n=require('./i18n.cjs');
let css=['diagram-js.css','bpmn.css','bpmn-js.css'].map(n=>fs.readFileSync('vendor/'+n,'utf8')).join('\n');
const font=fs.readFileSync('vendor/font/bpmn.woff2').toString('base64');
css=css.replace(/@font-face\s*\{[\s\S]*?\}/,()=>"@font-face{font-family:'bpmn';src:url(data:font/woff2;base64,"+font+") format('woff2');font-weight:normal;font-style:normal}");
const lib=fs.readFileSync('vendor/bpmn-modeler.js','utf8').replace(/<\/script/gi,'<\\/script');
const compileEditor=html=>html.replace('<!--LIBRARY_STYLES-->',()=>'<style>'+css+'</style>').replace('<!--LIBRARY_SCRIPT-->',()=>'<script>'+lib+'</script>');
const source=fs.readFileSync('src/editor.html','utf8');
const editor=compileEditor(i18n.languageLinks(source,'atelier.html','fr'));
fs.writeFileSync('public/atelier.html',editor);
// Keep historical local copies compatible with the current French canvas.
fs.writeFileSync('public/Processia.html',editor);
fs.writeFileSync('public/atelier-en.html',compileEditor(i18n.languageLinks(i18n.englishEditor(source),'atelier.html','en')));
const home=fs.readFileSync('src/home.html','utf8');
const logo='data:image/svg+xml;base64,'+fs.readFileSync('public/Flowkenstein-logo.svg').toString('base64');
fs.writeFileSync('public/index.html',i18n.languageLinks(home,'index.html','fr').replaceAll('<!--LOGO_DATA-->',logo));
fs.writeFileSync('public/en.html',i18n.languageLinks(i18n.englishHome(home),'index.html','en').replaceAll('<!--LOGO_DATA-->',logo));

require('./pages.cjs');
require('./security.cjs');

require('./package.cjs');
