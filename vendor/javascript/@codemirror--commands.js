// @codemirror/commands@6.7.1 downloaded from https://ga.jspm.io/npm:@codemirror/commands@6.7.1/dist/index.js

import{Annotation as e,Facet as t,combineConfig as n,StateField as r,Transaction as o,ChangeSet as l,ChangeDesc as s,EditorSelection as a,StateEffect as c,findClusterBreak as i,CharCategory as u,countColumn as f,Text as h}from"@codemirror/state";import{EditorView as d,Direction as m}from"@codemirror/view";import{syntaxTree as p,matchBrackets as g,getIndentUnit as y,IndentContext as v,getIndentation as B,indentString as S,indentUnit as A}from"@codemirror/language";import{NodeProp as k}from"@lezer/common";const toggleComment=e=>{let{state:t}=e,n=t.doc.lineAt(t.selection.main.from),r=getConfig(e.state,n.from);return r.line?w(e):!!r.block&&E(e)};function command(e,t){return({state:n,dispatch:r})=>{if(n.readOnly)return false;let o=e(t,n);if(!o)return false;r(n.update(o));return true}}const w=command(changeLineComment,0);const C=command(changeLineComment,1);const x=command(changeLineComment,2);const M=command(changeBlockComment,0);const L=command(changeBlockComment,1);const D=command(changeBlockComment,2);const E=command(((e,t)=>changeBlockComment(e,t,selectedLineRanges(t))),0);function getConfig(e,t){let n=e.languageDataAt("commentTokens",t);return n.length?n[0]:{}}const b=50;function findBlockComment(e,{open:t,close:n},r,o){let l=e.sliceDoc(r-b,r);let s=e.sliceDoc(o,o+b);let a=/\s*$/.exec(l)[0].length,c=/^\s*/.exec(s)[0].length;let i=l.length-a;if(l.slice(i-t.length,i)==t&&s.slice(c,c+n.length)==n)return{open:{pos:r-a,margin:a&&1},close:{pos:o+c,margin:c&&1}};let u,f;if(o-r<=2*b)u=f=e.sliceDoc(r,o);else{u=e.sliceDoc(r,r+b);f=e.sliceDoc(o-b,o)}let h=/^\s*/.exec(u)[0].length,d=/\s*$/.exec(f)[0].length;let m=f.length-d-n.length;return u.slice(h,h+t.length)==t&&f.slice(m,m+n.length)==n?{open:{pos:r+h+t.length,margin:/\s/.test(u.charAt(h+t.length))?1:0},close:{pos:o-d-n.length,margin:/\s/.test(f.charAt(m-1))?1:0}}:null}function selectedLineRanges(e){let t=[];for(let n of e.selection.ranges){let r=e.doc.lineAt(n.from);let o=n.to<=r.to?r:e.doc.lineAt(n.to);o.from>r.from&&o.from==n.to&&(o=n.to==r.to+1?r:e.doc.lineAt(n.to-1));let l=t.length-1;l>=0&&t[l].to>r.from?t[l].to=o.to:t.push({from:r.from+/^\s*/.exec(r.text)[0].length,to:o.to})}return t}function changeBlockComment(e,t,n=t.selection.ranges){let r=n.map((e=>getConfig(t,e.from).block));if(!r.every((e=>e)))return null;let o=n.map(((e,n)=>findBlockComment(t,r[n],e.from,e.to)));if(e!=2&&!o.every((e=>e)))return{changes:t.changes(n.map(((e,t)=>o[t]?[]:[{from:e.from,insert:r[t].open+" "},{from:e.to,insert:" "+r[t].close}])))};if(e!=1&&o.some((e=>e))){let e=[];for(let t,n=0;n<o.length;n++)if(t=o[n]){let o=r[n],{open:l,close:s}=t;e.push({from:l.pos-o.open.length,to:l.pos+l.margin},{from:s.pos-s.margin,to:s.pos+o.close.length})}return{changes:e}}return null}function changeLineComment(e,t,n=t.selection.ranges){let r=[];let o=-1;for(let{from:e,to:l}of n){let n=r.length,s=1e9;let a=getConfig(t,e).line;if(a){for(let n=e;n<=l;){let c=t.doc.lineAt(n);if(c.from>o&&(e==l||l>c.from)){o=c.from;let e=/^\s*/.exec(c.text)[0].length;let t=e==c.length;let n=c.text.slice(e,e+a.length)==a?e:-1;e<c.text.length&&e<s&&(s=e);r.push({line:c,comment:n,token:a,indent:e,empty:t,single:false})}n=c.to+1}if(s<1e9)for(let e=n;e<r.length;e++)r[e].indent<r[e].line.text.length&&(r[e].indent=s);r.length==n+1&&(r[n].single=true)}}if(e!=2&&r.some((e=>e.comment<0&&(!e.empty||e.single)))){let e=[];for(let{line:t,token:n,indent:o,empty:l,single:s}of r)!s&&l||e.push({from:t.from+o,insert:n+" "});let n=t.changes(e);return{changes:n,selection:t.selection.map(n,1)}}if(e!=1&&r.some((e=>e.comment>=0))){let e=[];for(let{line:t,comment:n,token:o}of r)if(n>=0){let r=t.from+n,l=r+o.length;t.text[l-t.from]==" "&&l++;e.push({from:r,to:l})}return{changes:e}}return null}const O=e.define();const H=e.define();const T=t.define();const I=t.define({combine(e){return n(e,{minDepth:100,newGroupDelay:500,joinToEvent:(e,t)=>t},{minDepth:Math.max,newGroupDelay:Math.min,joinToEvent:(e,t)=>(n,r)=>e(n,r)||t(n,r)})}});const R=r.define({create(){return HistoryState.empty},update(e,t){let n=t.state.facet(I);let r=t.annotation(O);if(r){let o=HistEvent.fromTransaction(t,r.selection),l=r.side;let s=l==0?e.undone:e.done;s=o?updateBranch(s,s.length,n.minDepth,o):addSelection(s,t.startState.selection);return new HistoryState(l==0?r.rest:s,l==0?s:r.rest)}let l=t.annotation(H);l!="full"&&l!="before"||(e=e.isolate());if(t.annotation(o.addToHistory)===false)return t.changes.empty?e:e.addMapping(t.changes.desc);let s=HistEvent.fromTransaction(t);let a=t.annotation(o.time),c=t.annotation(o.userEvent);s?e=e.addChanges(s,a,c,n,t):t.selection&&(e=e.addSelection(t.startState.selection,a,c,n.newGroupDelay));l!="full"&&l!="after"||(e=e.isolate());return e},toJSON(e){return{done:e.done.map((e=>e.toJSON())),undone:e.undone.map((e=>e.toJSON()))}},fromJSON(e){return new HistoryState(e.done.map(HistEvent.fromJSON),e.undone.map(HistEvent.fromJSON))}});function history(e={}){return[R,I.of(e),d.domEventHandlers({beforeinput(e,t){let n=e.inputType=="historyUndo"?N:e.inputType=="historyRedo"?G:null;if(!n)return false;e.preventDefault();return n(t)}})]}const V=R;function cmd(e,t){return function({state:n,dispatch:r}){if(!t&&n.readOnly)return false;let o=n.field(R,false);if(!o)return false;let l=o.pop(e,n,t);if(!l)return false;r(l);return true}}const N=cmd(0,false);const G=cmd(1,false);const J=cmd(0,true);const P=cmd(1,true);function depth(e){return function(t){let n=t.field(R,false);if(!n)return 0;let r=e==0?n.done:n.undone;return r.length-(r.length&&!r[0].changes?1:0)}}const U=depth(0);const z=depth(1);class HistEvent{constructor(e,t,n,r,o){this.changes=e;this.effects=t;this.mapped=n;this.startSelection=r;this.selectionsAfter=o}setSelAfter(e){return new HistEvent(this.changes,this.effects,this.mapped,this.startSelection,e)}toJSON(){var e,t,n;return{changes:(e=this.changes)===null||e===void 0?void 0:e.toJSON(),mapped:(t=this.mapped)===null||t===void 0?void 0:t.toJSON(),startSelection:(n=this.startSelection)===null||n===void 0?void 0:n.toJSON(),selectionsAfter:this.selectionsAfter.map((e=>e.toJSON()))}}static fromJSON(e){return new HistEvent(e.changes&&l.fromJSON(e.changes),[],e.mapped&&s.fromJSON(e.mapped),e.startSelection&&a.fromJSON(e.startSelection),e.selectionsAfter.map(a.fromJSON))}static fromTransaction(e,t){let n=q;for(let t of e.startState.facet(T)){let r=t(e);r.length&&(n=n.concat(r))}return!n.length&&e.changes.empty?null:new HistEvent(e.changes.invert(e.startState.doc),n,void 0,t||e.startState.selection,q)}static selection(e){return new HistEvent(void 0,q,void 0,void 0,e)}}function updateBranch(e,t,n,r){let o=t+1>n+20?t-n-1:0;let l=e.slice(o,t);l.push(r);return l}function isAdjacent(e,t){let n=[],r=false;e.iterChangedRanges(((e,t)=>n.push(e,t)));t.iterChangedRanges(((e,t,o,l)=>{for(let e=0;e<n.length;){let t=n[e++],s=n[e++];l>=t&&o<=s&&(r=true)}}));return r}function eqSelectionShape(e,t){return e.ranges.length==t.ranges.length&&e.ranges.filter(((e,n)=>e.empty!=t.ranges[n].empty)).length===0}function conc(e,t){return e.length?t.length?e.concat(t):e:t}const q=[];const j=200;function addSelection(e,t){if(e.length){let n=e[e.length-1];let r=n.selectionsAfter.slice(Math.max(0,n.selectionsAfter.length-j));if(r.length&&r[r.length-1].eq(t))return e;r.push(t);return updateBranch(e,e.length-1,1e9,n.setSelAfter(r))}return[HistEvent.selection([t])]}function popSelection(e){let t=e[e.length-1];let n=e.slice();n[e.length-1]=t.setSelAfter(t.selectionsAfter.slice(0,t.selectionsAfter.length-1));return n}function addMappingToBranch(e,t){if(!e.length)return e;let n=e.length,r=q;while(n){let o=mapEvent(e[n-1],t,r);if(o.changes&&!o.changes.empty||o.effects.length){let t=e.slice(0,n);t[n-1]=o;return t}t=o.mapped;n--;r=o.selectionsAfter}return r.length?[HistEvent.selection(r)]:q}function mapEvent(e,t,n){let r=conc(e.selectionsAfter.length?e.selectionsAfter.map((e=>e.map(t))):q,n);if(!e.changes)return HistEvent.selection(r);let o=e.changes.map(t),l=t.mapDesc(e.changes,true);let s=e.mapped?e.mapped.composeDesc(l):l;return new HistEvent(o,c.mapEffects(e.effects,t),s,e.startSelection.map(l),r)}const W=/^(input\.type|delete)($|\.)/;class HistoryState{constructor(e,t,n=0,r=void 0){this.done=e;this.undone=t;this.prevTime=n;this.prevUserEvent=r}isolate(){return this.prevTime?new HistoryState(this.done,this.undone):this}addChanges(e,t,n,r,o){let l=this.done,s=l[l.length-1];l=s&&s.changes&&!s.changes.empty&&e.changes&&(!n||W.test(n))&&(!s.selectionsAfter.length&&t-this.prevTime<r.newGroupDelay&&r.joinToEvent(o,isAdjacent(s.changes,e.changes))||n=="input.type.compose")?updateBranch(l,l.length-1,r.minDepth,new HistEvent(e.changes.compose(s.changes),conc(c.mapEffects(e.effects,s.changes),s.effects),s.mapped,s.startSelection,q)):updateBranch(l,l.length,r.minDepth,e);return new HistoryState(l,q,t,n)}addSelection(e,t,n,r){let o=this.done.length?this.done[this.done.length-1].selectionsAfter:q;return o.length>0&&t-this.prevTime<r&&n==this.prevUserEvent&&n&&/^select($|\.)/.test(n)&&eqSelectionShape(o[o.length-1],e)?this:new HistoryState(addSelection(this.done,e),this.undone,t,n)}addMapping(e){return new HistoryState(addMappingToBranch(this.done,e),addMappingToBranch(this.undone,e),this.prevTime,this.prevUserEvent)}pop(e,t,n){let r=e==0?this.done:this.undone;if(r.length==0)return null;let o=r[r.length-1],l=o.selectionsAfter[0]||t.selection;if(n&&o.selectionsAfter.length)return t.update({selection:o.selectionsAfter[o.selectionsAfter.length-1],annotations:O.of({side:e,rest:popSelection(r),selection:l}),userEvent:e==0?"select.undo":"select.redo",scrollIntoView:true});if(o.changes){let n=r.length==1?q:r.slice(0,r.length-1);o.mapped&&(n=addMappingToBranch(n,o.mapped));return t.update({changes:o.changes,selection:o.startSelection,effects:o.effects,annotations:O.of({side:e,rest:n,selection:l}),filter:false,userEvent:e==0?"undo":"redo",scrollIntoView:true})}return null}}HistoryState.empty=new HistoryState(q,q);const $=[{key:"Mod-z",run:N,preventDefault:true},{key:"Mod-y",mac:"Mod-Shift-z",run:G,preventDefault:true},{linux:"Ctrl-Shift-z",run:G,preventDefault:true},{key:"Mod-u",run:J,preventDefault:true},{key:"Alt-u",mac:"Mod-Shift-u",run:P,preventDefault:true}];function updateSel(e,t){return a.create(e.ranges.map(t),e.mainIndex)}function setSel(e,t){return e.update({selection:t,scrollIntoView:true,userEvent:"select"})}function moveSel({state:e,dispatch:t},n){let r=updateSel(e.selection,n);if(r.eq(e.selection,true))return false;t(setSel(e,r));return true}function rangeEnd(e,t){return a.cursor(t?e.to:e.from)}function cursorByChar(e,t){return moveSel(e,(n=>n.empty?e.moveByChar(n,t):rangeEnd(n,t)))}function ltrAtCursor(e){return e.textDirectionAt(e.state.selection.main.head)==m.LTR}const cursorCharLeft=e=>cursorByChar(e,!ltrAtCursor(e));const cursorCharRight=e=>cursorByChar(e,ltrAtCursor(e));const cursorCharForward=e=>cursorByChar(e,true);const cursorCharBackward=e=>cursorByChar(e,false);function byCharLogical(e,t,n){let r=t.head,o=e.doc.lineAt(r);r=r==(n?o.to:o.from)?n?Math.min(e.doc.length,o.to+1):Math.max(0,o.from-1):o.from+i(o.text,r-o.from,n);return a.cursor(r,n?-1:1)}function moveByCharLogical(e,t){return moveSel(e,(n=>n.empty?byCharLogical(e.state,n,t):rangeEnd(n,t)))}const cursorCharForwardLogical=e=>moveByCharLogical(e,true);const cursorCharBackwardLogical=e=>moveByCharLogical(e,false);function cursorByGroup(e,t){return moveSel(e,(n=>n.empty?e.moveByGroup(n,t):rangeEnd(n,t)))}const cursorGroupLeft=e=>cursorByGroup(e,!ltrAtCursor(e));const cursorGroupRight=e=>cursorByGroup(e,ltrAtCursor(e));const cursorGroupForward=e=>cursorByGroup(e,true);const cursorGroupBackward=e=>cursorByGroup(e,false);const F=typeof Intl!="undefined"&&Intl.Segmenter?new Intl.Segmenter(void 0,{granularity:"word"}):null;function moveBySubword(e,t,n){let r=e.state.charCategorizer(t.from);let o=u.Space,l=t.from,s=0;let c=false,i=false,f=false;let step=t=>{if(c)return false;l+=n?t.length:-t.length;let a,h=r(t);h==u.Word&&t.charCodeAt(0)<128&&/[\W_]/.test(t)&&(h=-1);o==u.Space&&(o=h);if(o!=h)return false;if(o==u.Word)if(t.toLowerCase()==t){if(!n&&i)return false;f=true}else if(f){if(n)return false;c=true}else{if(i&&n&&r(a=e.state.sliceDoc(l,l+1))==u.Word&&a.toLowerCase()==a)return false;i=true}s++;return true};let h=e.moveByChar(t,n,(e=>{step(e);return step}));if(F&&o==u.Word&&h.from==t.from+s*(n?1:-1)){let r=Math.min(t.head,h.head),o=Math.max(t.head,h.head);let l=e.state.sliceDoc(r,o);if(l.length>1&&/[\u4E00-\uffff]/.test(l)){let e=Array.from(F.segment(l));if(e.length>1)return n?a.cursor(t.head+e[1].index,-1):a.cursor(h.head+e[e.length-1].index,1)}}return h}function cursorBySubword(e,t){return moveSel(e,(n=>n.empty?moveBySubword(e,n,t):rangeEnd(n,t)))}const cursorSubwordForward=e=>cursorBySubword(e,true);const cursorSubwordBackward=e=>cursorBySubword(e,false);function interestingNode(e,t,n){if(t.type.prop(n))return true;let r=t.to-t.from;return r&&(r>2||/[^\s,.;:]/.test(e.sliceDoc(t.from,t.to)))||t.firstChild}function moveBySyntax(e,t,n){let r=p(e).resolveInner(t.head);let o=n?k.closedBy:k.openedBy;for(let l=t.head;;){let t=n?r.childAfter(l):r.childBefore(l);if(!t)break;interestingNode(e,t,o)?r=t:l=n?t.to:t.from}let l,s,c=r.type.prop(o);s=c&&(l=n?g(e,r.from,1):g(e,r.to,-1))&&l.matched?n?l.end.to:l.end.from:n?r.to:r.from;return a.cursor(s,n?-1:1)}const cursorSyntaxLeft=e=>moveSel(e,(t=>moveBySyntax(e.state,t,!ltrAtCursor(e))));const cursorSyntaxRight=e=>moveSel(e,(t=>moveBySyntax(e.state,t,ltrAtCursor(e))));function cursorByLine(e,t){return moveSel(e,(n=>{if(!n.empty)return rangeEnd(n,t);let r=e.moveVertically(n,t);return r.head!=n.head?r:e.moveToLineBoundary(n,t)}))}const cursorLineUp=e=>cursorByLine(e,false);const cursorLineDown=e=>cursorByLine(e,true);function pageInfo(e){let t=e.scrollDOM.clientHeight<e.scrollDOM.scrollHeight-2;let n,r=0,o=0;if(t){for(let t of e.state.facet(d.scrollMargins)){let n=t(e);(n===null||n===void 0?void 0:n.top)&&(r=Math.max(n===null||n===void 0?void 0:n.top,r));(n===null||n===void 0?void 0:n.bottom)&&(o=Math.max(n===null||n===void 0?void 0:n.bottom,o))}n=e.scrollDOM.clientHeight-r-o}else n=(e.dom.ownerDocument.defaultView||window).innerHeight;return{marginTop:r,marginBottom:o,selfScroll:t,height:Math.max(e.defaultLineHeight,n-5)}}function cursorByPage(e,t){let n=pageInfo(e);let{state:r}=e,o=updateSel(r.selection,(r=>r.empty?e.moveVertically(r,t,n.height):rangeEnd(r,t)));if(o.eq(r.selection))return false;let l;if(n.selfScroll){let t=e.coordsAtPos(r.selection.main.head);let s=e.scrollDOM.getBoundingClientRect();let a=s.top+n.marginTop,c=s.bottom-n.marginBottom;t&&t.top>a&&t.bottom<c&&(l=d.scrollIntoView(o.main.head,{y:"start",yMargin:t.top-a}))}e.dispatch(setSel(r,o),{effects:l});return true}const cursorPageUp=e=>cursorByPage(e,false);const cursorPageDown=e=>cursorByPage(e,true);function moveByLineBoundary(e,t,n){let r=e.lineBlockAt(t.head),o=e.moveToLineBoundary(t,n);o.head==t.head&&o.head!=(n?r.to:r.from)&&(o=e.moveToLineBoundary(t,n,false));if(!n&&o.head==r.from&&r.length){let n=/^\s*/.exec(e.state.sliceDoc(r.from,Math.min(r.from+100,r.to)))[0].length;n&&t.head!=r.from+n&&(o=a.cursor(r.from+n))}return o}const cursorLineBoundaryForward=e=>moveSel(e,(t=>moveByLineBoundary(e,t,true)));const cursorLineBoundaryBackward=e=>moveSel(e,(t=>moveByLineBoundary(e,t,false)));const cursorLineBoundaryLeft=e=>moveSel(e,(t=>moveByLineBoundary(e,t,!ltrAtCursor(e))));const cursorLineBoundaryRight=e=>moveSel(e,(t=>moveByLineBoundary(e,t,ltrAtCursor(e))));const cursorLineStart=e=>moveSel(e,(t=>a.cursor(e.lineBlockAt(t.head).from,1)));const cursorLineEnd=e=>moveSel(e,(t=>a.cursor(e.lineBlockAt(t.head).to,-1)));function toMatchingBracket(e,t,n){let r=false,o=updateSel(e.selection,(t=>{let o=g(e,t.head,-1)||g(e,t.head,1)||t.head>0&&g(e,t.head-1,1)||t.head<e.doc.length&&g(e,t.head+1,-1);if(!o||!o.end)return t;r=true;let l=o.start.from==t.head?o.end.to:o.end.from;return n?a.range(t.anchor,l):a.cursor(l)}));if(!r)return false;t(setSel(e,o));return true}const cursorMatchingBracket=({state:e,dispatch:t})=>toMatchingBracket(e,t,false);const selectMatchingBracket=({state:e,dispatch:t})=>toMatchingBracket(e,t,true);function extendSel(e,t){let n=updateSel(e.state.selection,(e=>{let n=t(e);return a.range(e.anchor,n.head,n.goalColumn,n.bidiLevel||void 0)}));if(n.eq(e.state.selection))return false;e.dispatch(setSel(e.state,n));return true}function selectByChar(e,t){return extendSel(e,(n=>e.moveByChar(n,t)))}const selectCharLeft=e=>selectByChar(e,!ltrAtCursor(e));const selectCharRight=e=>selectByChar(e,ltrAtCursor(e));const selectCharForward=e=>selectByChar(e,true);const selectCharBackward=e=>selectByChar(e,false);const selectCharForwardLogical=e=>extendSel(e,(t=>byCharLogical(e.state,t,true)));const selectCharBackwardLogical=e=>extendSel(e,(t=>byCharLogical(e.state,t,false)));function selectByGroup(e,t){return extendSel(e,(n=>e.moveByGroup(n,t)))}const selectGroupLeft=e=>selectByGroup(e,!ltrAtCursor(e));const selectGroupRight=e=>selectByGroup(e,ltrAtCursor(e));const selectGroupForward=e=>selectByGroup(e,true);const selectGroupBackward=e=>selectByGroup(e,false);function selectBySubword(e,t){return extendSel(e,(n=>moveBySubword(e,n,t)))}const selectSubwordForward=e=>selectBySubword(e,true);const selectSubwordBackward=e=>selectBySubword(e,false);const selectSyntaxLeft=e=>extendSel(e,(t=>moveBySyntax(e.state,t,!ltrAtCursor(e))));const selectSyntaxRight=e=>extendSel(e,(t=>moveBySyntax(e.state,t,ltrAtCursor(e))));function selectByLine(e,t){return extendSel(e,(n=>e.moveVertically(n,t)))}const selectLineUp=e=>selectByLine(e,false);const selectLineDown=e=>selectByLine(e,true);function selectByPage(e,t){return extendSel(e,(n=>e.moveVertically(n,t,pageInfo(e).height)))}const selectPageUp=e=>selectByPage(e,false);const selectPageDown=e=>selectByPage(e,true);const selectLineBoundaryForward=e=>extendSel(e,(t=>moveByLineBoundary(e,t,true)));const selectLineBoundaryBackward=e=>extendSel(e,(t=>moveByLineBoundary(e,t,false)));const selectLineBoundaryLeft=e=>extendSel(e,(t=>moveByLineBoundary(e,t,!ltrAtCursor(e))));const selectLineBoundaryRight=e=>extendSel(e,(t=>moveByLineBoundary(e,t,ltrAtCursor(e))));const selectLineStart=e=>extendSel(e,(t=>a.cursor(e.lineBlockAt(t.head).from)));const selectLineEnd=e=>extendSel(e,(t=>a.cursor(e.lineBlockAt(t.head).to)));const cursorDocStart=({state:e,dispatch:t})=>{t(setSel(e,{anchor:0}));return true};const cursorDocEnd=({state:e,dispatch:t})=>{t(setSel(e,{anchor:e.doc.length}));return true};const selectDocStart=({state:e,dispatch:t})=>{t(setSel(e,{anchor:e.selection.main.anchor,head:0}));return true};const selectDocEnd=({state:e,dispatch:t})=>{t(setSel(e,{anchor:e.selection.main.anchor,head:e.doc.length}));return true};const selectAll=({state:e,dispatch:t})=>{t(e.update({selection:{anchor:0,head:e.doc.length},userEvent:"select"}));return true};const selectLine=({state:e,dispatch:t})=>{let n=selectedLineBlocks(e).map((({from:t,to:n})=>a.range(t,Math.min(n+1,e.doc.length))));t(e.update({selection:a.create(n),userEvent:"select"}));return true};const selectParentSyntax=({state:e,dispatch:t})=>{let n=updateSel(e.selection,(t=>{let n=p(e),r=n.resolveStack(t.from,1);if(t.empty){let e=n.resolveStack(t.from,-1);e.node.from>=r.node.from&&e.node.to<=r.node.to&&(r=e)}for(let e=r;e;e=e.next){let{node:n}=e;if((n.from<t.from&&n.to>=t.to||n.to>t.to&&n.from<=t.from)&&e.next)return a.range(n.to,n.from)}return t}));if(n.eq(e.selection))return false;t(setSel(e,n));return true};const simplifySelection=({state:e,dispatch:t})=>{let n=e.selection,r=null;n.ranges.length>1?r=a.create([n.main]):n.main.empty||(r=a.create([a.cursor(n.main.head)]));if(!r)return false;t(setSel(e,r));return true};function deleteBy(e,t){if(e.state.readOnly)return false;let n="delete.selection",{state:r}=e;let o=r.changeByRange((r=>{let{from:o,to:l}=r;if(o==l){let s=t(r);if(s<o){n="delete.backward";s=skipAtomic(e,s,false)}else if(s>o){n="delete.forward";s=skipAtomic(e,s,true)}o=Math.min(o,s);l=Math.max(l,s)}else{o=skipAtomic(e,o,false);l=skipAtomic(e,l,true)}return o==l?{range:r}:{changes:{from:o,to:l},range:a.cursor(o,o<r.head?-1:1)}}));if(o.changes.empty)return false;e.dispatch(r.update(o,{scrollIntoView:true,userEvent:n,effects:n=="delete.selection"?d.announce.of(r.phrase("Selection deleted")):void 0}));return true}function skipAtomic(e,t,n){if(e instanceof d)for(let r of e.state.facet(d.atomicRanges).map((t=>t(e))))r.between(t,t,((e,r)=>{e<t&&r>t&&(t=n?r:e)}));return t}const deleteByChar=(e,t,n)=>deleteBy(e,(r=>{let o,l,s=r.from,{state:a}=e,c=a.doc.lineAt(s);if(n&&!t&&s>c.from&&s<c.from+200&&!/[^ \t]/.test(o=c.text.slice(0,s-c.from))){if(o[o.length-1]=="\t")return s-1;let e=f(o,a.tabSize),t=e%y(a)||y(a);for(let e=0;e<t&&o[o.length-1-e]==" ";e++)s--;l=s}else{l=i(c.text,s-c.from,t,t)+c.from;l==s&&c.number!=(t?a.doc.lines:1)?l+=t?1:-1:!t&&/[\ufe00-\ufe0f]/.test(c.text.slice(l-c.from,s-c.from))&&(l=i(c.text,l-c.from,false,false)+c.from)}return l}));const deleteCharBackward=e=>deleteByChar(e,false,true);const deleteCharBackwardStrict=e=>deleteByChar(e,false,false);const deleteCharForward=e=>deleteByChar(e,true,false);const deleteByGroup=(e,t)=>deleteBy(e,(n=>{let r=n.head,{state:o}=e,l=o.doc.lineAt(r);let s=o.charCategorizer(r);for(let e=null;;){if(r==(t?l.to:l.from)){r==n.head&&l.number!=(t?o.doc.lines:1)&&(r+=t?1:-1);break}let a=i(l.text,r-l.from,t)+l.from;let c=l.text.slice(Math.min(r,a)-l.from,Math.max(r,a)-l.from);let u=s(c);if(e!=null&&u!=e)break;c==" "&&r==n.head||(e=u);r=a}return r}));const deleteGroupBackward=e=>deleteByGroup(e,false);const deleteGroupForward=e=>deleteByGroup(e,true);const deleteToLineEnd=e=>deleteBy(e,(t=>{let n=e.lineBlockAt(t.head).to;return t.head<n?n:Math.min(e.state.doc.length,t.head+1)}));const deleteToLineStart=e=>deleteBy(e,(t=>{let n=e.lineBlockAt(t.head).from;return t.head>n?n:Math.max(0,t.head-1)}));const deleteLineBoundaryBackward=e=>deleteBy(e,(t=>{let n=e.moveToLineBoundary(t,false).head;return t.head>n?n:Math.max(0,t.head-1)}));const deleteLineBoundaryForward=e=>deleteBy(e,(t=>{let n=e.moveToLineBoundary(t,true).head;return t.head<n?n:Math.min(e.state.doc.length,t.head+1)}));const deleteTrailingWhitespace=({state:e,dispatch:t})=>{if(e.readOnly)return false;let n=[];for(let t=0,r="",o=e.doc.iter();;){o.next();if(o.lineBreak||o.done){let e=r.search(/\s+$/);e>-1&&n.push({from:t-(r.length-e),to:t});if(o.done)break;r=""}else r=o.value;t+=o.value.length}if(!n.length)return false;t(e.update({changes:n,userEvent:"delete"}));return true};const splitLine=({state:e,dispatch:t})=>{if(e.readOnly)return false;let n=e.changeByRange((e=>({changes:{from:e.from,to:e.to,insert:h.of(["",""])},range:a.cursor(e.from)})));t(e.update(n,{scrollIntoView:true,userEvent:"input"}));return true};const transposeChars=({state:e,dispatch:t})=>{if(e.readOnly)return false;let n=e.changeByRange((t=>{if(!t.empty||t.from==0||t.from==e.doc.length)return{range:t};let n=t.from,r=e.doc.lineAt(n);let o=n==r.from?n-1:i(r.text,n-r.from,false)+r.from;let l=n==r.to?n+1:i(r.text,n-r.from,true)+r.from;return{changes:{from:o,to:l,insert:e.doc.slice(n,l).append(e.doc.slice(o,n))},range:a.cursor(l)}}));if(n.changes.empty)return false;t(e.update(n,{scrollIntoView:true,userEvent:"move.character"}));return true};function selectedLineBlocks(e){let t=[],n=-1;for(let r of e.selection.ranges){let o=e.doc.lineAt(r.from),l=e.doc.lineAt(r.to);r.empty||r.to!=l.from||(l=e.doc.lineAt(r.to-1));if(n>=o.number){let e=t[t.length-1];e.to=l.to;e.ranges.push(r)}else t.push({from:o.from,to:l.to,ranges:[r]});n=l.number+1}return t}function moveLine(e,t,n){if(e.readOnly)return false;let r=[],o=[];for(let t of selectedLineBlocks(e)){if(n?t.to==e.doc.length:t.from==0)continue;let l=e.doc.lineAt(n?t.to+1:t.from-1);let s=l.length+1;if(n){r.push({from:t.to,to:l.to},{from:t.from,insert:l.text+e.lineBreak});for(let n of t.ranges)o.push(a.range(Math.min(e.doc.length,n.anchor+s),Math.min(e.doc.length,n.head+s)))}else{r.push({from:l.from,to:t.from},{from:t.to,insert:e.lineBreak+l.text});for(let e of t.ranges)o.push(a.range(e.anchor-s,e.head-s))}}if(!r.length)return false;t(e.update({changes:r,scrollIntoView:true,selection:a.create(o,e.selection.mainIndex),userEvent:"move.line"}));return true}const moveLineUp=({state:e,dispatch:t})=>moveLine(e,t,false);const moveLineDown=({state:e,dispatch:t})=>moveLine(e,t,true);function copyLine(e,t,n){if(e.readOnly)return false;let r=[];for(let t of selectedLineBlocks(e))n?r.push({from:t.from,insert:e.doc.slice(t.from,t.to)+e.lineBreak}):r.push({from:t.to,insert:e.lineBreak+e.doc.slice(t.from,t.to)});t(e.update({changes:r,scrollIntoView:true,userEvent:"input.copyline"}));return true}const copyLineUp=({state:e,dispatch:t})=>copyLine(e,t,false);const copyLineDown=({state:e,dispatch:t})=>copyLine(e,t,true);const deleteLine=e=>{if(e.state.readOnly)return false;let{state:t}=e,n=t.changes(selectedLineBlocks(t).map((({from:e,to:n})=>{e>0?e--:n<t.doc.length&&n++;return{from:e,to:n}})));let r=updateSel(t.selection,(t=>{let n;if(e.lineWrapping){let r=e.lineBlockAt(t.head),o=e.coordsAtPos(t.head,t.assoc||1);o&&(n=r.bottom+e.documentTop-o.bottom+e.defaultLineHeight/2)}return e.moveVertically(t,true,n)})).map(n);e.dispatch({changes:n,selection:r,scrollIntoView:true,userEvent:"delete.line"});return true};const insertNewline=({state:e,dispatch:t})=>{t(e.update(e.replaceSelection(e.lineBreak),{scrollIntoView:true,userEvent:"input"}));return true};const insertNewlineKeepIndent=({state:e,dispatch:t})=>{t(e.update(e.changeByRange((t=>{let n=/^\s*/.exec(e.doc.lineAt(t.from).text)[0];return{changes:{from:t.from,to:t.to,insert:e.lineBreak+n},range:a.cursor(t.from+n.length+1)}})),{scrollIntoView:true,userEvent:"input"}));return true};function isBetweenBrackets(e,t){if(/\(\)|\[\]|\{\}/.test(e.sliceDoc(t-1,t+1)))return{from:t,to:t};let n=p(e).resolveInner(t);let r,o=n.childBefore(t),l=n.childAfter(t);return o&&l&&o.to<=t&&l.from>=t&&(r=o.type.prop(k.closedBy))&&r.indexOf(l.name)>-1&&e.doc.lineAt(o.to).from==e.doc.lineAt(l.from).from&&!/\S/.test(e.sliceDoc(o.to,l.from))?{from:o.to,to:l.from}:null}const _=newlineAndIndent(false);const K=newlineAndIndent(true);function newlineAndIndent(e){return({state:t,dispatch:n})=>{if(t.readOnly)return false;let r=t.changeByRange((n=>{let{from:r,to:o}=n,l=t.doc.lineAt(r);let s=!e&&r==o&&isBetweenBrackets(t,r);e&&(r=o=(o<=l.to?l:t.doc.lineAt(o)).to);let c=new v(t,{simulateBreak:r,simulateDoubleBreak:!!s});let i=B(c,r);i==null&&(i=f(/^\s*/.exec(t.doc.lineAt(r).text)[0],t.tabSize));while(o<l.to&&/\s/.test(l.text[o-l.from]))o++;s?({from:r,to:o}=s):r>l.from&&r<l.from+100&&!/\S/.test(l.text.slice(0,r))&&(r=l.from);let u=["",S(t,i)];s&&u.push(S(t,c.lineIndent(l.from,-1)));return{changes:{from:r,to:o,insert:h.of(u)},range:a.cursor(r+1+u[1].length)}}));n(t.update(r,{scrollIntoView:true,userEvent:"input"}));return true}}function changeBySelectedLine(e,t){let n=-1;return e.changeByRange((r=>{let o=[];for(let l=r.from;l<=r.to;){let s=e.doc.lineAt(l);if(s.number>n&&(r.empty||r.to>s.from)){t(s,o,r);n=s.number}l=s.to+1}let l=e.changes(o);return{changes:o,range:a.range(l.mapPos(r.anchor,1),l.mapPos(r.head,1))}}))}const indentSelection=({state:e,dispatch:t})=>{if(e.readOnly)return false;let n=Object.create(null);let r=new v(e,{overrideIndentation:e=>{let t=n[e];return t==null?-1:t}});let o=changeBySelectedLine(e,((t,o,l)=>{let s=B(r,t.from);if(s==null)return;/\S/.test(t.text)||(s=0);let a=/^\s*/.exec(t.text)[0];let c=S(e,s);if(a!=c||l.from<t.from+a.length){n[t.from]=s;o.push({from:t.from,to:t.from+a.length,insert:c})}}));o.changes.empty||t(e.update(o,{userEvent:"indent"}));return true};const indentMore=({state:e,dispatch:t})=>{if(e.readOnly)return false;t(e.update(changeBySelectedLine(e,((t,n)=>{n.push({from:t.from,insert:e.facet(A)})})),{userEvent:"input.indent"}));return true};const indentLess=({state:e,dispatch:t})=>{if(e.readOnly)return false;t(e.update(changeBySelectedLine(e,((t,n)=>{let r=/^\s*/.exec(t.text)[0];if(!r)return;let o=f(r,e.tabSize),l=0;let s=S(e,Math.max(0,o-y(e)));while(l<r.length&&l<s.length&&r.charCodeAt(l)==s.charCodeAt(l))l++;n.push({from:t.from+l,to:t.from+r.length,insert:s.slice(l)})})),{userEvent:"delete.dedent"}));return true};const toggleTabFocusMode=e=>{e.setTabFocusMode();return true};const temporarilySetTabFocusMode=e=>{e.setTabFocusMode(2e3);return true};const insertTab=({state:e,dispatch:t})=>{if(e.selection.ranges.some((e=>!e.empty)))return indentMore({state:e,dispatch:t});t(e.update(e.replaceSelection("\t"),{scrollIntoView:true,userEvent:"input"}));return true};const Q=[{key:"Ctrl-b",run:cursorCharLeft,shift:selectCharLeft,preventDefault:true},{key:"Ctrl-f",run:cursorCharRight,shift:selectCharRight},{key:"Ctrl-p",run:cursorLineUp,shift:selectLineUp},{key:"Ctrl-n",run:cursorLineDown,shift:selectLineDown},{key:"Ctrl-a",run:cursorLineStart,shift:selectLineStart},{key:"Ctrl-e",run:cursorLineEnd,shift:selectLineEnd},{key:"Ctrl-d",run:deleteCharForward},{key:"Ctrl-h",run:deleteCharBackward},{key:"Ctrl-k",run:deleteToLineEnd},{key:"Ctrl-Alt-h",run:deleteGroupBackward},{key:"Ctrl-o",run:splitLine},{key:"Ctrl-t",run:transposeChars},{key:"Ctrl-v",run:cursorPageDown}];const X=[{key:"ArrowLeft",run:cursorCharLeft,shift:selectCharLeft,preventDefault:true},{key:"Mod-ArrowLeft",mac:"Alt-ArrowLeft",run:cursorGroupLeft,shift:selectGroupLeft,preventDefault:true},{mac:"Cmd-ArrowLeft",run:cursorLineBoundaryLeft,shift:selectLineBoundaryLeft,preventDefault:true},{key:"ArrowRight",run:cursorCharRight,shift:selectCharRight,preventDefault:true},{key:"Mod-ArrowRight",mac:"Alt-ArrowRight",run:cursorGroupRight,shift:selectGroupRight,preventDefault:true},{mac:"Cmd-ArrowRight",run:cursorLineBoundaryRight,shift:selectLineBoundaryRight,preventDefault:true},{key:"ArrowUp",run:cursorLineUp,shift:selectLineUp,preventDefault:true},{mac:"Cmd-ArrowUp",run:cursorDocStart,shift:selectDocStart},{mac:"Ctrl-ArrowUp",run:cursorPageUp,shift:selectPageUp},{key:"ArrowDown",run:cursorLineDown,shift:selectLineDown,preventDefault:true},{mac:"Cmd-ArrowDown",run:cursorDocEnd,shift:selectDocEnd},{mac:"Ctrl-ArrowDown",run:cursorPageDown,shift:selectPageDown},{key:"PageUp",run:cursorPageUp,shift:selectPageUp},{key:"PageDown",run:cursorPageDown,shift:selectPageDown},{key:"Home",run:cursorLineBoundaryBackward,shift:selectLineBoundaryBackward,preventDefault:true},{key:"Mod-Home",run:cursorDocStart,shift:selectDocStart},{key:"End",run:cursorLineBoundaryForward,shift:selectLineBoundaryForward,preventDefault:true},{key:"Mod-End",run:cursorDocEnd,shift:selectDocEnd},{key:"Enter",run:_,shift:_},{key:"Mod-a",run:selectAll},{key:"Backspace",run:deleteCharBackward,shift:deleteCharBackward},{key:"Delete",run:deleteCharForward},{key:"Mod-Backspace",mac:"Alt-Backspace",run:deleteGroupBackward},{key:"Mod-Delete",mac:"Alt-Delete",run:deleteGroupForward},{mac:"Mod-Backspace",run:deleteLineBoundaryBackward},{mac:"Mod-Delete",run:deleteLineBoundaryForward}].concat(Q.map((e=>({mac:e.key,run:e.run,shift:e.shift}))));const Y=[{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:cursorSyntaxLeft,shift:selectSyntaxLeft},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:cursorSyntaxRight,shift:selectSyntaxRight},{key:"Alt-ArrowUp",run:moveLineUp},{key:"Shift-Alt-ArrowUp",run:copyLineUp},{key:"Alt-ArrowDown",run:moveLineDown},{key:"Shift-Alt-ArrowDown",run:copyLineDown},{key:"Escape",run:simplifySelection},{key:"Mod-Enter",run:K},{key:"Alt-l",mac:"Ctrl-l",run:selectLine},{key:"Mod-i",run:selectParentSyntax,preventDefault:true},{key:"Mod-[",run:indentLess},{key:"Mod-]",run:indentMore},{key:"Mod-Alt-\\",run:indentSelection},{key:"Shift-Mod-k",run:deleteLine},{key:"Shift-Mod-\\",run:cursorMatchingBracket},{key:"Mod-/",run:toggleComment},{key:"Alt-A",run:M},{key:"Ctrl-m",mac:"Shift-Alt-m",run:toggleTabFocusMode}].concat(X);const Z={key:"Tab",run:indentMore,shift:indentLess};export{L as blockComment,D as blockUncomment,copyLineDown,copyLineUp,cursorCharBackward,cursorCharBackwardLogical,cursorCharForward,cursorCharForwardLogical,cursorCharLeft,cursorCharRight,cursorDocEnd,cursorDocStart,cursorGroupBackward,cursorGroupForward,cursorGroupLeft,cursorGroupRight,cursorLineBoundaryBackward,cursorLineBoundaryForward,cursorLineBoundaryLeft,cursorLineBoundaryRight,cursorLineDown,cursorLineEnd,cursorLineStart,cursorLineUp,cursorMatchingBracket,cursorPageDown,cursorPageUp,cursorSubwordBackward,cursorSubwordForward,cursorSyntaxLeft,cursorSyntaxRight,Y as defaultKeymap,deleteCharBackward,deleteCharBackwardStrict,deleteCharForward,deleteGroupBackward,deleteGroupForward,deleteLine,deleteLineBoundaryBackward,deleteLineBoundaryForward,deleteToLineEnd,deleteToLineStart,deleteTrailingWhitespace,Q as emacsStyleKeymap,history,V as historyField,$ as historyKeymap,indentLess,indentMore,indentSelection,Z as indentWithTab,K as insertBlankLine,insertNewline,_ as insertNewlineAndIndent,insertNewlineKeepIndent,insertTab,T as invertedEffects,H as isolateHistory,C as lineComment,x as lineUncomment,moveLineDown,moveLineUp,G as redo,z as redoDepth,P as redoSelection,selectAll,selectCharBackward,selectCharBackwardLogical,selectCharForward,selectCharForwardLogical,selectCharLeft,selectCharRight,selectDocEnd,selectDocStart,selectGroupBackward,selectGroupForward,selectGroupLeft,selectGroupRight,selectLine,selectLineBoundaryBackward,selectLineBoundaryForward,selectLineBoundaryLeft,selectLineBoundaryRight,selectLineDown,selectLineEnd,selectLineStart,selectLineUp,selectMatchingBracket,selectPageDown,selectPageUp,selectParentSyntax,selectSubwordBackward,selectSubwordForward,selectSyntaxLeft,selectSyntaxRight,simplifySelection,splitLine,X as standardKeymap,temporarilySetTabFocusMode,M as toggleBlockComment,E as toggleBlockCommentByLine,toggleComment,w as toggleLineComment,toggleTabFocusMode,transposeChars,N as undo,U as undoDepth,J as undoSelection};
