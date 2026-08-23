(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const c of l.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function r(a){if(a.ep)return;a.ep=!0;const l=t(a);fetch(a.href,l)}})();var o1=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function c_(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}function l1(s){if(Object.prototype.hasOwnProperty.call(s,"__esModule"))return s;var e=s.default;if(typeof e=="function"){var t=function r(){return this instanceof r?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(s).forEach(function(r){var a=Object.getOwnPropertyDescriptor(s,r);Object.defineProperty(t,r,a.get?a:{enumerable:!0,get:function(){return s[r]}})}),t}var tf={exports:{}},Qa={},nf={exports:{}},gt={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lm;function Rv(){if(Lm)return gt;Lm=1;var s=Symbol.for("react.element"),e=Symbol.for("react.portal"),t=Symbol.for("react.fragment"),r=Symbol.for("react.strict_mode"),a=Symbol.for("react.profiler"),l=Symbol.for("react.provider"),c=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),d=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),v=Symbol.iterator;function g(N){return N===null||typeof N!="object"?null:(N=v&&N[v]||N["@@iterator"],typeof N=="function"?N:null)}var S={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E=Object.assign,b={};function y(N,$,Ie){this.props=N,this.context=$,this.refs=b,this.updater=Ie||S}y.prototype.isReactComponent={},y.prototype.setState=function(N,$){if(typeof N!="object"&&typeof N!="function"&&N!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,N,$,"setState")},y.prototype.forceUpdate=function(N){this.updater.enqueueForceUpdate(this,N,"forceUpdate")};function x(){}x.prototype=y.prototype;function U(N,$,Ie){this.props=N,this.context=$,this.refs=b,this.updater=Ie||S}var F=U.prototype=new x;F.constructor=U,E(F,y.prototype),F.isPureReactComponent=!0;var R=Array.isArray,I=Object.prototype.hasOwnProperty,P={current:null},O={key:!0,ref:!0,__self:!0,__source:!0};function T(N,$,Ie){var qe,ke={},ie=null,_e=null;if($!=null)for(qe in $.ref!==void 0&&(_e=$.ref),$.key!==void 0&&(ie=""+$.key),$)I.call($,qe)&&!O.hasOwnProperty(qe)&&(ke[qe]=$[qe]);var pe=arguments.length-2;if(pe===1)ke.children=Ie;else if(1<pe){for(var Ne=Array(pe),je=0;je<pe;je++)Ne[je]=arguments[je+2];ke.children=Ne}if(N&&N.defaultProps)for(qe in pe=N.defaultProps,pe)ke[qe]===void 0&&(ke[qe]=pe[qe]);return{$$typeof:s,type:N,key:ie,ref:_e,props:ke,_owner:P.current}}function L(N,$){return{$$typeof:s,type:N.type,key:$,ref:N.ref,props:N.props,_owner:N._owner}}function V(N){return typeof N=="object"&&N!==null&&N.$$typeof===s}function z(N){var $={"=":"=0",":":"=2"};return"$"+N.replace(/[=:]/g,function(Ie){return $[Ie]})}var K=/\/+/g;function ce(N,$){return typeof N=="object"&&N!==null&&N.key!=null?z(""+N.key):$.toString(36)}function he(N,$,Ie,qe,ke){var ie=typeof N;(ie==="undefined"||ie==="boolean")&&(N=null);var _e=!1;if(N===null)_e=!0;else switch(ie){case"string":case"number":_e=!0;break;case"object":switch(N.$$typeof){case s:case e:_e=!0}}if(_e)return _e=N,ke=ke(_e),N=qe===""?"."+ce(_e,0):qe,R(ke)?(Ie="",N!=null&&(Ie=N.replace(K,"$&/")+"/"),he(ke,$,Ie,"",function(je){return je})):ke!=null&&(V(ke)&&(ke=L(ke,Ie+(!ke.key||_e&&_e.key===ke.key?"":(""+ke.key).replace(K,"$&/")+"/")+N)),$.push(ke)),1;if(_e=0,qe=qe===""?".":qe+":",R(N))for(var pe=0;pe<N.length;pe++){ie=N[pe];var Ne=qe+ce(ie,pe);_e+=he(ie,$,Ie,Ne,ke)}else if(Ne=g(N),typeof Ne=="function")for(N=Ne.call(N),pe=0;!(ie=N.next()).done;)ie=ie.value,Ne=qe+ce(ie,pe++),_e+=he(ie,$,Ie,Ne,ke);else if(ie==="object")throw $=String(N),Error("Objects are not valid as a React child (found: "+($==="[object Object]"?"object with keys {"+Object.keys(N).join(", ")+"}":$)+"). If you meant to render a collection of children, use an array instead.");return _e}function J(N,$,Ie){if(N==null)return N;var qe=[],ke=0;return he(N,qe,"","",function(ie){return $.call(Ie,ie,ke++)}),qe}function oe(N){if(N._status===-1){var $=N._result;$=$(),$.then(function(Ie){(N._status===0||N._status===-1)&&(N._status=1,N._result=Ie)},function(Ie){(N._status===0||N._status===-1)&&(N._status=2,N._result=Ie)}),N._status===-1&&(N._status=0,N._result=$)}if(N._status===1)return N._result.default;throw N._result}var ee={current:null},X={transition:null},ae={ReactCurrentDispatcher:ee,ReactCurrentBatchConfig:X,ReactCurrentOwner:P};function le(){throw Error("act(...) is not supported in production builds of React.")}return gt.Children={map:J,forEach:function(N,$,Ie){J(N,function(){$.apply(this,arguments)},Ie)},count:function(N){var $=0;return J(N,function(){$++}),$},toArray:function(N){return J(N,function($){return $})||[]},only:function(N){if(!V(N))throw Error("React.Children.only expected to receive a single React element child.");return N}},gt.Component=y,gt.Fragment=t,gt.Profiler=a,gt.PureComponent=U,gt.StrictMode=r,gt.Suspense=p,gt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ae,gt.act=le,gt.cloneElement=function(N,$,Ie){if(N==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+N+".");var qe=E({},N.props),ke=N.key,ie=N.ref,_e=N._owner;if($!=null){if($.ref!==void 0&&(ie=$.ref,_e=P.current),$.key!==void 0&&(ke=""+$.key),N.type&&N.type.defaultProps)var pe=N.type.defaultProps;for(Ne in $)I.call($,Ne)&&!O.hasOwnProperty(Ne)&&(qe[Ne]=$[Ne]===void 0&&pe!==void 0?pe[Ne]:$[Ne])}var Ne=arguments.length-2;if(Ne===1)qe.children=Ie;else if(1<Ne){pe=Array(Ne);for(var je=0;je<Ne;je++)pe[je]=arguments[je+2];qe.children=pe}return{$$typeof:s,type:N.type,key:ke,ref:ie,props:qe,_owner:_e}},gt.createContext=function(N){return N={$$typeof:c,_currentValue:N,_currentValue2:N,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},N.Provider={$$typeof:l,_context:N},N.Consumer=N},gt.createElement=T,gt.createFactory=function(N){var $=T.bind(null,N);return $.type=N,$},gt.createRef=function(){return{current:null}},gt.forwardRef=function(N){return{$$typeof:f,render:N}},gt.isValidElement=V,gt.lazy=function(N){return{$$typeof:_,_payload:{_status:-1,_result:N},_init:oe}},gt.memo=function(N,$){return{$$typeof:d,type:N,compare:$===void 0?null:$}},gt.startTransition=function(N){var $=X.transition;X.transition={};try{N()}finally{X.transition=$}},gt.unstable_act=le,gt.useCallback=function(N,$){return ee.current.useCallback(N,$)},gt.useContext=function(N){return ee.current.useContext(N)},gt.useDebugValue=function(){},gt.useDeferredValue=function(N){return ee.current.useDeferredValue(N)},gt.useEffect=function(N,$){return ee.current.useEffect(N,$)},gt.useId=function(){return ee.current.useId()},gt.useImperativeHandle=function(N,$,Ie){return ee.current.useImperativeHandle(N,$,Ie)},gt.useInsertionEffect=function(N,$){return ee.current.useInsertionEffect(N,$)},gt.useLayoutEffect=function(N,$){return ee.current.useLayoutEffect(N,$)},gt.useMemo=function(N,$){return ee.current.useMemo(N,$)},gt.useReducer=function(N,$,Ie){return ee.current.useReducer(N,$,Ie)},gt.useRef=function(N){return ee.current.useRef(N)},gt.useState=function(N){return ee.current.useState(N)},gt.useSyncExternalStore=function(N,$,Ie){return ee.current.useSyncExternalStore(N,$,Ie)},gt.useTransition=function(){return ee.current.useTransition()},gt.version="18.3.1",gt}var Dm;function kh(){return Dm||(Dm=1,nf.exports=Rv()),nf.exports}/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Im;function Cv(){if(Im)return Qa;Im=1;var s=kh(),e=Symbol.for("react.element"),t=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,a=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};function c(f,p,d){var _,v={},g=null,S=null;d!==void 0&&(g=""+d),p.key!==void 0&&(g=""+p.key),p.ref!==void 0&&(S=p.ref);for(_ in p)r.call(p,_)&&!l.hasOwnProperty(_)&&(v[_]=p[_]);if(f&&f.defaultProps)for(_ in p=f.defaultProps,p)v[_]===void 0&&(v[_]=p[_]);return{$$typeof:e,type:f,key:g,ref:S,props:v,_owner:a.current}}return Qa.Fragment=t,Qa.jsx=c,Qa.jsxs=c,Qa}var Nm;function Pv(){return Nm||(Nm=1,tf.exports=Cv()),tf.exports}var u1=Pv(),Lv=kh();const c1=c_(Lv);var wl={},rf={exports:{}},Vn={},sf={exports:{}},af={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Um;function Dv(){return Um||(Um=1,(function(s){function e(X,ae){var le=X.length;X.push(ae);e:for(;0<le;){var N=le-1>>>1,$=X[N];if(0<a($,ae))X[N]=ae,X[le]=$,le=N;else break e}}function t(X){return X.length===0?null:X[0]}function r(X){if(X.length===0)return null;var ae=X[0],le=X.pop();if(le!==ae){X[0]=le;e:for(var N=0,$=X.length,Ie=$>>>1;N<Ie;){var qe=2*(N+1)-1,ke=X[qe],ie=qe+1,_e=X[ie];if(0>a(ke,le))ie<$&&0>a(_e,ke)?(X[N]=_e,X[ie]=le,N=ie):(X[N]=ke,X[qe]=le,N=qe);else if(ie<$&&0>a(_e,le))X[N]=_e,X[ie]=le,N=ie;else break e}}return ae}function a(X,ae){var le=X.sortIndex-ae.sortIndex;return le!==0?le:X.id-ae.id}if(typeof performance=="object"&&typeof performance.now=="function"){var l=performance;s.unstable_now=function(){return l.now()}}else{var c=Date,f=c.now();s.unstable_now=function(){return c.now()-f}}var p=[],d=[],_=1,v=null,g=3,S=!1,E=!1,b=!1,y=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,U=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function F(X){for(var ae=t(d);ae!==null;){if(ae.callback===null)r(d);else if(ae.startTime<=X)r(d),ae.sortIndex=ae.expirationTime,e(p,ae);else break;ae=t(d)}}function R(X){if(b=!1,F(X),!E)if(t(p)!==null)E=!0,oe(I);else{var ae=t(d);ae!==null&&ee(R,ae.startTime-X)}}function I(X,ae){E=!1,b&&(b=!1,x(T),T=-1),S=!0;var le=g;try{for(F(ae),v=t(p);v!==null&&(!(v.expirationTime>ae)||X&&!z());){var N=v.callback;if(typeof N=="function"){v.callback=null,g=v.priorityLevel;var $=N(v.expirationTime<=ae);ae=s.unstable_now(),typeof $=="function"?v.callback=$:v===t(p)&&r(p),F(ae)}else r(p);v=t(p)}if(v!==null)var Ie=!0;else{var qe=t(d);qe!==null&&ee(R,qe.startTime-ae),Ie=!1}return Ie}finally{v=null,g=le,S=!1}}var P=!1,O=null,T=-1,L=5,V=-1;function z(){return!(s.unstable_now()-V<L)}function K(){if(O!==null){var X=s.unstable_now();V=X;var ae=!0;try{ae=O(!0,X)}finally{ae?ce():(P=!1,O=null)}}else P=!1}var ce;if(typeof U=="function")ce=function(){U(K)};else if(typeof MessageChannel<"u"){var he=new MessageChannel,J=he.port2;he.port1.onmessage=K,ce=function(){J.postMessage(null)}}else ce=function(){y(K,0)};function oe(X){O=X,P||(P=!0,ce())}function ee(X,ae){T=y(function(){X(s.unstable_now())},ae)}s.unstable_IdlePriority=5,s.unstable_ImmediatePriority=1,s.unstable_LowPriority=4,s.unstable_NormalPriority=3,s.unstable_Profiling=null,s.unstable_UserBlockingPriority=2,s.unstable_cancelCallback=function(X){X.callback=null},s.unstable_continueExecution=function(){E||S||(E=!0,oe(I))},s.unstable_forceFrameRate=function(X){0>X||125<X?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<X?Math.floor(1e3/X):5},s.unstable_getCurrentPriorityLevel=function(){return g},s.unstable_getFirstCallbackNode=function(){return t(p)},s.unstable_next=function(X){switch(g){case 1:case 2:case 3:var ae=3;break;default:ae=g}var le=g;g=ae;try{return X()}finally{g=le}},s.unstable_pauseExecution=function(){},s.unstable_requestPaint=function(){},s.unstable_runWithPriority=function(X,ae){switch(X){case 1:case 2:case 3:case 4:case 5:break;default:X=3}var le=g;g=X;try{return ae()}finally{g=le}},s.unstable_scheduleCallback=function(X,ae,le){var N=s.unstable_now();switch(typeof le=="object"&&le!==null?(le=le.delay,le=typeof le=="number"&&0<le?N+le:N):le=N,X){case 1:var $=-1;break;case 2:$=250;break;case 5:$=1073741823;break;case 4:$=1e4;break;default:$=5e3}return $=le+$,X={id:_++,callback:ae,priorityLevel:X,startTime:le,expirationTime:$,sortIndex:-1},le>N?(X.sortIndex=le,e(d,X),t(p)===null&&X===t(d)&&(b?(x(T),T=-1):b=!0,ee(R,le-N))):(X.sortIndex=$,e(p,X),E||S||(E=!0,oe(I))),X},s.unstable_shouldYield=z,s.unstable_wrapCallback=function(X){var ae=g;return function(){var le=g;g=ae;try{return X.apply(this,arguments)}finally{g=le}}}})(af)),af}var Fm;function Iv(){return Fm||(Fm=1,sf.exports=Dv()),sf.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Om;function Nv(){if(Om)return Vn;Om=1;var s=kh(),e=Iv();function t(n){for(var i="https://reactjs.org/docs/error-decoder.html?invariant="+n,o=1;o<arguments.length;o++)i+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+n+"; visit "+i+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var r=new Set,a={};function l(n,i){c(n,i),c(n+"Capture",i)}function c(n,i){for(a[n]=i,n=0;n<i.length;n++)r.add(i[n])}var f=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),p=Object.prototype.hasOwnProperty,d=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,_={},v={};function g(n){return p.call(v,n)?!0:p.call(_,n)?!1:d.test(n)?v[n]=!0:(_[n]=!0,!1)}function S(n,i,o,u){if(o!==null&&o.type===0)return!1;switch(typeof i){case"function":case"symbol":return!0;case"boolean":return u?!1:o!==null?!o.acceptsBooleans:(n=n.toLowerCase().slice(0,5),n!=="data-"&&n!=="aria-");default:return!1}}function E(n,i,o,u){if(i===null||typeof i>"u"||S(n,i,o,u))return!0;if(u)return!1;if(o!==null)switch(o.type){case 3:return!i;case 4:return i===!1;case 5:return isNaN(i);case 6:return isNaN(i)||1>i}return!1}function b(n,i,o,u,h,m,w){this.acceptsBooleans=i===2||i===3||i===4,this.attributeName=u,this.attributeNamespace=h,this.mustUseProperty=o,this.propertyName=n,this.type=i,this.sanitizeURL=m,this.removeEmptyString=w}var y={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n){y[n]=new b(n,0,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(n){var i=n[0];y[i]=new b(i,1,!1,n[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(n){y[n]=new b(n,2,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(n){y[n]=new b(n,2,!1,n,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n){y[n]=new b(n,3,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(n){y[n]=new b(n,3,!0,n,null,!1,!1)}),["capture","download"].forEach(function(n){y[n]=new b(n,4,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(function(n){y[n]=new b(n,6,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(function(n){y[n]=new b(n,5,!1,n.toLowerCase(),null,!1,!1)});var x=/[\-:]([a-z])/g;function U(n){return n[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n){var i=n.replace(x,U);y[i]=new b(i,1,!1,n,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n){var i=n.replace(x,U);y[i]=new b(i,1,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(n){var i=n.replace(x,U);y[i]=new b(i,1,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(n){y[n]=new b(n,1,!1,n.toLowerCase(),null,!1,!1)}),y.xlinkHref=new b("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(n){y[n]=new b(n,1,!1,n.toLowerCase(),null,!0,!0)});function F(n,i,o,u){var h=y.hasOwnProperty(i)?y[i]:null;(h!==null?h.type!==0:u||!(2<i.length)||i[0]!=="o"&&i[0]!=="O"||i[1]!=="n"&&i[1]!=="N")&&(E(i,o,h,u)&&(o=null),u||h===null?g(i)&&(o===null?n.removeAttribute(i):n.setAttribute(i,""+o)):h.mustUseProperty?n[h.propertyName]=o===null?h.type===3?!1:"":o:(i=h.attributeName,u=h.attributeNamespace,o===null?n.removeAttribute(i):(h=h.type,o=h===3||h===4&&o===!0?"":""+o,u?n.setAttributeNS(u,i,o):n.setAttribute(i,o))))}var R=s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,I=Symbol.for("react.element"),P=Symbol.for("react.portal"),O=Symbol.for("react.fragment"),T=Symbol.for("react.strict_mode"),L=Symbol.for("react.profiler"),V=Symbol.for("react.provider"),z=Symbol.for("react.context"),K=Symbol.for("react.forward_ref"),ce=Symbol.for("react.suspense"),he=Symbol.for("react.suspense_list"),J=Symbol.for("react.memo"),oe=Symbol.for("react.lazy"),ee=Symbol.for("react.offscreen"),X=Symbol.iterator;function ae(n){return n===null||typeof n!="object"?null:(n=X&&n[X]||n["@@iterator"],typeof n=="function"?n:null)}var le=Object.assign,N;function $(n){if(N===void 0)try{throw Error()}catch(o){var i=o.stack.trim().match(/\n( *(at )?)/);N=i&&i[1]||""}return`
`+N+n}var Ie=!1;function qe(n,i){if(!n||Ie)return"";Ie=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(i)if(i=function(){throw Error()},Object.defineProperty(i.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(i,[])}catch(se){var u=se}Reflect.construct(n,[],i)}else{try{i.call()}catch(se){u=se}n.call(i.prototype)}else{try{throw Error()}catch(se){u=se}n()}}catch(se){if(se&&u&&typeof se.stack=="string"){for(var h=se.stack.split(`
`),m=u.stack.split(`
`),w=h.length-1,D=m.length-1;1<=w&&0<=D&&h[w]!==m[D];)D--;for(;1<=w&&0<=D;w--,D--)if(h[w]!==m[D]){if(w!==1||D!==1)do if(w--,D--,0>D||h[w]!==m[D]){var B=`
`+h[w].replace(" at new "," at ");return n.displayName&&B.includes("<anonymous>")&&(B=B.replace("<anonymous>",n.displayName)),B}while(1<=w&&0<=D);break}}}finally{Ie=!1,Error.prepareStackTrace=o}return(n=n?n.displayName||n.name:"")?$(n):""}function ke(n){switch(n.tag){case 5:return $(n.type);case 16:return $("Lazy");case 13:return $("Suspense");case 19:return $("SuspenseList");case 0:case 2:case 15:return n=qe(n.type,!1),n;case 11:return n=qe(n.type.render,!1),n;case 1:return n=qe(n.type,!0),n;default:return""}}function ie(n){if(n==null)return null;if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n;switch(n){case O:return"Fragment";case P:return"Portal";case L:return"Profiler";case T:return"StrictMode";case ce:return"Suspense";case he:return"SuspenseList"}if(typeof n=="object")switch(n.$$typeof){case z:return(n.displayName||"Context")+".Consumer";case V:return(n._context.displayName||"Context")+".Provider";case K:var i=n.render;return n=n.displayName,n||(n=i.displayName||i.name||"",n=n!==""?"ForwardRef("+n+")":"ForwardRef"),n;case J:return i=n.displayName||null,i!==null?i:ie(n.type)||"Memo";case oe:i=n._payload,n=n._init;try{return ie(n(i))}catch{}}return null}function _e(n){var i=n.type;switch(n.tag){case 24:return"Cache";case 9:return(i.displayName||"Context")+".Consumer";case 10:return(i._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return n=i.render,n=n.displayName||n.name||"",i.displayName||(n!==""?"ForwardRef("+n+")":"ForwardRef");case 7:return"Fragment";case 5:return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ie(i);case 8:return i===T?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof i=="function")return i.displayName||i.name||null;if(typeof i=="string")return i}return null}function pe(n){switch(typeof n){case"boolean":case"number":case"string":case"undefined":return n;case"object":return n;default:return""}}function Ne(n){var i=n.type;return(n=n.nodeName)&&n.toLowerCase()==="input"&&(i==="checkbox"||i==="radio")}function je(n){var i=Ne(n)?"checked":"value",o=Object.getOwnPropertyDescriptor(n.constructor.prototype,i),u=""+n[i];if(!n.hasOwnProperty(i)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var h=o.get,m=o.set;return Object.defineProperty(n,i,{configurable:!0,get:function(){return h.call(this)},set:function(w){u=""+w,m.call(this,w)}}),Object.defineProperty(n,i,{enumerable:o.enumerable}),{getValue:function(){return u},setValue:function(w){u=""+w},stopTracking:function(){n._valueTracker=null,delete n[i]}}}}function Qe(n){n._valueTracker||(n._valueTracker=je(n))}function Ht(n){if(!n)return!1;var i=n._valueTracker;if(!i)return!0;var o=i.getValue(),u="";return n&&(u=Ne(n)?n.checked?"true":"false":n.value),n=u,n!==o?(i.setValue(n),!0):!1}function ct(n){if(n=n||(typeof document<"u"?document:void 0),typeof n>"u")return null;try{return n.activeElement||n.body}catch{return n.body}}function wt(n,i){var o=i.checked;return le({},i,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??n._wrapperState.initialChecked})}function yt(n,i){var o=i.defaultValue==null?"":i.defaultValue,u=i.checked!=null?i.checked:i.defaultChecked;o=pe(i.value!=null?i.value:o),n._wrapperState={initialChecked:u,initialValue:o,controlled:i.type==="checkbox"||i.type==="radio"?i.checked!=null:i.value!=null}}function vt(n,i){i=i.checked,i!=null&&F(n,"checked",i,!1)}function Gt(n,i){vt(n,i);var o=pe(i.value),u=i.type;if(o!=null)u==="number"?(o===0&&n.value===""||n.value!=o)&&(n.value=""+o):n.value!==""+o&&(n.value=""+o);else if(u==="submit"||u==="reset"){n.removeAttribute("value");return}i.hasOwnProperty("value")?jt(n,i.type,o):i.hasOwnProperty("defaultValue")&&jt(n,i.type,pe(i.defaultValue)),i.checked==null&&i.defaultChecked!=null&&(n.defaultChecked=!!i.defaultChecked)}function Jt(n,i,o){if(i.hasOwnProperty("value")||i.hasOwnProperty("defaultValue")){var u=i.type;if(!(u!=="submit"&&u!=="reset"||i.value!==void 0&&i.value!==null))return;i=""+n._wrapperState.initialValue,o||i===n.value||(n.value=i),n.defaultValue=i}o=n.name,o!==""&&(n.name=""),n.defaultChecked=!!n._wrapperState.initialChecked,o!==""&&(n.name=o)}function jt(n,i,o){(i!=="number"||ct(n.ownerDocument)!==n)&&(o==null?n.defaultValue=""+n._wrapperState.initialValue:n.defaultValue!==""+o&&(n.defaultValue=""+o))}var qt=Array.isArray;function Rt(n,i,o,u){if(n=n.options,i){i={};for(var h=0;h<o.length;h++)i["$"+o[h]]=!0;for(o=0;o<n.length;o++)h=i.hasOwnProperty("$"+n[o].value),n[o].selected!==h&&(n[o].selected=h),h&&u&&(n[o].defaultSelected=!0)}else{for(o=""+pe(o),i=null,h=0;h<n.length;h++){if(n[h].value===o){n[h].selected=!0,u&&(n[h].defaultSelected=!0);return}i!==null||n[h].disabled||(i=n[h])}i!==null&&(i.selected=!0)}}function Wt(n,i){if(i.dangerouslySetInnerHTML!=null)throw Error(t(91));return le({},i,{value:void 0,defaultValue:void 0,children:""+n._wrapperState.initialValue})}function G(n,i){var o=i.value;if(o==null){if(o=i.children,i=i.defaultValue,o!=null){if(i!=null)throw Error(t(92));if(qt(o)){if(1<o.length)throw Error(t(93));o=o[0]}i=o}i==null&&(i=""),o=i}n._wrapperState={initialValue:pe(o)}}function mn(n,i){var o=pe(i.value),u=pe(i.defaultValue);o!=null&&(o=""+o,o!==n.value&&(n.value=o),i.defaultValue==null&&n.defaultValue!==o&&(n.defaultValue=o)),u!=null&&(n.defaultValue=""+u)}function Et(n){var i=n.textContent;i===n._wrapperState.initialValue&&i!==""&&i!==null&&(n.value=i)}function C(n){switch(n){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function M(n,i){return n==null||n==="http://www.w3.org/1999/xhtml"?C(i):n==="http://www.w3.org/2000/svg"&&i==="foreignObject"?"http://www.w3.org/1999/xhtml":n}var Y,ne=(function(n){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(i,o,u,h){MSApp.execUnsafeLocalFunction(function(){return n(i,o,u,h)})}:n})(function(n,i){if(n.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in n)n.innerHTML=i;else{for(Y=Y||document.createElement("div"),Y.innerHTML="<svg>"+i.valueOf().toString()+"</svg>",i=Y.firstChild;n.firstChild;)n.removeChild(n.firstChild);for(;i.firstChild;)n.appendChild(i.firstChild)}});function ue(n,i){if(i){var o=n.firstChild;if(o&&o===n.lastChild&&o.nodeType===3){o.nodeValue=i;return}}n.textContent=i}var Se={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},be=["Webkit","ms","Moz","O"];Object.keys(Se).forEach(function(n){be.forEach(function(i){i=i+n.charAt(0).toUpperCase()+n.substring(1),Se[i]=Se[n]})});function fe(n,i,o){return i==null||typeof i=="boolean"||i===""?"":o||typeof i!="number"||i===0||Se.hasOwnProperty(n)&&Se[n]?(""+i).trim():i+"px"}function me(n,i){n=n.style;for(var o in i)if(i.hasOwnProperty(o)){var u=o.indexOf("--")===0,h=fe(o,i[o],u);o==="float"&&(o="cssFloat"),u?n.setProperty(o,h):n[o]=h}}var Ce=le({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Xe(n,i){if(i){if(Ce[n]&&(i.children!=null||i.dangerouslySetInnerHTML!=null))throw Error(t(137,n));if(i.dangerouslySetInnerHTML!=null){if(i.children!=null)throw Error(t(60));if(typeof i.dangerouslySetInnerHTML!="object"||!("__html"in i.dangerouslySetInnerHTML))throw Error(t(61))}if(i.style!=null&&typeof i.style!="object")throw Error(t(62))}}function Pe(n,i){if(n.indexOf("-")===-1)return typeof i.is=="string";switch(n){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ae=null;function Je(n){return n=n.target||n.srcElement||window,n.correspondingUseElement&&(n=n.correspondingUseElement),n.nodeType===3?n.parentNode:n}var et=null,rt=null,k=null;function we(n){if(n=Ba(n)){if(typeof et!="function")throw Error(t(280));var i=n.stateNode;i&&(i=zo(i),et(n.stateNode,n.type,i))}}function de(n){rt?k?k.push(n):k=[n]:rt=n}function Re(){if(rt){var n=rt,i=k;if(k=rt=null,we(n),i)for(n=0;n<i.length;n++)we(i[n])}}function Le(n,i){return n(i)}function ge(){}var He=!1;function ze(n,i,o){if(He)return n(i,o);He=!0;try{return Le(n,i,o)}finally{He=!1,(rt!==null||k!==null)&&(ge(),Re())}}function It(n,i){var o=n.stateNode;if(o===null)return null;var u=zo(o);if(u===null)return null;o=u[i];e:switch(i){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(u=!u.disabled)||(n=n.type,u=!(n==="button"||n==="input"||n==="select"||n==="textarea")),n=!u;break e;default:n=!1}if(n)return null;if(o&&typeof o!="function")throw Error(t(231,i,typeof o));return o}var At=!1;if(f)try{var Sn={};Object.defineProperty(Sn,"passive",{get:function(){At=!0}}),window.addEventListener("test",Sn,Sn),window.removeEventListener("test",Sn,Sn)}catch{At=!1}function Qn(n,i,o,u,h,m,w,D,B){var se=Array.prototype.slice.call(arguments,3);try{i.apply(o,se)}catch(xe){this.onError(xe)}}var Wr=!1,vs=null,Xr=!1,Yr=null,Tu={onError:function(n){Wr=!0,vs=n}};function Mo(n,i,o,u,h,m,w,D,B){Wr=!1,vs=null,Qn.apply(Tu,arguments)}function Eo(n,i,o,u,h,m,w,D,B){if(Mo.apply(this,arguments),Wr){if(Wr){var se=vs;Wr=!1,vs=null}else throw Error(t(198));Xr||(Xr=!0,Yr=se)}}function Cn(n){var i=n,o=n;if(n.alternate)for(;i.return;)i=i.return;else{n=i;do i=n,(i.flags&4098)!==0&&(o=i.return),n=i.return;while(n)}return i.tag===3?o:null}function xs(n){if(n.tag===13){var i=n.memoizedState;if(i===null&&(n=n.alternate,n!==null&&(i=n.memoizedState)),i!==null)return i.dehydrated}return null}function va(n){if(Cn(n)!==n)throw Error(t(188))}function To(n){var i=n.alternate;if(!i){if(i=Cn(n),i===null)throw Error(t(188));return i!==n?null:n}for(var o=n,u=i;;){var h=o.return;if(h===null)break;var m=h.alternate;if(m===null){if(u=h.return,u!==null){o=u;continue}break}if(h.child===m.child){for(m=h.child;m;){if(m===o)return va(h),n;if(m===u)return va(h),i;m=m.sibling}throw Error(t(188))}if(o.return!==u.return)o=h,u=m;else{for(var w=!1,D=h.child;D;){if(D===o){w=!0,o=h,u=m;break}if(D===u){w=!0,u=h,o=m;break}D=D.sibling}if(!w){for(D=m.child;D;){if(D===o){w=!0,o=m,u=h;break}if(D===u){w=!0,u=m,o=h;break}D=D.sibling}if(!w)throw Error(t(189))}}if(o.alternate!==u)throw Error(t(190))}if(o.tag!==3)throw Error(t(188));return o.stateNode.current===o?n:i}function qr(n){return n=To(n),n!==null?xa(n):null}function xa(n){if(n.tag===5||n.tag===6)return n;for(n=n.child;n!==null;){var i=xa(n);if(i!==null)return i;n=n.sibling}return null}var Kr=e.unstable_scheduleCallback,ya=e.unstable_cancelCallback,wo=e.unstable_shouldYield,wu=e.unstable_requestPaint,Kt=e.unstable_now,Au=e.unstable_getCurrentPriorityLevel,Sa=e.unstable_ImmediatePriority,A=e.unstable_UserBlockingPriority,W=e.unstable_NormalPriority,re=e.unstable_LowPriority,Q=e.unstable_IdlePriority,j=null,Te=null;function Oe(n){if(Te&&typeof Te.onCommitFiberRoot=="function")try{Te.onCommitFiberRoot(j,n,void 0,(n.current.flags&128)===128)}catch{}}var Ee=Math.clz32?Math.clz32:ot,Ge=Math.log,$e=Math.LN2;function ot(n){return n>>>=0,n===0?32:31-(Ge(n)/$e|0)|0}var lt=64,Ye=4194304;function St(n){switch(n&-n){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return n&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return n}}function Ot(n,i){var o=n.pendingLanes;if(o===0)return 0;var u=0,h=n.suspendedLanes,m=n.pingedLanes,w=o&268435455;if(w!==0){var D=w&~h;D!==0?u=St(D):(m&=w,m!==0&&(u=St(m)))}else w=o&~h,w!==0?u=St(w):m!==0&&(u=St(m));if(u===0)return 0;if(i!==0&&i!==u&&(i&h)===0&&(h=u&-u,m=i&-i,h>=m||h===16&&(m&4194240)!==0))return i;if((u&4)!==0&&(u|=o&16),i=n.entangledLanes,i!==0)for(n=n.entanglements,i&=u;0<i;)o=31-Ee(i),h=1<<o,u|=n[o],i&=~h;return u}function Xt(n,i){switch(n){case 1:case 2:case 4:return i+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return i+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ct(n,i){for(var o=n.suspendedLanes,u=n.pingedLanes,h=n.expirationTimes,m=n.pendingLanes;0<m;){var w=31-Ee(m),D=1<<w,B=h[w];B===-1?((D&o)===0||(D&u)!==0)&&(h[w]=Xt(D,i)):B<=i&&(n.expiredLanes|=D),m&=~D}}function nn(n){return n=n.pendingLanes&-1073741825,n!==0?n:n&1073741824?1073741824:0}function Ue(){var n=lt;return lt<<=1,(lt&4194240)===0&&(lt=64),n}function gn(n){for(var i=[],o=0;31>o;o++)i.push(n);return i}function dt(n,i,o){n.pendingLanes|=i,i!==536870912&&(n.suspendedLanes=0,n.pingedLanes=0),n=n.eventTimes,i=31-Ee(i),n[i]=o}function Nn(n,i){var o=n.pendingLanes&~i;n.pendingLanes=i,n.suspendedLanes=0,n.pingedLanes=0,n.expiredLanes&=i,n.mutableReadLanes&=i,n.entangledLanes&=i,i=n.entanglements;var u=n.eventTimes;for(n=n.expirationTimes;0<o;){var h=31-Ee(o),m=1<<h;i[h]=0,u[h]=-1,n[h]=-1,o&=~m}}function Un(n,i){var o=n.entangledLanes|=i;for(n=n.entanglements;o;){var u=31-Ee(o),h=1<<u;h&i|n[u]&i&&(n[u]|=i),o&=~h}}var mt=0;function Vi(n){return n&=-n,1<n?4<n?(n&268435455)!==0?16:536870912:4:1}var bt,kt,di,Pt,pi,Ri=!1,$r=[],hr=null,dr=null,pr=null,Ma=new Map,Ea=new Map,mr=[],Z_="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function pd(n,i){switch(n){case"focusin":case"focusout":hr=null;break;case"dragenter":case"dragleave":dr=null;break;case"mouseover":case"mouseout":pr=null;break;case"pointerover":case"pointerout":Ma.delete(i.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ea.delete(i.pointerId)}}function Ta(n,i,o,u,h,m){return n===null||n.nativeEvent!==m?(n={blockedOn:i,domEventName:o,eventSystemFlags:u,nativeEvent:m,targetContainers:[h]},i!==null&&(i=Ba(i),i!==null&&kt(i)),n):(n.eventSystemFlags|=u,i=n.targetContainers,h!==null&&i.indexOf(h)===-1&&i.push(h),n)}function J_(n,i,o,u,h){switch(i){case"focusin":return hr=Ta(hr,n,i,o,u,h),!0;case"dragenter":return dr=Ta(dr,n,i,o,u,h),!0;case"mouseover":return pr=Ta(pr,n,i,o,u,h),!0;case"pointerover":var m=h.pointerId;return Ma.set(m,Ta(Ma.get(m)||null,n,i,o,u,h)),!0;case"gotpointercapture":return m=h.pointerId,Ea.set(m,Ta(Ea.get(m)||null,n,i,o,u,h)),!0}return!1}function md(n){var i=Zr(n.target);if(i!==null){var o=Cn(i);if(o!==null){if(i=o.tag,i===13){if(i=xs(o),i!==null){n.blockedOn=i,pi(n.priority,function(){di(o)});return}}else if(i===3&&o.stateNode.current.memoizedState.isDehydrated){n.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}n.blockedOn=null}function Ao(n){if(n.blockedOn!==null)return!1;for(var i=n.targetContainers;0<i.length;){var o=Ru(n.domEventName,n.eventSystemFlags,i[0],n.nativeEvent);if(o===null){o=n.nativeEvent;var u=new o.constructor(o.type,o);Ae=u,o.target.dispatchEvent(u),Ae=null}else return i=Ba(o),i!==null&&kt(i),n.blockedOn=o,!1;i.shift()}return!0}function gd(n,i,o){Ao(n)&&o.delete(i)}function j_(){Ri=!1,hr!==null&&Ao(hr)&&(hr=null),dr!==null&&Ao(dr)&&(dr=null),pr!==null&&Ao(pr)&&(pr=null),Ma.forEach(gd),Ea.forEach(gd)}function wa(n,i){n.blockedOn===i&&(n.blockedOn=null,Ri||(Ri=!0,e.unstable_scheduleCallback(e.unstable_NormalPriority,j_)))}function Aa(n){function i(h){return wa(h,n)}if(0<$r.length){wa($r[0],n);for(var o=1;o<$r.length;o++){var u=$r[o];u.blockedOn===n&&(u.blockedOn=null)}}for(hr!==null&&wa(hr,n),dr!==null&&wa(dr,n),pr!==null&&wa(pr,n),Ma.forEach(i),Ea.forEach(i),o=0;o<mr.length;o++)u=mr[o],u.blockedOn===n&&(u.blockedOn=null);for(;0<mr.length&&(o=mr[0],o.blockedOn===null);)md(o),o.blockedOn===null&&mr.shift()}var ys=R.ReactCurrentBatchConfig,bo=!0;function Q_(n,i,o,u){var h=mt,m=ys.transition;ys.transition=null;try{mt=1,bu(n,i,o,u)}finally{mt=h,ys.transition=m}}function e0(n,i,o,u){var h=mt,m=ys.transition;ys.transition=null;try{mt=4,bu(n,i,o,u)}finally{mt=h,ys.transition=m}}function bu(n,i,o,u){if(bo){var h=Ru(n,i,o,u);if(h===null)Xu(n,i,u,Ro,o),pd(n,u);else if(J_(h,n,i,o,u))u.stopPropagation();else if(pd(n,u),i&4&&-1<Z_.indexOf(n)){for(;h!==null;){var m=Ba(h);if(m!==null&&bt(m),m=Ru(n,i,o,u),m===null&&Xu(n,i,u,Ro,o),m===h)break;h=m}h!==null&&u.stopPropagation()}else Xu(n,i,u,null,o)}}var Ro=null;function Ru(n,i,o,u){if(Ro=null,n=Je(u),n=Zr(n),n!==null)if(i=Cn(n),i===null)n=null;else if(o=i.tag,o===13){if(n=xs(i),n!==null)return n;n=null}else if(o===3){if(i.stateNode.current.memoizedState.isDehydrated)return i.tag===3?i.stateNode.containerInfo:null;n=null}else i!==n&&(n=null);return Ro=n,null}function _d(n){switch(n){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Au()){case Sa:return 1;case A:return 4;case W:case re:return 16;case Q:return 536870912;default:return 16}default:return 16}}var gr=null,Cu=null,Co=null;function vd(){if(Co)return Co;var n,i=Cu,o=i.length,u,h="value"in gr?gr.value:gr.textContent,m=h.length;for(n=0;n<o&&i[n]===h[n];n++);var w=o-n;for(u=1;u<=w&&i[o-u]===h[m-u];u++);return Co=h.slice(n,1<u?1-u:void 0)}function Po(n){var i=n.keyCode;return"charCode"in n?(n=n.charCode,n===0&&i===13&&(n=13)):n=i,n===10&&(n=13),32<=n||n===13?n:0}function Lo(){return!0}function xd(){return!1}function Xn(n){function i(o,u,h,m,w){this._reactName=o,this._targetInst=h,this.type=u,this.nativeEvent=m,this.target=w,this.currentTarget=null;for(var D in n)n.hasOwnProperty(D)&&(o=n[D],this[D]=o?o(m):m[D]);return this.isDefaultPrevented=(m.defaultPrevented!=null?m.defaultPrevented:m.returnValue===!1)?Lo:xd,this.isPropagationStopped=xd,this}return le(i.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=Lo)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=Lo)},persist:function(){},isPersistent:Lo}),i}var Ss={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(n){return n.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Pu=Xn(Ss),ba=le({},Ss,{view:0,detail:0}),t0=Xn(ba),Lu,Du,Ra,Do=le({},ba,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Nu,button:0,buttons:0,relatedTarget:function(n){return n.relatedTarget===void 0?n.fromElement===n.srcElement?n.toElement:n.fromElement:n.relatedTarget},movementX:function(n){return"movementX"in n?n.movementX:(n!==Ra&&(Ra&&n.type==="mousemove"?(Lu=n.screenX-Ra.screenX,Du=n.screenY-Ra.screenY):Du=Lu=0,Ra=n),Lu)},movementY:function(n){return"movementY"in n?n.movementY:Du}}),yd=Xn(Do),n0=le({},Do,{dataTransfer:0}),i0=Xn(n0),r0=le({},ba,{relatedTarget:0}),Iu=Xn(r0),s0=le({},Ss,{animationName:0,elapsedTime:0,pseudoElement:0}),a0=Xn(s0),o0=le({},Ss,{clipboardData:function(n){return"clipboardData"in n?n.clipboardData:window.clipboardData}}),l0=Xn(o0),u0=le({},Ss,{data:0}),Sd=Xn(u0),c0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},f0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},h0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function d0(n){var i=this.nativeEvent;return i.getModifierState?i.getModifierState(n):(n=h0[n])?!!i[n]:!1}function Nu(){return d0}var p0=le({},ba,{key:function(n){if(n.key){var i=c0[n.key]||n.key;if(i!=="Unidentified")return i}return n.type==="keypress"?(n=Po(n),n===13?"Enter":String.fromCharCode(n)):n.type==="keydown"||n.type==="keyup"?f0[n.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Nu,charCode:function(n){return n.type==="keypress"?Po(n):0},keyCode:function(n){return n.type==="keydown"||n.type==="keyup"?n.keyCode:0},which:function(n){return n.type==="keypress"?Po(n):n.type==="keydown"||n.type==="keyup"?n.keyCode:0}}),m0=Xn(p0),g0=le({},Do,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Md=Xn(g0),_0=le({},ba,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Nu}),v0=Xn(_0),x0=le({},Ss,{propertyName:0,elapsedTime:0,pseudoElement:0}),y0=Xn(x0),S0=le({},Do,{deltaX:function(n){return"deltaX"in n?n.deltaX:"wheelDeltaX"in n?-n.wheelDeltaX:0},deltaY:function(n){return"deltaY"in n?n.deltaY:"wheelDeltaY"in n?-n.wheelDeltaY:"wheelDelta"in n?-n.wheelDelta:0},deltaZ:0,deltaMode:0}),M0=Xn(S0),E0=[9,13,27,32],Uu=f&&"CompositionEvent"in window,Ca=null;f&&"documentMode"in document&&(Ca=document.documentMode);var T0=f&&"TextEvent"in window&&!Ca,Ed=f&&(!Uu||Ca&&8<Ca&&11>=Ca),Td=" ",wd=!1;function Ad(n,i){switch(n){case"keyup":return E0.indexOf(i.keyCode)!==-1;case"keydown":return i.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function bd(n){return n=n.detail,typeof n=="object"&&"data"in n?n.data:null}var Ms=!1;function w0(n,i){switch(n){case"compositionend":return bd(i);case"keypress":return i.which!==32?null:(wd=!0,Td);case"textInput":return n=i.data,n===Td&&wd?null:n;default:return null}}function A0(n,i){if(Ms)return n==="compositionend"||!Uu&&Ad(n,i)?(n=vd(),Co=Cu=gr=null,Ms=!1,n):null;switch(n){case"paste":return null;case"keypress":if(!(i.ctrlKey||i.altKey||i.metaKey)||i.ctrlKey&&i.altKey){if(i.char&&1<i.char.length)return i.char;if(i.which)return String.fromCharCode(i.which)}return null;case"compositionend":return Ed&&i.locale!=="ko"?null:i.data;default:return null}}var b0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rd(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i==="input"?!!b0[n.type]:i==="textarea"}function Cd(n,i,o,u){de(u),i=Oo(i,"onChange"),0<i.length&&(o=new Pu("onChange","change",null,o,u),n.push({event:o,listeners:i}))}var Pa=null,La=null;function R0(n){qd(n,0)}function Io(n){var i=bs(n);if(Ht(i))return n}function C0(n,i){if(n==="change")return i}var Pd=!1;if(f){var Fu;if(f){var Ou="oninput"in document;if(!Ou){var Ld=document.createElement("div");Ld.setAttribute("oninput","return;"),Ou=typeof Ld.oninput=="function"}Fu=Ou}else Fu=!1;Pd=Fu&&(!document.documentMode||9<document.documentMode)}function Dd(){Pa&&(Pa.detachEvent("onpropertychange",Id),La=Pa=null)}function Id(n){if(n.propertyName==="value"&&Io(La)){var i=[];Cd(i,La,n,Je(n)),ze(R0,i)}}function P0(n,i,o){n==="focusin"?(Dd(),Pa=i,La=o,Pa.attachEvent("onpropertychange",Id)):n==="focusout"&&Dd()}function L0(n){if(n==="selectionchange"||n==="keyup"||n==="keydown")return Io(La)}function D0(n,i){if(n==="click")return Io(i)}function I0(n,i){if(n==="input"||n==="change")return Io(i)}function N0(n,i){return n===i&&(n!==0||1/n===1/i)||n!==n&&i!==i}var mi=typeof Object.is=="function"?Object.is:N0;function Da(n,i){if(mi(n,i))return!0;if(typeof n!="object"||n===null||typeof i!="object"||i===null)return!1;var o=Object.keys(n),u=Object.keys(i);if(o.length!==u.length)return!1;for(u=0;u<o.length;u++){var h=o[u];if(!p.call(i,h)||!mi(n[h],i[h]))return!1}return!0}function Nd(n){for(;n&&n.firstChild;)n=n.firstChild;return n}function Ud(n,i){var o=Nd(n);n=0;for(var u;o;){if(o.nodeType===3){if(u=n+o.textContent.length,n<=i&&u>=i)return{node:o,offset:i-n};n=u}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=Nd(o)}}function Fd(n,i){return n&&i?n===i?!0:n&&n.nodeType===3?!1:i&&i.nodeType===3?Fd(n,i.parentNode):"contains"in n?n.contains(i):n.compareDocumentPosition?!!(n.compareDocumentPosition(i)&16):!1:!1}function Od(){for(var n=window,i=ct();i instanceof n.HTMLIFrameElement;){try{var o=typeof i.contentWindow.location.href=="string"}catch{o=!1}if(o)n=i.contentWindow;else break;i=ct(n.document)}return i}function Bu(n){var i=n&&n.nodeName&&n.nodeName.toLowerCase();return i&&(i==="input"&&(n.type==="text"||n.type==="search"||n.type==="tel"||n.type==="url"||n.type==="password")||i==="textarea"||n.contentEditable==="true")}function U0(n){var i=Od(),o=n.focusedElem,u=n.selectionRange;if(i!==o&&o&&o.ownerDocument&&Fd(o.ownerDocument.documentElement,o)){if(u!==null&&Bu(o)){if(i=u.start,n=u.end,n===void 0&&(n=i),"selectionStart"in o)o.selectionStart=i,o.selectionEnd=Math.min(n,o.value.length);else if(n=(i=o.ownerDocument||document)&&i.defaultView||window,n.getSelection){n=n.getSelection();var h=o.textContent.length,m=Math.min(u.start,h);u=u.end===void 0?m:Math.min(u.end,h),!n.extend&&m>u&&(h=u,u=m,m=h),h=Ud(o,m);var w=Ud(o,u);h&&w&&(n.rangeCount!==1||n.anchorNode!==h.node||n.anchorOffset!==h.offset||n.focusNode!==w.node||n.focusOffset!==w.offset)&&(i=i.createRange(),i.setStart(h.node,h.offset),n.removeAllRanges(),m>u?(n.addRange(i),n.extend(w.node,w.offset)):(i.setEnd(w.node,w.offset),n.addRange(i)))}}for(i=[],n=o;n=n.parentNode;)n.nodeType===1&&i.push({element:n,left:n.scrollLeft,top:n.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<i.length;o++)n=i[o],n.element.scrollLeft=n.left,n.element.scrollTop=n.top}}var F0=f&&"documentMode"in document&&11>=document.documentMode,Es=null,ku=null,Ia=null,zu=!1;function Bd(n,i,o){var u=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;zu||Es==null||Es!==ct(u)||(u=Es,"selectionStart"in u&&Bu(u)?u={start:u.selectionStart,end:u.selectionEnd}:(u=(u.ownerDocument&&u.ownerDocument.defaultView||window).getSelection(),u={anchorNode:u.anchorNode,anchorOffset:u.anchorOffset,focusNode:u.focusNode,focusOffset:u.focusOffset}),Ia&&Da(Ia,u)||(Ia=u,u=Oo(ku,"onSelect"),0<u.length&&(i=new Pu("onSelect","select",null,i,o),n.push({event:i,listeners:u}),i.target=Es)))}function No(n,i){var o={};return o[n.toLowerCase()]=i.toLowerCase(),o["Webkit"+n]="webkit"+i,o["Moz"+n]="moz"+i,o}var Ts={animationend:No("Animation","AnimationEnd"),animationiteration:No("Animation","AnimationIteration"),animationstart:No("Animation","AnimationStart"),transitionend:No("Transition","TransitionEnd")},Vu={},kd={};f&&(kd=document.createElement("div").style,"AnimationEvent"in window||(delete Ts.animationend.animation,delete Ts.animationiteration.animation,delete Ts.animationstart.animation),"TransitionEvent"in window||delete Ts.transitionend.transition);function Uo(n){if(Vu[n])return Vu[n];if(!Ts[n])return n;var i=Ts[n],o;for(o in i)if(i.hasOwnProperty(o)&&o in kd)return Vu[n]=i[o];return n}var zd=Uo("animationend"),Vd=Uo("animationiteration"),Hd=Uo("animationstart"),Gd=Uo("transitionend"),Wd=new Map,Xd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function _r(n,i){Wd.set(n,i),l(i,[n])}for(var Hu=0;Hu<Xd.length;Hu++){var Gu=Xd[Hu],O0=Gu.toLowerCase(),B0=Gu[0].toUpperCase()+Gu.slice(1);_r(O0,"on"+B0)}_r(zd,"onAnimationEnd"),_r(Vd,"onAnimationIteration"),_r(Hd,"onAnimationStart"),_r("dblclick","onDoubleClick"),_r("focusin","onFocus"),_r("focusout","onBlur"),_r(Gd,"onTransitionEnd"),c("onMouseEnter",["mouseout","mouseover"]),c("onMouseLeave",["mouseout","mouseover"]),c("onPointerEnter",["pointerout","pointerover"]),c("onPointerLeave",["pointerout","pointerover"]),l("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),l("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),l("onBeforeInput",["compositionend","keypress","textInput","paste"]),l("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),l("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Na="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),k0=new Set("cancel close invalid load scroll toggle".split(" ").concat(Na));function Yd(n,i,o){var u=n.type||"unknown-event";n.currentTarget=o,Eo(u,i,void 0,n),n.currentTarget=null}function qd(n,i){i=(i&4)!==0;for(var o=0;o<n.length;o++){var u=n[o],h=u.event;u=u.listeners;e:{var m=void 0;if(i)for(var w=u.length-1;0<=w;w--){var D=u[w],B=D.instance,se=D.currentTarget;if(D=D.listener,B!==m&&h.isPropagationStopped())break e;Yd(h,D,se),m=B}else for(w=0;w<u.length;w++){if(D=u[w],B=D.instance,se=D.currentTarget,D=D.listener,B!==m&&h.isPropagationStopped())break e;Yd(h,D,se),m=B}}}if(Xr)throw n=Yr,Xr=!1,Yr=null,n}function zt(n,i){var o=i[Ju];o===void 0&&(o=i[Ju]=new Set);var u=n+"__bubble";o.has(u)||(Kd(i,n,2,!1),o.add(u))}function Wu(n,i,o){var u=0;i&&(u|=4),Kd(o,n,u,i)}var Fo="_reactListening"+Math.random().toString(36).slice(2);function Ua(n){if(!n[Fo]){n[Fo]=!0,r.forEach(function(o){o!=="selectionchange"&&(k0.has(o)||Wu(o,!1,n),Wu(o,!0,n))});var i=n.nodeType===9?n:n.ownerDocument;i===null||i[Fo]||(i[Fo]=!0,Wu("selectionchange",!1,i))}}function Kd(n,i,o,u){switch(_d(i)){case 1:var h=Q_;break;case 4:h=e0;break;default:h=bu}o=h.bind(null,i,o,n),h=void 0,!At||i!=="touchstart"&&i!=="touchmove"&&i!=="wheel"||(h=!0),u?h!==void 0?n.addEventListener(i,o,{capture:!0,passive:h}):n.addEventListener(i,o,!0):h!==void 0?n.addEventListener(i,o,{passive:h}):n.addEventListener(i,o,!1)}function Xu(n,i,o,u,h){var m=u;if((i&1)===0&&(i&2)===0&&u!==null)e:for(;;){if(u===null)return;var w=u.tag;if(w===3||w===4){var D=u.stateNode.containerInfo;if(D===h||D.nodeType===8&&D.parentNode===h)break;if(w===4)for(w=u.return;w!==null;){var B=w.tag;if((B===3||B===4)&&(B=w.stateNode.containerInfo,B===h||B.nodeType===8&&B.parentNode===h))return;w=w.return}for(;D!==null;){if(w=Zr(D),w===null)return;if(B=w.tag,B===5||B===6){u=m=w;continue e}D=D.parentNode}}u=u.return}ze(function(){var se=m,xe=Je(o),ye=[];e:{var ve=Wd.get(n);if(ve!==void 0){var Fe=Pu,Ve=n;switch(n){case"keypress":if(Po(o)===0)break e;case"keydown":case"keyup":Fe=m0;break;case"focusin":Ve="focus",Fe=Iu;break;case"focusout":Ve="blur",Fe=Iu;break;case"beforeblur":case"afterblur":Fe=Iu;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Fe=yd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Fe=i0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Fe=v0;break;case zd:case Vd:case Hd:Fe=a0;break;case Gd:Fe=y0;break;case"scroll":Fe=t0;break;case"wheel":Fe=M0;break;case"copy":case"cut":case"paste":Fe=l0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Fe=Md}var We=(i&4)!==0,en=!We&&n==="scroll",Z=We?ve!==null?ve+"Capture":null:ve;We=[];for(var H=se,te;H!==null;){te=H;var Me=te.stateNode;if(te.tag===5&&Me!==null&&(te=Me,Z!==null&&(Me=It(H,Z),Me!=null&&We.push(Fa(H,Me,te)))),en)break;H=H.return}0<We.length&&(ve=new Fe(ve,Ve,null,o,xe),ye.push({event:ve,listeners:We}))}}if((i&7)===0){e:{if(ve=n==="mouseover"||n==="pointerover",Fe=n==="mouseout"||n==="pointerout",ve&&o!==Ae&&(Ve=o.relatedTarget||o.fromElement)&&(Zr(Ve)||Ve[Hi]))break e;if((Fe||ve)&&(ve=xe.window===xe?xe:(ve=xe.ownerDocument)?ve.defaultView||ve.parentWindow:window,Fe?(Ve=o.relatedTarget||o.toElement,Fe=se,Ve=Ve?Zr(Ve):null,Ve!==null&&(en=Cn(Ve),Ve!==en||Ve.tag!==5&&Ve.tag!==6)&&(Ve=null)):(Fe=null,Ve=se),Fe!==Ve)){if(We=yd,Me="onMouseLeave",Z="onMouseEnter",H="mouse",(n==="pointerout"||n==="pointerover")&&(We=Md,Me="onPointerLeave",Z="onPointerEnter",H="pointer"),en=Fe==null?ve:bs(Fe),te=Ve==null?ve:bs(Ve),ve=new We(Me,H+"leave",Fe,o,xe),ve.target=en,ve.relatedTarget=te,Me=null,Zr(xe)===se&&(We=new We(Z,H+"enter",Ve,o,xe),We.target=te,We.relatedTarget=en,Me=We),en=Me,Fe&&Ve)t:{for(We=Fe,Z=Ve,H=0,te=We;te;te=ws(te))H++;for(te=0,Me=Z;Me;Me=ws(Me))te++;for(;0<H-te;)We=ws(We),H--;for(;0<te-H;)Z=ws(Z),te--;for(;H--;){if(We===Z||Z!==null&&We===Z.alternate)break t;We=ws(We),Z=ws(Z)}We=null}else We=null;Fe!==null&&$d(ye,ve,Fe,We,!1),Ve!==null&&en!==null&&$d(ye,en,Ve,We,!0)}}e:{if(ve=se?bs(se):window,Fe=ve.nodeName&&ve.nodeName.toLowerCase(),Fe==="select"||Fe==="input"&&ve.type==="file")var Ke=C0;else if(Rd(ve))if(Pd)Ke=I0;else{Ke=L0;var tt=P0}else(Fe=ve.nodeName)&&Fe.toLowerCase()==="input"&&(ve.type==="checkbox"||ve.type==="radio")&&(Ke=D0);if(Ke&&(Ke=Ke(n,se))){Cd(ye,Ke,o,xe);break e}tt&&tt(n,ve,se),n==="focusout"&&(tt=ve._wrapperState)&&tt.controlled&&ve.type==="number"&&jt(ve,"number",ve.value)}switch(tt=se?bs(se):window,n){case"focusin":(Rd(tt)||tt.contentEditable==="true")&&(Es=tt,ku=se,Ia=null);break;case"focusout":Ia=ku=Es=null;break;case"mousedown":zu=!0;break;case"contextmenu":case"mouseup":case"dragend":zu=!1,Bd(ye,o,xe);break;case"selectionchange":if(F0)break;case"keydown":case"keyup":Bd(ye,o,xe)}var nt;if(Uu)e:{switch(n){case"compositionstart":var at="onCompositionStart";break e;case"compositionend":at="onCompositionEnd";break e;case"compositionupdate":at="onCompositionUpdate";break e}at=void 0}else Ms?Ad(n,o)&&(at="onCompositionEnd"):n==="keydown"&&o.keyCode===229&&(at="onCompositionStart");at&&(Ed&&o.locale!=="ko"&&(Ms||at!=="onCompositionStart"?at==="onCompositionEnd"&&Ms&&(nt=vd()):(gr=xe,Cu="value"in gr?gr.value:gr.textContent,Ms=!0)),tt=Oo(se,at),0<tt.length&&(at=new Sd(at,n,null,o,xe),ye.push({event:at,listeners:tt}),nt?at.data=nt:(nt=bd(o),nt!==null&&(at.data=nt)))),(nt=T0?w0(n,o):A0(n,o))&&(se=Oo(se,"onBeforeInput"),0<se.length&&(xe=new Sd("onBeforeInput","beforeinput",null,o,xe),ye.push({event:xe,listeners:se}),xe.data=nt))}qd(ye,i)})}function Fa(n,i,o){return{instance:n,listener:i,currentTarget:o}}function Oo(n,i){for(var o=i+"Capture",u=[];n!==null;){var h=n,m=h.stateNode;h.tag===5&&m!==null&&(h=m,m=It(n,o),m!=null&&u.unshift(Fa(n,m,h)),m=It(n,i),m!=null&&u.push(Fa(n,m,h))),n=n.return}return u}function ws(n){if(n===null)return null;do n=n.return;while(n&&n.tag!==5);return n||null}function $d(n,i,o,u,h){for(var m=i._reactName,w=[];o!==null&&o!==u;){var D=o,B=D.alternate,se=D.stateNode;if(B!==null&&B===u)break;D.tag===5&&se!==null&&(D=se,h?(B=It(o,m),B!=null&&w.unshift(Fa(o,B,D))):h||(B=It(o,m),B!=null&&w.push(Fa(o,B,D)))),o=o.return}w.length!==0&&n.push({event:i,listeners:w})}var z0=/\r\n?/g,V0=/\u0000|\uFFFD/g;function Zd(n){return(typeof n=="string"?n:""+n).replace(z0,`
`).replace(V0,"")}function Bo(n,i,o){if(i=Zd(i),Zd(n)!==i&&o)throw Error(t(425))}function ko(){}var Yu=null,qu=null;function Ku(n,i){return n==="textarea"||n==="noscript"||typeof i.children=="string"||typeof i.children=="number"||typeof i.dangerouslySetInnerHTML=="object"&&i.dangerouslySetInnerHTML!==null&&i.dangerouslySetInnerHTML.__html!=null}var $u=typeof setTimeout=="function"?setTimeout:void 0,H0=typeof clearTimeout=="function"?clearTimeout:void 0,Jd=typeof Promise=="function"?Promise:void 0,G0=typeof queueMicrotask=="function"?queueMicrotask:typeof Jd<"u"?function(n){return Jd.resolve(null).then(n).catch(W0)}:$u;function W0(n){setTimeout(function(){throw n})}function Zu(n,i){var o=i,u=0;do{var h=o.nextSibling;if(n.removeChild(o),h&&h.nodeType===8)if(o=h.data,o==="/$"){if(u===0){n.removeChild(h),Aa(i);return}u--}else o!=="$"&&o!=="$?"&&o!=="$!"||u++;o=h}while(o);Aa(i)}function vr(n){for(;n!=null;n=n.nextSibling){var i=n.nodeType;if(i===1||i===3)break;if(i===8){if(i=n.data,i==="$"||i==="$!"||i==="$?")break;if(i==="/$")return null}}return n}function jd(n){n=n.previousSibling;for(var i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="$"||o==="$!"||o==="$?"){if(i===0)return n;i--}else o==="/$"&&i++}n=n.previousSibling}return null}var As=Math.random().toString(36).slice(2),Ci="__reactFiber$"+As,Oa="__reactProps$"+As,Hi="__reactContainer$"+As,Ju="__reactEvents$"+As,X0="__reactListeners$"+As,Y0="__reactHandles$"+As;function Zr(n){var i=n[Ci];if(i)return i;for(var o=n.parentNode;o;){if(i=o[Hi]||o[Ci]){if(o=i.alternate,i.child!==null||o!==null&&o.child!==null)for(n=jd(n);n!==null;){if(o=n[Ci])return o;n=jd(n)}return i}n=o,o=n.parentNode}return null}function Ba(n){return n=n[Ci]||n[Hi],!n||n.tag!==5&&n.tag!==6&&n.tag!==13&&n.tag!==3?null:n}function bs(n){if(n.tag===5||n.tag===6)return n.stateNode;throw Error(t(33))}function zo(n){return n[Oa]||null}var ju=[],Rs=-1;function xr(n){return{current:n}}function Vt(n){0>Rs||(n.current=ju[Rs],ju[Rs]=null,Rs--)}function Bt(n,i){Rs++,ju[Rs]=n.current,n.current=i}var yr={},Mn=xr(yr),Fn=xr(!1),Jr=yr;function Cs(n,i){var o=n.type.contextTypes;if(!o)return yr;var u=n.stateNode;if(u&&u.__reactInternalMemoizedUnmaskedChildContext===i)return u.__reactInternalMemoizedMaskedChildContext;var h={},m;for(m in o)h[m]=i[m];return u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=i,n.__reactInternalMemoizedMaskedChildContext=h),h}function On(n){return n=n.childContextTypes,n!=null}function Vo(){Vt(Fn),Vt(Mn)}function Qd(n,i,o){if(Mn.current!==yr)throw Error(t(168));Bt(Mn,i),Bt(Fn,o)}function ep(n,i,o){var u=n.stateNode;if(i=i.childContextTypes,typeof u.getChildContext!="function")return o;u=u.getChildContext();for(var h in u)if(!(h in i))throw Error(t(108,_e(n)||"Unknown",h));return le({},o,u)}function Ho(n){return n=(n=n.stateNode)&&n.__reactInternalMemoizedMergedChildContext||yr,Jr=Mn.current,Bt(Mn,n),Bt(Fn,Fn.current),!0}function tp(n,i,o){var u=n.stateNode;if(!u)throw Error(t(169));o?(n=ep(n,i,Jr),u.__reactInternalMemoizedMergedChildContext=n,Vt(Fn),Vt(Mn),Bt(Mn,n)):Vt(Fn),Bt(Fn,o)}var Gi=null,Go=!1,Qu=!1;function np(n){Gi===null?Gi=[n]:Gi.push(n)}function q0(n){Go=!0,np(n)}function Sr(){if(!Qu&&Gi!==null){Qu=!0;var n=0,i=mt;try{var o=Gi;for(mt=1;n<o.length;n++){var u=o[n];do u=u(!0);while(u!==null)}Gi=null,Go=!1}catch(h){throw Gi!==null&&(Gi=Gi.slice(n+1)),Kr(Sa,Sr),h}finally{mt=i,Qu=!1}}return null}var Ps=[],Ls=0,Wo=null,Xo=0,ei=[],ti=0,jr=null,Wi=1,Xi="";function Qr(n,i){Ps[Ls++]=Xo,Ps[Ls++]=Wo,Wo=n,Xo=i}function ip(n,i,o){ei[ti++]=Wi,ei[ti++]=Xi,ei[ti++]=jr,jr=n;var u=Wi;n=Xi;var h=32-Ee(u)-1;u&=~(1<<h),o+=1;var m=32-Ee(i)+h;if(30<m){var w=h-h%5;m=(u&(1<<w)-1).toString(32),u>>=w,h-=w,Wi=1<<32-Ee(i)+h|o<<h|u,Xi=m+n}else Wi=1<<m|o<<h|u,Xi=n}function ec(n){n.return!==null&&(Qr(n,1),ip(n,1,0))}function tc(n){for(;n===Wo;)Wo=Ps[--Ls],Ps[Ls]=null,Xo=Ps[--Ls],Ps[Ls]=null;for(;n===jr;)jr=ei[--ti],ei[ti]=null,Xi=ei[--ti],ei[ti]=null,Wi=ei[--ti],ei[ti]=null}var Yn=null,qn=null,Yt=!1,gi=null;function rp(n,i){var o=si(5,null,null,0);o.elementType="DELETED",o.stateNode=i,o.return=n,i=n.deletions,i===null?(n.deletions=[o],n.flags|=16):i.push(o)}function sp(n,i){switch(n.tag){case 5:var o=n.type;return i=i.nodeType!==1||o.toLowerCase()!==i.nodeName.toLowerCase()?null:i,i!==null?(n.stateNode=i,Yn=n,qn=vr(i.firstChild),!0):!1;case 6:return i=n.pendingProps===""||i.nodeType!==3?null:i,i!==null?(n.stateNode=i,Yn=n,qn=null,!0):!1;case 13:return i=i.nodeType!==8?null:i,i!==null?(o=jr!==null?{id:Wi,overflow:Xi}:null,n.memoizedState={dehydrated:i,treeContext:o,retryLane:1073741824},o=si(18,null,null,0),o.stateNode=i,o.return=n,n.child=o,Yn=n,qn=null,!0):!1;default:return!1}}function nc(n){return(n.mode&1)!==0&&(n.flags&128)===0}function ic(n){if(Yt){var i=qn;if(i){var o=i;if(!sp(n,i)){if(nc(n))throw Error(t(418));i=vr(o.nextSibling);var u=Yn;i&&sp(n,i)?rp(u,o):(n.flags=n.flags&-4097|2,Yt=!1,Yn=n)}}else{if(nc(n))throw Error(t(418));n.flags=n.flags&-4097|2,Yt=!1,Yn=n}}}function ap(n){for(n=n.return;n!==null&&n.tag!==5&&n.tag!==3&&n.tag!==13;)n=n.return;Yn=n}function Yo(n){if(n!==Yn)return!1;if(!Yt)return ap(n),Yt=!0,!1;var i;if((i=n.tag!==3)&&!(i=n.tag!==5)&&(i=n.type,i=i!=="head"&&i!=="body"&&!Ku(n.type,n.memoizedProps)),i&&(i=qn)){if(nc(n))throw op(),Error(t(418));for(;i;)rp(n,i),i=vr(i.nextSibling)}if(ap(n),n.tag===13){if(n=n.memoizedState,n=n!==null?n.dehydrated:null,!n)throw Error(t(317));e:{for(n=n.nextSibling,i=0;n;){if(n.nodeType===8){var o=n.data;if(o==="/$"){if(i===0){qn=vr(n.nextSibling);break e}i--}else o!=="$"&&o!=="$!"&&o!=="$?"||i++}n=n.nextSibling}qn=null}}else qn=Yn?vr(n.stateNode.nextSibling):null;return!0}function op(){for(var n=qn;n;)n=vr(n.nextSibling)}function Ds(){qn=Yn=null,Yt=!1}function rc(n){gi===null?gi=[n]:gi.push(n)}var K0=R.ReactCurrentBatchConfig;function ka(n,i,o){if(n=o.ref,n!==null&&typeof n!="function"&&typeof n!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(t(309));var u=o.stateNode}if(!u)throw Error(t(147,n));var h=u,m=""+n;return i!==null&&i.ref!==null&&typeof i.ref=="function"&&i.ref._stringRef===m?i.ref:(i=function(w){var D=h.refs;w===null?delete D[m]:D[m]=w},i._stringRef=m,i)}if(typeof n!="string")throw Error(t(284));if(!o._owner)throw Error(t(290,n))}return n}function qo(n,i){throw n=Object.prototype.toString.call(i),Error(t(31,n==="[object Object]"?"object with keys {"+Object.keys(i).join(", ")+"}":n))}function lp(n){var i=n._init;return i(n._payload)}function up(n){function i(Z,H){if(n){var te=Z.deletions;te===null?(Z.deletions=[H],Z.flags|=16):te.push(H)}}function o(Z,H){if(!n)return null;for(;H!==null;)i(Z,H),H=H.sibling;return null}function u(Z,H){for(Z=new Map;H!==null;)H.key!==null?Z.set(H.key,H):Z.set(H.index,H),H=H.sibling;return Z}function h(Z,H){return Z=Cr(Z,H),Z.index=0,Z.sibling=null,Z}function m(Z,H,te){return Z.index=te,n?(te=Z.alternate,te!==null?(te=te.index,te<H?(Z.flags|=2,H):te):(Z.flags|=2,H)):(Z.flags|=1048576,H)}function w(Z){return n&&Z.alternate===null&&(Z.flags|=2),Z}function D(Z,H,te,Me){return H===null||H.tag!==6?(H=$c(te,Z.mode,Me),H.return=Z,H):(H=h(H,te),H.return=Z,H)}function B(Z,H,te,Me){var Ke=te.type;return Ke===O?xe(Z,H,te.props.children,Me,te.key):H!==null&&(H.elementType===Ke||typeof Ke=="object"&&Ke!==null&&Ke.$$typeof===oe&&lp(Ke)===H.type)?(Me=h(H,te.props),Me.ref=ka(Z,H,te),Me.return=Z,Me):(Me=_l(te.type,te.key,te.props,null,Z.mode,Me),Me.ref=ka(Z,H,te),Me.return=Z,Me)}function se(Z,H,te,Me){return H===null||H.tag!==4||H.stateNode.containerInfo!==te.containerInfo||H.stateNode.implementation!==te.implementation?(H=Zc(te,Z.mode,Me),H.return=Z,H):(H=h(H,te.children||[]),H.return=Z,H)}function xe(Z,H,te,Me,Ke){return H===null||H.tag!==7?(H=os(te,Z.mode,Me,Ke),H.return=Z,H):(H=h(H,te),H.return=Z,H)}function ye(Z,H,te){if(typeof H=="string"&&H!==""||typeof H=="number")return H=$c(""+H,Z.mode,te),H.return=Z,H;if(typeof H=="object"&&H!==null){switch(H.$$typeof){case I:return te=_l(H.type,H.key,H.props,null,Z.mode,te),te.ref=ka(Z,null,H),te.return=Z,te;case P:return H=Zc(H,Z.mode,te),H.return=Z,H;case oe:var Me=H._init;return ye(Z,Me(H._payload),te)}if(qt(H)||ae(H))return H=os(H,Z.mode,te,null),H.return=Z,H;qo(Z,H)}return null}function ve(Z,H,te,Me){var Ke=H!==null?H.key:null;if(typeof te=="string"&&te!==""||typeof te=="number")return Ke!==null?null:D(Z,H,""+te,Me);if(typeof te=="object"&&te!==null){switch(te.$$typeof){case I:return te.key===Ke?B(Z,H,te,Me):null;case P:return te.key===Ke?se(Z,H,te,Me):null;case oe:return Ke=te._init,ve(Z,H,Ke(te._payload),Me)}if(qt(te)||ae(te))return Ke!==null?null:xe(Z,H,te,Me,null);qo(Z,te)}return null}function Fe(Z,H,te,Me,Ke){if(typeof Me=="string"&&Me!==""||typeof Me=="number")return Z=Z.get(te)||null,D(H,Z,""+Me,Ke);if(typeof Me=="object"&&Me!==null){switch(Me.$$typeof){case I:return Z=Z.get(Me.key===null?te:Me.key)||null,B(H,Z,Me,Ke);case P:return Z=Z.get(Me.key===null?te:Me.key)||null,se(H,Z,Me,Ke);case oe:var tt=Me._init;return Fe(Z,H,te,tt(Me._payload),Ke)}if(qt(Me)||ae(Me))return Z=Z.get(te)||null,xe(H,Z,Me,Ke,null);qo(H,Me)}return null}function Ve(Z,H,te,Me){for(var Ke=null,tt=null,nt=H,at=H=0,dn=null;nt!==null&&at<te.length;at++){nt.index>at?(dn=nt,nt=null):dn=nt.sibling;var Tt=ve(Z,nt,te[at],Me);if(Tt===null){nt===null&&(nt=dn);break}n&&nt&&Tt.alternate===null&&i(Z,nt),H=m(Tt,H,at),tt===null?Ke=Tt:tt.sibling=Tt,tt=Tt,nt=dn}if(at===te.length)return o(Z,nt),Yt&&Qr(Z,at),Ke;if(nt===null){for(;at<te.length;at++)nt=ye(Z,te[at],Me),nt!==null&&(H=m(nt,H,at),tt===null?Ke=nt:tt.sibling=nt,tt=nt);return Yt&&Qr(Z,at),Ke}for(nt=u(Z,nt);at<te.length;at++)dn=Fe(nt,Z,at,te[at],Me),dn!==null&&(n&&dn.alternate!==null&&nt.delete(dn.key===null?at:dn.key),H=m(dn,H,at),tt===null?Ke=dn:tt.sibling=dn,tt=dn);return n&&nt.forEach(function(Pr){return i(Z,Pr)}),Yt&&Qr(Z,at),Ke}function We(Z,H,te,Me){var Ke=ae(te);if(typeof Ke!="function")throw Error(t(150));if(te=Ke.call(te),te==null)throw Error(t(151));for(var tt=Ke=null,nt=H,at=H=0,dn=null,Tt=te.next();nt!==null&&!Tt.done;at++,Tt=te.next()){nt.index>at?(dn=nt,nt=null):dn=nt.sibling;var Pr=ve(Z,nt,Tt.value,Me);if(Pr===null){nt===null&&(nt=dn);break}n&&nt&&Pr.alternate===null&&i(Z,nt),H=m(Pr,H,at),tt===null?Ke=Pr:tt.sibling=Pr,tt=Pr,nt=dn}if(Tt.done)return o(Z,nt),Yt&&Qr(Z,at),Ke;if(nt===null){for(;!Tt.done;at++,Tt=te.next())Tt=ye(Z,Tt.value,Me),Tt!==null&&(H=m(Tt,H,at),tt===null?Ke=Tt:tt.sibling=Tt,tt=Tt);return Yt&&Qr(Z,at),Ke}for(nt=u(Z,nt);!Tt.done;at++,Tt=te.next())Tt=Fe(nt,Z,at,Tt.value,Me),Tt!==null&&(n&&Tt.alternate!==null&&nt.delete(Tt.key===null?at:Tt.key),H=m(Tt,H,at),tt===null?Ke=Tt:tt.sibling=Tt,tt=Tt);return n&&nt.forEach(function(bv){return i(Z,bv)}),Yt&&Qr(Z,at),Ke}function en(Z,H,te,Me){if(typeof te=="object"&&te!==null&&te.type===O&&te.key===null&&(te=te.props.children),typeof te=="object"&&te!==null){switch(te.$$typeof){case I:e:{for(var Ke=te.key,tt=H;tt!==null;){if(tt.key===Ke){if(Ke=te.type,Ke===O){if(tt.tag===7){o(Z,tt.sibling),H=h(tt,te.props.children),H.return=Z,Z=H;break e}}else if(tt.elementType===Ke||typeof Ke=="object"&&Ke!==null&&Ke.$$typeof===oe&&lp(Ke)===tt.type){o(Z,tt.sibling),H=h(tt,te.props),H.ref=ka(Z,tt,te),H.return=Z,Z=H;break e}o(Z,tt);break}else i(Z,tt);tt=tt.sibling}te.type===O?(H=os(te.props.children,Z.mode,Me,te.key),H.return=Z,Z=H):(Me=_l(te.type,te.key,te.props,null,Z.mode,Me),Me.ref=ka(Z,H,te),Me.return=Z,Z=Me)}return w(Z);case P:e:{for(tt=te.key;H!==null;){if(H.key===tt)if(H.tag===4&&H.stateNode.containerInfo===te.containerInfo&&H.stateNode.implementation===te.implementation){o(Z,H.sibling),H=h(H,te.children||[]),H.return=Z,Z=H;break e}else{o(Z,H);break}else i(Z,H);H=H.sibling}H=Zc(te,Z.mode,Me),H.return=Z,Z=H}return w(Z);case oe:return tt=te._init,en(Z,H,tt(te._payload),Me)}if(qt(te))return Ve(Z,H,te,Me);if(ae(te))return We(Z,H,te,Me);qo(Z,te)}return typeof te=="string"&&te!==""||typeof te=="number"?(te=""+te,H!==null&&H.tag===6?(o(Z,H.sibling),H=h(H,te),H.return=Z,Z=H):(o(Z,H),H=$c(te,Z.mode,Me),H.return=Z,Z=H),w(Z)):o(Z,H)}return en}var Is=up(!0),cp=up(!1),Ko=xr(null),$o=null,Ns=null,sc=null;function ac(){sc=Ns=$o=null}function oc(n){var i=Ko.current;Vt(Ko),n._currentValue=i}function lc(n,i,o){for(;n!==null;){var u=n.alternate;if((n.childLanes&i)!==i?(n.childLanes|=i,u!==null&&(u.childLanes|=i)):u!==null&&(u.childLanes&i)!==i&&(u.childLanes|=i),n===o)break;n=n.return}}function Us(n,i){$o=n,sc=Ns=null,n=n.dependencies,n!==null&&n.firstContext!==null&&((n.lanes&i)!==0&&(Bn=!0),n.firstContext=null)}function ni(n){var i=n._currentValue;if(sc!==n)if(n={context:n,memoizedValue:i,next:null},Ns===null){if($o===null)throw Error(t(308));Ns=n,$o.dependencies={lanes:0,firstContext:n}}else Ns=Ns.next=n;return i}var es=null;function uc(n){es===null?es=[n]:es.push(n)}function fp(n,i,o,u){var h=i.interleaved;return h===null?(o.next=o,uc(i)):(o.next=h.next,h.next=o),i.interleaved=o,Yi(n,u)}function Yi(n,i){n.lanes|=i;var o=n.alternate;for(o!==null&&(o.lanes|=i),o=n,n=n.return;n!==null;)n.childLanes|=i,o=n.alternate,o!==null&&(o.childLanes|=i),o=n,n=n.return;return o.tag===3?o.stateNode:null}var Mr=!1;function cc(n){n.updateQueue={baseState:n.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function hp(n,i){n=n.updateQueue,i.updateQueue===n&&(i.updateQueue={baseState:n.baseState,firstBaseUpdate:n.firstBaseUpdate,lastBaseUpdate:n.lastBaseUpdate,shared:n.shared,effects:n.effects})}function qi(n,i){return{eventTime:n,lane:i,tag:0,payload:null,callback:null,next:null}}function Er(n,i,o){var u=n.updateQueue;if(u===null)return null;if(u=u.shared,(Mt&2)!==0){var h=u.pending;return h===null?i.next=i:(i.next=h.next,h.next=i),u.pending=i,Yi(n,o)}return h=u.interleaved,h===null?(i.next=i,uc(u)):(i.next=h.next,h.next=i),u.interleaved=i,Yi(n,o)}function Zo(n,i,o){if(i=i.updateQueue,i!==null&&(i=i.shared,(o&4194240)!==0)){var u=i.lanes;u&=n.pendingLanes,o|=u,i.lanes=o,Un(n,o)}}function dp(n,i){var o=n.updateQueue,u=n.alternate;if(u!==null&&(u=u.updateQueue,o===u)){var h=null,m=null;if(o=o.firstBaseUpdate,o!==null){do{var w={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};m===null?h=m=w:m=m.next=w,o=o.next}while(o!==null);m===null?h=m=i:m=m.next=i}else h=m=i;o={baseState:u.baseState,firstBaseUpdate:h,lastBaseUpdate:m,shared:u.shared,effects:u.effects},n.updateQueue=o;return}n=o.lastBaseUpdate,n===null?o.firstBaseUpdate=i:n.next=i,o.lastBaseUpdate=i}function Jo(n,i,o,u){var h=n.updateQueue;Mr=!1;var m=h.firstBaseUpdate,w=h.lastBaseUpdate,D=h.shared.pending;if(D!==null){h.shared.pending=null;var B=D,se=B.next;B.next=null,w===null?m=se:w.next=se,w=B;var xe=n.alternate;xe!==null&&(xe=xe.updateQueue,D=xe.lastBaseUpdate,D!==w&&(D===null?xe.firstBaseUpdate=se:D.next=se,xe.lastBaseUpdate=B))}if(m!==null){var ye=h.baseState;w=0,xe=se=B=null,D=m;do{var ve=D.lane,Fe=D.eventTime;if((u&ve)===ve){xe!==null&&(xe=xe.next={eventTime:Fe,lane:0,tag:D.tag,payload:D.payload,callback:D.callback,next:null});e:{var Ve=n,We=D;switch(ve=i,Fe=o,We.tag){case 1:if(Ve=We.payload,typeof Ve=="function"){ye=Ve.call(Fe,ye,ve);break e}ye=Ve;break e;case 3:Ve.flags=Ve.flags&-65537|128;case 0:if(Ve=We.payload,ve=typeof Ve=="function"?Ve.call(Fe,ye,ve):Ve,ve==null)break e;ye=le({},ye,ve);break e;case 2:Mr=!0}}D.callback!==null&&D.lane!==0&&(n.flags|=64,ve=h.effects,ve===null?h.effects=[D]:ve.push(D))}else Fe={eventTime:Fe,lane:ve,tag:D.tag,payload:D.payload,callback:D.callback,next:null},xe===null?(se=xe=Fe,B=ye):xe=xe.next=Fe,w|=ve;if(D=D.next,D===null){if(D=h.shared.pending,D===null)break;ve=D,D=ve.next,ve.next=null,h.lastBaseUpdate=ve,h.shared.pending=null}}while(!0);if(xe===null&&(B=ye),h.baseState=B,h.firstBaseUpdate=se,h.lastBaseUpdate=xe,i=h.shared.interleaved,i!==null){h=i;do w|=h.lane,h=h.next;while(h!==i)}else m===null&&(h.shared.lanes=0);is|=w,n.lanes=w,n.memoizedState=ye}}function pp(n,i,o){if(n=i.effects,i.effects=null,n!==null)for(i=0;i<n.length;i++){var u=n[i],h=u.callback;if(h!==null){if(u.callback=null,u=o,typeof h!="function")throw Error(t(191,h));h.call(u)}}}var za={},Pi=xr(za),Va=xr(za),Ha=xr(za);function ts(n){if(n===za)throw Error(t(174));return n}function fc(n,i){switch(Bt(Ha,i),Bt(Va,n),Bt(Pi,za),n=i.nodeType,n){case 9:case 11:i=(i=i.documentElement)?i.namespaceURI:M(null,"");break;default:n=n===8?i.parentNode:i,i=n.namespaceURI||null,n=n.tagName,i=M(i,n)}Vt(Pi),Bt(Pi,i)}function Fs(){Vt(Pi),Vt(Va),Vt(Ha)}function mp(n){ts(Ha.current);var i=ts(Pi.current),o=M(i,n.type);i!==o&&(Bt(Va,n),Bt(Pi,o))}function hc(n){Va.current===n&&(Vt(Pi),Vt(Va))}var $t=xr(0);function jo(n){for(var i=n;i!==null;){if(i.tag===13){var o=i.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return i}else if(i.tag===19&&i.memoizedProps.revealOrder!==void 0){if((i.flags&128)!==0)return i}else if(i.child!==null){i.child.return=i,i=i.child;continue}if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return null;i=i.return}i.sibling.return=i.return,i=i.sibling}return null}var dc=[];function pc(){for(var n=0;n<dc.length;n++)dc[n]._workInProgressVersionPrimary=null;dc.length=0}var Qo=R.ReactCurrentDispatcher,mc=R.ReactCurrentBatchConfig,ns=0,Zt=null,an=null,fn=null,el=!1,Ga=!1,Wa=0,$0=0;function En(){throw Error(t(321))}function gc(n,i){if(i===null)return!1;for(var o=0;o<i.length&&o<n.length;o++)if(!mi(n[o],i[o]))return!1;return!0}function _c(n,i,o,u,h,m){if(ns=m,Zt=i,i.memoizedState=null,i.updateQueue=null,i.lanes=0,Qo.current=n===null||n.memoizedState===null?Q0:ev,n=o(u,h),Ga){m=0;do{if(Ga=!1,Wa=0,25<=m)throw Error(t(301));m+=1,fn=an=null,i.updateQueue=null,Qo.current=tv,n=o(u,h)}while(Ga)}if(Qo.current=il,i=an!==null&&an.next!==null,ns=0,fn=an=Zt=null,el=!1,i)throw Error(t(300));return n}function vc(){var n=Wa!==0;return Wa=0,n}function Li(){var n={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fn===null?Zt.memoizedState=fn=n:fn=fn.next=n,fn}function ii(){if(an===null){var n=Zt.alternate;n=n!==null?n.memoizedState:null}else n=an.next;var i=fn===null?Zt.memoizedState:fn.next;if(i!==null)fn=i,an=n;else{if(n===null)throw Error(t(310));an=n,n={memoizedState:an.memoizedState,baseState:an.baseState,baseQueue:an.baseQueue,queue:an.queue,next:null},fn===null?Zt.memoizedState=fn=n:fn=fn.next=n}return fn}function Xa(n,i){return typeof i=="function"?i(n):i}function xc(n){var i=ii(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var u=an,h=u.baseQueue,m=o.pending;if(m!==null){if(h!==null){var w=h.next;h.next=m.next,m.next=w}u.baseQueue=h=m,o.pending=null}if(h!==null){m=h.next,u=u.baseState;var D=w=null,B=null,se=m;do{var xe=se.lane;if((ns&xe)===xe)B!==null&&(B=B.next={lane:0,action:se.action,hasEagerState:se.hasEagerState,eagerState:se.eagerState,next:null}),u=se.hasEagerState?se.eagerState:n(u,se.action);else{var ye={lane:xe,action:se.action,hasEagerState:se.hasEagerState,eagerState:se.eagerState,next:null};B===null?(D=B=ye,w=u):B=B.next=ye,Zt.lanes|=xe,is|=xe}se=se.next}while(se!==null&&se!==m);B===null?w=u:B.next=D,mi(u,i.memoizedState)||(Bn=!0),i.memoizedState=u,i.baseState=w,i.baseQueue=B,o.lastRenderedState=u}if(n=o.interleaved,n!==null){h=n;do m=h.lane,Zt.lanes|=m,is|=m,h=h.next;while(h!==n)}else h===null&&(o.lanes=0);return[i.memoizedState,o.dispatch]}function yc(n){var i=ii(),o=i.queue;if(o===null)throw Error(t(311));o.lastRenderedReducer=n;var u=o.dispatch,h=o.pending,m=i.memoizedState;if(h!==null){o.pending=null;var w=h=h.next;do m=n(m,w.action),w=w.next;while(w!==h);mi(m,i.memoizedState)||(Bn=!0),i.memoizedState=m,i.baseQueue===null&&(i.baseState=m),o.lastRenderedState=m}return[m,u]}function gp(){}function _p(n,i){var o=Zt,u=ii(),h=i(),m=!mi(u.memoizedState,h);if(m&&(u.memoizedState=h,Bn=!0),u=u.queue,Sc(yp.bind(null,o,u,n),[n]),u.getSnapshot!==i||m||fn!==null&&fn.memoizedState.tag&1){if(o.flags|=2048,Ya(9,xp.bind(null,o,u,h,i),void 0,null),hn===null)throw Error(t(349));(ns&30)!==0||vp(o,i,h)}return h}function vp(n,i,o){n.flags|=16384,n={getSnapshot:i,value:o},i=Zt.updateQueue,i===null?(i={lastEffect:null,stores:null},Zt.updateQueue=i,i.stores=[n]):(o=i.stores,o===null?i.stores=[n]:o.push(n))}function xp(n,i,o,u){i.value=o,i.getSnapshot=u,Sp(i)&&Mp(n)}function yp(n,i,o){return o(function(){Sp(i)&&Mp(n)})}function Sp(n){var i=n.getSnapshot;n=n.value;try{var o=i();return!mi(n,o)}catch{return!0}}function Mp(n){var i=Yi(n,1);i!==null&&yi(i,n,1,-1)}function Ep(n){var i=Li();return typeof n=="function"&&(n=n()),i.memoizedState=i.baseState=n,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Xa,lastRenderedState:n},i.queue=n,n=n.dispatch=j0.bind(null,Zt,n),[i.memoizedState,n]}function Ya(n,i,o,u){return n={tag:n,create:i,destroy:o,deps:u,next:null},i=Zt.updateQueue,i===null?(i={lastEffect:null,stores:null},Zt.updateQueue=i,i.lastEffect=n.next=n):(o=i.lastEffect,o===null?i.lastEffect=n.next=n:(u=o.next,o.next=n,n.next=u,i.lastEffect=n)),n}function Tp(){return ii().memoizedState}function tl(n,i,o,u){var h=Li();Zt.flags|=n,h.memoizedState=Ya(1|i,o,void 0,u===void 0?null:u)}function nl(n,i,o,u){var h=ii();u=u===void 0?null:u;var m=void 0;if(an!==null){var w=an.memoizedState;if(m=w.destroy,u!==null&&gc(u,w.deps)){h.memoizedState=Ya(i,o,m,u);return}}Zt.flags|=n,h.memoizedState=Ya(1|i,o,m,u)}function wp(n,i){return tl(8390656,8,n,i)}function Sc(n,i){return nl(2048,8,n,i)}function Ap(n,i){return nl(4,2,n,i)}function bp(n,i){return nl(4,4,n,i)}function Rp(n,i){if(typeof i=="function")return n=n(),i(n),function(){i(null)};if(i!=null)return n=n(),i.current=n,function(){i.current=null}}function Cp(n,i,o){return o=o!=null?o.concat([n]):null,nl(4,4,Rp.bind(null,i,n),o)}function Mc(){}function Pp(n,i){var o=ii();i=i===void 0?null:i;var u=o.memoizedState;return u!==null&&i!==null&&gc(i,u[1])?u[0]:(o.memoizedState=[n,i],n)}function Lp(n,i){var o=ii();i=i===void 0?null:i;var u=o.memoizedState;return u!==null&&i!==null&&gc(i,u[1])?u[0]:(n=n(),o.memoizedState=[n,i],n)}function Dp(n,i,o){return(ns&21)===0?(n.baseState&&(n.baseState=!1,Bn=!0),n.memoizedState=o):(mi(o,i)||(o=Ue(),Zt.lanes|=o,is|=o,n.baseState=!0),i)}function Z0(n,i){var o=mt;mt=o!==0&&4>o?o:4,n(!0);var u=mc.transition;mc.transition={};try{n(!1),i()}finally{mt=o,mc.transition=u}}function Ip(){return ii().memoizedState}function J0(n,i,o){var u=br(n);if(o={lane:u,action:o,hasEagerState:!1,eagerState:null,next:null},Np(n))Up(i,o);else if(o=fp(n,i,o,u),o!==null){var h=Ln();yi(o,n,u,h),Fp(o,i,u)}}function j0(n,i,o){var u=br(n),h={lane:u,action:o,hasEagerState:!1,eagerState:null,next:null};if(Np(n))Up(i,h);else{var m=n.alternate;if(n.lanes===0&&(m===null||m.lanes===0)&&(m=i.lastRenderedReducer,m!==null))try{var w=i.lastRenderedState,D=m(w,o);if(h.hasEagerState=!0,h.eagerState=D,mi(D,w)){var B=i.interleaved;B===null?(h.next=h,uc(i)):(h.next=B.next,B.next=h),i.interleaved=h;return}}catch{}finally{}o=fp(n,i,h,u),o!==null&&(h=Ln(),yi(o,n,u,h),Fp(o,i,u))}}function Np(n){var i=n.alternate;return n===Zt||i!==null&&i===Zt}function Up(n,i){Ga=el=!0;var o=n.pending;o===null?i.next=i:(i.next=o.next,o.next=i),n.pending=i}function Fp(n,i,o){if((o&4194240)!==0){var u=i.lanes;u&=n.pendingLanes,o|=u,i.lanes=o,Un(n,o)}}var il={readContext:ni,useCallback:En,useContext:En,useEffect:En,useImperativeHandle:En,useInsertionEffect:En,useLayoutEffect:En,useMemo:En,useReducer:En,useRef:En,useState:En,useDebugValue:En,useDeferredValue:En,useTransition:En,useMutableSource:En,useSyncExternalStore:En,useId:En,unstable_isNewReconciler:!1},Q0={readContext:ni,useCallback:function(n,i){return Li().memoizedState=[n,i===void 0?null:i],n},useContext:ni,useEffect:wp,useImperativeHandle:function(n,i,o){return o=o!=null?o.concat([n]):null,tl(4194308,4,Rp.bind(null,i,n),o)},useLayoutEffect:function(n,i){return tl(4194308,4,n,i)},useInsertionEffect:function(n,i){return tl(4,2,n,i)},useMemo:function(n,i){var o=Li();return i=i===void 0?null:i,n=n(),o.memoizedState=[n,i],n},useReducer:function(n,i,o){var u=Li();return i=o!==void 0?o(i):i,u.memoizedState=u.baseState=i,n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:n,lastRenderedState:i},u.queue=n,n=n.dispatch=J0.bind(null,Zt,n),[u.memoizedState,n]},useRef:function(n){var i=Li();return n={current:n},i.memoizedState=n},useState:Ep,useDebugValue:Mc,useDeferredValue:function(n){return Li().memoizedState=n},useTransition:function(){var n=Ep(!1),i=n[0];return n=Z0.bind(null,n[1]),Li().memoizedState=n,[i,n]},useMutableSource:function(){},useSyncExternalStore:function(n,i,o){var u=Zt,h=Li();if(Yt){if(o===void 0)throw Error(t(407));o=o()}else{if(o=i(),hn===null)throw Error(t(349));(ns&30)!==0||vp(u,i,o)}h.memoizedState=o;var m={value:o,getSnapshot:i};return h.queue=m,wp(yp.bind(null,u,m,n),[n]),u.flags|=2048,Ya(9,xp.bind(null,u,m,o,i),void 0,null),o},useId:function(){var n=Li(),i=hn.identifierPrefix;if(Yt){var o=Xi,u=Wi;o=(u&~(1<<32-Ee(u)-1)).toString(32)+o,i=":"+i+"R"+o,o=Wa++,0<o&&(i+="H"+o.toString(32)),i+=":"}else o=$0++,i=":"+i+"r"+o.toString(32)+":";return n.memoizedState=i},unstable_isNewReconciler:!1},ev={readContext:ni,useCallback:Pp,useContext:ni,useEffect:Sc,useImperativeHandle:Cp,useInsertionEffect:Ap,useLayoutEffect:bp,useMemo:Lp,useReducer:xc,useRef:Tp,useState:function(){return xc(Xa)},useDebugValue:Mc,useDeferredValue:function(n){var i=ii();return Dp(i,an.memoizedState,n)},useTransition:function(){var n=xc(Xa)[0],i=ii().memoizedState;return[n,i]},useMutableSource:gp,useSyncExternalStore:_p,useId:Ip,unstable_isNewReconciler:!1},tv={readContext:ni,useCallback:Pp,useContext:ni,useEffect:Sc,useImperativeHandle:Cp,useInsertionEffect:Ap,useLayoutEffect:bp,useMemo:Lp,useReducer:yc,useRef:Tp,useState:function(){return yc(Xa)},useDebugValue:Mc,useDeferredValue:function(n){var i=ii();return an===null?i.memoizedState=n:Dp(i,an.memoizedState,n)},useTransition:function(){var n=yc(Xa)[0],i=ii().memoizedState;return[n,i]},useMutableSource:gp,useSyncExternalStore:_p,useId:Ip,unstable_isNewReconciler:!1};function _i(n,i){if(n&&n.defaultProps){i=le({},i),n=n.defaultProps;for(var o in n)i[o]===void 0&&(i[o]=n[o]);return i}return i}function Ec(n,i,o,u){i=n.memoizedState,o=o(u,i),o=o==null?i:le({},i,o),n.memoizedState=o,n.lanes===0&&(n.updateQueue.baseState=o)}var rl={isMounted:function(n){return(n=n._reactInternals)?Cn(n)===n:!1},enqueueSetState:function(n,i,o){n=n._reactInternals;var u=Ln(),h=br(n),m=qi(u,h);m.payload=i,o!=null&&(m.callback=o),i=Er(n,m,h),i!==null&&(yi(i,n,h,u),Zo(i,n,h))},enqueueReplaceState:function(n,i,o){n=n._reactInternals;var u=Ln(),h=br(n),m=qi(u,h);m.tag=1,m.payload=i,o!=null&&(m.callback=o),i=Er(n,m,h),i!==null&&(yi(i,n,h,u),Zo(i,n,h))},enqueueForceUpdate:function(n,i){n=n._reactInternals;var o=Ln(),u=br(n),h=qi(o,u);h.tag=2,i!=null&&(h.callback=i),i=Er(n,h,u),i!==null&&(yi(i,n,u,o),Zo(i,n,u))}};function Op(n,i,o,u,h,m,w){return n=n.stateNode,typeof n.shouldComponentUpdate=="function"?n.shouldComponentUpdate(u,m,w):i.prototype&&i.prototype.isPureReactComponent?!Da(o,u)||!Da(h,m):!0}function Bp(n,i,o){var u=!1,h=yr,m=i.contextType;return typeof m=="object"&&m!==null?m=ni(m):(h=On(i)?Jr:Mn.current,u=i.contextTypes,m=(u=u!=null)?Cs(n,h):yr),i=new i(o,m),n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,i.updater=rl,n.stateNode=i,i._reactInternals=n,u&&(n=n.stateNode,n.__reactInternalMemoizedUnmaskedChildContext=h,n.__reactInternalMemoizedMaskedChildContext=m),i}function kp(n,i,o,u){n=i.state,typeof i.componentWillReceiveProps=="function"&&i.componentWillReceiveProps(o,u),typeof i.UNSAFE_componentWillReceiveProps=="function"&&i.UNSAFE_componentWillReceiveProps(o,u),i.state!==n&&rl.enqueueReplaceState(i,i.state,null)}function Tc(n,i,o,u){var h=n.stateNode;h.props=o,h.state=n.memoizedState,h.refs={},cc(n);var m=i.contextType;typeof m=="object"&&m!==null?h.context=ni(m):(m=On(i)?Jr:Mn.current,h.context=Cs(n,m)),h.state=n.memoizedState,m=i.getDerivedStateFromProps,typeof m=="function"&&(Ec(n,i,m,o),h.state=n.memoizedState),typeof i.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(i=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),i!==h.state&&rl.enqueueReplaceState(h,h.state,null),Jo(n,o,h,u),h.state=n.memoizedState),typeof h.componentDidMount=="function"&&(n.flags|=4194308)}function Os(n,i){try{var o="",u=i;do o+=ke(u),u=u.return;while(u);var h=o}catch(m){h=`
Error generating stack: `+m.message+`
`+m.stack}return{value:n,source:i,stack:h,digest:null}}function wc(n,i,o){return{value:n,source:null,stack:o??null,digest:i??null}}function Ac(n,i){try{console.error(i.value)}catch(o){setTimeout(function(){throw o})}}var nv=typeof WeakMap=="function"?WeakMap:Map;function zp(n,i,o){o=qi(-1,o),o.tag=3,o.payload={element:null};var u=i.value;return o.callback=function(){fl||(fl=!0,Vc=u),Ac(n,i)},o}function Vp(n,i,o){o=qi(-1,o),o.tag=3;var u=n.type.getDerivedStateFromError;if(typeof u=="function"){var h=i.value;o.payload=function(){return u(h)},o.callback=function(){Ac(n,i)}}var m=n.stateNode;return m!==null&&typeof m.componentDidCatch=="function"&&(o.callback=function(){Ac(n,i),typeof u!="function"&&(wr===null?wr=new Set([this]):wr.add(this));var w=i.stack;this.componentDidCatch(i.value,{componentStack:w!==null?w:""})}),o}function Hp(n,i,o){var u=n.pingCache;if(u===null){u=n.pingCache=new nv;var h=new Set;u.set(i,h)}else h=u.get(i),h===void 0&&(h=new Set,u.set(i,h));h.has(o)||(h.add(o),n=gv.bind(null,n,i,o),i.then(n,n))}function Gp(n){do{var i;if((i=n.tag===13)&&(i=n.memoizedState,i=i!==null?i.dehydrated!==null:!0),i)return n;n=n.return}while(n!==null);return null}function Wp(n,i,o,u,h){return(n.mode&1)===0?(n===i?n.flags|=65536:(n.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(i=qi(-1,1),i.tag=2,Er(o,i,1))),o.lanes|=1),n):(n.flags|=65536,n.lanes=h,n)}var iv=R.ReactCurrentOwner,Bn=!1;function Pn(n,i,o,u){i.child=n===null?cp(i,null,o,u):Is(i,n.child,o,u)}function Xp(n,i,o,u,h){o=o.render;var m=i.ref;return Us(i,h),u=_c(n,i,o,u,m,h),o=vc(),n!==null&&!Bn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~h,Ki(n,i,h)):(Yt&&o&&ec(i),i.flags|=1,Pn(n,i,u,h),i.child)}function Yp(n,i,o,u,h){if(n===null){var m=o.type;return typeof m=="function"&&!Kc(m)&&m.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(i.tag=15,i.type=m,qp(n,i,m,u,h)):(n=_l(o.type,null,u,i,i.mode,h),n.ref=i.ref,n.return=i,i.child=n)}if(m=n.child,(n.lanes&h)===0){var w=m.memoizedProps;if(o=o.compare,o=o!==null?o:Da,o(w,u)&&n.ref===i.ref)return Ki(n,i,h)}return i.flags|=1,n=Cr(m,u),n.ref=i.ref,n.return=i,i.child=n}function qp(n,i,o,u,h){if(n!==null){var m=n.memoizedProps;if(Da(m,u)&&n.ref===i.ref)if(Bn=!1,i.pendingProps=u=m,(n.lanes&h)!==0)(n.flags&131072)!==0&&(Bn=!0);else return i.lanes=n.lanes,Ki(n,i,h)}return bc(n,i,o,u,h)}function Kp(n,i,o){var u=i.pendingProps,h=u.children,m=n!==null?n.memoizedState:null;if(u.mode==="hidden")if((i.mode&1)===0)i.memoizedState={baseLanes:0,cachePool:null,transitions:null},Bt(ks,Kn),Kn|=o;else{if((o&1073741824)===0)return n=m!==null?m.baseLanes|o:o,i.lanes=i.childLanes=1073741824,i.memoizedState={baseLanes:n,cachePool:null,transitions:null},i.updateQueue=null,Bt(ks,Kn),Kn|=n,null;i.memoizedState={baseLanes:0,cachePool:null,transitions:null},u=m!==null?m.baseLanes:o,Bt(ks,Kn),Kn|=u}else m!==null?(u=m.baseLanes|o,i.memoizedState=null):u=o,Bt(ks,Kn),Kn|=u;return Pn(n,i,h,o),i.child}function $p(n,i){var o=i.ref;(n===null&&o!==null||n!==null&&n.ref!==o)&&(i.flags|=512,i.flags|=2097152)}function bc(n,i,o,u,h){var m=On(o)?Jr:Mn.current;return m=Cs(i,m),Us(i,h),o=_c(n,i,o,u,m,h),u=vc(),n!==null&&!Bn?(i.updateQueue=n.updateQueue,i.flags&=-2053,n.lanes&=~h,Ki(n,i,h)):(Yt&&u&&ec(i),i.flags|=1,Pn(n,i,o,h),i.child)}function Zp(n,i,o,u,h){if(On(o)){var m=!0;Ho(i)}else m=!1;if(Us(i,h),i.stateNode===null)al(n,i),Bp(i,o,u),Tc(i,o,u,h),u=!0;else if(n===null){var w=i.stateNode,D=i.memoizedProps;w.props=D;var B=w.context,se=o.contextType;typeof se=="object"&&se!==null?se=ni(se):(se=On(o)?Jr:Mn.current,se=Cs(i,se));var xe=o.getDerivedStateFromProps,ye=typeof xe=="function"||typeof w.getSnapshotBeforeUpdate=="function";ye||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(D!==u||B!==se)&&kp(i,w,u,se),Mr=!1;var ve=i.memoizedState;w.state=ve,Jo(i,u,w,h),B=i.memoizedState,D!==u||ve!==B||Fn.current||Mr?(typeof xe=="function"&&(Ec(i,o,xe,u),B=i.memoizedState),(D=Mr||Op(i,o,D,u,ve,B,se))?(ye||typeof w.UNSAFE_componentWillMount!="function"&&typeof w.componentWillMount!="function"||(typeof w.componentWillMount=="function"&&w.componentWillMount(),typeof w.UNSAFE_componentWillMount=="function"&&w.UNSAFE_componentWillMount()),typeof w.componentDidMount=="function"&&(i.flags|=4194308)):(typeof w.componentDidMount=="function"&&(i.flags|=4194308),i.memoizedProps=u,i.memoizedState=B),w.props=u,w.state=B,w.context=se,u=D):(typeof w.componentDidMount=="function"&&(i.flags|=4194308),u=!1)}else{w=i.stateNode,hp(n,i),D=i.memoizedProps,se=i.type===i.elementType?D:_i(i.type,D),w.props=se,ye=i.pendingProps,ve=w.context,B=o.contextType,typeof B=="object"&&B!==null?B=ni(B):(B=On(o)?Jr:Mn.current,B=Cs(i,B));var Fe=o.getDerivedStateFromProps;(xe=typeof Fe=="function"||typeof w.getSnapshotBeforeUpdate=="function")||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(D!==ye||ve!==B)&&kp(i,w,u,B),Mr=!1,ve=i.memoizedState,w.state=ve,Jo(i,u,w,h);var Ve=i.memoizedState;D!==ye||ve!==Ve||Fn.current||Mr?(typeof Fe=="function"&&(Ec(i,o,Fe,u),Ve=i.memoizedState),(se=Mr||Op(i,o,se,u,ve,Ve,B)||!1)?(xe||typeof w.UNSAFE_componentWillUpdate!="function"&&typeof w.componentWillUpdate!="function"||(typeof w.componentWillUpdate=="function"&&w.componentWillUpdate(u,Ve,B),typeof w.UNSAFE_componentWillUpdate=="function"&&w.UNSAFE_componentWillUpdate(u,Ve,B)),typeof w.componentDidUpdate=="function"&&(i.flags|=4),typeof w.getSnapshotBeforeUpdate=="function"&&(i.flags|=1024)):(typeof w.componentDidUpdate!="function"||D===n.memoizedProps&&ve===n.memoizedState||(i.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||D===n.memoizedProps&&ve===n.memoizedState||(i.flags|=1024),i.memoizedProps=u,i.memoizedState=Ve),w.props=u,w.state=Ve,w.context=B,u=se):(typeof w.componentDidUpdate!="function"||D===n.memoizedProps&&ve===n.memoizedState||(i.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||D===n.memoizedProps&&ve===n.memoizedState||(i.flags|=1024),u=!1)}return Rc(n,i,o,u,m,h)}function Rc(n,i,o,u,h,m){$p(n,i);var w=(i.flags&128)!==0;if(!u&&!w)return h&&tp(i,o,!1),Ki(n,i,m);u=i.stateNode,iv.current=i;var D=w&&typeof o.getDerivedStateFromError!="function"?null:u.render();return i.flags|=1,n!==null&&w?(i.child=Is(i,n.child,null,m),i.child=Is(i,null,D,m)):Pn(n,i,D,m),i.memoizedState=u.state,h&&tp(i,o,!0),i.child}function Jp(n){var i=n.stateNode;i.pendingContext?Qd(n,i.pendingContext,i.pendingContext!==i.context):i.context&&Qd(n,i.context,!1),fc(n,i.containerInfo)}function jp(n,i,o,u,h){return Ds(),rc(h),i.flags|=256,Pn(n,i,o,u),i.child}var Cc={dehydrated:null,treeContext:null,retryLane:0};function Pc(n){return{baseLanes:n,cachePool:null,transitions:null}}function Qp(n,i,o){var u=i.pendingProps,h=$t.current,m=!1,w=(i.flags&128)!==0,D;if((D=w)||(D=n!==null&&n.memoizedState===null?!1:(h&2)!==0),D?(m=!0,i.flags&=-129):(n===null||n.memoizedState!==null)&&(h|=1),Bt($t,h&1),n===null)return ic(i),n=i.memoizedState,n!==null&&(n=n.dehydrated,n!==null)?((i.mode&1)===0?i.lanes=1:n.data==="$!"?i.lanes=8:i.lanes=1073741824,null):(w=u.children,n=u.fallback,m?(u=i.mode,m=i.child,w={mode:"hidden",children:w},(u&1)===0&&m!==null?(m.childLanes=0,m.pendingProps=w):m=vl(w,u,0,null),n=os(n,u,o,null),m.return=i,n.return=i,m.sibling=n,i.child=m,i.child.memoizedState=Pc(o),i.memoizedState=Cc,n):Lc(i,w));if(h=n.memoizedState,h!==null&&(D=h.dehydrated,D!==null))return rv(n,i,w,u,D,h,o);if(m){m=u.fallback,w=i.mode,h=n.child,D=h.sibling;var B={mode:"hidden",children:u.children};return(w&1)===0&&i.child!==h?(u=i.child,u.childLanes=0,u.pendingProps=B,i.deletions=null):(u=Cr(h,B),u.subtreeFlags=h.subtreeFlags&14680064),D!==null?m=Cr(D,m):(m=os(m,w,o,null),m.flags|=2),m.return=i,u.return=i,u.sibling=m,i.child=u,u=m,m=i.child,w=n.child.memoizedState,w=w===null?Pc(o):{baseLanes:w.baseLanes|o,cachePool:null,transitions:w.transitions},m.memoizedState=w,m.childLanes=n.childLanes&~o,i.memoizedState=Cc,u}return m=n.child,n=m.sibling,u=Cr(m,{mode:"visible",children:u.children}),(i.mode&1)===0&&(u.lanes=o),u.return=i,u.sibling=null,n!==null&&(o=i.deletions,o===null?(i.deletions=[n],i.flags|=16):o.push(n)),i.child=u,i.memoizedState=null,u}function Lc(n,i){return i=vl({mode:"visible",children:i},n.mode,0,null),i.return=n,n.child=i}function sl(n,i,o,u){return u!==null&&rc(u),Is(i,n.child,null,o),n=Lc(i,i.pendingProps.children),n.flags|=2,i.memoizedState=null,n}function rv(n,i,o,u,h,m,w){if(o)return i.flags&256?(i.flags&=-257,u=wc(Error(t(422))),sl(n,i,w,u)):i.memoizedState!==null?(i.child=n.child,i.flags|=128,null):(m=u.fallback,h=i.mode,u=vl({mode:"visible",children:u.children},h,0,null),m=os(m,h,w,null),m.flags|=2,u.return=i,m.return=i,u.sibling=m,i.child=u,(i.mode&1)!==0&&Is(i,n.child,null,w),i.child.memoizedState=Pc(w),i.memoizedState=Cc,m);if((i.mode&1)===0)return sl(n,i,w,null);if(h.data==="$!"){if(u=h.nextSibling&&h.nextSibling.dataset,u)var D=u.dgst;return u=D,m=Error(t(419)),u=wc(m,u,void 0),sl(n,i,w,u)}if(D=(w&n.childLanes)!==0,Bn||D){if(u=hn,u!==null){switch(w&-w){case 4:h=2;break;case 16:h=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:h=32;break;case 536870912:h=268435456;break;default:h=0}h=(h&(u.suspendedLanes|w))!==0?0:h,h!==0&&h!==m.retryLane&&(m.retryLane=h,Yi(n,h),yi(u,n,h,-1))}return qc(),u=wc(Error(t(421))),sl(n,i,w,u)}return h.data==="$?"?(i.flags|=128,i.child=n.child,i=_v.bind(null,n),h._reactRetry=i,null):(n=m.treeContext,qn=vr(h.nextSibling),Yn=i,Yt=!0,gi=null,n!==null&&(ei[ti++]=Wi,ei[ti++]=Xi,ei[ti++]=jr,Wi=n.id,Xi=n.overflow,jr=i),i=Lc(i,u.children),i.flags|=4096,i)}function em(n,i,o){n.lanes|=i;var u=n.alternate;u!==null&&(u.lanes|=i),lc(n.return,i,o)}function Dc(n,i,o,u,h){var m=n.memoizedState;m===null?n.memoizedState={isBackwards:i,rendering:null,renderingStartTime:0,last:u,tail:o,tailMode:h}:(m.isBackwards=i,m.rendering=null,m.renderingStartTime=0,m.last=u,m.tail=o,m.tailMode=h)}function tm(n,i,o){var u=i.pendingProps,h=u.revealOrder,m=u.tail;if(Pn(n,i,u.children,o),u=$t.current,(u&2)!==0)u=u&1|2,i.flags|=128;else{if(n!==null&&(n.flags&128)!==0)e:for(n=i.child;n!==null;){if(n.tag===13)n.memoizedState!==null&&em(n,o,i);else if(n.tag===19)em(n,o,i);else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===i)break e;for(;n.sibling===null;){if(n.return===null||n.return===i)break e;n=n.return}n.sibling.return=n.return,n=n.sibling}u&=1}if(Bt($t,u),(i.mode&1)===0)i.memoizedState=null;else switch(h){case"forwards":for(o=i.child,h=null;o!==null;)n=o.alternate,n!==null&&jo(n)===null&&(h=o),o=o.sibling;o=h,o===null?(h=i.child,i.child=null):(h=o.sibling,o.sibling=null),Dc(i,!1,h,o,m);break;case"backwards":for(o=null,h=i.child,i.child=null;h!==null;){if(n=h.alternate,n!==null&&jo(n)===null){i.child=h;break}n=h.sibling,h.sibling=o,o=h,h=n}Dc(i,!0,o,null,m);break;case"together":Dc(i,!1,null,null,void 0);break;default:i.memoizedState=null}return i.child}function al(n,i){(i.mode&1)===0&&n!==null&&(n.alternate=null,i.alternate=null,i.flags|=2)}function Ki(n,i,o){if(n!==null&&(i.dependencies=n.dependencies),is|=i.lanes,(o&i.childLanes)===0)return null;if(n!==null&&i.child!==n.child)throw Error(t(153));if(i.child!==null){for(n=i.child,o=Cr(n,n.pendingProps),i.child=o,o.return=i;n.sibling!==null;)n=n.sibling,o=o.sibling=Cr(n,n.pendingProps),o.return=i;o.sibling=null}return i.child}function sv(n,i,o){switch(i.tag){case 3:Jp(i),Ds();break;case 5:mp(i);break;case 1:On(i.type)&&Ho(i);break;case 4:fc(i,i.stateNode.containerInfo);break;case 10:var u=i.type._context,h=i.memoizedProps.value;Bt(Ko,u._currentValue),u._currentValue=h;break;case 13:if(u=i.memoizedState,u!==null)return u.dehydrated!==null?(Bt($t,$t.current&1),i.flags|=128,null):(o&i.child.childLanes)!==0?Qp(n,i,o):(Bt($t,$t.current&1),n=Ki(n,i,o),n!==null?n.sibling:null);Bt($t,$t.current&1);break;case 19:if(u=(o&i.childLanes)!==0,(n.flags&128)!==0){if(u)return tm(n,i,o);i.flags|=128}if(h=i.memoizedState,h!==null&&(h.rendering=null,h.tail=null,h.lastEffect=null),Bt($t,$t.current),u)break;return null;case 22:case 23:return i.lanes=0,Kp(n,i,o)}return Ki(n,i,o)}var nm,Ic,im,rm;nm=function(n,i){for(var o=i.child;o!==null;){if(o.tag===5||o.tag===6)n.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===i)break;for(;o.sibling===null;){if(o.return===null||o.return===i)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},Ic=function(){},im=function(n,i,o,u){var h=n.memoizedProps;if(h!==u){n=i.stateNode,ts(Pi.current);var m=null;switch(o){case"input":h=wt(n,h),u=wt(n,u),m=[];break;case"select":h=le({},h,{value:void 0}),u=le({},u,{value:void 0}),m=[];break;case"textarea":h=Wt(n,h),u=Wt(n,u),m=[];break;default:typeof h.onClick!="function"&&typeof u.onClick=="function"&&(n.onclick=ko)}Xe(o,u);var w;o=null;for(se in h)if(!u.hasOwnProperty(se)&&h.hasOwnProperty(se)&&h[se]!=null)if(se==="style"){var D=h[se];for(w in D)D.hasOwnProperty(w)&&(o||(o={}),o[w]="")}else se!=="dangerouslySetInnerHTML"&&se!=="children"&&se!=="suppressContentEditableWarning"&&se!=="suppressHydrationWarning"&&se!=="autoFocus"&&(a.hasOwnProperty(se)?m||(m=[]):(m=m||[]).push(se,null));for(se in u){var B=u[se];if(D=h!=null?h[se]:void 0,u.hasOwnProperty(se)&&B!==D&&(B!=null||D!=null))if(se==="style")if(D){for(w in D)!D.hasOwnProperty(w)||B&&B.hasOwnProperty(w)||(o||(o={}),o[w]="");for(w in B)B.hasOwnProperty(w)&&D[w]!==B[w]&&(o||(o={}),o[w]=B[w])}else o||(m||(m=[]),m.push(se,o)),o=B;else se==="dangerouslySetInnerHTML"?(B=B?B.__html:void 0,D=D?D.__html:void 0,B!=null&&D!==B&&(m=m||[]).push(se,B)):se==="children"?typeof B!="string"&&typeof B!="number"||(m=m||[]).push(se,""+B):se!=="suppressContentEditableWarning"&&se!=="suppressHydrationWarning"&&(a.hasOwnProperty(se)?(B!=null&&se==="onScroll"&&zt("scroll",n),m||D===B||(m=[])):(m=m||[]).push(se,B))}o&&(m=m||[]).push("style",o);var se=m;(i.updateQueue=se)&&(i.flags|=4)}},rm=function(n,i,o,u){o!==u&&(i.flags|=4)};function qa(n,i){if(!Yt)switch(n.tailMode){case"hidden":i=n.tail;for(var o=null;i!==null;)i.alternate!==null&&(o=i),i=i.sibling;o===null?n.tail=null:o.sibling=null;break;case"collapsed":o=n.tail;for(var u=null;o!==null;)o.alternate!==null&&(u=o),o=o.sibling;u===null?i||n.tail===null?n.tail=null:n.tail.sibling=null:u.sibling=null}}function Tn(n){var i=n.alternate!==null&&n.alternate.child===n.child,o=0,u=0;if(i)for(var h=n.child;h!==null;)o|=h.lanes|h.childLanes,u|=h.subtreeFlags&14680064,u|=h.flags&14680064,h.return=n,h=h.sibling;else for(h=n.child;h!==null;)o|=h.lanes|h.childLanes,u|=h.subtreeFlags,u|=h.flags,h.return=n,h=h.sibling;return n.subtreeFlags|=u,n.childLanes=o,i}function av(n,i,o){var u=i.pendingProps;switch(tc(i),i.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Tn(i),null;case 1:return On(i.type)&&Vo(),Tn(i),null;case 3:return u=i.stateNode,Fs(),Vt(Fn),Vt(Mn),pc(),u.pendingContext&&(u.context=u.pendingContext,u.pendingContext=null),(n===null||n.child===null)&&(Yo(i)?i.flags|=4:n===null||n.memoizedState.isDehydrated&&(i.flags&256)===0||(i.flags|=1024,gi!==null&&(Wc(gi),gi=null))),Ic(n,i),Tn(i),null;case 5:hc(i);var h=ts(Ha.current);if(o=i.type,n!==null&&i.stateNode!=null)im(n,i,o,u,h),n.ref!==i.ref&&(i.flags|=512,i.flags|=2097152);else{if(!u){if(i.stateNode===null)throw Error(t(166));return Tn(i),null}if(n=ts(Pi.current),Yo(i)){u=i.stateNode,o=i.type;var m=i.memoizedProps;switch(u[Ci]=i,u[Oa]=m,n=(i.mode&1)!==0,o){case"dialog":zt("cancel",u),zt("close",u);break;case"iframe":case"object":case"embed":zt("load",u);break;case"video":case"audio":for(h=0;h<Na.length;h++)zt(Na[h],u);break;case"source":zt("error",u);break;case"img":case"image":case"link":zt("error",u),zt("load",u);break;case"details":zt("toggle",u);break;case"input":yt(u,m),zt("invalid",u);break;case"select":u._wrapperState={wasMultiple:!!m.multiple},zt("invalid",u);break;case"textarea":G(u,m),zt("invalid",u)}Xe(o,m),h=null;for(var w in m)if(m.hasOwnProperty(w)){var D=m[w];w==="children"?typeof D=="string"?u.textContent!==D&&(m.suppressHydrationWarning!==!0&&Bo(u.textContent,D,n),h=["children",D]):typeof D=="number"&&u.textContent!==""+D&&(m.suppressHydrationWarning!==!0&&Bo(u.textContent,D,n),h=["children",""+D]):a.hasOwnProperty(w)&&D!=null&&w==="onScroll"&&zt("scroll",u)}switch(o){case"input":Qe(u),Jt(u,m,!0);break;case"textarea":Qe(u),Et(u);break;case"select":case"option":break;default:typeof m.onClick=="function"&&(u.onclick=ko)}u=h,i.updateQueue=u,u!==null&&(i.flags|=4)}else{w=h.nodeType===9?h:h.ownerDocument,n==="http://www.w3.org/1999/xhtml"&&(n=C(o)),n==="http://www.w3.org/1999/xhtml"?o==="script"?(n=w.createElement("div"),n.innerHTML="<script><\/script>",n=n.removeChild(n.firstChild)):typeof u.is=="string"?n=w.createElement(o,{is:u.is}):(n=w.createElement(o),o==="select"&&(w=n,u.multiple?w.multiple=!0:u.size&&(w.size=u.size))):n=w.createElementNS(n,o),n[Ci]=i,n[Oa]=u,nm(n,i,!1,!1),i.stateNode=n;e:{switch(w=Pe(o,u),o){case"dialog":zt("cancel",n),zt("close",n),h=u;break;case"iframe":case"object":case"embed":zt("load",n),h=u;break;case"video":case"audio":for(h=0;h<Na.length;h++)zt(Na[h],n);h=u;break;case"source":zt("error",n),h=u;break;case"img":case"image":case"link":zt("error",n),zt("load",n),h=u;break;case"details":zt("toggle",n),h=u;break;case"input":yt(n,u),h=wt(n,u),zt("invalid",n);break;case"option":h=u;break;case"select":n._wrapperState={wasMultiple:!!u.multiple},h=le({},u,{value:void 0}),zt("invalid",n);break;case"textarea":G(n,u),h=Wt(n,u),zt("invalid",n);break;default:h=u}Xe(o,h),D=h;for(m in D)if(D.hasOwnProperty(m)){var B=D[m];m==="style"?me(n,B):m==="dangerouslySetInnerHTML"?(B=B?B.__html:void 0,B!=null&&ne(n,B)):m==="children"?typeof B=="string"?(o!=="textarea"||B!=="")&&ue(n,B):typeof B=="number"&&ue(n,""+B):m!=="suppressContentEditableWarning"&&m!=="suppressHydrationWarning"&&m!=="autoFocus"&&(a.hasOwnProperty(m)?B!=null&&m==="onScroll"&&zt("scroll",n):B!=null&&F(n,m,B,w))}switch(o){case"input":Qe(n),Jt(n,u,!1);break;case"textarea":Qe(n),Et(n);break;case"option":u.value!=null&&n.setAttribute("value",""+pe(u.value));break;case"select":n.multiple=!!u.multiple,m=u.value,m!=null?Rt(n,!!u.multiple,m,!1):u.defaultValue!=null&&Rt(n,!!u.multiple,u.defaultValue,!0);break;default:typeof h.onClick=="function"&&(n.onclick=ko)}switch(o){case"button":case"input":case"select":case"textarea":u=!!u.autoFocus;break e;case"img":u=!0;break e;default:u=!1}}u&&(i.flags|=4)}i.ref!==null&&(i.flags|=512,i.flags|=2097152)}return Tn(i),null;case 6:if(n&&i.stateNode!=null)rm(n,i,n.memoizedProps,u);else{if(typeof u!="string"&&i.stateNode===null)throw Error(t(166));if(o=ts(Ha.current),ts(Pi.current),Yo(i)){if(u=i.stateNode,o=i.memoizedProps,u[Ci]=i,(m=u.nodeValue!==o)&&(n=Yn,n!==null))switch(n.tag){case 3:Bo(u.nodeValue,o,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&Bo(u.nodeValue,o,(n.mode&1)!==0)}m&&(i.flags|=4)}else u=(o.nodeType===9?o:o.ownerDocument).createTextNode(u),u[Ci]=i,i.stateNode=u}return Tn(i),null;case 13:if(Vt($t),u=i.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(Yt&&qn!==null&&(i.mode&1)!==0&&(i.flags&128)===0)op(),Ds(),i.flags|=98560,m=!1;else if(m=Yo(i),u!==null&&u.dehydrated!==null){if(n===null){if(!m)throw Error(t(318));if(m=i.memoizedState,m=m!==null?m.dehydrated:null,!m)throw Error(t(317));m[Ci]=i}else Ds(),(i.flags&128)===0&&(i.memoizedState=null),i.flags|=4;Tn(i),m=!1}else gi!==null&&(Wc(gi),gi=null),m=!0;if(!m)return i.flags&65536?i:null}return(i.flags&128)!==0?(i.lanes=o,i):(u=u!==null,u!==(n!==null&&n.memoizedState!==null)&&u&&(i.child.flags|=8192,(i.mode&1)!==0&&(n===null||($t.current&1)!==0?on===0&&(on=3):qc())),i.updateQueue!==null&&(i.flags|=4),Tn(i),null);case 4:return Fs(),Ic(n,i),n===null&&Ua(i.stateNode.containerInfo),Tn(i),null;case 10:return oc(i.type._context),Tn(i),null;case 17:return On(i.type)&&Vo(),Tn(i),null;case 19:if(Vt($t),m=i.memoizedState,m===null)return Tn(i),null;if(u=(i.flags&128)!==0,w=m.rendering,w===null)if(u)qa(m,!1);else{if(on!==0||n!==null&&(n.flags&128)!==0)for(n=i.child;n!==null;){if(w=jo(n),w!==null){for(i.flags|=128,qa(m,!1),u=w.updateQueue,u!==null&&(i.updateQueue=u,i.flags|=4),i.subtreeFlags=0,u=o,o=i.child;o!==null;)m=o,n=u,m.flags&=14680066,w=m.alternate,w===null?(m.childLanes=0,m.lanes=n,m.child=null,m.subtreeFlags=0,m.memoizedProps=null,m.memoizedState=null,m.updateQueue=null,m.dependencies=null,m.stateNode=null):(m.childLanes=w.childLanes,m.lanes=w.lanes,m.child=w.child,m.subtreeFlags=0,m.deletions=null,m.memoizedProps=w.memoizedProps,m.memoizedState=w.memoizedState,m.updateQueue=w.updateQueue,m.type=w.type,n=w.dependencies,m.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),o=o.sibling;return Bt($t,$t.current&1|2),i.child}n=n.sibling}m.tail!==null&&Kt()>zs&&(i.flags|=128,u=!0,qa(m,!1),i.lanes=4194304)}else{if(!u)if(n=jo(w),n!==null){if(i.flags|=128,u=!0,o=n.updateQueue,o!==null&&(i.updateQueue=o,i.flags|=4),qa(m,!0),m.tail===null&&m.tailMode==="hidden"&&!w.alternate&&!Yt)return Tn(i),null}else 2*Kt()-m.renderingStartTime>zs&&o!==1073741824&&(i.flags|=128,u=!0,qa(m,!1),i.lanes=4194304);m.isBackwards?(w.sibling=i.child,i.child=w):(o=m.last,o!==null?o.sibling=w:i.child=w,m.last=w)}return m.tail!==null?(i=m.tail,m.rendering=i,m.tail=i.sibling,m.renderingStartTime=Kt(),i.sibling=null,o=$t.current,Bt($t,u?o&1|2:o&1),i):(Tn(i),null);case 22:case 23:return Yc(),u=i.memoizedState!==null,n!==null&&n.memoizedState!==null!==u&&(i.flags|=8192),u&&(i.mode&1)!==0?(Kn&1073741824)!==0&&(Tn(i),i.subtreeFlags&6&&(i.flags|=8192)):Tn(i),null;case 24:return null;case 25:return null}throw Error(t(156,i.tag))}function ov(n,i){switch(tc(i),i.tag){case 1:return On(i.type)&&Vo(),n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 3:return Fs(),Vt(Fn),Vt(Mn),pc(),n=i.flags,(n&65536)!==0&&(n&128)===0?(i.flags=n&-65537|128,i):null;case 5:return hc(i),null;case 13:if(Vt($t),n=i.memoizedState,n!==null&&n.dehydrated!==null){if(i.alternate===null)throw Error(t(340));Ds()}return n=i.flags,n&65536?(i.flags=n&-65537|128,i):null;case 19:return Vt($t),null;case 4:return Fs(),null;case 10:return oc(i.type._context),null;case 22:case 23:return Yc(),null;case 24:return null;default:return null}}var ol=!1,wn=!1,lv=typeof WeakSet=="function"?WeakSet:Set,Be=null;function Bs(n,i){var o=n.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(u){Qt(n,i,u)}else o.current=null}function Nc(n,i,o){try{o()}catch(u){Qt(n,i,u)}}var sm=!1;function uv(n,i){if(Yu=bo,n=Od(),Bu(n)){if("selectionStart"in n)var o={start:n.selectionStart,end:n.selectionEnd};else e:{o=(o=n.ownerDocument)&&o.defaultView||window;var u=o.getSelection&&o.getSelection();if(u&&u.rangeCount!==0){o=u.anchorNode;var h=u.anchorOffset,m=u.focusNode;u=u.focusOffset;try{o.nodeType,m.nodeType}catch{o=null;break e}var w=0,D=-1,B=-1,se=0,xe=0,ye=n,ve=null;t:for(;;){for(var Fe;ye!==o||h!==0&&ye.nodeType!==3||(D=w+h),ye!==m||u!==0&&ye.nodeType!==3||(B=w+u),ye.nodeType===3&&(w+=ye.nodeValue.length),(Fe=ye.firstChild)!==null;)ve=ye,ye=Fe;for(;;){if(ye===n)break t;if(ve===o&&++se===h&&(D=w),ve===m&&++xe===u&&(B=w),(Fe=ye.nextSibling)!==null)break;ye=ve,ve=ye.parentNode}ye=Fe}o=D===-1||B===-1?null:{start:D,end:B}}else o=null}o=o||{start:0,end:0}}else o=null;for(qu={focusedElem:n,selectionRange:o},bo=!1,Be=i;Be!==null;)if(i=Be,n=i.child,(i.subtreeFlags&1028)!==0&&n!==null)n.return=i,Be=n;else for(;Be!==null;){i=Be;try{var Ve=i.alternate;if((i.flags&1024)!==0)switch(i.tag){case 0:case 11:case 15:break;case 1:if(Ve!==null){var We=Ve.memoizedProps,en=Ve.memoizedState,Z=i.stateNode,H=Z.getSnapshotBeforeUpdate(i.elementType===i.type?We:_i(i.type,We),en);Z.__reactInternalSnapshotBeforeUpdate=H}break;case 3:var te=i.stateNode.containerInfo;te.nodeType===1?te.textContent="":te.nodeType===9&&te.documentElement&&te.removeChild(te.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(t(163))}}catch(Me){Qt(i,i.return,Me)}if(n=i.sibling,n!==null){n.return=i.return,Be=n;break}Be=i.return}return Ve=sm,sm=!1,Ve}function Ka(n,i,o){var u=i.updateQueue;if(u=u!==null?u.lastEffect:null,u!==null){var h=u=u.next;do{if((h.tag&n)===n){var m=h.destroy;h.destroy=void 0,m!==void 0&&Nc(i,o,m)}h=h.next}while(h!==u)}}function ll(n,i){if(i=i.updateQueue,i=i!==null?i.lastEffect:null,i!==null){var o=i=i.next;do{if((o.tag&n)===n){var u=o.create;o.destroy=u()}o=o.next}while(o!==i)}}function Uc(n){var i=n.ref;if(i!==null){var o=n.stateNode;switch(n.tag){case 5:n=o;break;default:n=o}typeof i=="function"?i(n):i.current=n}}function am(n){var i=n.alternate;i!==null&&(n.alternate=null,am(i)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(i=n.stateNode,i!==null&&(delete i[Ci],delete i[Oa],delete i[Ju],delete i[X0],delete i[Y0])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function om(n){return n.tag===5||n.tag===3||n.tag===4}function lm(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||om(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function Fc(n,i,o){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?o.nodeType===8?o.parentNode.insertBefore(n,i):o.insertBefore(n,i):(o.nodeType===8?(i=o.parentNode,i.insertBefore(n,o)):(i=o,i.appendChild(n)),o=o._reactRootContainer,o!=null||i.onclick!==null||(i.onclick=ko));else if(u!==4&&(n=n.child,n!==null))for(Fc(n,i,o),n=n.sibling;n!==null;)Fc(n,i,o),n=n.sibling}function Oc(n,i,o){var u=n.tag;if(u===5||u===6)n=n.stateNode,i?o.insertBefore(n,i):o.appendChild(n);else if(u!==4&&(n=n.child,n!==null))for(Oc(n,i,o),n=n.sibling;n!==null;)Oc(n,i,o),n=n.sibling}var _n=null,vi=!1;function Tr(n,i,o){for(o=o.child;o!==null;)um(n,i,o),o=o.sibling}function um(n,i,o){if(Te&&typeof Te.onCommitFiberUnmount=="function")try{Te.onCommitFiberUnmount(j,o)}catch{}switch(o.tag){case 5:wn||Bs(o,i);case 6:var u=_n,h=vi;_n=null,Tr(n,i,o),_n=u,vi=h,_n!==null&&(vi?(n=_n,o=o.stateNode,n.nodeType===8?n.parentNode.removeChild(o):n.removeChild(o)):_n.removeChild(o.stateNode));break;case 18:_n!==null&&(vi?(n=_n,o=o.stateNode,n.nodeType===8?Zu(n.parentNode,o):n.nodeType===1&&Zu(n,o),Aa(n)):Zu(_n,o.stateNode));break;case 4:u=_n,h=vi,_n=o.stateNode.containerInfo,vi=!0,Tr(n,i,o),_n=u,vi=h;break;case 0:case 11:case 14:case 15:if(!wn&&(u=o.updateQueue,u!==null&&(u=u.lastEffect,u!==null))){h=u=u.next;do{var m=h,w=m.destroy;m=m.tag,w!==void 0&&((m&2)!==0||(m&4)!==0)&&Nc(o,i,w),h=h.next}while(h!==u)}Tr(n,i,o);break;case 1:if(!wn&&(Bs(o,i),u=o.stateNode,typeof u.componentWillUnmount=="function"))try{u.props=o.memoizedProps,u.state=o.memoizedState,u.componentWillUnmount()}catch(D){Qt(o,i,D)}Tr(n,i,o);break;case 21:Tr(n,i,o);break;case 22:o.mode&1?(wn=(u=wn)||o.memoizedState!==null,Tr(n,i,o),wn=u):Tr(n,i,o);break;default:Tr(n,i,o)}}function cm(n){var i=n.updateQueue;if(i!==null){n.updateQueue=null;var o=n.stateNode;o===null&&(o=n.stateNode=new lv),i.forEach(function(u){var h=vv.bind(null,n,u);o.has(u)||(o.add(u),u.then(h,h))})}}function xi(n,i){var o=i.deletions;if(o!==null)for(var u=0;u<o.length;u++){var h=o[u];try{var m=n,w=i,D=w;e:for(;D!==null;){switch(D.tag){case 5:_n=D.stateNode,vi=!1;break e;case 3:_n=D.stateNode.containerInfo,vi=!0;break e;case 4:_n=D.stateNode.containerInfo,vi=!0;break e}D=D.return}if(_n===null)throw Error(t(160));um(m,w,h),_n=null,vi=!1;var B=h.alternate;B!==null&&(B.return=null),h.return=null}catch(se){Qt(h,i,se)}}if(i.subtreeFlags&12854)for(i=i.child;i!==null;)fm(i,n),i=i.sibling}function fm(n,i){var o=n.alternate,u=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(xi(i,n),Di(n),u&4){try{Ka(3,n,n.return),ll(3,n)}catch(We){Qt(n,n.return,We)}try{Ka(5,n,n.return)}catch(We){Qt(n,n.return,We)}}break;case 1:xi(i,n),Di(n),u&512&&o!==null&&Bs(o,o.return);break;case 5:if(xi(i,n),Di(n),u&512&&o!==null&&Bs(o,o.return),n.flags&32){var h=n.stateNode;try{ue(h,"")}catch(We){Qt(n,n.return,We)}}if(u&4&&(h=n.stateNode,h!=null)){var m=n.memoizedProps,w=o!==null?o.memoizedProps:m,D=n.type,B=n.updateQueue;if(n.updateQueue=null,B!==null)try{D==="input"&&m.type==="radio"&&m.name!=null&&vt(h,m),Pe(D,w);var se=Pe(D,m);for(w=0;w<B.length;w+=2){var xe=B[w],ye=B[w+1];xe==="style"?me(h,ye):xe==="dangerouslySetInnerHTML"?ne(h,ye):xe==="children"?ue(h,ye):F(h,xe,ye,se)}switch(D){case"input":Gt(h,m);break;case"textarea":mn(h,m);break;case"select":var ve=h._wrapperState.wasMultiple;h._wrapperState.wasMultiple=!!m.multiple;var Fe=m.value;Fe!=null?Rt(h,!!m.multiple,Fe,!1):ve!==!!m.multiple&&(m.defaultValue!=null?Rt(h,!!m.multiple,m.defaultValue,!0):Rt(h,!!m.multiple,m.multiple?[]:"",!1))}h[Oa]=m}catch(We){Qt(n,n.return,We)}}break;case 6:if(xi(i,n),Di(n),u&4){if(n.stateNode===null)throw Error(t(162));h=n.stateNode,m=n.memoizedProps;try{h.nodeValue=m}catch(We){Qt(n,n.return,We)}}break;case 3:if(xi(i,n),Di(n),u&4&&o!==null&&o.memoizedState.isDehydrated)try{Aa(i.containerInfo)}catch(We){Qt(n,n.return,We)}break;case 4:xi(i,n),Di(n);break;case 13:xi(i,n),Di(n),h=n.child,h.flags&8192&&(m=h.memoizedState!==null,h.stateNode.isHidden=m,!m||h.alternate!==null&&h.alternate.memoizedState!==null||(zc=Kt())),u&4&&cm(n);break;case 22:if(xe=o!==null&&o.memoizedState!==null,n.mode&1?(wn=(se=wn)||xe,xi(i,n),wn=se):xi(i,n),Di(n),u&8192){if(se=n.memoizedState!==null,(n.stateNode.isHidden=se)&&!xe&&(n.mode&1)!==0)for(Be=n,xe=n.child;xe!==null;){for(ye=Be=xe;Be!==null;){switch(ve=Be,Fe=ve.child,ve.tag){case 0:case 11:case 14:case 15:Ka(4,ve,ve.return);break;case 1:Bs(ve,ve.return);var Ve=ve.stateNode;if(typeof Ve.componentWillUnmount=="function"){u=ve,o=ve.return;try{i=u,Ve.props=i.memoizedProps,Ve.state=i.memoizedState,Ve.componentWillUnmount()}catch(We){Qt(u,o,We)}}break;case 5:Bs(ve,ve.return);break;case 22:if(ve.memoizedState!==null){pm(ye);continue}}Fe!==null?(Fe.return=ve,Be=Fe):pm(ye)}xe=xe.sibling}e:for(xe=null,ye=n;;){if(ye.tag===5){if(xe===null){xe=ye;try{h=ye.stateNode,se?(m=h.style,typeof m.setProperty=="function"?m.setProperty("display","none","important"):m.display="none"):(D=ye.stateNode,B=ye.memoizedProps.style,w=B!=null&&B.hasOwnProperty("display")?B.display:null,D.style.display=fe("display",w))}catch(We){Qt(n,n.return,We)}}}else if(ye.tag===6){if(xe===null)try{ye.stateNode.nodeValue=se?"":ye.memoizedProps}catch(We){Qt(n,n.return,We)}}else if((ye.tag!==22&&ye.tag!==23||ye.memoizedState===null||ye===n)&&ye.child!==null){ye.child.return=ye,ye=ye.child;continue}if(ye===n)break e;for(;ye.sibling===null;){if(ye.return===null||ye.return===n)break e;xe===ye&&(xe=null),ye=ye.return}xe===ye&&(xe=null),ye.sibling.return=ye.return,ye=ye.sibling}}break;case 19:xi(i,n),Di(n),u&4&&cm(n);break;case 21:break;default:xi(i,n),Di(n)}}function Di(n){var i=n.flags;if(i&2){try{e:{for(var o=n.return;o!==null;){if(om(o)){var u=o;break e}o=o.return}throw Error(t(160))}switch(u.tag){case 5:var h=u.stateNode;u.flags&32&&(ue(h,""),u.flags&=-33);var m=lm(n);Oc(n,m,h);break;case 3:case 4:var w=u.stateNode.containerInfo,D=lm(n);Fc(n,D,w);break;default:throw Error(t(161))}}catch(B){Qt(n,n.return,B)}n.flags&=-3}i&4096&&(n.flags&=-4097)}function cv(n,i,o){Be=n,hm(n)}function hm(n,i,o){for(var u=(n.mode&1)!==0;Be!==null;){var h=Be,m=h.child;if(h.tag===22&&u){var w=h.memoizedState!==null||ol;if(!w){var D=h.alternate,B=D!==null&&D.memoizedState!==null||wn;D=ol;var se=wn;if(ol=w,(wn=B)&&!se)for(Be=h;Be!==null;)w=Be,B=w.child,w.tag===22&&w.memoizedState!==null?mm(h):B!==null?(B.return=w,Be=B):mm(h);for(;m!==null;)Be=m,hm(m),m=m.sibling;Be=h,ol=D,wn=se}dm(n)}else(h.subtreeFlags&8772)!==0&&m!==null?(m.return=h,Be=m):dm(n)}}function dm(n){for(;Be!==null;){var i=Be;if((i.flags&8772)!==0){var o=i.alternate;try{if((i.flags&8772)!==0)switch(i.tag){case 0:case 11:case 15:wn||ll(5,i);break;case 1:var u=i.stateNode;if(i.flags&4&&!wn)if(o===null)u.componentDidMount();else{var h=i.elementType===i.type?o.memoizedProps:_i(i.type,o.memoizedProps);u.componentDidUpdate(h,o.memoizedState,u.__reactInternalSnapshotBeforeUpdate)}var m=i.updateQueue;m!==null&&pp(i,m,u);break;case 3:var w=i.updateQueue;if(w!==null){if(o=null,i.child!==null)switch(i.child.tag){case 5:o=i.child.stateNode;break;case 1:o=i.child.stateNode}pp(i,w,o)}break;case 5:var D=i.stateNode;if(o===null&&i.flags&4){o=D;var B=i.memoizedProps;switch(i.type){case"button":case"input":case"select":case"textarea":B.autoFocus&&o.focus();break;case"img":B.src&&(o.src=B.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(i.memoizedState===null){var se=i.alternate;if(se!==null){var xe=se.memoizedState;if(xe!==null){var ye=xe.dehydrated;ye!==null&&Aa(ye)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(t(163))}wn||i.flags&512&&Uc(i)}catch(ve){Qt(i,i.return,ve)}}if(i===n){Be=null;break}if(o=i.sibling,o!==null){o.return=i.return,Be=o;break}Be=i.return}}function pm(n){for(;Be!==null;){var i=Be;if(i===n){Be=null;break}var o=i.sibling;if(o!==null){o.return=i.return,Be=o;break}Be=i.return}}function mm(n){for(;Be!==null;){var i=Be;try{switch(i.tag){case 0:case 11:case 15:var o=i.return;try{ll(4,i)}catch(B){Qt(i,o,B)}break;case 1:var u=i.stateNode;if(typeof u.componentDidMount=="function"){var h=i.return;try{u.componentDidMount()}catch(B){Qt(i,h,B)}}var m=i.return;try{Uc(i)}catch(B){Qt(i,m,B)}break;case 5:var w=i.return;try{Uc(i)}catch(B){Qt(i,w,B)}}}catch(B){Qt(i,i.return,B)}if(i===n){Be=null;break}var D=i.sibling;if(D!==null){D.return=i.return,Be=D;break}Be=i.return}}var fv=Math.ceil,ul=R.ReactCurrentDispatcher,Bc=R.ReactCurrentOwner,ri=R.ReactCurrentBatchConfig,Mt=0,hn=null,rn=null,vn=0,Kn=0,ks=xr(0),on=0,$a=null,is=0,cl=0,kc=0,Za=null,kn=null,zc=0,zs=1/0,$i=null,fl=!1,Vc=null,wr=null,hl=!1,Ar=null,dl=0,Ja=0,Hc=null,pl=-1,ml=0;function Ln(){return(Mt&6)!==0?Kt():pl!==-1?pl:pl=Kt()}function br(n){return(n.mode&1)===0?1:(Mt&2)!==0&&vn!==0?vn&-vn:K0.transition!==null?(ml===0&&(ml=Ue()),ml):(n=mt,n!==0||(n=window.event,n=n===void 0?16:_d(n.type)),n)}function yi(n,i,o,u){if(50<Ja)throw Ja=0,Hc=null,Error(t(185));dt(n,o,u),((Mt&2)===0||n!==hn)&&(n===hn&&((Mt&2)===0&&(cl|=o),on===4&&Rr(n,vn)),zn(n,u),o===1&&Mt===0&&(i.mode&1)===0&&(zs=Kt()+500,Go&&Sr()))}function zn(n,i){var o=n.callbackNode;Ct(n,i);var u=Ot(n,n===hn?vn:0);if(u===0)o!==null&&ya(o),n.callbackNode=null,n.callbackPriority=0;else if(i=u&-u,n.callbackPriority!==i){if(o!=null&&ya(o),i===1)n.tag===0?q0(_m.bind(null,n)):np(_m.bind(null,n)),G0(function(){(Mt&6)===0&&Sr()}),o=null;else{switch(Vi(u)){case 1:o=Sa;break;case 4:o=A;break;case 16:o=W;break;case 536870912:o=Q;break;default:o=W}o=wm(o,gm.bind(null,n))}n.callbackPriority=i,n.callbackNode=o}}function gm(n,i){if(pl=-1,ml=0,(Mt&6)!==0)throw Error(t(327));var o=n.callbackNode;if(Vs()&&n.callbackNode!==o)return null;var u=Ot(n,n===hn?vn:0);if(u===0)return null;if((u&30)!==0||(u&n.expiredLanes)!==0||i)i=gl(n,u);else{i=u;var h=Mt;Mt|=2;var m=xm();(hn!==n||vn!==i)&&($i=null,zs=Kt()+500,ss(n,i));do try{pv();break}catch(D){vm(n,D)}while(!0);ac(),ul.current=m,Mt=h,rn!==null?i=0:(hn=null,vn=0,i=on)}if(i!==0){if(i===2&&(h=nn(n),h!==0&&(u=h,i=Gc(n,h))),i===1)throw o=$a,ss(n,0),Rr(n,u),zn(n,Kt()),o;if(i===6)Rr(n,u);else{if(h=n.current.alternate,(u&30)===0&&!hv(h)&&(i=gl(n,u),i===2&&(m=nn(n),m!==0&&(u=m,i=Gc(n,m))),i===1))throw o=$a,ss(n,0),Rr(n,u),zn(n,Kt()),o;switch(n.finishedWork=h,n.finishedLanes=u,i){case 0:case 1:throw Error(t(345));case 2:as(n,kn,$i);break;case 3:if(Rr(n,u),(u&130023424)===u&&(i=zc+500-Kt(),10<i)){if(Ot(n,0)!==0)break;if(h=n.suspendedLanes,(h&u)!==u){Ln(),n.pingedLanes|=n.suspendedLanes&h;break}n.timeoutHandle=$u(as.bind(null,n,kn,$i),i);break}as(n,kn,$i);break;case 4:if(Rr(n,u),(u&4194240)===u)break;for(i=n.eventTimes,h=-1;0<u;){var w=31-Ee(u);m=1<<w,w=i[w],w>h&&(h=w),u&=~m}if(u=h,u=Kt()-u,u=(120>u?120:480>u?480:1080>u?1080:1920>u?1920:3e3>u?3e3:4320>u?4320:1960*fv(u/1960))-u,10<u){n.timeoutHandle=$u(as.bind(null,n,kn,$i),u);break}as(n,kn,$i);break;case 5:as(n,kn,$i);break;default:throw Error(t(329))}}}return zn(n,Kt()),n.callbackNode===o?gm.bind(null,n):null}function Gc(n,i){var o=Za;return n.current.memoizedState.isDehydrated&&(ss(n,i).flags|=256),n=gl(n,i),n!==2&&(i=kn,kn=o,i!==null&&Wc(i)),n}function Wc(n){kn===null?kn=n:kn.push.apply(kn,n)}function hv(n){for(var i=n;;){if(i.flags&16384){var o=i.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var u=0;u<o.length;u++){var h=o[u],m=h.getSnapshot;h=h.value;try{if(!mi(m(),h))return!1}catch{return!1}}}if(o=i.child,i.subtreeFlags&16384&&o!==null)o.return=i,i=o;else{if(i===n)break;for(;i.sibling===null;){if(i.return===null||i.return===n)return!0;i=i.return}i.sibling.return=i.return,i=i.sibling}}return!0}function Rr(n,i){for(i&=~kc,i&=~cl,n.suspendedLanes|=i,n.pingedLanes&=~i,n=n.expirationTimes;0<i;){var o=31-Ee(i),u=1<<o;n[o]=-1,i&=~u}}function _m(n){if((Mt&6)!==0)throw Error(t(327));Vs();var i=Ot(n,0);if((i&1)===0)return zn(n,Kt()),null;var o=gl(n,i);if(n.tag!==0&&o===2){var u=nn(n);u!==0&&(i=u,o=Gc(n,u))}if(o===1)throw o=$a,ss(n,0),Rr(n,i),zn(n,Kt()),o;if(o===6)throw Error(t(345));return n.finishedWork=n.current.alternate,n.finishedLanes=i,as(n,kn,$i),zn(n,Kt()),null}function Xc(n,i){var o=Mt;Mt|=1;try{return n(i)}finally{Mt=o,Mt===0&&(zs=Kt()+500,Go&&Sr())}}function rs(n){Ar!==null&&Ar.tag===0&&(Mt&6)===0&&Vs();var i=Mt;Mt|=1;var o=ri.transition,u=mt;try{if(ri.transition=null,mt=1,n)return n()}finally{mt=u,ri.transition=o,Mt=i,(Mt&6)===0&&Sr()}}function Yc(){Kn=ks.current,Vt(ks)}function ss(n,i){n.finishedWork=null,n.finishedLanes=0;var o=n.timeoutHandle;if(o!==-1&&(n.timeoutHandle=-1,H0(o)),rn!==null)for(o=rn.return;o!==null;){var u=o;switch(tc(u),u.tag){case 1:u=u.type.childContextTypes,u!=null&&Vo();break;case 3:Fs(),Vt(Fn),Vt(Mn),pc();break;case 5:hc(u);break;case 4:Fs();break;case 13:Vt($t);break;case 19:Vt($t);break;case 10:oc(u.type._context);break;case 22:case 23:Yc()}o=o.return}if(hn=n,rn=n=Cr(n.current,null),vn=Kn=i,on=0,$a=null,kc=cl=is=0,kn=Za=null,es!==null){for(i=0;i<es.length;i++)if(o=es[i],u=o.interleaved,u!==null){o.interleaved=null;var h=u.next,m=o.pending;if(m!==null){var w=m.next;m.next=h,u.next=w}o.pending=u}es=null}return n}function vm(n,i){do{var o=rn;try{if(ac(),Qo.current=il,el){for(var u=Zt.memoizedState;u!==null;){var h=u.queue;h!==null&&(h.pending=null),u=u.next}el=!1}if(ns=0,fn=an=Zt=null,Ga=!1,Wa=0,Bc.current=null,o===null||o.return===null){on=1,$a=i,rn=null;break}e:{var m=n,w=o.return,D=o,B=i;if(i=vn,D.flags|=32768,B!==null&&typeof B=="object"&&typeof B.then=="function"){var se=B,xe=D,ye=xe.tag;if((xe.mode&1)===0&&(ye===0||ye===11||ye===15)){var ve=xe.alternate;ve?(xe.updateQueue=ve.updateQueue,xe.memoizedState=ve.memoizedState,xe.lanes=ve.lanes):(xe.updateQueue=null,xe.memoizedState=null)}var Fe=Gp(w);if(Fe!==null){Fe.flags&=-257,Wp(Fe,w,D,m,i),Fe.mode&1&&Hp(m,se,i),i=Fe,B=se;var Ve=i.updateQueue;if(Ve===null){var We=new Set;We.add(B),i.updateQueue=We}else Ve.add(B);break e}else{if((i&1)===0){Hp(m,se,i),qc();break e}B=Error(t(426))}}else if(Yt&&D.mode&1){var en=Gp(w);if(en!==null){(en.flags&65536)===0&&(en.flags|=256),Wp(en,w,D,m,i),rc(Os(B,D));break e}}m=B=Os(B,D),on!==4&&(on=2),Za===null?Za=[m]:Za.push(m),m=w;do{switch(m.tag){case 3:m.flags|=65536,i&=-i,m.lanes|=i;var Z=zp(m,B,i);dp(m,Z);break e;case 1:D=B;var H=m.type,te=m.stateNode;if((m.flags&128)===0&&(typeof H.getDerivedStateFromError=="function"||te!==null&&typeof te.componentDidCatch=="function"&&(wr===null||!wr.has(te)))){m.flags|=65536,i&=-i,m.lanes|=i;var Me=Vp(m,D,i);dp(m,Me);break e}}m=m.return}while(m!==null)}Sm(o)}catch(Ke){i=Ke,rn===o&&o!==null&&(rn=o=o.return);continue}break}while(!0)}function xm(){var n=ul.current;return ul.current=il,n===null?il:n}function qc(){(on===0||on===3||on===2)&&(on=4),hn===null||(is&268435455)===0&&(cl&268435455)===0||Rr(hn,vn)}function gl(n,i){var o=Mt;Mt|=2;var u=xm();(hn!==n||vn!==i)&&($i=null,ss(n,i));do try{dv();break}catch(h){vm(n,h)}while(!0);if(ac(),Mt=o,ul.current=u,rn!==null)throw Error(t(261));return hn=null,vn=0,on}function dv(){for(;rn!==null;)ym(rn)}function pv(){for(;rn!==null&&!wo();)ym(rn)}function ym(n){var i=Tm(n.alternate,n,Kn);n.memoizedProps=n.pendingProps,i===null?Sm(n):rn=i,Bc.current=null}function Sm(n){var i=n;do{var o=i.alternate;if(n=i.return,(i.flags&32768)===0){if(o=av(o,i,Kn),o!==null){rn=o;return}}else{if(o=ov(o,i),o!==null){o.flags&=32767,rn=o;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{on=6,rn=null;return}}if(i=i.sibling,i!==null){rn=i;return}rn=i=n}while(i!==null);on===0&&(on=5)}function as(n,i,o){var u=mt,h=ri.transition;try{ri.transition=null,mt=1,mv(n,i,o,u)}finally{ri.transition=h,mt=u}return null}function mv(n,i,o,u){do Vs();while(Ar!==null);if((Mt&6)!==0)throw Error(t(327));o=n.finishedWork;var h=n.finishedLanes;if(o===null)return null;if(n.finishedWork=null,n.finishedLanes=0,o===n.current)throw Error(t(177));n.callbackNode=null,n.callbackPriority=0;var m=o.lanes|o.childLanes;if(Nn(n,m),n===hn&&(rn=hn=null,vn=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||hl||(hl=!0,wm(W,function(){return Vs(),null})),m=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||m){m=ri.transition,ri.transition=null;var w=mt;mt=1;var D=Mt;Mt|=4,Bc.current=null,uv(n,o),fm(o,n),U0(qu),bo=!!Yu,qu=Yu=null,n.current=o,cv(o),wu(),Mt=D,mt=w,ri.transition=m}else n.current=o;if(hl&&(hl=!1,Ar=n,dl=h),m=n.pendingLanes,m===0&&(wr=null),Oe(o.stateNode),zn(n,Kt()),i!==null)for(u=n.onRecoverableError,o=0;o<i.length;o++)h=i[o],u(h.value,{componentStack:h.stack,digest:h.digest});if(fl)throw fl=!1,n=Vc,Vc=null,n;return(dl&1)!==0&&n.tag!==0&&Vs(),m=n.pendingLanes,(m&1)!==0?n===Hc?Ja++:(Ja=0,Hc=n):Ja=0,Sr(),null}function Vs(){if(Ar!==null){var n=Vi(dl),i=ri.transition,o=mt;try{if(ri.transition=null,mt=16>n?16:n,Ar===null)var u=!1;else{if(n=Ar,Ar=null,dl=0,(Mt&6)!==0)throw Error(t(331));var h=Mt;for(Mt|=4,Be=n.current;Be!==null;){var m=Be,w=m.child;if((Be.flags&16)!==0){var D=m.deletions;if(D!==null){for(var B=0;B<D.length;B++){var se=D[B];for(Be=se;Be!==null;){var xe=Be;switch(xe.tag){case 0:case 11:case 15:Ka(8,xe,m)}var ye=xe.child;if(ye!==null)ye.return=xe,Be=ye;else for(;Be!==null;){xe=Be;var ve=xe.sibling,Fe=xe.return;if(am(xe),xe===se){Be=null;break}if(ve!==null){ve.return=Fe,Be=ve;break}Be=Fe}}}var Ve=m.alternate;if(Ve!==null){var We=Ve.child;if(We!==null){Ve.child=null;do{var en=We.sibling;We.sibling=null,We=en}while(We!==null)}}Be=m}}if((m.subtreeFlags&2064)!==0&&w!==null)w.return=m,Be=w;else e:for(;Be!==null;){if(m=Be,(m.flags&2048)!==0)switch(m.tag){case 0:case 11:case 15:Ka(9,m,m.return)}var Z=m.sibling;if(Z!==null){Z.return=m.return,Be=Z;break e}Be=m.return}}var H=n.current;for(Be=H;Be!==null;){w=Be;var te=w.child;if((w.subtreeFlags&2064)!==0&&te!==null)te.return=w,Be=te;else e:for(w=H;Be!==null;){if(D=Be,(D.flags&2048)!==0)try{switch(D.tag){case 0:case 11:case 15:ll(9,D)}}catch(Ke){Qt(D,D.return,Ke)}if(D===w){Be=null;break e}var Me=D.sibling;if(Me!==null){Me.return=D.return,Be=Me;break e}Be=D.return}}if(Mt=h,Sr(),Te&&typeof Te.onPostCommitFiberRoot=="function")try{Te.onPostCommitFiberRoot(j,n)}catch{}u=!0}return u}finally{mt=o,ri.transition=i}}return!1}function Mm(n,i,o){i=Os(o,i),i=zp(n,i,1),n=Er(n,i,1),i=Ln(),n!==null&&(dt(n,1,i),zn(n,i))}function Qt(n,i,o){if(n.tag===3)Mm(n,n,o);else for(;i!==null;){if(i.tag===3){Mm(i,n,o);break}else if(i.tag===1){var u=i.stateNode;if(typeof i.type.getDerivedStateFromError=="function"||typeof u.componentDidCatch=="function"&&(wr===null||!wr.has(u))){n=Os(o,n),n=Vp(i,n,1),i=Er(i,n,1),n=Ln(),i!==null&&(dt(i,1,n),zn(i,n));break}}i=i.return}}function gv(n,i,o){var u=n.pingCache;u!==null&&u.delete(i),i=Ln(),n.pingedLanes|=n.suspendedLanes&o,hn===n&&(vn&o)===o&&(on===4||on===3&&(vn&130023424)===vn&&500>Kt()-zc?ss(n,0):kc|=o),zn(n,i)}function Em(n,i){i===0&&((n.mode&1)===0?i=1:(i=Ye,Ye<<=1,(Ye&130023424)===0&&(Ye=4194304)));var o=Ln();n=Yi(n,i),n!==null&&(dt(n,i,o),zn(n,o))}function _v(n){var i=n.memoizedState,o=0;i!==null&&(o=i.retryLane),Em(n,o)}function vv(n,i){var o=0;switch(n.tag){case 13:var u=n.stateNode,h=n.memoizedState;h!==null&&(o=h.retryLane);break;case 19:u=n.stateNode;break;default:throw Error(t(314))}u!==null&&u.delete(i),Em(n,o)}var Tm;Tm=function(n,i,o){if(n!==null)if(n.memoizedProps!==i.pendingProps||Fn.current)Bn=!0;else{if((n.lanes&o)===0&&(i.flags&128)===0)return Bn=!1,sv(n,i,o);Bn=(n.flags&131072)!==0}else Bn=!1,Yt&&(i.flags&1048576)!==0&&ip(i,Xo,i.index);switch(i.lanes=0,i.tag){case 2:var u=i.type;al(n,i),n=i.pendingProps;var h=Cs(i,Mn.current);Us(i,o),h=_c(null,i,u,n,h,o);var m=vc();return i.flags|=1,typeof h=="object"&&h!==null&&typeof h.render=="function"&&h.$$typeof===void 0?(i.tag=1,i.memoizedState=null,i.updateQueue=null,On(u)?(m=!0,Ho(i)):m=!1,i.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,cc(i),h.updater=rl,i.stateNode=h,h._reactInternals=i,Tc(i,u,n,o),i=Rc(null,i,u,!0,m,o)):(i.tag=0,Yt&&m&&ec(i),Pn(null,i,h,o),i=i.child),i;case 16:u=i.elementType;e:{switch(al(n,i),n=i.pendingProps,h=u._init,u=h(u._payload),i.type=u,h=i.tag=yv(u),n=_i(u,n),h){case 0:i=bc(null,i,u,n,o);break e;case 1:i=Zp(null,i,u,n,o);break e;case 11:i=Xp(null,i,u,n,o);break e;case 14:i=Yp(null,i,u,_i(u.type,n),o);break e}throw Error(t(306,u,""))}return i;case 0:return u=i.type,h=i.pendingProps,h=i.elementType===u?h:_i(u,h),bc(n,i,u,h,o);case 1:return u=i.type,h=i.pendingProps,h=i.elementType===u?h:_i(u,h),Zp(n,i,u,h,o);case 3:e:{if(Jp(i),n===null)throw Error(t(387));u=i.pendingProps,m=i.memoizedState,h=m.element,hp(n,i),Jo(i,u,null,o);var w=i.memoizedState;if(u=w.element,m.isDehydrated)if(m={element:u,isDehydrated:!1,cache:w.cache,pendingSuspenseBoundaries:w.pendingSuspenseBoundaries,transitions:w.transitions},i.updateQueue.baseState=m,i.memoizedState=m,i.flags&256){h=Os(Error(t(423)),i),i=jp(n,i,u,o,h);break e}else if(u!==h){h=Os(Error(t(424)),i),i=jp(n,i,u,o,h);break e}else for(qn=vr(i.stateNode.containerInfo.firstChild),Yn=i,Yt=!0,gi=null,o=cp(i,null,u,o),i.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(Ds(),u===h){i=Ki(n,i,o);break e}Pn(n,i,u,o)}i=i.child}return i;case 5:return mp(i),n===null&&ic(i),u=i.type,h=i.pendingProps,m=n!==null?n.memoizedProps:null,w=h.children,Ku(u,h)?w=null:m!==null&&Ku(u,m)&&(i.flags|=32),$p(n,i),Pn(n,i,w,o),i.child;case 6:return n===null&&ic(i),null;case 13:return Qp(n,i,o);case 4:return fc(i,i.stateNode.containerInfo),u=i.pendingProps,n===null?i.child=Is(i,null,u,o):Pn(n,i,u,o),i.child;case 11:return u=i.type,h=i.pendingProps,h=i.elementType===u?h:_i(u,h),Xp(n,i,u,h,o);case 7:return Pn(n,i,i.pendingProps,o),i.child;case 8:return Pn(n,i,i.pendingProps.children,o),i.child;case 12:return Pn(n,i,i.pendingProps.children,o),i.child;case 10:e:{if(u=i.type._context,h=i.pendingProps,m=i.memoizedProps,w=h.value,Bt(Ko,u._currentValue),u._currentValue=w,m!==null)if(mi(m.value,w)){if(m.children===h.children&&!Fn.current){i=Ki(n,i,o);break e}}else for(m=i.child,m!==null&&(m.return=i);m!==null;){var D=m.dependencies;if(D!==null){w=m.child;for(var B=D.firstContext;B!==null;){if(B.context===u){if(m.tag===1){B=qi(-1,o&-o),B.tag=2;var se=m.updateQueue;if(se!==null){se=se.shared;var xe=se.pending;xe===null?B.next=B:(B.next=xe.next,xe.next=B),se.pending=B}}m.lanes|=o,B=m.alternate,B!==null&&(B.lanes|=o),lc(m.return,o,i),D.lanes|=o;break}B=B.next}}else if(m.tag===10)w=m.type===i.type?null:m.child;else if(m.tag===18){if(w=m.return,w===null)throw Error(t(341));w.lanes|=o,D=w.alternate,D!==null&&(D.lanes|=o),lc(w,o,i),w=m.sibling}else w=m.child;if(w!==null)w.return=m;else for(w=m;w!==null;){if(w===i){w=null;break}if(m=w.sibling,m!==null){m.return=w.return,w=m;break}w=w.return}m=w}Pn(n,i,h.children,o),i=i.child}return i;case 9:return h=i.type,u=i.pendingProps.children,Us(i,o),h=ni(h),u=u(h),i.flags|=1,Pn(n,i,u,o),i.child;case 14:return u=i.type,h=_i(u,i.pendingProps),h=_i(u.type,h),Yp(n,i,u,h,o);case 15:return qp(n,i,i.type,i.pendingProps,o);case 17:return u=i.type,h=i.pendingProps,h=i.elementType===u?h:_i(u,h),al(n,i),i.tag=1,On(u)?(n=!0,Ho(i)):n=!1,Us(i,o),Bp(i,u,h),Tc(i,u,h,o),Rc(null,i,u,!0,n,o);case 19:return tm(n,i,o);case 22:return Kp(n,i,o)}throw Error(t(156,i.tag))};function wm(n,i){return Kr(n,i)}function xv(n,i,o,u){this.tag=n,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=i,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=u,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function si(n,i,o,u){return new xv(n,i,o,u)}function Kc(n){return n=n.prototype,!(!n||!n.isReactComponent)}function yv(n){if(typeof n=="function")return Kc(n)?1:0;if(n!=null){if(n=n.$$typeof,n===K)return 11;if(n===J)return 14}return 2}function Cr(n,i){var o=n.alternate;return o===null?(o=si(n.tag,i,n.key,n.mode),o.elementType=n.elementType,o.type=n.type,o.stateNode=n.stateNode,o.alternate=n,n.alternate=o):(o.pendingProps=i,o.type=n.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=n.flags&14680064,o.childLanes=n.childLanes,o.lanes=n.lanes,o.child=n.child,o.memoizedProps=n.memoizedProps,o.memoizedState=n.memoizedState,o.updateQueue=n.updateQueue,i=n.dependencies,o.dependencies=i===null?null:{lanes:i.lanes,firstContext:i.firstContext},o.sibling=n.sibling,o.index=n.index,o.ref=n.ref,o}function _l(n,i,o,u,h,m){var w=2;if(u=n,typeof n=="function")Kc(n)&&(w=1);else if(typeof n=="string")w=5;else e:switch(n){case O:return os(o.children,h,m,i);case T:w=8,h|=8;break;case L:return n=si(12,o,i,h|2),n.elementType=L,n.lanes=m,n;case ce:return n=si(13,o,i,h),n.elementType=ce,n.lanes=m,n;case he:return n=si(19,o,i,h),n.elementType=he,n.lanes=m,n;case ee:return vl(o,h,m,i);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case V:w=10;break e;case z:w=9;break e;case K:w=11;break e;case J:w=14;break e;case oe:w=16,u=null;break e}throw Error(t(130,n==null?n:typeof n,""))}return i=si(w,o,i,h),i.elementType=n,i.type=u,i.lanes=m,i}function os(n,i,o,u){return n=si(7,n,u,i),n.lanes=o,n}function vl(n,i,o,u){return n=si(22,n,u,i),n.elementType=ee,n.lanes=o,n.stateNode={isHidden:!1},n}function $c(n,i,o){return n=si(6,n,null,i),n.lanes=o,n}function Zc(n,i,o){return i=si(4,n.children!==null?n.children:[],n.key,i),i.lanes=o,i.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},i}function Sv(n,i,o,u,h){this.tag=i,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=gn(0),this.expirationTimes=gn(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gn(0),this.identifierPrefix=u,this.onRecoverableError=h,this.mutableSourceEagerHydrationData=null}function Jc(n,i,o,u,h,m,w,D,B){return n=new Sv(n,i,o,D,B),i===1?(i=1,m===!0&&(i|=8)):i=0,m=si(3,null,null,i),n.current=m,m.stateNode=n,m.memoizedState={element:u,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},cc(m),n}function Mv(n,i,o){var u=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:P,key:u==null?null:""+u,children:n,containerInfo:i,implementation:o}}function Am(n){if(!n)return yr;n=n._reactInternals;e:{if(Cn(n)!==n||n.tag!==1)throw Error(t(170));var i=n;do{switch(i.tag){case 3:i=i.stateNode.context;break e;case 1:if(On(i.type)){i=i.stateNode.__reactInternalMemoizedMergedChildContext;break e}}i=i.return}while(i!==null);throw Error(t(171))}if(n.tag===1){var o=n.type;if(On(o))return ep(n,o,i)}return i}function bm(n,i,o,u,h,m,w,D,B){return n=Jc(o,u,!0,n,h,m,w,D,B),n.context=Am(null),o=n.current,u=Ln(),h=br(o),m=qi(u,h),m.callback=i??null,Er(o,m,h),n.current.lanes=h,dt(n,h,u),zn(n,u),n}function xl(n,i,o,u){var h=i.current,m=Ln(),w=br(h);return o=Am(o),i.context===null?i.context=o:i.pendingContext=o,i=qi(m,w),i.payload={element:n},u=u===void 0?null:u,u!==null&&(i.callback=u),n=Er(h,i,w),n!==null&&(yi(n,h,w,m),Zo(n,h,w)),w}function yl(n){if(n=n.current,!n.child)return null;switch(n.child.tag){case 5:return n.child.stateNode;default:return n.child.stateNode}}function Rm(n,i){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var o=n.retryLane;n.retryLane=o!==0&&o<i?o:i}}function jc(n,i){Rm(n,i),(n=n.alternate)&&Rm(n,i)}function Ev(){return null}var Cm=typeof reportError=="function"?reportError:function(n){console.error(n)};function Qc(n){this._internalRoot=n}Sl.prototype.render=Qc.prototype.render=function(n){var i=this._internalRoot;if(i===null)throw Error(t(409));xl(n,i,null,null)},Sl.prototype.unmount=Qc.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var i=n.containerInfo;rs(function(){xl(null,n,null,null)}),i[Hi]=null}};function Sl(n){this._internalRoot=n}Sl.prototype.unstable_scheduleHydration=function(n){if(n){var i=Pt();n={blockedOn:null,target:n,priority:i};for(var o=0;o<mr.length&&i!==0&&i<mr[o].priority;o++);mr.splice(o,0,n),o===0&&md(n)}};function ef(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function Ml(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function Pm(){}function Tv(n,i,o,u,h){if(h){if(typeof u=="function"){var m=u;u=function(){var se=yl(w);m.call(se)}}var w=bm(i,u,n,0,null,!1,!1,"",Pm);return n._reactRootContainer=w,n[Hi]=w.current,Ua(n.nodeType===8?n.parentNode:n),rs(),w}for(;h=n.lastChild;)n.removeChild(h);if(typeof u=="function"){var D=u;u=function(){var se=yl(B);D.call(se)}}var B=Jc(n,0,!1,null,null,!1,!1,"",Pm);return n._reactRootContainer=B,n[Hi]=B.current,Ua(n.nodeType===8?n.parentNode:n),rs(function(){xl(i,B,o,u)}),B}function El(n,i,o,u,h){var m=o._reactRootContainer;if(m){var w=m;if(typeof h=="function"){var D=h;h=function(){var B=yl(w);D.call(B)}}xl(i,w,n,h)}else w=Tv(o,i,n,h,u);return yl(w)}bt=function(n){switch(n.tag){case 3:var i=n.stateNode;if(i.current.memoizedState.isDehydrated){var o=St(i.pendingLanes);o!==0&&(Un(i,o|1),zn(i,Kt()),(Mt&6)===0&&(zs=Kt()+500,Sr()))}break;case 13:rs(function(){var u=Yi(n,1);if(u!==null){var h=Ln();yi(u,n,1,h)}}),jc(n,1)}},kt=function(n){if(n.tag===13){var i=Yi(n,134217728);if(i!==null){var o=Ln();yi(i,n,134217728,o)}jc(n,134217728)}},di=function(n){if(n.tag===13){var i=br(n),o=Yi(n,i);if(o!==null){var u=Ln();yi(o,n,i,u)}jc(n,i)}},Pt=function(){return mt},pi=function(n,i){var o=mt;try{return mt=n,i()}finally{mt=o}},et=function(n,i,o){switch(i){case"input":if(Gt(n,o),i=o.name,o.type==="radio"&&i!=null){for(o=n;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+i)+'][type="radio"]'),i=0;i<o.length;i++){var u=o[i];if(u!==n&&u.form===n.form){var h=zo(u);if(!h)throw Error(t(90));Ht(u),Gt(u,h)}}}break;case"textarea":mn(n,o);break;case"select":i=o.value,i!=null&&Rt(n,!!o.multiple,i,!1)}},Le=Xc,ge=rs;var wv={usingClientEntryPoint:!1,Events:[Ba,bs,zo,de,Re,Xc]},ja={findFiberByHostInstance:Zr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Av={bundleType:ja.bundleType,version:ja.version,rendererPackageName:ja.rendererPackageName,rendererConfig:ja.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:R.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=qr(n),n===null?null:n.stateNode},findFiberByHostInstance:ja.findFiberByHostInstance||Ev,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Tl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Tl.isDisabled&&Tl.supportsFiber)try{j=Tl.inject(Av),Te=Tl}catch{}}return Vn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=wv,Vn.createPortal=function(n,i){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ef(i))throw Error(t(200));return Mv(n,i,null,o)},Vn.createRoot=function(n,i){if(!ef(n))throw Error(t(299));var o=!1,u="",h=Cm;return i!=null&&(i.unstable_strictMode===!0&&(o=!0),i.identifierPrefix!==void 0&&(u=i.identifierPrefix),i.onRecoverableError!==void 0&&(h=i.onRecoverableError)),i=Jc(n,1,!1,null,null,o,!1,u,h),n[Hi]=i.current,Ua(n.nodeType===8?n.parentNode:n),new Qc(i)},Vn.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var i=n._reactInternals;if(i===void 0)throw typeof n.render=="function"?Error(t(188)):(n=Object.keys(n).join(","),Error(t(268,n)));return n=qr(i),n=n===null?null:n.stateNode,n},Vn.flushSync=function(n){return rs(n)},Vn.hydrate=function(n,i,o){if(!Ml(i))throw Error(t(200));return El(null,n,i,!0,o)},Vn.hydrateRoot=function(n,i,o){if(!ef(n))throw Error(t(405));var u=o!=null&&o.hydratedSources||null,h=!1,m="",w=Cm;if(o!=null&&(o.unstable_strictMode===!0&&(h=!0),o.identifierPrefix!==void 0&&(m=o.identifierPrefix),o.onRecoverableError!==void 0&&(w=o.onRecoverableError)),i=bm(i,null,n,1,o??null,h,!1,m,w),n[Hi]=i.current,Ua(n),u)for(n=0;n<u.length;n++)o=u[n],h=o._getVersion,h=h(o._source),i.mutableSourceEagerHydrationData==null?i.mutableSourceEagerHydrationData=[o,h]:i.mutableSourceEagerHydrationData.push(o,h);return new Sl(i)},Vn.render=function(n,i,o){if(!Ml(i))throw Error(t(200));return El(null,n,i,!1,o)},Vn.unmountComponentAtNode=function(n){if(!Ml(n))throw Error(t(40));return n._reactRootContainer?(rs(function(){El(null,null,n,!1,function(){n._reactRootContainer=null,n[Hi]=null})}),!0):!1},Vn.unstable_batchedUpdates=Xc,Vn.unstable_renderSubtreeIntoContainer=function(n,i,o,u){if(!Ml(o))throw Error(t(200));if(n==null||n._reactInternals===void 0)throw Error(t(38));return El(n,i,o,!1,u)},Vn.version="18.3.1-next-f1338f8080-20240426",Vn}var Bm;function Uv(){if(Bm)return rf.exports;Bm=1;function s(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s)}catch(e){console.error(e)}}return s(),rf.exports=Nv(),rf.exports}var km;function Fv(){if(km)return wl;km=1;var s=Uv();return wl.createRoot=s.createRoot,wl.hydrateRoot=s.hydrateRoot,wl}var Ov=Fv();const f1=c_(Ov);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const zh="185",sa={ROTATE:0,DOLLY:1,PAN:2},ra={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Bv=0,zm=1,kv=2,iu=1,zv=2,co=3,zr=0,Gn=1,nr=2,sr=0,aa=1,Vm=2,Hm=3,Gm=4,Vv=5,hs=100,Hv=101,Gv=102,Wv=103,Xv=104,Yv=200,qv=201,Kv=202,$v=203,Xf=204,Yf=205,Zv=206,Jv=207,jv=208,Qv=209,ex=210,tx=211,nx=212,ix=213,rx=214,qf=0,Kf=1,$f=2,ua=3,Zf=4,Jf=5,jf=6,Qf=7,Vh=0,sx=1,ax=2,Oi=0,f_=1,h_=2,d_=3,p_=4,m_=5,g_=6,__=7,Wm="attached",ox="detached",v_=300,gs=301,ca=302,of=303,lf=304,xu=306,eh=1e3,ir=1001,th=1002,xn=1003,lx=1004,Al=1005,Rn=1006,uf=1007,ps=1008,jn=1009,x_=1010,y_=1011,mo=1012,Hh=1013,ki=1014,li=1015,or=1016,Gh=1017,Wh=1018,go=1020,S_=35902,M_=35899,E_=1021,T_=1022,ui=1023,lr=1026,ms=1027,Xh=1028,Yh=1029,_s=1030,qh=1031,Kh=1033,ru=33776,su=33777,au=33778,ou=33779,nh=35840,ih=35841,rh=35842,sh=35843,ah=36196,oh=37492,lh=37496,uh=37488,ch=37489,uu=37490,fh=37491,hh=37808,dh=37809,ph=37810,mh=37811,gh=37812,_h=37813,vh=37814,xh=37815,yh=37816,Sh=37817,Mh=37818,Eh=37819,Th=37820,wh=37821,Ah=36492,bh=36494,Rh=36495,Ch=36283,Ph=36284,cu=36285,Lh=36286,fu=2300,Dh=2301,cf=2302,Xm=2303,Ym=2400,qm=2401,Km=2402,ux=2500,h1=0,d1=1,p1=2,cx=3200,hu=0,fx=1,Br="",oi="srgb",du="srgb-linear",pu="linear",Lt="srgb",Hs=7680,$m=519,hx=512,dx=513,px=514,$h=515,mx=516,gx=517,Zh=518,_x=519,Ih=35044,Zm="300 es",Fi=2e3,_o=2001;function vx(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function xx(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function vo(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function yx(){const s=vo("canvas");return s.style.display="block",s}const Jm={};function mu(...s){const e="THREE."+s.shift();console.log(e,...s)}function w_(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ze(...s){s=w_(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function st(...s){s=w_(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function oa(...s){const e=s.join(" ");e in Jm||(Jm[e]=!0,Ze(...s))}function Sx(s,e,t){return new Promise(function(r,a){function l(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:a();break;case s.TIMEOUT_EXPIRED:setTimeout(l,t);break;default:r()}}setTimeout(l,t)})}const Mx={[qf]:Kf,[$f]:jf,[Zf]:Qf,[ua]:Jf,[Kf]:qf,[jf]:$f,[Qf]:Zf,[Jf]:ua};class Vr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){const r=this._listeners;return r===void 0?!1:r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){const r=this._listeners;if(r===void 0)return;const a=r[e];if(a!==void 0){const l=a.indexOf(t);l!==-1&&a.splice(l,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const r=t[e.type];if(r!==void 0){e.target=this;const a=r.slice(0);for(let l=0,c=a.length;l<c;l++)a[l].call(this,e);e.target=null}}}const An=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let jm=1234567;const ho=Math.PI/180,fa=180/Math.PI;function Ai(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(An[s&255]+An[s>>8&255]+An[s>>16&255]+An[s>>24&255]+"-"+An[e&255]+An[e>>8&255]+"-"+An[e>>16&15|64]+An[e>>24&255]+"-"+An[t&63|128]+An[t>>8&255]+"-"+An[t>>16&255]+An[t>>24&255]+An[r&255]+An[r>>8&255]+An[r>>16&255]+An[r>>24&255]).toLowerCase()}function pt(s,e,t){return Math.max(e,Math.min(t,s))}function Jh(s,e){return(s%e+e)%e}function Ex(s,e,t,r,a){return r+(s-e)*(a-r)/(t-e)}function Tx(s,e,t){return s!==e?(t-s)/(e-s):0}function po(s,e,t){return(1-t)*s+t*e}function wx(s,e,t,r){return po(s,e,1-Math.exp(-t*r))}function Ax(s,e=1){return e-Math.abs(Jh(s,e*2)-e)}function bx(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Rx(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Cx(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Px(s,e){return s+Math.random()*(e-s)}function Lx(s){return s*(.5-Math.random())}function Dx(s){s!==void 0&&(jm=s);let e=jm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ix(s){return s*ho}function Nx(s){return s*fa}function Ux(s){return(s&s-1)===0&&s!==0}function Fx(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Ox(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Bx(s,e,t,r,a){const l=Math.cos,c=Math.sin,f=l(t/2),p=c(t/2),d=l((e+r)/2),_=c((e+r)/2),v=l((e-r)/2),g=c((e-r)/2),S=l((r-e)/2),E=c((r-e)/2);switch(a){case"XYX":s.set(f*_,p*v,p*g,f*d);break;case"YZY":s.set(p*g,f*_,p*v,f*d);break;case"ZXZ":s.set(p*v,p*g,f*_,f*d);break;case"XZX":s.set(f*_,p*E,p*S,f*d);break;case"YXY":s.set(p*S,f*_,p*E,f*d);break;case"ZYZ":s.set(p*E,p*S,f*_,f*d);break;default:Ze("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+a)}}function Ti(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Dt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const kx={DEG2RAD:ho,RAD2DEG:fa,generateUUID:Ai,clamp:pt,euclideanModulo:Jh,mapLinear:Ex,inverseLerp:Tx,lerp:po,damp:wx,pingpong:Ax,smoothstep:bx,smootherstep:Rx,randInt:Cx,randFloat:Px,randFloatSpread:Lx,seededRandom:Dx,degToRad:Ix,radToDeg:Nx,isPowerOfTwo:Ux,ceilPowerOfTwo:Fx,floorPowerOfTwo:Ox,setQuaternionFromProperEuler:Bx,normalize:Dt,denormalize:Ti},ud=class ud{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,a=e.elements;return this.x=a[0]*t+a[3]*r+a[6],this.y=a[1]*t+a[4]*r+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(pt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(pt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),a=Math.sin(t),l=this.x-e.x,c=this.y-e.y;return this.x=l*r-c*a+e.x,this.y=l*a+c*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ud.prototype.isVector2=!0;let it=ud;class ur{constructor(e=0,t=0,r=0,a=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=a}static slerpFlat(e,t,r,a,l,c,f){let p=r[a+0],d=r[a+1],_=r[a+2],v=r[a+3],g=l[c+0],S=l[c+1],E=l[c+2],b=l[c+3];if(v!==b||p!==g||d!==S||_!==E){let y=p*g+d*S+_*E+v*b;y<0&&(g=-g,S=-S,E=-E,b=-b,y=-y);let x=1-f;if(y<.9995){const U=Math.acos(y),F=Math.sin(U);x=Math.sin(x*U)/F,f=Math.sin(f*U)/F,p=p*x+g*f,d=d*x+S*f,_=_*x+E*f,v=v*x+b*f}else{p=p*x+g*f,d=d*x+S*f,_=_*x+E*f,v=v*x+b*f;const U=1/Math.sqrt(p*p+d*d+_*_+v*v);p*=U,d*=U,_*=U,v*=U}}e[t]=p,e[t+1]=d,e[t+2]=_,e[t+3]=v}static multiplyQuaternionsFlat(e,t,r,a,l,c){const f=r[a],p=r[a+1],d=r[a+2],_=r[a+3],v=l[c],g=l[c+1],S=l[c+2],E=l[c+3];return e[t]=f*E+_*v+p*S-d*g,e[t+1]=p*E+_*g+d*v-f*S,e[t+2]=d*E+_*S+f*g-p*v,e[t+3]=_*E-f*v-p*g-d*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,a){return this._x=e,this._y=t,this._z=r,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,a=e._y,l=e._z,c=e._order,f=Math.cos,p=Math.sin,d=f(r/2),_=f(a/2),v=f(l/2),g=p(r/2),S=p(a/2),E=p(l/2);switch(c){case"XYZ":this._x=g*_*v+d*S*E,this._y=d*S*v-g*_*E,this._z=d*_*E+g*S*v,this._w=d*_*v-g*S*E;break;case"YXZ":this._x=g*_*v+d*S*E,this._y=d*S*v-g*_*E,this._z=d*_*E-g*S*v,this._w=d*_*v+g*S*E;break;case"ZXY":this._x=g*_*v-d*S*E,this._y=d*S*v+g*_*E,this._z=d*_*E+g*S*v,this._w=d*_*v-g*S*E;break;case"ZYX":this._x=g*_*v-d*S*E,this._y=d*S*v+g*_*E,this._z=d*_*E-g*S*v,this._w=d*_*v+g*S*E;break;case"YZX":this._x=g*_*v+d*S*E,this._y=d*S*v+g*_*E,this._z=d*_*E-g*S*v,this._w=d*_*v-g*S*E;break;case"XZY":this._x=g*_*v-d*S*E,this._y=d*S*v-g*_*E,this._z=d*_*E+g*S*v,this._w=d*_*v+g*S*E;break;default:Ze("Quaternion: .setFromEuler() encountered an unknown order: "+c)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,a=Math.sin(r);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],a=t[4],l=t[8],c=t[1],f=t[5],p=t[9],d=t[2],_=t[6],v=t[10],g=r+f+v;if(g>0){const S=.5/Math.sqrt(g+1);this._w=.25/S,this._x=(_-p)*S,this._y=(l-d)*S,this._z=(c-a)*S}else if(r>f&&r>v){const S=2*Math.sqrt(1+r-f-v);this._w=(_-p)/S,this._x=.25*S,this._y=(a+c)/S,this._z=(l+d)/S}else if(f>v){const S=2*Math.sqrt(1+f-r-v);this._w=(l-d)/S,this._x=(a+c)/S,this._y=.25*S,this._z=(p+_)/S}else{const S=2*Math.sqrt(1+v-r-f);this._w=(c-a)/S,this._x=(l+d)/S,this._y=(p+_)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<1e-8?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const a=Math.min(1,t/r);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,a=e._y,l=e._z,c=e._w,f=t._x,p=t._y,d=t._z,_=t._w;return this._x=r*_+c*f+a*d-l*p,this._y=a*_+c*p+l*f-r*d,this._z=l*_+c*d+r*p-a*f,this._w=c*_-r*f-a*p-l*d,this._onChangeCallback(),this}slerp(e,t){let r=e._x,a=e._y,l=e._z,c=e._w,f=this.dot(e);f<0&&(r=-r,a=-a,l=-l,c=-c,f=-f);let p=1-t;if(f<.9995){const d=Math.acos(f),_=Math.sin(d);p=Math.sin(p*d)/_,t=Math.sin(t*d)/_,this._x=this._x*p+r*t,this._y=this._y*p+a*t,this._z=this._z*p+l*t,this._w=this._w*p+c*t,this._onChangeCallback()}else this._x=this._x*p+r*t,this._y=this._y*p+a*t,this._z=this._z*p+l*t,this._w=this._w*p+c*t,this.normalize();return this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),r=Math.random(),a=Math.sqrt(1-r),l=Math.sqrt(r);return this.set(a*Math.sin(e),a*Math.cos(e),l*Math.sin(t),l*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const cd=class cd{constructor(e=0,t=0,r=0){this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qm.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[3]*r+l[6]*a,this.y=l[1]*t+l[4]*r+l[7]*a,this.z=l[2]*t+l[5]*r+l[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,l=e.elements,c=1/(l[3]*t+l[7]*r+l[11]*a+l[15]);return this.x=(l[0]*t+l[4]*r+l[8]*a+l[12])*c,this.y=(l[1]*t+l[5]*r+l[9]*a+l[13])*c,this.z=(l[2]*t+l[6]*r+l[10]*a+l[14])*c,this}applyQuaternion(e){const t=this.x,r=this.y,a=this.z,l=e.x,c=e.y,f=e.z,p=e.w,d=2*(c*a-f*r),_=2*(f*t-l*a),v=2*(l*r-c*t);return this.x=t+p*d+c*v-f*_,this.y=r+p*_+f*d-l*v,this.z=a+p*v+l*_-c*d,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,a=this.z,l=e.elements;return this.x=l[0]*t+l[4]*r+l[8]*a,this.y=l[1]*t+l[5]*r+l[9]*a,this.z=l[2]*t+l[6]*r+l[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(pt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,a=e.y,l=e.z,c=t.x,f=t.y,p=t.z;return this.x=a*p-l*f,this.y=l*c-r*p,this.z=r*f-a*c,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return ff.copy(this).projectOnVector(e),this.sub(ff)}reflect(e){return this.sub(ff.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(pt(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,a=this.z-e.z;return t*t+r*r+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const a=Math.sin(t)*e;return this.x=a*Math.sin(r),this.y=Math.cos(t)*e,this.z=a*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=a,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,r=Math.sqrt(1-t*t);return this.x=r*Math.cos(e),this.y=t,this.z=r*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};cd.prototype.isVector3=!0;let q=cd;const ff=new q,Qm=new ur,fd=class fd{constructor(e,t,r,a,l,c,f,p,d){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,a,l,c,f,p,d)}set(e,t,r,a,l,c,f,p,d){const _=this.elements;return _[0]=e,_[1]=a,_[2]=f,_[3]=t,_[4]=l,_[5]=p,_[6]=r,_[7]=c,_[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,l=this.elements,c=r[0],f=r[3],p=r[6],d=r[1],_=r[4],v=r[7],g=r[2],S=r[5],E=r[8],b=a[0],y=a[3],x=a[6],U=a[1],F=a[4],R=a[7],I=a[2],P=a[5],O=a[8];return l[0]=c*b+f*U+p*I,l[3]=c*y+f*F+p*P,l[6]=c*x+f*R+p*O,l[1]=d*b+_*U+v*I,l[4]=d*y+_*F+v*P,l[7]=d*x+_*R+v*O,l[2]=g*b+S*U+E*I,l[5]=g*y+S*F+E*P,l[8]=g*x+S*R+E*O,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],c=e[4],f=e[5],p=e[6],d=e[7],_=e[8];return t*c*_-t*f*d-r*l*_+r*f*p+a*l*d-a*c*p}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],c=e[4],f=e[5],p=e[6],d=e[7],_=e[8],v=_*c-f*d,g=f*p-_*l,S=d*l-c*p,E=t*v+r*g+a*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/E;return e[0]=v*b,e[1]=(a*d-_*r)*b,e[2]=(f*r-a*c)*b,e[3]=g*b,e[4]=(_*t-a*p)*b,e[5]=(a*l-f*t)*b,e[6]=S*b,e[7]=(r*p-d*t)*b,e[8]=(c*t-r*l)*b,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,a,l,c,f){const p=Math.cos(l),d=Math.sin(l);return this.set(r*p,r*d,-r*(p*c+d*f)+c+e,-a*d,a*p,-a*(-d*c+p*f)+f+t,0,0,1),this}scale(e,t){return oa("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(hf.makeScale(e,t)),this}rotate(e){return oa("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(hf.makeRotation(-e)),this}translate(e,t){return oa("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(hf.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<9;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}};fd.prototype.isMatrix3=!0;let ut=fd;const hf=new ut,eg=new ut().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tg=new ut().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zx(){const s={enabled:!0,workingColorSpace:du,spaces:{},convert:function(a,l,c){return this.enabled===!1||l===c||!l||!c||(this.spaces[l].transfer===Lt&&(a.r=ar(a.r),a.g=ar(a.g),a.b=ar(a.b)),this.spaces[l].primaries!==this.spaces[c].primaries&&(a.applyMatrix3(this.spaces[l].toXYZ),a.applyMatrix3(this.spaces[c].fromXYZ)),this.spaces[c].transfer===Lt&&(a.r=la(a.r),a.g=la(a.g),a.b=la(a.b))),a},workingToColorSpace:function(a,l){return this.convert(a,this.workingColorSpace,l)},colorSpaceToWorking:function(a,l){return this.convert(a,l,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Br?pu:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,l=this.workingColorSpace){return a.fromArray(this.spaces[l].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,l,c){return a.copy(this.spaces[l].toXYZ).multiply(this.spaces[c].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,l){return oa("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(a,l)},toWorkingColorSpace:function(a,l){return oa("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(a,l)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],r=[.3127,.329];return s.define({[du]:{primaries:e,whitePoint:r,transfer:pu,toXYZ:eg,fromXYZ:tg,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:oi},outputColorSpaceConfig:{drawingBufferColorSpace:oi}},[oi]:{primaries:e,whitePoint:r,transfer:Lt,toXYZ:eg,fromXYZ:tg,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:oi}}}),s}const xt=zx();function ar(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function la(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Gs;class Vx{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let r;if(e instanceof HTMLCanvasElement)r=e;else{Gs===void 0&&(Gs=vo("canvas")),Gs.width=e.width,Gs.height=e.height;const a=Gs.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),r=Gs}return r.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=vo("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const a=r.getImageData(0,0,e.width,e.height),l=a.data;for(let c=0;c<l.length;c++)l[c]=ar(l[c]/255)*255;return r.putImageData(a,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(ar(t[r]/255)*255):t[r]=ar(t[r]);return{data:t,width:e.width,height:e.height}}else return Ze("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hx=0;class jh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hx++}),this.uuid=Ai(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},a=this.data;if(a!==null){let l;if(Array.isArray(a)){l=[];for(let c=0,f=a.length;c<f;c++)a[c].isDataTexture?l.push(df(a[c].image)):l.push(df(a[c]))}else l=df(a);r.url=l}return t||(e.images[this.uuid]=r),r}}function df(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Vx.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ze("Texture: Unable to serialize Texture."),{})}let Gx=0;const pf=new q;class yn extends Vr{constructor(e=yn.DEFAULT_IMAGE,t=yn.DEFAULT_MAPPING,r=ir,a=ir,l=Rn,c=ps,f=ui,p=jn,d=yn.DEFAULT_ANISOTROPY,_=Br){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gx++}),this.uuid=Ai(),this.name="",this.source=new jh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=a,this.magFilter=l,this.minFilter=c,this.anisotropy=d,this.format=f,this.internalFormat=null,this.type=p,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ut,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(pf).x}get height(){return this.source.getSize(pf).y}get depth(){return this.source.getSize(pf).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const r=e[t];if(r===void 0){Ze(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){Ze(`Texture.setValues(): property '${t}' does not exist.`);continue}a&&r&&a.isVector2&&r.isVector2||a&&r&&a.isVector3&&r.isVector3||a&&r&&a.isMatrix3&&r.isMatrix3?a.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==v_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case eh:e.x=e.x-Math.floor(e.x);break;case ir:e.x=e.x<0?0:1;break;case th:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case eh:e.y=e.y-Math.floor(e.y);break;case ir:e.y=e.y<0?0:1;break;case th:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=v_;yn.DEFAULT_ANISOTROPY=1;const hd=class hd{constructor(e=0,t=0,r=0,a=1){this.x=e,this.y=t,this.z=r,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,a){return this.x=e,this.y=t,this.z=r,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,a=this.z,l=this.w,c=e.elements;return this.x=c[0]*t+c[4]*r+c[8]*a+c[12]*l,this.y=c[1]*t+c[5]*r+c[9]*a+c[13]*l,this.z=c[2]*t+c[6]*r+c[10]*a+c[14]*l,this.w=c[3]*t+c[7]*r+c[11]*a+c[15]*l,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,a,l;const p=e.elements,d=p[0],_=p[4],v=p[8],g=p[1],S=p[5],E=p[9],b=p[2],y=p[6],x=p[10];if(Math.abs(_-g)<.01&&Math.abs(v-b)<.01&&Math.abs(E-y)<.01){if(Math.abs(_+g)<.1&&Math.abs(v+b)<.1&&Math.abs(E+y)<.1&&Math.abs(d+S+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const F=(d+1)/2,R=(S+1)/2,I=(x+1)/2,P=(_+g)/4,O=(v+b)/4,T=(E+y)/4;return F>R&&F>I?F<.01?(r=0,a=.707106781,l=.707106781):(r=Math.sqrt(F),a=P/r,l=O/r):R>I?R<.01?(r=.707106781,a=0,l=.707106781):(a=Math.sqrt(R),r=P/a,l=T/a):I<.01?(r=.707106781,a=.707106781,l=0):(l=Math.sqrt(I),r=O/l,a=T/l),this.set(r,a,l,t),this}let U=Math.sqrt((y-E)*(y-E)+(v-b)*(v-b)+(g-_)*(g-_));return Math.abs(U)<.001&&(U=1),this.x=(y-E)/U,this.y=(v-b)/U,this.z=(g-_)/U,this.w=Math.acos((d+S+x-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this.w=pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this.w=pt(this.w,e,t),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(pt(r,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};hd.prototype.isVector4=!0;let Ft=hd;class Wx extends Vr{constructor(e=1,t=1,r={}){super(),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},r),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=r.depth,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t),this.textures=[];const a={width:e,height:t,depth:r.depth},l=new yn(a),c=r.count;for(let f=0;f<c;f++)this.textures[f]=l.clone(),this.textures[f].isRenderTargetTexture=!0,this.textures[f].renderTarget=this;this._setTextureOptions(r),this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.resolveDepthBuffer=r.resolveDepthBuffer,this.resolveStencilBuffer=r.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=r.depthTexture,this.samples=r.samples,this.multiview=r.multiview,this.useArrayDepthTexture=r.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let r=0;r<this.textures.length;r++)this.textures[r].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,r=1){if(this.width!==e||this.height!==t||this.depth!==r){this.width=e,this.height=t,this.depth=r;for(let a=0,l=this.textures.length;a<l;a++)this.textures[a].image.width=e,this.textures[a].image.height=t,this.textures[a].image.depth=r,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,r=e.textures.length;t<r;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const a=Object.assign({},e.textures[t].image);this.textures[t].source=new jh(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Bi extends Wx{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class A_ extends yn{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=xn,this.minFilter=xn,this.wrapR=ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xx extends yn{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=xn,this.minFilter=xn,this.wrapR=ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const vu=class vu{constructor(e,t,r,a,l,c,f,p,d,_,v,g,S,E,b,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,a,l,c,f,p,d,_,v,g,S,E,b,y)}set(e,t,r,a,l,c,f,p,d,_,v,g,S,E,b,y){const x=this.elements;return x[0]=e,x[4]=t,x[8]=r,x[12]=a,x[1]=l,x[5]=c,x[9]=f,x[13]=p,x[2]=d,x[6]=_,x[10]=v,x[14]=g,x[3]=S,x[7]=E,x[11]=b,x[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new vu().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),r.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this)}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,r=e.elements,a=1/Ws.setFromMatrixColumn(e,0).length(),l=1/Ws.setFromMatrixColumn(e,1).length(),c=1/Ws.setFromMatrixColumn(e,2).length();return t[0]=r[0]*a,t[1]=r[1]*a,t[2]=r[2]*a,t[3]=0,t[4]=r[4]*l,t[5]=r[5]*l,t[6]=r[6]*l,t[7]=0,t[8]=r[8]*c,t[9]=r[9]*c,t[10]=r[10]*c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,a=e.y,l=e.z,c=Math.cos(r),f=Math.sin(r),p=Math.cos(a),d=Math.sin(a),_=Math.cos(l),v=Math.sin(l);if(e.order==="XYZ"){const g=c*_,S=c*v,E=f*_,b=f*v;t[0]=p*_,t[4]=-p*v,t[8]=d,t[1]=S+E*d,t[5]=g-b*d,t[9]=-f*p,t[2]=b-g*d,t[6]=E+S*d,t[10]=c*p}else if(e.order==="YXZ"){const g=p*_,S=p*v,E=d*_,b=d*v;t[0]=g+b*f,t[4]=E*f-S,t[8]=c*d,t[1]=c*v,t[5]=c*_,t[9]=-f,t[2]=S*f-E,t[6]=b+g*f,t[10]=c*p}else if(e.order==="ZXY"){const g=p*_,S=p*v,E=d*_,b=d*v;t[0]=g-b*f,t[4]=-c*v,t[8]=E+S*f,t[1]=S+E*f,t[5]=c*_,t[9]=b-g*f,t[2]=-c*d,t[6]=f,t[10]=c*p}else if(e.order==="ZYX"){const g=c*_,S=c*v,E=f*_,b=f*v;t[0]=p*_,t[4]=E*d-S,t[8]=g*d+b,t[1]=p*v,t[5]=b*d+g,t[9]=S*d-E,t[2]=-d,t[6]=f*p,t[10]=c*p}else if(e.order==="YZX"){const g=c*p,S=c*d,E=f*p,b=f*d;t[0]=p*_,t[4]=b-g*v,t[8]=E*v+S,t[1]=v,t[5]=c*_,t[9]=-f*_,t[2]=-d*_,t[6]=S*v+E,t[10]=g-b*v}else if(e.order==="XZY"){const g=c*p,S=c*d,E=f*p,b=f*d;t[0]=p*_,t[4]=-v,t[8]=d*_,t[1]=g*v+b,t[5]=c*_,t[9]=S*v-E,t[2]=E*v-S,t[6]=f*_,t[10]=b*v+g}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yx,e,qx)}lookAt(e,t,r){const a=this.elements;return $n.subVectors(e,t),$n.lengthSq()===0&&($n.z=1),$n.normalize(),Lr.crossVectors(r,$n),Lr.lengthSq()===0&&(Math.abs(r.z)===1?$n.x+=1e-4:$n.z+=1e-4,$n.normalize(),Lr.crossVectors(r,$n)),Lr.normalize(),bl.crossVectors($n,Lr),a[0]=Lr.x,a[4]=bl.x,a[8]=$n.x,a[1]=Lr.y,a[5]=bl.y,a[9]=$n.y,a[2]=Lr.z,a[6]=bl.z,a[10]=$n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,a=t.elements,l=this.elements,c=r[0],f=r[4],p=r[8],d=r[12],_=r[1],v=r[5],g=r[9],S=r[13],E=r[2],b=r[6],y=r[10],x=r[14],U=r[3],F=r[7],R=r[11],I=r[15],P=a[0],O=a[4],T=a[8],L=a[12],V=a[1],z=a[5],K=a[9],ce=a[13],he=a[2],J=a[6],oe=a[10],ee=a[14],X=a[3],ae=a[7],le=a[11],N=a[15];return l[0]=c*P+f*V+p*he+d*X,l[4]=c*O+f*z+p*J+d*ae,l[8]=c*T+f*K+p*oe+d*le,l[12]=c*L+f*ce+p*ee+d*N,l[1]=_*P+v*V+g*he+S*X,l[5]=_*O+v*z+g*J+S*ae,l[9]=_*T+v*K+g*oe+S*le,l[13]=_*L+v*ce+g*ee+S*N,l[2]=E*P+b*V+y*he+x*X,l[6]=E*O+b*z+y*J+x*ae,l[10]=E*T+b*K+y*oe+x*le,l[14]=E*L+b*ce+y*ee+x*N,l[3]=U*P+F*V+R*he+I*X,l[7]=U*O+F*z+R*J+I*ae,l[11]=U*T+F*K+R*oe+I*le,l[15]=U*L+F*ce+R*ee+I*N,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],a=e[8],l=e[12],c=e[1],f=e[5],p=e[9],d=e[13],_=e[2],v=e[6],g=e[10],S=e[14],E=e[3],b=e[7],y=e[11],x=e[15],U=p*S-d*g,F=f*S-d*v,R=f*g-p*v,I=c*S-d*_,P=c*g-p*_,O=c*v-f*_;return t*(b*U-y*F+x*R)-r*(E*U-y*I+x*P)+a*(E*F-b*I+x*O)-l*(E*R-b*P+y*O)}determinantAffine(){const e=this.elements,t=e[0],r=e[4],a=e[8],l=e[1],c=e[5],f=e[9],p=e[2],d=e[6],_=e[10];return t*(c*_-f*d)-r*(l*_-f*p)+a*(l*d-c*p)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=t,a[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],a=e[2],l=e[3],c=e[4],f=e[5],p=e[6],d=e[7],_=e[8],v=e[9],g=e[10],S=e[11],E=e[12],b=e[13],y=e[14],x=e[15],U=t*f-r*c,F=t*p-a*c,R=t*d-l*c,I=r*p-a*f,P=r*d-l*f,O=a*d-l*p,T=_*b-v*E,L=_*y-g*E,V=_*x-S*E,z=v*y-g*b,K=v*x-S*b,ce=g*x-S*y,he=U*ce-F*K+R*z+I*V-P*L+O*T;if(he===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const J=1/he;return e[0]=(f*ce-p*K+d*z)*J,e[1]=(a*K-r*ce-l*z)*J,e[2]=(b*O-y*P+x*I)*J,e[3]=(g*P-v*O-S*I)*J,e[4]=(p*V-c*ce-d*L)*J,e[5]=(t*ce-a*V+l*L)*J,e[6]=(y*R-E*O-x*F)*J,e[7]=(_*O-g*R+S*F)*J,e[8]=(c*K-f*V+d*T)*J,e[9]=(r*V-t*K-l*T)*J,e[10]=(E*P-b*R+x*U)*J,e[11]=(v*R-_*P-S*U)*J,e[12]=(f*L-c*z-p*T)*J,e[13]=(t*z-r*L+a*T)*J,e[14]=(b*F-E*I-y*U)*J,e[15]=(_*I-v*F+g*U)*J,this}scale(e){const t=this.elements,r=e.x,a=e.y,l=e.z;return t[0]*=r,t[4]*=a,t[8]*=l,t[1]*=r,t[5]*=a,t[9]*=l,t[2]*=r,t[6]*=a,t[10]*=l,t[3]*=r,t[7]*=a,t[11]*=l,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,a))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),a=Math.sin(t),l=1-r,c=e.x,f=e.y,p=e.z,d=l*c,_=l*f;return this.set(d*c+r,d*f-a*p,d*p+a*f,0,d*f+a*p,_*f+r,_*p-a*c,0,d*p-a*f,_*p+a*c,l*p*p+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,a,l,c){return this.set(1,r,l,0,e,1,c,0,t,a,1,0,0,0,0,1),this}compose(e,t,r){const a=this.elements,l=t._x,c=t._y,f=t._z,p=t._w,d=l+l,_=c+c,v=f+f,g=l*d,S=l*_,E=l*v,b=c*_,y=c*v,x=f*v,U=p*d,F=p*_,R=p*v,I=r.x,P=r.y,O=r.z;return a[0]=(1-(b+x))*I,a[1]=(S+R)*I,a[2]=(E-F)*I,a[3]=0,a[4]=(S-R)*P,a[5]=(1-(g+x))*P,a[6]=(y+U)*P,a[7]=0,a[8]=(E+F)*O,a[9]=(y-U)*O,a[10]=(1-(g+b))*O,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,t,r){const a=this.elements;e.x=a[12],e.y=a[13],e.z=a[14];const l=this.determinantAffine();if(l===0)return r.set(1,1,1),t.identity(),this;let c=Ws.set(a[0],a[1],a[2]).length();const f=Ws.set(a[4],a[5],a[6]).length(),p=Ws.set(a[8],a[9],a[10]).length();l<0&&(c=-c),Si.copy(this);const d=1/c,_=1/f,v=1/p;return Si.elements[0]*=d,Si.elements[1]*=d,Si.elements[2]*=d,Si.elements[4]*=_,Si.elements[5]*=_,Si.elements[6]*=_,Si.elements[8]*=v,Si.elements[9]*=v,Si.elements[10]*=v,t.setFromRotationMatrix(Si),r.x=c,r.y=f,r.z=p,this}makePerspective(e,t,r,a,l,c,f=Fi,p=!1){const d=this.elements,_=2*l/(t-e),v=2*l/(r-a),g=(t+e)/(t-e),S=(r+a)/(r-a);let E,b;if(p)E=l/(c-l),b=c*l/(c-l);else if(f===Fi)E=-(c+l)/(c-l),b=-2*c*l/(c-l);else if(f===_o)E=-c/(c-l),b=-c*l/(c-l);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+f);return d[0]=_,d[4]=0,d[8]=g,d[12]=0,d[1]=0,d[5]=v,d[9]=S,d[13]=0,d[2]=0,d[6]=0,d[10]=E,d[14]=b,d[3]=0,d[7]=0,d[11]=-1,d[15]=0,this}makeOrthographic(e,t,r,a,l,c,f=Fi,p=!1){const d=this.elements,_=2/(t-e),v=2/(r-a),g=-(t+e)/(t-e),S=-(r+a)/(r-a);let E,b;if(p)E=1/(c-l),b=c/(c-l);else if(f===Fi)E=-2/(c-l),b=-(c+l)/(c-l);else if(f===_o)E=-1/(c-l),b=-l/(c-l);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+f);return d[0]=_,d[4]=0,d[8]=0,d[12]=g,d[1]=0,d[5]=v,d[9]=0,d[13]=S,d[2]=0,d[6]=0,d[10]=E,d[14]=b,d[3]=0,d[7]=0,d[11]=0,d[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let a=0;a<16;a++)if(t[a]!==r[a])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}};vu.prototype.isMatrix4=!0;let _t=vu;const Ws=new q,Si=new _t,Yx=new q(0,0,0),qx=new q(1,1,1),Lr=new q,bl=new q,$n=new q,ng=new _t,ig=new ur;class cr{constructor(e=0,t=0,r=0,a=cr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,a=this._order){return this._x=e,this._y=t,this._z=r,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const a=e.elements,l=a[0],c=a[4],f=a[8],p=a[1],d=a[5],_=a[9],v=a[2],g=a[6],S=a[10];switch(t){case"XYZ":this._y=Math.asin(pt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(-_,S),this._z=Math.atan2(-c,l)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-pt(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(f,S),this._z=Math.atan2(p,d)):(this._y=Math.atan2(-v,l),this._z=0);break;case"ZXY":this._x=Math.asin(pt(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-v,S),this._z=Math.atan2(-c,d)):(this._y=0,this._z=Math.atan2(p,l));break;case"ZYX":this._y=Math.asin(-pt(v,-1,1)),Math.abs(v)<.9999999?(this._x=Math.atan2(g,S),this._z=Math.atan2(p,l)):(this._x=0,this._z=Math.atan2(-c,d));break;case"YZX":this._z=Math.asin(pt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,d),this._y=Math.atan2(-v,l)):(this._x=0,this._y=Math.atan2(f,S));break;case"XZY":this._z=Math.asin(-pt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(f,l)):(this._x=Math.atan2(-_,S),this._y=0);break;default:Ze("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return ng.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ng,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ig.setFromEuler(this),this.setFromQuaternion(ig,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}cr.DEFAULT_ORDER="XYZ";class Qh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Kx=0;const rg=new q,Xs=new ur,Zi=new _t,Rl=new q,eo=new q,$x=new q,Zx=new ur,sg=new q(1,0,0),ag=new q(0,1,0),og=new q(0,0,1),lg={type:"added"},Jx={type:"removed"},Ys={type:"childadded",child:null},mf={type:"childremoved",child:null};class tn extends Vr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kx++}),this.uuid=Ai(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const e=new q,t=new cr,r=new ur,a=new q(1,1,1);function l(){r.setFromEuler(t,!1)}function c(){t.setFromQuaternion(r,void 0,!1)}t._onChange(l),r._onChange(c),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new _t},normalMatrix:{value:new ut}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Xs.setFromAxisAngle(e,t),this.quaternion.multiply(Xs),this}rotateOnWorldAxis(e,t){return Xs.setFromAxisAngle(e,t),this.quaternion.premultiply(Xs),this}rotateX(e){return this.rotateOnAxis(sg,e)}rotateY(e){return this.rotateOnAxis(ag,e)}rotateZ(e){return this.rotateOnAxis(og,e)}translateOnAxis(e,t){return rg.copy(e).applyQuaternion(this.quaternion),this.position.add(rg.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(sg,e)}translateY(e){return this.translateOnAxis(ag,e)}translateZ(e){return this.translateOnAxis(og,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zi.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?Rl.copy(e):Rl.set(e,t,r);const a=this.parent;this.updateWorldMatrix(!0,!1),eo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zi.lookAt(eo,Rl,this.up):Zi.lookAt(Rl,eo,this.up),this.quaternion.setFromRotationMatrix(Zi),a&&(Zi.extractRotation(a.matrixWorld),Xs.setFromRotationMatrix(Zi),this.quaternion.premultiply(Xs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(st("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lg),Ys.child=e,this.dispatchEvent(Ys),Ys.child=null):st("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Jx),mf.child=e,this.dispatchEvent(mf),mf.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lg),Ys.child=e,this.dispatchEvent(Ys),Ys.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,a=this.children.length;r<a;r++){const c=this.children[r].getObjectByProperty(e,t);if(c!==void 0)return c}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const a=this.children;for(let l=0,c=a.length;l<c;l++)a[l].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eo,e,$x),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eo,Zx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,r=e.y,a=e.z,l=this.matrix.elements;l[12]+=t-l[0]*t-l[4]*r-l[8]*a,l[13]+=r-l[1]*t-l[5]*r-l[9]*a,l[14]+=a-l[2]*t-l[6]*r-l[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,a=t.length;r<a;r++)t[r].updateMatrixWorld(e)}updateWorldMatrix(e,t,r=!1){const a=this.parent;if(e===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||r)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,r=!0),t===!0){const l=this.children;for(let c=0,f=l.length;c<f;c++)l[c].updateWorldMatrix(!1,!0,r)}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(f=>({...f,boundingBox:f.boundingBox?f.boundingBox.toJSON():void 0,boundingSphere:f.boundingSphere?f.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(f=>({...f})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function l(f,p){return f[p.uuid]===void 0&&(f[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=l(e.geometries,this.geometry);const f=this.geometry.parameters;if(f!==void 0&&f.shapes!==void 0){const p=f.shapes;if(Array.isArray(p))for(let d=0,_=p.length;d<_;d++){const v=p[d];l(e.shapes,v)}else l(e.shapes,p)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(l(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const f=[];for(let p=0,d=this.material.length;p<d;p++)f.push(l(e.materials,this.material[p]));a.material=f}else a.material=l(e.materials,this.material);if(this.children.length>0){a.children=[];for(let f=0;f<this.children.length;f++)a.children.push(this.children[f].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let f=0;f<this.animations.length;f++){const p=this.animations[f];a.animations.push(l(e.animations,p))}}if(t){const f=c(e.geometries),p=c(e.materials),d=c(e.textures),_=c(e.images),v=c(e.shapes),g=c(e.skeletons),S=c(e.animations),E=c(e.nodes);f.length>0&&(r.geometries=f),p.length>0&&(r.materials=p),d.length>0&&(r.textures=d),_.length>0&&(r.images=_),v.length>0&&(r.shapes=v),g.length>0&&(r.skeletons=g),S.length>0&&(r.animations=S),E.length>0&&(r.nodes=E)}return r.object=a,r;function c(f){const p=[];for(const d in f){const _=f[d];delete _.metadata,p.push(_)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const a=e.children[r];this.add(a.clone())}return this}}tn.DEFAULT_UP=new q(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Cl extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const jx={type:"move"};class gf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Cl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Cl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Cl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let a=null,l=null,c=null;const f=this._targetRay,p=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(d&&e.hand){c=!0;for(const b of e.hand.values()){const y=t.getJointPose(b,r),x=this._getHandJoint(d,b);y!==null&&(x.matrix.fromArray(y.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=y.radius),x.visible=y!==null}const _=d.joints["index-finger-tip"],v=d.joints["thumb-tip"],g=_.position.distanceTo(v.position),S=.02,E=.005;d.inputState.pinching&&g>S+E?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&g<=S-E&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(l=t.getPose(e.gripSpace,r),l!==null&&(p.matrix.fromArray(l.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,l.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(l.linearVelocity)):p.hasLinearVelocity=!1,l.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(l.angularVelocity)):p.hasAngularVelocity=!1,p.eventsEnabled&&p.dispatchEvent({type:"gripUpdated",data:e,target:this})));f!==null&&(a=t.getPose(e.targetRaySpace,r),a===null&&l!==null&&(a=l),a!==null&&(f.matrix.fromArray(a.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,a.linearVelocity?(f.hasLinearVelocity=!0,f.linearVelocity.copy(a.linearVelocity)):f.hasLinearVelocity=!1,a.angularVelocity?(f.hasAngularVelocity=!0,f.angularVelocity.copy(a.angularVelocity)):f.hasAngularVelocity=!1,this.dispatchEvent(jx)))}return f!==null&&(f.visible=a!==null),p!==null&&(p.visible=l!==null),d!==null&&(d.visible=c!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new Cl;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}const b_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dr={h:0,s:0,l:0},Pl={h:0,s:0,l:0};function _f(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class ht{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=oi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.colorSpaceToWorking(this,t),this}setRGB(e,t,r,a=xt.workingColorSpace){return this.r=e,this.g=t,this.b=r,xt.colorSpaceToWorking(this,a),this}setHSL(e,t,r,a=xt.workingColorSpace){if(e=Jh(e,1),t=pt(t,0,1),r=pt(r,0,1),t===0)this.r=this.g=this.b=r;else{const l=r<=.5?r*(1+t):r+t-r*t,c=2*r-l;this.r=_f(c,l,e+1/3),this.g=_f(c,l,e),this.b=_f(c,l,e-1/3)}return xt.colorSpaceToWorking(this,a),this}setStyle(e,t=oi){function r(l){l!==void 0&&parseFloat(l)<1&&Ze("Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let l;const c=a[1],f=a[2];switch(c){case"rgb":case"rgba":if(l=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(255,parseInt(l[1],10))/255,Math.min(255,parseInt(l[2],10))/255,Math.min(255,parseInt(l[3],10))/255,t);if(l=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setRGB(Math.min(100,parseInt(l[1],10))/100,Math.min(100,parseInt(l[2],10))/100,Math.min(100,parseInt(l[3],10))/100,t);break;case"hsl":case"hsla":if(l=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(f))return r(l[4]),this.setHSL(parseFloat(l[1])/360,parseFloat(l[2])/100,parseFloat(l[3])/100,t);break;default:Ze("Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const l=a[1],c=l.length;if(c===3)return this.setRGB(parseInt(l.charAt(0),16)/15,parseInt(l.charAt(1),16)/15,parseInt(l.charAt(2),16)/15,t);if(c===6)return this.setHex(parseInt(l,16),t);Ze("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=oi){const r=b_[e.toLowerCase()];return r!==void 0?this.setHex(r,t):Ze("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ar(e.r),this.g=ar(e.g),this.b=ar(e.b),this}copyLinearToSRGB(e){return this.r=la(e.r),this.g=la(e.g),this.b=la(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=oi){return xt.workingToColorSpace(bn.copy(this),e),Math.round(pt(bn.r*255,0,255))*65536+Math.round(pt(bn.g*255,0,255))*256+Math.round(pt(bn.b*255,0,255))}getHexString(e=oi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt.workingColorSpace){xt.workingToColorSpace(bn.copy(this),t);const r=bn.r,a=bn.g,l=bn.b,c=Math.max(r,a,l),f=Math.min(r,a,l);let p,d;const _=(f+c)/2;if(f===c)p=0,d=0;else{const v=c-f;switch(d=_<=.5?v/(c+f):v/(2-c-f),c){case r:p=(a-l)/v+(a<l?6:0);break;case a:p=(l-r)/v+2;break;case l:p=(r-a)/v+4;break}p/=6}return e.h=p,e.s=d,e.l=_,e}getRGB(e,t=xt.workingColorSpace){return xt.workingToColorSpace(bn.copy(this),t),e.r=bn.r,e.g=bn.g,e.b=bn.b,e}getStyle(e=oi){xt.workingToColorSpace(bn.copy(this),e);const t=bn.r,r=bn.g,a=bn.b;return e!==oi?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(a*255)})`}offsetHSL(e,t,r){return this.getHSL(Dr),this.setHSL(Dr.h+e,Dr.s+t,Dr.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Dr),e.getHSL(Pl);const r=po(Dr.h,Pl.h,t),a=po(Dr.s,Pl.s,t),l=po(Dr.l,Pl.l,t);return this.setHSL(r,a,l),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,a=this.b,l=e.elements;return this.r=l[0]*t+l[3]*r+l[6]*a,this.g=l[1]*t+l[4]*r+l[7]*a,this.b=l[2]*t+l[5]*r+l[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const bn=new ht;ht.NAMES=b_;class m1 extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new cr,this.environmentIntensity=1,this.environmentRotation=new cr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Mi=new q,Ji=new q,vf=new q,ji=new q,qs=new q,Ks=new q,ug=new q,xf=new q,yf=new q,Sf=new q,Mf=new Ft,Ef=new Ft,Tf=new Ft;class wi{constructor(e=new q,t=new q,r=new q){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,a){a.subVectors(r,t),Mi.subVectors(e,t),a.cross(Mi);const l=a.lengthSq();return l>0?a.multiplyScalar(1/Math.sqrt(l)):a.set(0,0,0)}static getBarycoord(e,t,r,a,l){Mi.subVectors(a,t),Ji.subVectors(r,t),vf.subVectors(e,t);const c=Mi.dot(Mi),f=Mi.dot(Ji),p=Mi.dot(vf),d=Ji.dot(Ji),_=Ji.dot(vf),v=c*d-f*f;if(v===0)return l.set(0,0,0),null;const g=1/v,S=(d*p-f*_)*g,E=(c*_-f*p)*g;return l.set(1-S-E,E,S)}static containsPoint(e,t,r,a){return this.getBarycoord(e,t,r,a,ji)===null?!1:ji.x>=0&&ji.y>=0&&ji.x+ji.y<=1}static getInterpolation(e,t,r,a,l,c,f,p){return this.getBarycoord(e,t,r,a,ji)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(l,ji.x),p.addScaledVector(c,ji.y),p.addScaledVector(f,ji.z),p)}static getInterpolatedAttribute(e,t,r,a,l,c){return Mf.setScalar(0),Ef.setScalar(0),Tf.setScalar(0),Mf.fromBufferAttribute(e,t),Ef.fromBufferAttribute(e,r),Tf.fromBufferAttribute(e,a),c.setScalar(0),c.addScaledVector(Mf,l.x),c.addScaledVector(Ef,l.y),c.addScaledVector(Tf,l.z),c}static isFrontFacing(e,t,r,a){return Mi.subVectors(r,t),Ji.subVectors(e,t),Mi.cross(Ji).dot(a)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,a){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,t,r,a){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mi.subVectors(this.c,this.b),Ji.subVectors(this.a,this.b),Mi.cross(Ji).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return wi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return wi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,r,a,l){return wi.getInterpolation(e,this.a,this.b,this.c,t,r,a,l)}containsPoint(e){return wi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return wi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,a=this.b,l=this.c;let c,f;qs.subVectors(a,r),Ks.subVectors(l,r),xf.subVectors(e,r);const p=qs.dot(xf),d=Ks.dot(xf);if(p<=0&&d<=0)return t.copy(r);yf.subVectors(e,a);const _=qs.dot(yf),v=Ks.dot(yf);if(_>=0&&v<=_)return t.copy(a);const g=p*v-_*d;if(g<=0&&p>=0&&_<=0)return c=p/(p-_),t.copy(r).addScaledVector(qs,c);Sf.subVectors(e,l);const S=qs.dot(Sf),E=Ks.dot(Sf);if(E>=0&&S<=E)return t.copy(l);const b=S*d-p*E;if(b<=0&&d>=0&&E<=0)return f=d/(d-E),t.copy(r).addScaledVector(Ks,f);const y=_*E-S*v;if(y<=0&&v-_>=0&&S-E>=0)return ug.subVectors(l,a),f=(v-_)/(v-_+(S-E)),t.copy(a).addScaledVector(ug,f);const x=1/(y+b+g);return c=b*x,f=g*x,t.copy(r).addScaledVector(qs,c).addScaledVector(Ks,f)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Hr{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(Ei.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(Ei.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=Ei.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const l=r.getAttribute("position");if(t===!0&&l!==void 0&&e.isInstancedMesh!==!0)for(let c=0,f=l.count;c<f;c++)e.isMesh===!0?e.getVertexPosition(c,Ei):Ei.fromBufferAttribute(l,c),Ei.applyMatrix4(e.matrixWorld),this.expandByPoint(Ei);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ll.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),Ll.copy(r.boundingBox)),Ll.applyMatrix4(e.matrixWorld),this.union(Ll)}const a=e.children;for(let l=0,c=a.length;l<c;l++)this.expandByObject(a[l],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ei),Ei.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(to),Dl.subVectors(this.max,to),$s.subVectors(e.a,to),Zs.subVectors(e.b,to),Js.subVectors(e.c,to),Ir.subVectors(Zs,$s),Nr.subVectors(Js,Zs),ls.subVectors($s,Js);let t=[0,-Ir.z,Ir.y,0,-Nr.z,Nr.y,0,-ls.z,ls.y,Ir.z,0,-Ir.x,Nr.z,0,-Nr.x,ls.z,0,-ls.x,-Ir.y,Ir.x,0,-Nr.y,Nr.x,0,-ls.y,ls.x,0];return!wf(t,$s,Zs,Js,Dl)||(t=[1,0,0,0,1,0,0,0,1],!wf(t,$s,Zs,Js,Dl))?!1:(Il.crossVectors(Ir,Nr),t=[Il.x,Il.y,Il.z],wf(t,$s,Zs,Js,Dl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ei).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ei).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Qi=[new q,new q,new q,new q,new q,new q,new q,new q],Ei=new q,Ll=new Hr,$s=new q,Zs=new q,Js=new q,Ir=new q,Nr=new q,ls=new q,to=new q,Dl=new q,Il=new q,us=new q;function wf(s,e,t,r,a){for(let l=0,c=s.length-3;l<=c;l+=3){us.fromArray(s,l);const f=a.x*Math.abs(us.x)+a.y*Math.abs(us.y)+a.z*Math.abs(us.z),p=e.dot(us),d=t.dot(us),_=r.dot(us);if(Math.max(-Math.max(p,d,_),Math.min(p,d,_))>f)return!1}return!0}const sn=new q,Nl=new it;let Qx=0;class ci extends Vr{constructor(e,t,r=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=Ih,this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let a=0,l=this.itemSize;a<l;a++)this.array[e+a]=t.array[r+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Nl.fromBufferAttribute(this,t),Nl.applyMatrix3(e),this.setXY(t,Nl.x,Nl.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix3(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)sn.fromBufferAttribute(this,t),sn.applyMatrix4(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)sn.fromBufferAttribute(this,t),sn.applyNormalMatrix(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)sn.fromBufferAttribute(this,t),sn.transformDirection(e),this.setXYZ(t,sn.x,sn.y,sn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=Ti(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Dt(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ti(t,this.array)),t}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ti(t,this.array)),t}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ti(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ti(t,this.array)),t}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),r=Dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,a){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),r=Dt(r,this.array),a=Dt(a,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this}setXYZW(e,t,r,a,l){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),r=Dt(r,this.array),a=Dt(a,this.array),l=Dt(l,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=a,this.array[e+3]=l,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ih&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class R_ extends ci{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class C_ extends ci{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class Wn extends ci{constructor(e,t,r){super(new Float32Array(e),t,r)}}const ey=new Hr,no=new q,Af=new q;class fr{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):ey.setFromPoints(e).getCenter(r);let a=0;for(let l=0,c=e.length;l<c;l++)a=Math.max(a,r.distanceToSquared(e[l]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;no.subVectors(e,this.center);const t=no.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),a=(r-this.radius)*.5;this.center.addScaledVector(no,a/r),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Af.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(no.copy(e.center).add(Af)),this.expandByPoint(no.copy(e.center).sub(Af))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let ty=0;const ai=new _t,bf=new tn,js=new q,Zn=new Hr,io=new Hr,pn=new q;class hi extends Vr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ty++}),this.uuid=Ai(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(vx(e)?C_:R_)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const l=new ut().getNormalMatrix(e);r.applyNormalMatrix(l),r.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ai.makeRotationFromQuaternion(e),this.applyMatrix4(ai),this}rotateX(e){return ai.makeRotationX(e),this.applyMatrix4(ai),this}rotateY(e){return ai.makeRotationY(e),this.applyMatrix4(ai),this}rotateZ(e){return ai.makeRotationZ(e),this.applyMatrix4(ai),this}translate(e,t,r){return ai.makeTranslation(e,t,r),this.applyMatrix4(ai),this}scale(e,t,r){return ai.makeScale(e,t,r),this.applyMatrix4(ai),this}lookAt(e){return bf.lookAt(e),bf.updateMatrix(),this.applyMatrix4(bf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(js).negate(),this.translate(js.x,js.y,js.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const r=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];r.push(c.x,c.y,c.z||0)}this.setAttribute("position",new Wn(r,3))}else{const r=Math.min(e.length,t.count);for(let a=0;a<r;a++){const l=e[a];t.setXYZ(a,l.x,l.y,l.z||0)}e.length>t.count&&Ze("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){st("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const l=t[r];Zn.setFromBufferAttribute(l),this.morphTargetsRelative?(pn.addVectors(this.boundingBox.min,Zn.min),this.boundingBox.expandByPoint(pn),pn.addVectors(this.boundingBox.max,Zn.max),this.boundingBox.expandByPoint(pn)):(this.boundingBox.expandByPoint(Zn.min),this.boundingBox.expandByPoint(Zn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&st('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){st("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(e){const r=this.boundingSphere.center;if(Zn.setFromBufferAttribute(e),t)for(let l=0,c=t.length;l<c;l++){const f=t[l];io.setFromBufferAttribute(f),this.morphTargetsRelative?(pn.addVectors(Zn.min,io.min),Zn.expandByPoint(pn),pn.addVectors(Zn.max,io.max),Zn.expandByPoint(pn)):(Zn.expandByPoint(io.min),Zn.expandByPoint(io.max))}Zn.getCenter(r);let a=0;for(let l=0,c=e.count;l<c;l++)pn.fromBufferAttribute(e,l),a=Math.max(a,r.distanceToSquared(pn));if(t)for(let l=0,c=t.length;l<c;l++){const f=t[l],p=this.morphTargetsRelative;for(let d=0,_=f.count;d<_;d++)pn.fromBufferAttribute(f,d),p&&(js.fromBufferAttribute(e,d),pn.add(js)),a=Math.max(a,r.distanceToSquared(pn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&st('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){st("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=t.position,a=t.normal,l=t.uv;let c=this.getAttribute("tangent");(c===void 0||c.count!==r.count)&&(c=new ci(new Float32Array(4*r.count),4),this.setAttribute("tangent",c));const f=[],p=[];for(let T=0;T<r.count;T++)f[T]=new q,p[T]=new q;const d=new q,_=new q,v=new q,g=new it,S=new it,E=new it,b=new q,y=new q;function x(T,L,V){d.fromBufferAttribute(r,T),_.fromBufferAttribute(r,L),v.fromBufferAttribute(r,V),g.fromBufferAttribute(l,T),S.fromBufferAttribute(l,L),E.fromBufferAttribute(l,V),_.sub(d),v.sub(d),S.sub(g),E.sub(g);const z=1/(S.x*E.y-E.x*S.y);isFinite(z)&&(b.copy(_).multiplyScalar(E.y).addScaledVector(v,-S.y).multiplyScalar(z),y.copy(v).multiplyScalar(S.x).addScaledVector(_,-E.x).multiplyScalar(z),f[T].add(b),f[L].add(b),f[V].add(b),p[T].add(y),p[L].add(y),p[V].add(y))}let U=this.groups;U.length===0&&(U=[{start:0,count:e.count}]);for(let T=0,L=U.length;T<L;++T){const V=U[T],z=V.start,K=V.count;for(let ce=z,he=z+K;ce<he;ce+=3)x(e.getX(ce+0),e.getX(ce+1),e.getX(ce+2))}const F=new q,R=new q,I=new q,P=new q;function O(T){I.fromBufferAttribute(a,T),P.copy(I);const L=f[T];F.copy(L),F.sub(I.multiplyScalar(I.dot(L))).normalize(),R.crossVectors(P,L);const z=R.dot(p[T])<0?-1:1;c.setXYZW(T,F.x,F.y,F.z,z)}for(let T=0,L=U.length;T<L;++T){const V=U[T],z=V.start,K=V.count;for(let ce=z,he=z+K;ce<he;ce+=3)O(e.getX(ce+0)),O(e.getX(ce+1)),O(e.getX(ce+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0||r.count!==t.count)r=new ci(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let g=0,S=r.count;g<S;g++)r.setXYZ(g,0,0,0);const a=new q,l=new q,c=new q,f=new q,p=new q,d=new q,_=new q,v=new q;if(e)for(let g=0,S=e.count;g<S;g+=3){const E=e.getX(g+0),b=e.getX(g+1),y=e.getX(g+2);a.fromBufferAttribute(t,E),l.fromBufferAttribute(t,b),c.fromBufferAttribute(t,y),_.subVectors(c,l),v.subVectors(a,l),_.cross(v),f.fromBufferAttribute(r,E),p.fromBufferAttribute(r,b),d.fromBufferAttribute(r,y),f.add(_),p.add(_),d.add(_),r.setXYZ(E,f.x,f.y,f.z),r.setXYZ(b,p.x,p.y,p.z),r.setXYZ(y,d.x,d.y,d.z)}else for(let g=0,S=t.count;g<S;g+=3)a.fromBufferAttribute(t,g+0),l.fromBufferAttribute(t,g+1),c.fromBufferAttribute(t,g+2),_.subVectors(c,l),v.subVectors(a,l),_.cross(v),r.setXYZ(g+0,_.x,_.y,_.z),r.setXYZ(g+1,_.x,_.y,_.z),r.setXYZ(g+2,_.x,_.y,_.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)pn.fromBufferAttribute(e,t),pn.normalize(),e.setXYZ(t,pn.x,pn.y,pn.z)}toNonIndexed(){function e(f,p){const d=f.array,_=f.itemSize,v=f.normalized,g=new d.constructor(p.length*_);let S=0,E=0;for(let b=0,y=p.length;b<y;b++){f.isInterleavedBufferAttribute?S=p[b]*f.data.stride+f.offset:S=p[b]*_;for(let x=0;x<_;x++)g[E++]=d[S++]}return new ci(g,_,v)}if(this.index===null)return Ze("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new hi,r=this.index.array,a=this.attributes;for(const f in a){const p=a[f],d=e(p,r);t.setAttribute(f,d)}const l=this.morphAttributes;for(const f in l){const p=[],d=l[f];for(let _=0,v=d.length;_<v;_++){const g=d[_],S=e(g,r);p.push(S)}t.morphAttributes[f]=p}t.morphTargetsRelative=this.morphTargetsRelative;const c=this.groups;for(let f=0,p=c.length;f<p;f++){const d=c[f];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const p=this.parameters;for(const d in p)p[d]!==void 0&&(e[d]=p[d]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const p in r){const d=r[p];e.data.attributes[p]=d.toJSON(e.data)}const a={};let l=!1;for(const p in this.morphAttributes){const d=this.morphAttributes[p],_=[];for(let v=0,g=d.length;v<g;v++){const S=d[v];_.push(S.toJSON(e.data))}_.length>0&&(a[p]=_,l=!0)}l&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const c=this.groups;c.length>0&&(e.data.groups=JSON.parse(JSON.stringify(c)));const f=this.boundingSphere;return f!==null&&(e.data.boundingSphere=f.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone());const a=e.attributes;for(const d in a){const _=a[d];this.setAttribute(d,_.clone(t))}const l=e.morphAttributes;for(const d in l){const _=[],v=l[d];for(let g=0,S=v.length;g<S;g++)_.push(v[g].clone(t));this.morphAttributes[d]=_}this.morphTargetsRelative=e.morphTargetsRelative;const c=e.groups;for(let d=0,_=c.length;d<_;d++){const v=c[d];this.addGroup(v.start,v.count,v.materialIndex)}const f=e.boundingBox;f!==null&&(this.boundingBox=f.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class g1{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ih,this.updateRanges=[],this.version=0,this.uuid=Ai()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,r){e*=this.stride,r*=t.stride;for(let a=0,l=this.stride;a<l;a++)this.array[e+a]=t.array[r+a];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),r=new this.constructor(t,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ai()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dn=new q;class P_{constructor(e,t,r,a=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=r,this.normalized=a}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,r=this.data.count;t<r;t++)Dn.fromBufferAttribute(this,t),Dn.applyMatrix4(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)Dn.fromBufferAttribute(this,t),Dn.applyNormalMatrix(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)Dn.fromBufferAttribute(this,t),Dn.transformDirection(e),this.setXYZ(t,Dn.x,Dn.y,Dn.z);return this}getComponent(e,t){let r=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(r=Ti(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Dt(r,this.array)),this.data.array[e*this.data.stride+this.offset+t]=r,this}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ti(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ti(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ti(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ti(t,this.array)),t}setXY(e,t,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),r=Dt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this}setXYZ(e,t,r,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),r=Dt(r,this.array),a=Dt(a,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=a,this}setXYZW(e,t,r,a,l){return e=e*this.data.stride+this.offset,this.normalized&&(t=Dt(t,this.array),r=Dt(r,this.array),a=Dt(a,this.array),l=Dt(l,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=a,this.data.array[e+3]=l,this}clone(e){if(e===void 0){mu("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const a=r*this.data.stride+this.offset;for(let l=0;l<this.itemSize;l++)t.push(this.data.array[a+l])}return new ci(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new P_(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){mu("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const a=r*this.data.stride+this.offset;for(let l=0;l<this.itemSize;l++)t.push(this.data.array[a+l])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}let ny=0;class Gr extends Vr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ny++}),this.uuid=Ai(),this.name="",this.type="Material",this.blending=aa,this.side=zr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xf,this.blendDst=Yf,this.blendEquation=hs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ht(0,0,0),this.blendAlpha=0,this.depthFunc=ua,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$m,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hs,this.stencilZFail=Hs,this.stencilZPass=Hs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){Ze(`Material: parameter '${t}' has value of undefined.`);continue}const a=this[t];if(a===void 0){Ze(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(r):a&&a.isVector2&&r&&r.isVector2||a&&a.isEuler&&r&&r.isEuler||a&&a.isVector3&&r&&r.isVector3?a.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(r.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(r.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(r.dispersion=this.dispersion),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapRotation!==void 0&&(r.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==aa&&(r.blending=this.blending),this.side!==zr&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Xf&&(r.blendSrc=this.blendSrc),this.blendDst!==Yf&&(r.blendDst=this.blendDst),this.blendEquation!==hs&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==ua&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$m&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hs&&(r.stencilFail=this.stencilFail),this.stencilZFail!==Hs&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==Hs&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.allowOverride===!1&&(r.allowOverride=!1),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function a(l){const c=[];for(const f in l){const p=l[f];delete p.metadata,c.push(p)}return c}if(t){const l=a(e.textures),c=a(e.images);l.length>0&&(r.textures=l),c.length>0&&(r.images=c)}return r}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ht().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),this.normalScale=new it().fromArray(r)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new it().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const a=t.length;r=new Array(a);for(let l=0;l!==a;++l)r[l]=t[l].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const er=new q,Rf=new q,Ul=new q,Ur=new q,Cf=new q,Fl=new q,Pf=new q;class pa{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,er)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=er.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(er.copy(this.origin).addScaledVector(this.direction,t),er.distanceToSquared(e))}distanceSqToSegment(e,t,r,a){Rf.copy(e).add(t).multiplyScalar(.5),Ul.copy(t).sub(e).normalize(),Ur.copy(this.origin).sub(Rf);const l=e.distanceTo(t)*.5,c=-this.direction.dot(Ul),f=Ur.dot(this.direction),p=-Ur.dot(Ul),d=Ur.lengthSq(),_=Math.abs(1-c*c);let v,g,S,E;if(_>0)if(v=c*p-f,g=c*f-p,E=l*_,v>=0)if(g>=-E)if(g<=E){const b=1/_;v*=b,g*=b,S=v*(v+c*g+2*f)+g*(c*v+g+2*p)+d}else g=l,v=Math.max(0,-(c*g+f)),S=-v*v+g*(g+2*p)+d;else g=-l,v=Math.max(0,-(c*g+f)),S=-v*v+g*(g+2*p)+d;else g<=-E?(v=Math.max(0,-(-c*l+f)),g=v>0?-l:Math.min(Math.max(-l,-p),l),S=-v*v+g*(g+2*p)+d):g<=E?(v=0,g=Math.min(Math.max(-l,-p),l),S=g*(g+2*p)+d):(v=Math.max(0,-(c*l+f)),g=v>0?l:Math.min(Math.max(-l,-p),l),S=-v*v+g*(g+2*p)+d);else g=c>0?-l:l,v=Math.max(0,-(c*g+f)),S=-v*v+g*(g+2*p)+d;return r&&r.copy(this.origin).addScaledVector(this.direction,v),a&&a.copy(Rf).addScaledVector(Ul,g),S}intersectSphere(e,t){er.subVectors(e.center,this.origin);const r=er.dot(this.direction),a=er.dot(er)-r*r,l=e.radius*e.radius;if(a>l)return null;const c=Math.sqrt(l-a),f=r-c,p=r+c;return p<0?null:f<0?this.at(p,t):this.at(f,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,a,l,c,f,p;const d=1/this.direction.x,_=1/this.direction.y,v=1/this.direction.z,g=this.origin;return d>=0?(r=(e.min.x-g.x)*d,a=(e.max.x-g.x)*d):(r=(e.max.x-g.x)*d,a=(e.min.x-g.x)*d),_>=0?(l=(e.min.y-g.y)*_,c=(e.max.y-g.y)*_):(l=(e.max.y-g.y)*_,c=(e.min.y-g.y)*_),r>c||l>a||((l>r||isNaN(r))&&(r=l),(c<a||isNaN(a))&&(a=c),v>=0?(f=(e.min.z-g.z)*v,p=(e.max.z-g.z)*v):(f=(e.max.z-g.z)*v,p=(e.min.z-g.z)*v),r>p||f>a)||((f>r||r!==r)&&(r=f),(p<a||a!==a)&&(a=p),a<0)?null:this.at(r>=0?r:a,t)}intersectsBox(e){return this.intersectBox(e,er)!==null}intersectTriangle(e,t,r,a,l){Cf.subVectors(t,e),Fl.subVectors(r,e),Pf.crossVectors(Cf,Fl);let c=this.direction.dot(Pf),f;if(c>0){if(a)return null;f=1}else if(c<0)f=-1,c=-c;else return null;Ur.subVectors(this.origin,e);const p=f*this.direction.dot(Fl.crossVectors(Ur,Fl));if(p<0)return null;const d=f*this.direction.dot(Cf.cross(Ur));if(d<0||p+d>c)return null;const _=-f*Ur.dot(Pf);return _<0?null:this.at(_/c,l)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class L_ extends Gr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cr,this.combine=Vh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const cg=new _t,cs=new pa,Ol=new fr,fg=new q,Bl=new q,kl=new q,zl=new q,Lf=new q,Vl=new q,hg=new q,Hl=new q;class fi extends tn{constructor(e=new hi,t=new L_){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,c=a.length;l<c;l++){const f=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}getVertexPosition(e,t){const r=this.geometry,a=r.attributes.position,l=r.morphAttributes.position,c=r.morphTargetsRelative;t.fromBufferAttribute(a,e);const f=this.morphTargetInfluences;if(l&&f){Vl.set(0,0,0);for(let p=0,d=l.length;p<d;p++){const _=f[p],v=l[p];_!==0&&(Lf.fromBufferAttribute(v,e),c?Vl.addScaledVector(Lf,_):Vl.addScaledVector(Lf.sub(t),_))}t.add(Vl)}return t}raycast(e,t){const r=this.geometry,a=this.material,l=this.matrixWorld;a!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),Ol.copy(r.boundingSphere),Ol.applyMatrix4(l),cs.copy(e.ray).recast(e.near),!(Ol.containsPoint(cs.origin)===!1&&(cs.intersectSphere(Ol,fg)===null||cs.origin.distanceToSquared(fg)>(e.far-e.near)**2))&&(cg.copy(l).invert(),cs.copy(e.ray).applyMatrix4(cg),!(r.boundingBox!==null&&cs.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,cs)))}_computeIntersections(e,t,r){let a;const l=this.geometry,c=this.material,f=l.index,p=l.attributes.position,d=l.attributes.uv,_=l.attributes.uv1,v=l.attributes.normal,g=l.groups,S=l.drawRange;if(f!==null)if(Array.isArray(c))for(let E=0,b=g.length;E<b;E++){const y=g[E],x=c[y.materialIndex],U=Math.max(y.start,S.start),F=Math.min(f.count,Math.min(y.start+y.count,S.start+S.count));for(let R=U,I=F;R<I;R+=3){const P=f.getX(R),O=f.getX(R+1),T=f.getX(R+2);a=Gl(this,x,e,r,d,_,v,P,O,T),a&&(a.faceIndex=Math.floor(R/3),a.face.materialIndex=y.materialIndex,t.push(a))}}else{const E=Math.max(0,S.start),b=Math.min(f.count,S.start+S.count);for(let y=E,x=b;y<x;y+=3){const U=f.getX(y),F=f.getX(y+1),R=f.getX(y+2);a=Gl(this,c,e,r,d,_,v,U,F,R),a&&(a.faceIndex=Math.floor(y/3),t.push(a))}}else if(p!==void 0)if(Array.isArray(c))for(let E=0,b=g.length;E<b;E++){const y=g[E],x=c[y.materialIndex],U=Math.max(y.start,S.start),F=Math.min(p.count,Math.min(y.start+y.count,S.start+S.count));for(let R=U,I=F;R<I;R+=3){const P=R,O=R+1,T=R+2;a=Gl(this,x,e,r,d,_,v,P,O,T),a&&(a.faceIndex=Math.floor(R/3),a.face.materialIndex=y.materialIndex,t.push(a))}}else{const E=Math.max(0,S.start),b=Math.min(p.count,S.start+S.count);for(let y=E,x=b;y<x;y+=3){const U=y,F=y+1,R=y+2;a=Gl(this,c,e,r,d,_,v,U,F,R),a&&(a.faceIndex=Math.floor(y/3),t.push(a))}}}}function iy(s,e,t,r,a,l,c,f){let p;if(e.side===Gn?p=r.intersectTriangle(c,l,a,!0,f):p=r.intersectTriangle(a,l,c,e.side===zr,f),p===null)return null;Hl.copy(f),Hl.applyMatrix4(s.matrixWorld);const d=t.ray.origin.distanceTo(Hl);return d<t.near||d>t.far?null:{distance:d,point:Hl.clone(),object:s}}function Gl(s,e,t,r,a,l,c,f,p,d){s.getVertexPosition(f,Bl),s.getVertexPosition(p,kl),s.getVertexPosition(d,zl);const _=iy(s,e,t,r,Bl,kl,zl,hg);if(_){const v=new q;wi.getBarycoord(hg,Bl,kl,zl,v),a&&(_.uv=wi.getInterpolatedAttribute(a,f,p,d,v,new it)),l&&(_.uv1=wi.getInterpolatedAttribute(l,f,p,d,v,new it)),c&&(_.normal=wi.getInterpolatedAttribute(c,f,p,d,v,new q),_.normal.dot(r.direction)>0&&_.normal.multiplyScalar(-1));const g={a:f,b:p,c:d,normal:new q,materialIndex:0};wi.getNormal(Bl,kl,zl,g.normal),_.face=g,_.barycoord=v}return _}const ro=new Ft,dg=new Ft,pg=new Ft,ry=new Ft,mg=new _t,Wl=new q,Df=new fr,gg=new _t,If=new pa;class _1 extends fi{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Wm,this.bindMatrix=new _t,this.bindMatrixInverse=new _t,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Hr),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let r=0;r<t.count;r++)this.getVertexPosition(r,Wl),this.boundingBox.expandByPoint(Wl)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new fr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let r=0;r<t.count;r++)this.getVertexPosition(r,Wl),this.boundingSphere.expandByPoint(Wl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const r=this.material,a=this.matrixWorld;r!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Df.copy(this.boundingSphere),Df.applyMatrix4(a),e.ray.intersectsSphere(Df)!==!1&&(gg.copy(a).invert(),If.copy(e.ray).applyMatrix4(gg),!(this.boundingBox!==null&&If.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,If)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Ft,t=this.geometry.attributes.skinWeight;for(let r=0,a=t.count;r<a;r++){e.fromBufferAttribute(t,r);const l=1/e.manhattanLength();l!==1/0?e.multiplyScalar(l):e.set(1,0,0,0),t.setXYZW(r,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Wm?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===ox?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ze("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const r=this.skeleton,a=this.geometry;dg.fromBufferAttribute(a.attributes.skinIndex,e),pg.fromBufferAttribute(a.attributes.skinWeight,e),t.isVector4?(ro.copy(t),t.set(0,0,0,0)):(ro.set(...t,1),t.set(0,0,0)),ro.applyMatrix4(this.bindMatrix);for(let l=0;l<4;l++){const c=pg.getComponent(l);if(c!==0){const f=dg.getComponent(l);mg.multiplyMatrices(r.bones[f].matrixWorld,r.boneInverses[f]),t.addScaledVector(ry.copy(ro).applyMatrix4(mg),c)}}return t.isVector4&&(t.w=ro.w),t.applyMatrix4(this.bindMatrixInverse)}}class sy extends tn{constructor(){super(),this.isBone=!0,this.type="Bone"}}class ed extends yn{constructor(e=null,t=1,r=1,a,l,c,f,p,d=xn,_=xn,v,g){super(null,c,f,p,d,_,a,l,v,g),this.isDataTexture=!0,this.image={data:e,width:t,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const _g=new _t,ay=new _t;class D_{constructor(e=[],t=[]){this.uuid=Ai(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ze("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let r=0,a=this.bones.length;r<a;r++)this.boneInverses.push(new _t)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const r=new _t;this.bones[e]&&r.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(r)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const r=this.bones[e];r&&r.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const r=this.bones[e];r&&(r.parent&&r.parent.isBone?(r.matrix.copy(r.parent.matrixWorld).invert(),r.matrix.multiply(r.matrixWorld)):r.matrix.copy(r.matrixWorld),r.matrix.decompose(r.position,r.quaternion,r.scale))}}update(){const e=this.bones,t=this.boneInverses,r=this.boneMatrices,a=this.boneTexture;for(let l=0,c=e.length;l<c;l++){const f=e[l]?e[l].matrixWorld:ay;_g.multiplyMatrices(f,t[l]),_g.toArray(r,l*16)}a!==null&&(a.needsUpdate=!0)}clone(){return new D_(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const r=new ed(t,e,e,ui,li);return r.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=r,this}getBoneByName(e){for(let t=0,r=this.bones.length;t<r;t++){const a=this.bones[t];if(a.name===e)return a}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let r=0,a=e.bones.length;r<a;r++){const l=e.bones[r];let c=t[l];c===void 0&&(Ze("Skeleton: No bone found with UUID:",l),c=new sy),this.bones.push(c),this.boneInverses.push(new _t().fromArray(e.boneInverses[r]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,r=this.boneInverses;for(let a=0,l=t.length;a<l;a++){const c=t[a];e.bones.push(c.uuid);const f=r[a];e.boneInverses.push(f.toArray())}return e}}class vg extends ci{constructor(e,t,r,a=1){super(e,t,r),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Qs=new _t,xg=new _t,Xl=[],yg=new Hr,oy=new _t,so=new fi,ao=new fr;class v1 extends fi{constructor(e,t,r){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new vg(new Float32Array(r*16),16),this.instanceColor=null,this.morphTexture=null,this.count=r,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<r;a++)this.setMatrixAt(a,oy)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Hr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,Qs),yg.copy(e.boundingBox).applyMatrix4(Qs),this.boundingBox.union(yg)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,Qs),ao.copy(e.boundingSphere).applyMatrix4(Qs),this.boundingSphere.union(ao)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const r=t.morphTargetInfluences,a=this.morphTexture.source.data.data,l=r.length+1,c=e*l+1;for(let f=0;f<r.length;f++)r[f]=a[c+f]}raycast(e,t){const r=this.matrixWorld,a=this.count;if(so.geometry=this.geometry,so.material=this.material,so.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ao.copy(this.boundingSphere),ao.applyMatrix4(r),e.ray.intersectsSphere(ao)!==!1))for(let l=0;l<a;l++){this.getMatrixAt(l,Qs),xg.multiplyMatrices(r,Qs),so.matrixWorld=xg,so.raycast(e,Xl);for(let c=0,f=Xl.length;c<f;c++){const p=Xl[c];p.instanceId=l,p.object=this,t.push(p)}Xl.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new vg(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const r=t.morphTargetInfluences,a=r.length+1;this.morphTexture===null&&(this.morphTexture=new ed(new Float32Array(a*this.count),a,this.count,Xh,li));const l=this.morphTexture.source.data.data;let c=0;for(let d=0;d<r.length;d++)c+=r[d];const f=this.geometry.morphTargetsRelative?1:1-c,p=a*e;return l[p]=f,l.set(r,p+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Nf=new q,ly=new q,uy=new ut;class Or{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,a){return this.normal.set(e,t,r),this.constant=a,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const a=Nf.subVectors(r,t).cross(ly.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,r=!0){const a=e.delta(Nf),l=this.normal.dot(a);if(l===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/l;return r===!0&&(c<0||c>1)?null:t.copy(e.start).addScaledVector(a,c)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||uy.getNormalMatrix(e),a=this.coplanarPoint(Nf).applyMatrix4(e),l=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(l),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const fs=new fr,cy=new it(.5,.5),Yl=new q;class td{constructor(e=new Or,t=new Or,r=new Or,a=new Or,l=new Or,c=new Or){this.planes=[e,t,r,a,l,c]}set(e,t,r,a,l,c){const f=this.planes;return f[0].copy(e),f[1].copy(t),f[2].copy(r),f[3].copy(a),f[4].copy(l),f[5].copy(c),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=Fi,r=!1){const a=this.planes,l=e.elements,c=l[0],f=l[1],p=l[2],d=l[3],_=l[4],v=l[5],g=l[6],S=l[7],E=l[8],b=l[9],y=l[10],x=l[11],U=l[12],F=l[13],R=l[14],I=l[15];if(a[0].setComponents(d-c,S-_,x-E,I-U).normalize(),a[1].setComponents(d+c,S+_,x+E,I+U).normalize(),a[2].setComponents(d+f,S+v,x+b,I+F).normalize(),a[3].setComponents(d-f,S-v,x-b,I-F).normalize(),r)a[4].setComponents(p,g,y,R).normalize(),a[5].setComponents(d-p,S-g,x-y,I-R).normalize();else if(a[4].setComponents(d-p,S-g,x-y,I-R).normalize(),t===Fi)a[5].setComponents(d+p,S+g,x+y,I+R).normalize();else if(t===_o)a[5].setComponents(p,g,y,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),fs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),fs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(fs)}intersectsSprite(e){fs.center.set(0,0,0);const t=cy.distanceTo(e.center);return fs.radius=.7071067811865476+t,fs.applyMatrix4(e.matrixWorld),this.intersectsSphere(fs)}intersectsSphere(e){const t=this.planes,r=e.center,a=-e.radius;for(let l=0;l<6;l++)if(t[l].distanceToPoint(r)<a)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const a=t[r];if(Yl.x=a.normal.x>0?e.max.x:e.min.x,Yl.y=a.normal.y>0?e.max.y:e.min.y,Yl.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Yl)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class fy extends Gr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ht(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const gu=new q,_u=new q,Sg=new _t,oo=new pa,ql=new fr,Uf=new q,Mg=new q;class I_ extends tn{constructor(e=new hi,t=new fy){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let a=1,l=t.count;a<l;a++)gu.fromBufferAttribute(t,a-1),_u.fromBufferAttribute(t,a),r[a]=r[a-1],r[a]+=gu.distanceTo(_u);e.setAttribute("lineDistance",new Wn(r,1))}else Ze("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,a=this.matrixWorld,l=e.params.Line.threshold,c=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),ql.copy(r.boundingSphere),ql.applyMatrix4(a),ql.radius+=l,e.ray.intersectsSphere(ql)===!1)return;Sg.copy(a).invert(),oo.copy(e.ray).applyMatrix4(Sg);const f=l/((this.scale.x+this.scale.y+this.scale.z)/3),p=f*f,d=this.isLineSegments?2:1,_=r.index,g=r.attributes.position;if(_!==null){const S=Math.max(0,c.start),E=Math.min(_.count,c.start+c.count);for(let b=S,y=E-1;b<y;b+=d){const x=_.getX(b),U=_.getX(b+1),F=Kl(this,e,oo,p,x,U,b);F&&t.push(F)}if(this.isLineLoop){const b=_.getX(E-1),y=_.getX(S),x=Kl(this,e,oo,p,b,y,E-1);x&&t.push(x)}}else{const S=Math.max(0,c.start),E=Math.min(g.count,c.start+c.count);for(let b=S,y=E-1;b<y;b+=d){const x=Kl(this,e,oo,p,b,b+1,b);x&&t.push(x)}if(this.isLineLoop){const b=Kl(this,e,oo,p,E-1,S,E-1);b&&t.push(b)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,c=a.length;l<c;l++){const f=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}}function Kl(s,e,t,r,a,l,c){const f=s.geometry.attributes.position;if(gu.fromBufferAttribute(f,a),_u.fromBufferAttribute(f,l),t.distanceSqToSegment(gu,_u,Uf,Mg)>r)return;Uf.applyMatrix4(s.matrixWorld);const d=e.ray.origin.distanceTo(Uf);if(!(d<e.near||d>e.far))return{distance:d,point:Mg.clone().applyMatrix4(s.matrixWorld),index:c,face:null,faceIndex:null,barycoord:null,object:s}}const Eg=new q,Tg=new q;class x1 extends I_{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[];for(let a=0,l=t.count;a<l;a+=2)Eg.fromBufferAttribute(t,a),Tg.fromBufferAttribute(t,a+1),r[a]=a===0?0:r[a-1],r[a+1]=r[a]+Eg.distanceTo(Tg);e.setAttribute("lineDistance",new Wn(r,1))}else Ze("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class y1 extends I_{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class hy extends Gr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const wg=new _t,Nh=new pa,$l=new fr,Zl=new q;class S1 extends tn{constructor(e=new hi,t=new hy){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const r=this.geometry,a=this.matrixWorld,l=e.params.Points.threshold,c=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),$l.copy(r.boundingSphere),$l.applyMatrix4(a),$l.radius+=l,e.ray.intersectsSphere($l)===!1)return;wg.copy(a).invert(),Nh.copy(e.ray).applyMatrix4(wg);const f=l/((this.scale.x+this.scale.y+this.scale.z)/3),p=f*f,d=r.index,v=r.attributes.position;if(d!==null){const g=Math.max(0,c.start),S=Math.min(d.count,c.start+c.count);for(let E=g,b=S;E<b;E++){const y=d.getX(E);Zl.fromBufferAttribute(v,y),Ag(Zl,y,p,a,e,t,this)}}else{const g=Math.max(0,c.start),S=Math.min(v.count,c.start+c.count);for(let E=g,b=S;E<b;E++)Zl.fromBufferAttribute(v,E),Ag(Zl,E,p,a,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const a=t[r[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let l=0,c=a.length;l<c;l++){const f=a[l].name||String(l);this.morphTargetInfluences.push(0),this.morphTargetDictionary[f]=l}}}}}function Ag(s,e,t,r,a,l,c){const f=Nh.distanceSqToPoint(s);if(f<t){const p=new q;Nh.closestPointToPoint(s,p),p.applyMatrix4(r);const d=a.ray.origin.distanceTo(p);if(d<a.near||d>a.far)return;l.push({distance:d,distanceToRay:Math.sqrt(f),point:p,index:e,face:null,faceIndex:null,barycoord:null,object:c})}}class N_ extends yn{constructor(e=[],t=gs,r,a,l,c,f,p,d,_){super(e,t,r,a,l,c,f,p,d,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class M1 extends yn{constructor(e,t,r,a,l,c,f,p,d){super(e,t,r,a,l,c,f,p,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ha extends yn{constructor(e,t,r=ki,a,l,c,f=xn,p=xn,d,_=lr,v=1){if(_!==lr&&_!==ms)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const g={width:e,height:t,depth:v};super(g,a,l,c,f,p,_,r,d),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new jh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class dy extends ha{constructor(e,t=ki,r=gs,a,l,c=xn,f=xn,p,d=lr){const _={width:e,height:e,depth:1},v=[_,_,_,_,_,_];super(e,e,t,r,a,l,c,f,p,d),this.image=v,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class U_ extends yn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class xo extends hi{constructor(e=1,t=1,r=1,a=1,l=1,c=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:a,heightSegments:l,depthSegments:c};const f=this;a=Math.floor(a),l=Math.floor(l),c=Math.floor(c);const p=[],d=[],_=[],v=[];let g=0,S=0;E("z","y","x",-1,-1,r,t,e,c,l,0),E("z","y","x",1,-1,r,t,-e,c,l,1),E("x","z","y",1,1,e,r,t,a,c,2),E("x","z","y",1,-1,e,r,-t,a,c,3),E("x","y","z",1,-1,e,t,r,a,l,4),E("x","y","z",-1,-1,e,t,-r,a,l,5),this.setIndex(p),this.setAttribute("position",new Wn(d,3)),this.setAttribute("normal",new Wn(_,3)),this.setAttribute("uv",new Wn(v,2));function E(b,y,x,U,F,R,I,P,O,T,L){const V=R/O,z=I/T,K=R/2,ce=I/2,he=P/2,J=O+1,oe=T+1;let ee=0,X=0;const ae=new q;for(let le=0;le<oe;le++){const N=le*z-ce;for(let $=0;$<J;$++){const Ie=$*V-K;ae[b]=Ie*U,ae[y]=N*F,ae[x]=he,d.push(ae.x,ae.y,ae.z),ae[b]=0,ae[y]=0,ae[x]=P>0?1:-1,_.push(ae.x,ae.y,ae.z),v.push($/O),v.push(1-le/T),ee+=1}}for(let le=0;le<T;le++)for(let N=0;N<O;N++){const $=g+N+J*le,Ie=g+N+J*(le+1),qe=g+(N+1)+J*(le+1),ke=g+(N+1)+J*le;p.push($,Ie,ke),p.push(Ie,qe,ke),X+=6}f.addGroup(S,X,L),S+=X,g+=ee}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xo(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class yu extends hi{constructor(e=1,t=1,r=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:a};const l=e/2,c=t/2,f=Math.floor(r),p=Math.floor(a),d=f+1,_=p+1,v=e/f,g=t/p,S=[],E=[],b=[],y=[];for(let x=0;x<_;x++){const U=x*g-c;for(let F=0;F<d;F++){const R=F*v-l;E.push(R,-U,0),b.push(0,0,1),y.push(F/f),y.push(1-x/p)}}for(let x=0;x<p;x++)for(let U=0;U<f;U++){const F=U+d*x,R=U+d*(x+1),I=U+1+d*(x+1),P=U+1+d*x;S.push(F,R,P),S.push(R,I,P)}this.setIndex(S),this.setAttribute("position",new Wn(E,3)),this.setAttribute("normal",new Wn(b,3)),this.setAttribute("uv",new Wn(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new yu(e.width,e.height,e.widthSegments,e.heightSegments)}}class F_ extends hi{constructor(e=1,t=32,r=16,a=0,l=Math.PI*2,c=0,f=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:r,phiStart:a,phiLength:l,thetaStart:c,thetaLength:f},t=Math.max(3,Math.floor(t)),r=Math.max(2,Math.floor(r));const p=Math.min(c+f,Math.PI);let d=0;const _=[],v=new q,g=new q,S=[],E=[],b=[],y=[];for(let x=0;x<=r;x++){const U=[],F=x/r,R=c+F*f,I=e*Math.cos(R),P=Math.sqrt(e*e-I*I);let O=0;x===0&&c===0?O=.5/t:x===r&&p===Math.PI&&(O=-.5/t);for(let T=0;T<=t;T++){const L=T/t,V=a+L*l;v.x=-P*Math.cos(V),v.y=I,v.z=P*Math.sin(V),E.push(v.x,v.y,v.z),g.copy(v).normalize(),b.push(g.x,g.y,g.z),y.push(L+O,1-F),U.push(d++)}_.push(U)}for(let x=0;x<r;x++)for(let U=0;U<t;U++){const F=_[x][U+1],R=_[x][U],I=_[x+1][U],P=_[x+1][U+1];(x!==0||c>0)&&S.push(F,R,P),(x!==r-1||p<Math.PI)&&S.push(R,I,P)}this.setIndex(S),this.setAttribute("position",new Wn(E,3)),this.setAttribute("normal",new Wn(b,3)),this.setAttribute("uv",new Wn(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new F_(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function da(s){const e={};for(const t in s){e[t]={};for(const r in s[t]){const a=s[t][r];if(bg(a))a.isRenderTargetTexture?(Ze("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=a.clone();else if(Array.isArray(a))if(bg(a[0])){const l=[];for(let c=0,f=a.length;c<f;c++)l[c]=a[c].clone();e[t][r]=l}else e[t][r]=a.slice();else e[t][r]=a}}return e}function In(s){const e={};for(let t=0;t<s.length;t++){const r=da(s[t]);for(const a in r)e[a]=r[a]}return e}function bg(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function py(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function O_(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}const my={clone:da,merge:In};var gy=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_y=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zi extends Gr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gy,this.fragmentShader=_y,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=da(e.uniforms),this.uniformsGroups=py(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const a in this.uniforms){const c=this.uniforms[a].value;c&&c.isTexture?t.uniforms[a]={type:"t",value:c.toJSON(e).uuid}:c&&c.isColor?t.uniforms[a]={type:"c",value:c.getHex()}:c&&c.isVector2?t.uniforms[a]={type:"v2",value:c.toArray()}:c&&c.isVector3?t.uniforms[a]={type:"v3",value:c.toArray()}:c&&c.isVector4?t.uniforms[a]={type:"v4",value:c.toArray()}:c&&c.isMatrix3?t.uniforms[a]={type:"m3",value:c.toArray()}:c&&c.isMatrix4?t.uniforms[a]={type:"m4",value:c.toArray()}:t.uniforms[a]={value:c}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const a in this.extensions)this.extensions[a]===!0&&(r[a]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const r in e.uniforms){const a=e.uniforms[r];switch(this.uniforms[r]={},a.type){case"t":this.uniforms[r].value=t[a.value]||null;break;case"c":this.uniforms[r].value=new ht().setHex(a.value);break;case"v2":this.uniforms[r].value=new it().fromArray(a.value);break;case"v3":this.uniforms[r].value=new q().fromArray(a.value);break;case"v4":this.uniforms[r].value=new Ft().fromArray(a.value);break;case"m3":this.uniforms[r].value=new ut().fromArray(a.value);break;case"m4":this.uniforms[r].value=new _t().fromArray(a.value);break;default:this.uniforms[r].value=a.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const r in e.extensions)this.extensions[r]=e.extensions[r];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class vy extends zi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class xy extends Gr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hu,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class E1 extends xy{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new it(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ht(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ht(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ht(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class T1 extends Gr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hu,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new cr,this.combine=Vh,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class yy extends Gr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=cx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sy extends Gr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Jl(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function My(s){function e(a,l){return s[a]-s[l]}const t=s.length,r=new Array(t);for(let a=0;a!==t;++a)r[a]=a;return r.sort(e),r}function Rg(s,e,t){const r=s.length,a=new s.constructor(r);for(let l=0,c=0;c!==r;++l){const f=t[l]*e;for(let p=0;p!==e;++p)a[c++]=s[f+p]}return a}function Ey(s,e,t,r){let a=1,l=s[0];for(;l!==void 0&&l[r]===void 0;)l=s[a++];if(l===void 0)return;let c=l[r];if(c!==void 0)if(Array.isArray(c))do c=l[r],c!==void 0&&(e.push(l.time),t.push(...c)),l=s[a++];while(l!==void 0);else if(c.toArray!==void 0)do c=l[r],c!==void 0&&(e.push(l.time),c.toArray(t,t.length)),l=s[a++];while(l!==void 0);else do c=l[r],c!==void 0&&(e.push(l.time),t.push(c)),l=s[a++];while(l!==void 0)}class yo{constructor(e,t,r,a){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=a!==void 0?a:new t.constructor(r),this.sampleValues=t,this.valueSize=r,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let r=this._cachedIndex,a=t[r],l=t[r-1];e:{t:{let c;n:{i:if(!(e<a)){for(let f=r+2;;){if(a===void 0){if(e<l)break i;return r=t.length,this._cachedIndex=r,this.copySampleValue_(r-1)}if(r===f)break;if(l=a,a=t[++r],e<a)break t}c=t.length;break n}if(!(e>=l)){const f=t[1];e<f&&(r=2,l=f);for(let p=r-2;;){if(l===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===p)break;if(a=l,l=t[--r-1],e>=l)break t}c=r,r=0;break n}break e}for(;r<c;){const f=r+c>>>1;e<t[f]?c=f:r=f+1}if(a=t[r],l=t[r-1],l===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(a===void 0)return r=t.length,this._cachedIndex=r,this.copySampleValue_(r-1)}this._cachedIndex=r,this.intervalChanged_(r,l,a)}return this.interpolate_(r,l,e,a)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,r=this.sampleValues,a=this.valueSize,l=e*a;for(let c=0;c!==a;++c)t[c]=r[l+c];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class Ty extends yo{constructor(e,t,r,a){super(e,t,r,a),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ym,endingEnd:Ym}}intervalChanged_(e,t,r){const a=this.parameterPositions;let l=e-2,c=e+1,f=a[l],p=a[c];if(f===void 0)switch(this.getSettings_().endingStart){case qm:l=e,f=2*t-r;break;case Km:l=a.length-2,f=t+a[l]-a[l+1];break;default:l=e,f=r}if(p===void 0)switch(this.getSettings_().endingEnd){case qm:c=e,p=2*r-t;break;case Km:c=1,p=r+a[1]-a[0];break;default:c=e-1,p=t}const d=(r-t)*.5,_=this.valueSize;this._weightPrev=d/(t-f),this._weightNext=d/(p-r),this._offsetPrev=l*_,this._offsetNext=c*_}interpolate_(e,t,r,a){const l=this.resultBuffer,c=this.sampleValues,f=this.valueSize,p=e*f,d=p-f,_=this._offsetPrev,v=this._offsetNext,g=this._weightPrev,S=this._weightNext,E=(r-t)/(a-t),b=E*E,y=b*E,x=-g*y+2*g*b-g*E,U=(1+g)*y+(-1.5-2*g)*b+(-.5+g)*E+1,F=(-1-S)*y+(1.5+S)*b+.5*E,R=S*y-S*b;for(let I=0;I!==f;++I)l[I]=x*c[_+I]+U*c[d+I]+F*c[p+I]+R*c[v+I];return l}}class wy extends yo{constructor(e,t,r,a){super(e,t,r,a)}interpolate_(e,t,r,a){const l=this.resultBuffer,c=this.sampleValues,f=this.valueSize,p=e*f,d=p-f,_=(r-t)/(a-t),v=1-_;for(let g=0;g!==f;++g)l[g]=c[d+g]*v+c[p+g]*_;return l}}class Ay extends yo{constructor(e,t,r,a){super(e,t,r,a)}interpolate_(e){return this.copySampleValue_(e-1)}}class by extends yo{interpolate_(e,t,r,a){const l=this.resultBuffer,c=this.sampleValues,f=this.valueSize,p=e*f,d=p-f,_=this.inTangents,v=this.outTangents;if(!_||!v){const E=(r-t)/(a-t),b=1-E;for(let y=0;y!==f;++y)l[y]=c[d+y]*b+c[p+y]*E;return l}const g=f*2,S=e-1;for(let E=0;E!==f;++E){const b=c[d+E],y=c[p+E],x=S*g+E*2,U=v[x],F=v[x+1],R=e*g+E*2,I=_[R],P=_[R+1];let O=(r-t)/(a-t),T,L,V,z,K;for(let ce=0;ce<8;ce++){T=O*O,L=T*O,V=1-O,z=V*V,K=z*V;const J=K*t+3*z*O*U+3*V*T*I+L*a-r;if(Math.abs(J)<1e-10)break;const oe=3*z*(U-t)+6*V*O*(I-U)+3*T*(a-I);if(Math.abs(oe)<1e-10)break;O=O-J/oe,O=Math.max(0,Math.min(1,O))}l[E]=K*b+3*z*O*F+3*V*T*P+L*y}return l}}class bi{constructor(e,t,r,a){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Jl(t,this.TimeBufferType),this.values=Jl(r,this.ValueBufferType),this.setInterpolation(a||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let r;if(t.toJSON!==this.toJSON)r=t.toJSON(e);else{r={name:e.name,times:Jl(e.times,Array),values:Jl(e.values,Array)};const a=e.getInterpolation();a!==e.DefaultInterpolation&&(r.interpolation=a)}return r.type=e.ValueTypeName,r}InterpolantFactoryMethodDiscrete(e){return new Ay(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new wy(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ty(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new by(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case fu:t=this.InterpolantFactoryMethodDiscrete;break;case Dh:t=this.InterpolantFactoryMethodLinear;break;case cf:t=this.InterpolantFactoryMethodSmooth;break;case Xm:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const r="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(r);return Ze("KeyframeTrack:",r),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return fu;case this.InterpolantFactoryMethodLinear:return Dh;case this.InterpolantFactoryMethodSmooth:return cf;case this.InterpolantFactoryMethodBezier:return Xm}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let r=0,a=t.length;r!==a;++r)t[r]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let r=0,a=t.length;r!==a;++r)t[r]*=e}return this}trim(e,t){const r=this.times,a=r.length;let l=0,c=a-1;for(;l!==a&&r[l]<e;)++l;for(;c!==-1&&r[c]>t;)--c;if(++c,l!==0||c!==a){l>=c&&(c=Math.max(c,1),l=c-1);const f=this.getValueSize();this.times=r.slice(l,c),this.values=this.values.slice(l*f,c*f)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(st("KeyframeTrack: Invalid value size in track.",this),e=!1);const r=this.times,a=this.values,l=r.length;l===0&&(st("KeyframeTrack: Track is empty.",this),e=!1);let c=null;for(let f=0;f!==l;f++){const p=r[f];if(typeof p=="number"&&isNaN(p)){st("KeyframeTrack: Time is not a valid number.",this,f,p),e=!1;break}if(c!==null&&c>p){st("KeyframeTrack: Out of order keys.",this,f,p,c),e=!1;break}c=p}if(a!==void 0&&xx(a))for(let f=0,p=a.length;f!==p;++f){const d=a[f];if(isNaN(d)){st("KeyframeTrack: Value is not a valid number.",this,f,d),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),r=this.getValueSize(),a=this.getInterpolation()===cf,l=e.length-1;let c=1;for(let f=1;f<l;++f){let p=!1;const d=e[f],_=e[f+1];if(d!==_&&(f!==1||d!==e[0]))if(a)p=!0;else{const v=f*r,g=v-r,S=v+r;for(let E=0;E!==r;++E){const b=t[v+E];if(b!==t[g+E]||b!==t[S+E]){p=!0;break}}}if(p){if(f!==c){e[c]=e[f];const v=f*r,g=c*r;for(let S=0;S!==r;++S)t[g+S]=t[v+S]}++c}}if(l>0){e[c]=e[l];for(let f=l*r,p=c*r,d=0;d!==r;++d)t[p+d]=t[f+d];++c}return c!==e.length?(this.times=e.slice(0,c),this.values=t.slice(0,c*r)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),r=this.constructor,a=new r(this.name,e,t);return a.createInterpolant=this.createInterpolant,a}}bi.prototype.ValueTypeName="";bi.prototype.TimeBufferType=Float32Array;bi.prototype.ValueBufferType=Float32Array;bi.prototype.DefaultInterpolation=Dh;class ma extends bi{constructor(e,t,r){super(e,t,r)}}ma.prototype.ValueTypeName="bool";ma.prototype.ValueBufferType=Array;ma.prototype.DefaultInterpolation=fu;ma.prototype.InterpolantFactoryMethodLinear=void 0;ma.prototype.InterpolantFactoryMethodSmooth=void 0;class B_ extends bi{constructor(e,t,r,a){super(e,t,r,a)}}B_.prototype.ValueTypeName="color";class nd extends bi{constructor(e,t,r,a){super(e,t,r,a)}}nd.prototype.ValueTypeName="number";class Ry extends yo{constructor(e,t,r,a){super(e,t,r,a)}interpolate_(e,t,r,a){const l=this.resultBuffer,c=this.sampleValues,f=this.valueSize,p=(r-t)/(a-t);let d=e*f;for(let _=d+f;d!==_;d+=4)ur.slerpFlat(l,0,c,d-f,c,d,p);return l}}class id extends bi{constructor(e,t,r,a){super(e,t,r,a)}InterpolantFactoryMethodLinear(e){return new Ry(this.times,this.values,this.getValueSize(),e)}}id.prototype.ValueTypeName="quaternion";id.prototype.InterpolantFactoryMethodSmooth=void 0;class ga extends bi{constructor(e,t,r){super(e,t,r)}}ga.prototype.ValueTypeName="string";ga.prototype.ValueBufferType=Array;ga.prototype.DefaultInterpolation=fu;ga.prototype.InterpolantFactoryMethodLinear=void 0;ga.prototype.InterpolantFactoryMethodSmooth=void 0;class k_ extends bi{constructor(e,t,r,a){super(e,t,r,a)}}k_.prototype.ValueTypeName="vector";class w1{constructor(e="",t=-1,r=[],a=ux){this.name=e,this.tracks=r,this.duration=t,this.blendMode=a,this.uuid=Ai(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],r=e.tracks,a=1/(e.fps||1);for(let c=0,f=r.length;c!==f;++c)t.push(Py(r[c]).scale(a));const l=new this(e.name,e.duration,t,e.blendMode);return l.uuid=e.uuid,l.userData=JSON.parse(e.userData||"{}"),l}static toJSON(e){const t=[],r=e.tracks,a={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let l=0,c=r.length;l!==c;++l)t.push(bi.toJSON(r[l]));return a}static CreateFromMorphTargetSequence(e,t,r,a){const l=t.length,c=[];for(let f=0;f<l;f++){let p=[],d=[];p.push((f+l-1)%l,f,(f+1)%l),d.push(0,1,0);const _=My(p);p=Rg(p,1,_),d=Rg(d,1,_),!a&&p[0]===0&&(p.push(l),d.push(d[0])),c.push(new nd(".morphTargetInfluences["+t[f].name+"]",p,d).scale(1/r))}return new this(e,-1,c)}static findByName(e,t){let r=e;if(!Array.isArray(e)){const a=e;r=a.geometry&&a.geometry.animations||a.animations}for(let a=0;a<r.length;a++)if(r[a].name===t)return r[a];return null}static CreateClipsFromMorphTargetSequences(e,t,r){const a={},l=/^([\w-]*?)([\d]+)$/;for(let f=0,p=e.length;f<p;f++){const d=e[f],_=d.name.match(l);if(_&&_.length>1){const v=_[1];let g=a[v];g||(a[v]=g=[]),g.push(d)}}const c=[];for(const f in a)c.push(this.CreateFromMorphTargetSequence(f,a[f],t,r));return c}resetDuration(){const e=this.tracks;let t=0;for(let r=0,a=e.length;r!==a;++r){const l=this.tracks[r];t=Math.max(t,l.times[l.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let r=0;r<this.tracks.length;r++)e.push(this.tracks[r].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Cy(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return nd;case"vector":case"vector2":case"vector3":case"vector4":return k_;case"color":return B_;case"quaternion":return id;case"bool":case"boolean":return ma;case"string":return ga}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Py(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Cy(s.type);if(s.times===void 0){const t=[],r=[];Ey(s.keys,t,r,"value"),s.times=t,s.values=r}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const rr={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Cg(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Cg(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Cg(s){try{const e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Ly{constructor(e,t,r){const a=this;let l=!1,c=0,f=0,p;const d=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=r,this._abortController=null,this.itemStart=function(_){f++,l===!1&&a.onStart!==void 0&&a.onStart(_,c,f),l=!0},this.itemEnd=function(_){c++,a.onProgress!==void 0&&a.onProgress(_,c,f),c===f&&(l=!1,a.onLoad!==void 0&&a.onLoad())},this.itemError=function(_){a.onError!==void 0&&a.onError(_)},this.resolveURL=function(_){return _=_.normalize("NFC"),p?p(_):_},this.setURLModifier=function(_){return p=_,this},this.addHandler=function(_,v){return d.push(_,v),this},this.removeHandler=function(_){const v=d.indexOf(_);return v!==-1&&d.splice(v,2),this},this.getHandler=function(_){for(let v=0,g=d.length;v<g;v+=2){const S=d[v],E=d[v+1];if(S.global&&(S.lastIndex=0),S.test(_))return E}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Dy=new Ly;class So{constructor(e){this.manager=e!==void 0?e:Dy,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const r=this;return new Promise(function(a,l){r.load(e,a,t,l)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}So.DEFAULT_MATERIAL_NAME="__DEFAULT";const tr={};class Iy extends Error{constructor(e,t){super(e),this.response=t}}class A1 extends So{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,r,a){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const l=rr.get(`file:${e}`);if(l!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(l),this.manager.itemEnd(e)},0);return}if(tr[e]!==void 0){tr[e].push({onLoad:t,onProgress:r,onError:a});return}tr[e]=[],tr[e].push({onLoad:t,onProgress:r,onError:a});const c=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),f=this.mimeType,p=this.responseType;fetch(c).then(d=>{if(d.status===200||d.status===0){if(d.status===0&&Ze("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||d.body===void 0||d.body.getReader===void 0)return d;const _=tr[e],v=d.body.getReader(),g=d.headers.get("X-File-Size")||d.headers.get("Content-Length"),S=g?parseInt(g):0,E=S!==0;let b=0;const y=new ReadableStream({start(x){U();function U(){v.read().then(({done:F,value:R})=>{if(F)x.close();else{b+=R.byteLength;const I=new ProgressEvent("progress",{lengthComputable:E,loaded:b,total:S});for(let P=0,O=_.length;P<O;P++){const T=_[P];T.onProgress&&T.onProgress(I)}x.enqueue(R),U()}},F=>{x.error(F)})}}});return new Response(y)}else throw new Iy(`fetch for "${d.url}" responded with ${d.status}: ${d.statusText}`,d)}).then(d=>{switch(p){case"arraybuffer":return d.arrayBuffer();case"blob":return d.blob();case"document":return d.text().then(_=>new DOMParser().parseFromString(_,f));case"json":return d.json();default:if(f==="")return d.text();{const v=/charset="?([^;"\s]*)"?/i.exec(f),g=v&&v[1]?v[1].toLowerCase():void 0,S=new TextDecoder(g);return d.arrayBuffer().then(E=>S.decode(E))}}}).then(d=>{rr.add(`file:${e}`,d);const _=tr[e];delete tr[e];for(let v=0,g=_.length;v<g;v++){const S=_[v];S.onLoad&&S.onLoad(d)}}).catch(d=>{const _=tr[e];if(_===void 0)throw this.manager.itemError(e),d;delete tr[e];for(let v=0,g=_.length;v<g;v++){const S=_[v];S.onError&&S.onError(d)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ea=new WeakMap;class Ny extends So{constructor(e){super(e)}load(e,t,r,a){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const l=this,c=rr.get(`image:${e}`);if(c!==void 0){if(c.complete===!0)l.manager.itemStart(e),setTimeout(function(){t&&t(c),l.manager.itemEnd(e)},0);else{let v=ea.get(c);v===void 0&&(v=[],ea.set(c,v)),v.push({onLoad:t,onError:a})}return c}const f=vo("img");function p(){_(),t&&t(this);const v=ea.get(this)||[];for(let g=0;g<v.length;g++){const S=v[g];S.onLoad&&S.onLoad(this)}ea.delete(this),l.manager.itemEnd(e)}function d(v){_(),a&&a(v),rr.remove(`image:${e}`);const g=ea.get(this)||[];for(let S=0;S<g.length;S++){const E=g[S];E.onError&&E.onError(v)}ea.delete(this),l.manager.itemError(e),l.manager.itemEnd(e)}function _(){f.removeEventListener("load",p,!1),f.removeEventListener("error",d,!1)}return f.addEventListener("load",p,!1),f.addEventListener("error",d,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(f.crossOrigin=this.crossOrigin),rr.add(`image:${e}`,f),l.manager.itemStart(e),f.src=e,f}}class b1 extends So{constructor(e){super(e)}load(e,t,r,a){const l=new yn,c=new Ny(this.manager);return c.setCrossOrigin(this.crossOrigin),c.setPath(this.path),c.load(e,function(f){l.image=f,l.needsUpdate=!0,t!==void 0&&t(l)},r,a),l}}class Su extends tn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ht(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Ff=new _t,Pg=new q,Lg=new q;class rd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new it(512,512),this.mapType=jn,this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new td,this._frameExtents=new it(1,1),this._viewportCount=1,this._viewports=[new Ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;Pg.setFromMatrixPosition(e.matrixWorld),t.position.copy(Pg),Lg.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Lg),t.updateMatrixWorld(),Ff.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ff,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===_o||t.reversedDepth?r.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Ff)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const jl=new q,Ql=new ur,Ii=new q;class z_ extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=Fi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(jl,Ql,Ii),Ii.x===1&&Ii.y===1&&Ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jl,Ql,Ii.set(1,1,1)).invert()}updateWorldMatrix(e,t,r=!1){super.updateWorldMatrix(e,t,r),this.matrixWorld.decompose(jl,Ql,Ii),Ii.x===1&&Ii.y===1&&Ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jl,Ql,Ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Fr=new q,Dg=new it,Ig=new it;class Jn extends z_{constructor(e=50,t=1,r=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=a,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=fa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ho*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return fa*2*Math.atan(Math.tan(ho*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,r){Fr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fr.x,Fr.y).multiplyScalar(-e/Fr.z),Fr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),r.set(Fr.x,Fr.y).multiplyScalar(-e/Fr.z)}getViewSize(e,t){return this.getViewBounds(e,Dg,Ig),t.subVectors(Ig,Dg)}setViewOffset(e,t,r,a,l,c){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ho*.5*this.fov)/this.zoom,r=2*t,a=this.aspect*r,l=-.5*a;const c=this.view;if(this.view!==null&&this.view.enabled){const p=c.fullWidth,d=c.fullHeight;l+=c.offsetX*a/p,t-=c.offsetY*r/d,a*=c.width/p,r*=c.height/d}const f=this.filmOffset;f!==0&&(l+=e*f/this.getFilmWidth()),this.projectionMatrix.makePerspective(l,l+a,t,t-r,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Uy extends rd{constructor(){super(new Jn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,r=fa*2*e.angle*this.focus,a=this.mapSize.width/this.mapSize.height*this.aspect,l=e.distance||t.far;(r!==t.fov||a!==t.aspect||l!==t.far)&&(t.fov=r,t.aspect=a,t.far=l,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class R1 extends Su{constructor(e,t,r=0,a=Math.PI/3,l=0,c=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.distance=r,this.angle=a,this.penumbra=l,this.decay=c,this.map=null,this.shadow=new Uy}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class Fy extends rd{constructor(){super(new Jn(90,1,.5,500)),this.isPointLightShadow=!0}}class C1 extends Su{constructor(e,t,r=0,a=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=a,this.shadow=new Fy}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class sd extends z_{constructor(e=-1,t=1,r=1,a=-1,l=.1,c=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=a,this.near=l,this.far=c,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,a,l,c){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=a,this.view.width=l,this.view.height=c,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let l=r-e,c=r+e,f=a+t,p=a-t;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;l+=d*this.view.offsetX,c=l+d*this.view.width,f-=_*this.view.offsetY,p=f-_*this.view.height}this.projectionMatrix.makeOrthographic(l,c,f,p,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Oy extends rd{constructor(){super(new sd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class P1 extends Su{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new Oy}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class L1 extends Su{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class D1{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Of=new WeakMap;class I1 extends So{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ze("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ze("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,r,a){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const l=this,c=rr.get(`image-bitmap:${e}`);if(c!==void 0){if(l.manager.itemStart(e),c.then){c.then(d=>{Of.has(c)===!0?(a&&a(Of.get(c)),l.manager.itemError(e),l.manager.itemEnd(e)):(t&&t(d),l.manager.itemEnd(e))});return}setTimeout(function(){t&&t(c),l.manager.itemEnd(e)},0);return}const f={};f.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",f.headers=this.requestHeader,f.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const p=fetch(e,f).then(function(d){return d.blob()}).then(function(d){return createImageBitmap(d,Object.assign(l.options,{colorSpaceConversion:"none"}))}).then(function(d){rr.add(`image-bitmap:${e}`,d),t&&t(d),l.manager.itemEnd(e)}).catch(function(d){a&&a(d),Of.set(p,d),rr.remove(`image-bitmap:${e}`),l.manager.itemError(e),l.manager.itemEnd(e)});rr.add(`image-bitmap:${e}`,p),l.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const ta=-90,na=1;class By extends tn{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Jn(ta,na,e,t);a.layers=this.layers,this.add(a);const l=new Jn(ta,na,e,t);l.layers=this.layers,this.add(l);const c=new Jn(ta,na,e,t);c.layers=this.layers,this.add(c);const f=new Jn(ta,na,e,t);f.layers=this.layers,this.add(f);const p=new Jn(ta,na,e,t);p.layers=this.layers,this.add(p);const d=new Jn(ta,na,e,t);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,a,l,c,f,p]=t;for(const d of t)this.remove(d);if(e===Fi)r.up.set(0,1,0),r.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),l.up.set(0,0,-1),l.lookAt(0,1,0),c.up.set(0,0,1),c.lookAt(0,-1,0),f.up.set(0,1,0),f.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===_o)r.up.set(0,-1,0),r.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),l.up.set(0,0,1),l.lookAt(0,1,0),c.up.set(0,0,-1),c.lookAt(0,-1,0),f.up.set(0,-1,0),f.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const d of t)this.add(d),d.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[l,c,f,p,d,_]=this.children,v=e.getRenderTarget(),g=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const b=r.texture.generateMipmaps;r.texture.generateMipmaps=!1;let y=!1;e.isWebGLRenderer===!0?y=e.state.buffers.depth.getReversed():y=e.reversedDepthBuffer,e.setRenderTarget(r,0,a),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(r,1,a),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(r,2,a),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,f),e.setRenderTarget(r,3,a),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,p),e.setRenderTarget(r,4,a),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),r.texture.generateMipmaps=b,e.setRenderTarget(r,5,a),y&&e.autoClear===!1&&e.clearDepth(),e.render(t,_),e.setRenderTarget(v,g,S),e.xr.enabled=E,r.texture.needsPMREMUpdate=!0}}class ky extends Jn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const ad="\\[\\]\\.:\\/",zy=new RegExp("["+ad+"]","g"),od="[^"+ad+"]",Vy="[^"+ad.replace("\\.","")+"]",Hy=/((?:WC+[\/:])*)/.source.replace("WC",od),Gy=/(WCOD+)?/.source.replace("WCOD",Vy),Wy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",od),Xy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",od),Yy=new RegExp("^"+Hy+Gy+Wy+Xy+"$"),qy=["material","materials","bones","map"];class Ky{constructor(e,t,r){const a=r||Nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,a)}getValue(e,t){this.bind();const r=this._targetGroup.nCachedObjects_,a=this._bindings[r];a!==void 0&&a.getValue(e,t)}setValue(e,t){const r=this._bindings;for(let a=this._targetGroup.nCachedObjects_,l=r.length;a!==l;++a)r[a].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,r=e.length;t!==r;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,r=e.length;t!==r;++t)e[t].unbind()}}class Nt{constructor(e,t,r){this.path=t,this.parsedPath=r||Nt.parseTrackName(t),this.node=Nt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,r){return e&&e.isAnimationObjectGroup?new Nt.Composite(e,t,r):new Nt(e,t,r)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(zy,"")}static parseTrackName(e){const t=Yy.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);const r={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},a=r.nodeName&&r.nodeName.lastIndexOf(".");if(a!==void 0&&a!==-1){const l=r.nodeName.substring(a+1);qy.indexOf(l)!==-1&&(r.nodeName=r.nodeName.substring(0,a),r.objectName=l)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return r}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const r=e.skeleton.getBoneByName(t);if(r!==void 0)return r}if(e.children){const r=function(l){for(let c=0;c<l.length;c++){const f=l[c];if(f.name===t||f.uuid===t)return f;const p=r(f.children);if(p)return p}return null},a=r(e.children);if(a)return a}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const r=this.resolvedProperty;for(let a=0,l=r.length;a!==l;++a)e[t++]=r[a]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const r=this.resolvedProperty;for(let a=0,l=r.length;a!==l;++a)r[a]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const r=this.resolvedProperty;for(let a=0,l=r.length;a!==l;++a)r[a]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const r=this.resolvedProperty;for(let a=0,l=r.length;a!==l;++a)r[a]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,r=t.objectName,a=t.propertyName;let l=t.propertyIndex;if(e||(e=Nt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ze("PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let d=t.objectIndex;switch(r){case"materials":if(!e.material){st("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){st("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){st("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let _=0;_<e.length;_++)if(e[_].name===d){d=_;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){st("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){st("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[r]===void 0){st("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[r]}if(d!==void 0){if(e[d]===void 0){st("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[d]}}const c=e[a];if(c===void 0){const d=t.nodeName;st("PropertyBinding: Trying to update property for track: "+d+"."+a+" but it wasn't found.",e);return}let f=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?f=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(f=this.Versioning.MatrixWorldNeedsUpdate);let p=this.BindingType.Direct;if(l!==void 0){if(a==="morphTargetInfluences"){if(!e.geometry){st("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){st("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[l]!==void 0&&(l=e.morphTargetDictionary[l])}p=this.BindingType.ArrayElement,this.resolvedProperty=c,this.propertyIndex=l}else c.fromArray!==void 0&&c.toArray!==void 0?(p=this.BindingType.HasFromToArray,this.resolvedProperty=c):Array.isArray(c)?(p=this.BindingType.EntireArray,this.resolvedProperty=c):this.propertyName=a;this.getValue=this.GetterByBindingType[p],this.setValue=this.SetterByBindingTypeAndVersioning[p][f]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Nt.Composite=Ky;Nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Nt.prototype.GetterByBindingType=[Nt.prototype._getValue_direct,Nt.prototype._getValue_array,Nt.prototype._getValue_arrayElement,Nt.prototype._getValue_toArray];Nt.prototype.SetterByBindingTypeAndVersioning=[[Nt.prototype._setValue_direct,Nt.prototype._setValue_direct_setNeedsUpdate,Nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_array,Nt.prototype._setValue_array_setNeedsUpdate,Nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_arrayElement,Nt.prototype._setValue_arrayElement_setNeedsUpdate,Nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_fromArray,Nt.prototype._setValue_fromArray_setNeedsUpdate,Nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];const Ng=new _t;class N1{constructor(e,t,r=0,a=1/0){this.ray=new pa(e,t),this.near=r,this.far=a,this.camera=null,this.layers=new Qh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):st("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Ng.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ng),this}intersectObject(e,t=!0,r=[]){return Uh(e,this,r,t),r.sort(Ug),r}intersectObjects(e,t=!0,r=[]){for(let a=0,l=e.length;a<l;a++)Uh(e[a],this,r,t);return r.sort(Ug),r}}function Ug(s,e){return s.distance-e.distance}function Uh(s,e,t,r){let a=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(a=!1),a===!0&&r===!0){const l=s.children;for(let c=0,f=l.length;c<f;c++)Uh(l[c],e,t,!0)}}class Fg{constructor(e=1,t=0,r=0){this.radius=e,this.phi=t,this.theta=r}set(e,t,r){return this.radius=e,this.phi=t,this.theta=r,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=pt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,r){return this.radius=Math.sqrt(e*e+t*t+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,r),this.phi=Math.acos(pt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const dd=class dd{constructor(e,t,r,a){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,r,a)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let r=0;r<4;r++)this.elements[r]=e[r+t];return this}set(e,t,r,a){const l=this.elements;return l[0]=e,l[2]=t,l[1]=r,l[3]=a,this}};dd.prototype.isMatrix2=!0;let Og=dd;const Bg=new it;class U1{constructor(e=new it(1/0,1/0),t=new it(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=Bg.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bg).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}class $y extends Vr{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){Ze("Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Zy(s,e){const t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function Jy(s,e){const t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function jy(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function Fh(s,e,t,r){const a=Qy(r);switch(t){case E_:return s*e;case Xh:return s*e/a.components*a.byteLength;case Yh:return s*e/a.components*a.byteLength;case _s:return s*e*2/a.components*a.byteLength;case qh:return s*e*2/a.components*a.byteLength;case T_:return s*e*3/a.components*a.byteLength;case ui:return s*e*4/a.components*a.byteLength;case Kh:return s*e*4/a.components*a.byteLength;case ru:case su:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case au:case ou:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ih:case sh:return Math.max(s,16)*Math.max(e,8)/4;case nh:case rh:return Math.max(s,8)*Math.max(e,8)/2;case ah:case oh:case uh:case ch:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case lh:case uu:case fh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case hh:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case dh:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case ph:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case mh:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case gh:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case _h:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case vh:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case xh:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case yh:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Sh:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Mh:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Eh:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Th:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case wh:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Ah:case bh:case Rh:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Ch:case Ph:return Math.ceil(s/4)*Math.ceil(e/4)*8;case cu:case Lh:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Qy(s){switch(s){case jn:case x_:return{byteLength:1,components:1};case mo:case y_:case or:return{byteLength:2,components:1};case Gh:case Wh:return{byteLength:2,components:4};case ki:case Hh:case li:return{byteLength:4,components:1};case S_:case M_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}class F1{static contain(e,t){return Zy(e,t)}static cover(e,t){return Jy(e,t)}static fill(e){return jy(e)}static getByteLength(e,t,r,a){return Fh(e,t,r,a)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zh}}));typeof window<"u"&&(window.__THREE__?Ze("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function V_(){let s=null,e=!1,t=null,r=null;function a(l,c){t(l,c),r=s.requestAnimationFrame(a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(r=s.requestAnimationFrame(a),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(l){t=l},setContext:function(l){s=l}}}function eS(s){const e=new WeakMap;function t(f,p){const d=f.array,_=f.usage,v=d.byteLength,g=s.createBuffer();s.bindBuffer(p,g),s.bufferData(p,d,_),f.onUploadCallback();let S;if(d instanceof Float32Array)S=s.FLOAT;else if(typeof Float16Array<"u"&&d instanceof Float16Array)S=s.HALF_FLOAT;else if(d instanceof Uint16Array)f.isFloat16BufferAttribute?S=s.HALF_FLOAT:S=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)S=s.SHORT;else if(d instanceof Uint32Array)S=s.UNSIGNED_INT;else if(d instanceof Int32Array)S=s.INT;else if(d instanceof Int8Array)S=s.BYTE;else if(d instanceof Uint8Array)S=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)S=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:S,bytesPerElement:d.BYTES_PER_ELEMENT,version:f.version,size:v}}function r(f,p,d){const _=p.array,v=p.updateRanges;if(s.bindBuffer(d,f),v.length===0)s.bufferSubData(d,0,_);else{v.sort((S,E)=>S.start-E.start);let g=0;for(let S=1;S<v.length;S++){const E=v[g],b=v[S];b.start<=E.start+E.count+1?E.count=Math.max(E.count,b.start+b.count-E.start):(++g,v[g]=b)}v.length=g+1;for(let S=0,E=v.length;S<E;S++){const b=v[S];s.bufferSubData(d,b.start*_.BYTES_PER_ELEMENT,_,b.start,b.count)}p.clearUpdateRanges()}p.onUploadCallback()}function a(f){return f.isInterleavedBufferAttribute&&(f=f.data),e.get(f)}function l(f){f.isInterleavedBufferAttribute&&(f=f.data);const p=e.get(f);p&&(s.deleteBuffer(p.buffer),e.delete(f))}function c(f,p){if(f.isInterleavedBufferAttribute&&(f=f.data),f.isGLBufferAttribute){const _=e.get(f);(!_||_.version<f.version)&&e.set(f,{buffer:f.buffer,type:f.type,bytesPerElement:f.elementSize,version:f.version});return}const d=e.get(f);if(d===void 0)e.set(f,t(f,p));else if(d.version<f.version){if(d.size!==f.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,f,p),d.version=f.version}}return{get:a,remove:l,update:c}}var tS=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,nS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,iS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,aS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,oS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,lS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uS=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,cS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_S=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,xS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,SS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,MS=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ES=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,TS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wS=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,AS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,bS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,RS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,CS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,PS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,LS="gl_FragColor = linearToOutputTexel( gl_FragColor );",DS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,IS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,NS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,US=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,FS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,OS=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,BS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zS=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,VS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,HS=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,GS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,WS=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,XS=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,YS=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,qS=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,KS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$S=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ZS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,JS=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jS=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,QS=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,eM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,tM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nM=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iM=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,rM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sM=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oM=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,cM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_M=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,vM=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,yM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,SM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,MM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,EM=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,TM=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,wM=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,AM=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bM=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,RM=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,CM=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,PM=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,LM=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,DM=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,IM=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,NM=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,UM=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,FM=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,OM=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,BM=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,kM=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zM=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,VM=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,HM=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,GM=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,WM=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,XM=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,YM=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qM=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,KM=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,$M=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ZM=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,JM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,QM=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,eE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const tE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,lE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,uE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,cE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,fE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_E=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vE=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,yE=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,SE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,ME=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,EE=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wE=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,AE=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bE=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,RE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,CE=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,PE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,LE=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,DE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,IE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,NE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ft={alphahash_fragment:tS,alphahash_pars_fragment:nS,alphamap_fragment:iS,alphamap_pars_fragment:rS,alphatest_fragment:sS,alphatest_pars_fragment:aS,aomap_fragment:oS,aomap_pars_fragment:lS,batching_pars_vertex:uS,batching_vertex:cS,begin_vertex:fS,beginnormal_vertex:hS,bsdfs:dS,iridescence_fragment:pS,bumpmap_pars_fragment:mS,clipping_planes_fragment:gS,clipping_planes_pars_fragment:_S,clipping_planes_pars_vertex:vS,clipping_planes_vertex:xS,color_fragment:yS,color_pars_fragment:SS,color_pars_vertex:MS,color_vertex:ES,common:TS,cube_uv_reflection_fragment:wS,defaultnormal_vertex:AS,displacementmap_pars_vertex:bS,displacementmap_vertex:RS,emissivemap_fragment:CS,emissivemap_pars_fragment:PS,colorspace_fragment:LS,colorspace_pars_fragment:DS,envmap_fragment:IS,envmap_common_pars_fragment:NS,envmap_pars_fragment:US,envmap_pars_vertex:FS,envmap_physical_pars_fragment:qS,envmap_vertex:OS,fog_vertex:BS,fog_pars_vertex:kS,fog_fragment:zS,fog_pars_fragment:VS,gradientmap_pars_fragment:HS,lightmap_pars_fragment:GS,lights_lambert_fragment:WS,lights_lambert_pars_fragment:XS,lights_pars_begin:YS,lights_toon_fragment:KS,lights_toon_pars_fragment:$S,lights_phong_fragment:ZS,lights_phong_pars_fragment:JS,lights_physical_fragment:jS,lights_physical_pars_fragment:QS,lights_fragment_begin:eM,lights_fragment_maps:tM,lights_fragment_end:nM,lightprobes_pars_fragment:iM,logdepthbuf_fragment:rM,logdepthbuf_pars_fragment:sM,logdepthbuf_pars_vertex:aM,logdepthbuf_vertex:oM,map_fragment:lM,map_pars_fragment:uM,map_particle_fragment:cM,map_particle_pars_fragment:fM,metalnessmap_fragment:hM,metalnessmap_pars_fragment:dM,morphinstance_vertex:pM,morphcolor_vertex:mM,morphnormal_vertex:gM,morphtarget_pars_vertex:_M,morphtarget_vertex:vM,normal_fragment_begin:xM,normal_fragment_maps:yM,normal_pars_fragment:SM,normal_pars_vertex:MM,normal_vertex:EM,normalmap_pars_fragment:TM,clearcoat_normal_fragment_begin:wM,clearcoat_normal_fragment_maps:AM,clearcoat_pars_fragment:bM,iridescence_pars_fragment:RM,opaque_fragment:CM,packing:PM,premultiplied_alpha_fragment:LM,project_vertex:DM,dithering_fragment:IM,dithering_pars_fragment:NM,roughnessmap_fragment:UM,roughnessmap_pars_fragment:FM,shadowmap_pars_fragment:OM,shadowmap_pars_vertex:BM,shadowmap_vertex:kM,shadowmask_pars_fragment:zM,skinbase_vertex:VM,skinning_pars_vertex:HM,skinning_vertex:GM,skinnormal_vertex:WM,specularmap_fragment:XM,specularmap_pars_fragment:YM,tonemapping_fragment:qM,tonemapping_pars_fragment:KM,transmission_fragment:$M,transmission_pars_fragment:ZM,uv_pars_fragment:JM,uv_pars_vertex:jM,uv_vertex:QM,worldpos_vertex:eE,background_vert:tE,background_frag:nE,backgroundCube_vert:iE,backgroundCube_frag:rE,cube_vert:sE,cube_frag:aE,depth_vert:oE,depth_frag:lE,distance_vert:uE,distance_frag:cE,equirect_vert:fE,equirect_frag:hE,linedashed_vert:dE,linedashed_frag:pE,meshbasic_vert:mE,meshbasic_frag:gE,meshlambert_vert:_E,meshlambert_frag:vE,meshmatcap_vert:xE,meshmatcap_frag:yE,meshnormal_vert:SE,meshnormal_frag:ME,meshphong_vert:EE,meshphong_frag:TE,meshphysical_vert:wE,meshphysical_frag:AE,meshtoon_vert:bE,meshtoon_frag:RE,points_vert:CE,points_frag:PE,shadow_vert:LE,shadow_frag:DE,sprite_vert:IE,sprite_frag:NE},De={common:{diffuse:{value:new ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ut}},envmap:{envMap:{value:null},envMapRotation:{value:new ut},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ut}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ut}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ut},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ut},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ut},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ut}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ut}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ut}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new q},probesMax:{value:new q},probesResolution:{value:new q}},points:{diffuse:{value:new ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0},uvTransform:{value:new ut}},sprite:{diffuse:{value:new ht(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ut},alphaMap:{value:null},alphaMapTransform:{value:new ut},alphaTest:{value:0}}},Ui={basic:{uniforms:In([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.fog]),vertexShader:ft.meshbasic_vert,fragmentShader:ft.meshbasic_frag},lambert:{uniforms:In([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new ht(0)},envMapIntensity:{value:1}}]),vertexShader:ft.meshlambert_vert,fragmentShader:ft.meshlambert_frag},phong:{uniforms:In([De.common,De.specularmap,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.fog,De.lights,{emissive:{value:new ht(0)},specular:{value:new ht(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ft.meshphong_vert,fragmentShader:ft.meshphong_frag},standard:{uniforms:In([De.common,De.envmap,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.roughnessmap,De.metalnessmap,De.fog,De.lights,{emissive:{value:new ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag},toon:{uniforms:In([De.common,De.aomap,De.lightmap,De.emissivemap,De.bumpmap,De.normalmap,De.displacementmap,De.gradientmap,De.fog,De.lights,{emissive:{value:new ht(0)}}]),vertexShader:ft.meshtoon_vert,fragmentShader:ft.meshtoon_frag},matcap:{uniforms:In([De.common,De.bumpmap,De.normalmap,De.displacementmap,De.fog,{matcap:{value:null}}]),vertexShader:ft.meshmatcap_vert,fragmentShader:ft.meshmatcap_frag},points:{uniforms:In([De.points,De.fog]),vertexShader:ft.points_vert,fragmentShader:ft.points_frag},dashed:{uniforms:In([De.common,De.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ft.linedashed_vert,fragmentShader:ft.linedashed_frag},depth:{uniforms:In([De.common,De.displacementmap]),vertexShader:ft.depth_vert,fragmentShader:ft.depth_frag},normal:{uniforms:In([De.common,De.bumpmap,De.normalmap,De.displacementmap,{opacity:{value:1}}]),vertexShader:ft.meshnormal_vert,fragmentShader:ft.meshnormal_frag},sprite:{uniforms:In([De.sprite,De.fog]),vertexShader:ft.sprite_vert,fragmentShader:ft.sprite_frag},background:{uniforms:{uvTransform:{value:new ut},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ft.background_vert,fragmentShader:ft.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ut}},vertexShader:ft.backgroundCube_vert,fragmentShader:ft.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ft.cube_vert,fragmentShader:ft.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ft.equirect_vert,fragmentShader:ft.equirect_frag},distance:{uniforms:In([De.common,De.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ft.distance_vert,fragmentShader:ft.distance_frag},shadow:{uniforms:In([De.lights,De.fog,{color:{value:new ht(0)},opacity:{value:1}}]),vertexShader:ft.shadow_vert,fragmentShader:ft.shadow_frag}};Ui.physical={uniforms:In([Ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ut},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ut},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ut},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ut},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ut},sheen:{value:0},sheenColor:{value:new ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ut},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ut},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ut},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ut},attenuationDistance:{value:0},attenuationColor:{value:new ht(0)},specularColor:{value:new ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ut},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ut},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ut}}]),vertexShader:ft.meshphysical_vert,fragmentShader:ft.meshphysical_frag};const eu={r:0,b:0,g:0},UE=new _t,H_=new ut;H_.set(-1,0,0,0,1,0,0,0,1);function FE(s,e,t,r,a,l){const c=new ht(0);let f=a===!0?0:1,p,d,_=null,v=0,g=null;function S(U){let F=U.isScene===!0?U.background:null;if(F&&F.isTexture){const R=U.backgroundBlurriness>0;F=e.get(F,R)}return F}function E(U){let F=!1;const R=S(U);R===null?y(c,f):R&&R.isColor&&(y(R,1),F=!0);const I=s.xr.getEnvironmentBlendMode();I==="additive"?t.buffers.color.setClear(0,0,0,1,l):I==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,l),(s.autoClear||F)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function b(U,F){const R=S(F);R&&(R.isCubeTexture||R.mapping===xu)?(d===void 0&&(d=new fi(new xo(1,1,1),new zi({name:"BackgroundCubeMaterial",uniforms:da(Ui.backgroundCube.uniforms),vertexShader:Ui.backgroundCube.vertexShader,fragmentShader:Ui.backgroundCube.fragmentShader,side:Gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(I,P,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(d)),d.material.uniforms.envMap.value=R,d.material.uniforms.backgroundBlurriness.value=F.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=F.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(UE.makeRotationFromEuler(F.backgroundRotation)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&d.material.uniforms.backgroundRotation.value.premultiply(H_),d.material.toneMapped=xt.getTransfer(R.colorSpace)!==Lt,(_!==R||v!==R.version||g!==s.toneMapping)&&(d.material.needsUpdate=!0,_=R,v=R.version,g=s.toneMapping),d.layers.enableAll(),U.unshift(d,d.geometry,d.material,0,0,null)):R&&R.isTexture&&(p===void 0&&(p=new fi(new yu(2,2),new zi({name:"BackgroundMaterial",uniforms:da(Ui.background.uniforms),vertexShader:Ui.background.vertexShader,fragmentShader:Ui.background.fragmentShader,side:zr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(p)),p.material.uniforms.t2D.value=R,p.material.uniforms.backgroundIntensity.value=F.backgroundIntensity,p.material.toneMapped=xt.getTransfer(R.colorSpace)!==Lt,R.matrixAutoUpdate===!0&&R.updateMatrix(),p.material.uniforms.uvTransform.value.copy(R.matrix),(_!==R||v!==R.version||g!==s.toneMapping)&&(p.material.needsUpdate=!0,_=R,v=R.version,g=s.toneMapping),p.layers.enableAll(),U.unshift(p,p.geometry,p.material,0,0,null))}function y(U,F){U.getRGB(eu,O_(s)),t.buffers.color.setClear(eu.r,eu.g,eu.b,F,l)}function x(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return c},setClearColor:function(U,F=1){c.set(U),f=F,y(c,f)},getClearAlpha:function(){return f},setClearAlpha:function(U){f=U,y(c,f)},render:E,addToRenderList:b,dispose:x}}function OE(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),r={},a=g(null);let l=a,c=!1;function f(z,K,ce,he,J){let oe=!1;const ee=v(z,he,ce,K);l!==ee&&(l=ee,d(l.object)),oe=S(z,he,ce,J),oe&&E(z,he,ce,J),J!==null&&e.update(J,s.ELEMENT_ARRAY_BUFFER),(oe||c)&&(c=!1,R(z,K,ce,he),J!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(J).buffer))}function p(){return s.createVertexArray()}function d(z){return s.bindVertexArray(z)}function _(z){return s.deleteVertexArray(z)}function v(z,K,ce,he){const J=he.wireframe===!0;let oe=r[K.id];oe===void 0&&(oe={},r[K.id]=oe);const ee=z.isInstancedMesh===!0?z.id:0;let X=oe[ee];X===void 0&&(X={},oe[ee]=X);let ae=X[ce.id];ae===void 0&&(ae={},X[ce.id]=ae);let le=ae[J];return le===void 0&&(le=g(p()),ae[J]=le),le}function g(z){const K=[],ce=[],he=[];for(let J=0;J<t;J++)K[J]=0,ce[J]=0,he[J]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:K,enabledAttributes:ce,attributeDivisors:he,object:z,attributes:{},index:null}}function S(z,K,ce,he){const J=l.attributes,oe=K.attributes;let ee=0;const X=ce.getAttributes();for(const ae in X)if(X[ae].location>=0){const N=J[ae];let $=oe[ae];if($===void 0&&(ae==="instanceMatrix"&&z.instanceMatrix&&($=z.instanceMatrix),ae==="instanceColor"&&z.instanceColor&&($=z.instanceColor)),N===void 0||N.attribute!==$||$&&N.data!==$.data)return!0;ee++}return l.attributesNum!==ee||l.index!==he}function E(z,K,ce,he){const J={},oe=K.attributes;let ee=0;const X=ce.getAttributes();for(const ae in X)if(X[ae].location>=0){let N=oe[ae];N===void 0&&(ae==="instanceMatrix"&&z.instanceMatrix&&(N=z.instanceMatrix),ae==="instanceColor"&&z.instanceColor&&(N=z.instanceColor));const $={};$.attribute=N,N&&N.data&&($.data=N.data),J[ae]=$,ee++}l.attributes=J,l.attributesNum=ee,l.index=he}function b(){const z=l.newAttributes;for(let K=0,ce=z.length;K<ce;K++)z[K]=0}function y(z){x(z,0)}function x(z,K){const ce=l.newAttributes,he=l.enabledAttributes,J=l.attributeDivisors;ce[z]=1,he[z]===0&&(s.enableVertexAttribArray(z),he[z]=1),J[z]!==K&&(s.vertexAttribDivisor(z,K),J[z]=K)}function U(){const z=l.newAttributes,K=l.enabledAttributes;for(let ce=0,he=K.length;ce<he;ce++)K[ce]!==z[ce]&&(s.disableVertexAttribArray(ce),K[ce]=0)}function F(z,K,ce,he,J,oe,ee){ee===!0?s.vertexAttribIPointer(z,K,ce,J,oe):s.vertexAttribPointer(z,K,ce,he,J,oe)}function R(z,K,ce,he){b();const J=he.attributes,oe=ce.getAttributes(),ee=K.defaultAttributeValues;for(const X in oe){const ae=oe[X];if(ae.location>=0){let le=J[X];if(le===void 0&&(X==="instanceMatrix"&&z.instanceMatrix&&(le=z.instanceMatrix),X==="instanceColor"&&z.instanceColor&&(le=z.instanceColor)),le!==void 0){const N=le.normalized,$=le.itemSize,Ie=e.get(le);if(Ie===void 0)continue;const qe=Ie.buffer,ke=Ie.type,ie=Ie.bytesPerElement,_e=ke===s.INT||ke===s.UNSIGNED_INT||le.gpuType===Hh;if(le.isInterleavedBufferAttribute){const pe=le.data,Ne=pe.stride,je=le.offset;if(pe.isInstancedInterleavedBuffer){for(let Qe=0;Qe<ae.locationSize;Qe++)x(ae.location+Qe,pe.meshPerAttribute);z.isInstancedMesh!==!0&&he._maxInstanceCount===void 0&&(he._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Qe=0;Qe<ae.locationSize;Qe++)y(ae.location+Qe);s.bindBuffer(s.ARRAY_BUFFER,qe);for(let Qe=0;Qe<ae.locationSize;Qe++)F(ae.location+Qe,$/ae.locationSize,ke,N,Ne*ie,(je+$/ae.locationSize*Qe)*ie,_e)}else{if(le.isInstancedBufferAttribute){for(let pe=0;pe<ae.locationSize;pe++)x(ae.location+pe,le.meshPerAttribute);z.isInstancedMesh!==!0&&he._maxInstanceCount===void 0&&(he._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let pe=0;pe<ae.locationSize;pe++)y(ae.location+pe);s.bindBuffer(s.ARRAY_BUFFER,qe);for(let pe=0;pe<ae.locationSize;pe++)F(ae.location+pe,$/ae.locationSize,ke,N,$*ie,$/ae.locationSize*pe*ie,_e)}}else if(ee!==void 0){const N=ee[X];if(N!==void 0)switch(N.length){case 2:s.vertexAttrib2fv(ae.location,N);break;case 3:s.vertexAttrib3fv(ae.location,N);break;case 4:s.vertexAttrib4fv(ae.location,N);break;default:s.vertexAttrib1fv(ae.location,N)}}}}U()}function I(){L();for(const z in r){const K=r[z];for(const ce in K){const he=K[ce];for(const J in he){const oe=he[J];for(const ee in oe)_(oe[ee].object),delete oe[ee];delete he[J]}}delete r[z]}}function P(z){if(r[z.id]===void 0)return;const K=r[z.id];for(const ce in K){const he=K[ce];for(const J in he){const oe=he[J];for(const ee in oe)_(oe[ee].object),delete oe[ee];delete he[J]}}delete r[z.id]}function O(z){for(const K in r){const ce=r[K];for(const he in ce){const J=ce[he];if(J[z.id]===void 0)continue;const oe=J[z.id];for(const ee in oe)_(oe[ee].object),delete oe[ee];delete J[z.id]}}}function T(z){for(const K in r){const ce=r[K],he=z.isInstancedMesh===!0?z.id:0,J=ce[he];if(J!==void 0){for(const oe in J){const ee=J[oe];for(const X in ee)_(ee[X].object),delete ee[X];delete J[oe]}delete ce[he],Object.keys(ce).length===0&&delete r[K]}}}function L(){V(),c=!0,l!==a&&(l=a,d(l.object))}function V(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:f,reset:L,resetDefaultState:V,dispose:I,releaseStatesOfGeometry:P,releaseStatesOfObject:T,releaseStatesOfProgram:O,initAttributes:b,enableAttribute:y,disableUnusedAttributes:U}}function BE(s,e,t){let r;function a(p){r=p}function l(p,d){s.drawArrays(r,p,d),t.update(d,r,1)}function c(p,d,_){_!==0&&(s.drawArraysInstanced(r,p,d,_),t.update(d,r,_))}function f(p,d,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(r,p,0,d,0,_);let g=0;for(let S=0;S<_;S++)g+=d[S];t.update(g,r,1)}this.setMode=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function kE(s,e,t,r){let a;function l(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");a=s.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function c(O){return!(O!==ui&&r.convert(O)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function f(O){const T=O===or&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==jn&&r.convert(O)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&O!==li&&!T)}function p(O){if(O==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let d=t.precision!==void 0?t.precision:"highp";const _=p(d);_!==d&&(Ze("WebGLRenderer:",d,"not supported, using",_,"instead."),d=_);const v=t.logarithmicDepthBuffer===!0,g=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&g===!1&&Ze("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const S=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),E=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_TEXTURE_SIZE),y=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),x=s.getParameter(s.MAX_VERTEX_ATTRIBS),U=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),F=s.getParameter(s.MAX_VARYING_VECTORS),R=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),I=s.getParameter(s.MAX_SAMPLES),P=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:l,getMaxPrecision:p,textureFormatReadable:c,textureTypeReadable:f,precision:d,logarithmicDepthBuffer:v,reversedDepthBuffer:g,maxTextures:S,maxVertexTextures:E,maxTextureSize:b,maxCubemapSize:y,maxAttributes:x,maxVertexUniforms:U,maxVaryings:F,maxFragmentUniforms:R,maxSamples:I,samples:P}}function zE(s){const e=this;let t=null,r=0,a=!1,l=!1;const c=new Or,f=new ut,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(v,g){const S=v.length!==0||g||r!==0||a;return a=g,r=v.length,S},this.beginShadows=function(){l=!0,_(null)},this.endShadows=function(){l=!1},this.setGlobalState=function(v,g){t=_(v,g,0)},this.setState=function(v,g,S){const E=v.clippingPlanes,b=v.clipIntersection,y=v.clipShadows,x=s.get(v);if(!a||E===null||E.length===0||l&&!y)l?_(null):d();else{const U=l?0:r,F=U*4;let R=x.clippingState||null;p.value=R,R=_(E,g,F,S);for(let I=0;I!==F;++I)R[I]=t[I];x.clippingState=R,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=U}};function d(){p.value!==t&&(p.value=t,p.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function _(v,g,S,E){const b=v!==null?v.length:0;let y=null;if(b!==0){if(y=p.value,E!==!0||y===null){const x=S+b*4,U=g.matrixWorldInverse;f.getNormalMatrix(U),(y===null||y.length<x)&&(y=new Float32Array(x));for(let F=0,R=S;F!==b;++F,R+=4)c.copy(v[F]).applyMatrix4(U,f),c.normal.toArray(y,R),y[R+3]=c.constant}p.value=y,p.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,y}}const kr=4,kg=[.125,.215,.35,.446,.526,.582],ds=20,VE=256,lo=new sd,zg=new ht;let Bf=null,kf=0,zf=0,Vf=!1;const HE=new q;class Vg{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,r=.1,a=100,l={}){const{size:c=256,position:f=HE}=l;Bf=this._renderer.getRenderTarget(),kf=this._renderer.getActiveCubeFace(),zf=this._renderer.getActiveMipmapLevel(),Vf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(c);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(e,r,a,p,f),t>0&&this._blur(p,0,0,t),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wg(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Bf,kf,zf),this._renderer.xr.enabled=Vf,e.scissorTest=!1,ia(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===gs||e.mapping===ca?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bf=this._renderer.getRenderTarget(),kf=this._renderer.getActiveCubeFace(),zf=this._renderer.getActiveMipmapLevel(),Vf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:or,format:ui,colorSpace:du,depthBuffer:!1},a=Hg(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hg(e,t,r);const{_lodMax:l}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=GE(l)),this._blurMaterial=XE(l,e,t),this._ggxMaterial=WE(l,e,t)}return a}_compileMaterial(e){const t=new fi(new hi,e);this._renderer.compile(t,lo)}_sceneToCubeUV(e,t,r,a,l){const p=new Jn(90,1,t,r),d=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],v=this._renderer,g=v.autoClear,S=v.toneMapping;v.getClearColor(zg),v.toneMapping=Oi,v.autoClear=!1,v.state.buffers.depth.getReversed()&&(v.setRenderTarget(a),v.clearDepth(),v.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new fi(new xo,new L_({name:"PMREM.Background",side:Gn,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,y=b.material;let x=!1;const U=e.background;U?U.isColor&&(y.color.copy(U),e.background=null,x=!0):(y.color.copy(zg),x=!0);for(let F=0;F<6;F++){const R=F%3;R===0?(p.up.set(0,d[F],0),p.position.set(l.x,l.y,l.z),p.lookAt(l.x+_[F],l.y,l.z)):R===1?(p.up.set(0,0,d[F]),p.position.set(l.x,l.y,l.z),p.lookAt(l.x,l.y+_[F],l.z)):(p.up.set(0,d[F],0),p.position.set(l.x,l.y,l.z),p.lookAt(l.x,l.y,l.z+_[F]));const I=this._cubeSize;ia(a,R*I,F>2?I:0,I,I),v.setRenderTarget(a),x&&v.render(b,p),v.render(e,p)}v.toneMapping=S,v.autoClear=g,e.background=U}_textureToCubeUV(e,t){const r=this._renderer,a=e.mapping===gs||e.mapping===ca;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wg()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gg());const l=a?this._cubemapMaterial:this._equirectMaterial,c=this._lodMeshes[0];c.material=l;const f=l.uniforms;f.envMap.value=e;const p=this._cubeSize;ia(t,0,0,3*p,2*p),r.setRenderTarget(t),r.render(c,lo)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;const a=this._lodMeshes.length;for(let l=1;l<a;l++)this._applyGGXFilter(e,l-1,l);t.autoClear=r}_applyGGXFilter(e,t,r){const a=this._renderer,l=this._pingPongRenderTarget,c=this._ggxMaterial,f=this._lodMeshes[r];f.material=c;const p=c.uniforms,d=r/(this._lodMeshes.length-1),_=t/(this._lodMeshes.length-1),v=Math.sqrt(d*d-_*_),g=0+d*1.25,S=v*g,{_lodMax:E}=this,b=this._sizeLods[r],y=3*b*(r>E-kr?r-E+kr:0),x=4*(this._cubeSize-b);p.envMap.value=e.texture,p.roughness.value=S,p.mipInt.value=E-t,ia(l,y,x,3*b,2*b),a.setRenderTarget(l),a.render(f,lo),p.envMap.value=l.texture,p.roughness.value=0,p.mipInt.value=E-r,ia(e,y,x,3*b,2*b),a.setRenderTarget(e),a.render(f,lo)}_blur(e,t,r,a,l){const c=this._pingPongRenderTarget;this._halfBlur(e,c,t,r,a,"latitudinal",l),this._halfBlur(c,e,r,r,a,"longitudinal",l)}_halfBlur(e,t,r,a,l,c,f){const p=this._renderer,d=this._blurMaterial;c!=="latitudinal"&&c!=="longitudinal"&&st("blur direction must be either latitudinal or longitudinal!");const _=3,v=this._lodMeshes[a];v.material=d;const g=d.uniforms,S=this._sizeLods[r]-1,E=isFinite(l)?Math.PI/(2*S):2*Math.PI/(2*ds-1),b=l/E,y=isFinite(l)?1+Math.floor(_*b):ds;y>ds&&Ze(`sigmaRadians, ${l}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${ds}`);const x=[];let U=0;for(let O=0;O<ds;++O){const T=O/b,L=Math.exp(-T*T/2);x.push(L),O===0?U+=L:O<y&&(U+=2*L)}for(let O=0;O<x.length;O++)x[O]=x[O]/U;g.envMap.value=e.texture,g.samples.value=y,g.weights.value=x,g.latitudinal.value=c==="latitudinal",f&&(g.poleAxis.value=f);const{_lodMax:F}=this;g.dTheta.value=E,g.mipInt.value=F-r;const R=this._sizeLods[a],I=3*R*(a>F-kr?a-F+kr:0),P=4*(this._cubeSize-R);ia(t,I,P,3*R,2*R),p.setRenderTarget(t),p.render(v,lo)}}function GE(s){const e=[],t=[],r=[];let a=s;const l=s-kr+1+kg.length;for(let c=0;c<l;c++){const f=Math.pow(2,a);e.push(f);let p=1/f;c>s-kr?p=kg[c-s+kr-1]:c===0&&(p=0),t.push(p);const d=1/(f-2),_=-d,v=1+d,g=[_,_,v,_,v,v,_,_,v,v,_,v],S=6,E=6,b=3,y=2,x=1,U=new Float32Array(b*E*S),F=new Float32Array(y*E*S),R=new Float32Array(x*E*S);for(let P=0;P<S;P++){const O=P%3*2/3-1,T=P>2?0:-1,L=[O,T,0,O+2/3,T,0,O+2/3,T+1,0,O,T,0,O+2/3,T+1,0,O,T+1,0];U.set(L,b*E*P),F.set(g,y*E*P);const V=[P,P,P,P,P,P];R.set(V,x*E*P)}const I=new hi;I.setAttribute("position",new ci(U,b)),I.setAttribute("uv",new ci(F,y)),I.setAttribute("faceIndex",new ci(R,x)),r.push(new fi(I,null)),a>kr&&a--}return{lodMeshes:r,sizeLods:e,sigmas:t}}function Hg(s,e,t){const r=new Bi(s,e,t);return r.texture.mapping=xu,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function ia(s,e,t,r,a){s.viewport.set(e,t,r,a),s.scissor.set(e,t,r,a)}function WE(s,e,t){return new zi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:VE,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Mu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:sr,depthTest:!1,depthWrite:!1})}function XE(s,e,t){const r=new Float32Array(ds),a=new q(0,1,0);return new zi({name:"SphericalGaussianBlur",defines:{n:ds,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Mu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:sr,depthTest:!1,depthWrite:!1})}function Gg(){return new zi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:sr,depthTest:!1,depthWrite:!1})}function Wg(){return new zi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:sr,depthTest:!1,depthWrite:!1})}function Mu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class G_ extends Bi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},a=[r,r,r,r,r,r];this.texture=new N_(a),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new xo(5,5,5),l=new zi({name:"CubemapFromEquirect",uniforms:da(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Gn,blending:sr});l.uniforms.tEquirect.value=t;const c=new fi(a,l),f=t.minFilter;return t.minFilter===ps&&(t.minFilter=Rn),new By(1,10,this).update(e,c),t.minFilter=f,c.geometry.dispose(),c.material.dispose(),this}clear(e,t=!0,r=!0,a=!0){const l=e.getRenderTarget();for(let c=0;c<6;c++)e.setRenderTarget(this,c),e.clear(t,r,a);e.setRenderTarget(l)}}function YE(s){let e=new WeakMap,t=new WeakMap,r=null;function a(g,S=!1){return g==null?null:S?c(g):l(g)}function l(g){if(g&&g.isTexture){const S=g.mapping;if(S===of||S===lf)if(e.has(g)){const E=e.get(g).texture;return f(E,g.mapping)}else{const E=g.image;if(E&&E.height>0){const b=new G_(E.height);return b.fromEquirectangularTexture(s,g),e.set(g,b),g.addEventListener("dispose",d),f(b.texture,g.mapping)}else return null}}return g}function c(g){if(g&&g.isTexture){const S=g.mapping,E=S===of||S===lf,b=S===gs||S===ca;if(E||b){let y=t.get(g);const x=y!==void 0?y.texture.pmremVersion:0;if(g.isRenderTargetTexture&&g.pmremVersion!==x)return r===null&&(r=new Vg(s)),y=E?r.fromEquirectangular(g,y):r.fromCubemap(g,y),y.texture.pmremVersion=g.pmremVersion,t.set(g,y),y.texture;if(y!==void 0)return y.texture;{const U=g.image;return E&&U&&U.height>0||b&&U&&p(U)?(r===null&&(r=new Vg(s)),y=E?r.fromEquirectangular(g):r.fromCubemap(g),y.texture.pmremVersion=g.pmremVersion,t.set(g,y),g.addEventListener("dispose",_),y.texture):null}}}return g}function f(g,S){return S===of?g.mapping=gs:S===lf&&(g.mapping=ca),g}function p(g){let S=0;const E=6;for(let b=0;b<E;b++)g[b]!==void 0&&S++;return S===E}function d(g){const S=g.target;S.removeEventListener("dispose",d);const E=e.get(S);E!==void 0&&(e.delete(S),E.dispose())}function _(g){const S=g.target;S.removeEventListener("dispose",_);const E=t.get(S);E!==void 0&&(t.delete(S),E.dispose())}function v(){e=new WeakMap,t=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:a,dispose:v}}function qE(s){const e={};function t(r){if(e[r]!==void 0)return e[r];const a=s.getExtension(r);return e[r]=a,a}return{has:function(r){return t(r)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(r){const a=t(r);return a===null&&oa("WebGLRenderer: "+r+" extension not supported."),a}}}function KE(s,e,t,r){const a={},l=new WeakMap;function c(v){const g=v.target;g.index!==null&&e.remove(g.index);for(const E in g.attributes)e.remove(g.attributes[E]);g.removeEventListener("dispose",c),delete a[g.id];const S=l.get(g);S&&(e.remove(S),l.delete(g)),r.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function f(v,g){return a[g.id]===!0||(g.addEventListener("dispose",c),a[g.id]=!0,t.memory.geometries++),g}function p(v){const g=v.attributes;for(const S in g)e.update(g[S],s.ARRAY_BUFFER)}function d(v){const g=[],S=v.index,E=v.attributes.position;let b=0;if(E===void 0)return;if(S!==null){const U=S.array;b=S.version;for(let F=0,R=U.length;F<R;F+=3){const I=U[F+0],P=U[F+1],O=U[F+2];g.push(I,P,P,O,O,I)}}else{const U=E.array;b=E.version;for(let F=0,R=U.length/3-1;F<R;F+=3){const I=F+0,P=F+1,O=F+2;g.push(I,P,P,O,O,I)}}const y=new(E.count>=65535?C_:R_)(g,1);y.version=b;const x=l.get(v);x&&e.remove(x),l.set(v,y)}function _(v){const g=l.get(v);if(g){const S=v.index;S!==null&&g.version<S.version&&d(v)}else d(v);return l.get(v)}return{get:f,update:p,getWireframeAttribute:_}}function $E(s,e,t){let r;function a(v){r=v}let l,c;function f(v){l=v.type,c=v.bytesPerElement}function p(v,g){s.drawElements(r,g,l,v*c),t.update(g,r,1)}function d(v,g,S){S!==0&&(s.drawElementsInstanced(r,g,l,v*c,S),t.update(g,r,S))}function _(v,g,S){if(S===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(r,g,0,l,v,0,S);let b=0;for(let y=0;y<S;y++)b+=g[y];t.update(b,r,1)}this.setMode=a,this.setIndex=f,this.render=p,this.renderInstances=d,this.renderMultiDraw=_}function ZE(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(l,c,f){switch(t.calls++,c){case s.TRIANGLES:t.triangles+=f*(l/3);break;case s.LINES:t.lines+=f*(l/2);break;case s.LINE_STRIP:t.lines+=f*(l-1);break;case s.LINE_LOOP:t.lines+=f*l;break;case s.POINTS:t.points+=f*l;break;default:st("WebGLInfo: Unknown draw mode:",c);break}}function a(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:a,update:r}}function JE(s,e,t){const r=new WeakMap,a=new Ft;function l(c,f,p){const d=c.morphTargetInfluences,_=f.morphAttributes.position||f.morphAttributes.normal||f.morphAttributes.color,v=_!==void 0?_.length:0;let g=r.get(f);if(g===void 0||g.count!==v){let L=function(){O.dispose(),r.delete(f),f.removeEventListener("dispose",L)};g!==void 0&&g.texture.dispose();const S=f.morphAttributes.position!==void 0,E=f.morphAttributes.normal!==void 0,b=f.morphAttributes.color!==void 0,y=f.morphAttributes.position||[],x=f.morphAttributes.normal||[],U=f.morphAttributes.color||[];let F=0;S===!0&&(F=1),E===!0&&(F=2),b===!0&&(F=3);let R=f.attributes.position.count*F,I=1;R>e.maxTextureSize&&(I=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const P=new Float32Array(R*I*4*v),O=new A_(P,R,I,v);O.type=li,O.needsUpdate=!0;const T=F*4;for(let V=0;V<v;V++){const z=y[V],K=x[V],ce=U[V],he=R*I*4*V;for(let J=0;J<z.count;J++){const oe=J*T;S===!0&&(a.fromBufferAttribute(z,J),P[he+oe+0]=a.x,P[he+oe+1]=a.y,P[he+oe+2]=a.z,P[he+oe+3]=0),E===!0&&(a.fromBufferAttribute(K,J),P[he+oe+4]=a.x,P[he+oe+5]=a.y,P[he+oe+6]=a.z,P[he+oe+7]=0),b===!0&&(a.fromBufferAttribute(ce,J),P[he+oe+8]=a.x,P[he+oe+9]=a.y,P[he+oe+10]=a.z,P[he+oe+11]=ce.itemSize===4?a.w:1)}}g={count:v,texture:O,size:new it(R,I)},r.set(f,g),f.addEventListener("dispose",L)}if(c.isInstancedMesh===!0&&c.morphTexture!==null)p.getUniforms().setValue(s,"morphTexture",c.morphTexture,t);else{let S=0;for(let b=0;b<d.length;b++)S+=d[b];const E=f.morphTargetsRelative?1:1-S;p.getUniforms().setValue(s,"morphTargetBaseInfluence",E),p.getUniforms().setValue(s,"morphTargetInfluences",d)}p.getUniforms().setValue(s,"morphTargetsTexture",g.texture,t),p.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}return{update:l}}function jE(s,e,t,r,a){let l=new WeakMap;function c(d){const _=a.render.frame,v=d.geometry,g=e.get(d,v);if(l.get(g)!==_&&(e.update(g),l.set(g,_)),d.isInstancedMesh&&(d.hasEventListener("dispose",p)===!1&&d.addEventListener("dispose",p),l.get(d)!==_&&(t.update(d.instanceMatrix,s.ARRAY_BUFFER),d.instanceColor!==null&&t.update(d.instanceColor,s.ARRAY_BUFFER),l.set(d,_))),d.isSkinnedMesh){const S=d.skeleton;l.get(S)!==_&&(S.update(),l.set(S,_))}return g}function f(){l=new WeakMap}function p(d){const _=d.target;_.removeEventListener("dispose",p),r.releaseStatesOfObject(_),t.remove(_.instanceMatrix),_.instanceColor!==null&&t.remove(_.instanceColor)}return{update:c,dispose:f}}const QE={[f_]:"LINEAR_TONE_MAPPING",[h_]:"REINHARD_TONE_MAPPING",[d_]:"CINEON_TONE_MAPPING",[p_]:"ACES_FILMIC_TONE_MAPPING",[g_]:"AGX_TONE_MAPPING",[__]:"NEUTRAL_TONE_MAPPING",[m_]:"CUSTOM_TONE_MAPPING"};function eT(s,e,t,r,a,l){const c=new Bi(e,t,{type:s,depthBuffer:a,stencilBuffer:l,samples:r?4:0,depthTexture:a?new ha(e,t):void 0}),f=new Bi(e,t,{type:or,depthBuffer:!1,stencilBuffer:!1}),p=new hi;p.setAttribute("position",new Wn([-1,3,0,-1,-1,0,3,-1,0],3)),p.setAttribute("uv",new Wn([0,2,0,0,2,0],2));const d=new vy({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),_=new fi(p,d),v=new sd(-1,1,1,-1,0,1);let g=null,S=null,E=!1,b,y=null,x=[],U=!1;this.setSize=function(F,R){c.setSize(F,R),f.setSize(F,R);for(let I=0;I<x.length;I++){const P=x[I];P.setSize&&P.setSize(F,R)}},this.setEffects=function(F){x=F,U=x.length>0&&x[0].isRenderPass===!0;const R=c.width,I=c.height;for(let P=0;P<x.length;P++){const O=x[P];O.setSize&&O.setSize(R,I)}},this.begin=function(F,R){if(E||F.toneMapping===Oi&&x.length===0)return!1;if(y=R,R!==null){const I=R.width,P=R.height;(c.width!==I||c.height!==P)&&this.setSize(I,P)}return U===!1&&F.setRenderTarget(c),b=F.toneMapping,F.toneMapping=Oi,!0},this.hasRenderPass=function(){return U},this.end=function(F,R){F.toneMapping=b,E=!0;let I=c,P=f;for(let O=0;O<x.length;O++){const T=x[O];if(T.enabled!==!1&&(T.render(F,P,I,R),T.needsSwap!==!1)){const L=I;I=P,P=L}}if(g!==F.outputColorSpace||S!==F.toneMapping){g=F.outputColorSpace,S=F.toneMapping,d.defines={},xt.getTransfer(g)===Lt&&(d.defines.SRGB_TRANSFER="");const O=QE[S];O&&(d.defines[O]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=I.texture,F.setRenderTarget(y),F.render(_,v),y=null,E=!1},this.isCompositing=function(){return E},this.dispose=function(){c.depthTexture&&c.depthTexture.dispose(),c.dispose(),f.dispose(),p.dispose(),d.dispose()}}const W_=new yn,Oh=new ha(1,1),X_=new A_,Y_=new Xx,q_=new N_,Xg=[],Yg=[],qg=new Float32Array(16),Kg=new Float32Array(9),$g=new Float32Array(4);function _a(s,e,t){const r=s[0];if(r<=0||r>0)return s;const a=e*t;let l=Xg[a];if(l===void 0&&(l=new Float32Array(a),Xg[a]=l),e!==0){r.toArray(l,0);for(let c=1,f=0;c!==e;++c)f+=t,s[c].toArray(l,f)}return l}function un(s,e){if(s.length!==e.length)return!1;for(let t=0,r=s.length;t<r;t++)if(s[t]!==e[t])return!1;return!0}function cn(s,e){for(let t=0,r=e.length;t<r;t++)s[t]=e[t]}function Eu(s,e){let t=Yg[e];t===void 0&&(t=new Int32Array(e),Yg[e]=t);for(let r=0;r!==e;++r)t[r]=s.allocateTextureUnit();return t}function tT(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function nT(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(un(t,e))return;s.uniform2fv(this.addr,e),cn(t,e)}}function iT(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(un(t,e))return;s.uniform3fv(this.addr,e),cn(t,e)}}function rT(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(un(t,e))return;s.uniform4fv(this.addr,e),cn(t,e)}}function sT(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(un(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),cn(t,e)}else{if(un(t,r))return;$g.set(r),s.uniformMatrix2fv(this.addr,!1,$g),cn(t,r)}}function aT(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(un(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),cn(t,e)}else{if(un(t,r))return;Kg.set(r),s.uniformMatrix3fv(this.addr,!1,Kg),cn(t,r)}}function oT(s,e){const t=this.cache,r=e.elements;if(r===void 0){if(un(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),cn(t,e)}else{if(un(t,r))return;qg.set(r),s.uniformMatrix4fv(this.addr,!1,qg),cn(t,r)}}function lT(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function uT(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(un(t,e))return;s.uniform2iv(this.addr,e),cn(t,e)}}function cT(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(un(t,e))return;s.uniform3iv(this.addr,e),cn(t,e)}}function fT(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(un(t,e))return;s.uniform4iv(this.addr,e),cn(t,e)}}function hT(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function dT(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(un(t,e))return;s.uniform2uiv(this.addr,e),cn(t,e)}}function pT(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(un(t,e))return;s.uniform3uiv(this.addr,e),cn(t,e)}}function mT(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(un(t,e))return;s.uniform4uiv(this.addr,e),cn(t,e)}}function gT(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a);let l;this.type===s.SAMPLER_2D_SHADOW?(Oh.compareFunction=t.isReversedDepthBuffer()?Zh:$h,l=Oh):l=W_,t.setTexture2D(e||l,a)}function _T(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTexture3D(e||Y_,a)}function vT(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTextureCube(e||q_,a)}function xT(s,e,t){const r=this.cache,a=t.allocateTextureUnit();r[0]!==a&&(s.uniform1i(this.addr,a),r[0]=a),t.setTexture2DArray(e||X_,a)}function yT(s){switch(s){case 5126:return tT;case 35664:return nT;case 35665:return iT;case 35666:return rT;case 35674:return sT;case 35675:return aT;case 35676:return oT;case 5124:case 35670:return lT;case 35667:case 35671:return uT;case 35668:case 35672:return cT;case 35669:case 35673:return fT;case 5125:return hT;case 36294:return dT;case 36295:return pT;case 36296:return mT;case 35678:case 36198:case 36298:case 36306:case 35682:return gT;case 35679:case 36299:case 36307:return _T;case 35680:case 36300:case 36308:case 36293:return vT;case 36289:case 36303:case 36311:case 36292:return xT}}function ST(s,e){s.uniform1fv(this.addr,e)}function MT(s,e){const t=_a(e,this.size,2);s.uniform2fv(this.addr,t)}function ET(s,e){const t=_a(e,this.size,3);s.uniform3fv(this.addr,t)}function TT(s,e){const t=_a(e,this.size,4);s.uniform4fv(this.addr,t)}function wT(s,e){const t=_a(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function AT(s,e){const t=_a(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function bT(s,e){const t=_a(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function RT(s,e){s.uniform1iv(this.addr,e)}function CT(s,e){s.uniform2iv(this.addr,e)}function PT(s,e){s.uniform3iv(this.addr,e)}function LT(s,e){s.uniform4iv(this.addr,e)}function DT(s,e){s.uniform1uiv(this.addr,e)}function IT(s,e){s.uniform2uiv(this.addr,e)}function NT(s,e){s.uniform3uiv(this.addr,e)}function UT(s,e){s.uniform4uiv(this.addr,e)}function FT(s,e,t){const r=this.cache,a=e.length,l=Eu(t,a);un(r,l)||(s.uniform1iv(this.addr,l),cn(r,l));let c;this.type===s.SAMPLER_2D_SHADOW?c=Oh:c=W_;for(let f=0;f!==a;++f)t.setTexture2D(e[f]||c,l[f])}function OT(s,e,t){const r=this.cache,a=e.length,l=Eu(t,a);un(r,l)||(s.uniform1iv(this.addr,l),cn(r,l));for(let c=0;c!==a;++c)t.setTexture3D(e[c]||Y_,l[c])}function BT(s,e,t){const r=this.cache,a=e.length,l=Eu(t,a);un(r,l)||(s.uniform1iv(this.addr,l),cn(r,l));for(let c=0;c!==a;++c)t.setTextureCube(e[c]||q_,l[c])}function kT(s,e,t){const r=this.cache,a=e.length,l=Eu(t,a);un(r,l)||(s.uniform1iv(this.addr,l),cn(r,l));for(let c=0;c!==a;++c)t.setTexture2DArray(e[c]||X_,l[c])}function zT(s){switch(s){case 5126:return ST;case 35664:return MT;case 35665:return ET;case 35666:return TT;case 35674:return wT;case 35675:return AT;case 35676:return bT;case 5124:case 35670:return RT;case 35667:case 35671:return CT;case 35668:case 35672:return PT;case 35669:case 35673:return LT;case 5125:return DT;case 36294:return IT;case 36295:return NT;case 36296:return UT;case 35678:case 36198:case 36298:case 36306:case 35682:return FT;case 35679:case 36299:case 36307:return OT;case 35680:case 36300:case 36308:case 36293:return BT;case 36289:case 36303:case 36311:case 36292:return kT}}class VT{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=yT(t.type)}}class HT{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=zT(t.type)}}class GT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const a=this.seq;for(let l=0,c=a.length;l!==c;++l){const f=a[l];f.setValue(e,t[f.id],r)}}}const Hf=/(\w+)(\])?(\[|\.)?/g;function Zg(s,e){s.seq.push(e),s.map[e.id]=e}function WT(s,e,t){const r=s.name,a=r.length;for(Hf.lastIndex=0;;){const l=Hf.exec(r),c=Hf.lastIndex;let f=l[1];const p=l[2]==="]",d=l[3];if(p&&(f=f|0),d===void 0||d==="["&&c+2===a){Zg(t,d===void 0?new VT(f,s,e):new HT(f,s,e));break}else{let v=t.map[f];v===void 0&&(v=new GT(f),Zg(t,v)),t=v}}}class lu{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let c=0;c<r;++c){const f=e.getActiveUniform(t,c),p=e.getUniformLocation(t,f.name);WT(f,p,this)}const a=[],l=[];for(const c of this.seq)c.type===e.SAMPLER_2D_SHADOW||c.type===e.SAMPLER_CUBE_SHADOW||c.type===e.SAMPLER_2D_ARRAY_SHADOW?a.push(c):l.push(c);a.length>0&&(this.seq=a.concat(l))}setValue(e,t,r,a){const l=this.map[t];l!==void 0&&l.setValue(e,r,a)}setOptional(e,t,r){const a=t[r];a!==void 0&&this.setValue(e,r,a)}static upload(e,t,r,a){for(let l=0,c=t.length;l!==c;++l){const f=t[l],p=r[f.id];p.needsUpdate!==!1&&f.setValue(e,p.value,a)}}static seqWithValue(e,t){const r=[];for(let a=0,l=e.length;a!==l;++a){const c=e[a];c.id in t&&r.push(c)}return r}}function Jg(s,e,t){const r=s.createShader(e);return s.shaderSource(r,t),s.compileShader(r),r}const XT=37297;let YT=0;function qT(s,e){const t=s.split(`
`),r=[],a=Math.max(e-6,0),l=Math.min(e+6,t.length);for(let c=a;c<l;c++){const f=c+1;r.push(`${f===e?">":" "} ${f}: ${t[c]}`)}return r.join(`
`)}const jg=new ut;function KT(s){xt._getMatrix(jg,xt.workingColorSpace,s);const e=`mat3( ${jg.elements.map(t=>t.toFixed(4))} )`;switch(xt.getTransfer(s)){case pu:return[e,"LinearTransferOETF"];case Lt:return[e,"sRGBTransferOETF"];default:return Ze("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Qg(s,e,t){const r=s.getShaderParameter(e,s.COMPILE_STATUS),l=(s.getShaderInfoLog(e)||"").trim();if(r&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const f=parseInt(c[1]);return t.toUpperCase()+`

`+l+`

`+qT(s.getShaderSource(e),f)}else return l}function $T(s,e){const t=KT(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const ZT={[f_]:"Linear",[h_]:"Reinhard",[d_]:"Cineon",[p_]:"ACESFilmic",[g_]:"AgX",[__]:"Neutral",[m_]:"Custom"};function JT(s,e){const t=ZT[e];return t===void 0?(Ze("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const tu=new q;function jT(){xt.getLuminanceCoefficients(tu);const s=tu.x.toFixed(4),e=tu.y.toFixed(4),t=tu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function QT(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fo).join(`
`)}function ew(s){const e=[];for(const t in s){const r=s[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function tw(s,e){const t={},r=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let a=0;a<r;a++){const l=s.getActiveAttrib(e,a),c=l.name;let f=1;l.type===s.FLOAT_MAT2&&(f=2),l.type===s.FLOAT_MAT3&&(f=3),l.type===s.FLOAT_MAT4&&(f=4),t[c]={type:l.type,location:s.getAttribLocation(e,c),locationSize:f}}return t}function fo(s){return s!==""}function e_(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function t_(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const nw=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bh(s){return s.replace(nw,rw)}const iw=new Map;function rw(s,e){let t=ft[e];if(t===void 0){const r=iw.get(e);if(r!==void 0)t=ft[r],Ze('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Bh(t)}const sw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function n_(s){return s.replace(sw,aw)}function aw(s,e,t,r){let a="";for(let l=parseInt(e);l<parseInt(t);l++)a+=r.replace(/\[\s*i\s*\]/g,"[ "+l+" ]").replace(/UNROLLED_LOOP_INDEX/g,l);return a}function i_(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const ow={[iu]:"SHADOWMAP_TYPE_PCF",[co]:"SHADOWMAP_TYPE_VSM"};function lw(s){return ow[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const uw={[gs]:"ENVMAP_TYPE_CUBE",[ca]:"ENVMAP_TYPE_CUBE",[xu]:"ENVMAP_TYPE_CUBE_UV"};function cw(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":uw[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const fw={[ca]:"ENVMAP_MODE_REFRACTION"};function hw(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":fw[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const dw={[Vh]:"ENVMAP_BLENDING_MULTIPLY",[sx]:"ENVMAP_BLENDING_MIX",[ax]:"ENVMAP_BLENDING_ADD"};function pw(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":dw[s.combine]||"ENVMAP_BLENDING_NONE"}function mw(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:r,maxMip:t}}function gw(s,e,t,r){const a=s.getContext(),l=t.defines;let c=t.vertexShader,f=t.fragmentShader;const p=lw(t),d=cw(t),_=hw(t),v=pw(t),g=mw(t),S=QT(t),E=ew(l),b=a.createProgram();let y,x,U=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(y=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(fo).join(`
`),y.length>0&&(y+=`
`),x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E].filter(fo).join(`
`),x.length>0&&(x+=`
`)):(y=[i_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+_:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+p:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fo).join(`
`),x=[i_(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,E,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+_:"",t.envMap?"#define "+v:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+p:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Oi?"#define TONE_MAPPING":"",t.toneMapping!==Oi?ft.tonemapping_pars_fragment:"",t.toneMapping!==Oi?JT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ft.colorspace_pars_fragment,$T("linearToOutputTexel",t.outputColorSpace),jT(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(fo).join(`
`)),c=Bh(c),c=e_(c,t),c=t_(c,t),f=Bh(f),f=e_(f,t),f=t_(f,t),c=n_(c),f=n_(f),t.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,y=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,x=["#define varying in",t.glslVersion===Zm?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Zm?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const F=U+y+c,R=U+x+f,I=Jg(a,a.VERTEX_SHADER,F),P=Jg(a,a.FRAGMENT_SHADER,R);a.attachShader(b,I),a.attachShader(b,P),t.index0AttributeName!==void 0?a.bindAttribLocation(b,0,t.index0AttributeName):t.hasPositionAttribute===!0&&a.bindAttribLocation(b,0,"position"),a.linkProgram(b);function O(z){if(s.debug.checkShaderErrors){const K=a.getProgramInfoLog(b)||"",ce=a.getShaderInfoLog(I)||"",he=a.getShaderInfoLog(P)||"",J=K.trim(),oe=ce.trim(),ee=he.trim();let X=!0,ae=!0;if(a.getProgramParameter(b,a.LINK_STATUS)===!1)if(X=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(a,b,I,P);else{const le=Qg(a,I,"vertex"),N=Qg(a,P,"fragment");st("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(b,a.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+J+`
`+le+`
`+N)}else J!==""?Ze("WebGLProgram: Program Info Log:",J):(oe===""||ee==="")&&(ae=!1);ae&&(z.diagnostics={runnable:X,programLog:J,vertexShader:{log:oe,prefix:y},fragmentShader:{log:ee,prefix:x}})}a.deleteShader(I),a.deleteShader(P),T=new lu(a,b),L=tw(a,b)}let T;this.getUniforms=function(){return T===void 0&&O(this),T};let L;this.getAttributes=function(){return L===void 0&&O(this),L};let V=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return V===!1&&(V=a.getProgramParameter(b,XT)),V},this.destroy=function(){r.releaseStatesOfProgram(this),a.deleteProgram(b),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=YT++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=I,this.fragmentShader=P,this}let _w=0;class vw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,r){const a=this._getShaderCacheForMaterial(e);return a.has(t)===!1&&(a.add(t),t.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new xw(e),t.set(e,r)),r}}class xw{constructor(e){this.id=_w++,this.code=e,this.usedTimes=0}}function yw(s){return s===_s||s===uu||s===cu}function Sw(s,e,t,r,a,l){const c=new Qh,f=new vw,p=new Set,d=[],_=new Map,v=r.logarithmicDepthBuffer;let g=r.precision;const S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function E(T){return p.add(T),T===0?"uv":`uv${T}`}function b(T,L,V,z,K,ce){const he=z.fog,J=K.geometry,oe=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?z.environment:null,ee=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,X=e.get(T.envMap||oe,ee),ae=X&&X.mapping===xu?X.image.height:null,le=S[T.type];T.precision!==null&&(g=r.getMaxPrecision(T.precision),g!==T.precision&&Ze("WebGLProgram.getParameters:",T.precision,"not supported, using",g,"instead."));const N=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,$=N!==void 0?N.length:0;let Ie=0;J.morphAttributes.position!==void 0&&(Ie=1),J.morphAttributes.normal!==void 0&&(Ie=2),J.morphAttributes.color!==void 0&&(Ie=3);let qe,ke,ie,_e;if(le){const ze=Ui[le];qe=ze.vertexShader,ke=ze.fragmentShader}else{qe=T.vertexShader,ke=T.fragmentShader;const ze=f.getVertexShaderStage(T),It=f.getFragmentShaderStage(T);f.update(T,ze,It),ie=ze.id,_e=It.id}const pe=s.getRenderTarget(),Ne=s.state.buffers.depth.getReversed(),je=K.isInstancedMesh===!0,Qe=K.isBatchedMesh===!0,Ht=!!T.map,ct=!!T.matcap,wt=!!X,yt=!!T.aoMap,vt=!!T.lightMap,Gt=!!T.bumpMap&&T.wireframe===!1,Jt=!!T.normalMap,jt=!!T.displacementMap,qt=!!T.emissiveMap,Rt=!!T.metalnessMap,Wt=!!T.roughnessMap,G=T.anisotropy>0,mn=T.clearcoat>0,Et=T.dispersion>0,C=T.iridescence>0,M=T.sheen>0,Y=T.transmission>0,ne=G&&!!T.anisotropyMap,ue=mn&&!!T.clearcoatMap,Se=mn&&!!T.clearcoatNormalMap,be=mn&&!!T.clearcoatRoughnessMap,fe=C&&!!T.iridescenceMap,me=C&&!!T.iridescenceThicknessMap,Ce=M&&!!T.sheenColorMap,Xe=M&&!!T.sheenRoughnessMap,Pe=!!T.specularMap,Ae=!!T.specularColorMap,Je=!!T.specularIntensityMap,et=Y&&!!T.transmissionMap,rt=Y&&!!T.thicknessMap,k=!!T.gradientMap,we=!!T.alphaMap,de=T.alphaTest>0,Re=!!T.alphaHash,Le=!!T.extensions;let ge=Oi;T.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(ge=s.toneMapping);const He={shaderID:le,shaderType:T.type,shaderName:T.name,vertexShader:qe,fragmentShader:ke,defines:T.defines,customVertexShaderID:ie,customFragmentShaderID:_e,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:g,batching:Qe,batchingColor:Qe&&K._colorsTexture!==null,instancing:je,instancingColor:je&&K.instanceColor!==null,instancingMorph:je&&K.morphTexture!==null,outputColorSpace:pe===null?s.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:xt.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:Ht,matcap:ct,envMap:wt,envMapMode:wt&&X.mapping,envMapCubeUVHeight:ae,aoMap:yt,lightMap:vt,bumpMap:Gt,normalMap:Jt,displacementMap:jt,emissiveMap:qt,normalMapObjectSpace:Jt&&T.normalMapType===fx,normalMapTangentSpace:Jt&&T.normalMapType===hu,packedNormalMap:Jt&&T.normalMapType===hu&&yw(T.normalMap.format),metalnessMap:Rt,roughnessMap:Wt,anisotropy:G,anisotropyMap:ne,clearcoat:mn,clearcoatMap:ue,clearcoatNormalMap:Se,clearcoatRoughnessMap:be,dispersion:Et,iridescence:C,iridescenceMap:fe,iridescenceThicknessMap:me,sheen:M,sheenColorMap:Ce,sheenRoughnessMap:Xe,specularMap:Pe,specularColorMap:Ae,specularIntensityMap:Je,transmission:Y,transmissionMap:et,thicknessMap:rt,gradientMap:k,opaque:T.transparent===!1&&T.blending===aa&&T.alphaToCoverage===!1,alphaMap:we,alphaTest:de,alphaHash:Re,combine:T.combine,mapUv:Ht&&E(T.map.channel),aoMapUv:yt&&E(T.aoMap.channel),lightMapUv:vt&&E(T.lightMap.channel),bumpMapUv:Gt&&E(T.bumpMap.channel),normalMapUv:Jt&&E(T.normalMap.channel),displacementMapUv:jt&&E(T.displacementMap.channel),emissiveMapUv:qt&&E(T.emissiveMap.channel),metalnessMapUv:Rt&&E(T.metalnessMap.channel),roughnessMapUv:Wt&&E(T.roughnessMap.channel),anisotropyMapUv:ne&&E(T.anisotropyMap.channel),clearcoatMapUv:ue&&E(T.clearcoatMap.channel),clearcoatNormalMapUv:Se&&E(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&E(T.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&E(T.iridescenceMap.channel),iridescenceThicknessMapUv:me&&E(T.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&E(T.sheenColorMap.channel),sheenRoughnessMapUv:Xe&&E(T.sheenRoughnessMap.channel),specularMapUv:Pe&&E(T.specularMap.channel),specularColorMapUv:Ae&&E(T.specularColorMap.channel),specularIntensityMapUv:Je&&E(T.specularIntensityMap.channel),transmissionMapUv:et&&E(T.transmissionMap.channel),thicknessMapUv:rt&&E(T.thicknessMap.channel),alphaMapUv:we&&E(T.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(Jt||G),vertexNormals:!!J.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:K.isPoints===!0&&!!J.attributes.uv&&(Ht||we),fog:!!he,useFog:T.fog===!0,fogExp2:!!he&&he.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||J.attributes.normal===void 0&&Jt===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:v,reversedDepthBuffer:Ne,skinning:K.isSkinnedMesh===!0,hasPositionAttribute:J.attributes.position!==void 0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:Ie,numDirLights:L.directional.length,numPointLights:L.point.length,numSpotLights:L.spot.length,numSpotLightMaps:L.spotLightMap.length,numRectAreaLights:L.rectArea.length,numHemiLights:L.hemi.length,numDirLightShadows:L.directionalShadowMap.length,numPointLightShadows:L.pointShadowMap.length,numSpotLightShadows:L.spotShadowMap.length,numSpotLightShadowsWithMaps:L.numSpotLightShadowsWithMaps,numLightProbes:L.numLightProbes,numLightProbeGrids:ce.length,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:T.dithering,shadowMapEnabled:s.shadowMap.enabled&&V.length>0,shadowMapType:s.shadowMap.type,toneMapping:ge,decodeVideoTexture:Ht&&T.map.isVideoTexture===!0&&xt.getTransfer(T.map.colorSpace)===Lt,decodeVideoTextureEmissive:qt&&T.emissiveMap.isVideoTexture===!0&&xt.getTransfer(T.emissiveMap.colorSpace)===Lt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===nr,flipSided:T.side===Gn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Le&&T.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&T.extensions.multiDraw===!0||Qe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return He.vertexUv1s=p.has(1),He.vertexUv2s=p.has(2),He.vertexUv3s=p.has(3),p.clear(),He}function y(T){const L=[];if(T.shaderID?L.push(T.shaderID):(L.push(T.customVertexShaderID),L.push(T.customFragmentShaderID)),T.defines!==void 0)for(const V in T.defines)L.push(V),L.push(T.defines[V]);return T.isRawShaderMaterial===!1&&(x(L,T),U(L,T),L.push(s.outputColorSpace)),L.push(T.customProgramCacheKey),L.join()}function x(T,L){T.push(L.precision),T.push(L.outputColorSpace),T.push(L.envMapMode),T.push(L.envMapCubeUVHeight),T.push(L.mapUv),T.push(L.alphaMapUv),T.push(L.lightMapUv),T.push(L.aoMapUv),T.push(L.bumpMapUv),T.push(L.normalMapUv),T.push(L.displacementMapUv),T.push(L.emissiveMapUv),T.push(L.metalnessMapUv),T.push(L.roughnessMapUv),T.push(L.anisotropyMapUv),T.push(L.clearcoatMapUv),T.push(L.clearcoatNormalMapUv),T.push(L.clearcoatRoughnessMapUv),T.push(L.iridescenceMapUv),T.push(L.iridescenceThicknessMapUv),T.push(L.sheenColorMapUv),T.push(L.sheenRoughnessMapUv),T.push(L.specularMapUv),T.push(L.specularColorMapUv),T.push(L.specularIntensityMapUv),T.push(L.transmissionMapUv),T.push(L.thicknessMapUv),T.push(L.combine),T.push(L.fogExp2),T.push(L.sizeAttenuation),T.push(L.morphTargetsCount),T.push(L.morphAttributeCount),T.push(L.numDirLights),T.push(L.numPointLights),T.push(L.numSpotLights),T.push(L.numSpotLightMaps),T.push(L.numHemiLights),T.push(L.numRectAreaLights),T.push(L.numDirLightShadows),T.push(L.numPointLightShadows),T.push(L.numSpotLightShadows),T.push(L.numSpotLightShadowsWithMaps),T.push(L.numLightProbes),T.push(L.shadowMapType),T.push(L.toneMapping),T.push(L.numClippingPlanes),T.push(L.numClipIntersection),T.push(L.depthPacking)}function U(T,L){c.disableAll(),L.instancing&&c.enable(0),L.instancingColor&&c.enable(1),L.instancingMorph&&c.enable(2),L.matcap&&c.enable(3),L.envMap&&c.enable(4),L.normalMapObjectSpace&&c.enable(5),L.normalMapTangentSpace&&c.enable(6),L.clearcoat&&c.enable(7),L.iridescence&&c.enable(8),L.alphaTest&&c.enable(9),L.vertexColors&&c.enable(10),L.vertexAlphas&&c.enable(11),L.vertexUv1s&&c.enable(12),L.vertexUv2s&&c.enable(13),L.vertexUv3s&&c.enable(14),L.vertexTangents&&c.enable(15),L.anisotropy&&c.enable(16),L.alphaHash&&c.enable(17),L.batching&&c.enable(18),L.dispersion&&c.enable(19),L.batchingColor&&c.enable(20),L.gradientMap&&c.enable(21),L.packedNormalMap&&c.enable(22),L.vertexNormals&&c.enable(23),T.push(c.mask),c.disableAll(),L.fog&&c.enable(0),L.useFog&&c.enable(1),L.flatShading&&c.enable(2),L.logarithmicDepthBuffer&&c.enable(3),L.reversedDepthBuffer&&c.enable(4),L.skinning&&c.enable(5),L.morphTargets&&c.enable(6),L.morphNormals&&c.enable(7),L.morphColors&&c.enable(8),L.premultipliedAlpha&&c.enable(9),L.shadowMapEnabled&&c.enable(10),L.doubleSided&&c.enable(11),L.flipSided&&c.enable(12),L.useDepthPacking&&c.enable(13),L.dithering&&c.enable(14),L.transmission&&c.enable(15),L.sheen&&c.enable(16),L.opaque&&c.enable(17),L.pointsUvs&&c.enable(18),L.decodeVideoTexture&&c.enable(19),L.decodeVideoTextureEmissive&&c.enable(20),L.alphaToCoverage&&c.enable(21),L.numLightProbeGrids>0&&c.enable(22),L.hasPositionAttribute&&c.enable(23),T.push(c.mask)}function F(T){const L=S[T.type];let V;if(L){const z=Ui[L];V=my.clone(z.uniforms)}else V=T.uniforms;return V}function R(T,L){let V=_.get(L);return V!==void 0?++V.usedTimes:(V=new gw(s,L,T,a),d.push(V),_.set(L,V)),V}function I(T){if(--T.usedTimes===0){const L=d.indexOf(T);d[L]=d[d.length-1],d.pop(),_.delete(T.cacheKey),T.destroy()}}function P(T){f.remove(T)}function O(){f.dispose()}return{getParameters:b,getProgramCacheKey:y,getUniforms:F,acquireProgram:R,releaseProgram:I,releaseShaderCache:P,programs:d,dispose:O}}function Mw(){let s=new WeakMap;function e(c){return s.has(c)}function t(c){let f=s.get(c);return f===void 0&&(f={},s.set(c,f)),f}function r(c){s.delete(c)}function a(c,f,p){s.get(c)[f]=p}function l(){s=new WeakMap}return{has:e,get:t,remove:r,update:a,dispose:l}}function Ew(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function r_(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function s_(){const s=[];let e=0;const t=[],r=[],a=[];function l(){e=0,t.length=0,r.length=0,a.length=0}function c(g){let S=0;return g.isInstancedMesh&&(S+=2),g.isSkinnedMesh&&(S+=1),S}function f(g,S,E,b,y,x){let U=s[e];return U===void 0?(U={id:g.id,object:g,geometry:S,material:E,materialVariant:c(g),groupOrder:b,renderOrder:g.renderOrder,z:y,group:x},s[e]=U):(U.id=g.id,U.object=g,U.geometry=S,U.material=E,U.materialVariant=c(g),U.groupOrder=b,U.renderOrder=g.renderOrder,U.z=y,U.group=x),e++,U}function p(g,S,E,b,y,x){const U=f(g,S,E,b,y,x);E.transmission>0?r.push(U):E.transparent===!0?a.push(U):t.push(U)}function d(g,S,E,b,y,x){const U=f(g,S,E,b,y,x);E.transmission>0?r.unshift(U):E.transparent===!0?a.unshift(U):t.unshift(U)}function _(g,S,E){t.length>1&&t.sort(g||Ew),r.length>1&&r.sort(S||r_),a.length>1&&a.sort(S||r_),E&&(t.reverse(),r.reverse(),a.reverse())}function v(){for(let g=e,S=s.length;g<S;g++){const E=s[g];if(E.id===null)break;E.id=null,E.object=null,E.geometry=null,E.material=null,E.group=null}}return{opaque:t,transmissive:r,transparent:a,init:l,push:p,unshift:d,finish:v,sort:_}}function Tw(){let s=new WeakMap;function e(r,a){const l=s.get(r);let c;return l===void 0?(c=new s_,s.set(r,[c])):a>=l.length?(c=new s_,l.push(c)):c=l[a],c}function t(){s=new WeakMap}return{get:e,dispose:t}}function ww(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new q,color:new ht};break;case"SpotLight":t={position:new q,direction:new q,color:new ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new ht,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new ht,groundColor:new ht};break;case"RectAreaLight":t={color:new ht,position:new q,halfWidth:new q,halfHeight:new q};break}return s[e.id]=t,t}}}function Aw(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let bw=0;function Rw(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Cw(s){const e=new ww,t=Aw(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)r.probe.push(new q);const a=new q,l=new _t,c=new _t;function f(d){let _=0,v=0,g=0;for(let L=0;L<9;L++)r.probe[L].set(0,0,0);let S=0,E=0,b=0,y=0,x=0,U=0,F=0,R=0,I=0,P=0,O=0;d.sort(Rw);for(let L=0,V=d.length;L<V;L++){const z=d[L],K=z.color,ce=z.intensity,he=z.distance;let J=null;if(z.shadow&&z.shadow.map&&(z.shadow.map.texture.format===_s?J=z.shadow.map.texture:J=z.shadow.map.depthTexture||z.shadow.map.texture),z.isAmbientLight)_+=K.r*ce,v+=K.g*ce,g+=K.b*ce;else if(z.isLightProbe){for(let oe=0;oe<9;oe++)r.probe[oe].addScaledVector(z.sh.coefficients[oe],ce);O++}else if(z.isDirectionalLight){const oe=e.get(z);if(oe.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const ee=z.shadow,X=t.get(z);X.shadowIntensity=ee.intensity,X.shadowBias=ee.bias,X.shadowNormalBias=ee.normalBias,X.shadowRadius=ee.radius,X.shadowMapSize=ee.mapSize,r.directionalShadow[S]=X,r.directionalShadowMap[S]=J,r.directionalShadowMatrix[S]=z.shadow.matrix,U++}r.directional[S]=oe,S++}else if(z.isSpotLight){const oe=e.get(z);oe.position.setFromMatrixPosition(z.matrixWorld),oe.color.copy(K).multiplyScalar(ce),oe.distance=he,oe.coneCos=Math.cos(z.angle),oe.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),oe.decay=z.decay,r.spot[b]=oe;const ee=z.shadow;if(z.map&&(r.spotLightMap[I]=z.map,I++,ee.updateMatrices(z),z.castShadow&&P++),r.spotLightMatrix[b]=ee.matrix,z.castShadow){const X=t.get(z);X.shadowIntensity=ee.intensity,X.shadowBias=ee.bias,X.shadowNormalBias=ee.normalBias,X.shadowRadius=ee.radius,X.shadowMapSize=ee.mapSize,r.spotShadow[b]=X,r.spotShadowMap[b]=J,R++}b++}else if(z.isRectAreaLight){const oe=e.get(z);oe.color.copy(K).multiplyScalar(ce),oe.halfWidth.set(z.width*.5,0,0),oe.halfHeight.set(0,z.height*.5,0),r.rectArea[y]=oe,y++}else if(z.isPointLight){const oe=e.get(z);if(oe.color.copy(z.color).multiplyScalar(z.intensity),oe.distance=z.distance,oe.decay=z.decay,z.castShadow){const ee=z.shadow,X=t.get(z);X.shadowIntensity=ee.intensity,X.shadowBias=ee.bias,X.shadowNormalBias=ee.normalBias,X.shadowRadius=ee.radius,X.shadowMapSize=ee.mapSize,X.shadowCameraNear=ee.camera.near,X.shadowCameraFar=ee.camera.far,r.pointShadow[E]=X,r.pointShadowMap[E]=J,r.pointShadowMatrix[E]=z.shadow.matrix,F++}r.point[E]=oe,E++}else if(z.isHemisphereLight){const oe=e.get(z);oe.skyColor.copy(z.color).multiplyScalar(ce),oe.groundColor.copy(z.groundColor).multiplyScalar(ce),r.hemi[x]=oe,x++}}y>0&&(s.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=De.LTC_FLOAT_1,r.rectAreaLTC2=De.LTC_FLOAT_2):(r.rectAreaLTC1=De.LTC_HALF_1,r.rectAreaLTC2=De.LTC_HALF_2)),r.ambient[0]=_,r.ambient[1]=v,r.ambient[2]=g;const T=r.hash;(T.directionalLength!==S||T.pointLength!==E||T.spotLength!==b||T.rectAreaLength!==y||T.hemiLength!==x||T.numDirectionalShadows!==U||T.numPointShadows!==F||T.numSpotShadows!==R||T.numSpotMaps!==I||T.numLightProbes!==O)&&(r.directional.length=S,r.spot.length=b,r.rectArea.length=y,r.point.length=E,r.hemi.length=x,r.directionalShadow.length=U,r.directionalShadowMap.length=U,r.pointShadow.length=F,r.pointShadowMap.length=F,r.spotShadow.length=R,r.spotShadowMap.length=R,r.directionalShadowMatrix.length=U,r.pointShadowMatrix.length=F,r.spotLightMatrix.length=R+I-P,r.spotLightMap.length=I,r.numSpotLightShadowsWithMaps=P,r.numLightProbes=O,T.directionalLength=S,T.pointLength=E,T.spotLength=b,T.rectAreaLength=y,T.hemiLength=x,T.numDirectionalShadows=U,T.numPointShadows=F,T.numSpotShadows=R,T.numSpotMaps=I,T.numLightProbes=O,r.version=bw++)}function p(d,_){let v=0,g=0,S=0,E=0,b=0;const y=_.matrixWorldInverse;for(let x=0,U=d.length;x<U;x++){const F=d[x];if(F.isDirectionalLight){const R=r.directional[v];R.direction.setFromMatrixPosition(F.matrixWorld),a.setFromMatrixPosition(F.target.matrixWorld),R.direction.sub(a),R.direction.transformDirection(y),v++}else if(F.isSpotLight){const R=r.spot[S];R.position.setFromMatrixPosition(F.matrixWorld),R.position.applyMatrix4(y),R.direction.setFromMatrixPosition(F.matrixWorld),a.setFromMatrixPosition(F.target.matrixWorld),R.direction.sub(a),R.direction.transformDirection(y),S++}else if(F.isRectAreaLight){const R=r.rectArea[E];R.position.setFromMatrixPosition(F.matrixWorld),R.position.applyMatrix4(y),c.identity(),l.copy(F.matrixWorld),l.premultiply(y),c.extractRotation(l),R.halfWidth.set(F.width*.5,0,0),R.halfHeight.set(0,F.height*.5,0),R.halfWidth.applyMatrix4(c),R.halfHeight.applyMatrix4(c),E++}else if(F.isPointLight){const R=r.point[g];R.position.setFromMatrixPosition(F.matrixWorld),R.position.applyMatrix4(y),g++}else if(F.isHemisphereLight){const R=r.hemi[b];R.direction.setFromMatrixPosition(F.matrixWorld),R.direction.transformDirection(y),b++}}}return{setup:f,setupView:p,state:r}}function a_(s){const e=new Cw(s),t=[],r=[],a=[];function l(g){v.camera=g,t.length=0,r.length=0,a.length=0}function c(g){t.push(g)}function f(g){r.push(g)}function p(g){a.push(g)}function d(){e.setup(t)}function _(g){e.setupView(t,g)}const v={lightsArray:t,shadowsArray:r,lightProbeGridArray:a,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:l,state:v,setupLights:d,setupLightsView:_,pushLight:c,pushShadow:f,pushLightProbeGrid:p}}function Pw(s){let e=new WeakMap;function t(a,l=0){const c=e.get(a);let f;return c===void 0?(f=new a_(s),e.set(a,[f])):l>=c.length?(f=new a_(s),c.push(f)):f=c[l],f}function r(){e=new WeakMap}return{get:t,dispose:r}}const Lw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Dw=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Iw=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],Nw=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],o_=new _t,uo=new q,Gf=new q;function Uw(s,e,t){let r=new td;const a=new it,l=new it,c=new Ft,f=new yy,p=new Sy,d={},_=t.maxTextureSize,v={[zr]:Gn,[Gn]:zr,[nr]:nr},g=new zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:Lw,fragmentShader:Dw}),S=g.clone();S.defines.HORIZONTAL_PASS=1;const E=new hi;E.setAttribute("position",new ci(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new fi(E,g),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=iu;let x=this.type;this.render=function(P,O,T){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||P.length===0)return;this.type===zv&&(Ze("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=iu);const L=s.getRenderTarget(),V=s.getActiveCubeFace(),z=s.getActiveMipmapLevel(),K=s.state;K.setBlending(sr),K.buffers.depth.getReversed()===!0?K.buffers.color.setClear(0,0,0,0):K.buffers.color.setClear(1,1,1,1),K.buffers.depth.setTest(!0),K.setScissorTest(!1);const ce=x!==this.type;ce&&O.traverse(function(he){he.material&&(Array.isArray(he.material)?he.material.forEach(J=>J.needsUpdate=!0):he.material.needsUpdate=!0)});for(let he=0,J=P.length;he<J;he++){const oe=P[he],ee=oe.shadow;if(ee===void 0){Ze("WebGLShadowMap:",oe,"has no shadow.");continue}if(ee.autoUpdate===!1&&ee.needsUpdate===!1)continue;a.copy(ee.mapSize);const X=ee.getFrameExtents();a.multiply(X),l.copy(ee.mapSize),(a.x>_||a.y>_)&&(a.x>_&&(l.x=Math.floor(_/X.x),a.x=l.x*X.x,ee.mapSize.x=l.x),a.y>_&&(l.y=Math.floor(_/X.y),a.y=l.y*X.y,ee.mapSize.y=l.y));const ae=s.state.buffers.depth.getReversed();if(ee.camera._reversedDepth=ae,ee.map===null||ce===!0){if(ee.map!==null&&(ee.map.depthTexture!==null&&(ee.map.depthTexture.dispose(),ee.map.depthTexture=null),ee.map.dispose()),this.type===co){if(oe.isPointLight){Ze("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}ee.map=new Bi(a.x,a.y,{format:_s,type:or,minFilter:Rn,magFilter:Rn,generateMipmaps:!1}),ee.map.texture.name=oe.name+".shadowMap",ee.map.depthTexture=new ha(a.x,a.y,li),ee.map.depthTexture.name=oe.name+".shadowMapDepth",ee.map.depthTexture.format=lr,ee.map.depthTexture.compareFunction=null,ee.map.depthTexture.minFilter=xn,ee.map.depthTexture.magFilter=xn}else oe.isPointLight?(ee.map=new G_(a.x),ee.map.depthTexture=new dy(a.x,ki)):(ee.map=new Bi(a.x,a.y),ee.map.depthTexture=new ha(a.x,a.y,ki)),ee.map.depthTexture.name=oe.name+".shadowMap",ee.map.depthTexture.format=lr,this.type===iu?(ee.map.depthTexture.compareFunction=ae?Zh:$h,ee.map.depthTexture.minFilter=Rn,ee.map.depthTexture.magFilter=Rn):(ee.map.depthTexture.compareFunction=null,ee.map.depthTexture.minFilter=xn,ee.map.depthTexture.magFilter=xn);ee.camera.updateProjectionMatrix()}const le=ee.map.isWebGLCubeRenderTarget?6:1;for(let N=0;N<le;N++){if(ee.map.isWebGLCubeRenderTarget)s.setRenderTarget(ee.map,N),s.clear();else{N===0&&(s.setRenderTarget(ee.map),s.clear());const $=ee.getViewport(N);c.set(l.x*$.x,l.y*$.y,l.x*$.z,l.y*$.w),K.viewport(c)}if(oe.isPointLight){const $=ee.camera,Ie=ee.matrix,qe=oe.distance||$.far;qe!==$.far&&($.far=qe,$.updateProjectionMatrix()),uo.setFromMatrixPosition(oe.matrixWorld),$.position.copy(uo),Gf.copy($.position),Gf.add(Iw[N]),$.up.copy(Nw[N]),$.lookAt(Gf),$.updateMatrixWorld(),Ie.makeTranslation(-uo.x,-uo.y,-uo.z),o_.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),ee._frustum.setFromProjectionMatrix(o_,$.coordinateSystem,$.reversedDepth)}else ee.updateMatrices(oe);r=ee.getFrustum(),R(O,T,ee.camera,oe,this.type)}ee.isPointLightShadow!==!0&&this.type===co&&U(ee,T),ee.needsUpdate=!1}x=this.type,y.needsUpdate=!1,s.setRenderTarget(L,V,z)};function U(P,O){const T=e.update(b);g.defines.VSM_SAMPLES!==P.blurSamples&&(g.defines.VSM_SAMPLES=P.blurSamples,S.defines.VSM_SAMPLES=P.blurSamples,g.needsUpdate=!0,S.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Bi(a.x,a.y,{format:_s,type:or})),g.uniforms.shadow_pass.value=P.map.depthTexture,g.uniforms.resolution.value=P.mapSize,g.uniforms.radius.value=P.radius,s.setRenderTarget(P.mapPass),s.clear(),s.renderBufferDirect(O,null,T,g,b,null),S.uniforms.shadow_pass.value=P.mapPass.texture,S.uniforms.resolution.value=P.mapSize,S.uniforms.radius.value=P.radius,s.setRenderTarget(P.map),s.clear(),s.renderBufferDirect(O,null,T,S,b,null)}function F(P,O,T,L){let V=null;const z=T.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(z!==void 0)V=z;else if(V=T.isPointLight===!0?p:f,s.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0||O.alphaToCoverage===!0){const K=V.uuid,ce=O.uuid;let he=d[K];he===void 0&&(he={},d[K]=he);let J=he[ce];J===void 0&&(J=V.clone(),he[ce]=J,O.addEventListener("dispose",I)),V=J}if(V.visible=O.visible,V.wireframe=O.wireframe,L===co?V.side=O.shadowSide!==null?O.shadowSide:O.side:V.side=O.shadowSide!==null?O.shadowSide:v[O.side],V.alphaMap=O.alphaMap,V.alphaTest=O.alphaToCoverage===!0?.5:O.alphaTest,V.map=O.map,V.clipShadows=O.clipShadows,V.clippingPlanes=O.clippingPlanes,V.clipIntersection=O.clipIntersection,V.displacementMap=O.displacementMap,V.displacementScale=O.displacementScale,V.displacementBias=O.displacementBias,V.wireframeLinewidth=O.wireframeLinewidth,V.linewidth=O.linewidth,T.isPointLight===!0&&V.isMeshDistanceMaterial===!0){const K=s.properties.get(V);K.light=T}return V}function R(P,O,T,L,V){if(P.visible===!1)return;if(P.layers.test(O.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&V===co)&&(!P.frustumCulled||r.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,P.matrixWorld);const ce=e.update(P),he=P.material;if(Array.isArray(he)){const J=ce.groups;for(let oe=0,ee=J.length;oe<ee;oe++){const X=J[oe],ae=he[X.materialIndex];if(ae&&ae.visible){const le=F(P,ae,L,V);P.onBeforeShadow(s,P,O,T,ce,le,X),s.renderBufferDirect(T,null,ce,le,P,X),P.onAfterShadow(s,P,O,T,ce,le,X)}}}else if(he.visible){const J=F(P,he,L,V);P.onBeforeShadow(s,P,O,T,ce,J,null),s.renderBufferDirect(T,null,ce,J,P,null),P.onAfterShadow(s,P,O,T,ce,J,null)}}const K=P.children;for(let ce=0,he=K.length;ce<he;ce++)R(K[ce],O,T,L,V)}function I(P){P.target.removeEventListener("dispose",I);for(const T in d){const L=d[T],V=P.target.uuid;V in L&&(L[V].dispose(),delete L[V])}}}function Fw(s,e){function t(){let k=!1;const we=new Ft;let de=null;const Re=new Ft(0,0,0,0);return{setMask:function(Le){de!==Le&&!k&&(s.colorMask(Le,Le,Le,Le),de=Le)},setLocked:function(Le){k=Le},setClear:function(Le,ge,He,ze,It){It===!0&&(Le*=ze,ge*=ze,He*=ze),we.set(Le,ge,He,ze),Re.equals(we)===!1&&(s.clearColor(Le,ge,He,ze),Re.copy(we))},reset:function(){k=!1,de=null,Re.set(-1,0,0,0)}}}function r(){let k=!1,we=!1,de=null,Re=null,Le=null;return{setReversed:function(ge){if(we!==ge){const He=e.get("EXT_clip_control");ge?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT),we=ge;const ze=Le;Le=null,this.setClear(ze)}},getReversed:function(){return we},setTest:function(ge){ge?pe(s.DEPTH_TEST):Ne(s.DEPTH_TEST)},setMask:function(ge){de!==ge&&!k&&(s.depthMask(ge),de=ge)},setFunc:function(ge){if(we&&(ge=Mx[ge]),Re!==ge){switch(ge){case qf:s.depthFunc(s.NEVER);break;case Kf:s.depthFunc(s.ALWAYS);break;case $f:s.depthFunc(s.LESS);break;case ua:s.depthFunc(s.LEQUAL);break;case Zf:s.depthFunc(s.EQUAL);break;case Jf:s.depthFunc(s.GEQUAL);break;case jf:s.depthFunc(s.GREATER);break;case Qf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Re=ge}},setLocked:function(ge){k=ge},setClear:function(ge){Le!==ge&&(Le=ge,we&&(ge=1-ge),s.clearDepth(ge))},reset:function(){k=!1,de=null,Re=null,Le=null,we=!1}}}function a(){let k=!1,we=null,de=null,Re=null,Le=null,ge=null,He=null,ze=null,It=null;return{setTest:function(At){k||(At?pe(s.STENCIL_TEST):Ne(s.STENCIL_TEST))},setMask:function(At){we!==At&&!k&&(s.stencilMask(At),we=At)},setFunc:function(At,Sn,Qn){(de!==At||Re!==Sn||Le!==Qn)&&(s.stencilFunc(At,Sn,Qn),de=At,Re=Sn,Le=Qn)},setOp:function(At,Sn,Qn){(ge!==At||He!==Sn||ze!==Qn)&&(s.stencilOp(At,Sn,Qn),ge=At,He=Sn,ze=Qn)},setLocked:function(At){k=At},setClear:function(At){It!==At&&(s.clearStencil(At),It=At)},reset:function(){k=!1,we=null,de=null,Re=null,Le=null,ge=null,He=null,ze=null,It=null}}}const l=new t,c=new r,f=new a,p=new WeakMap,d=new WeakMap;let _={},v={},g={},S=new WeakMap,E=[],b=null,y=!1,x=null,U=null,F=null,R=null,I=null,P=null,O=null,T=new ht(0,0,0),L=0,V=!1,z=null,K=null,ce=null,he=null,J=null;const oe=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let ee=!1,X=0;const ae=s.getParameter(s.VERSION);ae.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(ae)[1]),ee=X>=1):ae.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),ee=X>=2);let le=null,N={};const $=s.getParameter(s.SCISSOR_BOX),Ie=s.getParameter(s.VIEWPORT),qe=new Ft().fromArray($),ke=new Ft().fromArray(Ie);function ie(k,we,de,Re){const Le=new Uint8Array(4),ge=s.createTexture();s.bindTexture(k,ge),s.texParameteri(k,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(k,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let He=0;He<de;He++)k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY?s.texImage3D(we,0,s.RGBA,1,1,Re,0,s.RGBA,s.UNSIGNED_BYTE,Le):s.texImage2D(we+He,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Le);return ge}const _e={};_e[s.TEXTURE_2D]=ie(s.TEXTURE_2D,s.TEXTURE_2D,1),_e[s.TEXTURE_CUBE_MAP]=ie(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[s.TEXTURE_2D_ARRAY]=ie(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),_e[s.TEXTURE_3D]=ie(s.TEXTURE_3D,s.TEXTURE_3D,1,1),l.setClear(0,0,0,1),c.setClear(1),f.setClear(0),pe(s.DEPTH_TEST),c.setFunc(ua),Gt(!1),Jt(zm),pe(s.CULL_FACE),yt(sr);function pe(k){_[k]!==!0&&(s.enable(k),_[k]=!0)}function Ne(k){_[k]!==!1&&(s.disable(k),_[k]=!1)}function je(k,we){return g[k]!==we?(s.bindFramebuffer(k,we),g[k]=we,k===s.DRAW_FRAMEBUFFER&&(g[s.FRAMEBUFFER]=we),k===s.FRAMEBUFFER&&(g[s.DRAW_FRAMEBUFFER]=we),!0):!1}function Qe(k,we){let de=E,Re=!1;if(k){de=S.get(we),de===void 0&&(de=[],S.set(we,de));const Le=k.textures;if(de.length!==Le.length||de[0]!==s.COLOR_ATTACHMENT0){for(let ge=0,He=Le.length;ge<He;ge++)de[ge]=s.COLOR_ATTACHMENT0+ge;de.length=Le.length,Re=!0}}else de[0]!==s.BACK&&(de[0]=s.BACK,Re=!0);Re&&s.drawBuffers(de)}function Ht(k){return b!==k?(s.useProgram(k),b=k,!0):!1}const ct={[hs]:s.FUNC_ADD,[Hv]:s.FUNC_SUBTRACT,[Gv]:s.FUNC_REVERSE_SUBTRACT};ct[Wv]=s.MIN,ct[Xv]=s.MAX;const wt={[Yv]:s.ZERO,[qv]:s.ONE,[Kv]:s.SRC_COLOR,[Xf]:s.SRC_ALPHA,[ex]:s.SRC_ALPHA_SATURATE,[jv]:s.DST_COLOR,[Zv]:s.DST_ALPHA,[$v]:s.ONE_MINUS_SRC_COLOR,[Yf]:s.ONE_MINUS_SRC_ALPHA,[Qv]:s.ONE_MINUS_DST_COLOR,[Jv]:s.ONE_MINUS_DST_ALPHA,[tx]:s.CONSTANT_COLOR,[nx]:s.ONE_MINUS_CONSTANT_COLOR,[ix]:s.CONSTANT_ALPHA,[rx]:s.ONE_MINUS_CONSTANT_ALPHA};function yt(k,we,de,Re,Le,ge,He,ze,It,At){if(k===sr){y===!0&&(Ne(s.BLEND),y=!1);return}if(y===!1&&(pe(s.BLEND),y=!0),k!==Vv){if(k!==x||At!==V){if((U!==hs||I!==hs)&&(s.blendEquation(s.FUNC_ADD),U=hs,I=hs),At)switch(k){case aa:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Vm:s.blendFunc(s.ONE,s.ONE);break;case Hm:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Gm:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:st("WebGLState: Invalid blending: ",k);break}else switch(k){case aa:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Vm:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Hm:st("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Gm:st("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:st("WebGLState: Invalid blending: ",k);break}F=null,R=null,P=null,O=null,T.set(0,0,0),L=0,x=k,V=At}return}Le=Le||we,ge=ge||de,He=He||Re,(we!==U||Le!==I)&&(s.blendEquationSeparate(ct[we],ct[Le]),U=we,I=Le),(de!==F||Re!==R||ge!==P||He!==O)&&(s.blendFuncSeparate(wt[de],wt[Re],wt[ge],wt[He]),F=de,R=Re,P=ge,O=He),(ze.equals(T)===!1||It!==L)&&(s.blendColor(ze.r,ze.g,ze.b,It),T.copy(ze),L=It),x=k,V=!1}function vt(k,we){k.side===nr?Ne(s.CULL_FACE):pe(s.CULL_FACE);let de=k.side===Gn;we&&(de=!de),Gt(de),k.blending===aa&&k.transparent===!1?yt(sr):yt(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),c.setFunc(k.depthFunc),c.setTest(k.depthTest),c.setMask(k.depthWrite),l.setMask(k.colorWrite);const Re=k.stencilWrite;f.setTest(Re),Re&&(f.setMask(k.stencilWriteMask),f.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),f.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),qt(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?pe(s.SAMPLE_ALPHA_TO_COVERAGE):Ne(s.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(k){z!==k&&(k?s.frontFace(s.CW):s.frontFace(s.CCW),z=k)}function Jt(k){k!==Bv?(pe(s.CULL_FACE),k!==K&&(k===zm?s.cullFace(s.BACK):k===kv?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ne(s.CULL_FACE),K=k}function jt(k){k!==ce&&(ee&&s.lineWidth(k),ce=k)}function qt(k,we,de){k?(pe(s.POLYGON_OFFSET_FILL),(he!==we||J!==de)&&(he=we,J=de,c.getReversed()&&(we=-we),s.polygonOffset(we,de))):Ne(s.POLYGON_OFFSET_FILL)}function Rt(k){k?pe(s.SCISSOR_TEST):Ne(s.SCISSOR_TEST)}function Wt(k){k===void 0&&(k=s.TEXTURE0+oe-1),le!==k&&(s.activeTexture(k),le=k)}function G(k,we,de){de===void 0&&(le===null?de=s.TEXTURE0+oe-1:de=le);let Re=N[de];Re===void 0&&(Re={type:void 0,texture:void 0},N[de]=Re),(Re.type!==k||Re.texture!==we)&&(le!==de&&(s.activeTexture(de),le=de),s.bindTexture(k,we||_e[k]),Re.type=k,Re.texture=we)}function mn(){const k=N[le];k!==void 0&&k.type!==void 0&&(s.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function Et(){try{s.compressedTexImage2D(...arguments)}catch(k){st("WebGLState:",k)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(k){st("WebGLState:",k)}}function M(){try{s.texSubImage2D(...arguments)}catch(k){st("WebGLState:",k)}}function Y(){try{s.texSubImage3D(...arguments)}catch(k){st("WebGLState:",k)}}function ne(){try{s.compressedTexSubImage2D(...arguments)}catch(k){st("WebGLState:",k)}}function ue(){try{s.compressedTexSubImage3D(...arguments)}catch(k){st("WebGLState:",k)}}function Se(){try{s.texStorage2D(...arguments)}catch(k){st("WebGLState:",k)}}function be(){try{s.texStorage3D(...arguments)}catch(k){st("WebGLState:",k)}}function fe(){try{s.texImage2D(...arguments)}catch(k){st("WebGLState:",k)}}function me(){try{s.texImage3D(...arguments)}catch(k){st("WebGLState:",k)}}function Ce(k){return v[k]!==void 0?v[k]:s.getParameter(k)}function Xe(k,we){v[k]!==we&&(s.pixelStorei(k,we),v[k]=we)}function Pe(k){qe.equals(k)===!1&&(s.scissor(k.x,k.y,k.z,k.w),qe.copy(k))}function Ae(k){ke.equals(k)===!1&&(s.viewport(k.x,k.y,k.z,k.w),ke.copy(k))}function Je(k,we){let de=d.get(we);de===void 0&&(de=new WeakMap,d.set(we,de));let Re=de.get(k);Re===void 0&&(Re=s.getUniformBlockIndex(we,k.name),de.set(k,Re))}function et(k,we){const Re=d.get(we).get(k);p.get(we)!==Re&&(s.uniformBlockBinding(we,Re,k.__bindingPointIndex),p.set(we,Re))}function rt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),c.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),_={},v={},le=null,N={},g={},S=new WeakMap,E=[],b=null,y=!1,x=null,U=null,F=null,R=null,I=null,P=null,O=null,T=new ht(0,0,0),L=0,V=!1,z=null,K=null,ce=null,he=null,J=null,qe.set(0,0,s.canvas.width,s.canvas.height),ke.set(0,0,s.canvas.width,s.canvas.height),l.reset(),c.reset(),f.reset()}return{buffers:{color:l,depth:c,stencil:f},enable:pe,disable:Ne,bindFramebuffer:je,drawBuffers:Qe,useProgram:Ht,setBlending:yt,setMaterial:vt,setFlipSided:Gt,setCullFace:Jt,setLineWidth:jt,setPolygonOffset:qt,setScissorTest:Rt,activeTexture:Wt,bindTexture:G,unbindTexture:mn,compressedTexImage2D:Et,compressedTexImage3D:C,texImage2D:fe,texImage3D:me,pixelStorei:Xe,getParameter:Ce,updateUBOMapping:Je,uniformBlockBinding:et,texStorage2D:Se,texStorage3D:be,texSubImage2D:M,texSubImage3D:Y,compressedTexSubImage2D:ne,compressedTexSubImage3D:ue,scissor:Pe,viewport:Ae,reset:rt}}function Ow(s,e,t,r,a,l,c){const f=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new it,_=new WeakMap,v=new Set;let g;const S=new WeakMap;let E=!1;try{E=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(C,M){return E?new OffscreenCanvas(C,M):vo("canvas")}function y(C,M,Y){let ne=1;const ue=Et(C);if((ue.width>Y||ue.height>Y)&&(ne=Y/Math.max(ue.width,ue.height)),ne<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Se=Math.floor(ne*ue.width),be=Math.floor(ne*ue.height);g===void 0&&(g=b(Se,be));const fe=M?b(Se,be):g;return fe.width=Se,fe.height=be,fe.getContext("2d").drawImage(C,0,0,Se,be),Ze("WebGLRenderer: Texture has been resized from ("+ue.width+"x"+ue.height+") to ("+Se+"x"+be+")."),fe}else return"data"in C&&Ze("WebGLRenderer: Image in DataTexture is too big ("+ue.width+"x"+ue.height+")."),C;return C}function x(C){return C.generateMipmaps}function U(C){s.generateMipmap(C)}function F(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function R(C,M,Y,ne,ue,Se=!1){if(C!==null){if(s[C]!==void 0)return s[C];Ze("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let be;ne&&(be=e.get("EXT_texture_norm16"),be||Ze("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let fe=M;if(M===s.RED&&(Y===s.FLOAT&&(fe=s.R32F),Y===s.HALF_FLOAT&&(fe=s.R16F),Y===s.UNSIGNED_BYTE&&(fe=s.R8),Y===s.UNSIGNED_SHORT&&be&&(fe=be.R16_EXT),Y===s.SHORT&&be&&(fe=be.R16_SNORM_EXT)),M===s.RED_INTEGER&&(Y===s.UNSIGNED_BYTE&&(fe=s.R8UI),Y===s.UNSIGNED_SHORT&&(fe=s.R16UI),Y===s.UNSIGNED_INT&&(fe=s.R32UI),Y===s.BYTE&&(fe=s.R8I),Y===s.SHORT&&(fe=s.R16I),Y===s.INT&&(fe=s.R32I)),M===s.RG&&(Y===s.FLOAT&&(fe=s.RG32F),Y===s.HALF_FLOAT&&(fe=s.RG16F),Y===s.UNSIGNED_BYTE&&(fe=s.RG8),Y===s.UNSIGNED_SHORT&&be&&(fe=be.RG16_EXT),Y===s.SHORT&&be&&(fe=be.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(Y===s.UNSIGNED_BYTE&&(fe=s.RG8UI),Y===s.UNSIGNED_SHORT&&(fe=s.RG16UI),Y===s.UNSIGNED_INT&&(fe=s.RG32UI),Y===s.BYTE&&(fe=s.RG8I),Y===s.SHORT&&(fe=s.RG16I),Y===s.INT&&(fe=s.RG32I)),M===s.RGB_INTEGER&&(Y===s.UNSIGNED_BYTE&&(fe=s.RGB8UI),Y===s.UNSIGNED_SHORT&&(fe=s.RGB16UI),Y===s.UNSIGNED_INT&&(fe=s.RGB32UI),Y===s.BYTE&&(fe=s.RGB8I),Y===s.SHORT&&(fe=s.RGB16I),Y===s.INT&&(fe=s.RGB32I)),M===s.RGBA_INTEGER&&(Y===s.UNSIGNED_BYTE&&(fe=s.RGBA8UI),Y===s.UNSIGNED_SHORT&&(fe=s.RGBA16UI),Y===s.UNSIGNED_INT&&(fe=s.RGBA32UI),Y===s.BYTE&&(fe=s.RGBA8I),Y===s.SHORT&&(fe=s.RGBA16I),Y===s.INT&&(fe=s.RGBA32I)),M===s.RGB&&(Y===s.UNSIGNED_SHORT&&be&&(fe=be.RGB16_EXT),Y===s.SHORT&&be&&(fe=be.RGB16_SNORM_EXT),Y===s.UNSIGNED_INT_5_9_9_9_REV&&(fe=s.RGB9_E5),Y===s.UNSIGNED_INT_10F_11F_11F_REV&&(fe=s.R11F_G11F_B10F)),M===s.RGBA){const me=Se?pu:xt.getTransfer(ue);Y===s.FLOAT&&(fe=s.RGBA32F),Y===s.HALF_FLOAT&&(fe=s.RGBA16F),Y===s.UNSIGNED_BYTE&&(fe=me===Lt?s.SRGB8_ALPHA8:s.RGBA8),Y===s.UNSIGNED_SHORT&&be&&(fe=be.RGBA16_EXT),Y===s.SHORT&&be&&(fe=be.RGBA16_SNORM_EXT),Y===s.UNSIGNED_SHORT_4_4_4_4&&(fe=s.RGBA4),Y===s.UNSIGNED_SHORT_5_5_5_1&&(fe=s.RGB5_A1)}return(fe===s.R16F||fe===s.R32F||fe===s.RG16F||fe===s.RG32F||fe===s.RGBA16F||fe===s.RGBA32F)&&e.get("EXT_color_buffer_float"),fe}function I(C,M){let Y;return C?M===null||M===ki||M===go?Y=s.DEPTH24_STENCIL8:M===li?Y=s.DEPTH32F_STENCIL8:M===mo&&(Y=s.DEPTH24_STENCIL8,Ze("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ki||M===go?Y=s.DEPTH_COMPONENT24:M===li?Y=s.DEPTH_COMPONENT32F:M===mo&&(Y=s.DEPTH_COMPONENT16),Y}function P(C,M){return x(C)===!0||C.isFramebufferTexture&&C.minFilter!==xn&&C.minFilter!==Rn?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function O(C){const M=C.target;M.removeEventListener("dispose",O),L(M),M.isVideoTexture&&_.delete(M),M.isHTMLTexture&&v.delete(M)}function T(C){const M=C.target;M.removeEventListener("dispose",T),z(M)}function L(C){const M=r.get(C);if(M.__webglInit===void 0)return;const Y=C.source,ne=S.get(Y);if(ne){const ue=ne[M.__cacheKey];ue.usedTimes--,ue.usedTimes===0&&V(C),Object.keys(ne).length===0&&S.delete(Y)}r.remove(C)}function V(C){const M=r.get(C);s.deleteTexture(M.__webglTexture);const Y=C.source,ne=S.get(Y);delete ne[M.__cacheKey],c.memory.textures--}function z(C){const M=r.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),r.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(M.__webglFramebuffer[ne]))for(let ue=0;ue<M.__webglFramebuffer[ne].length;ue++)s.deleteFramebuffer(M.__webglFramebuffer[ne][ue]);else s.deleteFramebuffer(M.__webglFramebuffer[ne]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[ne])}else{if(Array.isArray(M.__webglFramebuffer))for(let ne=0;ne<M.__webglFramebuffer.length;ne++)s.deleteFramebuffer(M.__webglFramebuffer[ne]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let ne=0;ne<M.__webglColorRenderbuffer.length;ne++)M.__webglColorRenderbuffer[ne]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[ne]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const Y=C.textures;for(let ne=0,ue=Y.length;ne<ue;ne++){const Se=r.get(Y[ne]);Se.__webglTexture&&(s.deleteTexture(Se.__webglTexture),c.memory.textures--),r.remove(Y[ne])}r.remove(C)}let K=0;function ce(){K=0}function he(){return K}function J(C){K=C}function oe(){const C=K;return C>=a.maxTextures&&Ze("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+a.maxTextures),K+=1,C}function ee(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function X(C,M){const Y=r.get(C);if(C.isVideoTexture&&G(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&Y.__version!==C.version){const ne=C.image;if(ne===null)Ze("WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)Ze("WebGLRenderer: Texture marked for update but image is incomplete");else{Ne(Y,C,M);return}}else C.isExternalTexture&&(Y.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,Y.__webglTexture,s.TEXTURE0+M)}function ae(C,M){const Y=r.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&Y.__version!==C.version){Ne(Y,C,M);return}else C.isExternalTexture&&(Y.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,Y.__webglTexture,s.TEXTURE0+M)}function le(C,M){const Y=r.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&Y.__version!==C.version){Ne(Y,C,M);return}t.bindTexture(s.TEXTURE_3D,Y.__webglTexture,s.TEXTURE0+M)}function N(C,M){const Y=r.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&Y.__version!==C.version){je(Y,C,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture,s.TEXTURE0+M)}const $={[eh]:s.REPEAT,[ir]:s.CLAMP_TO_EDGE,[th]:s.MIRRORED_REPEAT},Ie={[xn]:s.NEAREST,[lx]:s.NEAREST_MIPMAP_NEAREST,[Al]:s.NEAREST_MIPMAP_LINEAR,[Rn]:s.LINEAR,[uf]:s.LINEAR_MIPMAP_NEAREST,[ps]:s.LINEAR_MIPMAP_LINEAR},qe={[hx]:s.NEVER,[_x]:s.ALWAYS,[dx]:s.LESS,[$h]:s.LEQUAL,[px]:s.EQUAL,[Zh]:s.GEQUAL,[mx]:s.GREATER,[gx]:s.NOTEQUAL};function ke(C,M){if(M.type===li&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Rn||M.magFilter===uf||M.magFilter===Al||M.magFilter===ps||M.minFilter===Rn||M.minFilter===uf||M.minFilter===Al||M.minFilter===ps)&&Ze("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,$[M.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,$[M.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,$[M.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,Ie[M.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,Ie[M.minFilter]),M.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,qe[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===xn||M.minFilter!==Al&&M.minFilter!==ps||M.type===li&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||r.get(M).__currentAnisotropy){const Y=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,a.getMaxAnisotropy())),r.get(M).__currentAnisotropy=M.anisotropy}}}function ie(C,M){let Y=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",O));const ne=M.source;let ue=S.get(ne);ue===void 0&&(ue={},S.set(ne,ue));const Se=ee(M);if(Se!==C.__cacheKey){ue[Se]===void 0&&(ue[Se]={texture:s.createTexture(),usedTimes:0},c.memory.textures++,Y=!0),ue[Se].usedTimes++;const be=ue[C.__cacheKey];be!==void 0&&(ue[C.__cacheKey].usedTimes--,be.usedTimes===0&&V(M)),C.__cacheKey=Se,C.__webglTexture=ue[Se].texture}return Y}function _e(C,M,Y){return Math.floor(Math.floor(C/Y)/M)}function pe(C,M,Y,ne){const Se=C.updateRanges;if(Se.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,Y,ne,M.data);else{Se.sort((Xe,Pe)=>Xe.start-Pe.start);let be=0;for(let Xe=1;Xe<Se.length;Xe++){const Pe=Se[be],Ae=Se[Xe],Je=Pe.start+Pe.count,et=_e(Ae.start,M.width,4),rt=_e(Pe.start,M.width,4);Ae.start<=Je+1&&et===rt&&_e(Ae.start+Ae.count-1,M.width,4)===et?Pe.count=Math.max(Pe.count,Ae.start+Ae.count-Pe.start):(++be,Se[be]=Ae)}Se.length=be+1;const fe=t.getParameter(s.UNPACK_ROW_LENGTH),me=t.getParameter(s.UNPACK_SKIP_PIXELS),Ce=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let Xe=0,Pe=Se.length;Xe<Pe;Xe++){const Ae=Se[Xe],Je=Math.floor(Ae.start/4),et=Math.ceil(Ae.count/4),rt=Je%M.width,k=Math.floor(Je/M.width),we=et,de=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,rt),t.pixelStorei(s.UNPACK_SKIP_ROWS,k),t.texSubImage2D(s.TEXTURE_2D,0,rt,k,we,de,Y,ne,M.data)}C.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,fe),t.pixelStorei(s.UNPACK_SKIP_PIXELS,me),t.pixelStorei(s.UNPACK_SKIP_ROWS,Ce)}}function Ne(C,M,Y){let ne=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ne=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ne=s.TEXTURE_3D);const ue=ie(C,M),Se=M.source;t.bindTexture(ne,C.__webglTexture,s.TEXTURE0+Y);const be=r.get(Se);if(Se.version!==be.__version||ue===!0){if(t.activeTexture(s.TEXTURE0+Y),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const de=xt.getPrimaries(xt.workingColorSpace),Re=M.colorSpace===Br?null:xt.getPrimaries(M.colorSpace),Le=M.colorSpace===Br||de===Re?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le)}t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let me=y(M.image,!1,a.maxTextureSize);me=mn(M,me);const Ce=l.convert(M.format,M.colorSpace),Xe=l.convert(M.type);let Pe=R(M.internalFormat,Ce,Xe,M.normalized,M.colorSpace,M.isVideoTexture);ke(ne,M);let Ae;const Je=M.mipmaps,et=M.isVideoTexture!==!0,rt=be.__version===void 0||ue===!0,k=Se.dataReady,we=P(M,me);if(M.isDepthTexture)Pe=I(M.format===ms,M.type),rt&&(et?t.texStorage2D(s.TEXTURE_2D,1,Pe,me.width,me.height):t.texImage2D(s.TEXTURE_2D,0,Pe,me.width,me.height,0,Ce,Xe,null));else if(M.isDataTexture)if(Je.length>0){et&&rt&&t.texStorage2D(s.TEXTURE_2D,we,Pe,Je[0].width,Je[0].height);for(let de=0,Re=Je.length;de<Re;de++)Ae=Je[de],et?k&&t.texSubImage2D(s.TEXTURE_2D,de,0,0,Ae.width,Ae.height,Ce,Xe,Ae.data):t.texImage2D(s.TEXTURE_2D,de,Pe,Ae.width,Ae.height,0,Ce,Xe,Ae.data);M.generateMipmaps=!1}else et?(rt&&t.texStorage2D(s.TEXTURE_2D,we,Pe,me.width,me.height),k&&pe(M,me,Ce,Xe)):t.texImage2D(s.TEXTURE_2D,0,Pe,me.width,me.height,0,Ce,Xe,me.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){et&&rt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,we,Pe,Je[0].width,Je[0].height,me.depth);for(let de=0,Re=Je.length;de<Re;de++)if(Ae=Je[de],M.format!==ui)if(Ce!==null)if(et){if(k)if(M.layerUpdates.size>0){const Le=Fh(Ae.width,Ae.height,M.format,M.type);for(const ge of M.layerUpdates){const He=Ae.data.subarray(ge*Le/Ae.data.BYTES_PER_ELEMENT,(ge+1)*Le/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,de,0,0,ge,Ae.width,Ae.height,1,Ce,He)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,de,0,0,0,Ae.width,Ae.height,me.depth,Ce,Ae.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,de,Pe,Ae.width,Ae.height,me.depth,0,Ae.data,0,0);else Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else et?k&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,de,0,0,0,Ae.width,Ae.height,me.depth,Ce,Xe,Ae.data):t.texImage3D(s.TEXTURE_2D_ARRAY,de,Pe,Ae.width,Ae.height,me.depth,0,Ce,Xe,Ae.data)}else{et&&rt&&t.texStorage2D(s.TEXTURE_2D,we,Pe,Je[0].width,Je[0].height);for(let de=0,Re=Je.length;de<Re;de++)Ae=Je[de],M.format!==ui?Ce!==null?et?k&&t.compressedTexSubImage2D(s.TEXTURE_2D,de,0,0,Ae.width,Ae.height,Ce,Ae.data):t.compressedTexImage2D(s.TEXTURE_2D,de,Pe,Ae.width,Ae.height,0,Ae.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):et?k&&t.texSubImage2D(s.TEXTURE_2D,de,0,0,Ae.width,Ae.height,Ce,Xe,Ae.data):t.texImage2D(s.TEXTURE_2D,de,Pe,Ae.width,Ae.height,0,Ce,Xe,Ae.data)}else if(M.isDataArrayTexture)if(et){if(rt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,we,Pe,me.width,me.height,me.depth),k)if(M.layerUpdates.size>0){const de=Fh(me.width,me.height,M.format,M.type);for(const Re of M.layerUpdates){const Le=me.data.subarray(Re*de/me.data.BYTES_PER_ELEMENT,(Re+1)*de/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Re,me.width,me.height,1,Ce,Xe,Le)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,Ce,Xe,me.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Pe,me.width,me.height,me.depth,0,Ce,Xe,me.data);else if(M.isData3DTexture)et?(rt&&t.texStorage3D(s.TEXTURE_3D,we,Pe,me.width,me.height,me.depth),k&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,Ce,Xe,me.data)):t.texImage3D(s.TEXTURE_3D,0,Pe,me.width,me.height,me.depth,0,Ce,Xe,me.data);else if(M.isFramebufferTexture){if(rt)if(et)t.texStorage2D(s.TEXTURE_2D,we,Pe,me.width,me.height);else{let de=me.width,Re=me.height;for(let Le=0;Le<we;Le++)t.texImage2D(s.TEXTURE_2D,Le,Pe,de,Re,0,Ce,Xe,null),de>>=1,Re>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){const de=s.canvas;if(de.hasAttribute("layoutsubtree")||de.setAttribute("layoutsubtree","true"),me.parentNode!==de){de.appendChild(me),v.add(M),de.onpaint=Re=>{const Le=Re.changedElements;for(const ge of v)Le.includes(ge.image)&&(ge.needsUpdate=!0)},de.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,me);else{const Le=s.RGBA,ge=s.RGBA,He=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Le,ge,He,me)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Je.length>0){if(et&&rt){const de=Et(Je[0]);t.texStorage2D(s.TEXTURE_2D,we,Pe,de.width,de.height)}for(let de=0,Re=Je.length;de<Re;de++)Ae=Je[de],et?k&&t.texSubImage2D(s.TEXTURE_2D,de,0,0,Ce,Xe,Ae):t.texImage2D(s.TEXTURE_2D,de,Pe,Ce,Xe,Ae);M.generateMipmaps=!1}else if(et){if(rt){const de=Et(me);t.texStorage2D(s.TEXTURE_2D,we,Pe,de.width,de.height)}k&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ce,Xe,me)}else t.texImage2D(s.TEXTURE_2D,0,Pe,Ce,Xe,me);x(M)&&U(ne),be.__version=Se.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function je(C,M,Y){if(M.image.length!==6)return;const ne=ie(C,M),ue=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+Y);const Se=r.get(ue);if(ue.version!==Se.__version||ne===!0){t.activeTexture(s.TEXTURE0+Y);const be=xt.getPrimaries(xt.workingColorSpace),fe=M.colorSpace===Br?null:xt.getPrimaries(M.colorSpace),me=M.colorSpace===Br||be===fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Ce=M.isCompressedTexture||M.image[0].isCompressedTexture,Xe=M.image[0]&&M.image[0].isDataTexture,Pe=[];for(let ge=0;ge<6;ge++)!Ce&&!Xe?Pe[ge]=y(M.image[ge],!0,a.maxCubemapSize):Pe[ge]=Xe?M.image[ge].image:M.image[ge],Pe[ge]=mn(M,Pe[ge]);const Ae=Pe[0],Je=l.convert(M.format,M.colorSpace),et=l.convert(M.type),rt=R(M.internalFormat,Je,et,M.normalized,M.colorSpace),k=M.isVideoTexture!==!0,we=Se.__version===void 0||ne===!0,de=ue.dataReady;let Re=P(M,Ae);ke(s.TEXTURE_CUBE_MAP,M);let Le;if(Ce){k&&we&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Re,rt,Ae.width,Ae.height);for(let ge=0;ge<6;ge++){Le=Pe[ge].mipmaps;for(let He=0;He<Le.length;He++){const ze=Le[He];M.format!==ui?Je!==null?k?de&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,He,0,0,ze.width,ze.height,Je,ze.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,He,rt,ze.width,ze.height,0,ze.data):Ze("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?de&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,He,0,0,ze.width,ze.height,Je,et,ze.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,He,rt,ze.width,ze.height,0,Je,et,ze.data)}}}else{if(Le=M.mipmaps,k&&we){Le.length>0&&Re++;const ge=Et(Pe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Re,rt,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if(Xe){k?de&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Pe[ge].width,Pe[ge].height,Je,et,Pe[ge].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,rt,Pe[ge].width,Pe[ge].height,0,Je,et,Pe[ge].data);for(let He=0;He<Le.length;He++){const It=Le[He].image[ge].image;k?de&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,He+1,0,0,It.width,It.height,Je,et,It.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,He+1,rt,It.width,It.height,0,Je,et,It.data)}}else{k?de&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Je,et,Pe[ge]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,rt,Je,et,Pe[ge]);for(let He=0;He<Le.length;He++){const ze=Le[He];k?de&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,He+1,0,0,Je,et,ze.image[ge]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ge,He+1,rt,Je,et,ze.image[ge])}}}x(M)&&U(s.TEXTURE_CUBE_MAP),Se.__version=ue.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Qe(C,M,Y,ne,ue,Se){const be=l.convert(Y.format,Y.colorSpace),fe=l.convert(Y.type),me=R(Y.internalFormat,be,fe,Y.normalized,Y.colorSpace),Ce=r.get(M),Xe=r.get(Y);if(Xe.__renderTarget=M,!Ce.__hasExternalTextures){const Pe=Math.max(1,M.width>>Se),Ae=Math.max(1,M.height>>Se);ue===s.TEXTURE_3D||ue===s.TEXTURE_2D_ARRAY?t.texImage3D(ue,Se,me,Pe,Ae,M.depth,0,be,fe,null):t.texImage2D(ue,Se,me,Pe,Ae,0,be,fe,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),Wt(M)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ne,ue,Xe.__webglTexture,0,Rt(M)):(ue===s.TEXTURE_2D||ue>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ue<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ne,ue,Xe.__webglTexture,Se),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ht(C,M,Y){if(s.bindRenderbuffer(s.RENDERBUFFER,C),M.depthBuffer){const ne=M.depthTexture,ue=ne&&ne.isDepthTexture?ne.type:null,Se=I(M.stencilBuffer,ue),be=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Wt(M)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Rt(M),Se,M.width,M.height):Y?s.renderbufferStorageMultisample(s.RENDERBUFFER,Rt(M),Se,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,Se,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,be,s.RENDERBUFFER,C)}else{const ne=M.textures;for(let ue=0;ue<ne.length;ue++){const Se=ne[ue],be=l.convert(Se.format,Se.colorSpace),fe=l.convert(Se.type),me=R(Se.internalFormat,be,fe,Se.normalized,Se.colorSpace);Wt(M)?f.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Rt(M),me,M.width,M.height):Y?s.renderbufferStorageMultisample(s.RENDERBUFFER,Rt(M),me,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,me,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ct(C,M,Y){const ne=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ue=r.get(M.depthTexture);if(ue.__renderTarget=M,(!ue.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),ne){if(ue.__webglInit===void 0&&(ue.__webglInit=!0,M.depthTexture.addEventListener("dispose",O)),ue.__webglTexture===void 0){ue.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,ue.__webglTexture),ke(s.TEXTURE_CUBE_MAP,M.depthTexture);const Ce=l.convert(M.depthTexture.format),Xe=l.convert(M.depthTexture.type);let Pe;M.depthTexture.format===lr?Pe=s.DEPTH_COMPONENT24:M.depthTexture.format===ms&&(Pe=s.DEPTH24_STENCIL8);for(let Ae=0;Ae<6;Ae++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,Pe,M.width,M.height,0,Ce,Xe,null)}}else X(M.depthTexture,0);const Se=ue.__webglTexture,be=Rt(M),fe=ne?s.TEXTURE_CUBE_MAP_POSITIVE_X+Y:s.TEXTURE_2D,me=M.depthTexture.format===ms?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===lr)Wt(M)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,me,fe,Se,0,be):s.framebufferTexture2D(s.FRAMEBUFFER,me,fe,Se,0);else if(M.depthTexture.format===ms)Wt(M)?f.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,me,fe,Se,0,be):s.framebufferTexture2D(s.FRAMEBUFFER,me,fe,Se,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function wt(C){const M=r.get(C),Y=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){const ne=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ne){const ue=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ne.removeEventListener("dispose",ue)};ne.addEventListener("dispose",ue),M.__depthDisposeCallback=ue}M.__boundDepthTexture=ne}if(C.depthTexture&&!M.__autoAllocateDepthBuffer)if(Y)for(let ne=0;ne<6;ne++)ct(M.__webglFramebuffer[ne],C,ne);else{const ne=C.texture.mipmaps;ne&&ne.length>0?ct(M.__webglFramebuffer[0],C,0):ct(M.__webglFramebuffer,C,0)}else if(Y){M.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[ne]),M.__webglDepthbuffer[ne]===void 0)M.__webglDepthbuffer[ne]=s.createRenderbuffer(),Ht(M.__webglDepthbuffer[ne],C,!1);else{const ue=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Se=M.__webglDepthbuffer[ne];s.bindRenderbuffer(s.RENDERBUFFER,Se),s.framebufferRenderbuffer(s.FRAMEBUFFER,ue,s.RENDERBUFFER,Se)}}else{const ne=C.texture.mipmaps;if(ne&&ne.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),Ht(M.__webglDepthbuffer,C,!1);else{const ue=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Se=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,Se),s.framebufferRenderbuffer(s.FRAMEBUFFER,ue,s.RENDERBUFFER,Se)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function yt(C,M,Y){const ne=r.get(C);M!==void 0&&Qe(ne.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Y!==void 0&&wt(C)}function vt(C){const M=C.texture,Y=r.get(C),ne=r.get(M);C.addEventListener("dispose",T);const ue=C.textures,Se=C.isWebGLCubeRenderTarget===!0,be=ue.length>1;if(be||(ne.__webglTexture===void 0&&(ne.__webglTexture=s.createTexture()),ne.__version=M.version,c.memory.textures++),Se){Y.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0){Y.__webglFramebuffer[fe]=[];for(let me=0;me<M.mipmaps.length;me++)Y.__webglFramebuffer[fe][me]=s.createFramebuffer()}else Y.__webglFramebuffer[fe]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){Y.__webglFramebuffer=[];for(let fe=0;fe<M.mipmaps.length;fe++)Y.__webglFramebuffer[fe]=s.createFramebuffer()}else Y.__webglFramebuffer=s.createFramebuffer();if(be)for(let fe=0,me=ue.length;fe<me;fe++){const Ce=r.get(ue[fe]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=s.createTexture(),c.memory.textures++)}if(C.samples>0&&Wt(C)===!1){Y.__webglMultisampledFramebuffer=s.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let fe=0;fe<ue.length;fe++){const me=ue[fe];Y.__webglColorRenderbuffer[fe]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Y.__webglColorRenderbuffer[fe]);const Ce=l.convert(me.format,me.colorSpace),Xe=l.convert(me.type),Pe=R(me.internalFormat,Ce,Xe,me.normalized,me.colorSpace,C.isXRRenderTarget===!0),Ae=Rt(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ae,Pe,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+fe,s.RENDERBUFFER,Y.__webglColorRenderbuffer[fe])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(Y.__webglDepthRenderbuffer=s.createRenderbuffer(),Ht(Y.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Se){t.bindTexture(s.TEXTURE_CUBE_MAP,ne.__webglTexture),ke(s.TEXTURE_CUBE_MAP,M);for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0)for(let me=0;me<M.mipmaps.length;me++)Qe(Y.__webglFramebuffer[fe][me],C,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,me);else Qe(Y.__webglFramebuffer[fe],C,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);x(M)&&U(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let fe=0,me=ue.length;fe<me;fe++){const Ce=ue[fe],Xe=r.get(Ce);let Pe=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Pe=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Pe,Xe.__webglTexture),ke(Pe,Ce),Qe(Y.__webglFramebuffer,C,Ce,s.COLOR_ATTACHMENT0+fe,Pe,0),x(Ce)&&U(Pe)}t.unbindTexture()}else{let fe=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(fe=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(fe,ne.__webglTexture),ke(fe,M),M.mipmaps&&M.mipmaps.length>0)for(let me=0;me<M.mipmaps.length;me++)Qe(Y.__webglFramebuffer[me],C,M,s.COLOR_ATTACHMENT0,fe,me);else Qe(Y.__webglFramebuffer,C,M,s.COLOR_ATTACHMENT0,fe,0);x(M)&&U(fe),t.unbindTexture()}C.depthBuffer&&wt(C)}function Gt(C){const M=C.textures;for(let Y=0,ne=M.length;Y<ne;Y++){const ue=M[Y];if(x(ue)){const Se=F(C),be=r.get(ue).__webglTexture;t.bindTexture(Se,be),U(Se),t.unbindTexture()}}}const Jt=[],jt=[];function qt(C){if(C.samples>0){if(Wt(C)===!1){const M=C.textures,Y=C.width,ne=C.height;let ue=s.COLOR_BUFFER_BIT;const Se=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=r.get(C),fe=M.length>1;if(fe)for(let Ce=0;Ce<M.length;Ce++)t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const me=C.texture.mipmaps;me&&me.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Ce=0;Ce<M.length;Ce++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ue|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ue|=s.STENCIL_BUFFER_BIT)),fe){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,be.__webglColorRenderbuffer[Ce]);const Xe=r.get(M[Ce]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Xe,0)}s.blitFramebuffer(0,0,Y,ne,0,0,Y,ne,ue,s.NEAREST),p===!0&&(Jt.length=0,jt.length=0,Jt.push(s.COLOR_ATTACHMENT0+Ce),C.depthBuffer&&C.resolveDepthBuffer===!1&&(Jt.push(Se),jt.push(Se),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,jt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Jt))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),fe)for(let Ce=0;Ce<M.length;Ce++){t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,be.__webglColorRenderbuffer[Ce]);const Xe=r.get(M[Ce]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,Xe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&p){const M=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function Rt(C){return Math.min(a.maxSamples,C.samples)}function Wt(C){const M=r.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function G(C){const M=c.render.frame;_.get(C)!==M&&(_.set(C,M),C.update())}function mn(C,M){const Y=C.colorSpace,ne=C.format,ue=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||Y!==du&&Y!==Br&&(xt.getTransfer(Y)===Lt?(ne!==ui||ue!==jn)&&Ze("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):st("WebGLTextures: Unsupported texture color space:",Y)),M}function Et(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(d.width=C.naturalWidth||C.width,d.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(d.width=C.displayWidth,d.height=C.displayHeight):(d.width=C.width,d.height=C.height),d}this.allocateTextureUnit=oe,this.resetTextureUnits=ce,this.getTextureUnits=he,this.setTextureUnits=J,this.setTexture2D=X,this.setTexture2DArray=ae,this.setTexture3D=le,this.setTextureCube=N,this.rebindTextures=yt,this.setupRenderTarget=vt,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=qt,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=Qe,this.useMultisampledRTT=Wt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Bw(s,e){function t(r,a=Br){let l;const c=xt.getTransfer(a);if(r===jn)return s.UNSIGNED_BYTE;if(r===Gh)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Wh)return s.UNSIGNED_SHORT_5_5_5_1;if(r===S_)return s.UNSIGNED_INT_5_9_9_9_REV;if(r===M_)return s.UNSIGNED_INT_10F_11F_11F_REV;if(r===x_)return s.BYTE;if(r===y_)return s.SHORT;if(r===mo)return s.UNSIGNED_SHORT;if(r===Hh)return s.INT;if(r===ki)return s.UNSIGNED_INT;if(r===li)return s.FLOAT;if(r===or)return s.HALF_FLOAT;if(r===E_)return s.ALPHA;if(r===T_)return s.RGB;if(r===ui)return s.RGBA;if(r===lr)return s.DEPTH_COMPONENT;if(r===ms)return s.DEPTH_STENCIL;if(r===Xh)return s.RED;if(r===Yh)return s.RED_INTEGER;if(r===_s)return s.RG;if(r===qh)return s.RG_INTEGER;if(r===Kh)return s.RGBA_INTEGER;if(r===ru||r===su||r===au||r===ou)if(c===Lt)if(l=e.get("WEBGL_compressed_texture_s3tc_srgb"),l!==null){if(r===ru)return l.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===su)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===au)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ou)return l.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(l=e.get("WEBGL_compressed_texture_s3tc"),l!==null){if(r===ru)return l.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===su)return l.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===au)return l.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ou)return l.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===nh||r===ih||r===rh||r===sh)if(l=e.get("WEBGL_compressed_texture_pvrtc"),l!==null){if(r===nh)return l.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ih)return l.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===rh)return l.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===sh)return l.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===ah||r===oh||r===lh||r===uh||r===ch||r===uu||r===fh)if(l=e.get("WEBGL_compressed_texture_etc"),l!==null){if(r===ah||r===oh)return c===Lt?l.COMPRESSED_SRGB8_ETC2:l.COMPRESSED_RGB8_ETC2;if(r===lh)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:l.COMPRESSED_RGBA8_ETC2_EAC;if(r===uh)return l.COMPRESSED_R11_EAC;if(r===ch)return l.COMPRESSED_SIGNED_R11_EAC;if(r===uu)return l.COMPRESSED_RG11_EAC;if(r===fh)return l.COMPRESSED_SIGNED_RG11_EAC}else return null;if(r===hh||r===dh||r===ph||r===mh||r===gh||r===_h||r===vh||r===xh||r===yh||r===Sh||r===Mh||r===Eh||r===Th||r===wh)if(l=e.get("WEBGL_compressed_texture_astc"),l!==null){if(r===hh)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:l.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===dh)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:l.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===ph)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:l.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===mh)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:l.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===gh)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:l.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===_h)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:l.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===vh)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:l.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===xh)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:l.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===yh)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:l.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Sh)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:l.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Mh)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:l.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Eh)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:l.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Th)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:l.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===wh)return c===Lt?l.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:l.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ah||r===bh||r===Rh)if(l=e.get("EXT_texture_compression_bptc"),l!==null){if(r===Ah)return c===Lt?l.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:l.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===bh)return l.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Rh)return l.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Ch||r===Ph||r===cu||r===Lh)if(l=e.get("EXT_texture_compression_rgtc"),l!==null){if(r===Ch)return l.COMPRESSED_RED_RGTC1_EXT;if(r===Ph)return l.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===cu)return l.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Lh)return l.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===go?s.UNSIGNED_INT_24_8:s[r]!==void 0?s[r]:null}return{convert:t}}const kw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Vw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const r=new U_(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,r=new zi({vertexShader:kw,fragmentShader:zw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new fi(new yu(20,20),r)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Hw extends Vr{constructor(e,t){super();const r=this;let a=null,l=1,c=null,f="local-floor",p=1,d=null,_=null,v=null,g=null,S=null,E=null;const b=typeof XRWebGLBinding<"u",y=new Vw,x={},U=t.getContextAttributes();let F=null,R=null;const I=[],P=[],O=new it;let T=null;const L=new Jn;L.viewport=new Ft;const V=new Jn;V.viewport=new Ft;const z=[L,V],K=new ky;let ce=null,he=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let _e=I[ie];return _e===void 0&&(_e=new gf,I[ie]=_e),_e.getTargetRaySpace()},this.getControllerGrip=function(ie){let _e=I[ie];return _e===void 0&&(_e=new gf,I[ie]=_e),_e.getGripSpace()},this.getHand=function(ie){let _e=I[ie];return _e===void 0&&(_e=new gf,I[ie]=_e),_e.getHandSpace()};function J(ie){const _e=P.indexOf(ie.inputSource);if(_e===-1)return;const pe=I[_e];pe!==void 0&&(pe.update(ie.inputSource,ie.frame,d||c),pe.dispatchEvent({type:ie.type,data:ie.inputSource}))}function oe(){a.removeEventListener("select",J),a.removeEventListener("selectstart",J),a.removeEventListener("selectend",J),a.removeEventListener("squeeze",J),a.removeEventListener("squeezestart",J),a.removeEventListener("squeezeend",J),a.removeEventListener("end",oe),a.removeEventListener("inputsourceschange",ee);for(let ie=0;ie<I.length;ie++){const _e=P[ie];_e!==null&&(P[ie]=null,I[ie].disconnect(_e))}ce=null,he=null,y.reset();for(const ie in x)delete x[ie];e.setRenderTarget(F),S=null,g=null,v=null,a=null,R=null,ke.stop(),r.isPresenting=!1,e.setPixelRatio(T),e.setSize(O.width,O.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){l=ie,r.isPresenting===!0&&Ze("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){f=ie,r.isPresenting===!0&&Ze("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||c},this.setReferenceSpace=function(ie){d=ie},this.getBaseLayer=function(){return g!==null?g:S},this.getBinding=function(){return v===null&&b&&(v=new XRWebGLBinding(a,t)),v},this.getFrame=function(){return E},this.getSession=function(){return a},this.setSession=async function(ie){if(a=ie,a!==null){if(F=e.getRenderTarget(),a.addEventListener("select",J),a.addEventListener("selectstart",J),a.addEventListener("selectend",J),a.addEventListener("squeeze",J),a.addEventListener("squeezestart",J),a.addEventListener("squeezeend",J),a.addEventListener("end",oe),a.addEventListener("inputsourceschange",ee),U.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(O),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Ne=null,je=null;U.depth&&(je=U.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=U.stencil?ms:lr,Ne=U.stencil?go:ki);const Qe={colorFormat:t.RGBA8,depthFormat:je,scaleFactor:l};v=this.getBinding(),g=v.createProjectionLayer(Qe),a.updateRenderState({layers:[g]}),e.setPixelRatio(1),e.setSize(g.textureWidth,g.textureHeight,!1),R=new Bi(g.textureWidth,g.textureHeight,{format:ui,type:jn,depthTexture:new ha(g.textureWidth,g.textureHeight,Ne,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:U.stencil,colorSpace:e.outputColorSpace,samples:U.antialias?4:0,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1})}else{const pe={antialias:U.antialias,alpha:!0,depth:U.depth,stencil:U.stencil,framebufferScaleFactor:l};S=new XRWebGLLayer(a,t,pe),a.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),R=new Bi(S.framebufferWidth,S.framebufferHeight,{format:ui,type:jn,colorSpace:e.outputColorSpace,stencilBuffer:U.stencil,resolveDepthBuffer:S.ignoreDepthValues===!1,resolveStencilBuffer:S.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(p),d=null,c=await a.requestReferenceSpace(f),ke.setContext(a),ke.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function ee(ie){for(let _e=0;_e<ie.removed.length;_e++){const pe=ie.removed[_e],Ne=P.indexOf(pe);Ne>=0&&(P[Ne]=null,I[Ne].disconnect(pe))}for(let _e=0;_e<ie.added.length;_e++){const pe=ie.added[_e];let Ne=P.indexOf(pe);if(Ne===-1){for(let Qe=0;Qe<I.length;Qe++)if(Qe>=P.length){P.push(pe),Ne=Qe;break}else if(P[Qe]===null){P[Qe]=pe,Ne=Qe;break}if(Ne===-1)break}const je=I[Ne];je&&je.connect(pe)}}const X=new q,ae=new q;function le(ie,_e,pe){X.setFromMatrixPosition(_e.matrixWorld),ae.setFromMatrixPosition(pe.matrixWorld);const Ne=X.distanceTo(ae),je=_e.projectionMatrix.elements,Qe=pe.projectionMatrix.elements,Ht=je[14]/(je[10]-1),ct=je[14]/(je[10]+1),wt=(je[9]+1)/je[5],yt=(je[9]-1)/je[5],vt=(je[8]-1)/je[0],Gt=(Qe[8]+1)/Qe[0],Jt=Ht*vt,jt=Ht*Gt,qt=Ne/(-vt+Gt),Rt=qt*-vt;if(_e.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(Rt),ie.translateZ(qt),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),je[10]===-1)ie.projectionMatrix.copy(_e.projectionMatrix),ie.projectionMatrixInverse.copy(_e.projectionMatrixInverse);else{const Wt=Ht+qt,G=ct+qt,mn=Jt-Rt,Et=jt+(Ne-Rt),C=wt*ct/G*Wt,M=yt*ct/G*Wt;ie.projectionMatrix.makePerspective(mn,Et,C,M,Wt,G),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function N(ie,_e){_e===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(_e.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(a===null)return;let _e=ie.near,pe=ie.far;y.texture!==null&&(y.depthNear>0&&(_e=y.depthNear),y.depthFar>0&&(pe=y.depthFar)),K.near=V.near=L.near=_e,K.far=V.far=L.far=pe,(ce!==K.near||he!==K.far)&&(a.updateRenderState({depthNear:K.near,depthFar:K.far}),ce=K.near,he=K.far),K.layers.mask=ie.layers.mask|6,L.layers.mask=K.layers.mask&-5,V.layers.mask=K.layers.mask&-3;const Ne=ie.parent,je=K.cameras;N(K,Ne);for(let Qe=0;Qe<je.length;Qe++)N(je[Qe],Ne);je.length===2?le(K,L,V):K.projectionMatrix.copy(L.projectionMatrix),$(ie,K,Ne)};function $(ie,_e,pe){pe===null?ie.matrix.copy(_e.matrixWorld):(ie.matrix.copy(pe.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(_e.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(_e.projectionMatrix),ie.projectionMatrixInverse.copy(_e.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=fa*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return K},this.getFoveation=function(){if(!(g===null&&S===null))return p},this.setFoveation=function(ie){p=ie,g!==null&&(g.fixedFoveation=ie),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=ie)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(K)},this.getCameraTexture=function(ie){return x[ie]};let Ie=null;function qe(ie,_e){if(_=_e.getViewerPose(d||c),E=_e,_!==null){const pe=_.views;S!==null&&(e.setRenderTargetFramebuffer(R,S.framebuffer),e.setRenderTarget(R));let Ne=!1;pe.length!==K.cameras.length&&(K.cameras.length=0,Ne=!0);for(let ct=0;ct<pe.length;ct++){const wt=pe[ct];let yt=null;if(S!==null)yt=S.getViewport(wt);else{const Gt=v.getViewSubImage(g,wt);yt=Gt.viewport,ct===0&&(e.setRenderTargetTextures(R,Gt.colorTexture,Gt.depthStencilTexture),e.setRenderTarget(R))}let vt=z[ct];vt===void 0&&(vt=new Jn,vt.layers.enable(ct),vt.viewport=new Ft,z[ct]=vt),vt.matrix.fromArray(wt.transform.matrix),vt.matrix.decompose(vt.position,vt.quaternion,vt.scale),vt.projectionMatrix.fromArray(wt.projectionMatrix),vt.projectionMatrixInverse.copy(vt.projectionMatrix).invert(),vt.viewport.set(yt.x,yt.y,yt.width,yt.height),ct===0&&(K.matrix.copy(vt.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale)),Ne===!0&&K.cameras.push(vt)}const je=a.enabledFeatures;if(je&&je.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&b){v=r.getBinding();const ct=v.getDepthInformation(pe[0]);ct&&ct.isValid&&ct.texture&&y.init(ct,a.renderState)}if(je&&je.includes("camera-access")&&b){e.state.unbindTexture(),v=r.getBinding();for(let ct=0;ct<pe.length;ct++){const wt=pe[ct].camera;if(wt){let yt=x[wt];yt||(yt=new U_,x[wt]=yt);const vt=v.getCameraImage(wt);yt.sourceTexture=vt}}}}for(let pe=0;pe<I.length;pe++){const Ne=P[pe],je=I[pe];Ne!==null&&je!==void 0&&je.update(Ne,_e,d||c)}Ie&&Ie(ie,_e),_e.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:_e}),E=null}const ke=new V_;ke.setAnimationLoop(qe),this.setAnimationLoop=function(ie){Ie=ie},this.dispose=function(){}}}const Gw=new _t,K_=new ut;K_.set(-1,0,0,0,1,0,0,0,1);function Ww(s,e){function t(y,x){y.matrixAutoUpdate===!0&&y.updateMatrix(),x.value.copy(y.matrix)}function r(y,x){x.color.getRGB(y.fogColor.value,O_(s)),x.isFog?(y.fogNear.value=x.near,y.fogFar.value=x.far):x.isFogExp2&&(y.fogDensity.value=x.density)}function a(y,x,U,F,R){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?l(y,x):x.isMeshLambertMaterial?(l(y,x),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(l(y,x),v(y,x)):x.isMeshPhongMaterial?(l(y,x),_(y,x),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(l(y,x),g(y,x),x.isMeshPhysicalMaterial&&S(y,x,R)):x.isMeshMatcapMaterial?(l(y,x),E(y,x)):x.isMeshDepthMaterial?l(y,x):x.isMeshDistanceMaterial?(l(y,x),b(y,x)):x.isMeshNormalMaterial?l(y,x):x.isLineBasicMaterial?(c(y,x),x.isLineDashedMaterial&&f(y,x)):x.isPointsMaterial?p(y,x,U,F):x.isSpriteMaterial?d(y,x):x.isShadowMaterial?(y.color.value.copy(x.color),y.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function l(y,x){y.opacity.value=x.opacity,x.color&&y.diffuse.value.copy(x.color),x.emissive&&y.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(y.map.value=x.map,t(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,t(x.alphaMap,y.alphaMapTransform)),x.bumpMap&&(y.bumpMap.value=x.bumpMap,t(x.bumpMap,y.bumpMapTransform),y.bumpScale.value=x.bumpScale,x.side===Gn&&(y.bumpScale.value*=-1)),x.normalMap&&(y.normalMap.value=x.normalMap,t(x.normalMap,y.normalMapTransform),y.normalScale.value.copy(x.normalScale),x.side===Gn&&y.normalScale.value.negate()),x.displacementMap&&(y.displacementMap.value=x.displacementMap,t(x.displacementMap,y.displacementMapTransform),y.displacementScale.value=x.displacementScale,y.displacementBias.value=x.displacementBias),x.emissiveMap&&(y.emissiveMap.value=x.emissiveMap,t(x.emissiveMap,y.emissiveMapTransform)),x.specularMap&&(y.specularMap.value=x.specularMap,t(x.specularMap,y.specularMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest);const U=e.get(x),F=U.envMap,R=U.envMapRotation;F&&(y.envMap.value=F,y.envMapRotation.value.setFromMatrix4(Gw.makeRotationFromEuler(R)).transpose(),F.isCubeTexture&&F.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(K_),y.reflectivity.value=x.reflectivity,y.ior.value=x.ior,y.refractionRatio.value=x.refractionRatio),x.lightMap&&(y.lightMap.value=x.lightMap,y.lightMapIntensity.value=x.lightMapIntensity,t(x.lightMap,y.lightMapTransform)),x.aoMap&&(y.aoMap.value=x.aoMap,y.aoMapIntensity.value=x.aoMapIntensity,t(x.aoMap,y.aoMapTransform))}function c(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,x.map&&(y.map.value=x.map,t(x.map,y.mapTransform))}function f(y,x){y.dashSize.value=x.dashSize,y.totalSize.value=x.dashSize+x.gapSize,y.scale.value=x.scale}function p(y,x,U,F){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.size.value=x.size*U,y.scale.value=F*.5,x.map&&(y.map.value=x.map,t(x.map,y.uvTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,t(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function d(y,x){y.diffuse.value.copy(x.color),y.opacity.value=x.opacity,y.rotation.value=x.rotation,x.map&&(y.map.value=x.map,t(x.map,y.mapTransform)),x.alphaMap&&(y.alphaMap.value=x.alphaMap,t(x.alphaMap,y.alphaMapTransform)),x.alphaTest>0&&(y.alphaTest.value=x.alphaTest)}function _(y,x){y.specular.value.copy(x.specular),y.shininess.value=Math.max(x.shininess,1e-4)}function v(y,x){x.gradientMap&&(y.gradientMap.value=x.gradientMap)}function g(y,x){y.metalness.value=x.metalness,x.metalnessMap&&(y.metalnessMap.value=x.metalnessMap,t(x.metalnessMap,y.metalnessMapTransform)),y.roughness.value=x.roughness,x.roughnessMap&&(y.roughnessMap.value=x.roughnessMap,t(x.roughnessMap,y.roughnessMapTransform)),x.envMap&&(y.envMapIntensity.value=x.envMapIntensity)}function S(y,x,U){y.ior.value=x.ior,x.sheen>0&&(y.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),y.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(y.sheenColorMap.value=x.sheenColorMap,t(x.sheenColorMap,y.sheenColorMapTransform)),x.sheenRoughnessMap&&(y.sheenRoughnessMap.value=x.sheenRoughnessMap,t(x.sheenRoughnessMap,y.sheenRoughnessMapTransform))),x.clearcoat>0&&(y.clearcoat.value=x.clearcoat,y.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(y.clearcoatMap.value=x.clearcoatMap,t(x.clearcoatMap,y.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,t(x.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(y.clearcoatNormalMap.value=x.clearcoatNormalMap,t(x.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===Gn&&y.clearcoatNormalScale.value.negate())),x.dispersion>0&&(y.dispersion.value=x.dispersion),x.iridescence>0&&(y.iridescence.value=x.iridescence,y.iridescenceIOR.value=x.iridescenceIOR,y.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(y.iridescenceMap.value=x.iridescenceMap,t(x.iridescenceMap,y.iridescenceMapTransform)),x.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=x.iridescenceThicknessMap,t(x.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),x.transmission>0&&(y.transmission.value=x.transmission,y.transmissionSamplerMap.value=U.texture,y.transmissionSamplerSize.value.set(U.width,U.height),x.transmissionMap&&(y.transmissionMap.value=x.transmissionMap,t(x.transmissionMap,y.transmissionMapTransform)),y.thickness.value=x.thickness,x.thicknessMap&&(y.thicknessMap.value=x.thicknessMap,t(x.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=x.attenuationDistance,y.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(y.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(y.anisotropyMap.value=x.anisotropyMap,t(x.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=x.specularIntensity,y.specularColor.value.copy(x.specularColor),x.specularColorMap&&(y.specularColorMap.value=x.specularColorMap,t(x.specularColorMap,y.specularColorMapTransform)),x.specularIntensityMap&&(y.specularIntensityMap.value=x.specularIntensityMap,t(x.specularIntensityMap,y.specularIntensityMapTransform))}function E(y,x){x.matcap&&(y.matcap.value=x.matcap)}function b(y,x){const U=e.get(x).light;y.referencePosition.value.setFromMatrixPosition(U.matrixWorld),y.nearDistance.value=U.shadow.camera.near,y.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:a}}function Xw(s,e,t,r){let a={},l={},c=[];const f=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function p(R,I){const P=I.program;r.uniformBlockBinding(R,P)}function d(R,I){let P=a[R.id];P===void 0&&(y(R),P=_(R),a[R.id]=P,R.addEventListener("dispose",U));const O=I.program;r.updateUBOMapping(R,O);const T=e.render.frame;l[R.id]!==T&&(g(R),l[R.id]=T)}function _(R){const I=v();R.__bindingPointIndex=I;const P=s.createBuffer(),O=R.__size,T=R.usage;return s.bindBuffer(s.UNIFORM_BUFFER,P),s.bufferData(s.UNIFORM_BUFFER,O,T),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,I,P),P}function v(){for(let R=0;R<f;R++)if(c.indexOf(R)===-1)return c.push(R),R;return st("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(R){const I=a[R.id],P=R.uniforms,O=R.__cache;s.bindBuffer(s.UNIFORM_BUFFER,I);for(let T=0,L=P.length;T<L;T++){const V=P[T];if(Array.isArray(V))for(let z=0,K=V.length;z<K;z++)S(V[z],T,z,O);else S(V,T,0,O)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function S(R,I,P,O){if(b(R,I,P,O)===!0){const T=R.__offset,L=R.value;if(Array.isArray(L)){let V=0;for(let z=0;z<L.length;z++){const K=L[z],ce=x(K);E(K,R.__data,V),typeof K!="number"&&typeof K!="boolean"&&!K.isMatrix3&&!ArrayBuffer.isView(K)&&(V+=ce.storage/Float32Array.BYTES_PER_ELEMENT)}}else E(L,R.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,R.__data)}}function E(R,I,P){typeof R=="number"||typeof R=="boolean"?I[0]=R:R.isMatrix3?(I[0]=R.elements[0],I[1]=R.elements[1],I[2]=R.elements[2],I[3]=0,I[4]=R.elements[3],I[5]=R.elements[4],I[6]=R.elements[5],I[7]=0,I[8]=R.elements[6],I[9]=R.elements[7],I[10]=R.elements[8],I[11]=0):ArrayBuffer.isView(R)?I.set(new R.constructor(R.buffer,R.byteOffset,I.length)):R.toArray(I,P)}function b(R,I,P,O){const T=R.value,L=I+"_"+P;if(O[L]===void 0)return typeof T=="number"||typeof T=="boolean"?O[L]=T:ArrayBuffer.isView(T)?O[L]=T.slice():O[L]=T.clone(),!0;{const V=O[L];if(typeof T=="number"||typeof T=="boolean"){if(V!==T)return O[L]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(V.equals(T)===!1)return V.copy(T),!0}}return!1}function y(R){const I=R.uniforms;let P=0;const O=16;for(let L=0,V=I.length;L<V;L++){const z=Array.isArray(I[L])?I[L]:[I[L]];for(let K=0,ce=z.length;K<ce;K++){const he=z[K],J=Array.isArray(he.value)?he.value:[he.value];for(let oe=0,ee=J.length;oe<ee;oe++){const X=J[oe],ae=x(X),le=P%O,N=le%ae.boundary,$=le+N;P+=N,$!==0&&O-$<ae.storage&&(P+=O-$),he.__data=new Float32Array(ae.storage/Float32Array.BYTES_PER_ELEMENT),he.__offset=P,P+=ae.storage}}}const T=P%O;return T>0&&(P+=O-T),R.__size=P,R.__cache={},this}function x(R){const I={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(I.boundary=4,I.storage=4):R.isVector2?(I.boundary=8,I.storage=8):R.isVector3||R.isColor?(I.boundary=16,I.storage=12):R.isVector4?(I.boundary=16,I.storage=16):R.isMatrix3?(I.boundary=48,I.storage=48):R.isMatrix4?(I.boundary=64,I.storage=64):R.isTexture?Ze("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(R)?(I.boundary=16,I.storage=R.byteLength):Ze("WebGLRenderer: Unsupported uniform value type.",R),I}function U(R){const I=R.target;I.removeEventListener("dispose",U);const P=c.indexOf(I.__bindingPointIndex);c.splice(P,1),s.deleteBuffer(a[I.id]),delete a[I.id],delete l[I.id]}function F(){for(const R in a)s.deleteBuffer(a[R]);c=[],a={},l={}}return{bind:p,update:d,dispose:F}}const Yw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Ni=null;function qw(){return Ni===null&&(Ni=new ed(Yw,16,16,_s,or),Ni.name="DFG_LUT",Ni.minFilter=Rn,Ni.magFilter=Rn,Ni.wrapS=ir,Ni.wrapT=ir,Ni.generateMipmaps=!1,Ni.needsUpdate=!0),Ni}class O1{constructor(e={}){const{canvas:t=yx(),context:r=null,depth:a=!0,stencil:l=!1,alpha:c=!1,antialias:f=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:d=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:v=!1,reversedDepthBuffer:g=!1,outputBufferType:S=jn}=e;this.isWebGLRenderer=!0;let E;if(r!==null){if(typeof WebGLRenderingContext<"u"&&r instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");E=r.getContextAttributes().alpha}else E=c;const b=S,y=new Set([Kh,qh,Yh]),x=new Set([jn,ki,mo,go,Gh,Wh]),U=new Uint32Array(4),F=new Int32Array(4),R=new q;let I=null,P=null;const O=[],T=[];let L=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const V=this;let z=!1,K=null,ce=null,he=null,J=null;this._outputColorSpace=oi;let oe=0,ee=0,X=null,ae=-1,le=null;const N=new Ft,$=new Ft;let Ie=null;const qe=new ht(0);let ke=0,ie=t.width,_e=t.height,pe=1,Ne=null,je=null;const Qe=new Ft(0,0,ie,_e),Ht=new Ft(0,0,ie,_e);let ct=!1;const wt=new td;let yt=!1,vt=!1;const Gt=new _t,Jt=new q,jt=new Ft,qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Rt=!1;function Wt(){return X===null?pe:1}let G=r;function mn(A,W){return t.getContext(A,W)}try{const A={alpha:!0,depth:a,stencil:l,antialias:f,premultipliedAlpha:p,preserveDrawingBuffer:d,powerPreference:_,failIfMajorPerformanceCaveat:v};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${zh}`),t.addEventListener("webglcontextlost",It,!1),t.addEventListener("webglcontextrestored",At,!1),t.addEventListener("webglcontextcreationerror",Sn,!1),G===null){const W="webgl2";if(G=mn(W,A),G===null)throw mn(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw st("WebGLRenderer: "+A.message),A}let Et,C,M,Y,ne,ue,Se,be,fe,me,Ce,Xe,Pe,Ae,Je,et,rt,k,we,de,Re,Le,ge;function He(){Et=new qE(G),Et.init(),Re=new Bw(G,Et),C=new kE(G,Et,e,Re),M=new Fw(G,Et),C.reversedDepthBuffer&&g&&M.buffers.depth.setReversed(!0),ce=G.createFramebuffer(),he=G.createFramebuffer(),J=G.createFramebuffer(),Y=new ZE(G),ne=new Mw,ue=new Ow(G,Et,M,ne,C,Re,Y),Se=new YE(V),be=new eS(G),Le=new OE(G,be),fe=new KE(G,be,Y,Le),me=new jE(G,fe,be,Le,Y),k=new JE(G,C,ue),Je=new zE(ne),Ce=new Sw(V,Se,Et,C,Le,Je),Xe=new Ww(V,ne),Pe=new Tw,Ae=new Pw(Et),rt=new FE(V,Se,M,me,E,p),et=new Uw(V,me,C),ge=new Xw(G,Y,C,M),we=new BE(G,Et,Y),de=new $E(G,Et,Y),Y.programs=Ce.programs,V.capabilities=C,V.extensions=Et,V.properties=ne,V.renderLists=Pe,V.shadowMap=et,V.state=M,V.info=Y}He(),b!==jn&&(L=new eT(b,t.width,t.height,f,a,l));const ze=new Hw(V,G);this.xr=ze,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const A=Et.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Et.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(A){A!==void 0&&(pe=A,this.setSize(ie,_e,!1))},this.getSize=function(A){return A.set(ie,_e)},this.setSize=function(A,W,re=!0){if(ze.isPresenting){Ze("WebGLRenderer: Can't change size while VR device is presenting.");return}ie=A,_e=W,t.width=Math.floor(A*pe),t.height=Math.floor(W*pe),re===!0&&(t.style.width=A+"px",t.style.height=W+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,A,W)},this.getDrawingBufferSize=function(A){return A.set(ie*pe,_e*pe).floor()},this.setDrawingBufferSize=function(A,W,re){ie=A,_e=W,pe=re,t.width=Math.floor(A*re),t.height=Math.floor(W*re),this.setViewport(0,0,A,W)},this.setEffects=function(A){if(b===jn){st("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let W=0;W<A.length;W++)if(A[W].isOutputPass===!0){Ze("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(N)},this.getViewport=function(A){return A.copy(Qe)},this.setViewport=function(A,W,re,Q){A.isVector4?Qe.set(A.x,A.y,A.z,A.w):Qe.set(A,W,re,Q),M.viewport(N.copy(Qe).multiplyScalar(pe).round())},this.getScissor=function(A){return A.copy(Ht)},this.setScissor=function(A,W,re,Q){A.isVector4?Ht.set(A.x,A.y,A.z,A.w):Ht.set(A,W,re,Q),M.scissor($.copy(Ht).multiplyScalar(pe).round())},this.getScissorTest=function(){return ct},this.setScissorTest=function(A){M.setScissorTest(ct=A)},this.setOpaqueSort=function(A){Ne=A},this.setTransparentSort=function(A){je=A},this.getClearColor=function(A){return A.copy(rt.getClearColor())},this.setClearColor=function(){rt.setClearColor(...arguments)},this.getClearAlpha=function(){return rt.getClearAlpha()},this.setClearAlpha=function(){rt.setClearAlpha(...arguments)},this.clear=function(A=!0,W=!0,re=!0){let Q=0;if(A){let j=!1;if(X!==null){const Te=X.texture.format;j=y.has(Te)}if(j){const Te=X.texture.type,Oe=x.has(Te),Ee=rt.getClearColor(),Ge=rt.getClearAlpha(),$e=Ee.r,ot=Ee.g,lt=Ee.b;Oe?(U[0]=$e,U[1]=ot,U[2]=lt,U[3]=Ge,G.clearBufferuiv(G.COLOR,0,U)):(F[0]=$e,F[1]=ot,F[2]=lt,F[3]=Ge,G.clearBufferiv(G.COLOR,0,F))}else Q|=G.COLOR_BUFFER_BIT}W&&(Q|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),re&&(Q|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q!==0&&G.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),K=A},this.dispose=function(){t.removeEventListener("webglcontextlost",It,!1),t.removeEventListener("webglcontextrestored",At,!1),t.removeEventListener("webglcontextcreationerror",Sn,!1),rt.dispose(),Pe.dispose(),Ae.dispose(),ne.dispose(),Se.dispose(),me.dispose(),Le.dispose(),ge.dispose(),Ce.dispose(),ze.dispose(),ze.removeEventListener("sessionstart",Mo),ze.removeEventListener("sessionend",Eo),Cn.stop()};function It(A){A.preventDefault(),mu("WebGLRenderer: Context Lost."),z=!0}function At(){mu("WebGLRenderer: Context Restored."),z=!1;const A=Y.autoReset,W=et.enabled,re=et.autoUpdate,Q=et.needsUpdate,j=et.type;He(),Y.autoReset=A,et.enabled=W,et.autoUpdate=re,et.needsUpdate=Q,et.type=j}function Sn(A){st("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Qn(A){const W=A.target;W.removeEventListener("dispose",Qn),Wr(W)}function Wr(A){vs(A),ne.remove(A)}function vs(A){const W=ne.get(A).programs;W!==void 0&&(W.forEach(function(re){Ce.releaseProgram(re)}),A.isShaderMaterial&&Ce.releaseShaderCache(A))}this.renderBufferDirect=function(A,W,re,Q,j,Te){W===null&&(W=qt);const Oe=j.isMesh&&j.matrixWorld.determinantAffine()<0,Ee=Kt(A,W,re,Q,j);M.setMaterial(Q,Oe);let Ge=re.index,$e=1;if(Q.wireframe===!0){if(Ge=fe.getWireframeAttribute(re),Ge===void 0)return;$e=2}const ot=re.drawRange,lt=re.attributes.position;let Ye=ot.start*$e,St=(ot.start+ot.count)*$e;Te!==null&&(Ye=Math.max(Ye,Te.start*$e),St=Math.min(St,(Te.start+Te.count)*$e)),Ge!==null?(Ye=Math.max(Ye,0),St=Math.min(St,Ge.count)):lt!=null&&(Ye=Math.max(Ye,0),St=Math.min(St,lt.count));const Ot=St-Ye;if(Ot<0||Ot===1/0)return;Le.setup(j,Q,Ee,re,Ge);let Xt,Ct=we;if(Ge!==null&&(Xt=be.get(Ge),Ct=de,Ct.setIndex(Xt)),j.isMesh)Q.wireframe===!0?(M.setLineWidth(Q.wireframeLinewidth*Wt()),Ct.setMode(G.LINES)):Ct.setMode(G.TRIANGLES);else if(j.isLine){let nn=Q.linewidth;nn===void 0&&(nn=1),M.setLineWidth(nn*Wt()),j.isLineSegments?Ct.setMode(G.LINES):j.isLineLoop?Ct.setMode(G.LINE_LOOP):Ct.setMode(G.LINE_STRIP)}else j.isPoints?Ct.setMode(G.POINTS):j.isSprite&&Ct.setMode(G.TRIANGLES);if(j.isBatchedMesh)if(Et.get("WEBGL_multi_draw"))Ct.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else{const nn=j._multiDrawStarts,Ue=j._multiDrawCounts,gn=j._multiDrawCount,dt=Ge?be.get(Ge).bytesPerElement:1,Nn=ne.get(Q).currentProgram.getUniforms();for(let Un=0;Un<gn;Un++)Nn.setValue(G,"_gl_DrawID",Un),Ct.render(nn[Un]/dt,Ue[Un])}else if(j.isInstancedMesh)Ct.renderInstances(Ye,Ot,j.count);else if(re.isInstancedBufferGeometry){const nn=re._maxInstanceCount!==void 0?re._maxInstanceCount:1/0,Ue=Math.min(re.instanceCount,nn);Ct.renderInstances(Ye,Ot,Ue)}else Ct.render(Ye,Ot)};function Xr(A,W,re){A.transparent===!0&&A.side===nr&&A.forceSinglePass===!1?(A.side=Gn,A.needsUpdate=!0,Kr(A,W,re),A.side=zr,A.needsUpdate=!0,Kr(A,W,re),A.side=nr):Kr(A,W,re)}this.compile=function(A,W,re=null){re===null&&(re=A),P=Ae.get(re),P.init(W),T.push(P),re.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(P.pushLight(j),j.castShadow&&P.pushShadow(j))}),A!==re&&A.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(P.pushLight(j),j.castShadow&&P.pushShadow(j))}),P.setupLights();const Q=new Set;return A.traverse(function(j){if(!(j.isMesh||j.isPoints||j.isLine||j.isSprite))return;const Te=j.material;if(Te)if(Array.isArray(Te))for(let Oe=0;Oe<Te.length;Oe++){const Ee=Te[Oe];Xr(Ee,re,j),Q.add(Ee)}else Xr(Te,re,j),Q.add(Te)}),P=T.pop(),Q},this.compileAsync=function(A,W,re=null){const Q=this.compile(A,W,re);return new Promise(j=>{function Te(){if(Q.forEach(function(Oe){ne.get(Oe).currentProgram.isReady()&&Q.delete(Oe)}),Q.size===0){j(A);return}setTimeout(Te,10)}Et.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let Yr=null;function Tu(A){Yr&&Yr(A)}function Mo(){Cn.stop()}function Eo(){Cn.start()}const Cn=new V_;Cn.setAnimationLoop(Tu),typeof self<"u"&&Cn.setContext(self),this.setAnimationLoop=function(A){Yr=A,ze.setAnimationLoop(A),A===null?Cn.stop():Cn.start()},ze.addEventListener("sessionstart",Mo),ze.addEventListener("sessionend",Eo),this.render=function(A,W){if(W!==void 0&&W.isCamera!==!0){st("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(z===!0)return;K!==null&&K.renderStart(A,W);const re=ze.enabled===!0&&ze.isPresenting===!0,Q=L!==null&&(X===null||re)&&L.begin(V,X);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ze.enabled===!0&&ze.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(ze.cameraAutoUpdate===!0&&ze.updateCamera(W),W=ze.getCamera()),A.isScene===!0&&A.onBeforeRender(V,A,W,X),P=Ae.get(A,T.length),P.init(W),P.state.textureUnits=ue.getTextureUnits(),T.push(P),Gt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),wt.setFromProjectionMatrix(Gt,Fi,W.reversedDepth),vt=this.localClippingEnabled,yt=Je.init(this.clippingPlanes,vt),I=Pe.get(A,O.length),I.init(),O.push(I),ze.enabled===!0&&ze.isPresenting===!0){const Oe=V.xr.getDepthSensingMesh();Oe!==null&&xs(Oe,W,-1/0,V.sortObjects)}xs(A,W,0,V.sortObjects),I.finish(),V.sortObjects===!0&&I.sort(Ne,je,W.reversedDepth),Rt=ze.enabled===!1||ze.isPresenting===!1||ze.hasDepthSensing()===!1,Rt&&rt.addToRenderList(I,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),yt===!0&&Je.beginShadows();const j=P.state.shadowsArray;if(et.render(j,A,W),yt===!0&&Je.endShadows(),(Q&&L.hasRenderPass())===!1){const Oe=I.opaque,Ee=I.transmissive;if(P.setupLights(),W.isArrayCamera){const Ge=W.cameras;if(Ee.length>0)for(let $e=0,ot=Ge.length;$e<ot;$e++){const lt=Ge[$e];To(Oe,Ee,A,lt)}Rt&&rt.render(A);for(let $e=0,ot=Ge.length;$e<ot;$e++){const lt=Ge[$e];va(I,A,lt,lt.viewport)}}else Ee.length>0&&To(Oe,Ee,A,W),Rt&&rt.render(A),va(I,A,W)}X!==null&&ee===0&&(ue.updateMultisampleRenderTarget(X),ue.updateRenderTargetMipmap(X)),Q&&L.end(V),A.isScene===!0&&A.onAfterRender(V,A,W),Le.resetDefaultState(),ae=-1,le=null,T.pop(),T.length>0?(P=T[T.length-1],ue.setTextureUnits(P.state.textureUnits),yt===!0&&Je.setGlobalState(V.clippingPlanes,P.state.camera)):P=null,O.pop(),O.length>0?I=O[O.length-1]:I=null,K!==null&&K.renderEnd()};function xs(A,W,re,Q){if(A.visible===!1)return;if(A.layers.test(W.layers)){if(A.isGroup)re=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(W);else if(A.isLightProbeGrid)P.pushLightProbeGrid(A);else if(A.isLight)P.pushLight(A),A.castShadow&&P.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||wt.intersectsSprite(A)){Q&&jt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Gt);const Oe=me.update(A),Ee=A.material;Ee.visible&&I.push(A,Oe,Ee,re,jt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||wt.intersectsObject(A))){const Oe=me.update(A),Ee=A.material;if(Q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),jt.copy(A.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),jt.copy(Oe.boundingSphere.center)),jt.applyMatrix4(A.matrixWorld).applyMatrix4(Gt)),Array.isArray(Ee)){const Ge=Oe.groups;for(let $e=0,ot=Ge.length;$e<ot;$e++){const lt=Ge[$e],Ye=Ee[lt.materialIndex];Ye&&Ye.visible&&I.push(A,Oe,Ye,re,jt.z,lt)}}else Ee.visible&&I.push(A,Oe,Ee,re,jt.z,null)}}const Te=A.children;for(let Oe=0,Ee=Te.length;Oe<Ee;Oe++)xs(Te[Oe],W,re,Q)}function va(A,W,re,Q){const{opaque:j,transmissive:Te,transparent:Oe}=A;P.setupLightsView(re),yt===!0&&Je.setGlobalState(V.clippingPlanes,re),Q&&M.viewport(N.copy(Q)),j.length>0&&qr(j,W,re),Te.length>0&&qr(Te,W,re),Oe.length>0&&qr(Oe,W,re),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function To(A,W,re,Q){if((re.isScene===!0?re.overrideMaterial:null)!==null)return;if(P.state.transmissionRenderTarget[Q.id]===void 0){const Ye=Et.has("EXT_color_buffer_half_float")||Et.has("EXT_color_buffer_float");P.state.transmissionRenderTarget[Q.id]=new Bi(1,1,{generateMipmaps:!0,type:Ye?or:jn,minFilter:ps,samples:Math.max(4,C.samples),stencilBuffer:l,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:xt.workingColorSpace})}const Te=P.state.transmissionRenderTarget[Q.id],Oe=Q.viewport||N;Te.setSize(Oe.z*V.transmissionResolutionScale,Oe.w*V.transmissionResolutionScale);const Ee=V.getRenderTarget(),Ge=V.getActiveCubeFace(),$e=V.getActiveMipmapLevel();V.setRenderTarget(Te),V.getClearColor(qe),ke=V.getClearAlpha(),ke<1&&V.setClearColor(16777215,.5),V.clear(),Rt&&rt.render(re);const ot=V.toneMapping;V.toneMapping=Oi;const lt=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),P.setupLightsView(Q),yt===!0&&Je.setGlobalState(V.clippingPlanes,Q),qr(A,re,Q),ue.updateMultisampleRenderTarget(Te),ue.updateRenderTargetMipmap(Te),Et.has("WEBGL_multisampled_render_to_texture")===!1){let Ye=!1;for(let St=0,Ot=W.length;St<Ot;St++){const Xt=W[St],{object:Ct,geometry:nn,material:Ue,group:gn}=Xt;if(Ue.side===nr&&Ct.layers.test(Q.layers)){const dt=Ue.side;Ue.side=Gn,Ue.needsUpdate=!0,xa(Ct,re,Q,nn,Ue,gn),Ue.side=dt,Ue.needsUpdate=!0,Ye=!0}}Ye===!0&&(ue.updateMultisampleRenderTarget(Te),ue.updateRenderTargetMipmap(Te))}V.setRenderTarget(Ee,Ge,$e),V.setClearColor(qe,ke),lt!==void 0&&(Q.viewport=lt),V.toneMapping=ot}function qr(A,W,re){const Q=W.isScene===!0?W.overrideMaterial:null;for(let j=0,Te=A.length;j<Te;j++){const Oe=A[j],{object:Ee,geometry:Ge,group:$e}=Oe;let ot=Oe.material;ot.allowOverride===!0&&Q!==null&&(ot=Q),Ee.layers.test(re.layers)&&xa(Ee,W,re,Ge,ot,$e)}}function xa(A,W,re,Q,j,Te){A.onBeforeRender(V,W,re,Q,j,Te),A.modelViewMatrix.multiplyMatrices(re.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),j.onBeforeRender(V,W,re,Q,A,Te),j.transparent===!0&&j.side===nr&&j.forceSinglePass===!1?(j.side=Gn,j.needsUpdate=!0,V.renderBufferDirect(re,W,Q,j,A,Te),j.side=zr,j.needsUpdate=!0,V.renderBufferDirect(re,W,Q,j,A,Te),j.side=nr):V.renderBufferDirect(re,W,Q,j,A,Te),A.onAfterRender(V,W,re,Q,j,Te)}function Kr(A,W,re){W.isScene!==!0&&(W=qt);const Q=ne.get(A),j=P.state.lights,Te=P.state.shadowsArray,Oe=j.state.version,Ee=Ce.getParameters(A,j.state,Te,W,re,P.state.lightProbeGridArray),Ge=Ce.getProgramCacheKey(Ee);let $e=Q.programs;Q.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?W.environment:null,Q.fog=W.fog;const ot=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;Q.envMap=Se.get(A.envMap||Q.environment,ot),Q.envMapRotation=Q.environment!==null&&A.envMap===null?W.environmentRotation:A.envMapRotation,$e===void 0&&(A.addEventListener("dispose",Qn),$e=new Map,Q.programs=$e);let lt=$e.get(Ge);if(lt!==void 0){if(Q.currentProgram===lt&&Q.lightsStateVersion===Oe)return wo(A,Ee),lt}else Ee.uniforms=Ce.getUniforms(A),K!==null&&A.isNodeMaterial&&K.build(A,re,Ee),A.onBeforeCompile(Ee,V),lt=Ce.acquireProgram(Ee,Ge),$e.set(Ge,lt),Q.uniforms=Ee.uniforms;const Ye=Q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ye.clippingPlanes=Je.uniform),wo(A,Ee),Q.needsLights=Sa(A),Q.lightsStateVersion=Oe,Q.needsLights&&(Ye.ambientLightColor.value=j.state.ambient,Ye.lightProbe.value=j.state.probe,Ye.directionalLights.value=j.state.directional,Ye.directionalLightShadows.value=j.state.directionalShadow,Ye.spotLights.value=j.state.spot,Ye.spotLightShadows.value=j.state.spotShadow,Ye.rectAreaLights.value=j.state.rectArea,Ye.ltc_1.value=j.state.rectAreaLTC1,Ye.ltc_2.value=j.state.rectAreaLTC2,Ye.pointLights.value=j.state.point,Ye.pointLightShadows.value=j.state.pointShadow,Ye.hemisphereLights.value=j.state.hemi,Ye.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Ye.spotLightMatrix.value=j.state.spotLightMatrix,Ye.spotLightMap.value=j.state.spotLightMap,Ye.pointShadowMatrix.value=j.state.pointShadowMatrix),Q.lightProbeGrid=P.state.lightProbeGridArray.length>0,Q.currentProgram=lt,Q.uniformsList=null,lt}function ya(A){if(A.uniformsList===null){const W=A.currentProgram.getUniforms();A.uniformsList=lu.seqWithValue(W.seq,A.uniforms)}return A.uniformsList}function wo(A,W){const re=ne.get(A);re.outputColorSpace=W.outputColorSpace,re.batching=W.batching,re.batchingColor=W.batchingColor,re.instancing=W.instancing,re.instancingColor=W.instancingColor,re.instancingMorph=W.instancingMorph,re.skinning=W.skinning,re.morphTargets=W.morphTargets,re.morphNormals=W.morphNormals,re.morphColors=W.morphColors,re.morphTargetsCount=W.morphTargetsCount,re.numClippingPlanes=W.numClippingPlanes,re.numIntersection=W.numClipIntersection,re.vertexAlphas=W.vertexAlphas,re.vertexTangents=W.vertexTangents,re.toneMapping=W.toneMapping}function wu(A,W){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;R.setFromMatrixPosition(W.matrixWorld);for(let re=0,Q=A.length;re<Q;re++){const j=A[re];if(j.texture!==null&&j.boundingBox.containsPoint(R))return j}return null}function Kt(A,W,re,Q,j){W.isScene!==!0&&(W=qt),ue.resetTextureUnits();const Te=W.fog,Oe=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial?W.environment:null,Ee=X===null?V.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:xt.workingColorSpace,Ge=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial&&!Q.envMap||Q.isMeshPhongMaterial&&!Q.envMap,$e=Se.get(Q.envMap||Oe,Ge),ot=Q.vertexColors===!0&&!!re.attributes.color&&re.attributes.color.itemSize===4,lt=!!re.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Ye=!!re.morphAttributes.position,St=!!re.morphAttributes.normal,Ot=!!re.morphAttributes.color;let Xt=Oi;Q.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Xt=V.toneMapping);const Ct=re.morphAttributes.position||re.morphAttributes.normal||re.morphAttributes.color,nn=Ct!==void 0?Ct.length:0,Ue=ne.get(Q),gn=P.state.lights;if(yt===!0&&(vt===!0||A!==le)){const Pt=A===le&&Q.id===ae;Je.setState(Q,A,Pt)}let dt=!1;Q.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==gn.state.version||Ue.outputColorSpace!==Ee||j.isBatchedMesh&&Ue.batching===!1||!j.isBatchedMesh&&Ue.batching===!0||j.isBatchedMesh&&Ue.batchingColor===!0&&j.colorTexture===null||j.isBatchedMesh&&Ue.batchingColor===!1&&j.colorTexture!==null||j.isInstancedMesh&&Ue.instancing===!1||!j.isInstancedMesh&&Ue.instancing===!0||j.isSkinnedMesh&&Ue.skinning===!1||!j.isSkinnedMesh&&Ue.skinning===!0||j.isInstancedMesh&&Ue.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Ue.instancingColor===!1&&j.instanceColor!==null||j.isInstancedMesh&&Ue.instancingMorph===!0&&j.morphTexture===null||j.isInstancedMesh&&Ue.instancingMorph===!1&&j.morphTexture!==null||Ue.envMap!==$e||Q.fog===!0&&Ue.fog!==Te||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==Je.numPlanes||Ue.numIntersection!==Je.numIntersection)||Ue.vertexAlphas!==ot||Ue.vertexTangents!==lt||Ue.morphTargets!==Ye||Ue.morphNormals!==St||Ue.morphColors!==Ot||Ue.toneMapping!==Xt||Ue.morphTargetsCount!==nn||!!Ue.lightProbeGrid!=P.state.lightProbeGridArray.length>0)&&(dt=!0):(dt=!0,Ue.__version=Q.version);let Nn=Ue.currentProgram;dt===!0&&(Nn=Kr(Q,W,j),K&&Q.isNodeMaterial&&K.onUpdateProgram(Q,Nn,Ue));let Un=!1,mt=!1,Vi=!1;const bt=Nn.getUniforms(),kt=Ue.uniforms;if(M.useProgram(Nn.program)&&(Un=!0,mt=!0,Vi=!0),Q.id!==ae&&(ae=Q.id,mt=!0),Ue.needsLights){const Pt=wu(P.state.lightProbeGridArray,j);Ue.lightProbeGrid!==Pt&&(Ue.lightProbeGrid=Pt,mt=!0)}if(Un||le!==A){M.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),bt.setValue(G,"projectionMatrix",A.projectionMatrix),bt.setValue(G,"viewMatrix",A.matrixWorldInverse);const pi=bt.map.cameraPosition;pi!==void 0&&pi.setValue(G,Jt.setFromMatrixPosition(A.matrixWorld)),C.logarithmicDepthBuffer&&bt.setValue(G,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&bt.setValue(G,"isOrthographic",A.isOrthographicCamera===!0),le!==A&&(le=A,mt=!0,Vi=!0)}if(Ue.needsLights&&(gn.state.directionalShadowMap.length>0&&bt.setValue(G,"directionalShadowMap",gn.state.directionalShadowMap,ue),gn.state.spotShadowMap.length>0&&bt.setValue(G,"spotShadowMap",gn.state.spotShadowMap,ue),gn.state.pointShadowMap.length>0&&bt.setValue(G,"pointShadowMap",gn.state.pointShadowMap,ue)),j.isSkinnedMesh){bt.setOptional(G,j,"bindMatrix"),bt.setOptional(G,j,"bindMatrixInverse");const Pt=j.skeleton;Pt&&(Pt.boneTexture===null&&Pt.computeBoneTexture(),bt.setValue(G,"boneTexture",Pt.boneTexture,ue))}j.isBatchedMesh&&(bt.setOptional(G,j,"batchingTexture"),bt.setValue(G,"batchingTexture",j._matricesTexture,ue),bt.setOptional(G,j,"batchingIdTexture"),bt.setValue(G,"batchingIdTexture",j._indirectTexture,ue),bt.setOptional(G,j,"batchingColorTexture"),j._colorsTexture!==null&&bt.setValue(G,"batchingColorTexture",j._colorsTexture,ue));const di=re.morphAttributes;if((di.position!==void 0||di.normal!==void 0||di.color!==void 0)&&k.update(j,re,Nn),(mt||Ue.receiveShadow!==j.receiveShadow)&&(Ue.receiveShadow=j.receiveShadow,bt.setValue(G,"receiveShadow",j.receiveShadow)),(Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial)&&Q.envMap===null&&W.environment!==null&&(kt.envMapIntensity.value=W.environmentIntensity),kt.dfgLUT!==void 0&&(kt.dfgLUT.value=qw()),mt){if(bt.setValue(G,"toneMappingExposure",V.toneMappingExposure),Ue.needsLights&&Au(kt,Vi),Te&&Q.fog===!0&&Xe.refreshFogUniforms(kt,Te),Xe.refreshMaterialUniforms(kt,Q,pe,_e,P.state.transmissionRenderTarget[A.id]),Ue.needsLights&&Ue.lightProbeGrid){const Pt=Ue.lightProbeGrid;kt.probesSH.value=Pt.texture,kt.probesMin.value.copy(Pt.boundingBox.min),kt.probesMax.value.copy(Pt.boundingBox.max),kt.probesResolution.value.copy(Pt.resolution)}lu.upload(G,ya(Ue),kt,ue)}if(Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(lu.upload(G,ya(Ue),kt,ue),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&bt.setValue(G,"center",j.center),bt.setValue(G,"modelViewMatrix",j.modelViewMatrix),bt.setValue(G,"normalMatrix",j.normalMatrix),bt.setValue(G,"modelMatrix",j.matrixWorld),Q.uniformsGroups!==void 0){const Pt=Q.uniformsGroups;for(let pi=0,Ri=Pt.length;pi<Ri;pi++){const $r=Pt[pi];ge.update($r,Nn),ge.bind($r,Nn)}}return Nn}function Au(A,W){A.ambientLightColor.needsUpdate=W,A.lightProbe.needsUpdate=W,A.directionalLights.needsUpdate=W,A.directionalLightShadows.needsUpdate=W,A.pointLights.needsUpdate=W,A.pointLightShadows.needsUpdate=W,A.spotLights.needsUpdate=W,A.spotLightShadows.needsUpdate=W,A.rectAreaLights.needsUpdate=W,A.hemisphereLights.needsUpdate=W}function Sa(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return oe},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(A,W,re){const Q=ne.get(A);Q.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),ne.get(A.texture).__webglTexture=W,ne.get(A.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:re,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,W){const re=ne.get(A);re.__webglFramebuffer=W,re.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(A,W=0,re=0){X=A,oe=W,ee=re;let Q=null,j=!1,Te=!1;if(A){const Ee=ne.get(A);if(Ee.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(G.FRAMEBUFFER,Ee.__webglFramebuffer),N.copy(A.viewport),$.copy(A.scissor),Ie=A.scissorTest,M.viewport(N),M.scissor($),M.setScissorTest(Ie),ae=-1;return}else if(Ee.__webglFramebuffer===void 0)ue.setupRenderTarget(A);else if(Ee.__hasExternalTextures)ue.rebindTextures(A,ne.get(A.texture).__webglTexture,ne.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const ot=A.depthTexture;if(Ee.__boundDepthTexture!==ot){if(ot!==null&&ne.has(ot)&&(A.width!==ot.image.width||A.height!==ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ue.setupDepthRenderbuffer(A)}}const Ge=A.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Te=!0);const $e=ne.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray($e[W])?Q=$e[W][re]:Q=$e[W],j=!0):A.samples>0&&ue.useMultisampledRTT(A)===!1?Q=ne.get(A).__webglMultisampledFramebuffer:Array.isArray($e)?Q=$e[re]:Q=$e,N.copy(A.viewport),$.copy(A.scissor),Ie=A.scissorTest}else N.copy(Qe).multiplyScalar(pe).floor(),$.copy(Ht).multiplyScalar(pe).floor(),Ie=ct;if(re!==0&&(Q=ce),M.bindFramebuffer(G.FRAMEBUFFER,Q)&&M.drawBuffers(A,Q),M.viewport(N),M.scissor($),M.setScissorTest(Ie),j){const Ee=ne.get(A.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ee.__webglTexture,re)}else if(Te){const Ee=W;for(let Ge=0;Ge<A.textures.length;Ge++){const $e=ne.get(A.textures[Ge]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Ge,$e.__webglTexture,re,Ee)}}else if(A!==null&&re!==0){const Ee=ne.get(A.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Ee.__webglTexture,re)}ae=-1},this.readRenderTargetPixels=function(A,W,re,Q,j,Te,Oe,Ee=0){if(!(A&&A.isWebGLRenderTarget)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=ne.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ge=Ge[Oe]),Ge){M.bindFramebuffer(G.FRAMEBUFFER,Ge);try{const $e=A.textures[Ee],ot=$e.format,lt=$e.type;if(A.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Ee),!C.textureFormatReadable(ot)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!C.textureTypeReadable(lt)){st("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=A.width-Q&&re>=0&&re<=A.height-j&&G.readPixels(W,re,Q,j,Re.convert(ot),Re.convert(lt),Te)}finally{const $e=X!==null?ne.get(X).__webglFramebuffer:null;M.bindFramebuffer(G.FRAMEBUFFER,$e)}}},this.readRenderTargetPixelsAsync=async function(A,W,re,Q,j,Te,Oe,Ee=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ge=ne.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Oe!==void 0&&(Ge=Ge[Oe]),Ge)if(W>=0&&W<=A.width-Q&&re>=0&&re<=A.height-j){M.bindFramebuffer(G.FRAMEBUFFER,Ge);const $e=A.textures[Ee],ot=$e.format,lt=$e.type;if(A.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Ee),!C.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!C.textureTypeReadable(lt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ye=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,Ye),G.bufferData(G.PIXEL_PACK_BUFFER,Te.byteLength,G.STREAM_READ),G.readPixels(W,re,Q,j,Re.convert(ot),Re.convert(lt),0);const St=X!==null?ne.get(X).__webglFramebuffer:null;M.bindFramebuffer(G.FRAMEBUFFER,St);const Ot=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await Sx(G,Ot,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,Ye),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,Te),G.deleteBuffer(Ye),G.deleteSync(Ot),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,W=null,re=0){const Q=Math.pow(2,-re),j=Math.floor(A.image.width*Q),Te=Math.floor(A.image.height*Q),Oe=W!==null?W.x:0,Ee=W!==null?W.y:0;ue.setTexture2D(A,0),G.copyTexSubImage2D(G.TEXTURE_2D,re,0,0,Oe,Ee,j,Te),M.unbindTexture()},this.copyTextureToTexture=function(A,W,re=null,Q=null,j=0,Te=0){let Oe,Ee,Ge,$e,ot,lt,Ye,St,Ot;const Xt=A.isCompressedTexture?A.mipmaps[Te]:A.image;if(re!==null)Oe=re.max.x-re.min.x,Ee=re.max.y-re.min.y,Ge=re.isBox3?re.max.z-re.min.z:1,$e=re.min.x,ot=re.min.y,lt=re.isBox3?re.min.z:0;else{const kt=Math.pow(2,-j);Oe=Math.floor(Xt.width*kt),Ee=Math.floor(Xt.height*kt),A.isDataArrayTexture?Ge=Xt.depth:A.isData3DTexture?Ge=Math.floor(Xt.depth*kt):Ge=1,$e=0,ot=0,lt=0}Q!==null?(Ye=Q.x,St=Q.y,Ot=Q.z):(Ye=0,St=0,Ot=0);const Ct=Re.convert(W.format),nn=Re.convert(W.type);let Ue;W.isData3DTexture?(ue.setTexture3D(W,0),Ue=G.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(ue.setTexture2DArray(W,0),Ue=G.TEXTURE_2D_ARRAY):(ue.setTexture2D(W,0),Ue=G.TEXTURE_2D),M.activeTexture(G.TEXTURE0),M.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,W.flipY),M.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),M.pixelStorei(G.UNPACK_ALIGNMENT,W.unpackAlignment);const gn=M.getParameter(G.UNPACK_ROW_LENGTH),dt=M.getParameter(G.UNPACK_IMAGE_HEIGHT),Nn=M.getParameter(G.UNPACK_SKIP_PIXELS),Un=M.getParameter(G.UNPACK_SKIP_ROWS),mt=M.getParameter(G.UNPACK_SKIP_IMAGES);M.pixelStorei(G.UNPACK_ROW_LENGTH,Xt.width),M.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Xt.height),M.pixelStorei(G.UNPACK_SKIP_PIXELS,$e),M.pixelStorei(G.UNPACK_SKIP_ROWS,ot),M.pixelStorei(G.UNPACK_SKIP_IMAGES,lt);const Vi=A.isDataArrayTexture||A.isData3DTexture,bt=W.isDataArrayTexture||W.isData3DTexture;if(A.isDepthTexture){const kt=ne.get(A),di=ne.get(W),Pt=ne.get(kt.__renderTarget),pi=ne.get(di.__renderTarget);M.bindFramebuffer(G.READ_FRAMEBUFFER,Pt.__webglFramebuffer),M.bindFramebuffer(G.DRAW_FRAMEBUFFER,pi.__webglFramebuffer);for(let Ri=0;Ri<Ge;Ri++)Vi&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ne.get(A).__webglTexture,j,lt+Ri),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ne.get(W).__webglTexture,Te,Ot+Ri)),G.blitFramebuffer($e,ot,Oe,Ee,Ye,St,Oe,Ee,G.DEPTH_BUFFER_BIT,G.NEAREST);M.bindFramebuffer(G.READ_FRAMEBUFFER,null),M.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(j!==0||A.isRenderTargetTexture||ne.has(A)){const kt=ne.get(A),di=ne.get(W);M.bindFramebuffer(G.READ_FRAMEBUFFER,he),M.bindFramebuffer(G.DRAW_FRAMEBUFFER,J);for(let Pt=0;Pt<Ge;Pt++)Vi?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,kt.__webglTexture,j,lt+Pt):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,kt.__webglTexture,j),bt?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,di.__webglTexture,Te,Ot+Pt):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,di.__webglTexture,Te),j!==0?G.blitFramebuffer($e,ot,Oe,Ee,Ye,St,Oe,Ee,G.COLOR_BUFFER_BIT,G.NEAREST):bt?G.copyTexSubImage3D(Ue,Te,Ye,St,Ot+Pt,$e,ot,Oe,Ee):G.copyTexSubImage2D(Ue,Te,Ye,St,$e,ot,Oe,Ee);M.bindFramebuffer(G.READ_FRAMEBUFFER,null),M.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else bt?A.isDataTexture||A.isData3DTexture?G.texSubImage3D(Ue,Te,Ye,St,Ot,Oe,Ee,Ge,Ct,nn,Xt.data):W.isCompressedArrayTexture?G.compressedTexSubImage3D(Ue,Te,Ye,St,Ot,Oe,Ee,Ge,Ct,Xt.data):G.texSubImage3D(Ue,Te,Ye,St,Ot,Oe,Ee,Ge,Ct,nn,Xt):A.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Te,Ye,St,Oe,Ee,Ct,nn,Xt.data):A.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Te,Ye,St,Xt.width,Xt.height,Ct,Xt.data):G.texSubImage2D(G.TEXTURE_2D,Te,Ye,St,Oe,Ee,Ct,nn,Xt);M.pixelStorei(G.UNPACK_ROW_LENGTH,gn),M.pixelStorei(G.UNPACK_IMAGE_HEIGHT,dt),M.pixelStorei(G.UNPACK_SKIP_PIXELS,Nn),M.pixelStorei(G.UNPACK_SKIP_ROWS,Un),M.pixelStorei(G.UNPACK_SKIP_IMAGES,mt),Te===0&&W.generateMipmaps&&G.generateMipmap(Ue),M.unbindTexture()},this.initRenderTarget=function(A){ne.get(A).__webglFramebuffer===void 0&&ue.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ue.setTextureCube(A,0):A.isData3DTexture?ue.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ue.setTexture2DArray(A,0):ue.setTexture2D(A,0),M.unbindTexture()},this.resetState=function(){oe=0,ee=0,X=null,M.reset(),Le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=xt._getDrawingBufferColorSpace(e),t.unpackColorSpace=xt._getUnpackColorSpace()}}const l_={type:"change"},ld={type:"start"},$_={type:"end"},nu=new pa,u_=new Or,Kw=Math.cos(70*kx.DEG2RAD),ln=new q,Hn=2*Math.PI,Ut={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Wf=1e-6;class B1 extends $y{constructor(e,t=null){super(e,t),this.state=Ut.NONE,this.target=new q,this.cursor=new q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:sa.ROTATE,MIDDLE:sa.DOLLY,RIGHT:sa.PAN},this.touches={ONE:ra.ROTATE,TWO:ra.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new q,this._lastQuaternion=new ur,this._lastTargetPosition=new q,this._quat=new ur().setFromUnitVectors(e.up,new q(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Fg,this._sphericalDelta=new Fg,this._scale=1,this._panOffset=new q,this._rotateStart=new it,this._rotateEnd=new it,this._rotateDelta=new it,this._panStart=new it,this._panEnd=new it,this._panDelta=new it,this._dollyStart=new it,this._dollyEnd=new it,this._dollyDelta=new it,this._dollyDirection=new q,this._mouse=new it,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Zw.bind(this),this._onPointerDown=$w.bind(this),this._onPointerUp=Jw.bind(this),this._onContextMenu=r1.bind(this),this._onMouseWheel=e1.bind(this),this._onKeyDown=t1.bind(this),this._onTouchStart=n1.bind(this),this._onTouchMove=i1.bind(this),this._onMouseDown=jw.bind(this),this._onMouseMove=Qw.bind(this),this._interceptControlDown=s1.bind(this),this._interceptControlUp=a1.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction=""}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(l_),this.update(),this.state=Ut.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;ln.copy(t).sub(this.target),ln.applyQuaternion(this._quat),this._spherical.setFromVector3(ln),this.autoRotate&&this.state===Ut.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,a=this.maxAzimuthAngle;isFinite(r)&&isFinite(a)&&(r<-Math.PI?r+=Hn:r>Math.PI&&(r-=Hn),a<-Math.PI?a+=Hn:a>Math.PI&&(a-=Hn),r<=a?this._spherical.theta=Math.max(r,Math.min(a,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(r+a)/2?Math.max(r,this._spherical.theta):Math.min(a,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let l=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const c=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),l=c!=this._spherical.radius}if(ln.setFromSpherical(this._spherical),ln.applyQuaternion(this._quatInverse),t.copy(this.target).add(ln),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let c=null;if(this.object.isPerspectiveCamera){const f=ln.length();c=this._clampDistance(f*this._scale);const p=f-c;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),l=!!p}else if(this.object.isOrthographicCamera){const f=new q(this._mouse.x,this._mouse.y,0);f.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),l=p!==this.object.zoom;const d=new q(this._mouse.x,this._mouse.y,0);d.unproject(this.object),this.object.position.sub(d).add(f),this.object.updateMatrixWorld(),c=ln.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;c!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(c).add(this.object.position):(nu.origin.copy(this.object.position),nu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(nu.direction))<Kw?this.object.lookAt(this.target):(u_.setFromNormalAndCoplanarPoint(this.object.up,this.target),nu.intersectPlane(u_,this.target))))}else if(this.object.isOrthographicCamera){const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),c!==this.object.zoom&&(this.object.updateProjectionMatrix(),l=!0)}return this._scale=1,this._performCursorZoom=!1,l||this._lastPosition.distanceToSquared(this.object.position)>Wf||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Wf||this._lastTargetPosition.distanceToSquared(this.target)>Wf?(this.dispatchEvent(l_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Hn/60*this.autoRotateSpeed*e:Hn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){ln.setFromMatrixColumn(t,0),ln.multiplyScalar(-e),this._panOffset.add(ln)}_panUp(e,t){this.screenSpacePanning===!0?ln.setFromMatrixColumn(t,1):(ln.setFromMatrixColumn(t,0),ln.crossVectors(this.object.up,ln)),ln.multiplyScalar(e),this._panOffset.add(ln)}_pan(e,t){const r=this.domElement;if(this.object.isPerspectiveCamera){const a=this.object.position;ln.copy(a).sub(this.target);let l=ln.length();l*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*l/r.clientHeight,this.object.matrix),this._panUp(2*t*l/r.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/r.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/r.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const r=this.domElement.getBoundingClientRect(),a=e-r.left,l=t-r.top,c=r.width,f=r.height;this._mouse.x=a/c*2-1,this._mouse.y=-(l/f)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Hn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._rotateStart.set(r,a)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._panStart.set(r,a)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),r=e.pageX-t.x,a=e.pageY-t.y,l=Math.sqrt(r*r+a*a);this._dollyStart.set(0,l)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const r=this._getSecondPointerPosition(e),a=.5*(e.pageX+r.x),l=.5*(e.pageY+r.y);this._rotateEnd.set(a,l)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Hn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Hn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),r=.5*(e.pageX+t.x),a=.5*(e.pageY+t.y);this._panEnd.set(r,a)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),r=e.pageX-t.x,a=e.pageY-t.y,l=Math.sqrt(r*r+a*a);this._dollyEnd.set(0,l),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const c=(e.pageX+t.x)*.5,f=(e.pageY+t.y)*.5;this._updateZoomParameters(c,f)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new it,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,r={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:r.deltaY*=16;break;case 2:r.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(r.deltaY*=10),r}}function $w(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function Zw(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function Jw(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent($_),this.state=Ut.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function jw(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case sa.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Ut.DOLLY;break;case sa.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ut.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ut.ROTATE}break;case sa.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ut.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ut.PAN}break;default:this.state=Ut.NONE}this.state!==Ut.NONE&&this.dispatchEvent(ld)}function Qw(s){switch(this.state){case Ut.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Ut.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Ut.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function e1(s){this.enabled===!1||this.enableZoom===!1||this.state!==Ut.NONE||(s.preventDefault(),this.dispatchEvent(ld),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent($_))}function t1(s){this.enabled!==!1&&this._handleKeyDown(s)}function n1(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case ra.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Ut.TOUCH_ROTATE;break;case ra.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Ut.TOUCH_PAN;break;default:this.state=Ut.NONE}break;case 2:switch(this.touches.TWO){case ra.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Ut.TOUCH_DOLLY_PAN;break;case ra.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Ut.TOUCH_DOLLY_ROTATE;break;default:this.state=Ut.NONE}break;default:this.state=Ut.NONE}this.state!==Ut.NONE&&this.dispatchEvent(ld)}function i1(s){switch(this._trackPointer(s),this.state){case Ut.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Ut.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Ut.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Ut.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Ut.NONE}}function r1(s){this.enabled!==!1&&s.preventDefault()}function s1(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function a1(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}export{lx as $,L1 as A,Gn as B,ht as C,nr as D,R1 as E,A1 as F,Cl as G,C1 as H,g1 as I,_t as J,v1 as K,I_ as L,fi as M,vg as N,B1 as O,Jn as P,ur as Q,N1 as R,m1 as S,b1 as T,tn as U,it as V,O1 as W,I1 as X,ps as Y,Al as Z,uf as _,F_ as a,Rn as a0,xn as a1,eh as a2,th as a3,ir as a4,hy as a5,Gr as a6,xy as a7,Nt as a8,_1 as a9,Or as aA,F1 as aB,Wn as aC,Bi as aD,zi as aE,qv as aF,Yv as aG,Vv as aH,U1 as aI,Og as aJ,Ft as aK,ed as aL,M1 as aM,x1 as aa,y1 as ab,S1 as ac,kx as ad,sd as ae,D_ as af,w1 as ag,sy as ah,fu as ai,Dh as aj,yn as ak,k_ as al,nd as am,id as an,zr as ao,yo as ap,Hr as aq,fr as ar,Ly as as,Vr as at,pa as au,cr as av,Fg as aw,td as ax,Dy as ay,ut as az,L_ as b,oi as c,hi as d,fy as e,q as f,f1 as g,c1 as h,c_ as i,u1 as j,o1 as k,l1 as l,yu as m,ci as n,T1 as o,P1 as p,So as q,Lv as r,D1 as s,du as t,xt as u,P_ as v,h1 as w,p1 as x,d1 as y,E1 as z};
