import{M as h,aA as f,ag as k,ak as x,O as y,aY as S,au as C,aC as L,bu as w,ao as B,am as P,j as T,aJ as V,T as A,z as l,W as _}from"./CuAf4GPC.js";const j={actions:"button@2",article:"heading, paragraph",avatar:"avatar",button:"button",card:"image, heading","card-avatar":"image, list-item-avatar",chip:"chip","date-picker":"list-item, heading, divider, date-picker-options, date-picker-days, actions","date-picker-options":"text, avatar@2","date-picker-days":"avatar@28",divider:"divider",heading:"heading",image:"image","list-item":"text","list-item-avatar":"avatar, text","list-item-two-line":"sentences","list-item-avatar-two-line":"avatar, sentences","list-item-three-line":"paragraph","list-item-avatar-three-line":"avatar, paragraph",ossein:"ossein",paragraph:"text@3",sentences:"text@2",subtitle:"text",table:"table-heading, table-thead, table-tbody, table-tfoot","table-heading":"chip, text","table-thead":"heading@6","table-tbody":"table-row-divider@6","table-row-divider":"table-row, divider","table-row":"text@6","table-tfoot":"text@2, avatar@2",text:"text"};function D(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return l("div",{class:["v-skeleton-loader__bone",`v-skeleton-loader__${e}`]},[t])}function r(e){const[t,a]=e.split("@");return Array.from({length:a}).map(()=>n(t))}function n(e){let t=[];if(!e)return t;const a=j[e];if(e!==a){if(e.includes(","))return s(e);if(e.includes("@"))return r(e);a.includes(",")?t=s(a):a.includes("@")?t=r(a):a&&t.push(n(a))}return[D(e,t)]}function s(e){return e.replace(/\s/g,"").split(",").map(n)}const E=h({boilerplate:Boolean,color:String,loading:Boolean,loadingText:{type:String,default:"$vuetify.loading"},type:{type:[String,Array],default:"ossein"},...f(),...k(),...x()},"VSkeletonLoader"),$=y()({name:"VSkeletonLoader",props:E(),setup(e,t){let{slots:a}=t;const{backgroundColorClasses:d,backgroundColorStyles:c}=S(C(e,"color")),{dimensionStyles:u}=L(e),{elevationClasses:g}=w(e),{themeClasses:m}=B(e),{t:v}=P(),p=T(()=>n(V(e.type).join(",")));return A(()=>{var o;const i=!a.default||e.loading,b=e.boilerplate||!i?{}:{ariaLive:"polite",ariaLabel:v(e.loadingText),role:"alert"};return l("div",_({class:["v-skeleton-loader",{"v-skeleton-loader--boilerplate":e.boilerplate},m.value,d.value,g.value],style:[c.value,i?u.value:{}]},b),[i?p.value:(o=a.default)==null?void 0:o.call(a)])}),{}}});export{$ as V};
