var D=Object.defineProperty;var L=Object.getOwnPropertySymbols;var Y=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var N=(o,e,s)=>e in o?D(o,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):o[e]=s,x=(o,e)=>{for(var s in e||(e={}))Y.call(e,s)&&N(o,s,e[s]);if(L)for(var s of L(e))U.call(e,s)&&N(o,s,e[s]);return o};import{d as w,r as g,c as b,a,b as _,w as G,p as z,e as B,o as m,f as R,g as W,S as h,h as d,F as p,T as F,i as O,j as J,k as Z,V as K,l as Q,G as X,P as e0,m as T,n as y,s as C,q as S,t as t0,I as c0,C as o0,M as n0,u as s0,v as i0,D as r0,x as l0,O as a0,y as A,z as j,A as u0,B as d0,E as f0,H as h0}from"./vendor.60e1b841.js";const p0=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))t(c);new MutationObserver(c=>{for(const i of c)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function s(c){const i={};return c.integrity&&(i.integrity=c.integrity),c.referrerpolicy&&(i.referrerPolicy=c.referrerpolicy),c.crossorigin==="use-credentials"?i.credentials="include":c.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(c){if(c.ep)return;c.ep=!0;const i=s(c);fetch(c.href,i)}};p0();var v=(o,e)=>{const s=o.__vccOpts||o;for(const[t,c]of e)s[t]=c;return s};const g0=w({data(){return{}}}),f=o=>(z("data-v-4eec8a20"),o=o(),B(),o),w0={class:"menu flex flex-item-center"},_0={class:"list flex flex-center"},m0=R("\u6587\u6A94"),v0=f(()=>a("div",null,"2",-1)),x0=f(()=>a("div",null,"3",-1)),b0=f(()=>a("div",null,"4",-1)),y0=f(()=>a("div",null,"5",-1)),C0=f(()=>a("div",null,"6",-1)),$0=f(()=>a("div",null,"7",-1)),E0=f(()=>a("div",null,"8",-1)),M0=f(()=>a("div",null,"9",-1)),F0=f(()=>a("div",null,"10",-1)),O0=f(()=>a("div",{class:"openMenu flex flex-item-center"},[a("div",{class:"style"})],-1));function S0(o,e,s,t,c,i){const n=g("router-link");return m(),b("div",w0,[a("div",_0,[a("div",null,[_(n,{to:"/"},{default:G(()=>[m0]),_:1})]),v0,x0,b0,y0,C0,$0,E0,M0,F0]),O0])}var A0=v(g0,[["render",S0],["__scopeId","data-v-4eec8a20"]]);const V0=w({components:{Menu:A0}}),k0=o=>(z("data-v-1aed7f03"),o=o(),B(),o),L0={id:"header",class:"flex flex-item-center"},N0=k0(()=>a("a",{href:"/",class:"title"},"\u868A\u5B50",-1));function z0(o,e,s,t,c,i){const n=g("Menu");return m(),b("header",L0,[N0,_(n)])}var B0=v(V0,[["render",z0],["__scopeId","data-v-1aed7f03"]]);const T0=w({components:{HeaderMain:B0}});function j0(o,e,s,t,c,i){const n=g("HeaderMain");return m(),W(n)}var H0=v(T0,[["render",j0]]);const I0="https://antimosquito.a102009102009.repl.co";function V(o){let e="#fff";return o>50?e="#470115":o>20?e="#6f006d":o>10?e="#a4005b":o>5?e="#d00b33":o>3?e="#e75033":o>1?e="#ffa133":o>0&&(e="#e3d738"),e}function H(o,e,s){var i;let t=o,c=0;if(t.mosquitos===void 0){let n=(i=this.data)==null?void 0:i[t.get("COUNTYNAME")];typeof n=="object"&&Object.entries(n).forEach(([r,l])=>Object.entries(l).forEach(([u,$])=>$.forEach(P=>c+=P.mosquitos)))}return c=t.mosquitos||(t.mosquitos=c),e&&e>180?new h(x({stroke:new d({color:"#0000ff",width:1}),fill:new p({color:V(~~(c/100))}),text:new F({font:"20px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",text:`${t.get("COUNTYNAME")}
${c||""}`})},s)):new h(x({stroke:new d({color:"#0000ff",width:1}),fill:new p({color:"#ffffff00"})},s))}function E(o,e,s){var c,i;let t=o;if(e&&e>40&&e<180){let n=0;return t.mosquitos===void 0&&Object.entries(((i=(c=this.data)==null?void 0:c[t.get("COUNTYNAME")])==null?void 0:i[t.get("TOWNNAME")])||{}).forEach(([r,l])=>l.forEach(u=>n+=u.mosquitos)),n=t.mosquitos||(t.mosquitos=n),new h(x({stroke:new d({color:"#ff0000",width:1}),fill:new p({color:V(~~(n/50))}),text:new F({font:"14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",text:`${t.get("TOWNNAME")}
${n||""}`})},s))}return e&&e<=180?new h({stroke:new d({color:"#ff0000",width:1})}):new h({fill:new p({color:"#fff"}),stroke:new d({color:"#ff00004a",width:1})})}function k(o,e,s){var i,n,r;let t=o;if(e&&e>40)return new h({fill:new p({color:"#ffffff"})});let c=0;return t.mosquitos===void 0&&(((r=(n=(i=this.data)==null?void 0:i[t.get("COUNTYNAME")])==null?void 0:n[t.get("TOWNNAME")])==null?void 0:r[t.get("VILLNAME")])||[]).forEach(l=>c+=l.mosquitos),c=t.mosquitos||(t.mosquitos=c),new h(x({stroke:new d({color:"#000",width:1}),fill:new p({color:V(~~(c/10))}),text:new F({font:"14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",fill:new p({color:"#000"}),text:`${t.get("VILLNAME")||""}
${c||""}`})},s))}class M{constructor(e={},s){this.options=e,this.clickEvent=s,this.options.show===void 0&&(this.options.show=!0)}makeButton(){const e=document.createElement("button");return this.options.show||(e.style.display="none"),e.innerHTML=this.options.text||"",e.title=this.options.title||"",e.type="button",e.addEventListener("click",this.clickEvent||(()=>{}),!1),e}}class I{constructor(e={}){var t,c,i,n;const s=document.createElement("div");(t=e.classList)==null||t.forEach(r=>s.classList.add(r)),(c=e.control)==null||c.map(r=>r==null?void 0:r.makeButton()).forEach(r=>s.append(r)),(n=(i=e.target)==null?void 0:i.querySelector(".ol-zoom.ol-unselectable.ol-control"))==null||n.append(s)}}function q0(o){document.fullscreenElement?document.exitFullscreen.call(document):document.documentElement.requestFullscreen.call(o)}const P0=w({data(){return{data:null,layers:{}}},setup(){const o=O(null),e=J({village:void 0,town:void 0,county:void 0});let s=new Z,t=!1,c=new K({center:Q([120.221507,23.000694]),zoom:12,maxResolution:750,minResolution:.1}),i=new X({projection:c.getProjection()});return i.setTracking(!0),i.on("error",n=>console.log(n.message)),i.on("change:position",function(){let n=i.getPosition();s.setGeometry(n?new e0(n):void 0),t||(c.setCenter(n),t=!0)}),{oldClick:e,positionFeature:s,map:o,appView:c,geolocation:i}},async mounted(){let o=this.oldClick,e=this.map,s=this;this.data=(await T({url:`${I0}/api/v1/data`,method:"GET"})).data;let t=this.layers={village:new y({source:new C({url:"/data/topo/village/20210324.json",format:new S}),style:k.bind(this),zIndex:50}),town:new y({source:new C({url:"/data/topo/town/city.topo.json",format:new S}),style:E.bind(this),zIndex:100}),county:new y({source:new C({url:"/data/topo/county/20200820.json",format:new S}),style:H.bind(this),zIndex:150}),NS1Test:new y({source:new C({url:"/data/ns1hosp_20160603.json",format:new t0}),style:new h({image:new c0({src:'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="green"><path d="M17,6H7C5.9,6,5,6.9,5,8v11c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V8C19,6.9,18.1,6,17,6z M16,15h-2.5v2.5h-3V15H8v-3h2.5 V9.5h3V12H16V15z"/></svg>',opacity:1,scale:1})}),zIndex:200}),locationPoint:new y({source:new C({features:[this.positionFeature]}),style:new h({image:new o0({radius:6,fill:new p({color:"#3399CC"}),stroke:new d({color:"#fff",width:2})})}),zIndex:250})},c=new n0({controls:s0().extend([]),interactions:i0().extend([new r0]),target:e,layers:[new l0({source:new a0,zIndex:0}),t.village,t.town,t.county,t.NS1Test,t.locationPoint],view:this.appView});new I({target:e,classList:["split","nTop"],control:[new M({target:e,text:'<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',title:"\u5B9A\u4F4D\u5230\u6211",show:!!this.geolocation.getPosition()},()=>{c.getView().setZoom(12),c.getView().animate({center:s.geolocation.getPosition(),duration:1})}),new M({title:"\u653E\u5927",text:'<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="#fff"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',target:e},()=>q0(e))]}),new I({target:e,classList:["split"],control:[new M({target:e,text:'<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" fill="#fff" width="18px" height="18px" viewBox="0 0 539.357 539.357"><path d="M81.567,387.458c-1.293,2.636-2.448,5.345-3.594,8.059c-1.612,3.811-3.134,7.4-5.055,10.763 c-4.366,7.609-9.601,15.77-15.998,24.941c-4.174,5.989-8.731,11.922-13.133,17.658c-1.693,2.211-3.391,4.418-5.067,6.634 c-0.804,1.064-2.338,3.089-2.334,5.94c-6.708,4.464-12.493,10.768-18.099,19.706c-4.374,6.978-8.47,14.231-12.436,21.253 c-1.693,2.991-3.382,5.989-5.096,8.964c-0.322,0.559-0.494,1.09-0.563,1.326c-0.563,1.771,0.143,3.737,1.779,4.721 c0.657,0.399,1.387,0.592,2.109,0.592c1.273,0,2.517-0.596,3.313-1.689c1.493-2.068,2.979-4.166,4.48-6.267 c3.309-4.655,6.724-9.466,10.261-14.056c7.176-9.319,15.39-18.177,24.304-26.239c0.225-0.13,0.481-0.212,0.739-0.31 c0.563-0.221,1.126-0.449,1.975-0.906c0.897-0.456,2.248-1.15,3.178-2.603c2.758-4.321,5.524-8.625,8.299-12.934 c8.16-12.681,16.593-25.794,24.488-38.977c2.844-4.741,4.9-9.865,6.891-14.818c1.126-2.807,2.256-5.618,3.525-8.348 c12.424-26.654,24.945-53.269,37.471-79.874c0.196-0.412,0.53-0.841,0.861-1.105c4.325-3.428,8.699-6.789,13.081-10.069 c0.22-0.135,0.473-0.213,0.718-0.311c0.645-0.253,1.448-0.571,2.26-1.109c1.224-0.816,2.896-1.935,4.08-3.673 c13.395-19.71,26.756-39.453,40.11-59.192l25.39-37.454l0.596,0.249c1.037,0.429,2.208,0.417,3.235-0.044 c1.024-0.461,1.816-1.322,2.184-2.387c0.114-0.322,0.253-0.645,0.396-0.971c0.465-1.085,1.049-2.432,1.139-4.056 c0.6-10.612,3.395-20.653,6.356-31.277c0.485-1.75,0.971-3.497,1.452-5.263l2.574,1.273c3.995,1.967,7.985,3.937,11.931,5.989 c6.018,3.138,12.003,6.333,18.018,9.539l4.908,2.611l-0.481,2.999c-0.727,4.553-1.469,9.237-2.236,13.909 c-0.575,3.525-0.27,6.736,0.935,9.808c0.416,1.061,0.559,2.473,0.371,3.615c-3.297,19.952-5.292,41.669-6.107,66.398 c-0.099,2.998-0.674,6.046-1.273,9.273c-0.281,1.514-0.567,3.027-0.804,4.545c-0.146,0.959-0.322,1.922-0.493,2.881 c-0.363,2.036-0.743,4.142-0.927,6.324c-0.253,2.974,0.849,4.867,1.815,5.928c1.013,1.11,2.918,2.44,6.223,2.461 c1.272-0.144,2.342-0.515,3.121-1.425c0.779-0.913,1.122-2.121,0.935-3.305l-0.119-0.686c-0.049-0.272-0.102-0.542-0.126-0.804 c-0.065-0.763-0.2-1.554-0.339-2.342c-0.131-0.734-0.33-1.844-0.261-2.166c3.921-11.24,4.676-22.812,5.405-33.999 c0.241-3.651,0.478-7.299,0.824-10.935c0.89-9.249,1.693-18.502,2.493-27.76c0.519-5.933,1.032-11.865,1.542-17.626 c0.062-0.212,0.168-0.412,0.262-0.616l0.33-0.755c0.11-0.265,0.253-0.526,0.4-0.788c0.51-0.963,1.216-2.289,1.321-3.945 c0.307-4.851,0.519-9.71,0.727-14.602c0.873,0.167,1.787,0.061,2.599-0.335c0.498-0.245,0.935-0.579,1.285-0.983 c1.771,0.579,3.509,0.13,4.61-0.649c1.041,1.616,2.13,3.276,3.46,4.847c0.307,0.363,0.322,0.416,0.29,0.914l-0.665,11.008 c-0.449,7.564-0.901,15.128-1.452,22.685c-0.159,2.163-0.531,4.341-0.923,6.646c-0.265,1.55-0.53,3.101-0.73,4.659 c-0.191,1.444-0.718,5.512,2.746,7.878l4.411,23.386c2.101,11.139,4.193,22.277,6.319,33.407 c3.395,17.801,6.851,35.599,10.322,53.387c0.845,4.312,1.722,8.617,2.6,12.926c1.261,6.197,2.521,12.391,3.68,18.608 c1.502,8.014,5.732,14.456,9.588,19.866l6.03,8.453c0.976,1.371,2.688,2,4.329,1.592l0.783-0.192 c1.877-0.444,3.187-2.138,3.146-4.063c-0.008-0.375,0-0.755,0.013-1.134c0.028-1.122,0.061-2.403-0.232-3.791 c-1.017-4.798-3.811-8.192-6.83-11.542c-0.796-0.877-1.18-1.604-1.273-1.995l-0.726-3.011c-3.15-13.13-6.41-26.704-9.344-40.095 c-2.696-12.325-5.178-24.944-7.572-37.144l-0.673-3.42c-2.236-11.375-4.411-22.758-6.586-34.141l-6.062-31.686 c0-0.008,0.041-0.13,0.241-0.449c1.207-1.975,1.758-4.549,1.681-7.866c-0.073-3.077-0.229-6.149-0.384-9.225 c-0.191-3.794-0.388-7.584-0.408-11.379c-0.036-7.932,0.314-16.002,0.625-23.101c0.021-0.167,0.232-0.73,0.755-1.42 c1.473-1.954,2.994-3.884,4.532-5.802c0.11,3.341,0.311,6.749,0.861,10.139c0.959,5.867,4.79,7.956,8.058,7.956 c1.738-0.004,3.582-0.542,5.483-1.607c2.31-1.293,4.595-3.088,7.189-5.651c2.011-1.987,3.962-4.039,5.907-6.091 c2.248-2.371,4.496-4.741,6.847-7.001c3.994-3.831,8.295-7.442,12.46-10.93c1.236,2.946,2.416,5.749,3.55,8.568 c-1.575,1.342-2.235,3.374-2.513,4.92c-0.571,3.179-1.146,6.573-1.412,10.078c-0.167,2.273,0.567,4.778,1.922,6.544 c1.954,2.546,3.198,4.643,3.284,7.042c-3.366,0.359-6.851,0.73-10.277,1.285c-2.688,0.437-6.704,1.191-10.502,2.717 c-4.072,1.632-7.01,4.374-8.495,7.932c-1.489,3.57-1.37,7.605,0.339,11.673c1.257,2.987,2.962,6.034,5.365,9.596 c2.946,4.357,5.961,8.666,8.98,12.974c2.224,3.175,4.447,6.349,6.642,9.544c9.246,13.459,13.306,27.136,12.416,41.815 c-0.416,6.781-0.526,13.647-0.633,20.29l-0.049,2.729c-0.045,2.681,0.249,5.267,0.551,7.69c0.633,4.99,4.316,5.239,5.047,5.239 c1.856,0,3.256-1.021,4.146-1.787c4.088-3.529,6.137-8.409,5.92-14.097c-0.077-2.003-0.122-4.011-0.171-6.022 c-0.151-6.373-0.311-12.958-1.388-19.425c-1.648-9.91-1.501-19.698-1.342-30.065c0.049-3.207,0.094-6.418,0.085-9.629 l-0.004-1.068c13.329,16.087,26.688,32.15,40.041,48.209l5.773,6.936c1.624,1.959,3.803,4.578,7.475,5.5 c0.017,0.017,0.028,0.024,0.037,0.033c1.203,1.053,2.391,2.121,3.578,3.19c2.574,2.317,5.234,4.712,8.05,6.928 c10.085,7.932,22.036,14.125,35.524,18.405c5.3,1.681,10.604,3.198,15.761,4.512c1.959,0.494,4.505,0.567,7.055,0.466 c2.448-0.086,5.422-2.109,5.781-4.9c0.225-1.856-0.571-3.7-2.338-5.476c-1.154-1.163-2.55-1.493-3.644-1.754 c-1.354-0.347-2.722-0.653-4.088-0.947l-2.836-0.6c-5.002-1.036-9.727-2.012-13.998-4.5c-3.203-1.864-6.695-2.763-10.069-3.627 c-1.502-0.388-3.003-0.768-4.26-1.163c-0.184-0.106-0.351-0.257-0.53-0.404c-0.347-0.272-0.698-0.551-1.053-0.787l-1.938-1.285 c-1.158-0.767-2.321-1.538-3.484-2.342c-0.685-0.47-1.366-0.971-1.962-1.547c-1.069-1.023-2.105-2.076-3.142-3.129l-1.665-1.681 c-0.24-0.241-0.506-0.453-0.665-0.555c-2.166-2.008-4.524-3.514-6.81-4.979c-3.052-1.95-5.932-3.794-7.895-6.601 c-2.57-3.677-5.74-6.781-8.812-9.776c-1.689-1.652-3.383-3.305-4.953-5.043c-9.747-10.819-19.441-21.685-29.177-32.603 l-9.221-10.327c0.4-0.865,0.678-1.734,0.869-2.595c0.53,0.849,1.139,1.534,1.637,2.102l0.542,0.62 c1.012,1.24,3.329,1.607,4.884,1.183c1.697-0.452,2.913-1.946,3.016-3.696l0.073-1.097c0.065-0.902,0.122-1.795,0.143-2.697 c0.024-1.134-0.037-2.236-0.163-3.309c2.774,1.742,5.435,3.729,8.229,5.818c1.338,1,2.677,2.003,4.031,2.975l11.84,8.523 c11.412,8.217,22.827,16.43,34.297,24.577c1.677,1.188,3.504,1.755,5.12,2.253c0.559,0.171,1.109,0.338,1.656,0.542 c0.33,0.123,0.678,0.217,1.098,0.298l3.063,1.461c5.603,2.681,11.208,5.361,16.79,8.087l0.697,0.358 c1.652,0.861,4.312,2.044,7.181,1.375c0.311,0.082,0.62,0.155,0.91,0.204c11.236,1.889,21.232,3.383,31.791,2.505 c2.982-0.253,5.696-1.444,8.401-2.631c1.256-0.556,2.149-1.697,2.378-3.052c0.232-1.351-0.232-2.73-1.236-3.664 c-3.097-2.897-7.323-3.86-11.306-2.595c-3.439,1.089-7.846,0.894-12.672,0.424l-0.812-0.077 c-4.357-0.421-8.816-1.062-13.129-1.682l-0.494-0.032c-0.154-0.069-0.306-0.167-0.461-0.257c-0.29-0.168-0.583-0.335-0.881-0.485 l-0.56-0.307c-0.624-0.354-1.256-0.693-1.905-0.935c-6.087-2.276-12.175-4.532-18.266-6.793l-4.709-1.75 c-3.395-3.464-7.409-5.639-11.301-7.748c-0.849-0.457-1.693-0.918-2.526-1.387c-17.033-9.604-32.949-21.604-48.352-33.208 l-2.737-2.064c-0.009-0.069-0.013-0.143-0.021-0.225c-0.453-4.41-1.2-8.796-1.922-13.04l-0.335-1.983 c-0.302-1.824-0.652-3.639-0.999-5.398c0.812,0.11,1.729,0.379,2.685,0.661c0.656,0.192,1.313,0.384,1.971,0.542 c10.562,2.566,21.57,5.214,33.003,4.904c2.109-0.061,4.153-0.338,6.075-0.833c3.822-0.979,6.463-2.88,7.85-5.65 c1.396-2.791,1.326-6.083-0.208-9.788c-2.399-5.81-6.422-10.628-12.301-14.745c-10.625-7.438-22.804-10.575-32.229-12.48 c-2.941-0.596-5.916-1.021-8.891-1.444l-0.66-0.094c-0.571-1.95-1.257-3.823-1.926-5.643c-0.486-1.322-0.972-2.644-1.404-3.99 c-0.285-0.881-0.424-1.803-0.579-2.729c-0.061-0.347-0.114-0.698-0.171-1.003c0.024-0.833-0.017-1.702-0.065-2.566 c-0.053-0.996-0.131-2.493,0.032-2.848c0.2-0.253,1.028-0.783,1.579-1.138c0.983-0.632,2.105-1.351,3.097-2.366 c5.875-6.022,8.218-13.823,6.761-22.562c-1.885-11.359-6.36-21.506-13.297-30.147l-2.606-3.272 c-2.004-2.529-4.003-5.051-6.084-7.515c-6.52-7.699-15.116-11.53-23.427-15.235c-1.314-0.587-2.636-1.171-3.966-1.787 c-0.539-0.253-1.518-0.437-2.113-0.437c-4.149,0-7.589-2.125-11.579-4.586c-0.854-0.526-1.706-1.053-2.57-1.562 c-2.954-1.742-6.174-2.468-9.278-3.174c-1.281-0.29-2.566-0.579-3.799-0.942c-0.869-0.261-1.954-0.592-2.578-0.996 c-1.779-1.143-3.521-2.333-5.268-3.521c-1.999-1.367-3.998-2.729-6.047-4.031c-1.321-0.84-2.676-1.362-3.867-1.824 c-0.42-0.159-0.828-0.318-1.22-0.485c-1.914-0.84-4.154-0.085-5.182,1.734c-0.204,0.367-0.352,0.755-0.433,1.143 c-0.796-0.062-1.6-0.086-2.403-0.086l-1.154,0.021c-2.016,0.069-3.681,1.607-3.909,3.611c-0.232,2.007,1.041,3.88,2.986,4.406 l2.081,0.551c0.363,0.094,0.723,0.192,1.081,0.282c-0.265,1.746,0.62,3.488,2.236,4.28l2.876,1.404 c2.979,1.448,6.223,3.023,9.441,4.704c0.065,0.155,0.122,0.314,0.188,0.461l0.192,0.453c0.04,0.09,0.081,0.179,0.113,0.269 c-5.275,1.061-10.546,2.089-15.703,3.06c-0.172,0-0.343-0.028-0.519-0.045c-0.159-0.021-0.318-0.033-0.489-0.049 c-1.641-6.349-3.036-11.216-4.505-15.716c-0.808-2.477-2.134-4.978-3.941-7.417c-2.268-3.072-4.65-3.717-6.25-3.717 c-1.122,0-4.912,0.42-6.549,5.834c-1.179,3.929-1.746,7.907-2.113,10.938c-0.314,2.64-0.437,5.198-0.562,7.903 c-0.311-0.004-0.629-0.004-0.931,0c-1.718-5.092-3.407-10.196-5.1-15.296c-1.804-5.438-3.607-10.881-5.443-16.312 c-0.946-2.807-2.023-5.186-3.284-7.283c-2.697-4.492-8.438-4.827-11.592-0.653c-1.688,2.228-3.142,4.745-4.178,7.275 c-3.558,8.597-7.764,20.008-9.135,32.828c-2.701,0.396-5.394,0.849-8.091,1.301c-3.525,0.596-7.055,1.191-10.596,1.641 c-2.126,0.277-4.305,0.191-6.475,0.122c-0.902-0.028-1.799-0.057-2.697-0.065c-2.868-0.028-5.74-0.114-8.613-0.208 c-6.659-0.212-13.554-0.326-19.062,0.045l-6.418,0.461c-10.698,0.779-21.73,1.6-32.566,1.13c-4.443-0.192-8.886-0.42-13.33-0.641 c-7.303-0.375-14.61-0.747-21.922-0.958c-4.692-0.127-9.425,0.236-13.961,0.596l-1.894,0.146 c-3.374,0.253-6.303,1.685-8.698,4.248c-0.22,0.216-1.024,0.571-1.742,0.62c-3.333,0.237-6.675,0.306-10.017,0.383 c-1.685,0.037-3.366,0.074-5.047,0.131c-1.13,0.037-2.333,0.2-3.562,0.473c-5.41,1.191-6.63,4.875-6.03,7.667 c0.404,1.876,1.587,3.517,2.925,4.692c-0.653,0.714-1.224,1.501-1.787,2.301l-0.539,0.75c-0.828,1.122-1.028,2.599-0.518,3.905 c0.506,1.301,1.648,2.256,3.023,2.521l0.947,0.204c0.979,0.225,1.962,0.424,2.97,0.506c0.343,0.029,0.693,0.037,1.044,0.037 c0.004,0,0.004,0,0.004,0c0.49,0,0.987-0.02,1.485-0.044c0.897-0.053,1.754,0.008,1.791,0.02 c5.251,1.844,10.457,2.085,14.402,2.085c1.856,0,3.717-0.061,5.573-0.118l2.57-0.078c1.371-0.033,2.836-0.338,4.35-0.914 c1.656-0.616,3.737-0.425,6.316-0.013c3.154,0.506,6.365,0.547,9.119,0.547l2.53-0.004l1.134,0.004 c1.257,0,2.518-0.098,3.782-0.208c1.583-0.135,3.179-0.302,4.692-0.069c8.576,1.358,17.181,1.424,25.508,1.485 c3.852,0.028,7.707,0.057,11.551,0.212c3.113,0.126,6.218,0.204,9.323,0.204c9.666,0,18.107-0.763,25.806-2.322 c6.594-1.342,13.411-1.375,19.425-1.403c5.59-0.029,11.236-0.314,16.691-0.596c0.567-0.029,1.13-0.057,1.697-0.086 c-0.522,1.93-1.057,3.868-1.616,5.802c-0.008,0.008-0.02,0.017-0.028,0.021c-2.175,1.44-4.357,2.856-6.544,4.276l-8.977,5.843 c-5.055,3.288-10.114,6.568-15.108,9.947c-0.767,0.518-1.444,0.779-1.995,0.779c-0.216,0-0.869,0-2.216-1.061l-0.399-0.392 c-0.869-0.816-2.048-1.211-3.24-1.085c-1.183,0.126-2.256,0.767-2.929,1.758l-0.486,0.698c-0.392,0.555-0.689,0.991-0.946,1.44 c-4.823,8.348-12.277,14.492-23.456,19.339c-2.452,1.065-4.733,2.464-6.749,3.701c-1.22,0.751-4.834,2.975-4.308,7.781 c-0.057,0.098-0.123,0.204-0.171,0.253c-2.909,3.056-5.72,6.209-8.536,9.363c-8.14,9.123-15.83,17.744-25.761,24.158l-2.954,1.893 c-1.538,0.955-4.639,2.885-4.537,7.356c-0.229,0.29-0.555,0.673-0.799,0.959c-0.596,0.689-1.22,1.428-1.767,2.211 c-0.673,0.967-0.897,2.179-0.612,3.321c0.478,1.905-0.734,4.312-2.13,7.104c-0.665,1.326-1.338,2.681-1.905,4.08 c-0.661,1.632-0.2,3.509,1.15,4.651c1.343,1.139,3.276,1.273,4.778,0.351c0.951-0.596,1.457-0.853,1.726-0.967 c0.265,0.146,0.775,0.485,1.75,1.252c1.709,1.334,4.17,1.102,5.602-0.547l1.105-1.301c0.743-0.881,1.481-1.767,2.285-2.599 c0.706-0.734,1.628-1.652,2.611-2.371c0.041,0.065,0.086,0.131,0.131,0.208c0.645,1.02,1.713,1.706,2.913,1.861 c1.224,0.151,2.411-0.229,3.301-1.044l0.657-0.608c0.51-0.473,1.012-0.938,1.526-1.399l2.293-2.056 c4.88-4.406,9.49-8.572,15.072-11.297c0.053-0.024,0.098-0.049,0.146-0.069c0.898,0.853,2.134,1.244,3.362,1.089 c1.249-0.171,2.342-0.906,2.974-1.991c1.257-2.154,2.974-3.692,5.067-4.937c-5.308,18.674-12.326,36.496-17.985,50.237 c-2.982,7.254-6.377,14.533-9.657,21.575c-1.648,3.541-3.305,7.083-4.912,10.645c-0.743,1.636-1.498,3.415-1.995,5.296 c-0.82,3.08-0.49,5.051,0.734,6.862l-0.865,1.759c-2.995,6.111-6.01,12.256-8.841,18.046c-0.143,0.15-0.318,0.277-0.591,0.498 c-0.816,0.66-1.648,1.297-2.477,1.938c-1.645,1.265-3.342,2.566-4.961,4.056c-6.752,6.238-14.753,10.714-24.456,13.685 c-11.412,3.496-27.973,14.214-34.606,21.105c-1.359,1.412-1.522,3.586-0.392,5.186c1.13,1.6,3.244,2.158,5.022,1.354l0.555-0.24 c0.461-0.192,0.987-0.412,1.562-0.809c8.36-5.83,18.107-10.705,31.612-15.813c3.015-1.139,6.075-2.15,9.14-3.166 c2.272-0.755,4.537-1.502,6.789-2.302c0.073-0.024,0.143-0.053,0.216-0.081l-1.689,3.402 C98.511,353.198,90.008,370.314,81.567,387.458z M180.731,184.176c0.085-0.245,0.155-0.424,0.216-0.567 c0.188,0.024,0.437,0.065,0.767,0.139c1.966,0.457,4.377,0.004,5.953-1.106c1.521-1.065,2.995-2.191,4.472-3.321 c1.905-1.453,3.705-2.832,5.585-4.056c6.919-4.496,13.892-8.911,20.869-13.321l-3.398,8.833c-1.661,4.333-3.317,8.674-4.9,13.048 c-0.428,1.208-1.204,4.067,0.204,6.36c-0.061,0.086-0.123,0.176-0.188,0.265c-4.611,6.712-9.205,13.432-13.799,20.151 c-9.147,13.391-18.613,27.238-28.058,40.739c-5.435,7.771-11.183,15.553-16.744,23.072c-0.804,1.089-1.608,2.174-2.412,3.264 c8.862-26.394,17.736-52.783,26.606-79.164L180.731,184.176z M254.763,62.686l2.048-9.527l2.604,9.213L254.763,62.686z  M289.504,129.23c0.955-0.567,1.856-1.053,2.808-1.509c0.75,2.162,0.493,4.235-0.816,6.65c-0.416,0.767-0.836,1.57-1.22,2.403 C290.064,134.216,289.794,131.695,289.504,129.23z M254.413,144.412l18.923-6.899c0.151,3.459-0.041,6.96-0.24,10.604 c-0.094,1.73-0.196,3.488-0.253,5.259L254.413,144.412z M407.42,176.318c-0.008-0.062-0.016-0.123-0.024-0.184 c14.778,1.808,25.447,6.536,34.085,14.974c1.325,1.297,2.591,2.999,3.655,4.933c0.322,0.592,0.347,0.935,0.335,0.996 c-0.037,0.069-0.323,0.367-1.106,0.612c-1.228,0.388-2.374,0.612-3.423,0.673c-8.413,0.494-16.769-1.844-24.847-4.101 c-0.882-0.249-1.747-0.563-2.616-0.869c-1.762-0.633-3.586-1.281-5.643-1.579c-0.229-0.033-0.546-0.375-1.228-1.183 c-0.388-0.453-0.837-0.988-1.388-1.518c0.951-0.996,1.901-2.35,2.118-4.027C407.722,182.209,407.748,179.276,407.42,176.318z  M352.271,217.758c0.298-0.641,1.771-1.534,4.921-1.934c5.002-0.633,9.918-1.763,14.676-2.848l2.158-0.49 c0.697,3.766,1.347,7.324,1.424,10.845c0.077,3.595-0.195,7.193-0.485,11.004c-0.114,1.518-0.232,3.036-0.322,4.557l-0.849,13.798 c-0.172-0.277-0.347-0.555-0.522-0.832c-3.432-5.357-6.965-10.645-10.502-15.937c-2.99-4.467-5.981-8.935-8.902-13.447 C352.239,219.966,351.994,218.366,352.271,217.758z"/></svg>',title:"\u868A\u5B50\u6578\u91CF"},function(){let i=this.classList.toggle("off");t.village.setVisible(!i),t.town.setVisible(!i),t.county.setVisible(!i)}),new M({target:e,text:'<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="1.375em" viewBox="0 0 24 24" width="1.375em" fill="#fff"><rect fill="none" height="24" width="24"/><path d="M19.5,6c-1.31,0-2.37,1.01-2.48,2.3C15.14,7.8,14.18,6.5,12,6.5c-2.19,0-3.14,1.3-5.02,1.8C6.87,7.02,5.81,6,4.5,6 C3.12,6,2,7.12,2,8.5V9c0,6,3.6,7.81,6.52,7.98C9.53,17.62,10.72,18,12,18s2.47-0.38,3.48-1.02C18.4,16.81,22,15,22,9V8.5 C22,7.12,20.88,6,19.5,6z M3.5,9V8.5c0-0.55,0.45-1,1-1s1,0.45,1,1v3c0,1.28,0.38,2.47,1.01,3.48C4.99,14.27,3.5,12.65,3.5,9z M20.5,9c0,3.65-1.49,5.27-3.01,5.98c0.64-1.01,1.01-2.2,1.01-3.48v-3c0-0.55,0.45-1,1-1s1,0.45,1,1V9z M10.69,10.48 c-0.44,0.26-0.96,0.56-1.69,0.76V10.2c0.48-0.17,0.84-0.38,1.18-0.58C10.72,9.3,11.23,9,12,9s1.27,0.3,1.8,0.62 c0.34,0.2,0.71,0.42,1.2,0.59v1.04c-0.75-0.21-1.26-0.51-1.71-0.78C12.83,10.2,12.49,10,12,10C11.51,10,11.16,10.2,10.69,10.48z"/></svg>',title:"\u5FEB\u7BE9\u9662\u6240"},function(){this.classList.toggle("off"),t.NS1Test.setVisible(!t.NS1Test.getVisible())})]}),c.on("singleclick",i=>{c.forEachFeatureAtPixel(i.pixel,n=>{var l,u;let r=n;r.get("VILLNAME")&&c.getView().get("resolution")<40&&(r.setStyle(k.call(this,r,void 0,{stroke:new d({color:"#000",width:3})})),o.village&&((l=o.village)==null?void 0:l.ol_uid)!==r.ol_uid&&((u=o.village)==null||u.setStyle(k.bind(this))),o.village=r)},{layerFilter:n=>n===t.village}),c.forEachFeatureAtPixel(i.pixel,n=>{var u,$;let r=n,l=c.getView().get("resolution");r.setStyle(E.call(this,r,l,{stroke:new d({color:"#000",width:3})})),o.town&&((u=o.town)==null?void 0:u.ol_uid)!==r.ol_uid&&(($=o.town)==null||$.setStyle(E.bind(this))),o.town=r},{layerFilter:n=>n===t.town}),c.forEachFeatureAtPixel(i.pixel,n=>{var l,u;let r=n;r.setStyle(H.call(this,r,void 0,{stroke:new d({color:"#000",width:3})})),o.county&&((l=o.county)==null?void 0:l.ol_uid)!==r.ol_uid&&((u=o.county)==null||u.setStyle(E.bind(this))),o.county=r},{layerFilter:n=>n===t.county})})},methods:{}}),D0={class:"map",ref:"map"},Y0={class:"loading",ref:"loading"};function U0(o,e,s,t,c,i){return m(),b(A,null,[a("div",D0,null,512),a("div",Y0,null,512)],64)}var G0=v(P0,[["render",U0],["__scopeId","data-v-6e9a0c5b"]]);const R0=w({setup(){const o=O(null),e=O(null);return{DengueFeverCasesOverTheYearsHtml:o,NumberOfDengueFeverCasesHtml:e}},async mounted(){let o=(await T({url:"https://antimosquito.a102009102009.repl.co/api/pls/?url=eic/Age_County_Gender_061.json",method:"GET"})).data,e={};o.forEach(t=>{var n,r;let c=e[n=t.\u767C\u75C5\u5E74\u4EFD]||(e[n]={});(c[r=t.\u6027\u5225]||(c[r]=[])).push(t)});let s={};Object.entries(e).forEach(([t,c])=>{var i,n;s[t]||(s[t]={}),s[t].F=(i=c.F)==null?void 0:i.length,s[t].M=(n=c.M)==null?void 0:n.length}),this.DengueFeverCasesOverTheYears(o,e,s),this.NumberOfDengueFeverCases(o,e,s)},methods:{async NumberOfDengueFeverCases(o,e,s){let t=j(this.NumberOfDengueFeverCasesHtml);t.setOption({title:{text:"\u767B\u9769\u71B1\u5E74\u6708\u75C5\u4F8B\u6578",left:"center"},grid:{top:"20%",left:"3%",right:"8%",bottom:"3%",containLabel:!0}});let c={};o.forEach(i=>{var r,l;let n=c[r=i.\u767C\u75C5\u5E74\u4EFD]||(c[r]={});n[l=i.\u767C\u75C5\u6708\u4EFD]||(n[l]=0),n[i.\u767C\u75C5\u6708\u4EFD]+=+i.\u78BA\u5B9A\u75C5\u4F8B\u6578}),t.setOption({tooltip:{trigger:"item",formatter:"{a}\u5E74{b}\u6708<br/> {c}\u4F8B"},xAxis:{type:"category",name:"\u6708\u4EFD",data:["01","02","03","04","05","06","07","08","09","10","11","12"]},yAxis:{type:"log",name:"\u75C5\u4F8B",minorSplitLine:{show:!0}},legend:{orient:"vertical",left:"right",backgroundColor:"#fff"},series:Object.entries(c).map(([i,n])=>({name:i,type:"line",data:Object.values(n).map(r=>r||0)})).slice(-6)})},async DengueFeverCasesOverTheYears(o,e,s){let t=j(this.DengueFeverCasesOverTheYearsHtml);t.setOption({title:{text:"\u6B77\u5E74\u767B\u9769\u71B1\u75C5\u4F8B\u6578",left:"center"},legend:{orient:"vertical",left:"left",data:["\u7537","\u5973"]}}),t.showLoading(),Object.assign(window,{dictData:e,seriesData:s}),t.hideLoading(),t.setOption({tooltip:{trigger:"item",formatter:"{b}\u5E74<br/>{a}: {c}\u4F8B"},xAxis:{name:"\u5E74",data:Object.keys(e)},yAxis:{name:"\u75C5\u4F8B",minorSplitLine:{show:!0}},series:[{name:"\u7537",type:"bar",data:Object.values(s).map(c=>c.F),itemStyle:{color:"#447ebe"}},{name:"\u5973",type:"bar",data:Object.values(s).map(c=>c.M),itemStyle:{color:"#be4444"}}],grid:{top:"20%",left:"3%",right:"8%",bottom:"3%",containLabel:!0}})}}}),W0={class:"chart",ref:"DengueFeverCasesOverTheYearsHtml"},J0={class:"chart",ref:"NumberOfDengueFeverCasesHtml"};function Z0(o,e,s,t,c,i){return m(),b(A,null,[a("div",W0,null,512),a("div",J0,null,512)],64)}var K0=v(R0,[["render",Z0],["__scopeId","data-v-518561bd"]]);const Q0=w({components:{templateMain:H0,Map:G0,chartMain:K0},setup(){setTimeout(()=>{console.log(`%c Monkey %c
 awa`,"padding: 10px 42px; font-size: 32px; font-weight: 600; color: #596164; text-shadow: 2px 2px 6px #ffb199; border-radius: 10px; background-color: rgb(233, 233, 233); background-image: radial-gradient( circle at 100% 150%, rgb(233, 233, 233) 24%, white 24%, white 28%, rgb(233, 233, 233) 28%, rgb(233, 233, 233) 36%, white 36%, white 40%, transparent 40%, transparent ), radial-gradient( circle at 0 150%, rgb(233, 233, 233) 24%, white 24%, white 28%, rgb(233, 233, 233) 28%, rgb(233, 233, 233) 36%, white 36%, white 40%, transparent 40%, transparent ), radial-gradient( circle at 50% 100%, white 10%, rgb(233, 233, 233) 10%, rgb(233, 233, 233) 23%, white 23%, white 30%, rgb(233, 233, 233) 30%, rgb(233, 233, 233) 43%, white 43%, white 50%, rgb(233, 233, 233) 50%, rgb(233, 233, 233) 63%, white 63%, white 71%, transparent 71%, transparent ), radial-gradient( circle at 100% 50%, white 5%, rgb(233, 233, 233) 5%, rgb(233, 233, 233) 15%, white 15%, white 20%, rgb(233, 233, 233) 20%, rgb(233, 233, 233) 29%, white 29%, white 34%, rgb(233, 233, 233) 34%, rgb(233, 233, 233) 44%, white 44%, white 49%, transparent 49%, transparent ), radial-gradient( circle at 0 50%, white 5%, rgb(233, 233, 233) 5%, rgb(233, 233, 233) 15%, white 15%, white 20%, rgb(233, 233, 233) 20%, rgb(233, 233, 233) 29%, white 29%, white 34%, rgb(233, 233, 233) 34%, rgb(233, 233, 233) 44%, white 44%, white 49%, transparent 49%, transparent ); background-size: 100px 50px;","padding-top: 40px;")},1e3)}});function X0(o,e,s,t,c,i){const n=g("templateMain"),r=g("router-view"),l=g("Map"),u=g("chartMain");return m(),b(A,null,[_(n),_(r,{class:"wrapper"}),_(l),_(u)],64)}var e1=v(Q0,[["render",X0]]);function t1(){return{}}var c1={},o1={};const n1=Symbol(),s1=u0({state:t1,getters:c1,mutations:o1}),i1="modulepreload",q={},r1="/",l1=function(e,s){return!s||s.length===0?e():Promise.all(s.map(t=>{if(t=`${r1}${t}`,t in q)return;q[t]=!0;const c=t.endsWith(".css"),i=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${i}`))return;const n=document.createElement("link");if(n.rel=c?"stylesheet":i1,c||(n.as="script",n.crossOrigin=""),n.href=t,document.head.appendChild(n),c)return new Promise((r,l)=>{n.addEventListener("load",r),n.addEventListener("error",l)})})).then(()=>e())},a1=[{name:"Home",path:"/",component:()=>l1(()=>import("./index.0288c6d9.js"),["assets/index.0288c6d9.js","assets/vendor.60e1b841.js"])}],u1=d0({history:f0(),routes:a1});var d1={install(o){o.use(s1,n1),o.use(u1)}};h0(e1).use(d1).mount("#app");export{v as _};
