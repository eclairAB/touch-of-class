import{M as U,ac as B,ae as X,aV as ge,aj as Q,bA as ue,O as Z,an as Se,ap as Ce,bf as re,aq as F,j as k,as as ee,bB as xe,R as le,H as Ie,T as de,z as i,bC as te,aN as _,Z as Ve,bx as Pe,ak as ve,al as fe,ao as pe,ar as ze,au as W,W as he,a_ as ae,ad as Ae,af as _e,ag as Ee,bi as Re,ah as we,bD as Te,ai as Fe,by as Be,am as Ge,bt as Oe,bE as Me,bp as De,bu as We,bv as He,bF as Le,P as qe,bk as $e,bG as Ke,bg as ne,bh as Ne,bH as je,bI as Ue,X as H,bn as Xe,a6 as se,aM as ie}from"./CuAf4GPC.js";function Qe(e){let{selectedElement:n,containerElement:a,isRtl:u,isHorizontal:o}=e;const b=G(o,a),c=be(o,u,a),y=G(o,n),v=ye(o,n),m=y*.4;return c>v?v-m:c+b<v+y?v-b+y+m:c}function Ze(e){let{selectedElement:n,containerElement:a,isHorizontal:u}=e;const o=G(u,a),b=ye(u,n),c=G(u,n);return b-o/2+c/2}function oe(e,n){const a=e?"scrollWidth":"scrollHeight";return(n==null?void 0:n[a])||0}function Je(e,n){const a=e?"clientWidth":"clientHeight";return(n==null?void 0:n[a])||0}function be(e,n,a){if(!a)return 0;const{scrollLeft:u,offsetWidth:o,scrollWidth:b}=a;return e?n?b-o+u:u:a.scrollTop}function G(e,n){const a=e?"offsetWidth":"offsetHeight";return(n==null?void 0:n[a])||0}function ye(e,n){const a=e?"offsetLeft":"offsetTop";return(n==null?void 0:n[a])||0}const Ye=Symbol.for("vuetify:v-slide-group"),ke=U({centerActive:Boolean,direction:{type:String,default:"horizontal"},symbol:{type:null,default:Ye},nextIcon:{type:B,default:"$next"},prevIcon:{type:B,default:"$prev"},showArrows:{type:[Boolean,String],validator:e=>typeof e=="boolean"||["always","desktop","mobile"].includes(e)},...X(),...ge({mobile:null}),...Q(),...ue({selectedClass:"v-slide-group-item--active"})},"VSlideGroup"),ce=Z()({name:"VSlideGroup",props:ke(),emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:a}=n;const{isRtl:u}=Se(),{displayClasses:o,mobile:b}=Ce(e),c=re(e,e.symbol),y=F(!1),v=F(0),m=F(0),x=F(0),d=k(()=>e.direction==="horizontal"),{resizeRef:f,contentRect:E}=ee(),{resizeRef:p,contentRect:V}=ee(),s=xe(),g=k(()=>({container:f.el,duration:200,easing:"easeOutQuart"})),L=k(()=>c.selected.value.length?c.items.value.findIndex(l=>l.id===c.selected.value[0]):-1),S=k(()=>c.selected.value.length?c.items.value.findIndex(l=>l.id===c.selected.value[c.selected.value.length-1]):-1);if(le){let l=-1;Ie(()=>[c.selected.value,E.value,V.value,d.value],()=>{cancelAnimationFrame(l),l=requestAnimationFrame(()=>{if(E.value&&V.value){const t=d.value?"width":"height";m.value=E.value[t],x.value=V.value[t],y.value=m.value+1<x.value}if(L.value>=0&&p.el){const t=p.el.children[S.value];R(t,e.centerActive)}})})}const P=F(!1);function R(l,t){let r=0;t?r=Ze({containerElement:f.el,isHorizontal:d.value,selectedElement:l}):r=Qe({containerElement:f.el,isHorizontal:d.value,isRtl:u.value,selectedElement:l}),O(r)}function O(l){if(!le||!f.el)return;const t=G(d.value,f.el),r=be(d.value,u.value,f.el);if(!(oe(d.value,f.el)<=t||Math.abs(l-r)<16)){if(d.value&&u.value&&f.el){const{scrollWidth:D,offsetWidth:j}=f.el;l=D-j-l}d.value?s.horizontal(l,g.value):s(l,g.value)}}function h(l){const{scrollTop:t,scrollLeft:r}=l.target;v.value=d.value?r:t}function I(l){if(P.value=!0,!(!y.value||!p.el)){for(const t of l.composedPath())for(const r of p.el.children)if(r===t){R(r);return}}}function q(l){P.value=!1}let w=!1;function M(l){var t;!w&&!P.value&&!(l.relatedTarget&&((t=p.el)!=null&&t.contains(l.relatedTarget)))&&C(),w=!1}function T(){w=!0}function $(l){if(!p.el)return;function t(r){l.preventDefault(),C(r)}d.value?l.key==="ArrowRight"?t(u.value?"prev":"next"):l.key==="ArrowLeft"&&t(u.value?"next":"prev"):l.key==="ArrowDown"?t("next"):l.key==="ArrowUp"&&t("prev"),l.key==="Home"?t("first"):l.key==="End"&&t("last")}function C(l){var r,A;if(!p.el)return;let t;if(!l)t=Ve(p.el)[0];else if(l==="next"){if(t=(r=p.el.querySelector(":focus"))==null?void 0:r.nextElementSibling,!t)return C("first")}else if(l==="prev"){if(t=(A=p.el.querySelector(":focus"))==null?void 0:A.previousElementSibling,!t)return C("last")}else l==="first"?t=p.el.firstElementChild:l==="last"&&(t=p.el.lastElementChild);t&&t.focus({preventScroll:!0})}function z(l){const t=d.value&&u.value?-1:1,r=(l==="prev"?-t:t)*m.value;let A=v.value+r;if(d.value&&u.value&&f.el){const{scrollWidth:D,offsetWidth:j}=f.el;A+=D-j}O(A)}const K=k(()=>({next:c.next,prev:c.prev,select:c.select,isSelected:c.isSelected})),N=k(()=>{switch(e.showArrows){case"always":return!0;case"desktop":return!b.value;case!0:return y.value||Math.abs(v.value)>0;case"mobile":return b.value||y.value||Math.abs(v.value)>0;default:return!b.value&&(y.value||Math.abs(v.value)>0)}}),J=k(()=>Math.abs(v.value)>1),Y=k(()=>{if(!f.value)return!1;const l=oe(d.value,f.el),t=Je(d.value,f.el);return l-t-Math.abs(v.value)>1});return de(()=>i(e.tag,{class:["v-slide-group",{"v-slide-group--vertical":!d.value,"v-slide-group--has-affixes":N.value,"v-slide-group--is-overflowing":y.value},o.value,e.class],style:e.style,tabindex:P.value||c.selected.value.length?-1:0,onFocus:M},{default:()=>{var l,t,r;return[N.value&&i("div",{key:"prev",class:["v-slide-group__prev",{"v-slide-group__prev--disabled":!J.value}],onMousedown:T,onClick:()=>J.value&&z("prev")},[((l=a.prev)==null?void 0:l.call(a,K.value))??i(te,null,{default:()=>[i(_,{icon:u.value?e.nextIcon:e.prevIcon},null)]})]),i("div",{key:"container",ref:f,class:"v-slide-group__container",onScroll:h},[i("div",{ref:p,class:"v-slide-group__content",onFocusin:I,onFocusout:q,onKeydown:$},[(t=a.default)==null?void 0:t.call(a,K.value)])]),N.value&&i("div",{key:"next",class:["v-slide-group__next",{"v-slide-group__next--disabled":!Y.value}],onMousedown:T,onClick:()=>Y.value&&z("next")},[((r=a.next)==null?void 0:r.call(a,K.value))??i(te,null,{default:()=>[i(_,{icon:u.value?e.prevIcon:e.nextIcon},null)]})])]}})),{selected:c.selected,scrollTo:z,scrollOffset:v,focus:C}}}),me=Symbol.for("vuetify:v-chip-group"),el=U({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:Pe},...ke(),...X(),...ue({selectedClass:"v-chip--selected"}),...Q(),...ve(),...fe({variant:"tonal"})},"VChipGroup");Z()({name:"VChipGroup",props:el(),emits:{"update:modelValue":e=>!0},setup(e,n){let{slots:a}=n;const{themeClasses:u}=pe(e),{isSelected:o,select:b,next:c,prev:y,selected:v}=re(e,me);return ze({VChip:{color:W(e,"color"),disabled:W(e,"disabled"),filter:W(e,"filter"),variant:W(e,"variant")}}),de(()=>{const m=ce.filterProps(e);return i(ce,he(m,{class:["v-chip-group",{"v-chip-group--column":e.column},u.value,e.class],style:e.style}),{default:()=>{var x;return[(x=a.default)==null?void 0:x.call(a,{isSelected:o,select:b,next:c,prev:y,selected:v.value})]}})}),{}}});const ll=U({activeClass:String,appendAvatar:String,appendIcon:B,closable:Boolean,closeIcon:{type:B,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:B,ripple:{type:[Boolean,Object],default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:ae(),onClickOnce:ae(),...Ae(),...X(),..._e(),...Ee(),...Re(),...we(),...Te(),...Fe(),...Q({tag:"span"}),...ve(),...fe({variant:"tonal"})},"VChip"),al=Z()({name:"VChip",directives:{Ripple:Be},props:ll(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,n){let{attrs:a,emit:u,slots:o}=n;const{t:b}=Ge(),{borderClasses:c}=Oe(e),{colorClasses:y,colorStyles:v,variantClasses:m}=Me(e),{densityClasses:x}=De(e),{elevationClasses:d}=We(e),{roundedClasses:f}=He(e),{sizeClasses:E}=Le(e),{themeClasses:p}=pe(e),V=qe(e,"modelValue"),s=$e(e,me,!1),g=Ke(e,a),L=k(()=>e.link!==!1&&g.isLink.value),S=k(()=>!e.disabled&&e.link!==!1&&(!!s||e.link||g.isClickable.value)),P=k(()=>({"aria-label":b(e.closeLabel),onClick(h){h.preventDefault(),h.stopPropagation(),V.value=!1,u("click:close",h)}}));function R(h){var I;u("click",h),S.value&&((I=g.navigate)==null||I.call(g,h),s==null||s.toggle())}function O(h){(h.key==="Enter"||h.key===" ")&&(h.preventDefault(),R(h))}return()=>{const h=g.isLink.value?"a":e.tag,I=!!(e.appendIcon||e.appendAvatar),q=!!(I||o.append),w=!!(o.close||e.closable),M=!!(o.filter||e.filter)&&s,T=!!(e.prependIcon||e.prependAvatar),$=!!(T||o.prepend),C=!s||s.isSelected.value;return V.value&&ne(i(h,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":S.value,"v-chip--filter":M,"v-chip--pill":e.pill},p.value,c.value,C?y.value:void 0,x.value,d.value,f.value,E.value,m.value,s==null?void 0:s.selectedClass.value,e.class],style:[C?v.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:g.href.value,tabindex:S.value?0:void 0,onClick:R,onKeydown:S.value&&!L.value&&O},{default:()=>{var z;return[je(S.value,"v-chip"),M&&i(Ue,{key:"filter"},{default:()=>[ne(i("div",{class:"v-chip__filter"},[o.filter?i(H,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},o.filter):i(_,{key:"filter-icon",icon:e.filterIcon},null)]),[[Xe,s.isSelected.value]])]}),$&&i("div",{key:"prepend",class:"v-chip__prepend"},[o.prepend?i(H,{key:"prepend-defaults",disabled:!T,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},o.prepend):i(se,null,[e.prependIcon&&i(_,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&i(ie,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),i("div",{class:"v-chip__content","data-no-activator":""},[((z=o.default)==null?void 0:z.call(o,{isSelected:s==null?void 0:s.isSelected.value,selectedClass:s==null?void 0:s.selectedClass.value,select:s==null?void 0:s.select,toggle:s==null?void 0:s.toggle,value:s==null?void 0:s.value.value,disabled:e.disabled}))??e.text]),q&&i("div",{key:"append",class:"v-chip__append"},[o.append?i(H,{key:"append-defaults",disabled:!I,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},o.append):i(se,null,[e.appendIcon&&i(_,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&i(ie,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),w&&i("button",he({key:"close",class:"v-chip__close",type:"button"},P.value),[o.close?i(H,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},o.close):i(_,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[Ne("ripple"),S.value&&e.ripple,null]])}}});export{al as V,ce as a,ke as m};
