// @codemirror/legacy-modes/mode/mllike@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/mllike.js

function mlLike(e){var r={as:"keyword",do:"keyword",else:"keyword",end:"keyword",exception:"keyword",fun:"keyword",functor:"keyword",if:"keyword",in:"keyword",include:"keyword",let:"keyword",of:"keyword",open:"keyword",rec:"keyword",struct:"keyword",then:"keyword",type:"keyword",val:"keyword",while:"keyword",with:"keyword"};var o=e.extraWords||{};for(var t in o)o.hasOwnProperty(t)&&(r[t]=e.extraWords[t]);var n=[];for(var i in r)n.push(i);function tokenBase(o,t){var n=o.next();if(n==='"'){t.tokenize=tokenString;return t.tokenize(o,t)}if(n==="{"&&o.eat("|")){t.longString=true;t.tokenize=tokenLongString;return t.tokenize(o,t)}if(n==="("&&o.match(/^\*(?!\))/)){t.commentLevel++;t.tokenize=tokenComment;return t.tokenize(o,t)}if(n==="~"||n==="?"){o.eatWhile(/\w/);return"variableName.special"}if(n==="`"){o.eatWhile(/\w/);return"quote"}if(n==="/"&&e.slashComments&&o.eat("/")){o.skipToEnd();return"comment"}if(/\d/.test(n)){n==="0"&&o.eat(/[bB]/)&&o.eatWhile(/[01]/);n==="0"&&o.eat(/[xX]/)&&o.eatWhile(/[0-9a-fA-F]/);if(n==="0"&&o.eat(/[oO]/))o.eatWhile(/[0-7]/);else{o.eatWhile(/[\d_]/);o.eat(".")&&o.eatWhile(/[\d]/);o.eat(/[eE]/)&&o.eatWhile(/[\d\-+]/)}return"number"}if(/[+\-*&%=<>!?|@\.~:]/.test(n))return"operator";if(/[\w\xa1-\uffff]/.test(n)){o.eatWhile(/[\w\xa1-\uffff]/);var i=o.current();return r.hasOwnProperty(i)?r[i]:"variable"}return null}function tokenString(e,r){var o,t=false,n=false;while((o=e.next())!=null){if(o==='"'&&!n){t=true;break}n=!n&&o==="\\"}t&&!n&&(r.tokenize=tokenBase);return"string"}function tokenComment(e,r){var o,t;while(r.commentLevel>0&&(t=e.next())!=null){o==="("&&t==="*"&&r.commentLevel++;o==="*"&&t===")"&&r.commentLevel--;o=t}r.commentLevel<=0&&(r.tokenize=tokenBase);return"comment"}function tokenLongString(e,r){var o,t;while(r.longString&&(t=e.next())!=null){o==="|"&&t==="}"&&(r.longString=false);o=t}r.longString||(r.tokenize=tokenBase);return"string"}return{startState:function(){return{tokenize:tokenBase,commentLevel:0,longString:false}},token:function(e,r){return e.eatSpace()?null:r.tokenize(e,r)},languageData:{autocomplete:n,commentTokens:{line:e.slashComments?"//":void 0,block:{open:"(*",close:"*)"}}}}}const e=mlLike({name:"ocaml",extraWords:{and:"keyword",assert:"keyword",begin:"keyword",class:"keyword",constraint:"keyword",done:"keyword",downto:"keyword",external:"keyword",function:"keyword",initializer:"keyword",lazy:"keyword",match:"keyword",method:"keyword",module:"keyword",mutable:"keyword",new:"keyword",nonrec:"keyword",object:"keyword",private:"keyword",sig:"keyword",to:"keyword",try:"keyword",value:"keyword",virtual:"keyword",when:"keyword",raise:"builtin",failwith:"builtin",true:"builtin",false:"builtin",asr:"builtin",land:"builtin",lor:"builtin",lsl:"builtin",lsr:"builtin",lxor:"builtin",mod:"builtin",or:"builtin",raise_notrace:"builtin",trace:"builtin",exit:"builtin",print_string:"builtin",print_endline:"builtin",int:"type",float:"type",bool:"type",char:"type",string:"type",unit:"type",List:"builtin"}});const r=mlLike({name:"fsharp",extraWords:{abstract:"keyword",assert:"keyword",base:"keyword",begin:"keyword",class:"keyword",default:"keyword",delegate:"keyword","do!":"keyword",done:"keyword",downcast:"keyword",downto:"keyword",elif:"keyword",extern:"keyword",finally:"keyword",for:"keyword",function:"keyword",global:"keyword",inherit:"keyword",inline:"keyword",interface:"keyword",internal:"keyword",lazy:"keyword","let!":"keyword",match:"keyword",member:"keyword",module:"keyword",mutable:"keyword",namespace:"keyword",new:"keyword",null:"keyword",override:"keyword",private:"keyword",public:"keyword","return!":"keyword",return:"keyword",select:"keyword",static:"keyword",to:"keyword",try:"keyword",upcast:"keyword","use!":"keyword",use:"keyword",void:"keyword",when:"keyword","yield!":"keyword",yield:"keyword",atomic:"keyword",break:"keyword",checked:"keyword",component:"keyword",const:"keyword",constraint:"keyword",constructor:"keyword",continue:"keyword",eager:"keyword",event:"keyword",external:"keyword",fixed:"keyword",method:"keyword",mixin:"keyword",object:"keyword",parallel:"keyword",process:"keyword",protected:"keyword",pure:"keyword",sealed:"keyword",tailcall:"keyword",trait:"keyword",virtual:"keyword",volatile:"keyword",List:"builtin",Seq:"builtin",Map:"builtin",Set:"builtin",Option:"builtin",int:"builtin",string:"builtin",not:"builtin",true:"builtin",false:"builtin",raise:"builtin",failwith:"builtin"},slashComments:true});const o=mlLike({name:"sml",extraWords:{abstype:"keyword",and:"keyword",andalso:"keyword",case:"keyword",datatype:"keyword",fn:"keyword",handle:"keyword",infix:"keyword",infixr:"keyword",local:"keyword",nonfix:"keyword",op:"keyword",orelse:"keyword",raise:"keyword",withtype:"keyword",eqtype:"keyword",sharing:"keyword",sig:"keyword",signature:"keyword",structure:"keyword",where:"keyword",true:"keyword",false:"keyword",int:"builtin",real:"builtin",string:"builtin",char:"builtin",bool:"builtin"},slashComments:true});export{r as fSharp,e as oCaml,o as sml};

