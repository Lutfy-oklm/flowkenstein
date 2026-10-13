const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const {text,pages}=JSON.parse(fs.readFileSync(path.join(root,'src/en.json'),'utf8'));
const names={'index.html':'en.html','atelier.html':'atelier-en.html','Processia.html':'atelier-en.html','aide.html':'help-en.html','contact.html':'contact-en.html','mentions-legales.html':'legal-notice-en.html','confidentialite.html':'privacy-en.html','conditions-utilisation.html':'terms-en.html'};
const css=`.language-switch{display:inline-flex;align-items:center;gap:3px;white-space:nowrap;font:12px Arial,sans-serif}.language-switch a,.language-switch span{display:inline-block;padding:7px 8px;border-radius:7px;text-decoration:none;color:inherit}.language-switch a:hover{background:#e0eeea}.language-switch [aria-current=page]{background:#d7eeee;color:#006e74;font-weight:700}.file-menu .language-switch{display:flex;justify-content:flex-start;padding:4px 8px}.file-menu .language-switch a{font-size:12px;color:#142f49}.page-nav .language-switch{margin-left:auto}@media(max-width:600px){.language-switch a,.language-switch span{padding:6px}.navlinks{gap:9px!important}.page-nav{gap:10px!important}.page-nav img{width:140px!important}.page-nav>a:last-child{padding:8px!important}}`;
function t(value){const s=value.trim();return text[s]===undefined?value:value.replace(s,text[s]);}
function translateMarkup(html){
 return html.replace(/(<style\b[\s\S]*?<\/style>|<script\b[\s\S]*?<\/script>|<[^>]+>)|([^<]+)/gi,(all,tag,content)=>{
  if(content)return t(content);
  if(/^<(style|script)\b/i.test(tag))return tag;
  return tag.replace(/\b(title|aria-label|alt|value|content)="([^"]*)"/g,(m,key,value)=>`${key}="${t(value)}"`);
 });
}
function englishLinks(html){return html.replace(/href="([^"#]+\.html)(#[^"]*)?"/g,(m,name,hash='')=>names[name]?`href="${names[name]}${hash}"`:m);}
function switcher(fr,en,lang){return `<span class="language-switch" role="group" aria-label="${lang==='en'?'Language':'Langue'}">${lang==='fr'?'<span lang="fr" aria-current="page">FR</span>':`<a href="${fr}" lang="fr" hreflang="fr" aria-label="Français">FR</a>`}${lang==='en'?'<span lang="en" aria-current="page">EN</span>':`<a href="${en}" lang="en" hreflang="en" aria-label="English">EN</a>`}</span>`;}
function languageLinks(html,fr,lang){
 const en=names[fr],nav=switcher(fr,en,lang);
 if(fr==='atelier.html')html=html.replace('<div class="menu-rule"></div>',nav+'<div class="menu-rule"></div>');
 else if(fr==='index.html')html=html.replace('<div class="navlinks">','<div class="navlinks">'+nav);
 else html=html.replace(/(<nav class="page-nav"[^>]*><a[\s\S]*?<\/a>)/,'$1'+nav);
 const route=file=>file==='index.html'?'':file.replace(/\.html$/,'');
 const meta=`<link rel="alternate" hreflang="fr" href="https://flowkenstein.com/${route(fr)}"><link rel="alternate" hreflang="en" href="https://flowkenstein.com/${route(en)}"><link rel="alternate" hreflang="x-default" href="https://flowkenstein.com/${route(fr)}">`;
 return html.replace('</head>',`<style>${css}</style>${meta}</head>`);
}
function englishEditor(source){
 let html=source.replace(/const frenchLabels=\{[\s\S]*?(?=function PreserveLaneHeight)/,`function frenchTranslate(template,replacements={}){return String(template).replace(/\\{([^}]+)\\}/g,(match,key)=>replacements[key]===undefined?match:String(replacements[key]));}\n`);
 html=translateMarkup(html);
 html=html.replace(/<script>([\s\S]*?)<\/script>/g,(all,js)=>{
  js=js.replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"/g,literal=>{
   let value;try{value=literal[0]==='"'?JSON.parse(literal):literal.slice(1,-1).replace(/\\'/g,"'").replace(/\\\\/g,'\\');}catch{return literal;}
   return text[value]===undefined?literal:JSON.stringify(text[value]);
  });
  js=js.replaceAll('name="Acteur ${i}"','name="Participant ${i}"').replaceAll('name="Processus métier"','name="Business process"');
  js=js.replace("location.protocol==='file:'?'index.html':'/'","location.protocol==='file:'?'en.html':'/en'");
  return '<script>'+js+'</script>';
 });
 html=html.replace('lang="fr"','lang="en"');
 html=html.replace(/<button id="undo"[^>]*>/,tag=>tag.replaceAll('="Cancel"','="Undo"'));
 return englishLinks(html);
}
function englishHome(source){return englishLinks(translateMarkup(source).replace('lang="fr"','lang="en"'));}
function englishPage(name,source){const page=pages[name];if(!page)throw Error('Missing English page: '+name);
 const main=`<main class="legal-main"><a class="back" href="index.html">← Back to home</a><h1>${page.title}</h1><p class="lead">${page.lead}</p><p class="updated">Last updated: 13 October 2026</p>${page.body}</main>`;
 let html=translateMarkup(source.replace(/<main\b[\s\S]*?<\/main>/,main)).replace('lang="fr"','lang="en"');
 html=html.replace(/<title>[\s\S]*?<\/title>/,`<title>${page.title} — Flowkenstein</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${page.lead}">`);
 return englishLinks(html);
}
module.exports={names,languageLinks,englishEditor,englishHome,englishPage};
