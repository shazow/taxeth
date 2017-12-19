<template>
  <table v-if="$store.state.transactions.length > 0">
    <thead>
      <td>Date</td>
      <td>From</td>
      <td colspan=2>Value</td>
      <td colspan=2>Conversion</td>
    </thead>
    <tbody>
      <tr v-for="tx in $store.state.transactions">
        <td class="date">{{tx.date}}</td>
        <td class="address">{{tx.from}}</td>
        <td class="value">{{tx.value.toNumber().toPrecision(3)}}</td>
        <td class="kind">{{tx.kind}}</td>
        <td class="value">${{$store.getters.priceByDate(tx.kind, 'USD', tx.date).toFixed(2)}}</td>
        <td class="kind">USD</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Transactions',
  data () {
    return {
    };
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
