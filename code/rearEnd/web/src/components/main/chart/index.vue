<template>
  <div class="chart" ref="chart"></div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

import * as echarts from "echarts";
import axios from "axios";

export default defineComponent({
  setup() {
    const chart = ref(null) as unknown as Ref<HTMLElement>;
    return { chart };
  },
  async mounted() {
    let myChart = echarts.init(this.chart);
    let data = (
      await axios({
        url: "https://AntiMosquito.a102009102009.repl.co/api/pls&url=https://od.cdc.gov.tw/eic/Age_County_Gender_061.json",
        method: "GET",
      })
    ).data;
    console.log(data);
    myChart.setOption({});
  },
});
</script>

<style lang="scss" scoped>
.chart {
  width: 600px;
  height: 400px;
}
</style>
