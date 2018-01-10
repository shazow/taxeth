webpackJsonp([1],{J9CY:function(t,e){},JaJF:function(t,e){},NHnr:function(t,e,n){"use strict";function r(){}function s(t){var e=new Date(0);return e.setUTCSeconds(t),e.toISOString().split("T",1)[0]}Object.defineProperty(e,"__esModule",{value:!0});var o=n("mvHQ"),a=n.n(o),i=n("//Fk"),c=n.n(i),u=n("7+uW"),d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t._l(t.$store.state.messages,function(e){return t.$store.state.messages?n("ul",{staticClass:"messages"},[n("li",{class:e.kind},[t._v(t._s(e.body))])]):t._e()}),t._v(" "),n("router-view")],2)},staticRenderFns:[]},l=n("VU/8")({name:"app"},d,!1,function(t){n("JaJF")},null,null).exports,v=n("/ocq"),f=n("BO1k"),m=n.n(f),h=n("fZjL"),y=n.n(h),p=n("OvRC");r.prototype=n.n(p)()(Error.prototype);var _={TaxethError:r},g={name:"Accounts",data:function(){return{newAccount:""}},methods:{reset:function(){this.newAccount=""},addAccount:function(t){var e=this,n=this.newAccount;n&&(this.$store.dispatch("saveAccount",n).catch(_,function(t){e.$store.commit("message",{kind:"error",body:String(t)})}),this.reset(),this.$router.push({path:"/",query:{a:y()(this.$store.state.accounts)}}))}}},A={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{on:{submit:function(e){e.preventDefault(),t.addAccount(e)}}},[n("h2",[t._v("Accounts")]),t._v(" "),t._l(t.$store.state.accounts,function(e,r){return n("ul",[n("li",{class:{loading:e.loading}},[t._v(t._s(r))])])}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newAccount,expression:"newAccount"}],staticClass:"address",attrs:{type:"text",placeholder:"Ethereum Address"},domProps:{value:t.newAccount},on:{input:function(e){e.target.composing||(t.newAccount=e.target.value)}}}),t._v(" "),n("input",{attrs:{type:"submit",value:"Add"},on:{click:t.addAccount}})],2)},staticRenderFns:[]},w={name:"Transactions",data:function(){return{symbolTo:"CAD"}},computed:{totalEth:function(){return this.weiToEth(this.$store.getters.valueIncoming("ETH")).toFixed(3).toLocaleString()},totalFiat:function(){return this.toCurrency(this.weiToEth(this.$store.getters.valueIncoming(this.symbolTo)))},count:function(){return this.$store.getters.txIncoming.length}},methods:{txAmount:function(t){return this.weiToEth(t.value).toFixed(3).toLocaleString()},txExchange:function(t,e){return this.toCurrency(this.$store.getters.transactionPrice(t,e))},txConverted:function(t,e){var n=this.$store.getters.transactionPrice(t,e);if(n)return this.toCurrency(this.weiToEth(t.value.mul(n)),e)},weiToEth:function(t){return t.mul(5).div("1000000000000000000").toNumber()/5},toCurrency:function(t){return void 0===t?t:t.toLocaleString()}}},T={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.$store.state.transactions.length>0?n("table",[n("caption",[t._v("\n    Loaded "),n("strong",[t._v(t._s(t.totalEth)+" ETH")]),t._v(" inbound across "+t._s(t.count)+" transactions,\n    worth "),n("strong",[t._v("$"+t._s(t.totalFiat)+" "+t._s(t.symbolTo))]),t._v(" at the time of transacting.\n  ")]),t._v(" "),t._m(0),t._v(" "),n("tbody",t._l(t.$store.state.transactions,function(e){return n("tr",[n("td",{staticClass:"date"},[t._v(t._s(e.date))]),t._v(" "),n("td",{staticClass:"address"},[t._v(t._s(e.from))]),t._v(" "),n("td",{staticClass:"address"},[t._v(t._s(e.to))]),t._v(" "),n("td",{staticClass:"value"},[t._v(t._s(t.txAmount(e)))]),t._v(" "),n("td",{staticClass:"kind"},[t._v(t._s(e.kind))]),t._v(" "),n("td",{staticClass:"value"},[t._v(t._s(t.txConverted(e,t.symbolTo),t.$store.state.priceHistory))]),t._v(" "),n("td",{staticClass:"kind"},[t._v(t._s(t.symbolTo))]),t._v(" "),n("td",{staticClass:"value"},[t._v(t._s(t.txExchange(e,t.symbolTo,t.$store.state.priceHistory)))]),t._v(" "),n("td",{staticClass:"kind"},[t._v(t._s(e.kind)+t._s(t.symbolTo))])])}))]):t._e()},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("td",[this._v("Date")]),this._v(" "),e("td",{staticClass:"address"},[this._v("From")]),this._v(" "),e("td",{staticClass:"address"},[this._v("To")]),this._v(" "),e("td",{staticClass:"value"},[this._v("Amount")]),this._v(" "),e("td"),this._v(" "),e("td",{staticClass:"value"},[this._v("Converted")]),this._v(" "),e("td"),this._v(" "),e("td",{staticClass:"value"},[this._v("Rate")]),this._v(" "),e("td")])])}]},b={name:"Index",props:["initAddresses"],data:function(){return{newAccount:""}},methods:{reset:function(){this.newAccount=""},addAccount:function(t){var e=this,n=this.newAccount;n&&(this.$store.dispatch("saveAccount",n).catch(_,function(t){e.$store.commit("message",{kind:"error",body:String(t)})}),this.reset())}},components:{Accounts:n("VU/8")(g,A,!1,function(t){n("J9CY")},"data-v-18cd4d2d",null).exports,Transactions:n("VU/8")(w,T,!1,function(t){n("y2hd")},"data-v-c62216b8",null).exports},mounted:function(){var t=this;if(this.initAddresses&&0!==this.initAddresses.length){var e=!0,n=!1,r=void 0;try{for(var s,o=m()(this.initAddresses);!(e=(s=o.next()).done);e=!0){var a=s.value;this.$store.dispatch("saveAccount",a).catch(_,function(e){t.$store.commit("message",{kind:"error",body:String(e)})})}}catch(t){n=!0,r=t}finally{try{!e&&o.return&&o.return()}finally{if(n)throw r}}}}},C={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("Accounts"),this._v(" "),e("Transactions")],1)},staticRenderFns:[]},H=n("VU/8")(b,C,!1,function(t){n("jNa+")},"data-v-6739d2a2",null).exports;u.a.use(v.a);var x=new v.a({routes:[{path:"/",name:"Index",component:H,props:function(t){if(Array.isArray(t.query.a))return{initAddresses:t.query.a};if(t.query.a)return{initAddresses:[t.query.a]}}}]}),E=n("woOf"),S=n.n(E),$=n("mtWM"),k=n.n($),F=n("NYxO"),I=n("uotZ"),P=n.n(I);u.a.use(F.a);var j=new F.a.Store({state:{messages:[],accounts:{},priceHistory:{},transactions:[]},getters:{priceHistory:function(t){return function(e,n){return t.priceHistory[e]&&t.priceHistory[e][n]}},priceByDate:function(t,e){return function(t,n,r){var s=e.priceHistory(t,n);return s&&s[r]}},transactionPrice:function(t,e){return function(t,n){var r=e.priceHistory(t.kind,n);return r&&r[t.date]}},valueIncoming:function(t,e){return function(t){var n=new P.a(0),r=new P.a(1),s=!0,o=!1,a=void 0;try{for(var i,c=m()(e.txIncoming);!(s=(i=c.next()).done);s=!0){var u=i.value;if(u.value){var d=t===u.kind?r:e.transactionPrice(u,t);d&&(n=n.add(u.value.mul(d)))}}}catch(t){o=!0,a=t}finally{try{!s&&c.return&&c.return()}finally{if(o)throw a}}return n}},txIncoming:function(t){return t.transactions.filter(function(e){return e.to in t.accounts})},txOutgoing:function(t){return t.transactions.filter(function(e){return e.from in t.accounts})}},mutations:{addAccount:function(t,e,n){var r=e.toLowerCase();t.accounts[r]||u.a.set(t.accounts,r,{loading:!0,symbol:n})},addTransaction:function(t,e){var n=e.date,r=e.from,s=e.to,o=e.value,a=e.kind;o.isZero()||t.transactions.push({date:n,from:r,to:s,value:o,kind:a})},completeAccount:function(t,e){var n=e.toLowerCase(),r=t.accounts[n];r.loading=!1,u.a.set(t.accounts,n,r)},addPriceHistory:function(t,e){var n=e.fromSymbol,r=e.toSymbol,s=e.history;t.priceHistory[n]=t.priceHistory[n]||{},t.priceHistory[n][r]=t.priceHistory[n][r]||{},t.priceHistory[n][r]=S()({},t.priceHistory[n][r],s)},message:function(t,e){var n=e.kind,r=e.body;t.messages.push({kind:n,body:r,read:!1})},reset:function(t){t.accounts={}}},actions:{saveAccount:function(t,e){var n=t.commit,r=t.dispatch,s=t.state;if(!e||!e.startsWith("0x"))return c.a.reject(_("invalid ETH address: "+e));var o=e.toLowerCase();if(void 0!==s.accounts[o])return c.a.reject(_("account already saved: "+e));n("addAccount",o);var a=r("loadPriceHistory",{fromSymbol:"ETH",toSymbol:"CAD"}),i=r("loadTransactions",{symbol:"ETH",address:o});return s.priceHistory.ETH&&s.priceHistory.ETH.CAD?i:c.a.all([a,i])},loadTransactions:function(t,e){var n=t.commit,r=e.symbol,o=e.address;if("ETH"!==r)return c.a.reject(_("invalid symbol: "+r));var a="https://api.etherscan.io/api?module=account&action=txlist&address="+o+"&sort=asc&apiKey=YWB9ZNYGSVE354WE7S7STCSTTKHWD5KSYQ";return k.a.get(a).then(function(t){if("1"!==t.data.status)return c.a.reject(_("API request failed: "+t.data.message));var e=!0,a=!1,i=void 0;try{for(var u,d=m()(t.data.result);!(e=(u=d.next()).done);e=!0){var l=u.value;"0"===l.isError&&n("addTransaction",{date:s(l.timeStamp),to:l.to,from:l.from,value:new P.a(l.value),kind:r})}}catch(t){a=!0,i=t}finally{try{!e&&d.return&&d.return()}finally{if(a)throw i}}n("completeAccount",o)})},loadPriceHistory:function(t,e){var n=t.commit,r=e.fromSymbol,o=e.toSymbol,a={};n("addPriceHistory",{fromSymbol:r,toSymbol:o,history:a});var i="https://min-api.cryptocompare.com/data/histoday?fsym="+r+"&tsym="+o+"&limit=365";return k.a.get(i).then(function(t){var e=!0,i=!1,c=void 0;try{for(var u,d=m()(t.data.Data);!(e=(u=d.next()).done);e=!0){var l=u.value,v=s(l.time);a[v]=new P.a(l.close)}}catch(t){i=!0,c=t}finally{try{!e&&d.return&&d.return()}finally{if(i)throw c}}n("addPriceHistory",{fromSymbol:r,toSymbol:o,history:a})})}}});u.a.config.productionTip=!1,new u.a({el:"#app",router:x,store:j,render:function(t){return t(l)}});var q=function(t){return"CACHE::"+t.url},D=window.sessionStorage;k.a.interceptors.request.use(function(t){var e=q(t);if("get"!==t.method)return t;var n=D.getItem(e);return n?(t.adapter=function(){return c.a.resolve({data:JSON.parse(n),status:t.status,statusText:t.statusText,headers:t.headers,config:t,request:t})},t):t},function(t){return c.a.reject(_(t))}),k.a.interceptors.response.use(function(t){if(t.status>200||"get"!==t.config.method)return t;var e=q(t.config);return D.setItem(e,a()(t.data)),t},function(t){return c.a.reject(_(t))})},"jNa+":function(t,e){},y2hd:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.3c07fe0711f90446e71b.js.map