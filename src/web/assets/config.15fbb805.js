import{_ as u,d as _,r as p,a as v,w as m,c as t,b as o,j as f,v as h,F as k,i as x,u as y,o as n}from"./index.2a4377b2.js";import{a as i}from"./index.9ff040e8.js";import{a as w}from"./config.1f9c29fe.js";const B={class:"config"},C={class:"search"},T={id:"client-id-name"},b=_({setup(F){const l=i.CancelToken.source(),e=p();let c=v([]);const d=({target:a})=>e.value=(a==null?void 0:a.value)||e.value;return m(e,async()=>{const{data:a}=await i({url:`${w}/api/v1/searchClient`,cancelToken:l.token,params:{keyword:e.value}}).catch(()=>({data:{}}));c=a||[]}),(a,r)=>(n(),t("div",B,[o("div",C,[f(o("input",{type:"search",id:"client-id-name","onUpdate:modelValue":r[0]||(r[0]=s=>e.value=s),onInput:d},null,544),[[h,e.value]]),o("datalist",T,[(n(!0),t(k,null,x(y(c),s=>(n(),t("option",{value:"",key:s}))),128))])])]))}});var g=u(b,[["__scopeId","data-v-672bd70a"]]);export{g as default};