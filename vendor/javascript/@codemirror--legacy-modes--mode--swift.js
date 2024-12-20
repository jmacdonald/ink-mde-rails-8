// @codemirror/legacy-modes/mode/swift@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/swift.js

function wordSet(e){var t={};for(var n=0;n<e.length;n++)t[e[n]]=true;return t}var e=wordSet(["_","var","let","actor","class","enum","extension","import","protocol","struct","func","typealias","associatedtype","open","public","internal","fileprivate","private","deinit","init","new","override","self","subscript","super","convenience","dynamic","final","indirect","lazy","required","static","unowned","unowned(safe)","unowned(unsafe)","weak","as","is","break","case","continue","default","else","fallthrough","for","guard","if","in","repeat","switch","where","while","defer","return","inout","mutating","nonmutating","isolated","nonisolated","catch","do","rethrows","throw","throws","async","await","try","didSet","get","set","willSet","assignment","associativity","infix","left","none","operator","postfix","precedence","precedencegroup","prefix","right","Any","AnyObject","Type","dynamicType","Self","Protocol","__COLUMN__","__FILE__","__FUNCTION__","__LINE__"]);var t=wordSet(["var","let","actor","class","enum","extension","import","protocol","struct","func","typealias","associatedtype","for"]);var n=wordSet(["true","false","nil","self","super","_"]);var r=wordSet(["Array","Bool","Character","Dictionary","Double","Float","Int","Int8","Int16","Int32","Int64","Never","Optional","Set","String","UInt8","UInt16","UInt32","UInt64","Void"]);var i="+-/*%=|&<>~^?!";var a=":;,.(){}[]";var o=/^\-?0b[01][01_]*/;var u=/^\-?0o[0-7][0-7_]*/;var c=/^\-?0x[\dA-Fa-f][\dA-Fa-f_]*(?:(?:\.[\dA-Fa-f][\dA-Fa-f_]*)?[Pp]\-?\d[\d_]*)?/;var s=/^\-?\d[\d_]*(?:\.\d[\d_]*)?(?:[Ee]\-?\d[\d_]*)?/;var l=/^\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1/;var f=/^\.(?:\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1)/;var p=/^\#[A-Za-z]+/;var d=/^@(?:\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1)/;function tokenBase(v,m,h){v.sol()&&(m.indented=v.indentation());if(v.eatSpace())return null;var k=v.peek();if(k=="/"){if(v.match("//")){v.skipToEnd();return"comment"}if(v.match("/*")){m.tokenize.push(tokenComment);return tokenComment(v,m)}}if(v.match(p))return"builtin";if(v.match(d))return"attribute";if(v.match(o))return"number";if(v.match(u))return"number";if(v.match(c))return"number";if(v.match(s))return"number";if(v.match(f))return"property";if(i.indexOf(k)>-1){v.next();return"operator"}if(a.indexOf(k)>-1){v.next();v.match("..");return"punctuation"}var _;if(_=v.match(/("""|"|')/)){var x=tokenString.bind(null,_[0]);m.tokenize.push(x);return x(v,m)}if(v.match(l)){var w=v.current();if(r.hasOwnProperty(w))return"type";if(n.hasOwnProperty(w))return"atom";if(e.hasOwnProperty(w)){t.hasOwnProperty(w)&&(m.prev="define");return"keyword"}return h=="define"?"def":"variable"}v.next();return null}function tokenUntilClosingParen(){var e=0;return function(t,n,r){var i=tokenBase(t,n,r);if(i=="punctuation")if(t.current()=="(")++e;else if(t.current()==")"){if(e==0){t.backUp(1);n.tokenize.pop();return n.tokenize[n.tokenize.length-1](t,n)}--e}return i}}function tokenString(e,t,n){var r=e.length==1;var i,a=false;while(i=t.peek())if(a){t.next();if(i=="("){n.tokenize.push(tokenUntilClosingParen());return"string"}a=false}else{if(t.match(e)){n.tokenize.pop();return"string"}t.next();a=i=="\\"}r&&n.tokenize.pop();return"string"}function tokenComment(e,t){var n;while(n=e.next())if(n==="/"&&e.eat("*"))t.tokenize.push(tokenComment);else if(n==="*"&&e.eat("/")){t.tokenize.pop();break}return"comment"}function Context(e,t,n){this.prev=e;this.align=t;this.indented=n}function pushContext(e,t){var n=t.match(/^\s*($|\/[\/\*]|[)}\]])/,false)?null:t.column()+1;e.context=new Context(e.context,n,e.indented)}function popContext(e){if(e.context){e.indented=e.context.indented;e.context=e.context.prev}}const v={name:"swift",startState:function(){return{prev:null,context:null,indented:0,tokenize:[]}},token:function(e,t){var n=t.prev;t.prev=null;var r=t.tokenize[t.tokenize.length-1]||tokenBase;var i=r(e,t,n);i&&i!="comment"?t.prev||(t.prev=i):t.prev=n;if(i=="punctuation"){var a=/[\(\[\{]|([\]\)\}])/.exec(e.current());a&&(a[1]?popContext:pushContext)(t,e)}return i},indent:function(e,t,n){var r=e.context;if(!r)return 0;var i=/^[\]\}\)]/.test(t);return r.align!=null?r.align-(i?1:0):r.indented+(i?0:n.unit)},languageData:{indentOnInput:/^\s*[\)\}\]]$/,commentTokens:{line:"//",block:{open:"/*",close:"*/"}},closeBrackets:{brackets:["(","[","{","'",'"',"`"]}}};export{v as swift};

