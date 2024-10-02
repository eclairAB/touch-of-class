import{_ as Ke}from"./CZrufNRg.js";import{X as je,aQ as ze,bA as He,b3 as Ge,bB as qe,bt as We,Y as Ye,aq as Je,r as P,au as q,ap as _e,j as F,bC as Qe,b5 as Xe,by as Ze,bD as el,bE as W,H as Y,aR as ll,bF as tl,ay as Ve,bG as al,a2 as nl,R as oe,z as a,T as L,bH as ol,a3 as j,bI as ul,W as xe,bJ as sl,aK as il,bK as rl,aL as be,bL as cl,aa as Ae,aY as dl,B as Q,bM as ml,b6 as vl,bN as fl,a as pl,b1 as De,L as bl,i as hl,t as S,v as E,A as v,bO as ke,a8 as Ce,M as u,O as we,V as te,N as ae,P as ne,U as fe,x as y,y as R,a4 as yl}from"./CxCi84D5.js";import{u as gl}from"./KKXyQTFi.js";import{V as _l,a as Se}from"./B_-zNqXP.js";import{V as z,a as X}from"./Dd-OUGDu.js";import{V as J}from"./CNL2HLNc.js";import{V as Vl}from"./BJCQHK0s.js";import"./DugkJYux.js";function xl(e,h,U){if(h==null)return e;if(Array.isArray(h))throw new Error("Multiple matches is not implemented");return typeof h=="number"&&~h?a(L,null,[a("span",{class:"v-combobox__unmask"},[e.substr(0,h)]),a("span",{class:"v-combobox__mask"},[e.substr(h,U)]),a("span",{class:"v-combobox__unmask"},[e.substr(h+U)])]):e}const kl=je({autoSelectFirst:{type:[Boolean,String]},clearOnSelect:{type:Boolean,default:!0},delimiters:Array,...ze({filterKeys:["title"]}),...He({hideNoData:!0,returnObject:!0}),...Ge(qe({modelValue:null,role:"combobox"}),["validationValue","dirty","appendInnerIcon"]),...We({transition:!1})},"VCombobox"),pe=Ye()({name:"VCombobox",props:kl(),emits:{"update:focused":e=>!0,"update:modelValue":e=>!0,"update:search":e=>!0,"update:menu":e=>!0},setup(e,h){var he;let{emit:U,slots:c}=h;const{t:x}=Je(),A=P(),k=q(!1),D=q(!0),O=q(!1),n=P(),$=P(),C=_e(e,"menu"),m=F({get:()=>C.value,set:l=>{var r;C.value&&!l&&((r=n.value)!=null&&r.ΨopenChildren)||(C.value=l)}}),f=q(-1);let H=!1;const ue=F(()=>{var l;return(l=A.value)==null?void 0:l.color}),G=F(()=>m.value?e.closeText:e.openText),{items:se,transformIn:ie,transformOut:re}=Qe(e),{textColorClasses:ce,textColorStyles:o}=Xe(ue),t=_e(e,"modelValue",[],l=>ie(Ze(l)),l=>{const r=re(l);return e.multiple?r:r[0]??null}),T=el(),K=F(()=>!!(e.chips||c.chip)),s=F(()=>K.value||!!c.selection),g=q(!e.multiple&&!s.value?((he=t.value[0])==null?void 0:he.title)??"":""),b=F({get:()=>g.value,set:l=>{var r;if(g.value=l??"",!e.multiple&&!s.value&&(t.value=[W(e,l)]),l&&e.multiple&&((r=e.delimiters)!=null&&r.length)){const p=l.split(new RegExp(`(?:${e.delimiters.join("|")})+`));p.length>1&&(p.forEach(i=>{i=i.trim(),i&&I(W(e,i))}),g.value="")}l||(f.value=-1),D.value=!l}}),Fe=F(()=>typeof e.counterValue=="function"?e.counterValue(t.value):typeof e.counterValue=="number"?e.counterValue:e.multiple?t.value.length:b.value.length);Y(g,l=>{H?Ve(()=>H=!1):k.value&&!m.value&&(m.value=!0),U("update:search",l)}),Y(t,l=>{var r;!e.multiple&&!s.value&&(g.value=((r=l[0])==null?void 0:r.title)??"")});const{filteredItems:Z,getMatches:Pe}=ll(e,se,()=>D.value?"":b.value),N=F(()=>e.hideSelected?Z.value.filter(l=>!t.value.some(r=>r.value===l.value)):Z.value),Ie=F(()=>t.value.map(l=>l.value)),de=F(()=>{var r;return(e.autoSelectFirst===!0||e.autoSelectFirst==="exact"&&b.value===((r=N.value[0])==null?void 0:r.title))&&N.value.length>0&&!D.value&&!O.value}),me=F(()=>e.hideNoData&&!N.value.length||e.readonly||(T==null?void 0:T.isReadonly.value)),ve=P(),{onListScroll:Re,onListKeydown:Te}=tl(ve,A);function Ne(l){H=!0,e.openOnClear&&(m.value=!0)}function Ee(){me.value||(m.value=!0)}function Ue(l){me.value||(k.value&&(l.preventDefault(),l.stopPropagation()),m.value=!m.value)}function Be(l){var i;if(fl(l)||e.readonly||T!=null&&T.isReadonly.value)return;const r=A.value.selectionStart,p=t.value.length;if((f.value>-1||["Enter","ArrowDown","ArrowUp"].includes(l.key))&&l.preventDefault(),["Enter","ArrowDown"].includes(l.key)&&(m.value=!0),["Escape"].includes(l.key)&&(m.value=!1),["Enter","Escape","Tab"].includes(l.key)&&(de.value&&["Enter","Tab"].includes(l.key)&&!t.value.some(d=>{let{value:w}=d;return w===N.value[0].value})&&I(Z.value[0]),D.value=!0),l.key==="ArrowDown"&&de.value&&((i=ve.value)==null||i.focus("next")),l.key==="Enter"&&b.value&&(I(W(e,b.value)),s.value&&(g.value="")),["Backspace","Delete"].includes(l.key)){if(!e.multiple&&s.value&&t.value.length>0&&!b.value)return I(t.value[0],!1);if(~f.value){const d=f.value;I(t.value[f.value],!1),f.value=d>=p-1?p-2:d}else l.key==="Backspace"&&!b.value&&(f.value=p-1)}if(e.multiple){if(l.key==="ArrowLeft"){if(f.value<0&&r>0)return;const d=f.value>-1?f.value-1:p-1;t.value[d]?f.value=d:(f.value=-1,A.value.setSelectionRange(b.value.length,b.value.length))}if(l.key==="ArrowRight"){if(f.value<0)return;const d=f.value+1;t.value[d]?f.value=d:(f.value=-1,A.value.setSelectionRange(0,0))}}}function Me(){var l;k.value&&(D.value=!0,(l=A.value)==null||l.focus())}function I(l){let r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;if(!(!l||l.props.disabled))if(e.multiple){const p=t.value.findIndex(d=>e.valueComparator(d.value,l.value)),i=r??!~p;if(~p){const d=i?[...t.value,l]:[...t.value];d.splice(p,1),t.value=d}else i&&(t.value=[...t.value,l]);e.clearOnSelect&&(b.value="")}else{const p=r!==!1;t.value=p?[l]:[],g.value=p&&!s.value?l.title:"",Ve(()=>{m.value=!1,D.value=!0})}}function Le(l){k.value=!0,setTimeout(()=>{O.value=!0})}function Oe(l){O.value=!1}function $e(l){(l==null||l===""&&!e.multiple&&!s.value)&&(t.value=[])}return Y(k,(l,r)=>{if(!(l||l===r)&&(f.value=-1,m.value=!1,b.value)){if(e.multiple){I(W(e,b.value));return}if(!s.value)return;t.value.some(p=>{let{title:i}=p;return i===b.value})?g.value="":I(W(e,b.value))}}),Y(m,()=>{if(!e.hideSelected&&m.value&&t.value.length){const l=N.value.findIndex(r=>t.value.some(p=>e.valueComparator(p.value,r.value)));al&&window.requestAnimationFrame(()=>{var r;l>=0&&((r=$.value)==null||r.scrollToIndex(l))})}}),Y(()=>e.items,(l,r)=>{m.value||k.value&&!r.length&&l.length&&(m.value=!0)}),nl(()=>{const l=!!(!e.hideNoData||N.value.length||c["prepend-item"]||c["append-item"]||c["no-data"]),r=t.value.length>0,p=oe.filterProps(e);return a(oe,j({ref:A},p,{modelValue:b.value,"onUpdate:modelValue":[i=>b.value=i,$e],focused:k.value,"onUpdate:focused":i=>k.value=i,validationValue:t.externalValue,counterValue:Fe.value,dirty:r,class:["v-combobox",{"v-combobox--active-menu":m.value,"v-combobox--chips":!!e.chips,"v-combobox--selection-slot":!!s.value,"v-combobox--selecting-index":f.value>-1,[`v-combobox--${e.multiple?"multiple":"single"}`]:!0},e.class],style:e.style,readonly:e.readonly,placeholder:r?void 0:e.placeholder,"onClick:clear":Ne,"onMousedown:control":Ee,onKeydown:Be}),{...c,default:()=>a(L,null,[a(ol,j({ref:n,modelValue:m.value,"onUpdate:modelValue":i=>m.value=i,activator:"parent",contentClass:"v-combobox__content",disabled:me.value,eager:e.eager,maxHeight:310,openOnClick:!1,closeOnContentClick:!1,transition:e.transition,onAfterLeave:Me},e.menuProps),{default:()=>[l&&a(ul,j({ref:ve,selected:Ie.value,selectStrategy:e.multiple?"independent":"single-independent",onMousedown:i=>i.preventDefault(),onKeydown:Te,onFocusin:Le,onFocusout:Oe,onScrollPassive:Re,tabindex:"-1","aria-live":"polite",color:e.itemColor??e.color},e.listProps),{default:()=>{var i,d,w;return[(i=c["prepend-item"])==null?void 0:i.call(c),!N.value.length&&!e.hideNoData&&(((d=c["no-data"])==null?void 0:d.call(c))??a(xe,{title:x(e.noDataText)},null)),a(sl,{ref:$,renderless:!0,items:N.value},{default:B=>{var ge;let{item:_,index:M,itemRef:V}=B;const ye=j(_.props,{ref:V,key:M,active:de.value&&M===0?!0:void 0,onClick:()=>I(_,null)});return((ge=c.item)==null?void 0:ge.call(c,{item:_,index:M,props:ye}))??a(xe,j(ye,{role:"option"}),{prepend:ee=>{let{isSelected:le}=ee;return a(L,null,[e.multiple&&!e.hideSelected?a(il,{key:_.value,modelValue:le,ripple:!1,tabindex:"-1"},null):void 0,_.props.prependAvatar&&a(rl,{image:_.props.prependAvatar},null),_.props.prependIcon&&a(be,{icon:_.props.prependIcon},null)])},title:()=>{var ee,le;return D.value?_.title:xl(_.title,(ee=Pe(_))==null?void 0:ee.title,((le=b.value)==null?void 0:le.length)??0)}})}}),(w=c["append-item"])==null?void 0:w.call(c)]}})]}),t.value.map((i,d)=>{function w(V){V.stopPropagation(),V.preventDefault(),I(i,!1)}const B={"onClick:close":w,onKeydown(V){V.key!=="Enter"&&V.key!==" "||(V.preventDefault(),V.stopPropagation(),w(V))},onMousedown(V){V.preventDefault(),V.stopPropagation()},modelValue:!0,"onUpdate:modelValue":void 0},_=K.value?!!c.chip:!!c.selection,M=_?cl(K.value?c.chip({item:i,index:d,props:B}):c.selection({item:i,index:d})):void 0;if(!(_&&!M))return a("div",{key:i.value,class:["v-combobox__selection",d===f.value&&["v-combobox__selection--selected",ce.value]],style:d===f.value?o.value:{}},[K.value?c.chip?a(dl,{key:"chip-defaults",defaults:{VChip:{closable:e.closableChips,size:"small",text:i.title}}},{default:()=>[M]}):a(Ae,j({key:"chip",closable:e.closableChips,size:"small",text:i.title,disabled:i.props.disabled},B),null):M??a("span",{class:"v-combobox__selection-text"},[i.title,e.multiple&&d<t.value.length-1&&a("span",{class:"v-combobox__selection-comma"},[Q(",")])])])})]),"append-inner":function(){var B;for(var i=arguments.length,d=new Array(i),w=0;w<i;w++)d[w]=arguments[w];return a(L,null,[(B=c["append-inner"])==null?void 0:B.call(c,...d),(!e.hideNoData||e.items.length)&&e.menuIcon?a(be,{class:"v-combobox__menu-icon",icon:e.menuIcon,onMousedown:Ue,onClick:ml,"aria-label":x(G.value),title:x(G.value),tabindex:"-1"},null):void 0])}})}),vl({isFocused:k,isPristine:D,menu:m,search:b,selectionIndex:f,filteredItems:Z,select:I},A)}}),Cl={class:"d-flex ga-5"},wl=y("h3",null,"New Appointment",-1),Sl=y("h3",null,"Payment Information",-1),Al={class:"d-flex justify-end font-weight-bold"},Dl=y("span",null," Grand Total ",-1),Fl={class:"d-flex justify-end text-medium-emphasis"},Pl=y("span",null," Amount paid ",-1),Il={__name:"Appointments",setup(e){const{$api:h}=pl(),U=De(),c=gl(),x=bl(),A=P([]),k=P([]),D=P([]),O=P([]),n=P({}),$=P(!0);P(!1);const C=()=>{let o=0;return n.value.packages&&n.value.packages.forEach(t=>{o+=parseInt(t.price)}),n.value.combos&&n.value.combos.forEach(t=>{o+=parseInt(t.price)}),n.value.services&&n.value.services.forEach(t=>{o+=parseInt(t.price)}),o},m=o=>new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}).format(o),f=o=>{if(o.id)return`${o.first_name} ${o.last_name}`;n.value.client_id=""};function H(){c.setClient({dialog:!0})}function ue(){G()}const G=async()=>{try{const o=await h.get("/clients/");A.value=o.data}catch{x.setAlert({show:!0,color:"error",content:"Failed to fetch Clients."})}},se=async()=>{try{const o=await h.get("/packages/");k.value=o.data}catch{x.setAlert({show:!0,color:"error",content:"Failed to fetch Packages."})}},ie=async()=>{try{const o=await h.get("/combos/");D.value=o.data}catch{x.setAlert({show:!0,color:"error",content:"Failed to fetch Combos."})}},re=async()=>{try{const o=await h.get("/services/");O.value=o.data}catch{x.setAlert({show:!0,color:"error",content:"Failed to fetch Services."})}};G(),se(),ie(),re();const ce=async()=>{try{let o=n.value;o.package_id=o.packages?o.packages.id:null,o.combo_id=o.combos?o.combos.id:null,o.service_id=o.services?o.services.id:null,o.branch_id=U.branch.select.id,o.amount_payable=C();const t=await h.post("/appointments/",n.value);x.setAlert({show:!0,color:"success",content:"New Appointment Created!"}),n.value={}}catch(o){console.error(o),x.setAlert({show:!0,color:"error",content:"Failed to Create Appointment."})}};return(o,t)=>{const T=hl("v-number-input"),K=Ke;return S(),E("div",Cl,[a(te,{flat:"",border:"",class:"w-50 h-100 px-5 pb-5"},{default:v(()=>[a(ke,{class:"my-5"},{default:v(()=>[wl]),_:1}),a(_l,{class:"pt-3 px-5 h-100"},{default:v(()=>[a(z,{class:"ga-3"},{default:v(()=>[a(Ce,{modelValue:u(n).client_id,"onUpdate:modelValue":t[0]||(t[0]=s=>u(n).client_id=s),label:"Select Client",items:u(A),density:"comfortable",variant:"outlined","item-title":f,"item-value":"id",chips:""},null,8,["modelValue","items"]),a(we,{class:"text-none",color:"blue-darken-4",size:"large",onClick:H,variant:"tonal"},{default:v(()=>[Q(" Add Client ")]),_:1})]),_:1}),a(z,{class:"ga-3"},{default:v(()=>[a(pe,{"closable-chips":u($),modelValue:u(n).packages,"onUpdate:modelValue":[t[1]||(t[1]=s=>u(n).packages=s),t[2]||(t[2]=s=>u(n).amount_paid=C()/2)],items:u(k),chips:"",multiple:"",label:"Select Packages",density:"comfortable",variant:"outlined","item-title":"name",clearable:""},null,8,["closable-chips","modelValue","items"])]),_:1}),a(z,{class:"ga-3"},{default:v(()=>[a(pe,{"closable-chips":u($),modelValue:u(n).combos,"onUpdate:modelValue":[t[3]||(t[3]=s=>u(n).combos=s),t[4]||(t[4]=s=>u(n).amount_paid=C()/2)],items:u(D),chips:"",multiple:"",label:"Select Combos",density:"comfortable",variant:"outlined","item-title":"name",clearable:""},null,8,["closable-chips","modelValue","items"])]),_:1}),a(z,null,{default:v(()=>[a(pe,{"closable-chips":u($),modelValue:u(n).services,"onUpdate:modelValue":[t[5]||(t[5]=s=>u(n).services=s),t[6]||(t[6]=s=>u(n).amount_paid=C()/2)],items:u(O),chips:"",multiple:"",label:"Select Services",density:"comfortable",variant:"outlined","item-title":"name",clearable:""},null,8,["closable-chips","modelValue","items"])]),_:1})]),_:1})]),_:1}),a(te,{flat:"",border:"",class:"w-50 h-100 px-5 pb-5"},{default:v(()=>[a(ke,{class:"my-5"},{default:v(()=>[Sl]),_:1}),a(te,{flat:"",border:"",class:"pa-5 h-100"},{default:v(()=>[a(X,null,{default:v(()=>[a(Ce,{modelValue:u(n).payment_type,"onUpdate:modelValue":t[7]||(t[7]=s=>u(n).payment_type=s),items:["Cash","Online","Card"],chips:"",label:"Select Payment Type",density:"comfortable",variant:"outlined","item-title":"name",clearable:""},null,8,["modelValue"]),u(n).payment_type=="Online"||u(n).payment_type=="Card"?(S(),ae(Se,{key:0},{default:v(()=>[a(oe,{modelValue:u(n).biller,"onUpdate:modelValue":t[8]||(t[8]=s=>u(n).biller=s),label:"Biller name",hint:u(n).payment_type=="Online"?"( Gcash, Paymaya, etc. )":"( Credit, Debit )",density:"comfortable",variant:"outlined"},null,8,["modelValue","hint"]),a(oe,{modelValue:u(n).reference,"onUpdate:modelValue":t[9]||(t[9]=s=>u(n).reference=s),label:"Reference No.",density:"comfortable",variant:"outlined"},null,8,["modelValue"])]),_:1})):ne("",!0),a(T,{modelValue:u(n).amount_paid,"onUpdate:modelValue":t[10]||(t[10]=s=>u(n).amount_paid=s),label:"Amount Paid",density:"comfortable",variant:"outlined",min:C()/2},null,8,["modelValue","min"])]),_:1})]),_:1}),u(n).packages||u(n).services?(S(),ae(te,{key:0,flat:"",border:"",class:"mt-5 py-5 px-10"},{default:v(()=>[a(z,{class:"ga-3 align-self-end"},{default:v(()=>[a(X,null,{default:v(()=>[(S(!0),E(L,null,fe(u(n).packages,(s,g)=>(S(),E("div",{key:g,class:"d-flex text-medium-emphasis"},[y("span",null,R(s.name),1),a(J),y("span",null," ₱ "+R(m(s.price)),1)]))),128)),(S(!0),E(L,null,fe(u(n).combos,(s,g)=>(S(),E("div",{key:g,class:"d-flex text-medium-emphasis"},[y("span",null,R(s.name),1),a(J),y("span",null," ₱ "+R(m(s.price)),1)]))),128)),(S(!0),E(L,null,fe(u(n).services,(s,g)=>(S(),E("div",{key:g,class:"d-flex text-medium-emphasis"},[y("span",null,R(s.name),1),a(J),y("span",null," ₱ "+R(m(s.price)),1)]))),128)),a(yl,{thickness:2,class:"border-opacity-25 my-2"}),y("div",Al,[Dl,a(J),y("span",null," ₱ "+R(m(C())),1)]),u(n).amount_paid?(S(),ae(Se,{key:0},{default:v(()=>[y("div",Fl,[Pl,a(J),y("span",null,[y("h4",null,"₱ "+R(m(u(n).amount_paid)),1)])])]),_:1})):ne("",!0)]),_:1}),C()!=u(n).amount_paid?(S(),ae(X,{key:0},{default:v(()=>[a(Ae,{class:"ma-2",color:"orange-darken-3",label:""},{default:v(()=>[a(be,{icon:"mdi-cash-multiple",start:""}),Q(" "+R(m(C()-u(n).amount_paid))+" ",1),a(Vl,{activator:"parent",location:"end"},{default:v(()=>[Q("Payment Balance")]),_:1})]),_:1})]),_:1})):ne("",!0)]),_:1}),a(X,{class:"d-flex justify-center align-center mt-5"},{default:v(()=>[a(we,{disabled:!u(n).client_id,class:"text-none",color:"blue",size:"large",onClick:ce,variant:"tonal"},{default:v(()=>[Q(" Create Appointment ")]),_:1},8,["disabled"])]),_:1})]),_:1})):ne("",!0)]),_:1}),a(K,{onExitDialog:ue})])}}},Rl={class:"w-100 h-100 d-flex justify-center align-center px-10 py-15"},Tl={class:"flex-grow-1 h-100"},Kl={__name:"index",setup(e){return De().checkBranch(),(U,c)=>{const x=Il;return S(),E("div",Rl,[a(X,{class:"h-100"},{default:v(()=>[a(z,{class:"mx-10 px-10 ga-5 h-100"},{default:v(()=>[y("div",Tl,[a(x)])]),_:1})]),_:1})])}}};export{Kl as default};
