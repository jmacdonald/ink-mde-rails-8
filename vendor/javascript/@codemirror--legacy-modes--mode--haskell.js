// @codemirror/legacy-modes/mode/haskell@6.4.2 downloaded from https://ga.jspm.io/npm:@codemirror/legacy-modes@6.4.2/mode/haskell.js

function switchState(e,t,r){t(r);return r(e,t)}var e=/[a-z_]/;var t=/[A-Z]/;var r=/\d/;var n=/[0-9A-Fa-f]/;var a=/[0-7]/;var i=/[a-z_A-Z0-9'\xa1-\uffff]/;var o=/[-!#$%&*+.\/<=>?@\\^|~:]/;var l=/[(),;[\]`{}]/;var u=/[ \t\v\f]/;function normal(s,f){if(s.eatWhile(u))return null;var c=s.next();if(l.test(c)){if(c=="{"&&s.eat("-")){var m="comment";s.eat("#")&&(m="meta");return switchState(s,f,ncomment(m,1))}return null}if(c=="'"){s.eat("\\"),s.next();return s.eat("'")?"string":"error"}if(c=='"')return switchState(s,f,stringLiteral);if(t.test(c)){s.eatWhile(i);return s.eat(".")?"qualifier":"type"}if(e.test(c)){s.eatWhile(i);return"variable"}if(r.test(c)){if(c=="0"){if(s.eat(/[xX]/)){s.eatWhile(n);return"integer"}if(s.eat(/[oO]/)){s.eatWhile(a);return"number"}}s.eatWhile(r);m="number";s.match(/^\.\d+/)&&(m="number");if(s.eat(/[eE]/)){m="number";s.eat(/[-+]/);s.eatWhile(r)}return m}if(c=="."&&s.eat("."))return"keyword";if(o.test(c)){if(c=="-"&&s.eat(/-/)){s.eatWhile(/-/);if(!s.eat(o)){s.skipToEnd();return"comment"}}s.eatWhile(o);return"variable"}return"error"}function ncomment(e,t){return t==0?normal:function(r,n){var a=t;while(!r.eol()){var i=r.next();if(i=="{"&&r.eat("-"))++a;else if(i=="-"&&r.eat("}")){--a;if(a==0){n(normal);return e}}}n(ncomment(e,a));return e}}function stringLiteral(e,t){while(!e.eol()){var r=e.next();if(r=='"'){t(normal);return"string"}if(r=="\\"){if(e.eol()||e.eat(u)){t(stringGap);return"string"}e.eat("&")||e.next()}}t(normal);return"error"}function stringGap(e,t){if(e.eat("\\"))return switchState(e,t,stringLiteral);e.next();t(normal);return"error"}var s=function(){var e={};function setType(t){return function(){for(var r=0;r<arguments.length;r++)e[arguments[r]]=t}}setType("keyword")("case","class","data","default","deriving","do","else","foreign","if","import","in","infix","infixl","infixr","instance","let","module","newtype","of","then","type","where","_");setType("keyword")("..",":","::","=","\\","<-","->","@","~","=>");setType("builtin")("!!","$!","$","&&","+","++","-",".","/","/=","<","<*","<=","<$>","<*>","=<<","==",">",">=",">>",">>=","^","^^","||","*","*>","**");setType("builtin")("Applicative","Bool","Bounded","Char","Double","EQ","Either","Enum","Eq","False","FilePath","Float","Floating","Fractional","Functor","GT","IO","IOError","Int","Integer","Integral","Just","LT","Left","Maybe","Monad","Nothing","Num","Ord","Ordering","Rational","Read","ReadS","Real","RealFloat","RealFrac","Right","Show","ShowS","String","True");setType("builtin")("abs","acos","acosh","all","and","any","appendFile","asTypeOf","asin","asinh","atan","atan2","atanh","break","catch","ceiling","compare","concat","concatMap","const","cos","cosh","curry","cycle","decodeFloat","div","divMod","drop","dropWhile","either","elem","encodeFloat","enumFrom","enumFromThen","enumFromThenTo","enumFromTo","error","even","exp","exponent","fail","filter","flip","floatDigits","floatRadix","floatRange","floor","fmap","foldl","foldl1","foldr","foldr1","fromEnum","fromInteger","fromIntegral","fromRational","fst","gcd","getChar","getContents","getLine","head","id","init","interact","ioError","isDenormalized","isIEEE","isInfinite","isNaN","isNegativeZero","iterate","last","lcm","length","lex","lines","log","logBase","lookup","map","mapM","mapM_","max","maxBound","maximum","maybe","min","minBound","minimum","mod","negate","not","notElem","null","odd","or","otherwise","pi","pred","print","product","properFraction","pure","putChar","putStr","putStrLn","quot","quotRem","read","readFile","readIO","readList","readLn","readParen","reads","readsPrec","realToFrac","recip","rem","repeat","replicate","return","reverse","round","scaleFloat","scanl","scanl1","scanr","scanr1","seq","sequence","sequence_","show","showChar","showList","showParen","showString","shows","showsPrec","significand","signum","sin","sinh","snd","span","splitAt","sqrt","subtract","succ","sum","tail","take","takeWhile","tan","tanh","toEnum","toInteger","toRational","truncate","uncurry","undefined","unlines","until","unwords","unzip","unzip3","userError","words","writeFile","zip","zip3","zipWith","zipWith3");return e}();const f={name:"haskell",startState:function(){return{f:normal}},copyState:function(e){return{f:e.f}},token:function(e,t){var r=t.f(e,(function(e){t.f=e}));var n=e.current();return s.hasOwnProperty(n)?s[n]:r},languageData:{commentTokens:{line:"--",block:{open:"{-",close:"-}"}}}};export{f as haskell};
