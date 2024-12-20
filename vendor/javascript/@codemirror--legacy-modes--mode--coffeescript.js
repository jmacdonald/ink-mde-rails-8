// @codemirror/legacy-modes/mode/coffeescript@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/coffeescript.js

var e="error";function wordRegexp(e){return new RegExp("^(("+e.join(")|(")+"))\\b")}var t=/^(?:->|=>|\+[+=]?|-[\-=]?|\*[\*=]?|\/[\/=]?|[=!]=|<[><]?=?|>>?=?|%=?|&=?|\|=?|\^=?|\~|!|\?|(or|and|\|\||&&|\?)=)/;var n=/^(?:[()\[\]{},:`=;]|\.\.?\.?)/;var r=/^[_A-Za-z$][_A-Za-z$0-9]*/;var o=/^@[_A-Za-z$][_A-Za-z$0-9]*/;var a=wordRegexp(["and","or","not","is","isnt","in","instanceof","typeof"]);var i=["for","while","loop","if","unless","else","switch","try","catch","finally","class"];var f=["break","by","continue","debugger","delete","do","in","of","new","return","then","this","@","throw","when","until","extends"];var c=wordRegexp(i.concat(f));i=wordRegexp(i);var p=/^('{3}|\"{3}|['\"])/;var s=/^(\/{3}|\/)/;var u=["Infinity","NaN","undefined","null","true","false","on","off","yes","no"];var l=wordRegexp(u);function tokenBase(i,f){if(i.sol()){f.scope.align===null&&(f.scope.align=false);var u=f.scope.offset;if(i.eatSpace()){var d=i.indentation();return d>u&&f.scope.type=="coffee"?"indent":d<u?"dedent":null}u>0&&dedent(i,f)}if(i.eatSpace())return null;var v=i.peek();if(i.match("####")){i.skipToEnd();return"comment"}if(i.match("###")){f.tokenize=longComment;return f.tokenize(i,f)}if(v==="#"){i.skipToEnd();return"comment"}if(i.match(/^-?[0-9\.]/,false)){var h=false;i.match(/^-?\d*\.\d+(e[\+\-]?\d+)?/i)&&(h=true);i.match(/^-?\d+\.\d*/)&&(h=true);i.match(/^-?\.\d+/)&&(h=true);if(h){i.peek()=="."&&i.backUp(1);return"number"}var m=false;i.match(/^-?0x[0-9a-f]+/i)&&(m=true);i.match(/^-?[1-9]\d*(e[\+\-]?\d+)?/)&&(m=true);i.match(/^-?0(?![\dx])/i)&&(m=true);if(m)return"number"}if(i.match(p)){f.tokenize=tokenFactory(i.current(),false,"string");return f.tokenize(i,f)}if(i.match(s)){if(i.current()!="/"||i.match(/^.*\//,false)){f.tokenize=tokenFactory(i.current(),true,"string.special");return f.tokenize(i,f)}i.backUp(1)}if(i.match(t)||i.match(a))return"operator";if(i.match(n))return"punctuation";if(i.match(l))return"atom";if(i.match(o)||f.prop&&i.match(r))return"property";if(i.match(c))return"keyword";if(i.match(r))return"variable";i.next();return e}function tokenFactory(e,t,n){return function(r,o){while(!r.eol()){r.eatWhile(/[^'"\/\\]/);if(r.eat("\\")){r.next();if(t&&r.eol())return n}else{if(r.match(e)){o.tokenize=tokenBase;return n}r.eat(/['"\/]/)}}t&&(o.tokenize=tokenBase);return n}}function longComment(e,t){while(!e.eol()){e.eatWhile(/[^#]/);if(e.match("###")){t.tokenize=tokenBase;break}e.eatWhile("#")}return"comment"}function indent(e,t,n="coffee"){var r=0,o=false,a=null;for(var i=t.scope;i;i=i.prev)if(i.type==="coffee"||i.type=="}"){r=i.offset+e.indentUnit;break}if(n!=="coffee"){o=null;a=e.column()+e.current().length}else t.scope.align&&(t.scope.align=false);t.scope={offset:r,type:n,prev:t.scope,align:o,alignOffset:a}}function dedent(e,t){if(t.scope.prev){if(t.scope.type==="coffee"){var n=e.indentation();var r=false;for(var o=t.scope;o;o=o.prev)if(n===o.offset){r=true;break}if(!r)return true;while(t.scope.prev&&t.scope.offset!==n)t.scope=t.scope.prev;return false}t.scope=t.scope.prev;return false}}function tokenLexer(t,n){var r=n.tokenize(t,n);var o=t.current();o==="return"&&(n.dedent=true);((o==="->"||o==="=>")&&t.eol()||r==="indent")&&indent(t,n);var a="[({".indexOf(o);a!==-1&&indent(t,n,"])}".slice(a,a+1));i.exec(o)&&indent(t,n);o=="then"&&dedent(t,n);if(r==="dedent"&&dedent(t,n))return e;a="])}".indexOf(o);if(a!==-1){while(n.scope.type=="coffee"&&n.scope.prev)n.scope=n.scope.prev;n.scope.type==o&&(n.scope=n.scope.prev)}if(n.dedent&&t.eol()){n.scope.type=="coffee"&&n.scope.prev&&(n.scope=n.scope.prev);n.dedent=false}return r=="indent"||r=="dedent"?null:r}const d={name:"coffeescript",startState:function(){return{tokenize:tokenBase,scope:{offset:0,type:"coffee",prev:null,align:false},prop:false,dedent:0}},token:function(e,t){var n=t.scope.align===null&&t.scope;n&&e.sol()&&(n.align=false);var r=tokenLexer(e,t);if(r&&r!="comment"){n&&(n.align=true);t.prop=r=="punctuation"&&e.current()=="."}return r},indent:function(e,t){if(e.tokenize!=tokenBase)return 0;var n=e.scope;var r=t&&"])}".indexOf(t.charAt(0))>-1;if(r)while(n.type=="coffee"&&n.prev)n=n.prev;var o=r&&n.type===t.charAt(0);return n.align?n.alignOffset-(o?1:0):(o?n.prev:n).offset},languageData:{commentTokens:{line:"#"}}};export{d as coffeeScript};

