import{M as h,ao as m,ap as b,as as d,a1 as v,O as f,a6 as c,bq as u,T as g,z as t,aI as T}from"./DUb33LPf.js";const x=h({fixedHeader:Boolean,fixedFooter:Boolean,height:[Number,String],hover:Boolean,...m(),...b(),...d(),...v()},"VTable"),k=f()({name:"VTable",props:x(),setup(a,r){let{slots:e,emit:y}=r;const{themeClasses:i}=c(a),{densityClasses:n}=u(a);return g(()=>t(a.tag,{class:["v-table",{"v-table--fixed-height":!!a.height,"v-table--fixed-header":a.fixedHeader,"v-table--fixed-footer":a.fixedFooter,"v-table--has-top":!!e.top,"v-table--has-bottom":!!e.bottom,"v-table--hover":a.hover},i.value,n.value,a.class],style:a.style},{default:()=>{var o,s,l;return[(o=e.top)==null?void 0:o.call(e),e.default?t("div",{class:"v-table__wrapper",style:{height:T(a.height)}},[t("table",null,[e.default()])]):(s=e.wrapper)==null?void 0:s.call(e),(l=e.bottom)==null?void 0:l.call(e)]}})),{}}});export{k as V,x as m};