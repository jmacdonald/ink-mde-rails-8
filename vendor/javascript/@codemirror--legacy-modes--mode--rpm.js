// @codemirror/legacy-modes/mode/rpm@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/rpm.js

var r=/^-+$/;var e=/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)  ?\d{1,2} \d{2}:\d{2}(:\d{2})? [A-Z]{3,4} \d{4} - /;var t=/^[\w+.-]+@[\w.-]+/;const a={name:"rpmchanges",token:function(a){if(a.sol()){if(a.match(r))return"tag";if(a.match(e))return"tag"}if(a.match(t))return"string";a.next();return null}};var n=/^(i386|i586|i686|x86_64|ppc64le|ppc64|ppc|ia64|s390x|s390|sparc64|sparcv9|sparc|noarch|alphaev6|alpha|hppa|mipsel)/;var c=/^[a-zA-Z0-9()]+:/;var o=/^%(debug_package|package|description|prep|build|install|files|clean|changelog|preinstall|preun|postinstall|postun|pretrans|posttrans|pre|post|triggerin|triggerun|verifyscript|check|triggerpostun|triggerprein|trigger)/;var i=/^%(ifnarch|ifarch|if)/;var l=/^%(else|endif)/;var u=/^(\!|\?|\<\=|\<|\>\=|\>|\=\=|\&\&|\|\|)/;const s={name:"rpmspec",startState:function(){return{controlFlow:false,macroParameters:false,section:false}},token:function(r,e){var t=r.peek();if(t=="#"){r.skipToEnd();return"comment"}if(r.sol()){if(r.match(c))return"header";if(r.match(o))return"atom"}if(r.match(/^\$\w+/))return"def";if(r.match(/^\$\{\w+\}/))return"def";if(r.match(l))return"keyword";if(r.match(i)){e.controlFlow=true;return"keyword"}if(e.controlFlow){if(r.match(u))return"operator";if(r.match(/^(\d+)/))return"number";r.eol()&&(e.controlFlow=false)}if(r.match(n)){r.eol()&&(e.controlFlow=false);return"number"}if(r.match(/^%[\w]+/)){r.match("(")&&(e.macroParameters=true);return"keyword"}if(e.macroParameters){if(r.match(/^\d+/))return"number";if(r.match(")")){e.macroParameters=false;return"keyword"}}if(r.match(/^%\{\??[\w \-\:\!]+\}/)){r.eol()&&(e.controlFlow=false);return"def"}r.next();return null}};export{a as rpmChanges,s as rpmSpec};
