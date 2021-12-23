var H=Object.defineProperty;var V=Object.getOwnPropertySymbols;var W=Object.prototype.hasOwnProperty,Y=Object.prototype.propertyIsEnumerable;var j=(r,e,o)=>e in r?H(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o,x=(r,e)=>{for(var o in e||(e={}))W.call(e,o)&&j(r,o,e[o]);if(V)for(var o of V(e))Y.call(e,o)&&j(r,o,e[o]);return r};import{d as $,r as y,c as N,a as c,b as k,w as D,p as F,e as z,o as M,f as R,g as J,S as g,h as _,F as m,T as I,i as K,j as q,k as Q,V as X,l as Z,G as ee,P as te,m as oe,n as ne,q as S,s as E,t as C,u as re,C as ie,M as se,v as ae,A as le,x as U,y as ce,z as de,B as ue,D as fe}from"./vendor.ce4960bf.js";const _e=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerpolicy&&(s.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?s.credentials="include":t.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}};_e();var A=(r,e)=>{const o=r.__vccOpts||r;for(const[n,t]of e)o[n]=t;return o};const pe=$({data(){return{}}}),p=r=>(F("data-v-4eec8a20"),r=r(),z(),r),we={class:"menu flex flex-item-center"},he={class:"list flex flex-center"},ge=R("\u6587\u6A94"),me=p(()=>c("div",null,"2",-1)),ve=p(()=>c("div",null,"3",-1)),ye=p(()=>c("div",null,"4",-1)),be=p(()=>c("div",null,"5",-1)),xe=p(()=>c("div",null,"6",-1)),$e=p(()=>c("div",null,"7",-1)),ke=p(()=>c("div",null,"8",-1)),Me=p(()=>c("div",null,"9",-1)),Se=p(()=>c("div",null,"10",-1)),Ee=p(()=>c("div",{class:"openMenu flex flex-item-center"},[c("div",{class:"style"})],-1));function Ae(r,e,o,n,t,s){const i=y("router-link");return M(),N("div",we,[c("div",he,[c("div",null,[k(i,{to:"/"},{default:D(()=>[ge]),_:1})]),me,ve,ye,be,xe,$e,ke,Me,Se]),Ee])}var Ne=A(pe,[["render",Ae],["__scopeId","data-v-4eec8a20"]]);const Oe=$({components:{Menu:Ne}}),Ie=r=>(F("data-v-1aed7f03"),r=r(),z(),r),qe={id:"header",class:"flex flex-item-center"},Ce=Ie(()=>c("a",{href:"/",class:"title"},"\u868A\u5B50",-1));function Le(r,e,o,n,t,s){const i=y("Menu");return M(),N("header",qe,[Ce,k(i)])}var Pe=A(Oe,[["render",Le],["__scopeId","data-v-1aed7f03"]]);const Te=$({components:{HeaderMain:Pe}});function Ve(r,e,o,n,t,s){const i=y("HeaderMain");return M(),J(i)}var je=A(Te,[["render",Ve]]);const Fe="https://antimosquito.a102009102009.repl.co";function L(r){let e="#fff";return r>50?e="#470115":r>20?e="#6f006d":r>10?e="#a4005b":r>5?e="#d00b33":r>3?e="#e75033":r>1?e="#ffa133":r>0&&(e="#e3d738"),e}function B(r,e,o){var s;let n=r,t=0;if(n.mosquitos===void 0){let i=(s=this.data)==null?void 0:s[n.get("COUNTYNAME")];typeof i=="object"&&Object.entries(i).forEach(([a,l])=>Object.entries(l).forEach(([u,w])=>w.forEach(b=>t+=b.mosquitos)))}return t=n.mosquitos||(n.mosquitos=t),e&&e>180?new g(x({stroke:new _({color:"#0000ff",width:1}),fill:new m({color:L(~~(t/100))}),text:new I({font:"20px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",text:`${n.get("COUNTYNAME")}
${t||""}`})},o)):new g(x({stroke:new _({color:"#0000ff",width:1}),fill:new m({color:"#ffffff00"})},o))}function O(r,e,o){var t,s;let n=r;if(e&&e>40&&e<180){let i=0;return n.mosquitos===void 0&&Object.entries(((s=(t=this.data)==null?void 0:t[n.get("COUNTYNAME")])==null?void 0:s[n.get("TOWNNAME")])||{}).forEach(([a,l])=>l.forEach(u=>i+=u.mosquitos)),i=n.mosquitos||(n.mosquitos=i),new g(x({stroke:new _({color:"#ff0000",width:1}),fill:new m({color:L(~~(i/50))}),text:new I({font:"14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",text:`${n.get("TOWNNAME")}
${i||""}`})},o))}return e&&e<=180?new g({stroke:new _({color:"#ff0000",width:1})}):new g({fill:new m({color:"#fff"}),stroke:new _({color:"#ff00004a",width:1})})}function P(r,e,o){var s,i,a;let n=r;if(e&&e>40)return new g({fill:new m({color:"#ffffff"})});let t=0;return n.mosquitos===void 0&&(((a=(i=(s=this.data)==null?void 0:s[n.get("COUNTYNAME")])==null?void 0:i[n.get("TOWNNAME")])==null?void 0:a[n.get("VILLNAME")])||[]).forEach(l=>t+=l.mosquitos),t=n.mosquitos||(n.mosquitos=t),new g(x({stroke:new _({color:"#000",width:1}),fill:new m({color:L(~~(t/10))}),text:new I({font:"14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",fill:new m({color:"#000"}),text:`${n.get("VILLNAME")||""}
${t||""}`})},o))}const ze={class:"loading",ref:"loading"},Ue=$({setup(r){const e=K(null),o=q({village:void 0,town:void 0,county:void 0});let n=new Q,t=!1,s=new X({center:Z([120.221507,23.000694]),zoom:12}),i=new ee({projection:s.getProjection()});return i.setTracking(!0),i.on("error",a=>console.log(a.message)),i.on("change:position",function(){let a=i.getPosition();n.setGeometry(a?new te(a):void 0),t||(s.setCenter(a),t=!0)}),oe(async()=>{const a=q((await ne({url:`${Fe}/api/v1/data`,method:"GET"})).data),l={data:a},u=q({village:new S({source:new E({url:"https://kiang.github.io/taiwan_basecode/cunli/topo/20210324.json",format:new C}),style:P.bind(l),zIndex:50}),town:new S({source:new E({url:"https://kiang.github.io/taiwan_basecode/city/city.topo.json",format:new C}),style:O.bind(l),zIndex:100}),county:new S({source:new E({url:"https://kiang.github.io/taiwan_basecode/county/topo/20200820.json",format:new C}),style:B.bind(l),zIndex:150}),test:new S({source:new E({url:"/data/ns1hosp_20160603.json",format:new re}),zIndex:200}),locationPoint:new S({source:new E({features:[n]}),style:new g({image:new ie({radius:6,fill:new m({color:"#3399CC"}),stroke:new _({color:"#fff",width:2})})}),zIndex:250})});let w=new se({target:e.value,layers:[u.village,u.town,u.county,u.test,u.locationPoint],view:s,controls:ae({attribution:!1}).extend([new le({collapsible:!1,collapsed:!0})])});w.on("singleclick",b=>{w.forEachFeatureAtPixel(b.pixel,f=>{var v,h;let d=f;d.get("VILLNAME")&&w.getView().get("resolution")<40&&(d.setStyle(P.call(l,d,void 0,{stroke:new _({color:"#000",width:3})})),o.village&&((v=o.village)==null?void 0:v.ol_uid)!==d.ol_uid&&((h=o.village)==null||h.setStyle(P.bind(l))),o.village=d)},{layerFilter:f=>f===u.village}),w.forEachFeatureAtPixel(b.pixel,f=>{var h,T;let d=f,v=w.getView().get("resolution");d.setStyle(O.call({data:a},d,v,{stroke:new _({color:"#000",width:3})})),o.town&&((h=o.town)==null?void 0:h.ol_uid)!==d.ol_uid&&((T=o.town)==null||T.setStyle(O.bind(l))),o.town=d},{layerFilter:f=>f===u.town}),w.forEachFeatureAtPixel(b.pixel,f=>{var v,h;let d=f;d.setStyle(B.call({data:a},d,void 0,{stroke:new _({color:"#000",width:3})})),o.county&&((v=o.county)==null?void 0:v.ol_uid)!==d.ol_uid&&((h=o.county)==null||h.setStyle(O.bind(l))),o.county=d},{layerFilter:f=>f===u.county})})}),(a,l)=>(M(),N(U,null,[c("div",{class:"map",ref_key:"map",ref:e},null,512),c("div",ze,null,512)],64))}});var Be=A(Ue,[["__scopeId","data-v-9112223a"]]);const Ge=$({components:{templateMain:je,Map:Be},setup(){setTimeout(()=>{console.log(`%c Monkey %c
 awa`,"padding: 10px 42px; font-size: 32px; font-weight: 600; color: #596164; text-shadow: 2px 2px 6px #ffb199; border-radius: 10px; background-color: rgb(233, 233, 233); background-image: radial-gradient( circle at 100% 150%, rgb(233, 233, 233) 24%, white 24%, white 28%, rgb(233, 233, 233) 28%, rgb(233, 233, 233) 36%, white 36%, white 40%, transparent 40%, transparent ), radial-gradient( circle at 0 150%, rgb(233, 233, 233) 24%, white 24%, white 28%, rgb(233, 233, 233) 28%, rgb(233, 233, 233) 36%, white 36%, white 40%, transparent 40%, transparent ), radial-gradient( circle at 50% 100%, white 10%, rgb(233, 233, 233) 10%, rgb(233, 233, 233) 23%, white 23%, white 30%, rgb(233, 233, 233) 30%, rgb(233, 233, 233) 43%, white 43%, white 50%, rgb(233, 233, 233) 50%, rgb(233, 233, 233) 63%, white 63%, white 71%, transparent 71%, transparent ), radial-gradient( circle at 100% 50%, white 5%, rgb(233, 233, 233) 5%, rgb(233, 233, 233) 15%, white 15%, white 20%, rgb(233, 233, 233) 20%, rgb(233, 233, 233) 29%, white 29%, white 34%, rgb(233, 233, 233) 34%, rgb(233, 233, 233) 44%, white 44%, white 49%, transparent 49%, transparent ), radial-gradient( circle at 0 50%, white 5%, rgb(233, 233, 233) 5%, rgb(233, 233, 233) 15%, white 15%, white 20%, rgb(233, 233, 233) 20%, rgb(233, 233, 233) 29%, white 29%, white 34%, rgb(233, 233, 233) 34%, rgb(233, 233, 233) 44%, white 44%, white 49%, transparent 49%, transparent ); background-size: 100px 50px;","padding-top: 40px;")},1e3)}});function He(r,e,o,n,t,s){const i=y("templateMain"),a=y("router-view"),l=y("Map");return M(),N(U,null,[k(i),k(a,{class:"wrapper"}),k(l)],64)}var We=A(Ge,[["render",He]]);function Ye(){return{}}var De={},Re={};const Je=Symbol(),Ke=ce({state:Ye,getters:De,mutations:Re}),Qe="modulepreload",G={},Xe="/",Ze=function(e,o){return!o||o.length===0?e():Promise.all(o.map(n=>{if(n=`${Xe}${n}`,n in G)return;G[n]=!0;const t=n.endsWith(".css"),s=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${s}`))return;const i=document.createElement("link");if(i.rel=t?"stylesheet":Qe,t||(i.as="script",i.crossOrigin=""),i.href=n,document.head.appendChild(i),t)return new Promise((a,l)=>{i.addEventListener("load",a),i.addEventListener("error",l)})})).then(()=>e())},et=[{name:"Home",path:"/",component:()=>Ze(()=>import("./index.1b3b8f3e.js"),["assets/index.1b3b8f3e.js","assets/vendor.ce4960bf.js"])}],tt=de({history:ue(),routes:et});var ot={install(r){r.use(Ke,Je),r.use(tt)}};fe(We).use(ot).mount("#app");export{A as _};
