webpackJsonp([1],{JaJF:function(t,e){},NHnr:function(t,e,n){"use strict";function r(){}function s(t){var e=new Date(0);return e.setUTCSeconds(t),e.toISOString().split("T",1)[0]}Object.defineProperty(e,"__esModule",{value:!0});var a=n("mvHQ"),o=n.n(a),i=n("//Fk"),c=n.n(i),u=n("7+uW"),d={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[t._l(t.$store.state.messages,function(e){return t.$store.state.messages?n("ul",{staticClass:"messages"},[n("li",{class:e.kind},[t._v(t._s(e.body))])]):t._e()}),t._v(" "),n("router-view")],2)},staticRenderFns:[]},l=n("VU/8")({name:"app"},d,!1,function(t){n("JaJF")},null,null).exports,v=n("/ocq"),f=n("BO1k"),m=n.n(f),h=n("fZjL"),y=n.n(h),_=n("OvRC");r.prototype=n.n(_)()(Error.prototype);var p={TaxethError:r},g={name:"Accounts",data:function(){return{newAccount:""}},methods:{reset:function(){this.newAccount=""},addAccount:function(t){var e=this,n=this.newAccount;n&&(this.$store.dispatch("saveAccount",n).then(function(t){}).catch(p,function(t){e.$store.commit("message",{kind:"error",body:String(t)})}),this.reset(),this.$router.push({path:"/",query:{a:y()(this.$store.state.accounts)}}))}}},A={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{on:{submit:function(e){e.preventDefault(),t.addAccount(e)}}},[n("h2",[t._v("Accounts")]),t._v(" "),t._l(t.$store.state.accounts,function(e,r){return n("ul",[n("li",{class:{loading:e.loading}},[t._v(t._s(r))])])}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.newAccount,expression:"newAccount"}],staticClass:"address",attrs:{type:"text",placeholder:"Ethereum Address"},domProps:{value:t.newAccount},on:{input:function(e){e.target.composing||(t.newAccount=e.target.value)}}}),t._v(" "),n("input",{attrs:{type:"submit",value:"Add"},on:{click:t.addAccount}})],2)},staticRenderFns:[]},b={name:"Transactions",data:function(){return{symbolTo:"CAD"}},computed:{totalEth:function(){return this.weiToEth(this.$store.getters.valueIncoming("ETH")).toFixed(3).toLocaleString()},totalFiat:function(){return this.toCurrency(this.weiToEth(this.$store.getters.valueIncoming(this.symbolTo)))},count:function(){return this.$store.getters.txIncoming.length}},methods:{weiToEth:function(t){return t.mul(5).div("1000000000000000000").toNumber()/5},toCurrency:function(t){return void 0===t?t:t.toLocaleString("en-US",{style:"currency",currency:this.symbolTo})}}},w={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.$store.state.transactions.length>0?n("table",[n("caption",[t._v("\n    Loaded "),n("strong",[t._v(t._s(t.totalEth)+" ETH")]),t._v(" inbound across "+t._s(t.count)+" transactions,\n    worth "),n("strong",[t._v(t._s(t.totalFiat))]),t._v(" at the time of transacting.\n  ")]),t._v(" "),t._m(0),t._v(" "),n("tbody",t._l(t.$store.state.transactions,function(e){return n("tr",[n("td",{staticClass:"date"},[t._v(t._s(e.date))]),t._v(" "),n("td",{staticClass:"address"},[t._v(t._s(e.from))]),t._v(" "),n("td",{staticClass:"address"},[t._v(t._s(e.to))]),t._v(" "),n("td",{staticClass:"value"},[t._v(t._s(t.weiToEth(e.value).toFixed(3).toLocaleString()))]),t._v(" "),n("td",{staticClass:"kind"},[t._v(t._s(e.kind))]),t._v(" "),n("td",{staticClass:"value"},[t._v("$"+t._s(t.toCurrecy(t.weiToEth(e.value.mul(t.$store.getters.transactionPrice(e,t.symbolTo))))))]),t._v(" "),n("td",{staticClass:"kind"},[t._v(t._s(t.symbolTo))]),t._v(" "),n("td",{staticClass:"value"},[t._v("$"+t._s(t.toCurrency(t.$store.getters.transactionPrice(e,t.symbolTo))))]),t._v(" "),n("td",{staticClass:"kind"},[t._v(t._s(e.kind)+t._s(t.symbolTo))])])}))]):t._e()},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("td",[this._v("Date")]),this._v(" "),e("td",{staticClass:"address"},[this._v("From")]),this._v(" "),e("td",{staticClass:"address"},[this._v("To")]),this._v(" "),e("td",{staticClass:"value"},[this._v("Amount")]),this._v(" "),e("td"),this._v(" "),e("td",{staticClass:"value"},[this._v("Fiat")]),this._v(" "),e("td"),this._v(" "),e("td",{staticClass:"value"},[this._v("Exchange")]),this._v(" "),e("td")])])}]},T={name:"Index",props:["initAddresses"],data:function(){return{newAccount:""}},methods:{reset:function(){this.newAccount=""},addAccount:function(t){var e=this,n=this.newAccount;n&&(this.$store.dispatch("saveAccount",n).catch(p,function(t){e.$store.commit("message",{kind:"error",body:String(t)})}),this.reset())}},components:{Accounts:n("VU/8")(g,A,!1,function(t){n("zZ0b")},"data-v-62ddeb09",null).exports,Transactions:n("VU/8")(b,w,!1,function(t){n("Z9/S")},"data-v-c44c4780",null).exports},mounted:function(){var t=this;if(this.initAddresses&&0!==this.initAddresses.length){var e=!0,n=!1,r=void 0;try{for(var s,a=m()(this.initAddresses);!(e=(s=a.next()).done);e=!0){var o=s.value;this.$store.dispatch("saveAccount",o).catch(p,function(e){t.$store.commit("message",{kind:"error",body:String(e)})})}}catch(t){n=!0,r=t}finally{try{!e&&a.return&&a.return()}finally{if(n)throw r}}}}},H={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("Accounts"),this._v(" "),e("Transactions")],1)},staticRenderFns:[]},C=n("VU/8")(T,H,!1,function(t){n("jNa+")},"data-v-6739d2a2",null).exports;u.a.use(v.a);var S=new v.a({routes:[{path:"/",name:"Index",component:C,props:function(t){if(Array.isArray(t.query.a))return{initAddresses:t.query.a};if(t.query.a)return{initAddresses:[t.query.a]}}}]}),E=n("woOf"),x=n.n(E),$=n("mtWM"),k=n.n($),F=n("NYxO"),I=n("uotZ"),P=n.n(I);u.a.use(F.a);var j=new F.a.Store({state:{messages:[],accounts:{},priceHistory:{},transactions:[]},getters:{priceHistory:function(t){return function(e,n){return t.priceHistory[e]&&t.priceHistory[e][n]}},priceByDate:function(t,e){return function(t,n,r){var s=e.priceHistory(t,n);return s&&s[r]}},transactionPrice:function(t,e){return function(t,n){var r=e.priceHistory(t.kind,n);return r&&r[t.date]}},valueIncoming:function(t,e){return function(t){var n=new P.a(0),r=new P.a(1),s=!0,a=!1,o=void 0;try{for(var i,c=m()(e.txIncoming);!(s=(i=c.next()).done);s=!0){var u=i.value;if(u.value){var d=t===u.kind?r:e.transactionPrice(u,t);d&&(n=n.add(u.value.mul(d)))}}}catch(t){a=!0,o=t}finally{try{!s&&c.return&&c.return()}finally{if(a)throw o}}return n}},txIncoming:function(t){return t.transactions.filter(function(e){return e.to in t.accounts})},txOutgoing:function(t){return t.transactions.filter(function(e){return e.from in t.accounts})}},mutations:{addAccount:function(t,e,n){var r=e.toLowerCase();t.accounts[r]||u.a.set(t.accounts,r,{loading:!0,symbol:n})},addTransaction:function(t,e){var n=e.date,r=e.from,s=e.to,a=e.value,o=e.kind;a.isZero()||t.transactions.push({date:n,from:r,to:s,value:a,kind:o})},completeAccount:function(t,e){var n=e.toLowerCase(),r=t.accounts[n];r.loading=!1,u.a.set(t.accounts,n,r)},addPriceHistory:function(t,e){var n=e.fromSymbol,r=e.toSymbol,s=e.history;t.priceHistory[n]=t.priceHistory[n]||{},t.priceHistory[n][r]=t.priceHistory[n][r]||{},t.priceHistory[n][r]=x()({},t.priceHistory[n][r],s)},message:function(t,e){var n=e.kind,r=e.body;t.messages.push({kind:n,body:r,read:!1})},reset:function(t){t.accounts={}}},actions:{saveAccount:function(t,e){var n=t.commit,r=t.dispatch,s=t.state;if(!e||!e.startsWith("0x"))return c.a.reject(p("invalid ETH address: "+e));var a=e.toLowerCase();if(void 0!==s.accounts[a])return c.a.reject(p("account already saved: "+e));n("addAccount",a);var o=r("loadPriceHistory",{fromSymbol:"ETH",toSymbol:"CAD"}),i=r("loadTransactions",{symbol:"ETH",address:a});return s.priceHistory.ETH&&s.priceHistory.ETH.CAD?i:c.a.all([i,o])},loadTransactions:function(t,e){var n=t.commit,r=e.symbol,a=e.address;if("ETH"!==r)return c.a.reject(p("invalid symbol: "+r));var o="https://api.etherscan.io/api?module=account&action=txlist&address="+a+"&sort=asc&apiKey=SHT8M9JSGR62U5U7YVFUSTPG41IVR1F7ND";return k.a.get(o).then(function(t){if("1"!==t.data.status)return c.a.reject(p("API request failed: "+t.data.message));var e=!0,o=!1,i=void 0;try{for(var u,d=m()(t.data.result);!(e=(u=d.next()).done);e=!0){var l=u.value;"0"===l.isError&&n("addTransaction",{date:s(l.timeStamp),to:l.to,from:l.from,value:new P.a(l.value),kind:r})}}catch(t){o=!0,i=t}finally{try{!e&&d.return&&d.return()}finally{if(o)throw i}}n("completeAccount",a)})},loadPriceHistory:function(t,e){var n=t.commit,r=e.fromSymbol,a=e.toSymbol,o={};n("addPriceHistory",{fromSymbol:r,toSymbol:a,history:o});var i="https://min-api.cryptocompare.com/data/histoday?fsym="+r+"&tsym="+a+"&limit=365";return k.a.get(i).then(function(t){var e=!0,i=!1,c=void 0;try{for(var u,d=m()(t.data.Data);!(e=(u=d.next()).done);e=!0){var l=u.value,v=s(l.time);o[v]=new P.a(l.close)}}catch(t){i=!0,c=t}finally{try{!e&&d.return&&d.return()}finally{if(i)throw c}}n("addPriceHistory",{fromSymbol:r,toSymbol:a,history:o})})}}});u.a.config.productionTip=!1,new u.a({el:"#app",router:S,store:j,render:function(t){return t(l)}});var q=function(t){return"CACHE::"+t.url},D=window.sessionStorage;k.a.interceptors.request.use(function(t){var e=q(t);if("get"!==t.method)return t;var n=D.getItem(e);return n?(t.adapter=function(){return c.a.resolve({data:JSON.parse(n),status:t.status,statusText:t.statusText,headers:t.headers,config:t,request:t})},t):t},function(t){return c.a.reject(p(t))}),k.a.interceptors.response.use(function(t){if(t.status>200||"get"!==t.config.method)return t;var e=q(t.config);return D.setItem(e,o()(t.data)),t},function(t){return c.a.reject(p(t))})},"Z9/S":function(t,e){},"jNa+":function(t,e){},zZ0b:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.baae0bfcb6b3469b2ff2.js.map