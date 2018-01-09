<template>
  <table v-if="$store.state.transactions.length > 0">
    <caption>
      Loaded <strong>{{totalEth}} ETH</strong> inbound across {{count}} transactions,
      worth <strong>${{totalFiat}} {{symbolTo}}</strong> at the time of transacting.
    </caption>
    <thead>
      <tr>
        <td>Date</td>
        <td class="address">From</td>
        <td class="address">To</td>
        <td class="value">Amount</td>
        <td></td>
        <td class="value">Converted</td>
        <td></td>
        <td class="value">Rate</td>
        <td></td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tx in $store.state.transactions">
        <td class="date">{{tx.date}}</td>
        <td class="address">{{tx.from}}</td>
        <td class="address">{{tx.to}}</td>
        <td class="value">{{txAmount(tx)}}</td>
        <td class="kind">{{tx.kind}}</td>
        <td class="value">{{txConverted(tx, symbolTo), $store.state.priceHistory}}</td>
        <td class="kind">{{symbolTo}}</td>
        <td class="value">{{txExchange(tx, symbolTo, $store.state.priceHistory)}}</td>
        <td class="kind">{{tx.kind}}{{symbolTo}}</td>
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
  computed: {
    totalEth () {
      return this.weiToEth(this.$store.getters.valueIncoming('ETH')).toFixed(3).toLocaleString();
    },
    totalFiat () {
      return this.toCurrency(this.weiToEth(this.$store.getters.valueIncoming(this.symbolTo)));
    },
    count () {
      return this.$store.getters.txIncoming.length;
    },
  },
  methods: {
    txAmount (tx) {
      return this.weiToEth(tx.value).toFixed(3).toLocaleString();
    },
    txExchange (tx, symbolTo) {
      return this.toCurrency(this.$store.getters.transactionPrice(tx, symbolTo));
    },
    txConverted (tx, symbolTo) {
      const price = this.$store.getters.transactionPrice(tx, symbolTo);
      if (!price) return;
      return this.toCurrency(this.weiToEth(tx.value.mul(price)), symbolTo);
    },
    weiToEth (wei) {
      return wei.mul(ETH_DECIMALS).div(WEI_IN_ETH).toNumber() / ETH_DECIMALS;
    },
    toCurrency (n) {
      if (n === undefined) return n;
      return n.toLocaleString();
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
