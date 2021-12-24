<template>
  <div class="chart" ref="DengueFeverCasesOverTheYearsHtml"></div>
  <div class="chart" ref="NumberOfDengueFeverCasesHtml"></div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue";

import * as echarts from "echarts";
import axios from "axios";
import { ApiAgeCountyGender061 } from "@/types/apiData";

export default defineComponent({
  setup() {
    const DengueFeverCasesOverTheYearsHtml = ref(
        null
      ) as unknown as Ref<HTMLElement>,
      NumberOfDengueFeverCasesHtml = ref(null) as unknown as Ref<HTMLElement>;
    return { DengueFeverCasesOverTheYearsHtml, NumberOfDengueFeverCasesHtml };
  },
  async mounted() {
    let data = (
      await axios({
        url: "https://antimosquito.a102009102009.repl.co/api/pls/?url=eic/Age_County_Gender_061.json",
        method: "GET",
      })
    ).data as ApiAgeCountyGender061[];
    let dictData: {
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
    let seriesData: { [year: string]: { F?: number; M?: number } } = {};
    Object.entries(dictData).forEach(([key, value]) => {
      seriesData[key] ||= {};
      seriesData[key]["F"] = value["F"]?.length;
      seriesData[key]["M"] = value["M"]?.length;
    });
    this.DengueFeverCasesOverTheYears(data, dictData, seriesData);
    this.NumberOfDengueFeverCases(data, dictData, seriesData);
  },
  methods: {
    async NumberOfDengueFeverCases(
      data: ApiAgeCountyGender061[],
      _dictData: {
        [year: string]: {
          F?: ApiAgeCountyGender061[];
          M?: ApiAgeCountyGender061[];
        };
      },
      seriesData: { [year: string]: { F?: number; M?: number } }
    ) {
      let myChart = echarts.init(this.NumberOfDengueFeverCasesHtml);
      // myChart.showLoading();
      myChart.setOption({
        title: { text: "登革熱年月病例數", left: "center" },
        grid: {
          top: "20%",
          left: "3%",
          right: "8%",
          bottom: "3%",
          containLabel: true,
        },
      });
      let dictData: { [year: string]: { [month: string]: number } } = {};
      data.forEach((v) => {
        let year = (dictData[v["發病年份"]] ||= {});
        year[v["發病月份"]] ||= 0;
        year[v["發病月份"]] += +v["確定病例數"];
      });
      myChart.setOption({
        tooltip: { trigger: "item", formatter: "{a}年{b}月<br/> {c}例" },
        xAxis: {
          type: "category",
          name: "月份",
          data: [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
          ],
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
    },
    async DengueFeverCasesOverTheYears(
      data: ApiAgeCountyGender061[],
      dictData: {
        [year: string]: {
          F?: ApiAgeCountyGender061[];
          M?: ApiAgeCountyGender061[];
        };
      },
      seriesData: { [year: string]: { F?: number; M?: number } }
    ) {
      let myChart = echarts.init(this.DengueFeverCasesOverTheYearsHtml);
      myChart.setOption({
        title: { text: "歷年登革熱病例數", left: "center" },
        legend: { orient: "vertical", left: "left", data: ["男", "女"] },
      });
      myChart.showLoading();
      Object.assign(window, { dictData, seriesData });

      myChart.hideLoading();
      myChart.setOption({
        tooltip: { trigger: "item", formatter: "{b}年<br/>{a}: {c}例" },
        xAxis: { name: "年", data: Object.keys(dictData) },
        yAxis: { name: "病例", minorSplitLine: { show: true } },
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
        grid: {
          top: "20%",
          left: "3%",
          right: "8%",
          bottom: "3%",
          containLabel: true,
        },
      });
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
