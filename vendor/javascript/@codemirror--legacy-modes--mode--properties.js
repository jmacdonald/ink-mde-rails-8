// @codemirror/legacy-modes/mode/properties@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/properties.js

const e={name:"properties",token:function(e,t){var i=e.sol()||t.afterSection;var n=e.eol();t.afterSection=false;if(i)if(t.nextMultiline){t.inMultiline=true;t.nextMultiline=false}else t.position="def";if(n&&!t.nextMultiline){t.inMultiline=false;t.position="def"}if(i)while(e.eatSpace());var o=e.next();if(i&&(o==="#"||o==="!"||o===";")){t.position="comment";e.skipToEnd();return"comment"}if(i&&o==="["){t.afterSection=true;e.skipTo("]");e.eat("]");return"header"}if(o==="="||o===":"){t.position="quote";return null}o==="\\"&&t.position==="quote"&&e.eol()&&(t.nextMultiline=true);return t.position},startState:function(){return{position:"def",nextMultiline:false,inMultiline:false,afterSection:false}}};export{e as properties};

