import{d as _,r as i,o as x,w as f,b as u,c as r,_ as k,a as y,e as l,k as w,v as I,F as p,j as T,u as b,f as B}from"./index.61934ef4.js";import{a as v}from"./index.9ff040e8.js";import{a as E}from"./config.2f2ca7ea.js";const V=_({props:{value:{default:""}},emits:["input"],setup(d,{emit:c}){const e=d,a=i(),o=i("");x(()=>{!a.value||(a.value.innerText=e.value)});const s=()=>{a.value&&(o.value=a.value.innerText)};return f(o,n=>c("input",n)),(n,t)=>(u(),r("p",{contenteditable:"",ref_key:"editableEl",ref:a,onInput:s},null,544))}});const C={class:"config"},F={class:"search"},M={class:"users"},N=["value"],U=_({setup(d){const c=v.CancelToken.source(),e=i(),a=y({list:[]}),o=({target:s})=>e.value=(s==null?void 0:s.value)||e.value;return f(e,async()=>{if(a.list=[],!e.value)return;const{data:s}=await v({url:`${E}/api/v1/users/find`,cancelToken:c.token,params:{keyword:e.value}}).catch(()=>({data:[]}));a.list=s}),(s,n)=>(u(),r(p,null,[l("div",C,[l("div",F,[w(l("input",{type:"search","onUpdate:modelValue":n[0]||(n[0]=t=>e.value=t),onInput:o,list:"client-id-name"},null,544),[[I,e.value]])])]),l("div",M,[(u(!0),r(p,null,T(b(a).list,(t,m)=>(u(),r("div",{key:m,value:t.id},[B(V,{onInput:h=>t.name=h,value:t.id},null,8,["onInput","value"])],8,N))),128))])],64))}});var D=k(U,[["__scopeId","data-v-3333c8de"]]);export{D as default};
