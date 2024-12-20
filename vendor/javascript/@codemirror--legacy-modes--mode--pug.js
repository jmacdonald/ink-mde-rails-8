// @codemirror/legacy-modes/mode/pug@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/pug.js

import{javascript as t}from"./javascript.js";var e={"{":"}","(":")","[":"]"};function defaultCopyState(t){if(typeof t!="object")return t;let e={};for(let n in t){let i=t[n];e[n]=i instanceof Array?i.slice():i}return e}class State{constructor(e){this.indentUnit=e;this.javaScriptLine=false;this.javaScriptLineExcludesColon=false;this.javaScriptArguments=false;this.javaScriptArgumentsDepth=0;this.isInterpolating=false;this.interpolationNesting=0;this.jsState=t.startState(e);this.restOfLine="";this.isIncludeFiltered=false;this.isEach=false;this.lastTag="";this.isAttrs=false;this.attrsNest=[];this.inAttributeName=true;this.attributeIsType=false;this.attrValue="";this.indentOf=Infinity;this.indentToken=""}copy(){var e=new State(this.indentUnit);e.javaScriptLine=this.javaScriptLine;e.javaScriptLineExcludesColon=this.javaScriptLineExcludesColon;e.javaScriptArguments=this.javaScriptArguments;e.javaScriptArgumentsDepth=this.javaScriptArgumentsDepth;e.isInterpolating=this.isInterpolating;e.interpolationNesting=this.interpolationNesting;e.jsState=(t.copyState||defaultCopyState)(this.jsState);e.restOfLine=this.restOfLine;e.isIncludeFiltered=this.isIncludeFiltered;e.isEach=this.isEach;e.lastTag=this.lastTag;e.isAttrs=this.isAttrs;e.attrsNest=this.attrsNest.slice();e.inAttributeName=this.inAttributeName;e.attributeIsType=this.attributeIsType;e.attrValue=this.attrValue;e.indentOf=this.indentOf;e.indentToken=this.indentToken;return e}}function javaScript(e,n){if(e.sol()){n.javaScriptLine=false;n.javaScriptLineExcludesColon=false}if(n.javaScriptLine){if(n.javaScriptLineExcludesColon&&e.peek()===":"){n.javaScriptLine=false;n.javaScriptLineExcludesColon=false;return}var i=t.token(e,n.jsState);e.eol()&&(n.javaScriptLine=false);return i||true}}function javaScriptArguments(e,n){if(n.javaScriptArguments){if(n.javaScriptArgumentsDepth===0&&e.peek()!=="("){n.javaScriptArguments=false;return}e.peek()==="("?n.javaScriptArgumentsDepth++:e.peek()===")"&&n.javaScriptArgumentsDepth--;if(n.javaScriptArgumentsDepth===0){n.javaScriptArguments=false;return}var i=t.token(e,n.jsState);return i||true}}function yieldStatement(t){if(t.match(/^yield\b/))return"keyword"}function doctype(t){if(t.match(/^(?:doctype) *([^\n]+)?/))return"meta"}function interpolation(t,e){if(t.match("#{")){e.isInterpolating=true;e.interpolationNesting=0;return"punctuation"}}function interpolationContinued(e,n){if(n.isInterpolating){if(e.peek()==="}"){n.interpolationNesting--;if(n.interpolationNesting<0){e.next();n.isInterpolating=false;return"punctuation"}}else e.peek()==="{"&&n.interpolationNesting++;return t.token(e,n.jsState)||true}}function caseStatement(t,e){if(t.match(/^case\b/)){e.javaScriptLine=true;return"keyword"}}function when(t,e){if(t.match(/^when\b/)){e.javaScriptLine=true;e.javaScriptLineExcludesColon=true;return"keyword"}}function defaultStatement(t){if(t.match(/^default\b/))return"keyword"}function extendsStatement(t,e){if(t.match(/^extends?\b/)){e.restOfLine="string";return"keyword"}}function append(t,e){if(t.match(/^append\b/)){e.restOfLine="variable";return"keyword"}}function prepend(t,e){if(t.match(/^prepend\b/)){e.restOfLine="variable";return"keyword"}}function block(t,e){if(t.match(/^block\b *(?:(prepend|append)\b)?/)){e.restOfLine="variable";return"keyword"}}function include(t,e){if(t.match(/^include\b/)){e.restOfLine="string";return"keyword"}}function includeFiltered(t,e){if(t.match(/^include:([a-zA-Z0-9\-]+)/,false)&&t.match("include")){e.isIncludeFiltered=true;return"keyword"}}function includeFilteredContinued(t,e){if(e.isIncludeFiltered){var n=filter(t,e);e.isIncludeFiltered=false;e.restOfLine="string";return n}}function mixin(t,e){if(t.match(/^mixin\b/)){e.javaScriptLine=true;return"keyword"}}function call(t,e){if(t.match(/^\+([-\w]+)/)){if(!t.match(/^\( *[-\w]+ *=/,false)){e.javaScriptArguments=true;e.javaScriptArgumentsDepth=0}return"variable"}if(t.match("+#{",false)){t.next();e.mixinCallAfter=true;return interpolation(t,e)}}function callArguments(t,e){if(e.mixinCallAfter){e.mixinCallAfter=false;if(!t.match(/^\( *[-\w]+ *=/,false)){e.javaScriptArguments=true;e.javaScriptArgumentsDepth=0}return true}}function conditional(t,e){if(t.match(/^(if|unless|else if|else)\b/)){e.javaScriptLine=true;return"keyword"}}function each(t,e){if(t.match(/^(- *)?(each|for)\b/)){e.isEach=true;return"keyword"}}function eachContinued(t,e){if(e.isEach){if(t.match(/^ in\b/)){e.javaScriptLine=true;e.isEach=false;return"keyword"}if(t.sol()||t.eol())e.isEach=false;else if(t.next()){while(!t.match(/^ in\b/,false)&&t.next());return"variable"}}}function whileStatement(t,e){if(t.match(/^while\b/)){e.javaScriptLine=true;return"keyword"}}function tag(t,e){var n;if(n=t.match(/^(\w(?:[-:\w]*\w)?)\/?/)){e.lastTag=n[1].toLowerCase();return"tag"}}function filter(t,e){if(t.match(/^:([\w\-]+)/)){setStringMode(t,e);return"atom"}}function code(t,e){if(t.match(/^(!?=|-)/)){e.javaScriptLine=true;return"punctuation"}}function id(t){if(t.match(/^#([\w-]+)/))return"builtin"}function className(t){if(t.match(/^\.([\w-]+)/))return"className"}function attrs(t,e){if(t.peek()=="("){t.next();e.isAttrs=true;e.attrsNest=[];e.inAttributeName=true;e.attrValue="";e.attributeIsType=false;return"punctuation"}}function attrsContinued(n,i){if(i.isAttrs){e[n.peek()]&&i.attrsNest.push(e[n.peek()]);if(i.attrsNest[i.attrsNest.length-1]===n.peek())i.attrsNest.pop();else if(n.eat(")")){i.isAttrs=false;return"punctuation"}if(i.inAttributeName&&n.match(/^[^=,\)!]+/)){if(n.peek()==="="||n.peek()==="!"){i.inAttributeName=false;i.jsState=t.startState(2);i.lastTag==="script"&&n.current().trim().toLowerCase()==="type"?i.attributeIsType=true:i.attributeIsType=false}return"attribute"}var r=t.token(n,i.jsState);if(i.attrsNest.length===0&&(r==="string"||r==="variable"||r==="keyword"))try{Function("","var x "+i.attrValue.replace(/,\s*$/,"").replace(/^!/,""));i.inAttributeName=true;i.attrValue="";n.backUp(n.current().length);return attrsContinued(n,i)}catch(t){}i.attrValue+=n.current();return r||true}}function attributesBlock(t,e){if(t.match(/^&attributes\b/)){e.javaScriptArguments=true;e.javaScriptArgumentsDepth=0;return"keyword"}}function indent(t){if(t.sol()&&t.eatSpace())return"indent"}function comment(t,e){if(t.match(/^ *\/\/(-)?([^\n]*)/)){e.indentOf=t.indentation();e.indentToken="comment";return"comment"}}function colon(t){if(t.match(/^: */))return"colon"}function text(t,e){if(t.match(/^(?:\| ?| )([^\n]+)/))return"string";if(t.match(/^(<[^\n]*)/,false)){setStringMode(t,e);t.skipToEnd();return e.indentToken}}function dot(t,e){if(t.eat(".")){setStringMode(t,e);return"dot"}}function fail(t){t.next();return null}function setStringMode(t,e){e.indentOf=t.indentation();e.indentToken="string"}function restOfLine(t,e){t.sol()&&(e.restOfLine="");if(e.restOfLine){t.skipToEnd();var n=e.restOfLine;e.restOfLine="";return n}}function startState(t){return new State(t)}function copyState(t){return t.copy()}function nextToken(t,e){var n=restOfLine(t,e)||interpolationContinued(t,e)||includeFilteredContinued(t,e)||eachContinued(t,e)||attrsContinued(t,e)||javaScript(t,e)||javaScriptArguments(t,e)||callArguments(t,e)||yieldStatement(t)||doctype(t)||interpolation(t,e)||caseStatement(t,e)||when(t,e)||defaultStatement(t)||extendsStatement(t,e)||append(t,e)||prepend(t,e)||block(t,e)||include(t,e)||includeFiltered(t,e)||mixin(t,e)||call(t,e)||conditional(t,e)||each(t,e)||whileStatement(t,e)||tag(t,e)||filter(t,e)||code(t,e)||id(t)||className(t)||attrs(t,e)||attributesBlock(t,e)||indent(t)||text(t,e)||comment(t,e)||colon(t)||dot(t,e)||fail(t);return n===true?null:n}const n={startState:startState,copyState:copyState,token:nextToken};export{n as pug};

