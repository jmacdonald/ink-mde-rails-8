// @codemirror/legacy-modes/mode/fcl@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/fcl.js

var e={term:true,method:true,accu:true,rule:true,then:true,is:true,and:true,or:true,if:true,default:true};var t={var_input:true,var_output:true,fuzzify:true,defuzzify:true,function_block:true,ruleblock:true};var n={end_ruleblock:true,end_defuzzify:true,end_function_block:true,end_fuzzify:true,end_var:true};var r={true:true,false:true,nan:true,real:true,min:true,max:true,cog:true,cogs:true};var u=/[+\-*&^%:=<>!|\/]/;function tokenBase(o,a){var i=o.next();if(/[\d\.]/.test(i)){i=="."?o.match(/^[0-9]+([eE][\-+]?[0-9]+)?/):i=="0"?o.match(/^[xX][0-9a-fA-F]+/)||o.match(/^0[0-7]+/):o.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/);return"number"}if(i=="/"||i=="("){if(o.eat("*")){a.tokenize=tokenComment;return tokenComment(o,a)}if(o.eat("/")){o.skipToEnd();return"comment"}}if(u.test(i)){o.eatWhile(u);return"operator"}o.eatWhile(/[\w\$_\xa1-\uffff]/);var l=o.current().toLowerCase();return e.propertyIsEnumerable(l)||t.propertyIsEnumerable(l)||n.propertyIsEnumerable(l)?"keyword":r.propertyIsEnumerable(l)?"atom":"variable"}function tokenComment(e,t){var n,r=false;while(n=e.next()){if((n=="/"||n==")")&&r){t.tokenize=tokenBase;break}r=n=="*"}return"comment"}function Context(e,t,n,r,u){this.indented=e;this.column=t;this.type=n;this.align=r;this.prev=u}function pushContext(e,t,n){return e.context=new Context(e.indented,t,n,null,e.context)}function popContext(e){if(e.context.prev){var t=e.context.type;t=="end_block"&&(e.indented=e.context.indented);return e.context=e.context.prev}}const o={name:"fcl",startState:function(e){return{tokenize:null,context:new Context(-e,0,"top",false),indented:0,startOfLine:true}},token:function(e,r){var u=r.context;if(e.sol()){u.align==null&&(u.align=false);r.indented=e.indentation();r.startOfLine=true}if(e.eatSpace())return null;var o=(r.tokenize||tokenBase)(e,r);if(o=="comment")return o;u.align==null&&(u.align=true);var a=e.current().toLowerCase();t.propertyIsEnumerable(a)?pushContext(r,e.column(),"end_block"):n.propertyIsEnumerable(a)&&popContext(r);r.startOfLine=false;return o},indent:function(e,t,r){if(e.tokenize!=tokenBase&&e.tokenize!=null)return 0;var u=e.context;var o=n.propertyIsEnumerable(t);return u.align?u.column+(o?0:1):u.indented+(o?0:r.unit)},languageData:{commentTokens:{line:"//",block:{open:"(*",close:"*)"}}}};export{o as fcl};

