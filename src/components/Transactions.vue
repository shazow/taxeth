<template>
  <table v-if="$store.state.txIncoming.length > 0">
    <thead>
      <td>Date</td>
      <td>From</td>
      <td colspan=2>
        Value
        ({{weiToEth($store.getters.totalValue('ETH')).toFixed(3).toLocaleString()}} ETH)
      </td>
      <td colspan=2>
        Conversion
        ({{toCurrency(weiToEth($store.getters.totalValue(symbolTo)))}})
      </td>
    </thead>
    <tbody>
      <tr v-for="tx in $store.state.txIncoming">
        <td class="date">{{tx.date}}</td>
        <td class="address">{{tx.from}}</td>
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
      return n.toLocaleString('en-US', { style: 'currency', currency: this.symbolTo });
    },
  },
};
</script>

<style scoped>
thead {
  font-weight: bold;
}
td {
  padding: 0 0.2em;
}
td.value {
  text-align: right;
  padding-right: 0;
}
td.kind {
  padding-right: 0.4em;
}
td.address {
  color: rgba(0,0,125,0.4);
}
</style>
