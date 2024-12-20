// @codemirror/legacy-modes/mode/modelica@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/modelica.js

function words(e){var t={},n=e.split(" ");for(var o=0;o<n.length;++o)t[n[o]]=true;return t}var e=words("algorithm and annotation assert block break class connect connector constant constrainedby der discrete each else elseif elsewhen encapsulated end enumeration equation expandable extends external false final flow for function if import impure in initial inner input loop model not operator or outer output package parameter partial protected public pure record redeclare replaceable return stream then true type when while within");var t=words("abs acos actualStream asin atan atan2 cardinality ceil cos cosh delay div edge exp floor getInstanceName homotopy inStream integer log log10 mod pre reinit rem semiLinear sign sin sinh spatialDistribution sqrt tan tanh");var n=words("Real Boolean Integer String");var o=[].concat(Object.keys(e),Object.keys(t),Object.keys(n));var r=/[;=\(:\),{}.*<>+\-\/^\[\]]/;var a=/(:=|<=|>=|==|<>|\.\+|\.\-|\.\*|\.\/|\.\^)/;var i=/[0-9]/;var l=/[_a-zA-Z]/;function tokenLineComment(e,t){e.skipToEnd();t.tokenize=null;return"comment"}function tokenBlockComment(e,t){var n,o=false;while(n=e.next()){if(o&&n=="/"){t.tokenize=null;break}o=n=="*"}return"comment"}function tokenString(e,t){var n,o=false;while((n=e.next())!=null){if(n=='"'&&!o){t.tokenize=null;t.sol=false;break}o=!o&&n=="\\"}return"string"}function tokenIdent(o,r){o.eatWhile(i);while(o.eat(i)||o.eat(l));var a=o.current();!r.sol||a!="package"&&a!="model"&&a!="when"&&a!="connector"?r.sol&&a=="end"&&r.level>0&&r.level--:r.level++;r.tokenize=null;r.sol=false;return e.propertyIsEnumerable(a)?"keyword":t.propertyIsEnumerable(a)?"builtin":n.propertyIsEnumerable(a)?"atom":"variable"}function tokenQIdent(e,t){while(e.eat(/[^']/));t.tokenize=null;t.sol=false;return e.eat("'")?"variable":"error"}function tokenUnsignedNumber(e,t){e.eatWhile(i);e.eat(".")&&e.eatWhile(i);if(e.eat("e")||e.eat("E")){e.eat("-")||e.eat("+");e.eatWhile(i)}t.tokenize=null;t.sol=false;return"number"}const s={name:"modelica",startState:function(){return{tokenize:null,level:0,sol:true}},token:function(e,t){if(t.tokenize!=null)return t.tokenize(e,t);e.sol()&&(t.sol=true);if(e.eatSpace()){t.tokenize=null;return null}var n=e.next();if(n=="/"&&e.eat("/"))t.tokenize=tokenLineComment;else if(n=="/"&&e.eat("*"))t.tokenize=tokenBlockComment;else{if(a.test(n+e.peek())){e.next();t.tokenize=null;return"operator"}if(r.test(n)){t.tokenize=null;return"operator"}if(l.test(n))t.tokenize=tokenIdent;else if(n=="'"&&e.peek()&&e.peek()!="'")t.tokenize=tokenQIdent;else if(n=='"')t.tokenize=tokenString;else{if(!i.test(n)){t.tokenize=null;return"error"}t.tokenize=tokenUnsignedNumber}}return t.tokenize(e,t)},indent:function(e,t,n){if(e.tokenize!=null)return null;var o=e.level;/(algorithm)/.test(t)&&o--;/(equation)/.test(t)&&o--;/(initial algorithm)/.test(t)&&o--;/(initial equation)/.test(t)&&o--;/(end)/.test(t)&&o--;return o>0?n.unit*o:0},languageData:{commentTokens:{line:"//",block:{open:"/*",close:"*/"}},autocomplete:o}};export{s as modelica};
