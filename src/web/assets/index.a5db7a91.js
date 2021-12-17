import{d as p,r as l,c as g,a as i,b as _,w as I,p as k,e as M,o as f,f as O,g as L,h as N,F as P,V as C,i as E,G as T,P as V,M as j,l as m,s as v,T as $,S as d,j as u,k as h,m as y,C as z,n as F,A as B,q as H,t as U,u as q,v as G,x as R}from"./vendor.49f100f0.js";const W=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};W();var w=(n,a)=>{const s=n.__vccOpts||n;for(const[o,e]of a)s[o]=e;return s};const D=p({data(){return{}}}),c=n=>(k("data-v-4eec8a20"),n=n(),M(),n),J={class:"menu flex flex-item-center"},K={class:"list flex flex-center"},Y=O("\u6587\u6A94"),Q=c(()=>i("div",null,"2",-1)),X=c(()=>i("div",null,"3",-1)),Z=c(()=>i("div",null,"4",-1)),ee=c(()=>i("div",null,"5",-1)),te=c(()=>i("div",null,"6",-1)),ne=c(()=>i("div",null,"7",-1)),oe=c(()=>i("div",null,"8",-1)),re=c(()=>i("div",null,"9",-1)),se=c(()=>i("div",null,"10",-1)),ae=c(()=>i("div",{class:"openMenu flex flex-item-center"},[i("div",{class:"style"})],-1));function ie(n,a,s,o,e,t){const r=l("router-link");return f(),g("div",J,[i("div",K,[i("div",null,[_(r,{to:"/"},{default:I(()=>[Y]),_:1})]),Q,X,Z,ee,te,ne,oe,re,se]),ae])}var ce=w(D,[["render",ie],["__scopeId","data-v-4eec8a20"]]);const le=p({components:{Menu:ce}}),de=n=>(k("data-v-1aed7f03"),n=n(),M(),n),ue={id:"header",class:"flex flex-item-center"},pe=de(()=>i("a",{href:"/",class:"title"},"\u868A\u5B50",-1));function _e(n,a,s,o,e,t){const r=l("Menu");return f(),g("header",ue,[pe,_(r)])}var fe=w(le,[["render",_e],["__scopeId","data-v-1aed7f03"]]);const he=p({components:{HeaderMain:fe}});function we(n,a,s,o,e,t){const r=l("HeaderMain");return f(),L(r)}var ge=w(he,[["render",we]]);const me="https://antimosquito.a102009102009.repl.co";const ve=p({data(){return{data:{}}},async mounted(){this.data=await N({url:`${me}/api/v1/data`,method:"GET"});let n=new P,a=!1,s=new C({center:E([120.221507,23.000694]),zoom:12}),o=new T({projection:s.getProjection()});o.setTracking(!0),o.on("error",e=>console.log(e.message)),o.on("change:position",function(){let e=o.getPosition();n.setGeometry(e?new V(e):void 0),a||(s.setCenter(e),a=!0)}),new j({target:this.$refs.map,layers:[new m({source:new v({url:"https://kiang.github.io/taiwan_basecode/cunli/topo/20210324.json",format:new $}),style:(e,t)=>t>40?new d({fill:new u({color:"#ffffff"})}):new d({stroke:new h({color:"#000",width:1}),fill:new u({color:"#ffffff"}),text:new y({font:"14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",fill:new u({color:"#000"}),text:e.get("VILLNAME")})}),zIndex:50}),new m({source:new v({url:"https://kiang.github.io/taiwan_basecode/city/city.topo.json",format:new $}),style:(e,t)=>t>40&&t<180?new d({stroke:new h({color:"#ff0000",width:1}),fill:new u({color:"#ffffff00"}),text:new y({font:"14px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",text:e.get("TOWNNAME")})}):t<=180?new d({stroke:new h({color:"#ff0000",width:1})}):void 0,zIndex:100}),new m({source:new v({url:"https://kiang.github.io/taiwan_basecode/county/topo/20200820.json",format:new $}),style:(e,t)=>new d({stroke:new h({color:"#0000ff",width:1}),fill:new u({color:"#ffffff00"}),text:new y({font:"20px 'Open Sans', 'Arial Unicode MS', 'sans-serif'",text:t>180?e.get("COUNTYNAME"):void 0})}),zIndex:150}),new m({source:new v({features:[n]}),style:new d({image:new z({radius:6,fill:new u({color:"#3399CC"}),stroke:new h({color:"#fff",width:2})})}),zIndex:200})],view:s,controls:F({attribution:!1}).extend([new B({collapsible:!1,collapsed:!0})])})}}),xe={class:"map",ref:"map"};function be(n,a,s,o,e,t){return f(),g("div",xe,null,512)}var $e=w(ve,[["render",be],["__scopeId","data-v-85a97a9c"]]);const ye=p({components:{templateMain:ge,Map:$e},setup(){setTimeout(()=>{console.log(`%c Monkey %c
 awa`,"padding: 10px 42px; font-size: 32px; font-weight: 600; color: #596164; text-shadow: 2px 2px 6px #ffb199; border-radius: 10px; background-color: rgb(233, 233, 233); background-image: radial-gradient( circle at 100% 150%, rgb(233, 233, 233) 24%, white 24%, white 28%, rgb(233, 233, 233) 28%, rgb(233, 233, 233) 36%, white 36%, white 40%, transparent 40%, transparent ), radial-gradient( circle at 0 150%, rgb(233, 233, 233) 24%, white 24%, white 28%, rgb(233, 233, 233) 28%, rgb(233, 233, 233) 36%, white 36%, white 40%, transparent 40%, transparent ), radial-gradient( circle at 50% 100%, white 10%, rgb(233, 233, 233) 10%, rgb(233, 233, 233) 23%, white 23%, white 30%, rgb(233, 233, 233) 30%, rgb(233, 233, 233) 43%, white 43%, white 50%, rgb(233, 233, 233) 50%, rgb(233, 233, 233) 63%, white 63%, white 71%, transparent 71%, transparent ), radial-gradient( circle at 100% 50%, white 5%, rgb(233, 233, 233) 5%, rgb(233, 233, 233) 15%, white 15%, white 20%, rgb(233, 233, 233) 20%, rgb(233, 233, 233) 29%, white 29%, white 34%, rgb(233, 233, 233) 34%, rgb(233, 233, 233) 44%, white 44%, white 49%, transparent 49%, transparent ), radial-gradient( circle at 0 50%, white 5%, rgb(233, 233, 233) 5%, rgb(233, 233, 233) 15%, white 15%, white 20%, rgb(233, 233, 233) 20%, rgb(233, 233, 233) 29%, white 29%, white 34%, rgb(233, 233, 233) 34%, rgb(233, 233, 233) 44%, white 44%, white 49%, transparent 49%, transparent ); background-size: 100px 50px;","padding-top: 40px;")},1e3)}});function ke(n,a,s,o,e,t){const r=l("templateMain"),x=l("router-views"),b=l("Map");return f(),g(H,null,[_(r),_(x),_(b)],64)}var S=w(ye,[["render",ke]]),Me=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:S});function Se(){return{}}var Ae={},Ie={};const Oe=Symbol(),Le=U({state:Se,getters:Ae,mutations:Ie}),Ne="modulepreload",A={},Pe="/",Ce=function(a,s){return!s||s.length===0?a():Promise.all(s.map(o=>{if(o=`${Pe}${o}`,o in A)return;A[o]=!0;const e=o.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${o}"]${t}`))return;const r=document.createElement("link");if(r.rel=e?"stylesheet":Ne,e||(r.as="script",r.crossOrigin=""),r.href=o,document.head.appendChild(r),e)return new Promise((x,b)=>{r.addEventListener("load",x),r.addEventListener("error",b)})})).then(()=>a())},Ee=[{name:"Home",path:"/",component:()=>Ce(()=>Promise.resolve().then(function(){return Me}),void 0)}],Te=q({history:G(),routes:Ee});var Ve={install(n){n.use(Le,Oe),n.use(Te)}};R(S).use(Ve).mount("#app");
