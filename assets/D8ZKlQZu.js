import{L as F,M as I,N as j,V as R,O as N,P as X,Q as $,r as C,R as O,H as k,S as z,T as U,U as E,W as S,z as t,X as G,Y as W,Z,j as H,$ as Q,t as V,v as P,A as l,a0 as p,a1 as x,a2 as Y,a3 as B,a4 as q,a5 as J,x as a,a6 as K,a7 as ee,a8 as te,a9 as ae,y as c,B as L,_ as ne}from"./Db0heZln.js";import{V as M,a as le,b as oe}from"./Dp5TRRmI.js";import{V as se}from"./ClUvfsuv.js";import{V as D}from"./DeLtCT7P.js";import{V as ie,a as re}from"./DOS-czDS.js";import{V as ce}from"./22TMvEWf.js";import{V as de}from"./Db_SJQs2.js";const T=F("client",{state:()=>({client:{}}),actions:{setClient(o){this.client=o},clearClient(){this.client={}}}}),_e=I({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...j({origin:"center center",scrollStrategy:"block",transition:{component:R},zIndex:2400})},"VDialog"),ue=N()({name:"VDialog",props:_e(),emits:{"update:modelValue":o=>!0,afterLeave:()=>!0},setup(o,u){let{emit:d,slots:s}=u;const r=X(o,"modelValue"),{scopeId:v}=$(),n=C();function h(e){var g,y;const i=e.relatedTarget,f=e.target;if(i!==f&&((g=n.value)!=null&&g.contentEl)&&((y=n.value)!=null&&y.globalTop)&&![document,n.value.contentEl].includes(f)&&!n.value.contentEl.contains(f)){const _=Z(n.value.contentEl);if(!_.length)return;const b=_[0],A=_[_.length-1];i===b?A.focus():b.focus()}}O&&k(()=>r.value&&o.retainFocus,e=>{e?document.addEventListener("focusin",h):document.removeEventListener("focusin",h)},{immediate:!0});function w(){var e;(e=n.value)!=null&&e.contentEl&&!n.value.contentEl.contains(document.activeElement)&&n.value.contentEl.focus({preventScroll:!0})}function m(){d("afterLeave")}return k(r,async e=>{var i;e||(await z(),(i=n.value.activatorEl)==null||i.focus({preventScroll:!0}))}),U(()=>{const e=E.filterProps(o),i=S({"aria-haspopup":"dialog","aria-expanded":String(r.value)},o.activatorProps),f=S({tabindex:-1},o.contentProps);return t(E,S({ref:n,class:["v-dialog",{"v-dialog--fullscreen":o.fullscreen,"v-dialog--scrollable":o.scrollable},o.class],style:o.style},e,{modelValue:r.value,"onUpdate:modelValue":g=>r.value=g,"aria-modal":"true",activatorProps:i,contentProps:f,role:"dialog",onAfterEnter:w,onAfterLeave:m},v),{activator:s.activator,default:function(){for(var g=arguments.length,y=new Array(g),_=0;_<g;_++)y[_]=arguments[_];return t(G,{root:"VDialog"},{default:()=>{var b;return[(b=s.default)==null?void 0:b.call(s,...y)]}})}})}),W({},n)}}),me={class:"text-center pa-4"},fe={__name:"Single",setup(o){const u=T(),d=H(()=>u.client),s=Q("clientDialog",()=>!1);k(d,(v,n)=>{u.client.first_name&&(s.value=!0)});function r(){u.clearClient(),s.value=!1}return(v,n)=>(V(),P("div",me,[t(ue,{modelValue:x(s),"onUpdate:modelValue":n[0]||(n[0]=h=>Y(s)?s.value=h:null),width:"auto",onAfterLeave:r},{default:l(()=>[t(M,{width:"700","max-width":"700","prepend-icon":"mdi-account",text:"",title:"Client Information",flat:""},{actions:l(()=>[t(p,{class:"ms-auto",text:"Ok",onClick:r})]),default:l(()=>[t(se,{class:"mx-auto w-100","max-width":"600",type:"card-avatar, article, actions",boilerplate:""})]),_:1})]),_:1},8,["modelValue"])]))}},ge=a("b",null,"Clients",-1),pe={class:"text-h4 font-weight-bold d-flex justify-space-between mb-4 pt-5 align-center"},ve={class:"d-flex align-center"},he=a("span",{class:"text-decoration-underline text-none"},"See all",-1),ye={class:"d-inline-flex"},be={class:"text-h6"},Ve={align:"right"},xe=a("th",null,"Payment Balances:",-1),we={align:"right"},Se=a("th",null,"Pending Sessions:",-1),Ce={align:"right"},ke=a("th",null,"Pending Services:",-1),Pe={align:"right"},Ee=a("th",null,"Loyalty Card 1:",-1),Be={align:"right"},Le=a("th",null,"Loyalty Card 2:",-1),De={__name:"List",setup(o){const u=T(),d=C(4),s=C([{img:"https://bit.ly/4dnXrBi",first_name:"Mr. Client",last_name:"Spender",balances:0,email:"client@gmail.com",contact:"0987654321",pending_sessions:4,pending_services:2,loyalty_card_1:5,loyalty_card_2:5},{img:"https://bit.ly/4dnXrBi",first_name:"Mr. Generous",last_name:"Spender",balances:5e3,email:"client@gmail.com",contact:"0987654321",pending_sessions:4,pending_services:2,loyalty_card_1:5,loyalty_card_2:5},{img:"https://cdn.vectorstock.com/i/1000v/82/33/person-gray-photo-placeholder-woman-vector-24138233.jpg",first_name:"Mrs. Ford",last_name:"Spender",balances:0,email:"client@gmail.com",contact:"0987654321",pending_sessions:4,pending_services:2,loyalty_card_1:5,loyalty_card_2:5},{img:"https://bit.ly/4dnXrBi",first_name:"Mr. Zeus",last_name:"Spender",balances:1e4,email:"client@gmail.com",contact:"0987654321",pending_sessions:4,pending_services:2,loyalty_card_1:5,loyalty_card_2:5},{img:"https://cdn.vectorstock.com/i/1000v/82/33/person-gray-photo-placeholder-woman-vector-24138233.jpg",first_name:"Mrs. Fashion",last_name:"Spender",balances:0,email:"client@gmail.com",contact:"0987654321",pending_sessions:4,pending_services:2,loyalty_card_1:5,loyalty_card_2:5},{img:"https://bit.ly/4dnXrBi",first_name:"Mr. Client",last_name:"Spender",balances:0,email:"client@gmail.com",contact:"0987654321",pending_sessions:4,pending_services:2,loyalty_card_1:5,loyalty_card_2:5},{img:"https://bit.ly/4dnXrBi",first_name:"Mr. Generous",last_name:"Spender",balances:5e3,email:"client@gmail.com",contact:"0987654321",pending_sessions:4,pending_services:2,loyalty_card_1:5,loyalty_card_2:5},{img:"https://cdn.vectorstock.com/i/1000v/82/33/person-gray-photo-placeholder-woman-vector-24138233.jpg",first_name:"Mrs. Ford",last_name:"Spender",balances:0,email:"client@gmail.com",contact:"0987654321",pending_sessions:4,pending_services:2,loyalty_card_1:5,loyalty_card_2:5}]),r=()=>{d.value=d.value===4?s.value.length:4};function v(n){u.setClient(n)}return(n,h)=>{const w=fe;return V(),B(M,{flat:"",border:""},{default:l(()=>[t(q,{color:"orange-lighten-4"},{default:l(()=>[t(J,null,{default:l(()=>[ge]),_:1}),t(D),t(p,{icon:"mdi-magnify",variant:"text"})]),_:1}),t(le,{class:"px-5",items:x(s),"items-per-page":x(d)},{header:l(({page:m,pageCount:e,prevPage:i,nextPage:f})=>[a("h1",pe,[t(D),a("div",ve,[t(p,{class:"me-8",variant:"text",onClick:r},{default:l(()=>[he]),_:1}),a("div",ye,[t(p,{disabled:m===1,class:"me-2",icon:"mdi-arrow-left",size:"small",variant:"tonal",onClick:i},null,8,["disabled","onClick"]),t(p,{disabled:m===e,icon:"mdi-arrow-right",size:"small",variant:"tonal",onClick:f},null,8,["disabled","onClick"])])])])]),default:l(({items:m})=>[t(ie,null,{default:l(()=>[(V(!0),P(K,null,ee(m,(e,i)=>(V(),B(re,{key:i,cols:"12",sm:"6",xl:"3"},{default:l(()=>[t(ce,{border:""},{default:l(()=>[t(te,{gradient:"to top right, rgba(255, 255, 255, .1), rgba(255, 255, 255, .15)",src:e.raw.img,height:"150",cover:""},null,8,["src"]),t(ae,{title:"Name",density:"comfortable",lines:"two"},{title:l(()=>[a("strong",be,c(e.raw.first_name)+" "+c(e.raw.last_name),1)]),_:2},1024),t(oe,{class:"text-caption",density:"compact"},{default:l(()=>[a("tbody",null,[a("tr",Ve,[xe,a("td",null,"₱ "+c(e.raw.balances),1)]),a("tr",we,[Se,a("td",null,c(e.raw.pending_sessions),1)]),a("tr",Ce,[ke,a("td",null,c(e.raw.pending_services),1)]),a("tr",Pe,[Ee,a("td",null,c(e.raw.loyalty_card_1)+" redeemed",1)]),a("tr",Be,[Le,a("td",null,c(e.raw.loyalty_card_2)+" redeemed",1)])])]),_:2},1024),t(p,{flat:"",color:"grey-lighten-3",class:"text-none",block:"",onClick:f=>v(e.raw)},{default:l(()=>[L(" More info ")]),_:2},1032,["onClick"])]),_:2},1024)]),_:2},1024))),128))]),_:2},1024)]),footer:l(({page:m,pageCount:e})=>[t(de,{class:"justify-space-between text-body-2 mt-4",color:"surface-variant"},{default:l(()=>[L(" Total clients: "+c(x(s).length)+" ",1),a("div",null,"Page "+c(m)+" of "+c(e),1)]),_:2},1024)]),_:1},8,["items","items-per-page"]),t(w)]),_:1})}}},Me={},Te={class:"w-100 h-100 d-flex justify-center align-center"};function Ae(o,u){const d=De;return V(),P("div",Te,[t(d)])}const Oe=ne(Me,[["render",Ae]]);export{Oe as default};