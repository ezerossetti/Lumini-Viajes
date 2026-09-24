import {build} from 'esbuild';
import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {renderToStaticMarkup} from 'react-dom/server';
import React from 'react';
await build({entryPoints:['CoverageSection.tsx'],bundle:true,platform:'node',format:'esm',packages:'external',outfile:'.coverage-build.mjs'});
const {default:CoverageSection}=await import('./.coverage-build.mjs?'+Date.now());
mkdirSync('../../assets/coverage',{recursive:true});
execFileSync(process.execPath,['node_modules/@tailwindcss/cli/dist/index.mjs','-i','input.css','-o','../../assets/coverage/coverage.css','--minify'],{stdio:'inherit'});
const file='../../index.html';let html=readFileSync(file,'utf8');
const section=renderToStaticMarkup(React.createElement(CoverageSection));
const start=html.indexOf('<!-- coverage:start -->');
if(start>=0){const end=html.indexOf('<!-- coverage:end -->',start)+21;html=html.slice(0,start)+'<!-- coverage:start -->'+section+'<!-- coverage:end -->'+html.slice(end);}
else{html=html.replace(/<section class="section map-section" id="cobertura">[\s\S]*?<\/section>/,'<!-- coverage:start -->'+section+'<!-- coverage:end -->');}
if(!html.includes('assets/coverage/coverage.css'))html=html.replace('</head>','<link rel="stylesheet" href="assets/coverage/coverage.css?v=1">\n</head>');
writeFileSync(file,html);console.log('Cobertura compilada e integrada en index.html.');
