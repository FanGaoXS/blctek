(function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="./",n(n.s="d791")})({"0cc1":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:t._$g(0,"sc"),attrs:{_i:0}},[n("v-uni-image",{staticClass:t._$g(1,"sc"),attrs:{src:"/static/logo.png",_i:1}}),n("v-uni-view",{staticClass:t._$g(2,"sc"),attrs:{_i:2}},[n("v-uni-text",{staticClass:t._$g(3,"sc"),attrs:{_i:3}},[t._v(t._$g(3,"t0-0"))])],1)],1)},o=[]},"108e":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{wxsProps:{}}},components:{}};e.default=r},"1a97":function(t,e,n){"use strict";n.r(e);var r=n("108e"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},"24fb":function(t,e,n){"use strict";function r(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"===typeof btoa){var o=i(r),a=r.sources.map((function(t){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(t," */")}));return[n].concat(a).concat([o]).join("\n")}return[n].join("\n")}function i(t){var e=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),n="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(e);return"/*# ".concat(n," */")}t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=r(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,r){"string"===typeof t&&(t=[[null,t,""]]);var i={};if(r)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(i[a]=!0)}for(var u=0;u<t.length;u++){var c=[].concat(t[u]);r&&i[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),e.push(c))}},e}},3946:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,"",""]),t.exports=e},"4c72":function(t,e,n){"use strict";n.r(e);var r=n("f5a4"),i=n("9739");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);var a,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);e["default"]=c.exports},"6c75":function(t,e,n){"use strict";var r=n("76ac"),i=n.n(r);i.a},"76ac":function(t,e,n){var r=n("d0f1");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("7f7e").default;i("31b116be",r,!0,{sourceMap:!1,shadowMode:!1})},7961:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{wxsProps:{}}},components:{}};e.default=r},"7f7e":function(t,e,n){"use strict";function r(t,e){for(var n=[],r={},i=0;i<e.length;i++){var o=e[i],a=o[0],u=o[1],c=o[2],s=o[3],f={id:t+":"+i,css:u,media:c,sourceMap:s};r[a]?r[a].parts.push(f):n.push(r[a]={id:a,parts:[f]})}return n}n.r(e),n.d(e,"default",(function(){return v}));var i="undefined"!==typeof document;if("undefined"!==typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var o={},a=i&&(document.head||document.getElementsByTagName("head")[0]),u=null,c=0,s=!1,f=function(){},l=null,d="data-vue-ssr-id",p="undefined"!==typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function v(t,e,n,i){s=n,l=i||{};var a=r(t,e);return _(a),function(e){for(var n=[],i=0;i<a.length;i++){var u=a[i],c=o[u.id];c.refs--,n.push(c)}e?(a=r(t,e),_(a)):a=[];for(i=0;i<n.length;i++){c=n[i];if(0===c.refs){for(var s=0;s<c.parts.length;s++)c.parts[s]();delete o[c.id]}}}}function _(t){for(var e=0;e<t.length;e++){var n=t[e],r=o[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(b(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var a=[];for(i=0;i<n.parts.length;i++)a.push(b(n.parts[i]));o[n.id]={id:n.id,refs:1,parts:a}}}}function g(){var t=document.createElement("style");return t.type="text/css",a.appendChild(t),t}function b(t){var e,n,r=document.querySelector("style["+d+'~="'+t.id+'"]');if(r){if(s)return f;r.parentNode.removeChild(r)}if(p){var i=c++;r=u||(u=g()),e=m.bind(null,r,i,!1),n=m.bind(null,r,i,!0)}else r=g(),e=w.bind(null,r),n=function(){r.parentNode.removeChild(r)};return e(t),function(r){if(r){if(r.css===t.css&&r.media===t.media&&r.sourceMap===t.sourceMap)return;e(t=r)}else n()}}var h=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}();function m(t,e,n,r){var i=n?"":O(r.css);if(t.styleSheet)t.styleSheet.cssText=h(e,i);else{var o=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function w(t,e){var n=O(e.css),r=e.media,i=e.sourceMap;if(r&&t.setAttribute("media",r),l.ssrId&&t.setAttribute(d,e.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{while(t.firstChild)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var x=/\b([+-]?\d+(\.\d+)?)[r|u]px\b/g,y=/var\(--status-bar-height\)/gi,C=/var\(--window-top\)/gi,j=/var\(--window-bottom\)/gi,S=/var\(--window-left\)/gi,$=/var\(--window-right\)/gi,k=!1;function O(t){if(!uni.canIUse("css.var")){!1===k&&(k=plus.navigator.getStatusbarHeight());var e={statusBarHeight:k,top:window.__WINDOW_TOP||0,bottom:window.__WINDOW_BOTTOM||0};t=t.replace(y,e.statusBarHeight+"px").replace(C,e.top+"px").replace(j,e.bottom+"px").replace(S,"0px").replace($,"0px")}return t.replace(/\{[\s\S]+?\}|@media.+?\{/g,(function(t){return t.replace(x,(function(t,e){return uni.upx2px(e)+"px"}))}))}},9479:function(t,e,n){"undefined"===typeof Promise||Promise.prototype.finally||(Promise.prototype.finally=function(t){var e=this.constructor;return this.then((function(n){return e.resolve(t()).then((function(){return n}))}),(function(n){return e.resolve(t()).then((function(){throw n}))}))}),window.__uniConfig={window:{navigationBarTextStyle:"black",navigationBarTitleText:"contection",navigationBarBackgroundColor:"#F8F8F8",backgroundColor:"#F8F8F8"}},uni.restoreGlobal&&uni.restoreGlobal(weex,plus,setTimeout,clearTimeout,setInterval,clearInterval),__definePage("pages/index/index",(function(){return Vue.extend(n("fe8b").default)})),__definePage("pages/test/test",(function(){return Vue.extend(n("4c72").default)}))},9739:function(t,e,n){"use strict";n.r(e);var r=n("7961"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},c5c8:function(t,e,n){var r=n("3946");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("7f7e").default;i("98b385fa",r,!0,{sourceMap:!1,shadowMode:!1})},d0f1:function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,".content{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.logo{height:200rpx;width:200rpx;margin-top:200rpx;margin-left:auto;margin-right:auto;margin-bottom:50rpx}.text-area{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.title{font-size:36rpx;color:#8f8f94}",""]),t.exports=e},d791:function(t,e,n){"use strict";function r(){function t(t){var e=n("d9d7");e.__inject__&&e.__inject__(t)}"function"===typeof t&&t(),UniViewJSBridge.publishHandler("webviewReady")}n("9479"),"undefined"!==typeof plus?r():document.addEventListener("plusready",r)},d9d7:function(t,e,n){"use strict";n.r(e);var r=n("c5c8"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},f0c5:function(t,e,n){"use strict";function r(t,e,n,r,i,o,a,u,c,s){var f,l="function"===typeof t?t.options:t;if(c){l.components||(l.components={});var d=Object.prototype.hasOwnProperty;for(var p in c)d.call(c,p)&&!d.call(l.components,p)&&(l.components[p]=c[p])}if(s&&((s.beforeCreate||(s.beforeCreate=[])).unshift((function(){this[s.__module]=this})),(l.mixins||(l.mixins=[])).push(s)),e&&(l.render=e,l.staticRenderFns=n,l._compiled=!0),r&&(l.functional=!0),o&&(l._scopeId="data-v-"+o),a?(f=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},l._ssrRegister=f):i&&(f=u?function(){i.call(this,this.$root.$options.shadowRoot)}:i),f)if(l.functional){l._injectStyles=f;var v=l.render;l.render=function(t,e){return f.call(e),v(t,e)}}else{var _=l.beforeCreate;l.beforeCreate=_?[].concat(_,f):[f]}return{exports:t,options:l}}n.d(e,"a",(function(){return r}))},f5a4:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{attrs:{_i:0}},[n("v-uni-button",{attrs:{_i:1},on:{click:function(e){return t.$handleViewEvent(e)}}},[t._v("\u5f00\u59cb\u641c\u7d22\u9644\u8fd1\u8bbe\u5907")]),n("v-uni-button",{attrs:{_i:2},on:{click:function(e){return t.$handleViewEvent(e)}}},[t._v("\u83b7\u53d6\u5df2\u53d1\u73b0\u6216\u8005\u5df2\u8fde\u63a5\u7684\u84dd\u7259\u8bbe\u5907")]),n("v-uni-button",{attrs:{_i:3},on:{click:function(e){return t.$handleViewEvent(e)}}},[t._v("\u505c\u6b62\u641c\u7d22")]),t._l(t._$g(4,"f"),(function(e,r,i,o){return n("v-uni-view",{key:e,staticStyle:{"margin-top":"20rpx"},attrs:{_i:"4-"+o}},[n("v-uni-view",{attrs:{_i:"5-"+o}},[t._v("\u84dd\u7259\u8bbe\u5907id\uff1a"+t._$g("5-"+o,"t0-0"))]),n("v-uni-view",{attrs:{_i:"6-"+o}},[t._v("\u84dd\u7259\u4fe1\u53f7\u5f3a\u5ea6\uff1a"+t._$g("6-"+o,"t0-0"))]),n("v-uni-view",{attrs:{_i:"7-"+o}},[t._v("\u84dd\u7259\u8bbe\u5907\u540d\u79f0\uff1a"+t._$g("7-"+o,"t0-0"))]),n("v-uni-view",{attrs:{_i:"8-"+o}},[t._v("advertisData:"+t._$g("8-"+o,"t0-0"))]),n("v-uni-view",{attrs:{_i:"9-"+o}},[t._v("advertisServiceUUIDs:"+t._$g("9-"+o,"t0-0"))]),n("v-uni-view",{attrs:{_i:"10-"+o}},[t._v("localName:"+t._$g("10-"+o,"t0-0"))]),n("v-uni-view",{attrs:{_i:"11-"+o}},[t._v("serviceData:"+t._$g("11-"+o,"t0-0"))])],1)}))],2)},o=[]},fe8b:function(t,e,n){"use strict";n.r(e);var r=n("0cc1"),i=n("1a97");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("6c75");var a,u=n("f0c5"),c=Object(u["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);e["default"]=c.exports}});