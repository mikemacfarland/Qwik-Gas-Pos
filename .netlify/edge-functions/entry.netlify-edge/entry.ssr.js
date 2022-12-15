import{j as d,r as re,d as oe,F as G,s as ie,R as ae}from"./assets/root.037eb7ef.js";/**
 * @license
 * @builder.io/qwik/server 0.15.2
 * Copyright Builder.io, Inc. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/BuilderIO/qwik/blob/main/LICENSE
 */if(typeof global>"u"){const e=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof self<"u"?self:{};e.global=e}var ce=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(n,t)=>(typeof require<"u"?require:n)[t]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw new Error('Dynamic require of "'+e+'" is not supported')});function k(){if(typeof performance>"u")return()=>0;const e=performance.now();return()=>(performance.now()-e)/1e6}function V(e){let n=e.base;return typeof n=="string"?(n.endsWith("/")||(n+="/"),n):"/build/"}function le(e,n){const t=n==null?void 0:n.mapper,r=e.symbolMapper?e.symbolMapper:o=>{if(t){const i=W(o),a=t[i];return a||console.error("Cannot resolve symbol",o,"in",t),a}};return{isServer:!0,async importSymbol(o,i,a){let l=String(i);l.endsWith(".js")||(l+=".js");const q=ce(l);if(!(a in q))throw new Error(`Q-ERROR: missing symbol '${a}' in module '${l}'.`);return q[a]},raf:()=>(console.error("server can not rerender"),Promise.resolve()),nextTick:o=>new Promise(i=>{setTimeout(()=>{i(o())})}),chunkForSymbol(o){return r(o,t)}}}async function de(e,n){const t=le(e,n);ie(t)}var W=e=>{const n=e.lastIndexOf("_");return n>-1?e.slice(n+1):e},me='((e,t)=>{const n="__q_context__",o=window,i=new Set,s=t=>e.querySelectorAll(t),r=(e,t,n=t.type)=>{s("[on"+e+"\\\\:"+n+"]").forEach((o=>f(o,e,t,n)))},a=(e,t)=>e.getAttribute(t),l=t=>{if(void 0===t._qwikjson_){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===a(n,"type")){t._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/g,"<$1"));break}n=n.previousElementSibling}}},c=(e,t)=>new CustomEvent(e,{detail:t}),f=async(t,o,i,s=i.type)=>{const r="on"+o+":"+s;t.hasAttribute("preventdefault:"+s)&&i.preventDefault();const c=t._qc_,f=null==c?void 0:c.li.filter((e=>e[0]===r));if(f&&f.length>0){for(const e of f)await e[1].getFn([t,i],(()=>t.isConnected))(i,t);return}const d=a(t,r);if(d){const o=t.closest("[q\\\\:container]"),s=new URL(a(o,"q:base"),e.baseURI);for(const r of d.split("\\n")){const a=new URL(r,s),c=a.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",f=performance.now(),d=import(a.href.split("#")[0]);l(o);const p=b(await d,c),w=e[n];if(t.isConnected)try{e[n]=[t,i,a],u("qsymbol",{symbol:c,element:t,reqTime:f}),await p(i,t)}finally{e[n]=w}}}},u=(t,n)=>{e.dispatchEvent(c(t,n))},b=(e,t)=>{if(t in e)return e[t];for(const n of Object.values(e))if("object"==typeof n&&n&&t in n)return n[t]},d=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),p=async e=>{let t=d(e.type),n=e.target;for(r("-document",e,t);n&&n.getAttribute;)await f(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},w=e=>{r("-window",e,d(e.type))},q=()=>{var n;const r=e.readyState;if(!t&&("interactive"==r||"complete"==r)&&(t=1,u("qinit"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>u("qidle"))),i.has("qvisible"))){const e=s("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),f(n.target,"",c("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},v=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o}),y=t=>{for(const n of t)i.has(n)||(v(e,n,p,!0),v(o,n,w),i.add(n))};if(!e.qR){const t=o.qwikevents;Array.isArray(t)&&y(t),o.qwikevents={push:(...e)=>y(e)},v(e,"readystatechange",q),q()}})(document);',ue=`(() => {
    ((doc, hasInitialized) => {
        const win = window;
        const events =  new Set;
        const querySelectorAll = query => doc.querySelectorAll(query);
        const broadcast = (infix, ev, type = ev.type) => {
            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));
        };
        const getAttribute = (el, name) => el.getAttribute(name);
        const resolveContainer = containerEl => {
            if (void 0 === containerEl._qwikjson_) {
                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;
                while (script) {
                    if ("SCRIPT" === script.tagName && "qwik/json" === getAttribute(script, "type")) {
                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/g, "<$1"));
                        break;
                    }
                    script = script.previousElementSibling;
                }
            }
        };
        const createEvent = (eventName, detail) => new CustomEvent(eventName, {
            detail: detail
        });
        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {
            const attrName = "on" + onPrefix + ":" + eventName;
            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();
            const ctx = element._qc_;
            const qrls = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));
            if (qrls && qrls.length > 0) {
                for (const q of qrls) {
                    await q[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);
                }
                return;
            }
            const attrValue = getAttribute(element, attrName);
            if (attrValue) {
                const container = element.closest("[q\\\\:container]");
                const base = new URL(getAttribute(container, "q:base"), doc.baseURI);
                for (const qrl of attrValue.split("\\n")) {
                    const url = new URL(qrl, base);
                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";
                    const reqTime = performance.now();
                    const module = import(url.href.split("#")[0]);
                    resolveContainer(container);
                    const handler = findSymbol(await module, symbolName);
                    const previousCtx = doc.__q_context__;
                    if (element.isConnected) {
                        try {
                            doc.__q_context__ = [ element, ev, url ];
                            emitEvent("qsymbol", {
                                symbol: symbolName,
                                element: element,
                                reqTime: reqTime
                            });
                            await handler(ev, element);
                        } finally {
                            doc.__q_context__ = previousCtx;
                        }
                    }
                }
            }
        };
        const emitEvent = (eventName, detail) => {
            doc.dispatchEvent(createEvent(eventName, detail));
        };
        const findSymbol = (module, symbol) => {
            if (symbol in module) {
                return module[symbol];
            }
            for (const v of Object.values(module)) {
                if ("object" == typeof v && v && symbol in v) {
                    return v[symbol];
                }
            }
        };
        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));
        const processDocumentEvent = async ev => {
            let type = camelToKebab(ev.type);
            let element = ev.target;
            broadcast("-document", ev, type);
            while (element && element.getAttribute) {
                await dispatch(element, "", ev, type);
                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;
            }
        };
        const processWindowEvent = ev => {
            broadcast("-window", ev, camelToKebab(ev.type));
        };
        const processReadyStateChange = () => {
            var _a;
            const readyState = doc.readyState;
            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {
                hasInitialized = 1;
                emitEvent("qinit");
                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));
                if (events.has("qvisible")) {
                    const results = querySelectorAll("[on\\\\:qvisible]");
                    const observer = new IntersectionObserver((entries => {
                        for (const entry of entries) {
                            if (entry.isIntersecting) {
                                observer.unobserve(entry.target);
                                dispatch(entry.target, "", createEvent("qvisible", entry));
                            }
                        }
                    }));
                    results.forEach((el => observer.observe(el)));
                }
            }
        };
        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {
            capture: capture
        });
        const push = eventNames => {
            for (const eventName of eventNames) {
                if (!events.has(eventName)) {
                    addEventListener(doc, eventName, processDocumentEvent, !0);
                    addEventListener(win, eventName, processWindowEvent);
                    events.add(eventName);
                }
            }
        };
        if (!doc.qR) {
            const qwikevents = win.qwikevents;
            Array.isArray(qwikevents) && push(qwikevents);
            win.qwikevents = {
                push: (...e) => push(e)
            };
            addEventListener(doc, "readystatechange", processReadyStateChange);
            processReadyStateChange();
        }
    })(document);
})();`,pe='((e,t)=>{const n="__q_context__",o=window,i=new Set,s=t=>e.querySelectorAll(t),r=(e,t,n=t.type)=>{s("[on"+e+"\\\\:"+n+"]").forEach((o=>f(o,e,t,n)))},a=(e,t)=>e.getAttribute(t),l=t=>{if(void 0===t._qwikjson_){let n=(t===e.documentElement?e.body:t).lastElementChild;for(;n;){if("SCRIPT"===n.tagName&&"qwik/json"===a(n,"type")){t._qwikjson_=JSON.parse(n.textContent.replace(/\\\\x3C(\\/?script)/g,"<$1"));break}n=n.previousElementSibling}}},c=(e,t)=>new CustomEvent(e,{detail:t}),f=async(t,o,i,s=i.type)=>{const r="on"+o+":"+s;t.hasAttribute("preventdefault:"+s)&&i.preventDefault();const c=t._qc_,f=null==c?void 0:c.li.filter((e=>e[0]===r));if(f&&f.length>0){for(const e of f)await e[1].getFn([t,i],(()=>t.isConnected))(i,t);return}const d=a(t,r);if(d){const o=t.closest("[q\\\\:container]"),s=new URL(a(o,"q:base"),e.baseURI);for(const r of d.split("\\n")){const a=new URL(r,s),c=a.hash.replace(/^#?([^?[|]*).*$/,"$1")||"default",f=performance.now(),d=import(a.href.split("#")[0]);l(o);const p=b(await d,c),w=e[n];if(t.isConnected)try{e[n]=[t,i,a],u("qsymbol",{symbol:c,element:t,reqTime:f}),await p(i,t)}finally{e[n]=w}}}},u=(t,n)=>{e.dispatchEvent(c(t,n))},b=(e,t)=>{if(t in e)return e[t];for(const n of Object.values(e))if("object"==typeof n&&n&&t in n)return n[t]},d=e=>e.replace(/([A-Z])/g,(e=>"-"+e.toLowerCase())),p=async e=>{let t=d(e.type),n=e.target;for(r("-document",e,t);n&&n.getAttribute;)await f(n,"",e,t),n=e.bubbles&&!0!==e.cancelBubble?n.parentElement:null},w=e=>{r("-window",e,d(e.type))},q=()=>{var n;const r=e.readyState;if(!t&&("interactive"==r||"complete"==r)&&(t=1,u("qinit"),(null!=(n=o.requestIdleCallback)?n:o.setTimeout).bind(o)((()=>u("qidle"))),i.has("qvisible"))){const e=s("[on\\\\:qvisible]"),t=new IntersectionObserver((e=>{for(const n of e)n.isIntersecting&&(t.unobserve(n.target),f(n.target,"",c("qvisible",n)))}));e.forEach((e=>t.observe(e)))}},v=(e,t,n,o=!1)=>e.addEventListener(t,n,{capture:o}),y=t=>{for(const n of t)i.has(n)||(v(e,n,p,!0),v(o,n,w),i.add(n))};if(!e.qR){const t=o.qwikevents;Array.isArray(t)&&y(t),o.qwikevents={push:(...e)=>y(e)},v(e,"readystatechange",q),q()}})(document);',fe=`(() => {
    ((doc, hasInitialized) => {
        const win = window;
        const events = new Set;
        const querySelectorAll = query => doc.querySelectorAll(query);
        const broadcast = (infix, ev, type = ev.type) => {
            querySelectorAll("[on" + infix + "\\\\:" + type + "]").forEach((target => dispatch(target, infix, ev, type)));
        };
        const getAttribute = (el, name) => el.getAttribute(name);
        const resolveContainer = containerEl => {
            if (void 0 === containerEl._qwikjson_) {
                let script = (containerEl === doc.documentElement ? doc.body : containerEl).lastElementChild;
                while (script) {
                    if ("SCRIPT" === script.tagName && "qwik/json" === getAttribute(script, "type")) {
                        containerEl._qwikjson_ = JSON.parse(script.textContent.replace(/\\\\x3C(\\/?script)/g, "<$1"));
                        break;
                    }
                    script = script.previousElementSibling;
                }
            }
        };
        const createEvent = (eventName, detail) => new CustomEvent(eventName, {
            detail: detail
        });
        const dispatch = async (element, onPrefix, ev, eventName = ev.type) => {
            const attrName = "on" + onPrefix + ":" + eventName;
            element.hasAttribute("preventdefault:" + eventName) && ev.preventDefault();
            const ctx = element._qc_;
            const qrls = null == ctx ? void 0 : ctx.li.filter((li => li[0] === attrName));
            if (qrls && qrls.length > 0) {
                for (const q of qrls) {
                    await q[1].getFn([ element, ev ], (() => element.isConnected))(ev, element);
                }
                return;
            }
            const attrValue = getAttribute(element, attrName);
            if (attrValue) {
                const container = element.closest("[q\\\\:container]");
                const base = new URL(getAttribute(container, "q:base"), doc.baseURI);
                for (const qrl of attrValue.split("\\n")) {
                    const url = new URL(qrl, base);
                    const symbolName = url.hash.replace(/^#?([^?[|]*).*$/, "$1") || "default";
                    const reqTime = performance.now();
                    const module = import(url.href.split("#")[0]);
                    resolveContainer(container);
                    const handler = findSymbol(await module, symbolName);
                    const previousCtx = doc.__q_context__;
                    if (element.isConnected) {
                        try {
                            doc.__q_context__ = [ element, ev, url ];
                            emitEvent("qsymbol", {
                                symbol: symbolName,
                                element: element,
                                reqTime: reqTime
                            });
                            await handler(ev, element);
                        } finally {
                            doc.__q_context__ = previousCtx;
                        }
                    }
                }
            }
        };
        const emitEvent = (eventName, detail) => {
            doc.dispatchEvent(createEvent(eventName, detail));
        };
        const findSymbol = (module, symbol) => {
            if (symbol in module) {
                return module[symbol];
            }
            for (const v of Object.values(module)) {
                if ("object" == typeof v && v && symbol in v) {
                    return v[symbol];
                }
            }
        };
        const camelToKebab = str => str.replace(/([A-Z])/g, (a => "-" + a.toLowerCase()));
        const processDocumentEvent = async ev => {
            let type = camelToKebab(ev.type);
            let element = ev.target;
            broadcast("-document", ev, type);
            while (element && element.getAttribute) {
                await dispatch(element, "", ev, type);
                element = ev.bubbles && !0 !== ev.cancelBubble ? element.parentElement : null;
            }
        };
        const processWindowEvent = ev => {
            broadcast("-window", ev, camelToKebab(ev.type));
        };
        const processReadyStateChange = () => {
            var _a;
            const readyState = doc.readyState;
            if (!hasInitialized && ("interactive" == readyState || "complete" == readyState)) {
                hasInitialized = 1;
                emitEvent("qinit");
                (null != (_a = win.requestIdleCallback) ? _a : win.setTimeout).bind(win)((() => emitEvent("qidle")));
                if (events.has("qvisible")) {
                    const results = querySelectorAll("[on\\\\:qvisible]");
                    const observer = new IntersectionObserver((entries => {
                        for (const entry of entries) {
                            if (entry.isIntersecting) {
                                observer.unobserve(entry.target);
                                dispatch(entry.target, "", createEvent("qvisible", entry));
                            }
                        }
                    }));
                    results.forEach((el => observer.observe(el)));
                }
            }
        };
        const addEventListener = (el, eventName, handler, capture = !1) => el.addEventListener(eventName, handler, {
            capture: capture
        });
        const push = eventNames => {
            for (const eventName of eventNames) {
                if (!events.has(eventName)) {
                    addEventListener(doc, eventName, processDocumentEvent, !0);
                    addEventListener(win, eventName, processWindowEvent);
                    events.add(eventName);
                }
            }
        };
        if (!doc.qR) {
            const qwikevents = win.qwikevents;
            Array.isArray(qwikevents) && push(qwikevents);
            win.qwikevents = {
                push: (...e) => push(e)
            };
            addEventListener(doc, "readystatechange", processReadyStateChange);
            processReadyStateChange();
        }
    })(document);
})();`;function be(e={}){return Array.isArray(e.events)&&e.events.length>0?(e.debug?fe:pe).replace("window.qEvents",JSON.stringify(e.events)):e.debug?ue:me}function ye(e,n,t){if(!t)return[];const r=n.prefetchStrategy,s=V(n);if(r!==null){if(!r||!r.symbolsToPrefetch||r.symbolsToPrefetch==="auto")return qe(e,t,s);if(typeof r.symbolsToPrefetch=="function")try{return r.symbolsToPrefetch({manifest:t.manifest})}catch(o){console.error("getPrefetchUrls, symbolsToPrefetch()",o)}}return[]}function qe(e,n,t){const r=[],s=e==null?void 0:e.qrls,{mapper:o,manifest:i}=n,a=new Set;if(Array.isArray(s))for(const l of s){const q=l.getHash(),p=o[q];p&&B(i,a,r,t,p[1])}return r}function B(e,n,t,r,s){const o=r+s;if(!n.has(o)){n.add(o);const i=e.bundles[s];if(i){const a={url:o,imports:[]};if(t.push(a),Array.isArray(i.imports))for(const l of i.imports)B(e,n,a.imports,r,l)}}}var _=globalThis.qDev===!0,he=[],J={};_&&(Object.freeze(he),Object.freeze(J),Error.stackTraceLimit=9999);["click","dblclick","contextmenu","auxclick","pointerdown","pointerup","pointermove","pointerover","pointerenter","pointerleave","pointerout","pointercancel","gotpointercapture","lostpointercapture","touchstart","touchend","touchmove","touchcancel","mousedown","mouseup","mousemove","mouseenter","mouseleave","mouseover","mouseout","wheel","gesturestart","gesturechange","gestureend","keydown","keyup","keypress","input","change","search","invalid","beforeinput","select","focusin","focusout","focus","blur","submit","reset","scroll"].map(e=>`on${e.toLowerCase()}$`);["useWatch$","useClientEffect$","useEffect$","component$","useStyles$","useStylesScoped$"].map(e=>e.toLowerCase());function ve(e){if(e!=null&&e.mapping!=null&&typeof e.mapping=="object"&&e.symbols!=null&&typeof e.symbols=="object"&&e.bundles!=null&&typeof e.bundles=="object")return e}function x(){let s=`const w=new Worker(URL.createObjectURL(new Blob(['onmessage=(e)=>{Promise.all(e.data.map(u=>fetch(u))).finally(()=>{setTimeout(postMessage({}),9999)})}'],{type:"text/javascript"})));`;return s+="w.postMessage(u.map(u=>new URL(u,origin)+''));",s+="w.onmessage=()=>{w.terminate()};",s}function _e(e){const n={bundles:w(e).map(t=>t.split("/").pop())};return`document.dispatchEvent(new CustomEvent("qprefetch",{detail:${JSON.stringify(n)}}))`}function w(e){const n=[],t=r=>{if(Array.isArray(r))for(const s of r)n.includes(s.url)||(n.push(s.url),t(s.imports))};return t(e),n}function we(e,n){const t=Ie(e==null?void 0:e.implementation),r=[];return t.prefetchEvent==="always"&&ge(r,n),t.linkInsert==="html-append"&&je(r,n,t),t.linkInsert==="js-append"?ke(r,n,t):t.workerFetchInsert==="always"&&xe(r,n),r.length>0?d(G,{children:r}):null}function ge(e,n){e.push(d("script",{type:"module",dangerouslySetInnerHTML:_e(n)}))}function je(e,n,t){const r=w(n),s=t.linkRel||"prefetch";for(const o of r){const i={};i.href=o,i.rel=s,(s==="prefetch"||s==="preload")&&o.endsWith(".js")&&(i.as="script"),e.push(d("link",i,void 0))}}function ke(e,n,t){const r=t.linkRel||"prefetch";let s="";t.workerFetchInsert==="no-link-support"&&(s+="let supportsLinkRel = true;"),s+=`const u=${JSON.stringify(w(n))};`,s+="u.map((u,i)=>{",s+="const l=document.createElement('link');",s+='l.setAttribute("href",u);',s+=`l.setAttribute("rel","${r}");`,t.workerFetchInsert==="no-link-support"&&(s+="if(i===0){",s+="try{",s+=`supportsLinkRel=l.relList.supports("${r}");`,s+="}catch(e){}",s+="}"),s+="document.body.appendChild(l);",s+="});",t.workerFetchInsert==="no-link-support"&&(s+="if(!supportsLinkRel){",s+=x(),s+="}"),t.workerFetchInsert==="always"&&(s+=x()),e.push(d("script",{type:"module",dangerouslySetInnerHTML:s}))}function xe(e,n){let t=`const u=${JSON.stringify(w(n))};`;t+=x(),e.push(d("script",{type:"module",dangerouslySetInnerHTML:t}))}function Ie(e){if(typeof e=="string"){switch(e){case"link-prefetch-html":return y(e,"linkInsert"),{linkInsert:"html-append",linkRel:"prefetch",workerFetchInsert:null,prefetchEvent:null};case"link-prefetch":return y(e,"linkInsert"),{linkInsert:"js-append",linkRel:"prefetch",workerFetchInsert:"no-link-support",prefetchEvent:null};case"link-preload-html":return y(e,"linkInsert"),{linkInsert:"html-append",linkRel:"preload",workerFetchInsert:null,prefetchEvent:null};case"link-preload":return y(e,"linkInsert"),{linkInsert:"js-append",linkRel:"preload",workerFetchInsert:"no-link-support",prefetchEvent:null};case"link-modulepreload-html":return y(e,"linkInsert"),{linkInsert:"html-append",linkRel:"modulepreload",workerFetchInsert:null,prefetchEvent:null};case"link-modulepreload":return y(e,"linkInsert"),{linkInsert:"js-append",linkRel:"modulepreload",workerFetchInsert:"no-link-support",prefetchEvent:null}}return y(e,"workerFetchInsert"),{linkInsert:null,linkRel:null,workerFetchInsert:"always",prefetchEvent:null}}return e&&typeof e=="object"?e:Ee}var Ee={linkInsert:null,linkRel:null,workerFetchInsert:null,prefetchEvent:"always"};function y(e,n){console.warn(`The Prefetch Strategy Implementation "${e}" has been deprecated and will be removed in an upcoming release. Please update to use the "prefetchStrategy.implementation.${n}" interface.`)}var Ne=e=>e&&typeof e.nodeType=="number",Ce=e=>e.nodeType===1,Se=_?"background: #564CE0; color: white; padding: 2px 3px; border-radius: 2px; font-size: 0.8em;":"",Le=(e,...n)=>{const t=e instanceof Error?e:ze(e),r=t.stack||t.message;return console.error("%cQWIK ERROR",Se,r,...Fe(n)),t},ze=e=>{const n=new Error(e);return n.stack&&(n.stack=Ae(n.stack)),n},Ae=(e,n=0)=>e.split(`
`).slice(n).filter(t=>!t.includes("/node_modules/@builder.io/qwik")).join(`
`),Oe=(e,...n)=>{const t=Le(e,...n);debugger;return t},Te=e=>e._qc_,Fe=e=>_?e.map(n=>Ne(n)&&Ce(n)?$e(n):n):e,$e=e=>{var r;const n=Te(e),t=(()=>typeof process<"u"&&!!process.versions&&!!process.versions.node)();return{tagName:e.tagName,renderQRL:(r=n==null?void 0:n.$componentQrl$)==null?void 0:r.getSymbol(),element:t?void 0:e,ctx:t?void 0:n}};function Pe(e,n,...t){if(_){if(e!=null)return;throw Oe(n,...t)}}var Re="<!DOCTYPE html>";async function Ke(e,n){var O,T,F,$,P,R;n=Ue(n);let t=n.stream,r=0,s=0,o=0,i=0;const a=(T=(O=n.streaming)==null?void 0:O.inOrder)!=null?T:{strategy:"auto",maximunInitialChunk:5e4,maximunChunk:3e4},l=(F=n.containerTagName)!=null?F:"html",q=($=n.containerAttributes)!=null?$:{};let p="";const I=t,X=k();function E(){p&&(I.write(p),p="",r=0,o++,o===1&&(i=X()))}function N(c){r+=c.length,s+=c.length,p+=c}switch(a.strategy){case"disabled":t={write:N};break;case"direct":t=I;break;case"auto":let c=0,m=!1;const g=(P=a.maximunChunk)!=null?P:0,j=(R=a.maximunInitialChunk)!=null?R:0;t={write(h){h==="<!--qkssr-f-->"?m||(m=!0):h==="<!--qkssr-pu-->"?c++:h==="<!--qkssr-po-->"?c--:N(h),c===0&&(m||r>=(o===0?j:g))&&(m=!1,E())}};break}l==="html"?t.write(Re):(t.write("<!--cq-->"),n.qwikLoader?(n.qwikLoader.include===void 0&&(n.qwikLoader.include="never"),n.qwikLoader.position===void 0&&(n.qwikLoader.position="bottom")):n.qwikLoader={include:"never"}),n.manifest||console.warn("Missing client manifest, loading symbols in the client might 404. Please ensure the client build has run and generated the manifest for the server build.");const H=V(n),f=Ye(n.manifest);await de(n,f);let b;const C=f==null?void 0:f.manifest.injections,ee=C?C.map(c=>{var m;return d(c.tag,(m=c.attributes)!=null?m:J)}):void 0,ne=k(),S=[];let L=0,z=0,A=!1;await re(e,{stream:t,containerTagName:l,containerAttributes:q,envData:n.envData,base:H,beforeContent:ee,beforeClose:async(c,m,g)=>{var D,U,Q;L=ne();const j=k();A=g,b=await oe(c,m);const h=JSON.stringify(b.state,void 0,_?"  ":void 0),v=[d("script",{type:"qwik/json",dangerouslySetInnerHTML:Me(h)})];if(n.prefetchStrategy!==null){const u=ye(b,n,f);if(u.length>0){const Z=we(n.prefetchStrategy,u);Z&&v.push(Z)}}const se=!b||b.mode!=="static",K=(U=(D=n.qwikLoader)==null?void 0:D.include)!=null?U:"auto",Y=K==="always"||K==="auto"&&se;if(Y){const u=be({events:(Q=n.qwikLoader)==null?void 0:Q.events,debug:n.debug});v.push(d("script",{id:"qwikloader",dangerouslySetInnerHTML:u}))}const M=Array.from(m.$events$,u=>JSON.stringify(u));if(M.length>0){let u=`window.qwikevents.push(${M.join(", ")})`;Y||(u=`window.qwikevents||=[];${u}`),v.push(d("script",{dangerouslySetInnerHTML:u}))}return De(S,c),z=j(),d(G,{children:v})}}),l!=="html"&&t.write("<!--/cq-->"),E(),Pe(b,"snapshotResult must be defined");const te=!A&&!b.resources.some(c=>c._cache!==1/0);return{prefetchResources:void 0,snapshotResult:b,flushes:o,manifest:f==null?void 0:f.manifest,size:s,isStatic:te,timing:{render:L,snapshot:z,firstFlush:i},_symbols:S}}function Ye(e){if(!!e){if("mapper"in e)return e;if(e=ve(e),e){const n={};return Object.entries(e.mapping).forEach(([t,r])=>{n[W(t)]=[t,r]}),{mapper:n,manifest:e}}}}var Me=e=>e.replace(/<(\/?script)/g,"\\x3C$1");function De(e,n){var t;for(const r of n){const s=(t=r.$componentQrl$)==null?void 0:t.getSymbol();s&&!e.includes(s)&&e.push(s)}}function Ue(e){const n={...e};return e&&typeof e.base=="function"&&(n.base=e.base(n)),n}const Qe={symbols:{s_kzjavhDI3L0:{origin:"../node_modules/@builder.io/qwik-city/index.qwik.mjs",displayName:"Link_component_a_onClick",canonicalFilename:"s_kzjavhdi3l0",hash:"kzjavhDI3L0",ctxKind:"event",ctxName:"onClick$",captures:!0,parent:"s_8gdLBszqbaM"},s_yiXwCC0m3jY:{origin:"../node_modules/@builder.io/qwik-city/index.qwik.mjs",displayName:"Link_component_a_onMouseOver",canonicalFilename:"s_yixwcc0m3jy",hash:"yiXwCC0m3jY",ctxKind:"event",ctxName:"onMouseOver$",captures:!1,parent:"s_8gdLBszqbaM"},s_EpaZ5qQ4Lg4:{origin:"../node_modules/@builder.io/qwik-city/index.qwik.mjs",displayName:"Link_component_a_onQVisible",canonicalFilename:"s_epaz5qq4lg4",hash:"EpaZ5qQ4Lg4",ctxKind:"event",ctxName:"onQVisible$",captures:!1,parent:"s_8gdLBszqbaM"},s_2Eo7WCpaqI8:{origin:"../node_modules/@builder.io/qwik-city/index.qwik.mjs",displayName:"QwikCityProvider_component_useWatch",canonicalFilename:"s_2eo7wcpaqi8",hash:"2Eo7WCpaqI8",ctxKind:"function",ctxName:"useWatch$",captures:!0,parent:"s_TxCFOy819ag"},s_3sccYCDd1Z0:{origin:"root.tsx",displayName:"root_component",canonicalFilename:"s_3sccycdd1z0",hash:"3sccYCDd1Z0",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_4ofZFIcUyEw:{origin:"routes/food-drinks/index.tsx",displayName:"food_drinks_component",canonicalFilename:"s_4ofzficuyew",hash:"4ofZFIcUyEw",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_8gdLBszqbaM:{origin:"../node_modules/@builder.io/qwik-city/index.qwik.mjs",displayName:"Link_component",canonicalFilename:"s_8gdlbszqbam",hash:"8gdLBszqbaM",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_AKetNByE5TM:{origin:"../node_modules/@builder.io/qwik-city/index.qwik.mjs",displayName:"RouterOutlet_component",canonicalFilename:"s_aketnbye5tm",hash:"AKetNByE5TM",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_II7kv1eMOhQ:{origin:"routes/tobacco/index.tsx",displayName:"tobacco_component",canonicalFilename:"s_ii7kv1emohq",hash:"II7kv1eMOhQ",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_JOM2kKZbpPI:{origin:"components/home-components/GasItem.tsx",displayName:"GasItem_component",canonicalFilename:"s_jom2kkzbppi",hash:"JOM2kKZbpPI",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_P5hGpoY9xnA:{origin:"components/charts/pieChart.tsx",displayName:"pieChart_component",canonicalFilename:"s_p5hgpoy9xna",hash:"P5hGpoY9xnA",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_TxCFOy819ag:{origin:"../node_modules/@builder.io/qwik-city/index.qwik.mjs",displayName:"QwikCityProvider_component",canonicalFilename:"s_txcfoy819ag",hash:"TxCFOy819ag",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_VkLNXphUh5s:{origin:"routes/layout.tsx",displayName:"layout_component",canonicalFilename:"s_vklnxphuh5s",hash:"VkLNXphUh5s",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_WmYC5H00wtI:{origin:"../node_modules/@builder.io/qwik-city/index.qwik.mjs",displayName:"QwikCityMockProvider_component",canonicalFilename:"s_wmyc5h00wti",hash:"WmYC5H00wtI",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_ceU05TscGYE:{origin:"components/header/header.tsx",displayName:"header_component",canonicalFilename:"s_ceu05tscgye",hash:"ceU05TscGYE",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_kLGsHxQne4w:{origin:"components/charts/barChart.tsx",displayName:"barChart_component",canonicalFilename:"s_klgshxqne4w",hash:"kLGsHxQne4w",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_oyL1tMsd7cw:{origin:"routes/user/index.tsx",displayName:"user_component",canonicalFilename:"s_oyl1tmsd7cw",hash:"oyL1tMsd7cw",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_xYL1qOwPyDI:{origin:"routes/index.tsx",displayName:"routes_component",canonicalFilename:"s_xyl1qowpydi",hash:"xYL1qOwPyDI",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_zCb0Ow0YtZQ:{origin:"routes/settings/index.tsx",displayName:"settings_component",canonicalFilename:"s_zcb0ow0ytzq",hash:"zCb0Ow0YtZQ",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_zrbrqoaqXSY:{origin:"components/router-head/router-head.tsx",displayName:"RouterHead_component",canonicalFilename:"s_zrbrqoaqxsy",hash:"zrbrqoaqXSY",ctxKind:"function",ctxName:"component$",captures:!1,parent:null},s_hO3b5j0m2ZI:{origin:"root.tsx",displayName:"root_component_useStyles",canonicalFilename:"s_ho3b5j0m2zi",hash:"hO3b5j0m2ZI",ctxKind:"function",ctxName:"useStyles$",captures:!1,parent:"s_3sccYCDd1Z0"},s_0uvnzpkJI5A:{origin:"components/home-components/GasItem.tsx",displayName:"GasItem_component_inputChange",canonicalFilename:"s_0uvnzpkji5a",hash:"0uvnzpkJI5A",ctxKind:"function",ctxName:"$",captures:!0,parent:"s_JOM2kKZbpPI"},s_FpVebUKgMcw:{origin:"components/home-components/GasItem.tsx",displayName:"GasItem_component_div_div_input_onChange",canonicalFilename:"s_fpvebukgmcw",hash:"FpVebUKgMcw",ctxKind:"function",ctxName:"$",captures:!0,parent:"s_JOM2kKZbpPI"},s_MVDEUGW9tqQ:{origin:"components/home-components/GasItem.tsx",displayName:"GasItem_component_decrement",canonicalFilename:"s_mvdeugw9tqq",hash:"MVDEUGW9tqQ",ctxKind:"function",ctxName:"$",captures:!0,parent:"s_JOM2kKZbpPI"},s_b4zNbvSY9XY:{origin:"components/home-components/GasItem.tsx",displayName:"GasItem_component_increment",canonicalFilename:"s_b4znbvsy9xy",hash:"b4zNbvSY9XY",ctxKind:"function",ctxName:"$",captures:!0,parent:"s_JOM2kKZbpPI"},s_c9jOX6pE00A:{origin:"components/home-components/GasItem.tsx",displayName:"GasItem_component_div_div_button_onClick",canonicalFilename:"s_c9jox6pe00a",hash:"c9jOX6pE00A",ctxKind:"function",ctxName:"$",captures:!0,parent:"s_JOM2kKZbpPI"},s_jkmqV81I1Nc:{origin:"routes/index.tsx",displayName:"routes_component_div_div_div_button_onClick",canonicalFilename:"s_jkmqv81i1nc",hash:"jkmqV81I1Nc",ctxKind:"function",ctxName:"$",captures:!0,parent:"s_xYL1qOwPyDI"},s_psfQItq4DK8:{origin:"components/home-components/GasItem.tsx",displayName:"GasItem_component_div_div_button_onClick_1",canonicalFilename:"s_psfqitq4dk8",hash:"psfQItq4DK8",ctxKind:"function",ctxName:"$",captures:!0,parent:"s_JOM2kKZbpPI"},s_u0YVoxt2aTY:{origin:"../node_modules/@builder.io/qwik-city/index.qwik.mjs",displayName:"Link_component_useOnDocument",canonicalFilename:"s_u0yvoxt2aty",hash:"u0YVoxt2aTY",ctxKind:"function",ctxName:"useOnDocument",captures:!1,parent:"s_8gdLBszqbaM"}},mapping:{s_kzjavhDI3L0:"q-ffc8bda3.js",s_yiXwCC0m3jY:"q-ffc8bda3.js",s_EpaZ5qQ4Lg4:"q-ffc8bda3.js",s_2Eo7WCpaqI8:"q-da3a7369.js",s_3sccYCDd1Z0:"q-d6cfbbd0.js",s_4ofZFIcUyEw:"q-1c7ad6ca.js",s_8gdLBszqbaM:"q-ffc8bda3.js",s_AKetNByE5TM:"q-4983f8ce.js",s_II7kv1eMOhQ:"q-aa6d7838.js",s_JOM2kKZbpPI:"q-76edd5dc.js",s_P5hGpoY9xnA:"q-9ae2a266.js",s_TxCFOy819ag:"q-da3a7369.js",s_VkLNXphUh5s:"q-6531df67.js",s_WmYC5H00wtI:"q-7b860fbd.js",s_ceU05TscGYE:"q-61b8a2c4.js",s_kLGsHxQne4w:"q-369816be.js",s_oyL1tMsd7cw:"q-09a04ade.js",s_xYL1qOwPyDI:"q-a7a7ca4b.js",s_zCb0Ow0YtZQ:"q-e4c746a0.js",s_zrbrqoaqXSY:"q-a7a973bb.js",s_hO3b5j0m2ZI:"q-d6cfbbd0.js",s_0uvnzpkJI5A:"q-76edd5dc.js",s_FpVebUKgMcw:"q-76edd5dc.js",s_MVDEUGW9tqQ:"q-76edd5dc.js",s_b4zNbvSY9XY:"q-76edd5dc.js",s_c9jOX6pE00A:"q-76edd5dc.js",s_jkmqV81I1Nc:"q-a7a7ca4b.js",s_psfQItq4DK8:"q-76edd5dc.js",s_u0YVoxt2aTY:"q-ffc8bda3.js"},bundles:{"q-09a04ade.js":{size:103,imports:["q-b83e5274.js"],origins:["src/entry_user.js","src/s_oyl1tmsd7cw.js"],symbols:["s_oyL1tMsd7cw"]},"q-1c7ad6ca.js":{size:112,imports:["q-b83e5274.js"],origins:["src/entry_food_drinks.js","src/s_4ofzficuyew.js"],symbols:["s_4ofZFIcUyEw"]},"q-1d4e3858.js":{size:2536,origins:["node_modules/@builder.io/qwik-city/service-worker.mjs","src/routes/service-worker.ts"]},"q-253124ff.js":{size:283,imports:["q-b83e5274.js"],dynamicImports:["q-e4c746a0.js"],origins:["src/routes/settings/index.tsx"]},"q-369816be.js":{size:1222,imports:["q-a7a7ca4b.js","q-b83e5274.js"],origins:["src/entry_barChart.js","src/s_klgshxqne4w.js"],symbols:["s_kLGsHxQne4w"]},"q-3e59332a.js":{size:112,imports:["q-b83e5274.js"],dynamicImports:["q-1d4e3858.js"],origins:["@qwik-city-entries"]},"q-3eba7142.js":{size:198,imports:["q-b83e5274.js"],dynamicImports:["q-6531df67.js"],origins:["src/routes/layout.tsx"]},"q-4983f8ce.js":{size:269,imports:["q-b83e5274.js","q-d6cfbbd0.js"],origins:["src/entry_RouterOutlet.js","src/s_aketnbye5tm.js"],symbols:["s_AKetNByE5TM"]},"q-59399387.js":{size:81,imports:["q-b83e5274.js"]},"q-5ccffa25.js":{size:283,imports:["q-b83e5274.js"],dynamicImports:["q-aa6d7838.js"],origins:["src/routes/tobacco/index.tsx"]},"q-61b8a2c4.js":{size:4781,imports:["q-6531df67.js","q-9da081e1.js","q-b83e5274.js"],origins:["src/components/icons/food.tsx","src/components/icons/help.tsx","src/components/icons/settings.tsx","src/components/icons/user.tsx","src/entry_header.js","src/s_ceu05tscgye.js"],symbols:["s_ceU05TscGYE"]},"q-6531df67.js":{size:800,imports:["q-b83e5274.js"],dynamicImports:["q-61b8a2c4.js"],origins:["src/components/header/header.tsx","src/entry_layout.js","src/s_vklnxphuh5s.js"],symbols:["s_VkLNXphUh5s"]},"q-76edd5dc.js":{size:3038,imports:["q-9da081e1.js","q-b83e5274.js"],origins:["src/components/icons/down.tsx","src/entry_GasItem.js","src/s_0uvnzpkji5a.js","src/s_b4znbvsy9xy.js","src/s_c9jox6pe00a.js","src/s_fpvebukgmcw.js","src/s_jom2kkzbppi.js","src/s_mvdeugw9tqq.js","src/s_psfqitq4dk8.js"],symbols:["s_0uvnzpkJI5A","s_b4zNbvSY9XY","s_c9jOX6pE00A","s_FpVebUKgMcw","s_JOM2kKZbpPI","s_MVDEUGW9tqQ","s_psfQItq4DK8"]},"q-7a8dd3db.js":{size:283,imports:["q-b83e5274.js"],dynamicImports:["q-1c7ad6ca.js"],origins:["src/routes/food-drinks/index.tsx"]},"q-7b860fbd.js":{size:503,imports:["q-b83e5274.js","q-d6cfbbd0.js"],origins:["src/entry_QwikCityMockProvider.js","src/s_wmyc5h00wti.js"],symbols:["s_WmYC5H00wtI"]},"q-9ae2a266.js":{size:1624,imports:["q-a7a7ca4b.js","q-b83e5274.js"],origins:["src/entry_pieChart.js","src/s_p5hgpoy9xna.js"],symbols:["s_P5hGpoY9xnA"]},"q-9da081e1.js":{size:710,imports:["q-b83e5274.js"],origins:["src/components/icons/gasPump.tsx"]},"q-a7a7ca4b.js":{size:4002,imports:["q-b83e5274.js"],dynamicImports:["q-369816be.js","q-76edd5dc.js","q-9ae2a266.js"],origins:["src/components/charts/barChart.tsx","src/components/charts/pieChart.tsx","src/components/home-components/GasItem.tsx","src/components/icons/clear.tsx","src/entry_routes.js","src/s_jkmqv81i1nc.js","src/s_xyl1qowpydi.js"],symbols:["s_jkmqV81I1Nc","s_xYL1qOwPyDI"]},"q-a7a973bb.js":{size:639,imports:["q-b83e5274.js","q-d6cfbbd0.js"],origins:["src/entry_RouterHead.js","src/s_zrbrqoaqxsy.js"],symbols:["s_zrbrqoaqXSY"]},"q-aa6d7838.js":{size:106,imports:["q-b83e5274.js"],origins:["src/entry_tobacco.js","src/s_ii7kv1emohq.js"],symbols:["s_II7kv1eMOhQ"]},"q-b6e83729.js":{size:283,imports:["q-b83e5274.js"],dynamicImports:["q-09a04ade.js"],origins:["src/routes/user/index.tsx"]},"q-b83e5274.js":{size:41053,dynamicImports:["q-d6cfbbd0.js"],origins:["\0vite/preload-helper","node_modules/@builder.io/qwik/core.min.mjs","src/root.tsx"]},"q-ba80c101.js":{size:928,imports:["q-b83e5274.js"],dynamicImports:["q-253124ff.js","q-3e59332a.js","q-3eba7142.js","q-5ccffa25.js","q-7a8dd3db.js","q-b6e83729.js","q-fc1fa350.js"],origins:["@qwik-city-plan"]},"q-d6cfbbd0.js":{size:14567,imports:["q-b83e5274.js"],dynamicImports:["q-4983f8ce.js","q-7b860fbd.js","q-a7a973bb.js","q-da3a7369.js","q-ffc8bda3.js"],origins:["@qwik-city-sw-register","node_modules/@builder.io/qwik-city/index.qwik.mjs","src/components/router-head/router-head.tsx","src/entry_root.js","src/global.css?used&inline","src/s_3sccycdd1z0.js","src/s_ho3b5j0m2zi.js"],symbols:["s_3sccYCDd1Z0","s_hO3b5j0m2ZI"]},"q-da3a7369.js":{size:1719,imports:["q-b83e5274.js","q-d6cfbbd0.js"],dynamicImports:["q-ba80c101.js"],origins:["@builder.io/qwik/build","src/entry_QwikCityProvider.js","src/s_2eo7wcpaqi8.js","src/s_txcfoy819ag.js"],symbols:["s_2Eo7WCpaqI8","s_TxCFOy819ag"]},"q-e4c746a0.js":{size:107,imports:["q-b83e5274.js"],origins:["src/entry_settings.js","src/s_zcb0ow0ytzq.js"],symbols:["s_zCb0Ow0YtZQ"]},"q-fc1fa350.js":{size:296,imports:["q-b83e5274.js"],dynamicImports:["q-a7a7ca4b.js"],origins:["src/routes/index.tsx"]},"q-ffc8bda3.js":{size:1116,imports:["q-b83e5274.js","q-d6cfbbd0.js"],origins:["src/entry_Link.js","src/s_8gdlbszqbam.js","src/s_epaz5qq4lg4.js","src/s_kzjavhdi3l0.js","src/s_u0yvoxt2aty.js","src/s_yixwcc0m3jy.js"],symbols:["s_8gdLBszqbaM","s_EpaZ5qQ4Lg4","s_kzjavhDI3L0","s_u0YVoxt2aTY","s_yiXwCC0m3jY"]}},injections:[],version:"1",options:{target:"client",buildMode:"production",forceFullBuild:!0,entryStrategy:{type:"smart"}},platform:{qwik:"0.15.2",vite:"",rollup:"2.79.1",env:"node",os:"win32",node:"19.2.0"}};function Ve(e){return Ke(d(ae,{},"pY_0"),{manifest:Qe,...e,containerAttributes:{lang:"en-us",...e.containerAttributes}})}export{Ve as default};
