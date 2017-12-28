<template>
  <table v-if="$store.getters.txIncoming.length > 0">
    <caption>
      Loaded <strong>{{weiToEth($store.getters.valueIncoming('ETH')).toFixed(3).toLocaleString()}} ETH</strong> inbound,
      worth <strong>{{toCurrency(weiToEth($store.getters.valueIncoming(symbolTo)))}}</strong> at the time of transacting.
    </caption>
    <thead>
      <tr>
        <td>Date</td>
        <td class="address">From</td>
        <td class="address">To</td>
        <td class="value">Value</td>
        <td></td>
        <td class="value">Conversion</td>
        <td></td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tx in $store.state.transactions">
        <td class="date">{{tx.date}}</td>
        <td class="address">{{tx.from}}</td>
        <td class="address">{{tx.to}}</td>
        <td class="value">{{weiToEth(tx.value).toFixed(3).toLocaleString()}}</td>
        <td class="kind">{{tx.kind}}</td>
        <td class="value">${{toCurrency($store.getters.transactionPrice(tx, symbolTo))}}</td>
        <td class="kind">{{symbolTo}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
const WEI_IN_ETH = '1000000000000000000';
const ETH_DECIMALS = 5;

export default {
  name: 'Transactions',
  data () {
    return {
      symbolTo: 'CAD',
    };
  },
  methods: {
    weiToEth (wei) {
      return wei.mul(ETH_DECIMALS).div(WEI_IN_ETH).toNumber() / ETH_DECIMALS;
    },
    toCurrency (n) {
      if (n === undefined) return n;
      return n.toLocaleString('en-US', { style: 'currency', currency: this.symbolTo });
    },
  },
};
</script>

<style scoped>
table {
   table-layout: fixed;
   border-collapse: collapse;
   width: 100%;
   min-width: 40em;
}
caption {
  margin: 1em 0;
}
thead td {
  font-weight: bold;
  color: #333;
}
td {
  padding: 0 0.2em;
  white-space: nowrap;
  overflow:hidden;
}
td.value {
  text-align: right;
  padding-right: 0;
}
td.kind {
  padding-right: 0.4em;
}
td.address {
  text-overflow: ellipsis;
  width: 6em;
  overflow: hidden;
}
</style>
