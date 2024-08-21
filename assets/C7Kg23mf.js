import{O as V,ao as C,ax as Ce,T as A,z as g,M as k,as as N,bz as Ae,am as L,ap as re,ag as ae,aO as ne,aP as le,X as Q,an as Be,$ as Fe,a0 as De,aY as Te,bJ as Me,bK as Oe,aq as Ee,bD as Le,a1 as Ke,at as Ne,by as Re,a6 as je,bu as Ge,bE as _e,bq as ze,a4 as $e,a5 as He,aZ as We,bL as Je,bM as Qe,bv as Ue,bG as Xe,j as h,bh as Ye,bi as Ze,ai as qe,a_ as se,bH as et,a3 as K,P as p,aU as M,aV as O,r as U,b0 as X,aF as ue,H as ce,bx as ie,F as de,aD as J,a8 as T,a7 as tt,bN as E,b2 as Y,ab as D,aK as at,bC as nt,bp as lt}from"./DUb33LPf.js";const rt=V()({name:"VCardActions",props:C(),setup(e,n){let{slots:t}=n;return Ce({VBtn:{slim:!0,variant:"text"}}),A(()=>{var a;return g("div",{class:["v-card-actions",e.class],style:e.style},[(a=t.default)==null?void 0:a.call(t)])}),{}}}),st=k({opacity:[Number,String],...C(),...N()},"VCardSubtitle"),ut=V()({name:"VCardSubtitle",props:st(),setup(e,n){let{slots:t}=n;return A(()=>g(e.tag,{class:["v-card-subtitle",e.class],style:[{"--v-card-subtitle-opacity":e.opacity},e.style]},t)),{}}}),ct=Ae("v-card-title"),it=k({appendAvatar:String,appendIcon:L,prependAvatar:String,prependIcon:L,subtitle:[String,Number],title:[String,Number],...C(),...re()},"VCardItem"),dt=V()({name:"VCardItem",props:it(),setup(e,n){let{slots:t}=n;return A(()=>{var i;const a=!!(e.prependAvatar||e.prependIcon),l=!!(a||t.prepend),o=!!(e.appendAvatar||e.appendIcon),s=!!(o||t.append),r=!!(e.title!=null||t.title),u=!!(e.subtitle!=null||t.subtitle);return g("div",{class:["v-card-item",e.class],style:e.style},[l&&g("div",{key:"prepend",class:"v-card-item__prepend"},[t.prepend?g(Q,{key:"prepend-defaults",disabled:!a,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon}}},t.prepend):g(ae,null,[e.prependAvatar&&g(ne,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&g(le,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),g("div",{class:"v-card-item__content"},[r&&g(ct,{key:"title"},{default:()=>{var c;return[((c=t.title)==null?void 0:c.call(t))??e.title]}}),u&&g(ut,{key:"subtitle"},{default:()=>{var c;return[((c=t.subtitle)==null?void 0:c.call(t))??e.subtitle]}}),(i=t.default)==null?void 0:i.call(t)]),s&&g("div",{key:"append",class:"v-card-item__append"},[t.append?g(Q,{key:"append-defaults",disabled:!o,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon}}},t.append):g(ae,null,[e.appendIcon&&g(le,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&g(ne,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])])}),{}}}),ot=k({opacity:[Number,String],...C(),...N()},"VCardText"),ft=V()({name:"VCardText",props:ot(),setup(e,n){let{slots:t}=n;return A(()=>g(e.tag,{class:["v-card-text",e.class],style:[{"--v-card-text-opacity":e.opacity},e.style]},t)),{}}}),mt=k({appendAvatar:String,appendIcon:L,disabled:Boolean,flat:Boolean,hover:Boolean,image:String,link:{type:Boolean,default:void 0},prependAvatar:String,prependIcon:L,ripple:{type:[Boolean,Object],default:!0},subtitle:[String,Number],text:[String,Number],title:[String,Number],...Be(),...C(),...re(),...Fe(),...De(),...Te(),...Me(),...Oe(),...Ee(),...Le(),...N(),...Ke(),...Ne({variant:"elevated"})},"VCard"),zt=V()({name:"VCard",directives:{Ripple:Re},props:mt(),setup(e,n){let{attrs:t,slots:a}=n;const{themeClasses:l}=je(e),{borderClasses:o}=Ge(e),{colorClasses:s,colorStyles:r,variantClasses:u}=_e(e),{densityClasses:i}=ze(e),{dimensionStyles:c}=$e(e),{elevationClasses:f}=He(e),{loaderClasses:y}=We(e),{locationStyles:b}=Je(e),{positionClasses:v}=Qe(e),{roundedClasses:S}=Ue(e),I=Xe(e,t),d=h(()=>e.link!==!1&&I.isLink.value),m=h(()=>!e.disabled&&e.link!==!1&&(e.link||I.isClickable.value));return A(()=>{const P=d.value?"a":e.tag,B=!!(a.title||e.title!=null),R=!!(a.subtitle||e.subtitle!=null),j=B||R,G=!!(a.append||e.appendAvatar||e.appendIcon),_=!!(a.prepend||e.prependAvatar||e.prependIcon),z=!!(a.image||e.image),$=j||_||G,H=!!(a.text||e.text!=null);return Ye(g(P,{class:["v-card",{"v-card--disabled":e.disabled,"v-card--flat":e.flat,"v-card--hover":e.hover&&!(e.disabled||e.flat),"v-card--link":m.value},l.value,o.value,s.value,i.value,f.value,y.value,v.value,S.value,u.value,e.class],style:[r.value,c.value,b.value,e.style],href:I.href.value,onClick:m.value&&I.navigate,tabindex:e.disabled?-1:void 0},{default:()=>{var w;return[z&&g("div",{key:"image",class:"v-card__image"},[a.image?g(Q,{key:"image-defaults",disabled:!e.image,defaults:{VImg:{cover:!0,src:e.image}}},a.image):g(qe,{key:"image-img",cover:!0,src:e.image},null)]),g(se,{name:"v-card",active:!!e.loading,color:typeof e.loading=="boolean"?void 0:e.loading},{default:a.loader}),$&&g(dt,{key:"item",prependAvatar:e.prependAvatar,prependIcon:e.prependIcon,title:e.title,subtitle:e.subtitle,appendAvatar:e.appendAvatar,appendIcon:e.appendIcon},{default:a.item,prepend:a.prepend,title:a.title,subtitle:a.subtitle,append:a.append}),H&&g(ft,{key:"text"},{default:()=>{var F;return[((F=a.text)==null?void 0:F.call(a))??e.text]}}),(w=a.default)==null?void 0:w.call(a),a.actions&&g(rt,null,{default:a.actions}),et(m.value,"v-card")]}}),[[Ze("ripple"),m.value&&e.ripple]])}),{}}}),vt=k({expandOnClick:Boolean,showExpand:Boolean,expanded:{type:Array,default:()=>[]}},"DataTable-expand"),oe=Symbol.for("vuetify:datatable:expanded");function gt(e){const n=K(e,"expandOnClick"),t=p(e,"expanded",e.expanded,r=>new Set(r),r=>[...r.values()]);function a(r,u){const i=new Set(t.value);u?i.add(r.value):i.delete(r.value),t.value=i}function l(r){return t.value.has(r.value)}function o(r){a(r,!l(r))}const s={expand:a,expanded:t,expandOnClick:n,isExpanded:l,toggleExpand:o};return M(oe,s),s}function $t(){const e=O(oe);if(!e)throw new Error("foo");return e}const yt=k({groupBy:{type:Array,default:()=>[]}},"DataTable-group"),fe=Symbol.for("vuetify:data-table-group");function Ht(e){return{groupBy:p(e,"groupBy")}}function bt(e){const{disableSort:n,groupBy:t,sortBy:a}=e,l=U(new Set),o=h(()=>t.value.map(c=>({...c,order:c.order??!1})).concat(n!=null&&n.value?[]:a.value));function s(c){return l.value.has(c.id)}function r(c){const f=new Set(l.value);s(c)?f.delete(c.id):f.add(c.id),l.value=f}function u(c){function f(y){const b=[];for(const v of y.items)"type"in v&&v.type==="group"?b.push(...f(v)):b.push(v);return b}return f({type:"group",items:c,id:"dummy",key:"dummy",value:"dummy",depth:0})}const i={sortByWithGroups:o,toggleGroup:r,opened:l,groupBy:t,extractRows:u,isGroupOpen:s};return M(fe,i),i}function Wt(){const e=O(fe);if(!e)throw new Error("Missing group!");return e}function St(e,n){if(!e.length)return[];const t=new Map;for(const a of e){const l=X(a.raw,n);t.has(l)||t.set(l,[]),t.get(l).push(a)}return t}function me(e,n){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:0,a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:"root";if(!n.length)return[];const l=St(e,n[0]),o=[],s=n.slice(1);return l.forEach((r,u)=>{const i=n[0],c=`${a}_${i}_${u}`;o.push({depth:t,id:c,key:i,value:u,items:s.length?me(r,s,t+1,c):r,type:"group"})}),o}function ve(e,n){const t=[];for(const a of e)"type"in a&&a.type==="group"?(a.value!=null&&t.push(a),(n.has(a.id)||a.value==null)&&t.push(...ve(a.items,n))):t.push(a);return t}function ht(e,n,t){return{flatItems:h(()=>{if(!n.value.length)return e.value;const l=me(e.value,n.value.map(o=>o.key));return ve(l,t.value)})}}function It(e){let{page:n,itemsPerPage:t,sortBy:a,groupBy:l,search:o}=e;const s=ue("VDataTable"),r=h(()=>({page:n.value,itemsPerPage:t.value,sortBy:a.value,groupBy:l.value,search:o.value}));let u=null;ce(r,()=>{ie(u,r.value)||(u&&u.search!==r.value.search&&(n.value=1),s.emit("update:options",r.value),u=r.value)},{deep:!0,immediate:!0})}const Pt=k({page:{type:[Number,String],default:1},itemsPerPage:{type:[Number,String],default:10}},"DataTable-paginate"),ge=Symbol.for("vuetify:data-table-pagination");function kt(e){const n=p(e,"page",void 0,a=>+(a??1)),t=p(e,"itemsPerPage",void 0,a=>+(a??10));return{page:n,itemsPerPage:t}}function pt(e){const{page:n,itemsPerPage:t,itemsLength:a}=e,l=h(()=>t.value===-1?0:t.value*(n.value-1)),o=h(()=>t.value===-1?a.value:Math.min(a.value,l.value+t.value)),s=h(()=>t.value===-1||a.value===0?1:Math.ceil(a.value/t.value));de(()=>{n.value>s.value&&(n.value=s.value)});function r(y){t.value=y,n.value=1}function u(){n.value=J(n.value+1,1,s.value)}function i(){n.value=J(n.value-1,1,s.value)}function c(y){n.value=J(y,1,s.value)}const f={page:n,itemsPerPage:t,startIndex:l,stopIndex:o,pageCount:s,itemsLength:a,nextPage:u,prevPage:i,setPage:c,setItemsPerPage:r};return M(ge,f),f}function Jt(){const e=O(ge);if(!e)throw new Error("Missing pagination!");return e}function wt(e){const n=ue("usePaginatedItems"),{items:t,startIndex:a,stopIndex:l,itemsPerPage:o}=e,s=h(()=>o.value<=0?t.value:t.value.slice(a.value,l.value));return ce(s,r=>{n.emit("update:currentItems",r)}),{paginatedItems:s}}const xt={showSelectAll:!1,allSelected:()=>[],select:e=>{var a;let{items:n,value:t}=e;return new Set(t?[(a=n[0])==null?void 0:a.value]:[])},selectAll:e=>{let{selected:n}=e;return n}},ye={showSelectAll:!0,allSelected:e=>{let{currentPage:n}=e;return n},select:e=>{let{items:n,value:t,selected:a}=e;for(const l of n)t?a.add(l.value):a.delete(l.value);return a},selectAll:e=>{let{value:n,currentPage:t,selected:a}=e;return ye.select({items:t,value:n,selected:a})}},be={showSelectAll:!0,allSelected:e=>{let{allItems:n}=e;return n},select:e=>{let{items:n,value:t,selected:a}=e;for(const l of n)t?a.add(l.value):a.delete(l.value);return a},selectAll:e=>{let{value:n,allItems:t,selected:a}=e;return be.select({items:t,value:n,selected:a})}},Vt=k({showSelect:Boolean,selectStrategy:{type:[String,Object],default:"page"},modelValue:{type:Array,default:()=>[]},valueComparator:{type:Function,default:ie}},"DataTable-select"),Se=Symbol.for("vuetify:data-table-selection");function Ct(e,n){let{allItems:t,currentPage:a}=n;const l=p(e,"modelValue",e.modelValue,d=>new Set(T(d).map(m=>{var P;return((P=t.value.find(B=>e.valueComparator(m,B.value)))==null?void 0:P.value)??m})),d=>[...d.values()]),o=h(()=>t.value.filter(d=>d.selectable)),s=h(()=>a.value.filter(d=>d.selectable)),r=h(()=>{if(typeof e.selectStrategy=="object")return e.selectStrategy;switch(e.selectStrategy){case"single":return xt;case"all":return be;case"page":default:return ye}});function u(d){return T(d).every(m=>l.value.has(m.value))}function i(d){return T(d).some(m=>l.value.has(m.value))}function c(d,m){const P=r.value.select({items:d,value:m,selected:new Set(l.value)});l.value=P}function f(d){c([d],!u([d]))}function y(d){const m=r.value.selectAll({value:d,allItems:o.value,currentPage:s.value,selected:new Set(l.value)});l.value=m}const b=h(()=>l.value.size>0),v=h(()=>{const d=r.value.allSelected({allItems:o.value,currentPage:s.value});return!!d.length&&u(d)}),S=h(()=>r.value.showSelectAll),I={toggleSelect:f,select:c,selectAll:y,isSelected:u,isSomeSelected:i,someSelected:b,allSelected:v,showSelectAll:S};return M(Se,I),I}function Qt(){const e=O(Se);if(!e)throw new Error("Missing selection!");return e}const At=k({sortBy:{type:Array,default:()=>[]},customKeySort:Object,multiSort:Boolean,mustSort:Boolean},"DataTable-sort"),he=Symbol.for("vuetify:data-table-sort");function Bt(e){const n=p(e,"sortBy"),t=K(e,"mustSort"),a=K(e,"multiSort");return{sortBy:n,mustSort:t,multiSort:a}}function Ft(e){const{sortBy:n,mustSort:t,multiSort:a,page:l}=e,o=u=>{if(u.key==null)return;let i=n.value.map(f=>({...f}))??[];const c=i.find(f=>f.key===u.key);c?c.order==="desc"?t.value?c.order="asc":i=i.filter(f=>f.key!==u.key):c.order="desc":a.value?i=[...i,{key:u.key,order:"asc"}]:i=[{key:u.key,order:"asc"}],n.value=i,l&&(l.value=1)};function s(u){return!!n.value.find(i=>i.key===u.key)}const r={sortBy:n,toggleSort:o,isSorted:s};return M(he,r),r}function Ut(){const e=O(he);if(!e)throw new Error("Missing sort!");return e}function Dt(e,n,t,a){const l=tt();return{sortedItems:h(()=>{var s,r;return t.value.length?Tt(n.value,t.value,l.current.value,{transform:a==null?void 0:a.transform,sortFunctions:{...e.customKeySort,...(s=a==null?void 0:a.sortFunctions)==null?void 0:s.value},sortRawFunctions:(r=a==null?void 0:a.sortRawFunctions)==null?void 0:r.value}):n.value})}}function Tt(e,n,t,a){const l=new Intl.Collator(t,{sensitivity:"accent",usage:"sort"});return e.map(s=>[s,a!=null&&a.transform?a.transform(s):s]).sort((s,r)=>{var u,i;for(let c=0;c<n.length;c++){let f=!1;const y=n[c].key,b=n[c].order??"asc";if(b===!1)continue;let v=X(s[1],y),S=X(r[1],y),I=s[0].raw,d=r[0].raw;if(b==="desc"&&([v,S]=[S,v],[I,d]=[d,I]),(u=a==null?void 0:a.sortRawFunctions)!=null&&u[y]){const m=a.sortRawFunctions[y](I,d);if(m==null)continue;if(f=!0,m)return m}if((i=a==null?void 0:a.sortFunctions)!=null&&i[y]){const m=a.sortFunctions[y](v,S);if(m==null)continue;if(f=!0,m)return m}if(!f){if(v instanceof Date&&S instanceof Date)return v.getTime()-S.getTime();if([v,S]=[v,S].map(m=>m!=null?m.toString().toLocaleLowerCase():m),v!==S)return E(v)&&E(S)?0:E(v)?-1:E(S)?1:!isNaN(v)&&!isNaN(S)?Number(v)-Number(S):l.compare(v,S)}}return 0}).map(s=>{let[r]=s;return r})}const Mt=k({items:{type:Array,default:()=>[]},itemValue:{type:[String,Array,Function],default:"id"},itemSelectable:{type:[String,Array,Function],default:null},returnObject:Boolean},"DataIterator-items");function Ot(e,n){const t=e.returnObject?n:Y(n,e.itemValue),a=Y(n,e.itemSelectable,!0);return{type:"item",value:t,selectable:a,raw:n}}function Et(e,n){const t=[];for(const a of n)t.push(Ot(e,a));return t}function Lt(e){return{items:h(()=>Et(e,e.items))}}const Kt=(e,n,t)=>e==null||n==null?-1:e.toString().toLocaleLowerCase().indexOf(n.toString().toLocaleLowerCase()),Nt=k({customFilter:Function,customKeyFilter:Object,filterKeys:[Array,String],filterMode:{type:String,default:"intersection"},noFilter:Boolean},"filter");function Rt(e,n,t){var r;const a=[],l=(t==null?void 0:t.default)??Kt,o=t!=null&&t.filterKeys?T(t.filterKeys):!1,s=Object.keys((t==null?void 0:t.customKeyFilter)??{}).length;if(!(e!=null&&e.length))return a;e:for(let u=0;u<e.length;u++){const[i,c=i]=T(e[u]),f={},y={};let b=-1;if((n||s>0)&&!(t!=null&&t.noFilter)){if(typeof i=="object"){const I=o||Object.keys(c);for(const d of I){const m=Y(c,d),P=(r=t==null?void 0:t.customKeyFilter)==null?void 0:r[d];if(b=P?P(m,n,i):l(m,n,i),b!==-1&&b!==!1)P?f[d]=b:y[d]=b;else if((t==null?void 0:t.filterMode)==="every")continue e}}else b=l(i,n,i),b!==-1&&b!==!1&&(y.title=b);const v=Object.keys(y).length,S=Object.keys(f).length;if(!v&&!S||(t==null?void 0:t.filterMode)==="union"&&S!==s&&!v||(t==null?void 0:t.filterMode)==="intersection"&&(S!==s||!v))continue}a.push({index:u,matches:{...y,...f}})}return a}function jt(e,n,t,a){const l=U([]),o=U(new Map),s=h(()=>a!=null&&a.transform?D(n).map(u=>[u,a.transform(u)]):D(n));de(()=>{const u=typeof t=="function"?t():D(t),i=typeof u!="string"&&typeof u!="number"?"":String(u),c=Rt(s.value,i,{customKeyFilter:{...e.customKeyFilter,...D(a==null?void 0:a.customKeyFilter)},default:e.customFilter,filterKeys:e.filterKeys,filterMode:e.filterMode,noFilter:e.noFilter}),f=D(n),y=[],b=new Map;c.forEach(v=>{let{index:S,matches:I}=v;const d=f[S];y.push(d),b.set(d.value,I)}),l.value=y,o.value=b});function r(u){return o.value.get(u.value)}return{filteredItems:l,filteredMatches:o,getMatches:r}}const Gt=k({search:String,loading:Boolean,...C(),...Mt(),...Vt(),...At(),...Pt({itemsPerPage:5}),...vt(),...yt(),...Nt(),...N(),...at({transition:{component:nt,hideOnLeave:!0}})},"VDataIterator"),Xt=V()({name:"VDataIterator",props:Gt(),emits:{"update:modelValue":e=>!0,"update:groupBy":e=>!0,"update:page":e=>!0,"update:itemsPerPage":e=>!0,"update:sortBy":e=>!0,"update:options":e=>!0,"update:expanded":e=>!0,"update:currentItems":e=>!0},setup(e,n){let{slots:t}=n;const a=p(e,"groupBy"),l=K(e,"search"),{items:o}=Lt(e),{filteredItems:s}=jt(e,o,l,{transform:x=>x.raw}),{sortBy:r,multiSort:u,mustSort:i}=Bt(e),{page:c,itemsPerPage:f}=kt(e),{toggleSort:y}=Ft({sortBy:r,multiSort:u,mustSort:i,page:c}),{sortByWithGroups:b,opened:v,extractRows:S,isGroupOpen:I,toggleGroup:d}=bt({groupBy:a,sortBy:r}),{sortedItems:m}=Dt(e,s,b,{transform:x=>x.raw}),{flatItems:P}=ht(m,a,v),B=h(()=>P.value.length),{startIndex:R,stopIndex:j,pageCount:G,prevPage:_,nextPage:z,setItemsPerPage:$,setPage:H}=pt({page:c,itemsPerPage:f,itemsLength:B}),{paginatedItems:w}=wt({items:P,startIndex:R,stopIndex:j,itemsPerPage:f}),F=h(()=>S(w.value)),{isSelected:Ie,select:Pe,selectAll:ke,toggleSelect:pe}=Ct(e,{allItems:o,currentPage:F}),{isExpanded:we,toggleExpand:xe}=gt(e);It({page:c,itemsPerPage:f,sortBy:r,groupBy:a,search:l});const W=h(()=>({page:c.value,itemsPerPage:f.value,sortBy:r.value,pageCount:G.value,toggleSort:y,prevPage:_,nextPage:z,setPage:H,setItemsPerPage:$,isSelected:Ie,select:Pe,selectAll:ke,toggleSelect:pe,isExpanded:we,toggleExpand:xe,isGroupOpen:I,toggleGroup:d,items:F.value,groupedItems:w.value}));return A(()=>g(e.tag,{class:["v-data-iterator",{"v-data-iterator--loading":e.loading},e.class],style:e.style},{default:()=>{var x,Z;return[(x=t.header)==null?void 0:x.call(t,W.value),g(lt,{transition:e.transition},{default:()=>{var q,ee;return[e.loading?g(se,{key:"loader",name:"v-data-iterator",active:!0},{default:Ve=>{var te;return(te=t.loader)==null?void 0:te.call(t,Ve)}}):g("div",{key:"items"},[w.value.length?(ee=t.default)==null?void 0:ee.call(t,W.value):(q=t["no-data"])==null?void 0:q.call(t)])]}}),(Z=t.footer)==null?void 0:Z.call(t,W.value)]}})),{}}});export{ft as A,ut as B,rt as C,zt as V,Xt as a,Ut as b,Qt as c,Wt as d,$t as e,yt as f,Vt as g,At as h,Pt as i,Nt as j,Ht as k,Bt as l,vt as m,kt as n,jt as o,Ft as p,bt as q,Dt as r,ht as s,pt as t,Jt as u,wt as v,Ct as w,gt as x,It as y,ct as z};
