// @codemirror/legacy-modes/mode/elm@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/elm.js

function switchState(t,e,r){e(r);return r(t,e)}var t=/[a-z]/;var e=/[A-Z]/;var r=/[a-zA-Z0-9_]/;var n=/[0-9]/;var i=/[0-9A-Fa-f]/;var a=/[-&*+.\\/<>=?^|:]/;var o=/[(),[\]{}]/;var l=/[ \v\f]/;function normal(){return function(u,f){if(u.eatWhile(l))return null;var m=u.next();if(o.test(m))return m==="{"&&u.eat("-")?switchState(u,f,chompMultiComment(1)):m==="["&&u.match("glsl|")?switchState(u,f,chompGlsl):"builtin";if(m==="'")return switchState(u,f,chompChar);if(m==='"')return u.eat('"')?u.eat('"')?switchState(u,f,chompMultiString):"string":switchState(u,f,chompSingleString);if(e.test(m)){u.eatWhile(r);return"type"}if(t.test(m)){var s=u.pos===1;u.eatWhile(r);return s?"def":"variable"}if(n.test(m)){if(m==="0"){if(u.eat(/[xX]/)){u.eatWhile(i);return"number"}}else u.eatWhile(n);u.eat(".")&&u.eatWhile(n);if(u.eat(/[eE]/)){u.eat(/[-+]/);u.eatWhile(n)}return"number"}if(a.test(m)){if(m==="-"&&u.eat("-")){u.skipToEnd();return"comment"}u.eatWhile(a);return"keyword"}return m==="_"?"keyword":"error"}}function chompMultiComment(t){return t==0?normal():function(e,r){while(!e.eol()){var n=e.next();if(n=="{"&&e.eat("-"))++t;else if(n=="-"&&e.eat("}")){--t;if(t===0){r(normal());return"comment"}}}r(chompMultiComment(t));return"comment"}}function chompMultiString(t,e){while(!t.eol()){var r=t.next();if(r==='"'&&t.eat('"')&&t.eat('"')){e(normal());return"string"}}return"string"}function chompSingleString(t,e){while(t.skipTo('\\"')){t.next();t.next()}if(t.skipTo('"')){t.next();e(normal());return"string"}t.skipToEnd();e(normal());return"error"}function chompChar(t,e){while(t.skipTo("\\'")){t.next();t.next()}if(t.skipTo("'")){t.next();e(normal());return"string"}t.skipToEnd();e(normal());return"error"}function chompGlsl(t,e){while(!t.eol()){var r=t.next();if(r==="|"&&t.eat("]")){e(normal());return"string"}}return"string"}var u={case:1,of:1,as:1,if:1,then:1,else:1,let:1,in:1,type:1,alias:1,module:1,where:1,import:1,exposing:1,port:1};const f={name:"elm",startState:function(){return{f:normal()}},copyState:function(t){return{f:t.f}},token:function(t,e){var r=e.f(t,(function(t){e.f=t}));var n=t.current();return u.hasOwnProperty(n)?"keyword":r},languageData:{commentTokens:{line:"--"}}};export{f as elm};
