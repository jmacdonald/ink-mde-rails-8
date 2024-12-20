// @codemirror/legacy-modes/mode/tcl@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/tcl.js

function parseWords(e){var r={},t=e.split(" ");for(var n=0;n<t.length;++n)r[t[n]]=true;return r}var e=parseWords("Tcl safe after append array auto_execok auto_import auto_load auto_mkindex auto_mkindex_old auto_qualify auto_reset bgerror binary break catch cd close concat continue dde eof encoding error eval exec exit expr fblocked fconfigure fcopy file fileevent filename filename flush for foreach format gets glob global history http if incr info interp join lappend lindex linsert list llength load lrange lreplace lsearch lset lsort memory msgcat namespace open package parray pid pkg::create pkg_mkIndex proc puts pwd re_syntax read regex regexp registry regsub rename resource return scan seek set socket source split string subst switch tcl_endOfWord tcl_findLibrary tcl_startOfNextWord tcl_wordBreakAfter tcl_startOfPreviousWord tcl_wordBreakBefore tcltest tclvars tell time trace unknown unset update uplevel upvar variable vwait");var r=parseWords("if elseif else and not or eq ne in ni for foreach while switch");var t=/[+\-*&%=<>!?^\/\|]/;function chain(e,r,t){r.tokenize=t;return t(e,r)}function tokenBase(n,a){var o=a.beforeParams;a.beforeParams=false;var i=n.next();if(i!='"'&&i!="'"||!a.inParams){if(/[\[\]{}\(\),;\.]/.test(i)){i=="("&&o?a.inParams=true:i==")"&&(a.inParams=false);return null}if(/\d/.test(i)){n.eatWhile(/[\w\.]/);return"number"}if(i=="#"){if(n.eat("*"))return chain(n,a,tokenComment);if(i=="#"&&n.match(/ *\[ *\[/))return chain(n,a,tokenUnparsed);n.skipToEnd();return"comment"}if(i=='"'){n.skipTo(/"/);return"comment"}if(i=="$"){n.eatWhile(/[$_a-z0-9A-Z\.{:]/);n.eatWhile(/}/);a.beforeParams=true;return"builtin"}if(t.test(i)){n.eatWhile(t);return"comment"}n.eatWhile(/[\w\$_{}\xa1-\uffff]/);var s=n.current().toLowerCase();if(e&&e.propertyIsEnumerable(s))return"keyword";if(r&&r.propertyIsEnumerable(s)){a.beforeParams=true;return"keyword"}return null}return chain(n,a,tokenString(i))}function tokenString(e){return function(r,t){var n,a=false,o=false;while((n=r.next())!=null){if(n==e&&!a){o=true;break}a=!a&&n=="\\"}o&&(t.tokenize=tokenBase);return"string"}}function tokenComment(e,r){var t,n=false;while(t=e.next()){if(t=="#"&&n){r.tokenize=tokenBase;break}n=t=="*"}return"comment"}function tokenUnparsed(e,r){var t,n=0;while(t=e.next()){if(t=="#"&&n==2){r.tokenize=tokenBase;break}t=="]"?n++:t!=" "&&(n=0)}return"meta"}const n={name:"tcl",startState:function(){return{tokenize:tokenBase,beforeParams:false,inParams:false}},token:function(e,r){return e.eatSpace()?null:r.tokenize(e,r)},languageData:{commentTokens:{line:"#"}}};export{n as tcl};

