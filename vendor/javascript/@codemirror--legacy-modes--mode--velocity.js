// @codemirror/legacy-modes/mode/velocity@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/velocity.js

function parseWords(e){var t={},n=e.split(" ");for(var r=0;r<n.length;++r)t[n[r]]=true;return t}var e=parseWords("#end #else #break #stop #[[ #]] #{end} #{else} #{break} #{stop}");var t=parseWords("#if #elseif #foreach #set #include #parse #macro #define #evaluate #{if} #{elseif} #{foreach} #{set} #{include} #{parse} #{macro} #{define} #{evaluate}");var n=parseWords("$foreach.count $foreach.hasNext $foreach.first $foreach.last $foreach.topmost $foreach.parent.count $foreach.parent.hasNext $foreach.parent.first $foreach.parent.last $foreach.parent $velocityCount $!bodyContent $bodyContent");var r=/[+\-*&%=<>!?:\/|]/;function chain(e,t,n){t.tokenize=n;return n(e,t)}function tokenBase(a,i){var s=i.beforeParams;i.beforeParams=false;var o=a.next();if(o=="'"&&!i.inString&&i.inParams){i.lastTokenWasBuiltin=false;return chain(a,i,tokenString(o))}if(o!='"'){if(/[\[\]{}\(\),;\.]/.test(o)){if(o=="("&&s)i.inParams=true;else if(o==")"){i.inParams=false;i.lastTokenWasBuiltin=true}return null}if(/\d/.test(o)){i.lastTokenWasBuiltin=false;a.eatWhile(/[\w\.]/);return"number"}if(o=="#"&&a.eat("*")){i.lastTokenWasBuiltin=false;return chain(a,i,tokenComment)}if(o=="#"&&a.match(/ *\[ *\[/)){i.lastTokenWasBuiltin=false;return chain(a,i,tokenUnparsed)}if(o=="#"&&a.eat("#")){i.lastTokenWasBuiltin=false;a.skipToEnd();return"comment"}if(o=="$"){a.eat("!");a.eatWhile(/[\w\d\$_\.{}-]/);if(n&&n.propertyIsEnumerable(a.current()))return"keyword";i.lastTokenWasBuiltin=true;i.beforeParams=true;return"builtin"}if(r.test(o)){i.lastTokenWasBuiltin=false;a.eatWhile(r);return"operator"}a.eatWhile(/[\w\$_{}@]/);var l=a.current();if(e&&e.propertyIsEnumerable(l))return"keyword";if(t&&t.propertyIsEnumerable(l)||a.current().match(/^#@?[a-z0-9_]+ *$/i)&&a.peek()=="("&&!(t&&t.propertyIsEnumerable(l.toLowerCase()))){i.beforeParams=true;i.lastTokenWasBuiltin=false;return"keyword"}if(i.inString){i.lastTokenWasBuiltin=false;return"string"}if(a.pos>l.length&&a.string.charAt(a.pos-l.length-1)=="."&&i.lastTokenWasBuiltin)return"builtin";i.lastTokenWasBuiltin=false;return null}i.lastTokenWasBuiltin=false;if(i.inString){i.inString=false;return"string"}if(i.inParams)return chain(a,i,tokenString(o))}function tokenString(e){return function(t,n){var r,a=false,i=false;while((r=t.next())!=null){if(r==e&&!a){i=true;break}if(e=='"'&&t.peek()=="$"&&!a){n.inString=true;i=true;break}a=!a&&r=="\\"}i&&(n.tokenize=tokenBase);return"string"}}function tokenComment(e,t){var n,r=false;while(n=e.next()){if(n=="#"&&r){t.tokenize=tokenBase;break}r=n=="*"}return"comment"}function tokenUnparsed(e,t){var n,r=0;while(n=e.next()){if(n=="#"&&r==2){t.tokenize=tokenBase;break}n=="]"?r++:n!=" "&&(r=0)}return"meta"}const a={name:"velocity",startState:function(){return{tokenize:tokenBase,beforeParams:false,inParams:false,inString:false,lastTokenWasBuiltin:false}},token:function(e,t){return e.eatSpace()?null:t.tokenize(e,t)},languageData:{commentTokens:{line:"##",block:{open:"#*",close:"*#"}}}};export{a as velocity};
