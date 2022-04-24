<template>
  <div class="chart" ref="DengueFeverCasesOverTheYearsHtml"></div>
  <div class="chart" ref="NumberOfDengueFeverCasesHtml"></div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

import * as echarts from "echarts";
import axios from "axios";
import { ApiAgeCountyGender061 } from "@/types/apiData";
import { apiUrl } from "@/config";

export default defineComponent({
  setup() {
    const DengueFeverCasesOverTheYearsHtml = ref(
        null
      ) as unknown as Ref<HTMLElement>,
      NumberOfDengueFeverCasesHtml = ref(null) as unknown as Ref<HTMLElement>;

    return { DengueFeverCasesOverTheYearsHtml, NumberOfDengueFeverCasesHtml };
  },
  data() {
    return {
      DengueFeverCasesOverTheYearsChart: <echarts.ECharts | undefined>undefined,
      NumberOfDengueFeverCasesChart: <echarts.ECharts | undefined>undefined,
    };
  },
  mounted() {
    (async () => {
      let { data } = await axios({ url: `${apiUrl}/data/seriesData.json` });

      this.DengueFeverCasesOverTheYearsChart = echarts.init(
        this.DengueFeverCasesOverTheYearsHtml
      );
      this.DengueFeverCasesOverTheYearsChart.showLoading();
      this.DengueFeverCasesOverTheYears(data as any);
    })().catch();
    (async () => {
      let { data } = await axios({ url: `${apiUrl}/data/FMData.json` });

      this.NumberOfDengueFeverCasesChart = echarts.init(
        this.NumberOfDengueFeverCasesHtml
      );
      this.NumberOfDengueFeverCasesChart.showLoading();
      this.NumberOfDengueFeverCases(data as any);
    })().catch();
  },
  methods: {
    async NumberOfDengueFeverCases(dictData: {
      [year: string]: { [month: string]: number };
    }) {
      this.NumberOfDengueFeverCasesChart?.setOption({
        title: { text: "登革熱年月病例數", left: "center" },
        grid: {
          top: "20%",
          left: "3%",
          right: "8%",
          bottom: "3%",
          containLabel: true,
        },
      });
      this.NumberOfDengueFeverCasesChart?.setOption({
        tooltip: { trigger: "item", formatter: "{a}年{b}月<br/> {c}例" },
        xAxis: {
          type: "category",
          name: "月份",
          data: [...Array(12).keys()].map((_) =>
            (_ + 1).toString().padStart(2, "0")
          ),
        },
        yAxis: { type: "log", name: "病例", minorSplitLine: { show: true } },
        legend: { orient: "vertical", left: "right", backgroundColor: "#fff" },
        series: Object.entries(dictData)
          .map(([k, v]) => ({
            name: k,
            type: "line",
            data: Object.values(v).map((v) => v || 0),
          }))
          .slice(-6),
      });
      this.NumberOfDengueFeverCasesChart?.hideLoading();
    },
    async DengueFeverCasesOverTheYears(FMData: {
      F: { [yarn: string]: number };
      M: { [yarn: string]: number };
    }) {
      this.DengueFeverCasesOverTheYearsChart?.setOption({
        title: { text: "歷年登革熱病例數", left: "center" },
        legend: { orient: "vertical", left: "left", data: ["男", "女"] },
      });

      this.DengueFeverCasesOverTheYearsChart?.setOption({
        tooltip: { trigger: "item", formatter: "{b}年<br/>{a}:{c}例" },
        xAxis: { name: "年", data: Object.keys(FMData.M) },
        yAxis: { name: "病例", minorSplitLine: { show: true } },
        series: [
          {
            name: "男",
            type: "bar",
            data: Object.entries(FMData.M).map(([key, value]) => [
              key.toString(),
              value,
            ]),
            itemStyle: { color: "#447ebe" },
          },
          {
            name: "女",
            type: "bar",
            data: Object.entries(FMData.F).map(([key, value]) => [
              key.toString(),
              value,
            ]),
            itemStyle: { color: "#be4444" },
          },
        ],
        grid: {
          top: "20%",
          left: "3%",
          right: "8%",
          bottom: "3%",
          containLabel: true,
        },
      });
      this.DengueFeverCasesOverTheYearsChart?.hideLoading();
    },
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
