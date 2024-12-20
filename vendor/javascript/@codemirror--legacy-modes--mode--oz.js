// @codemirror/legacy-modes/mode/oz@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/oz.js

function wordRegexp(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}var e=/[\^@!\|<>#~\.\*\-\+\\/,=]/;var t=/(<-)|(:=)|(=<)|(>=)|(<=)|(<:)|(>:)|(=:)|(\\=)|(\\=:)|(!!)|(==)|(::)/;var n=/(:::)|(\.\.\.)|(=<:)|(>=:)/;var r=["in","then","else","of","elseof","elsecase","elseif","catch","finally","with","require","prepare","import","export","define","do"];var a=["end"];var o=wordRegexp(["true","false","nil","unit"]);var i=wordRegexp(["andthen","at","attr","declare","feat","from","lex","mod","div","mode","orelse","parser","prod","prop","scanner","self","syn","token"]);var u=wordRegexp(["local","proc","fun","case","class","if","cond","or","dis","choice","not","thread","try","raise","lock","for","suchthat","meth","functor"]);var c=wordRegexp(r);var s=wordRegexp(a);function tokenBase(r,a){if(r.eatSpace())return null;if(r.match(/[{}]/))return"bracket";if(r.match("[]"))return"keyword";if(r.match(n)||r.match(t))return"operator";if(r.match(o))return"atom";var f=r.match(u);if(f){a.doInCurrentLine?a.doInCurrentLine=false:a.currentIndent++;f[0]=="proc"||f[0]=="fun"?a.tokenize=tokenFunProc:f[0]=="class"?a.tokenize=tokenClass:f[0]=="meth"&&(a.tokenize=tokenMeth);return"keyword"}if(r.match(c)||r.match(i))return"keyword";if(r.match(s)){a.currentIndent--;return"keyword"}var l=r.next();if(l=='"'||l=="'"){a.tokenize=tokenString(l);return a.tokenize(r,a)}if(/[~\d]/.test(l)){if(l=="~"){if(!/^[0-9]/.test(r.peek()))return null;if(r.next()=="0"&&r.match(/^[xX][0-9a-fA-F]+/)||r.match(/^[0-9]*(\.[0-9]+)?([eE][~+]?[0-9]+)?/))return"number"}return l=="0"&&r.match(/^[xX][0-9a-fA-F]+/)||r.match(/^[0-9]*(\.[0-9]+)?([eE][~+]?[0-9]+)?/)?"number":null}if(l=="%"){r.skipToEnd();return"comment"}if(l=="/"&&r.eat("*")){a.tokenize=tokenComment;return tokenComment(r,a)}if(e.test(l))return"operator";r.eatWhile(/\w/);return"variable"}function tokenClass(e,t){if(e.eatSpace())return null;e.match(/([A-Z][A-Za-z0-9_]*)|(`.+`)/);t.tokenize=tokenBase;return"type"}function tokenMeth(e,t){if(e.eatSpace())return null;e.match(/([a-zA-Z][A-Za-z0-9_]*)|(`.+`)/);t.tokenize=tokenBase;return"def"}function tokenFunProc(e,t){if(e.eatSpace())return null;if(!t.hasPassedFirstStage&&e.eat("{")){t.hasPassedFirstStage=true;return"bracket"}if(t.hasPassedFirstStage){e.match(/([A-Z][A-Za-z0-9_]*)|(`.+`)|\$/);t.hasPassedFirstStage=false;t.tokenize=tokenBase;return"def"}t.tokenize=tokenBase;return null}function tokenComment(e,t){var n,r=false;while(n=e.next()){if(n=="/"&&r){t.tokenize=tokenBase;break}r=n=="*"}return"comment"}function tokenString(e){return function(t,n){var r,a=false,o=false;while((r=t.next())!=null){if(r==e&&!a){o=true;break}a=!a&&r=="\\"}!o&&a||(n.tokenize=tokenBase);return"string"}}function buildElectricInputRegEx(){var e=r.concat(a);return new RegExp("[\\[\\]]|("+e.join("|")+")$")}const f={name:"oz",startState:function(){return{tokenize:tokenBase,currentIndent:0,doInCurrentLine:false,hasPassedFirstStage:false}},token:function(e,t){e.sol()&&(t.doInCurrentLine=0);return t.tokenize(e,t)},indent:function(e,t,n){var r=t.replace(/^\s+|\s+$/g,"");return r.match(s)||r.match(c)||r.match(/(\[])/)?n.unit*(e.currentIndent-1):e.currentIndent<0?0:e.currentIndent*n.unit},languageData:{indentOnInut:buildElectricInputRegEx(),commentTokens:{line:"%",block:{open:"/*",close:"*/"}}}};export{f as oz};
