<template>
  <div class="chart" ref="chart"></div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

import * as echarts from "echarts";
import axios from "axios";
import { ApiAgeCountyGender061 } from "@/types/apiData";

export default defineComponent({
  setup() {
    const chart = ref(null) as unknown as Ref<HTMLElement>;
    return { chart };
  },
  async mounted() {
    let myChart = echarts.init(this.chart);
    myChart.showLoading();
    myChart.setOption({
      title: { text: "歷年登革熱病例數" },
      legend: { orient: "vertical", left: "right", data: ["男", "女"] },
    });
    let data = (
        await axios({
          url: "https://antimosquito.a102009102009.repl.co/api/pls/?url=eic/Age_County_Gender_061.json",
          method: "GET",
        })
      ).data as ApiAgeCountyGender061[],
      dictData: {
        [year: string]: {
          F?: ApiAgeCountyGender061[];
          M?: ApiAgeCountyGender061[];
        };
      } = {};

    data.forEach((v) => {
      let year = (dictData[v["發病年份"]] ||= {}),
        gender = (year[v["性別"]] ||= []);
      gender.push(v);
    });
    let seriesData: {
      [year: string]: { F?: number; M?: number };
    } = {};
    Object.entries(dictData).forEach(([key, value]) => {
      seriesData[key] ||= {};
      seriesData[key]["F"] = value["F"]?.length;
      seriesData[key]["M"] = value["M"]?.length;
    });
    Object.assign(window, { dictData, seriesData });

    myChart.hideLoading();
    myChart.setOption({
      xAxis: { data: Object.keys(dictData) },
      yAxis: [{ type: "value" }],
      series: [
        {
          name: "男",
          type: "bar",
          data: Object.values(seriesData).map((v) => v["F"]),
          itemStyle: { color: "#447ebe" },
        },
        {
          name: "女",
          type: "bar",
          data: Object.values(seriesData).map((v) => v["M"]),
          itemStyle: { color: "#be4444" },
        },
      ],
    });
  },
});
</script>

<style lang="scss" scoped>
.chart {
  width: 600px;
  height: 400px;
  background-color: white;
}
</style>
