// solid-js/web@1.9.3 downloaded from https://ga.jspm.io/npm:solid-js@1.9.3/web/dist/web.js

import{createRoot as e,untrack as t,createRenderEffect as n,sharedConfig as r,enableHydration as o,getOwner as i,createEffect as s,runWithOwner as a,createMemo as l,createSignal as c,onCleanup as d,splitProps as u}from"solid-js";export{ErrorBoundary,For,Index,Match,Show,Suspense,SuspenseList,Switch,createComponent,createRenderEffect as effect,getOwner,createMemo as memo,mergeProps,untrack}from"solid-js";const f=["allowfullscreen","async","autofocus","autoplay","checked","controls","default","disabled","formnovalidate","hidden","indeterminate","inert","ismap","loop","multiple","muted","nomodule","novalidate","open","playsinline","readonly","required","reversed","seamless","selected"];const p=new Set(["className","value","readOnly","formNoValidate","isMap","noModule","playsInline",...f]);const m=new Set(["innerHTML","textContent","innerText","children"]);const g=Object.assign(Object.create(null),{className:"class",htmlFor:"for"});const h=Object.assign(Object.create(null),{class:"className",formnovalidate:{$:"formNoValidate",BUTTON:1,INPUT:1},ismap:{$:"isMap",IMG:1},nomodule:{$:"noModule",SCRIPT:1},playsinline:{$:"playsInline",VIDEO:1},readonly:{$:"readOnly",INPUT:1,TEXTAREA:1}});function getPropAlias(e,t){const n=h[e];return typeof n==="object"?n[t]?n.$:void 0:n}const y=new Set(["beforeinput","click","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"]);const b=new Set(["altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","svg","switch","symbol","text","textPath","tref","tspan","use","view","vkern"]);const v={xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"};const w=new Set(["html","base","head","link","meta","style","title","body","address","article","aside","footer","header","main","nav","section","body","blockquote","dd","div","dl","dt","figcaption","figure","hr","li","ol","p","pre","ul","a","abbr","b","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","area","audio","img","map","track","video","embed","iframe","object","param","picture","portal","source","svg","math","canvas","noscript","script","del","ins","caption","col","colgroup","table","tbody","td","tfoot","th","thead","tr","button","datalist","fieldset","form","input","label","legend","meter","optgroup","option","output","progress","select","textarea","details","dialog","menu","summary","details","slot","template","acronym","applet","basefont","bgsound","big","blink","center","content","dir","font","frame","frameset","hgroup","image","keygen","marquee","menuitem","nobr","noembed","noframes","plaintext","rb","rtc","shadow","spacer","strike","tt","xmp","a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","bgsound","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","head","header","hgroup","hr","html","i","iframe","image","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","nobr","noembed","noframes","noscript","object","ol","optgroup","option","output","p","param","picture","plaintext","portal","pre","progress","q","rb","rp","rt","rtc","ruby","s","samp","script","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr","xmp","input","h1","h2","h3","h4","h5","h6"]);function reconcileArrays(e,t,n){let r=n.length,o=t.length,i=r,s=0,a=0,l=t[o-1].nextSibling,c=null;while(s<o||a<i)if(t[s]!==n[a]){while(t[o-1]===n[i-1]){o--;i--}if(o===s){const t=i<r?a?n[a-1].nextSibling:n[i-a]:l;while(a<i)e.insertBefore(n[a++],t)}else if(i===a)while(s<o){c&&c.has(t[s])||t[s].remove();s++}else if(t[s]===n[i-1]&&n[a]===t[o-1]){const r=t[--o].nextSibling;e.insertBefore(n[a++],t[s++].nextSibling);e.insertBefore(n[--i],r);t[o]=n[i]}else{if(!c){c=new Map;let e=a;while(e<i)c.set(n[e],e++)}const r=c.get(t[s]);if(r!=null)if(a<r&&r<i){let l,d=s,u=1;while(++d<o&&d<i){if((l=c.get(t[d]))==null||l!==r+u)break;u++}if(u>r-a){const o=t[s];while(a<r)e.insertBefore(n[a++],o)}else e.replaceChild(n[a++],t[s++])}else s++;else t[s++].remove()}}else{s++;a++}}const x="_$DX_DELEGATE";function render(t,n,r,o={}){let i;e((e=>{i=e;n===document?t():insert(n,t(),n.firstChild?null:void 0,r)}),o.owner);return()=>{i();n.textContent=""}}function template(e,n,r){let o;const create=()=>{const t=document.createElement("template");t.innerHTML=e;return r?t.content.firstChild.firstChild:t.content.firstChild};const i=n?()=>t((()=>document.importNode(o||(o=create()),true))):()=>(o||(o=create())).cloneNode(true);i.cloneNode=i;return i}function delegateEvents(e,t=window.document){const n=t[x]||(t[x]=new Set);for(let r=0,o=e.length;r<o;r++){const o=e[r];if(!n.has(o)){n.add(o);t.addEventListener(o,eventHandler)}}}function clearDelegatedEvents(e=window.document){if(e[x]){for(let t of e[x].keys())e.removeEventListener(t,eventHandler);delete e[x]}}function setProperty(e,t,n){isHydrating(e)||(e[t]=n)}function setAttribute(e,t,n){isHydrating(e)||(n==null?e.removeAttribute(t):e.setAttribute(t,n))}function setAttributeNS(e,t,n,r){isHydrating(e)||(r==null?e.removeAttributeNS(t,n):e.setAttributeNS(t,n,r))}function setBoolAttribute(e,t,n){isHydrating(e)||(n?e.setAttribute(t,""):e.removeAttribute(t))}function className(e,t){isHydrating(e)||(t==null?e.removeAttribute("class"):e.className=t)}function addEventListener(e,t,n,r){if(r)if(Array.isArray(n)){e[`$$${t}`]=n[0];e[`$$${t}Data`]=n[1]}else e[`$$${t}`]=n;else if(Array.isArray(n)){const r=n[0];e.addEventListener(t,n[0]=t=>r.call(e,n[1],t))}else e.addEventListener(t,n,typeof n!=="function"&&n)}function classList(e,t,n={}){const r=Object.keys(t||{}),o=Object.keys(n);let i,s;for(i=0,s=o.length;i<s;i++){const r=o[i];if(r&&r!=="undefined"&&!t[r]){toggleClassKey(e,r,false);delete n[r]}}for(i=0,s=r.length;i<s;i++){const o=r[i],s=!!t[o];if(o&&o!=="undefined"&&n[o]!==s&&s){toggleClassKey(e,o,true);n[o]=s}}return n}function style(e,t,n){if(!t)return n?setAttribute(e,"style"):t;const r=e.style;if(typeof t==="string")return r.cssText=t;typeof n==="string"&&(r.cssText=n=void 0);n||(n={});t||(t={});let o,i;for(i in n){t[i]==null&&r.removeProperty(i);delete n[i]}for(i in t){o=t[i];if(o!==n[i]){r.setProperty(i,o);n[i]=o}}return n}function spread(e,t={},r,o){const i={};o||n((()=>i.children=insertExpression(e,t.children,i.children)));n((()=>typeof t.ref==="function"&&use(t.ref,e)));n((()=>assign(e,t,r,true,i,true)));return i}function dynamicProperty(e,t){const n=e[t];Object.defineProperty(e,t,{get(){return n()},enumerable:true});return e}function use(e,n,r){return t((()=>e(n,r)))}function insert(e,t,r,o){r===void 0||o||(o=[]);if(typeof t!=="function")return insertExpression(e,t,o,r);n((n=>insertExpression(e,t(),n,r)),o)}function assign(e,t,n,r,o={},i=false){t||(t={});for(const r in o)if(!(r in t)){if(r==="children")continue;o[r]=assignProp(e,r,null,o[r],n,i,t)}for(const s in t){if(s==="children"){r||insertExpression(e,t.children);continue}const a=t[s];o[s]=assignProp(e,s,a,o[s],n,i,t)}}function hydrate$1(e,t,n={}){if(globalThis._$HY.done)return render(e,t,[...t.childNodes],n);r.completed=globalThis._$HY.completed;r.events=globalThis._$HY.events;r.load=e=>globalThis._$HY.r[e];r.has=e=>e in globalThis._$HY.r;r.gather=e=>gatherHydratable(t,e);r.registry=new Map;r.context={id:n.renderId||"",count:0};try{gatherHydratable(t,n.renderId);return render(e,t,[...t.childNodes],n)}finally{r.context=null}}function getNextElement(e){let t,n,o=isHydrating();if(!o||!(t=r.registry.get(n=getHydrationKey())))return e();r.completed&&r.completed.add(t);r.registry.delete(n);return t}function getNextMatch(e,t){while(e&&e.localName!==t)e=e.nextSibling;return e}function getNextMarker(e){let t=e,n=0,r=[];if(isHydrating(e))while(t){if(t.nodeType===8){const e=t.nodeValue;if(e==="$")n++;else if(e==="/"){if(n===0)return[t,r];n--}}r.push(t);t=t.nextSibling}return[t,r]}function runHydrationEvents(){if(r.events&&!r.events.queued){queueMicrotask((()=>{const{completed:e,events:t}=r;if(t){t.queued=false;while(t.length){const[n,r]=t[0];if(!e.has(n))return;t.shift();eventHandler(r)}if(r.done){r.events=_$HY.events=null;r.completed=_$HY.completed=null}}}));r.events.queued=true}}function isHydrating(e){return!!r.context&&!r.done&&(!e||e.isConnected)}function toPropertyName(e){return e.toLowerCase().replace(/-([a-z])/g,((e,t)=>t.toUpperCase()))}function toggleClassKey(e,t,n){const r=t.trim().split(/\s+/);for(let t=0,o=r.length;t<o;t++)e.classList.toggle(r[t],n)}function assignProp(e,t,n,r,o,i,s){let a,l,c,d,u;if(t==="style")return style(e,n,r);if(t==="classList")return classList(e,n,r);if(n===r)return r;if(t==="ref")i||n(e);else if(t.slice(0,3)==="on:"){const o=t.slice(3);r&&e.removeEventListener(o,r,typeof r!=="function"&&r);n&&e.addEventListener(o,n,typeof n!=="function"&&n)}else if(t.slice(0,10)==="oncapture:"){const o=t.slice(10);r&&e.removeEventListener(o,r,true);n&&e.addEventListener(o,n,true)}else if(t.slice(0,2)==="on"){const o=t.slice(2).toLowerCase();const i=y.has(o);if(!i&&r){const t=Array.isArray(r)?r[0]:r;e.removeEventListener(o,t)}if(i||n){addEventListener(e,o,n,i);i&&delegateEvents([o])}}else if(t.slice(0,5)==="attr:")setAttribute(e,t.slice(5),n);else if(t.slice(0,5)==="bool:")setBoolAttribute(e,t.slice(5),n);else if((u=t.slice(0,5)==="prop:")||(c=m.has(t))||!o&&((d=getPropAlias(t,e.tagName))||(l=p.has(t)))||(a=e.nodeName.includes("-")||"is"in s)){if(u){t=t.slice(5);l=true}else if(isHydrating(e))return n;t==="class"||t==="className"?className(e,n):!a||l||c?e[d||t]=n:e[toPropertyName(t)]=n}else{const r=o&&t.indexOf(":")>-1&&v[t.split(":")[0]];r?setAttributeNS(e,r,t,n):setAttribute(e,g[t]||t,n)}return n}function eventHandler(e){if(r.registry&&r.events&&r.events.find((([t,n])=>n===e)))return;let t=e.target;const n=`$$${e.type}`;const o=e.target;const i=e.currentTarget;const retarget=t=>Object.defineProperty(e,"target",{configurable:true,value:t});const handleNode=()=>{const r=t[n];if(r&&!t.disabled){const o=t[`${n}Data`];o!==void 0?r.call(t,o,e):r.call(t,e);if(e.cancelBubble)return}t.host&&typeof t.host!=="string"&&!t.host._$host&&t.contains(e.target)&&retarget(t.host);return true};const walkUpTree=()=>{while(handleNode()&&(t=t._$host||t.parentNode||t.host));};Object.defineProperty(e,"currentTarget",{configurable:true,get(){return t||document}});r.registry&&!r.done&&(r.done=_$HY.done=true);if(e.composedPath){const n=e.composedPath();retarget(n[0]);for(let e=0;e<n.length-2;e++){t=n[e];if(!handleNode())break;if(t._$host){t=t._$host;walkUpTree();break}if(t.parentNode===i)break}}else walkUpTree();retarget(o)}function insertExpression(e,t,r,o,i){const s=isHydrating(e);if(s){!r&&(r=[...e.childNodes]);let t=[];for(let e=0;e<r.length;e++){const n=r[e];n.nodeType===8&&n.data.slice(0,2)==="!$"?n.remove():t.push(n)}r=t}while(typeof r==="function")r=r();if(t===r)return r;const a=typeof t,l=o!==void 0;e=l&&r[0]&&r[0].parentNode||e;if(a==="string"||a==="number"){if(s)return r;if(a==="number"){t=t.toString();if(t===r)return r}if(l){let n=r[0];n&&n.nodeType===3?n.data!==t&&(n.data=t):n=document.createTextNode(t);r=cleanChildren(e,r,o,n)}else r=r!==""&&typeof r==="string"?e.firstChild.data=t:e.textContent=t}else if(t==null||a==="boolean"){if(s)return r;r=cleanChildren(e,r,o)}else{if(a==="function"){n((()=>{let n=t();while(typeof n==="function")n=n();r=insertExpression(e,n,r,o)}));return()=>r}if(Array.isArray(t)){const a=[];const c=r&&Array.isArray(r);if(normalizeIncomingArray(a,t,r,i)){n((()=>r=insertExpression(e,a,r,o,true)));return()=>r}if(s){if(!a.length)return r;if(o===void 0)return r=[...e.childNodes];let t=a[0];if(t.parentNode!==e)return r;const n=[t];while((t=t.nextSibling)!==o)n.push(t);return r=n}if(a.length===0){r=cleanChildren(e,r,o);if(l)return r}else if(c)r.length===0?appendNodes(e,a,o):reconcileArrays(e,r,a);else{r&&cleanChildren(e);appendNodes(e,a)}r=a}else if(t.nodeType){if(s&&t.parentNode)return r=l?[t]:t;if(Array.isArray(r)){if(l)return r=cleanChildren(e,r,o,t);cleanChildren(e,r,null,t)}else r!=null&&r!==""&&e.firstChild?e.replaceChild(t,e.firstChild):e.appendChild(t);r=t}}return r}function normalizeIncomingArray(e,t,n,r){let o=false;for(let i=0,s=t.length;i<s;i++){let s,a=t[i],l=n&&n[e.length];if(a==null||a===true||a===false);else if((s=typeof a)==="object"&&a.nodeType)e.push(a);else if(Array.isArray(a))o=normalizeIncomingArray(e,a,l)||o;else if(s==="function")if(r){while(typeof a==="function")a=a();o=normalizeIncomingArray(e,Array.isArray(a)?a:[a],Array.isArray(l)?l:[l])||o}else{e.push(a);o=true}else{const t=String(a);l&&l.nodeType===3&&l.data===t?e.push(l):e.push(document.createTextNode(t))}}return o}function appendNodes(e,t,n=null){for(let r=0,o=t.length;r<o;r++)e.insertBefore(t[r],n)}function cleanChildren(e,t,n,r){if(n===void 0)return e.textContent="";const o=r||document.createTextNode("");if(t.length){let r=false;for(let i=t.length-1;i>=0;i--){const s=t[i];if(o!==s){const t=s.parentNode===e;r||i?t&&s.remove():t?e.replaceChild(o,s):e.insertBefore(o,n)}else r=true}}else e.insertBefore(o,n);return[o]}function gatherHydratable(e,t){const n=e.querySelectorAll("*[data-hk]");for(let e=0;e<n.length;e++){const o=n[e];const i=o.getAttribute("data-hk");t&&!i.startsWith(t)||r.registry.has(i)||r.registry.set(i,o)}}function getHydrationKey(){return r.getNextContextId()}function NoHydration(e){return r.context?void 0:e.children}function Hydration(e){return e.children}const voidFn=()=>{};const A=Symbol();function innerHTML(e,t){!r.context&&(e.innerHTML=t)}function throwInBrowser(e){const t=new Error(`${e.name} is not supported in the browser, returning undefined`);console.error(t)}function renderToString(e,t){throwInBrowser(renderToString)}function renderToStringAsync(e,t){throwInBrowser(renderToStringAsync)}function renderToStream(e,t){throwInBrowser(renderToStream)}function ssr(e,...t){}function ssrElement(e,t,n,r){}function ssrClassList(e){}function ssrStyle(e){}function ssrAttribute(e,t){}function ssrHydrationKey(){}function resolveSSRNode(e){}function escape(e){}function ssrSpread(e,t,n){}const N=false;const S=false;const E="http://www.w3.org/2000/svg";function createElement(e,t=false){return t?document.createElementNS(E,e):document.createElement(e)}const hydrate=(...e)=>{o();return hydrate$1(...e)};function Portal(t){const{useShadow:n}=t,o=document.createTextNode(""),mount=()=>t.mount||document.body,u=i();let f;let p=!!r.context;s((()=>{p&&(i().user=p=false);f||(f=a(u,(()=>l((()=>t.children)))));const r=mount();if(r instanceof HTMLHeadElement){const[t,n]=c(false);const cleanup=()=>n(true);e((e=>insert(r,(()=>t()?e():f()),null)));d(cleanup)}else{const e=createElement(t.isSVG?"g":"div",t.isSVG),i=n&&e.attachShadow?e.attachShadow({mode:"open"}):e;Object.defineProperty(e,"_$host",{get(){return o.parentNode},configurable:true});insert(i,f);r.appendChild(e);t.ref&&t.ref(e);d((()=>r.removeChild(e)))}}),void 0,{render:!p});return o}function Dynamic(e){const[n,o]=u(e,["component"]);const i=l((()=>n.component));return l((()=>{const e=i();switch(typeof e){case"function":return t((()=>e(o)));case"string":const n=b.has(e);const i=r.context?getNextElement():createElement(e,n);spread(i,o,n);return i}}))}export{g as Aliases,voidFn as Assets,m as ChildProperties,w as DOMElements,y as DelegatedEvents,Dynamic,Hydration,voidFn as HydrationScript,NoHydration,Portal,p as Properties,A as RequestContext,b as SVGElements,v as SVGNamespace,addEventListener,assign,classList,className,clearDelegatedEvents,delegateEvents,dynamicProperty,escape,voidFn as generateHydrationScript,voidFn as getAssets,getHydrationKey,getNextElement,getNextMarker,getNextMatch,getPropAlias,voidFn as getRequestEvent,hydrate,innerHTML,insert,S as isDev,N as isServer,render,renderToStream,renderToString,renderToStringAsync,resolveSSRNode,runHydrationEvents,setAttribute,setAttributeNS,setBoolAttribute,setProperty,spread,ssr,ssrAttribute,ssrClassList,ssrElement,ssrHydrationKey,ssrSpread,ssrStyle,style,template,use,voidFn as useAssets};

