<template>
  <table v-if="$store.state.txIncoming.length > 0">
    <thead>
      <td>Date</td>
      <td>From</td>
      <td colspan=2>
        Value
        ({{weiToEth($store.getters.totalValue('ETH'))}} ETH)
      </td>
      <td colspan=2>
        Conversion
        (${{weiToEth($store.getters.totalValue(symbolTo)).toFixed(2)}} {{symbolTo}})
      </td>
    </thead>
    <tbody>
      <tr v-for="tx in $store.state.txIncoming">
        <td class="date">{{tx.date}}</td>
        <td class="address">{{tx.from}}</td>
        <td class="value">{{weiToEth(tx.value)}}</td>
        <td class="kind">{{tx.kind}}</td>
        <td class="value">${{$store.getters.transactionPrice(tx, symbolTo).toNumber().toFixed(2)}}</td>
        <td class="kind">{{symbolTo}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import BN from 'bn.js';

const WEI_IN_ETH = new BN('1000000000000000000');
const ETH_DECIMALS = new BN('5');

export default {
  name: 'Transactions',
  data () {
    return {
      symbolTo: 'USD',
    };
  },
  methods: {
    weiToEth (wei) {
      return wei.mul(ETH_DECIMALS).div(WEI_IN_ETH).toNumber() / ETH_DECIMALS.toNumber();
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
