import{d as a,c as u,o as i,a as h,r as l,b as $,p as y,e as g,f as x,g as _,h as b,i as M,j as S,k}from"./vendor.b8a23589.js";const A=function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}};A();var d=(o,c)=>{const s=o.__vccOpts||o;for(const[r,e]of c)s[r]=e;return s};const L=a({data(){return{}}}),O={class:"menu flex flex-item-center"},E=h('<div class="list flex flex-center" data-v-c9cd6360><div data-v-c9cd6360><a href="/" data-v-c9cd6360>\u6587\u6A94</a></div><div data-v-c9cd6360>2</div><div data-v-c9cd6360>3</div><div data-v-c9cd6360>4</div><div data-v-c9cd6360>5</div><div data-v-c9cd6360>6</div><div data-v-c9cd6360>7</div><div data-v-c9cd6360>8</div><div data-v-c9cd6360>9</div><div data-v-c9cd6360>10</div></div><div class="openMenu flex flex-item-center" data-v-c9cd6360><div class="style" data-v-c9cd6360></div></div>',2),I=[E];function P(o,c,s,r,e,t){return i(),u("div",O,I)}var N=d(L,[["render",P],["__scopeId","data-v-c9cd6360"]]);const B=a({components:{Menu:N}}),H=o=>(y("data-v-c71ac5b8"),o=o(),g(),o),C={id:"header",class:"flex flex-item-center"},V=H(()=>x("h1",{class:"title"},"\u868A\u5B50",-1));function j(o,c,s,r,e,t){const n=l("Menu");return i(),u("header",C,[V,$(n)])}var w=d(B,[["render",j],["__scopeId","data-v-c71ac5b8"]]);const R=a({components:{HeaderMain:w}});function q(o,c,s,r,e,t){const n=l("HeaderMain");return i(),_(n)}var T=d(R,[["render",q]]);const W=a({components:{templateMain:T}});function z(o,c,s,r,e,t){const n=l("templateMain");return i(),_(n)}var v=d(W,[["render",z]]),D=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:v});const F="modulepreload",p={},K="/",G=function(c,s){return!s||s.length===0?c():Promise.all(s.map(r=>{if(r=`${K}${r}`,r in p)return;p[r]=!0;const e=r.endsWith(".css"),t=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${t}`))return;const n=document.createElement("link");if(n.rel=e?"stylesheet":F,e||(n.as="script",n.crossOrigin=""),n.href=r,document.head.appendChild(n),e)return new Promise((f,m)=>{n.addEventListener("load",f),n.addEventListener("error",m)})})).then(()=>c())},J=[{name:"Home",path:"/",component:()=>G(()=>Promise.resolve().then(function(){return D}),void 0)}],Q=b({history:M(),routes:J});function U(){return{}}var X={},Y={};const Z=Symbol(),ee=S({state:U,getters:X,mutations:Y});var te={install(o){o.use(ee,Z)}};k(v).use(Q).use(te).mount("#app");