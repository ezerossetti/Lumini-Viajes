import { mkdir, cp, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const root=new URL('../',import.meta.url),out=new URL('dist/',root);
// Only generated output in this repository is replaced.
await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
for(const entry of await readdir(root,{withFileTypes:true})){
 if(entry.isFile()&&(/\.(css|js|ico)$/.test(entry.name)||['index.html','creditos-imagenes.html','robots.txt','sitemap.xml'].includes(entry.name)))await cp(new URL(entry.name,root),new URL(entry.name,out));
}
for(const name of ['assets/favicon.svg'])await cp(new URL(name,root),new URL(name,out),{recursive:true});
await cp(new URL('assets/images/',root),new URL('assets/images/',out),{recursive:true});
console.log('Sitio estático listo en '+fileURLToPath(out));
