// @codemirror/lang-rust@6.0.1 downloaded from https://ga.jspm.io/npm:@codemirror/lang-rust@6.0.1/dist/index.js

import{parser as e}from"@lezer/rust";import{LRLanguage as t,indentNodeProp as n,continuedIndent as o,foldNodeProp as r,foldInside as s,LanguageSupport as m}from"@codemirror/language";const i=t.define({name:"rust",parser:e.configure({props:[n.add({IfExpression:o({except:/^\s*({|else\b)/}),"String BlockComment":()=>null,AttributeItem:e=>e.continue(),"Statement MatchArm":o()}),r.add((e=>/(Block|edTokens|List)$/.test(e.name)?s:"BlockComment"==e.name?e=>({from:e.from+2,to:e.to-2}):void 0))]}),languageData:{commentTokens:{line:"//",block:{open:"/*",close:"*/"}},indentOnInput:/^\s*(?:\{|\})$/,closeBrackets:{stringPrefixes:["b","r","br"]}}});function rust(){return new m(i)}export{rust,i as rustLanguage};
