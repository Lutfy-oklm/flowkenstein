const fs=require('fs'),path=require('path'),zlib=require('zlib');
const root=path.resolve(__dirname,'..');
const table=Array.from({length:256},(_,n)=>{let c=n;for(let k=0;k<8;k++)c=(c&1)?0xedb88320^(c>>>1):c>>>1;return c>>>0;});
function crc(buf){let c=0xffffffff;for(const v of buf)c=table[(c^v)&255]^(c>>>8);return (c^0xffffffff)>>>0;}
const files=[];
for(const name of ['.gitignore','.vercelignore','LICENSE','README.md','package.json','vercel.json'])files.push(name);
if(fs.existsSync(path.join(root,'README.fr.md')))files.push('README.fr.md');
function walk(dir){for(const entry of fs.readdirSync(path.join(root,dir),{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))){const name=dir+'/'+entry.name;if(entry.isDirectory())walk(name);else if(!name.endsWith('.zip'))files.push(name);}}
for(const dir of ['src','scripts','vendor','public'])walk(dir);
let offset=0;const local=[],central=[];
for(const file of files){const name=Buffer.from('flowkenstein/'+file),data=fs.readFileSync(path.join(root,file)),packed=zlib.deflateRawSync(data),checksum=crc(data);
 const h=Buffer.alloc(30);h.writeUInt32LE(0x04034b50);h.writeUInt16LE(20,4);h.writeUInt16LE(0x800,6);h.writeUInt16LE(8,8);h.writeUInt16LE(33,12);h.writeUInt32LE(checksum,14);h.writeUInt32LE(packed.length,18);h.writeUInt32LE(data.length,22);h.writeUInt16LE(name.length,26);
 const c=Buffer.alloc(46);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt16LE(0x800,8);c.writeUInt16LE(8,10);c.writeUInt16LE(33,14);c.writeUInt32LE(checksum,16);c.writeUInt32LE(packed.length,20);c.writeUInt32LE(data.length,24);c.writeUInt16LE(name.length,28);c.writeUInt32LE(offset,42);
 local.push(h,name,packed);central.push(c,name);offset+=h.length+name.length+packed.length;
}
const directory=Buffer.concat(central),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(files.length,8);end.writeUInt16LE(files.length,10);end.writeUInt32LE(directory.length,12);end.writeUInt32LE(offset,16);
fs.writeFileSync(path.join(root,'public/Flowkenstein-sources.zip'),Buffer.concat([...local,directory,end]));
console.log('Archive complète des sources : '+files.length+' fichiers.');
