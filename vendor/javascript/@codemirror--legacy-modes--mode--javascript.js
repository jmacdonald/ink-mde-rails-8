// @codemirror/legacy-modes/mode/javascript@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/javascript.js

function mkJavaScript(e){var t=e.statementIndent;var r=e.jsonld;var n=e.json||r;var o=e.typescript;var a=e.wordCharacters||/[\w$\xa1-\uffff]/;var s=function(){function kw(e){return{type:e,style:"keyword"}}var e=kw("keyword a"),t=kw("keyword b"),r=kw("keyword c"),n=kw("keyword d");var o=kw("operator"),a={type:"atom",style:"atom"};return{if:kw("if"),while:e,with:e,else:t,do:t,try:t,finally:t,return:n,break:n,continue:n,new:kw("new"),delete:r,void:r,throw:r,debugger:kw("debugger"),var:kw("var"),const:kw("var"),let:kw("var"),function:kw("function"),catch:kw("catch"),for:kw("for"),switch:kw("switch"),case:kw("case"),default:kw("default"),in:o,typeof:o,instanceof:o,true:a,false:a,null:a,undefined:a,NaN:a,Infinity:a,this:kw("this"),class:kw("class"),super:kw("atom"),yield:r,export:kw("export"),import:kw("import"),extends:r,await:r}}();var p=/[+\-*&%=<>!?|~^@]/;var i=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;function readRegexp(e){var t,r=false,n=false;while((t=e.next())!=null){if(!r){if(t=="/"&&!n)return;t=="["?n=true:n&&t=="]"&&(n=false)}r=!r&&t=="\\"}}var c,u;function ret(e,t,r){c=e;u=r;return t}function tokenBase(e,t){var r=e.next();if(r=='"'||r=="'"){t.tokenize=tokenString(r);return t.tokenize(e,t)}if(r=="."&&e.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/))return ret("number","number");if(r=="."&&e.match(".."))return ret("spread","meta");if(/[\[\]{}\(\),;\:\.]/.test(r))return ret(r);if(r=="="&&e.eat(">"))return ret("=>","operator");if(r=="0"&&e.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/))return ret("number","number");if(/\d/.test(r)){e.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/);return ret("number","number")}if(r=="/"){if(e.eat("*")){t.tokenize=tokenComment;return tokenComment(e,t)}if(e.eat("/")){e.skipToEnd();return ret("comment","comment")}if(expressionAllowed(e,t,1)){readRegexp(e);e.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);return ret("regexp","string.special")}e.eat("=");return ret("operator","operator",e.current())}if(r=="`"){t.tokenize=tokenQuasi;return tokenQuasi(e,t)}if(r=="#"&&e.peek()=="!"){e.skipToEnd();return ret("meta","meta")}if(r=="#"&&e.eatWhile(a))return ret("variable","property");if(r=="<"&&e.match("!--")||r=="-"&&e.match("->")&&!/\S/.test(e.string.slice(0,e.start))){e.skipToEnd();return ret("comment","comment")}if(p.test(r)){if(r!=">"||!t.lexical||t.lexical.type!=">")if(e.eat("="))r!="!"&&r!="="||e.eat("=");else if(/[<>*+\-|&?]/.test(r)){e.eat(r);r==">"&&e.eat(r)}return r=="?"&&e.eat(".")?ret("."):ret("operator","operator",e.current())}if(a.test(r)){e.eatWhile(a);var n=e.current();if(t.lastType!="."){if(s.propertyIsEnumerable(n)){var o=s[n];return ret(o.type,o.style,n)}if(n=="async"&&e.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/,false))return ret("async","keyword",n)}return ret("variable","variable",n)}}function tokenString(e){return function(t,n){var o,a=false;if(r&&t.peek()=="@"&&t.match(i)){n.tokenize=tokenBase;return ret("jsonld-keyword","meta")}while((o=t.next())!=null){if(o==e&&!a)break;a=!a&&o=="\\"}a||(n.tokenize=tokenBase);return ret("string","string")}}function tokenComment(e,t){var r,n=false;while(r=e.next()){if(r=="/"&&n){t.tokenize=tokenBase;break}n=r=="*"}return ret("comment","comment")}function tokenQuasi(e,t){var r,n=false;while((r=e.next())!=null){if(!n&&(r=="`"||r=="$"&&e.eat("{"))){t.tokenize=tokenBase;break}n=!n&&r=="\\"}return ret("quasi","string.special",e.current())}var f="([{}])";function findFatArrow(e,t){t.fatArrowAt&&(t.fatArrowAt=null);var r=e.string.indexOf("=>",e.start);if(!(r<0)){if(o){var n=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start,r));n&&(r=n.index)}var s=0,p=false;for(var i=r-1;i>=0;--i){var c=e.string.charAt(i);var u=f.indexOf(c);if(u>=0&&u<3){if(!s){++i;break}if(--s==0){c=="("&&(p=true);break}}else if(u>=3&&u<6)++s;else if(a.test(c))p=true;else if(/["'\/`]/.test(c))for(;;--i){if(i==0)return;var l=e.string.charAt(i-1);if(l==c&&e.string.charAt(i-2)!="\\"){i--;break}}else if(p&&!s){++i;break}}p&&!s&&(t.fatArrowAt=i)}}var l={atom:true,number:true,variable:true,string:true,regexp:true,this:true,import:true,"jsonld-keyword":true};function JSLexical(e,t,r,n,o,a){this.indented=e;this.column=t;this.type=r;this.prev=o;this.info=a;n!=null&&(this.align=n)}function inScope(e,t){for(var r=e.localVars;r;r=r.next)if(r.name==t)return true;for(var n=e.context;n;n=n.prev)for(r=n.vars;r;r=r.next)if(r.name==t)return true}function parseJS(e,t,r,o,a){var s=e.cc;m.state=e;m.stream=a;m.marked=null;m.cc=s;m.style=t;e.lexical.hasOwnProperty("align")||(e.lexical.align=true);while(true){var p=s.length?s.pop():n?expression:statement;if(p(r,o)){while(s.length&&s[s.length-1].lex)s.pop()();return m.marked?m.marked:r=="variable"&&inScope(e,o)?"variableName.local":t}}}var m={state:null,column:null,marked:null,cc:null};function pass(){for(var e=arguments.length-1;e>=0;e--)m.cc.push(arguments[e])}function cont(){pass.apply(null,arguments);return true}function inList(e,t){for(var r=t;r;r=r.next)if(r.name==e)return true;return false}function register(t){var r=m.state;m.marked="def";if(r.context)if(r.lexical.info=="var"&&r.context&&r.context.block){var n=registerVarScoped(t,r.context);if(n!=null){r.context=n;return}}else if(!inList(t,r.localVars)){r.localVars=new Var(t,r.localVars);return}e.globalVars&&!inList(t,r.globalVars)&&(r.globalVars=new Var(t,r.globalVars))}function registerVarScoped(e,t){if(t){if(t.block){var r=registerVarScoped(e,t.prev);return r?r==t.prev?t:new Context(r,t.vars,true):null}return inList(e,t.vars)?t:new Context(t.prev,new Var(e,t.vars),false)}return null}function isModifier(e){return e=="public"||e=="private"||e=="protected"||e=="abstract"||e=="readonly"}function Context(e,t,r){this.prev=e;this.vars=t;this.block=r}function Var(e,t){this.name=e;this.next=t}var x=new Var("this",new Var("arguments",null));function pushcontext(){m.state.context=new Context(m.state.context,m.state.localVars,false);m.state.localVars=x}function pushblockcontext(){m.state.context=new Context(m.state.context,m.state.localVars,true);m.state.localVars=null}pushcontext.lex=pushblockcontext.lex=true;function popcontext(){m.state.localVars=m.state.context.vars;m.state.context=m.state.context.prev}popcontext.lex=true;function pushlex(e,t){var result=function(){var r=m.state,n=r.indented;if(r.lexical.type=="stat")n=r.lexical.indented;else for(var o=r.lexical;o&&o.type==")"&&o.align;o=o.prev)n=o.indented;r.lexical=new JSLexical(n,m.stream.column(),e,null,r.lexical,t)};result.lex=true;return result}function poplex(){var e=m.state;if(e.lexical.prev){e.lexical.type==")"&&(e.indented=e.lexical.indented);e.lexical=e.lexical.prev}}poplex.lex=true;function expect(e){function exp(t){return t==e?cont():e==";"||t=="}"||t==")"||t=="]"?pass():cont(exp)}return exp}function statement(e,t){if(e=="var")return cont(pushlex("vardef",t),vardef,expect(";"),poplex);if(e=="keyword a")return cont(pushlex("form"),parenExpr,statement,poplex);if(e=="keyword b")return cont(pushlex("form"),statement,poplex);if(e=="keyword d")return m.stream.match(/^\s*$/,false)?cont():cont(pushlex("stat"),maybeexpression,expect(";"),poplex);if(e=="debugger")return cont(expect(";"));if(e=="{")return cont(pushlex("}"),pushblockcontext,block,poplex,popcontext);if(e==";")return cont();if(e=="if"){m.state.lexical.info=="else"&&m.state.cc[m.state.cc.length-1]==poplex&&m.state.cc.pop()();return cont(pushlex("form"),parenExpr,statement,poplex,maybeelse)}if(e=="function")return cont(functiondef);if(e=="for")return cont(pushlex("form"),pushblockcontext,forspec,statement,popcontext,poplex);if(e=="class"||o&&t=="interface"){m.marked="keyword";return cont(pushlex("form",e=="class"?e:t),className,poplex)}if(e=="variable"){if(o&&t=="declare"){m.marked="keyword";return cont(statement)}if(o&&(t=="module"||t=="enum"||t=="type")&&m.stream.match(/^\s*\w/,false)){m.marked="keyword";return t=="enum"?cont(enumdef):t=="type"?cont(typename,expect("operator"),typeexpr,expect(";")):cont(pushlex("form"),pattern,expect("{"),pushlex("}"),block,poplex,poplex)}if(o&&t=="namespace"){m.marked="keyword";return cont(pushlex("form"),expression,statement,poplex)}if(o&&t=="abstract"){m.marked="keyword";return cont(statement)}return cont(pushlex("stat"),maybelabel)}return e=="switch"?cont(pushlex("form"),parenExpr,expect("{"),pushlex("}","switch"),pushblockcontext,block,poplex,poplex,popcontext):e=="case"?cont(expression,expect(":")):e=="default"?cont(expect(":")):e=="catch"?cont(pushlex("form"),pushcontext,maybeCatchBinding,statement,poplex,popcontext):e=="export"?cont(pushlex("stat"),afterExport,poplex):e=="import"?cont(pushlex("stat"),afterImport,poplex):e=="async"?cont(statement):t=="@"?cont(expression,statement):pass(pushlex("stat"),expression,expect(";"),poplex)}function maybeCatchBinding(e){if(e=="(")return cont(funarg,expect(")"))}function expression(e,t){return expressionInner(e,t,false)}function expressionNoComma(e,t){return expressionInner(e,t,true)}function parenExpr(e){return e!="("?pass():cont(pushlex(")"),maybeexpression,expect(")"),poplex)}function expressionInner(e,t,r){if(m.state.fatArrowAt==m.stream.start){var n=r?arrowBodyNoComma:arrowBody;if(e=="(")return cont(pushcontext,pushlex(")"),commasep(funarg,")"),poplex,expect("=>"),n,popcontext);if(e=="variable")return pass(pushcontext,pattern,expect("=>"),n,popcontext)}var a=r?maybeoperatorNoComma:maybeoperatorComma;if(l.hasOwnProperty(e))return cont(a);if(e=="function")return cont(functiondef,a);if(e=="class"||o&&t=="interface"){m.marked="keyword";return cont(pushlex("form"),classExpression,poplex)}return e=="keyword c"||e=="async"?cont(r?expressionNoComma:expression):e=="("?cont(pushlex(")"),maybeexpression,expect(")"),poplex,a):e=="operator"||e=="spread"?cont(r?expressionNoComma:expression):e=="["?cont(pushlex("]"),arrayLiteral,poplex,a):e=="{"?contCommasep(objprop,"}",null,a):e=="quasi"?pass(quasi,a):e=="new"?cont(maybeTarget(r)):cont()}function maybeexpression(e){return e.match(/[;\}\)\],]/)?pass():pass(expression)}function maybeoperatorComma(e,t){return e==","?cont(maybeexpression):maybeoperatorNoComma(e,t,false)}function maybeoperatorNoComma(e,t,r){var n=r==false?maybeoperatorComma:maybeoperatorNoComma;var a=r==false?expression:expressionNoComma;if(e=="=>")return cont(pushcontext,r?arrowBodyNoComma:arrowBody,popcontext);if(e=="operator")return/\+\+|--/.test(t)||o&&t=="!"?cont(n):o&&t=="<"&&m.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/,false)?cont(pushlex(">"),commasep(typeexpr,">"),poplex,n):t=="?"?cont(expression,expect(":"),a):cont(a);if(e=="quasi")return pass(quasi,n);if(e!=";"){if(e=="(")return contCommasep(expressionNoComma,")","call",n);if(e==".")return cont(property,n);if(e=="[")return cont(pushlex("]"),maybeexpression,expect("]"),poplex,n);if(o&&t=="as"){m.marked="keyword";return cont(typeexpr,n)}if(e=="regexp"){m.state.lastType=m.marked="operator";m.stream.backUp(m.stream.pos-m.stream.start-1);return cont(a)}}}function quasi(e,t){return e!="quasi"?pass():t.slice(t.length-2)!="${"?cont(quasi):cont(maybeexpression,continueQuasi)}function continueQuasi(e){if(e=="}"){m.marked="string.special";m.state.tokenize=tokenQuasi;return cont(quasi)}}function arrowBody(e){findFatArrow(m.stream,m.state);return pass(e=="{"?statement:expression)}function arrowBodyNoComma(e){findFatArrow(m.stream,m.state);return pass(e=="{"?statement:expressionNoComma)}function maybeTarget(e){return function(t){return t=="."?cont(e?targetNoComma:target):t=="variable"&&o?cont(maybeTypeArgs,e?maybeoperatorNoComma:maybeoperatorComma):pass(e?expressionNoComma:expression)}}function target(e,t){if(t=="target"){m.marked="keyword";return cont(maybeoperatorComma)}}function targetNoComma(e,t){if(t=="target"){m.marked="keyword";return cont(maybeoperatorNoComma)}}function maybelabel(e){return e==":"?cont(poplex,statement):pass(maybeoperatorComma,expect(";"),poplex)}function property(e){if(e=="variable"){m.marked="property";return cont()}}function objprop(e,t){if(e=="async"){m.marked="property";return cont(objprop)}if(e=="variable"||m.style=="keyword"){m.marked="property";if(t=="get"||t=="set")return cont(getterSetter);var n;o&&m.state.fatArrowAt==m.stream.start&&(n=m.stream.match(/^\s*:\s*/,false))&&(m.state.fatArrowAt=m.stream.pos+n[0].length);return cont(afterprop)}if(e=="number"||e=="string"){m.marked=r?"property":m.style+" property";return cont(afterprop)}if(e=="jsonld-keyword")return cont(afterprop);if(o&&isModifier(t)){m.marked="keyword";return cont(objprop)}if(e=="[")return cont(expression,maybetype,expect("]"),afterprop);if(e=="spread")return cont(expressionNoComma,afterprop);if(t=="*"){m.marked="keyword";return cont(objprop)}return e==":"?pass(afterprop):void 0}function getterSetter(e){if(e!="variable")return pass(afterprop);m.marked="property";return cont(functiondef)}function afterprop(e){return e==":"?cont(expressionNoComma):e=="("?pass(functiondef):void 0}function commasep(e,t,r){function proceed(n,o){if(r?r.indexOf(n)>-1:n==","){var a=m.state.lexical;a.info=="call"&&(a.pos=(a.pos||0)+1);return cont((function(r,n){return r==t||n==t?pass():pass(e)}),proceed)}return n==t||o==t?cont():r&&r.indexOf(";")>-1?pass(e):cont(expect(t))}return function(r,n){return r==t||n==t?cont():pass(e,proceed)}}function contCommasep(e,t,r){for(var n=3;n<arguments.length;n++)m.cc.push(arguments[n]);return cont(pushlex(t,r),commasep(e,t),poplex)}function block(e){return e=="}"?cont():pass(statement,block)}function maybetype(e,t){if(o){if(e==":")return cont(typeexpr);if(t=="?")return cont(maybetype)}}function maybetypeOrIn(e,t){if(o&&(e==":"||t=="in"))return cont(typeexpr)}function mayberettype(e){if(o&&e==":")return m.stream.match(/^\s*\w+\s+is\b/,false)?cont(expression,isKW,typeexpr):cont(typeexpr)}function isKW(e,t){if(t=="is"){m.marked="keyword";return cont()}}function typeexpr(e,t){if(t=="keyof"||t=="typeof"||t=="infer"||t=="readonly"){m.marked="keyword";return cont(t=="typeof"?expressionNoComma:typeexpr)}if(e=="variable"||t=="void"){m.marked="type";return cont(afterType)}return t=="|"||t=="&"?cont(typeexpr):e=="string"||e=="number"||e=="atom"?cont(afterType):e=="["?cont(pushlex("]"),commasep(typeexpr,"]",","),poplex,afterType):e=="{"?cont(pushlex("}"),typeprops,poplex,afterType):e=="("?cont(commasep(typearg,")"),maybeReturnType,afterType):e=="<"?cont(commasep(typeexpr,">"),typeexpr):e=="quasi"?pass(quasiType,afterType):void 0}function maybeReturnType(e){if(e=="=>")return cont(typeexpr)}function typeprops(e){return e.match(/[\}\)\]]/)?cont():e==","||e==";"?cont(typeprops):pass(typeprop,typeprops)}function typeprop(e,t){if(e=="variable"||m.style=="keyword"){m.marked="property";return cont(typeprop)}return t=="?"||e=="number"||e=="string"?cont(typeprop):e==":"?cont(typeexpr):e=="["?cont(expect("variable"),maybetypeOrIn,expect("]"),typeprop):e=="("?pass(functiondecl,typeprop):e.match(/[;\}\)\],]/)?void 0:cont()}function quasiType(e,t){return e!="quasi"?pass():t.slice(t.length-2)!="${"?cont(quasiType):cont(typeexpr,continueQuasiType)}function continueQuasiType(e){if(e=="}"){m.marked="string.special";m.state.tokenize=tokenQuasi;return cont(quasiType)}}function typearg(e,t){return e=="variable"&&m.stream.match(/^\s*[?:]/,false)||t=="?"?cont(typearg):e==":"?cont(typeexpr):e=="spread"?cont(typearg):pass(typeexpr)}function afterType(e,t){if(t=="<")return cont(pushlex(">"),commasep(typeexpr,">"),poplex,afterType);if(t=="|"||e=="."||t=="&")return cont(typeexpr);if(e=="[")return cont(typeexpr,expect("]"),afterType);if(t=="extends"||t=="implements"){m.marked="keyword";return cont(typeexpr)}return t=="?"?cont(typeexpr,expect(":"),typeexpr):void 0}function maybeTypeArgs(e,t){if(t=="<")return cont(pushlex(">"),commasep(typeexpr,">"),poplex,afterType)}function typeparam(){return pass(typeexpr,maybeTypeDefault)}function maybeTypeDefault(e,t){if(t=="=")return cont(typeexpr)}function vardef(e,t){if(t=="enum"){m.marked="keyword";return cont(enumdef)}return pass(pattern,maybetype,maybeAssign,vardefCont)}function pattern(e,t){if(o&&isModifier(t)){m.marked="keyword";return cont(pattern)}if(e=="variable"){register(t);return cont()}return e=="spread"?cont(pattern):e=="["?contCommasep(eltpattern,"]"):e=="{"?contCommasep(proppattern,"}"):void 0}function proppattern(e,t){if(e=="variable"&&!m.stream.match(/^\s*:/,false)){register(t);return cont(maybeAssign)}e=="variable"&&(m.marked="property");return e=="spread"?cont(pattern):e=="}"?pass():e=="["?cont(expression,expect("]"),expect(":"),proppattern):cont(expect(":"),pattern,maybeAssign)}function eltpattern(){return pass(pattern,maybeAssign)}function maybeAssign(e,t){if(t=="=")return cont(expressionNoComma)}function vardefCont(e){if(e==",")return cont(vardef)}function maybeelse(e,t){if(e=="keyword b"&&t=="else")return cont(pushlex("form","else"),statement,poplex)}function forspec(e,t){return t=="await"?cont(forspec):e=="("?cont(pushlex(")"),forspec1,poplex):void 0}function forspec1(e){return e=="var"?cont(vardef,forspec2):e=="variable"?cont(forspec2):pass(forspec2)}function forspec2(e,t){if(e==")")return cont();if(e==";")return cont(forspec2);if(t=="in"||t=="of"){m.marked="keyword";return cont(expression,forspec2)}return pass(expression,forspec2)}function functiondef(e,t){if(t=="*"){m.marked="keyword";return cont(functiondef)}if(e=="variable"){register(t);return cont(functiondef)}return e=="("?cont(pushcontext,pushlex(")"),commasep(funarg,")"),poplex,mayberettype,statement,popcontext):o&&t=="<"?cont(pushlex(">"),commasep(typeparam,">"),poplex,functiondef):void 0}function functiondecl(e,t){if(t=="*"){m.marked="keyword";return cont(functiondecl)}if(e=="variable"){register(t);return cont(functiondecl)}return e=="("?cont(pushcontext,pushlex(")"),commasep(funarg,")"),poplex,mayberettype,popcontext):o&&t=="<"?cont(pushlex(">"),commasep(typeparam,">"),poplex,functiondecl):void 0}function typename(e,t){if(e=="keyword"||e=="variable"){m.marked="type";return cont(typename)}if(t=="<")return cont(pushlex(">"),commasep(typeparam,">"),poplex)}function funarg(e,t){t=="@"&&cont(expression,funarg);if(e=="spread")return cont(funarg);if(o&&isModifier(t)){m.marked="keyword";return cont(funarg)}return o&&e=="this"?cont(maybetype,maybeAssign):pass(pattern,maybetype,maybeAssign)}function classExpression(e,t){return e=="variable"?className(e,t):classNameAfter(e,t)}function className(e,t){if(e=="variable"){register(t);return cont(classNameAfter)}}function classNameAfter(e,t){if(t=="<")return cont(pushlex(">"),commasep(typeparam,">"),poplex,classNameAfter);if(t=="extends"||t=="implements"||o&&e==","){t=="implements"&&(m.marked="keyword");return cont(o?typeexpr:expression,classNameAfter)}return e=="{"?cont(pushlex("}"),classBody,poplex):void 0}function classBody(e,t){if(e=="async"||e=="variable"&&(t=="static"||t=="get"||t=="set"||o&&isModifier(t))&&m.stream.match(/^\s+#?[\w$\xa1-\uffff]/,false)){m.marked="keyword";return cont(classBody)}if(e=="variable"||m.style=="keyword"){m.marked="property";return cont(classfield,classBody)}if(e=="number"||e=="string")return cont(classfield,classBody);if(e=="[")return cont(expression,maybetype,expect("]"),classfield,classBody);if(t=="*"){m.marked="keyword";return cont(classBody)}return o&&e=="("?pass(functiondecl,classBody):e==";"||e==","?cont(classBody):e=="}"?cont():t=="@"?cont(expression,classBody):void 0}function classfield(e,t){if(t=="!"||t=="?")return cont(classfield);if(e==":")return cont(typeexpr,maybeAssign);if(t=="=")return cont(expressionNoComma);var r=m.state.lexical.prev,n=r&&r.info=="interface";return pass(n?functiondecl:functiondef)}function afterExport(e,t){if(t=="*"){m.marked="keyword";return cont(maybeFrom,expect(";"))}if(t=="default"){m.marked="keyword";return cont(expression,expect(";"))}return e=="{"?cont(commasep(exportField,"}"),maybeFrom,expect(";")):pass(statement)}function exportField(e,t){if(t=="as"){m.marked="keyword";return cont(expect("variable"))}if(e=="variable")return pass(expressionNoComma,exportField)}function afterImport(e){return e=="string"?cont():e=="("?pass(expression):e=="."?pass(maybeoperatorComma):pass(importSpec,maybeMoreImports,maybeFrom)}function importSpec(e,t){if(e=="{")return contCommasep(importSpec,"}");e=="variable"&&register(t);t=="*"&&(m.marked="keyword");return cont(maybeAs)}function maybeMoreImports(e){if(e==",")return cont(importSpec,maybeMoreImports)}function maybeAs(e,t){if(t=="as"){m.marked="keyword";return cont(importSpec)}}function maybeFrom(e,t){if(t=="from"){m.marked="keyword";return cont(expression)}}function arrayLiteral(e){return e=="]"?cont():pass(commasep(expressionNoComma,"]"))}function enumdef(){return pass(pushlex("form"),pattern,expect("{"),pushlex("}"),commasep(enummember,"}"),poplex,poplex)}function enummember(){return pass(pattern,maybeAssign)}function isContinuedStatement(e,t){return e.lastType=="operator"||e.lastType==","||p.test(t.charAt(0))||/[,.]/.test(t.charAt(0))}function expressionAllowed(e,t,r){return t.tokenize==tokenBase&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType)||t.lastType=="quasi"&&/\{\s*$/.test(e.string.slice(0,e.pos-(r||0)))}return{name:e.name,startState:function(t){var r={tokenize:tokenBase,lastType:"sof",cc:[],lexical:new JSLexical(-t,0,"block",false),localVars:e.localVars,context:e.localVars&&new Context(null,null,false),indented:0};e.globalVars&&typeof e.globalVars=="object"&&(r.globalVars=e.globalVars);return r},token:function(e,t){if(e.sol()){t.lexical.hasOwnProperty("align")||(t.lexical.align=false);t.indented=e.indentation();findFatArrow(e,t)}if(t.tokenize!=tokenComment&&e.eatSpace())return null;var r=t.tokenize(e,t);if(c=="comment")return r;t.lastType=c!="operator"||u!="++"&&u!="--"?c:"incdec";return parseJS(t,r,c,u,e)},indent:function(r,n,o){if(r.tokenize==tokenComment||r.tokenize==tokenQuasi)return null;if(r.tokenize!=tokenBase)return 0;var a,s=n&&n.charAt(0),p=r.lexical;if(!/^\s*else\b/.test(n))for(var i=r.cc.length-1;i>=0;--i){var c=r.cc[i];if(c==poplex)p=p.prev;else if(c!=maybeelse&&c!=popcontext)break}while((p.type=="stat"||p.type=="form")&&(s=="}"||(a=r.cc[r.cc.length-1])&&(a==maybeoperatorComma||a==maybeoperatorNoComma)&&!/^[,\.=+\-*:?[\(]/.test(n)))p=p.prev;t&&p.type==")"&&p.prev.type=="stat"&&(p=p.prev);var u=p.type,f=s==u;return u=="vardef"?p.indented+(r.lastType=="operator"||r.lastType==","?p.info.length+1:0):u=="form"&&s=="{"?p.indented:u=="form"?p.indented+o.unit:u=="stat"?p.indented+(isContinuedStatement(r,n)?t||o.unit:0):p.info!="switch"||f||e.doubleIndentSwitch==false?p.align?p.column+(f?0:1):p.indented+(f?0:o.unit):p.indented+(/^(?:case|default)\b/.test(n)?o.unit:2*o.unit)},languageData:{indentOnInput:/^\s*(?:case .*?:|default:|\{|\})$/,commentTokens:n?void 0:{line:"//",block:{open:"/*",close:"*/"}},closeBrackets:{brackets:["(","[","{","'",'"',"`"]},wordChars:"$"}}}const e=mkJavaScript({name:"javascript"});const t=mkJavaScript({name:"json",json:true});const r=mkJavaScript({name:"json",jsonld:true});const n=mkJavaScript({name:"typescript",typescript:true});export{e as javascript,t as json,r as jsonld,n as typescript};
