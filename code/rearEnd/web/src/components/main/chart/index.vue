<template>
  <div class="chart" ref="chart"></div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

import * as echarts from "echarts";

export default defineComponent({
  setup() {
    const chart = ref(null) as unknown as Ref<HTMLElement>;
    return { chart };
  },
  mounted() {
    let myChart = echarts.init(this.chart);
    myChart.setOption({
      // title: { text: "地區年齡性別" },
      // tooltip: {},
      // legend: { data: ["男", "女"] },
      // xAxis: {
      //   data: ["0", "1", "2", "4", "5", "6"],
      // },
      // yAxis: {},
      // series: [{ name: "男", type: "bar", data: [5, 20, 36, 10, 10, 20] }],
    });
  },
});
</script>

<style lang="scss" scoped>
.chart {
  width: 600px;
  height: 400px;
}
</style>
