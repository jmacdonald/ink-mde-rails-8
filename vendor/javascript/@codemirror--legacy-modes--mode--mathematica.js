// @codemirror/legacy-modes/mode/mathematica@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/mathematica.js

var e="[a-zA-Z\\$][a-zA-Z0-9\\$]*";var a="(?:\\d+)";var t="(?:\\.\\d+|\\d+\\.\\d*|\\d+)";var r="(?:\\.\\w+|\\w+\\.\\w*|\\w+)";var n="(?:`(?:`?"+t+")?)";var u=new RegExp("(?:"+a+"(?:\\^\\^"+r+n+"?(?:\\*\\^[+-]?\\d+)?))");var i=new RegExp("(?:"+t+n+"?(?:\\*\\^[+-]?\\d+)?)");var m=new RegExp("(?:`?)(?:"+e+")(?:`(?:"+e+"))*(?:`?)");function tokenBase(e,a){var t;t=e.next();if(t==='"'){a.tokenize=tokenString;return a.tokenize(e,a)}if(t==="("&&e.eat("*")){a.commentLevel++;a.tokenize=tokenComment;return a.tokenize(e,a)}e.backUp(1);if(e.match(u,true,false))return"number";if(e.match(i,true,false))return"number";if(e.match(/(?:In|Out)\[[0-9]*\]/,true,false))return"atom";if(e.match(/([a-zA-Z\$][a-zA-Z0-9\$]*(?:`[a-zA-Z0-9\$]+)*::usage)/,true,false))return"meta";if(e.match(/([a-zA-Z\$][a-zA-Z0-9\$]*(?:`[a-zA-Z0-9\$]+)*::[a-zA-Z\$][a-zA-Z0-9\$]*):?/,true,false))return"string.special";if(e.match(/([a-zA-Z\$][a-zA-Z0-9\$]*\s*:)(?:(?:[a-zA-Z\$][a-zA-Z0-9\$]*)|(?:[^:=>~@\^\&\*\)\[\]'\?,\|])).*/,true,false))return"variableName.special";if(e.match(/[a-zA-Z\$][a-zA-Z0-9\$]*_+[a-zA-Z\$][a-zA-Z0-9\$]*/,true,false))return"variableName.special";if(e.match(/[a-zA-Z\$][a-zA-Z0-9\$]*_+/,true,false))return"variableName.special";if(e.match(/_+[a-zA-Z\$][a-zA-Z0-9\$]*/,true,false))return"variableName.special";if(e.match(/\\\[[a-zA-Z\$][a-zA-Z0-9\$]*\]/,true,false))return"character";if(e.match(/(?:\[|\]|{|}|\(|\))/,true,false))return"bracket";if(e.match(/(?:#[a-zA-Z\$][a-zA-Z0-9\$]*|#+[0-9]?)/,true,false))return"variableName.constant";if(e.match(m,true,false))return"keyword";if(e.match(/(?:\\|\+|\-|\*|\/|,|;|\.|:|@|~|=|>|<|&|\||_|`|'|\^|\?|!|%)/,true,false))return"operator";e.next();return"error"}function tokenString(e,a){var t,r=false,n=false;while((t=e.next())!=null){if(t==='"'&&!n){r=true;break}n=!n&&t==="\\"}r&&!n&&(a.tokenize=tokenBase);return"string"}function tokenComment(e,a){var t,r;while(a.commentLevel>0&&(r=e.next())!=null){t==="("&&r==="*"&&a.commentLevel++;t==="*"&&r===")"&&a.commentLevel--;t=r}a.commentLevel<=0&&(a.tokenize=tokenBase);return"comment"}const o={name:"mathematica",startState:function(){return{tokenize:tokenBase,commentLevel:0}},token:function(e,a){return e.eatSpace()?null:a.tokenize(e,a)},languageData:{commentTokens:{block:{open:"(*",close:"*)"}}}};export{o as mathematica};

