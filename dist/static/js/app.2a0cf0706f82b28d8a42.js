webpackJsonp([1],{"7iu4":function(t,n){},JaJF:function(t,n){},NHnr:function(t,n,e){"use strict";function r(t){var n=new Date(0);return n.setUTCSeconds(t),n.toISOString().split("T",1)[0]}Object.defineProperty(n,"__esModule",{value:!0});var o=e("mvHQ"),s=e.n(o),a=e("//Fk"),i=e.n(a),c=e("7+uW"),u={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[t._l(t.$store.state.messages,function(n){return t.$store.state.messages?e("ul",{staticClass:"messages"},[e("li",{class:n.kind},[t._v(t._s(n.body))])]):t._e()}),t._v(" "),e("router-view")],2)},staticRenderFns:[]},d=e("VU/8")({name:"app"},u,!1,function(t){e("JaJF")},null,null).exports,l=e("/ocq"),v={name:"Accounts",data:function(){return{newAccount:""}},methods:{reset:function(){this.newAccount=""},addAccount:function(t){var n=this,e=this.newAccount;e&&(this.$store.dispatch("saveAccount",e).catch(function(t){n.$store.commit("message",{kind:"error",body:String(t)})}),this.reset())}}},f={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("form",{on:{submit:function(n){n.preventDefault(),t.addAccount(n)}}},[e("h2",[t._v("Accounts")]),t._v(" "),t._l(t.$store.state.accounts,function(n,r){return e("ul",[e("li",[t._v(t._s(r))])])}),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.newAccount,expression:"newAccount"}],staticClass:"address",attrs:{type:"text",placeholder:"Ethereum Address"},domProps:{value:t.newAccount},on:{input:function(n){n.target.composing||(t.newAccount=n.target.value)}}}),t._v(" "),e("input",{attrs:{type:"submit",value:"Add"},on:{click:t.addAccount}})],2)},staticRenderFns:[]},m={name:"Transactions",data:function(){return{symbolTo:"CAD"}},computed:{totalEth:function(){return this.weiToEth(this.$store.getters.valueIncoming("ETH")).toFixed(3).toLocaleString()},totalFiat:function(){return this.toCurrency(this.weiToEth(this.$store.getters.valueIncoming(this.symbolTo)))},count:function(){return this.$store.getters.txIncoming.length}},methods:{weiToEth:function(t){return t.mul(5).div("1000000000000000000").toNumber()/5},toCurrency:function(t){return void 0===t?t:t.toLocaleString("en-US",{style:"currency",currency:this.symbolTo})}}},h={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return t.$store.state.transactions.length>0?e("table",[e("caption",[t._v("\n    Loaded "),e("strong",[t._v(t._s(t.totalEth)+" ETH")]),t._v(" inbound across "+t._s(t.count)+" transactions,\n    worth "),e("strong",[t._v(t._s(t.totalFiat))]),t._v(" at the time of transacting.\n  ")]),t._v(" "),t._m(0),t._v(" "),e("tbody",t._l(t.$store.state.transactions,function(n){return e("tr",[e("td",{staticClass:"date"},[t._v(t._s(n.date))]),t._v(" "),e("td",{staticClass:"address"},[t._v(t._s(n.from))]),t._v(" "),e("td",{staticClass:"address"},[t._v(t._s(n.to))]),t._v(" "),e("td",{staticClass:"value"},[t._v(t._s(t.weiToEth(n.value).toFixed(3).toLocaleString()))]),t._v(" "),e("td",{staticClass:"kind"},[t._v(t._s(n.kind))]),t._v(" "),e("td",{staticClass:"value"},[t._v("$"+t._s(t.toCurrency(t.$store.getters.transactionPrice(n,t.symbolTo))))]),t._v(" "),e("td",{staticClass:"kind"},[t._v(t._s(t.symbolTo))])])}))]):t._e()},staticRenderFns:[function(){var t=this.$createElement,n=this._self._c||t;return n("thead",[n("tr",[n("td",[this._v("Date")]),this._v(" "),n("td",{staticClass:"address"},[this._v("From")]),this._v(" "),n("td",{staticClass:"address"},[this._v("To")]),this._v(" "),n("td",{staticClass:"value"},[this._v("Value")]),this._v(" "),n("td"),this._v(" "),n("td",{staticClass:"value"},[this._v("Conversion")]),this._v(" "),n("td")])])}]},y={name:"Index",data:function(){return{newAccount:""}},methods:{reset:function(){this.newAccount=""},addAccount:function(t){var n=this,e=this.newAccount;e&&(this.$store.dispatch("saveAccount",e).catch(function(t){n.$store.commit("message",{kind:"error",body:String(t)})}),this.reset())}},components:{Accounts:e("VU/8")(v,f,!1,function(t){e("pFqz")},"data-v-51f86dd4",null).exports,Transactions:e("VU/8")(m,h,!1,function(t){e("7iu4")},"data-v-3aff335a",null).exports}},p={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",[n("Accounts"),this._v(" "),n("Transactions")],1)},staticRenderFns:[]},_=e("VU/8")(y,p,!1,function(t){e("a2wY")},"data-v-f71dea54",null).exports;c.a.use(l.a);var g=new l.a({routes:[{path:"/",name:"Index",component:_}]}),w=e("woOf"),b=e.n(w),A=e("BO1k"),H=e.n(A),T=e("mtWM"),S=e.n(T),C=e("NYxO"),E=e("uotZ"),x=e.n(E);c.a.use(C.a);var $=new C.a.Store({state:{messages:[],accounts:{},priceHistory:{},transactions:[]},getters:{priceHistory:function(t){return function(n,e){return t.priceHistory[n]&&t.priceHistory[n][e]}},priceByDate:function(t,n){return function(t,e,r){var o=n.priceHistory(t,e);return o&&o[r]}},transactionPrice:function(t,n){return function(t,e){var r=n.priceHistory(t.kind,e);return r&&r[t.date]}},valueIncoming:function(t,n){return function(t){var e=new x.a(0),r=new x.a(1),o=!0,s=!1,a=void 0;try{for(var i,c=H()(n.txIncoming);!(o=(i=c.next()).done);o=!0){var u=i.value;if(u.value){var d=t===u.kind?r:n.transactionPrice(u,t);d&&(e=e.add(u.value.mul(d)))}}}catch(t){s=!0,a=t}finally{try{!o&&c.return&&c.return()}finally{if(s)throw a}}return e}},txIncoming:function(t){return t.transactions.filter(function(n){return n.to in t.accounts})},txOutgoing:function(t){return t.transactions.filter(function(n){return n.from in t.accounts})}},mutations:{addAccount:function(t,n,e){var r=n.toLowerCase();t.accounts[r]||c.a.set(t.accounts,r,{loading:!0,symbol:e})},addTransaction:function(t,n){var e=n.date,r=n.from,o=n.to,s=n.value,a=n.kind;s.isZero()||t.transactions.push({date:e,from:r,to:o,value:s,kind:a})},completeAccount:function(t,n){var e=n.toLowerCase(),r=t.accounts[e];r.loading=!1,c.a.set(t.accounts,e,r)},addPriceHistory:function(t,n){var e=n.fromSymbol,r=n.toSymbol,o=n.history;t.priceHistory[e]=t.priceHistory[e]||{},t.priceHistory[e][r]=t.priceHistory[e][r]||{},t.priceHistory[e][r]=b()({},t.priceHistory[e][r],o)},message:function(t,n){var e=n.kind,r=n.body;t.messages.push({kind:e,body:r,read:!1})},reset:function(t){t.accounts={}}},actions:{saveAccount:function(t,n){var e=t.commit,r=t.dispatch,o=t.state;if(void 0!==o.accounts[n])return i.a.reject(Error("account already saved: "+n));e("addAccount",n);var s=r("loadPriceHistory",{fromSymbol:"ETH",toSymbol:"CAD"}),a=r("loadTransactions",{symbol:"ETH",address:n});return o.priceHistory.ETH&&o.priceHistory.ETH.CAD?a:i.a.all([a,s])},loadTransactions:function(t,n){var e=t.commit,o=n.symbol,s=n.address;if("ETH"!==o)return i.a.reject(Error("invalid symbol: "+o));var a="https://api.etherscan.io/api?module=account&action=txlist&address="+s+"&sort=asc&apiKey=SHT8M9JSGR62U5U7YVFUSTPG41IVR1F7ND";return S.a.get(a).then(function(t){var n=!0,a=!1,i=void 0;try{for(var c,u=H()(t.data.result);!(n=(c=u.next()).done);n=!0){var d=c.value;"0"===d.isError&&e("addTransaction",{date:r(d.timeStamp),to:d.to,from:d.from,value:new x.a(d.value),kind:o})}}catch(t){a=!0,i=t}finally{try{!n&&u.return&&u.return()}finally{if(a)throw i}}e("completeAccount",s)})},loadPriceHistory:function(t,n){var e=t.commit,o=n.fromSymbol,s=n.toSymbol,a={};e("addPriceHistory",{fromSymbol:o,toSymbol:s,history:a});var i="https://min-api.cryptocompare.com/data/histoday?fsym="+o+"&tsym="+s+"&limit=365";return S.a.get(i).then(function(t){var n=!0,i=!1,c=void 0;try{for(var u,d=H()(t.data.Data);!(n=(u=d.next()).done);n=!0){var l=u.value,v=r(l.time);a[v]=new x.a(l.close)}}catch(t){i=!0,c=t}finally{try{!n&&d.return&&d.return()}finally{if(i)throw c}}e("addPriceHistory",{fromSymbol:o,toSymbol:s,history:a})})}}});c.a.config.productionTip=!1,new c.a({el:"#app",router:g,store:$,render:function(t){return t(d)}});var k=function(t){return"CACHE::"+t.url},F=window.sessionStorage;S.a.interceptors.request.use(function(t){var n=k(t);if("get"!==t.method)return t;var e=F.getItem(n);return e?(t.adapter=function(){return i.a.resolve({data:JSON.parse(e),status:t.status,statusText:t.statusText,headers:t.headers,config:t,request:t})},t):t},function(t){return i.a.reject(t)}),S.a.interceptors.response.use(function(t){if(t.status>200||"get"!==t.config.method)return t;var n=k(t.config);return F.setItem(n,s()(t.data)),t},function(t){return i.a.reject(t)})},a2wY:function(t,n){},pFqz:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.2a0cf0706f82b28d8a42.js.map