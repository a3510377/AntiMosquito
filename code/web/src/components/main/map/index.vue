<template>
  <div class="maps flex flex-item-center">
    <div class="map" ref="mapEl">
      <div class="info" ref="info">
        <h1 class="title" v-text="title" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { apiUrl } from "@/config";

import Map from "./utils/map";
import { datasType, dataTypes } from "./utils/types";

const mapEl = ref<HTMLElement>();
const title = ref<string>();
let map: Map;
// MAP
onMounted(() => mapEl.value && (map = new Map(mapEl.value)));

// connect
onMounted(() => {
  let source = new EventSource(`${apiUrl}/api/v1/map/events`);
  source.addEventListener("set", ({ data: _data }) => {
    let data = <dataTypes>JSON.parse(_data);
    switch (data.type) {
      case "ram":
        map.rams = <datasType["ram"]>data.data;

        Object.assign(window, { test: map.map.getLayers().getArray() });
        Object.values(map.map.getLayers().getArray()).forEach((v) => {
          v.changed();
        });
        break;
    }
  });
  source.addEventListener("add", ({ data: _data }) => {
    let data = <datasType["count"]>JSON.parse(_data);

    switch (data.type) {
      case "count":
        let area = data.area;
        let mosquitos = data.mosquitos;

        let countyData = (map.rams[area.county] ||= { main: 0, data: {} });
        countyData.main ||= 0;
        countyData.main += mosquitos;
        countyData.data ||= {};

        let townData = countyData.data[area.town];
        townData.main ||= 0;
        townData.main += mosquitos;
        townData.data ||= {};
        townData.data[area.village] ||= 0;
        townData.data[area.village] += mosquitos;
        break;
    }

    Object.values(map.map.getLayers().getArray()).forEach((v) => {
      v.changed();
    });
  });
  source.addEventListener("open", () => {}, false);
  source.addEventListener("close", () => {}, false);
});
</script>

<style lang="scss" scoped>
.maps {
  width: 90%;
  height: 100%;
  padding: 10px 0;
  .map {
    height: 100%;
    width: 100%;
    position: relative;
    .info {
      border-radius: 10px;
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 99;
    }
    :deep() {
      canvas {
        border-radius: 10px !important;
        overflow: hidden !important;
      }
      .ol-attribution.ol-unselectable.ol-control.ol-uncollapsible {
        display: none;
      }
      .ol-zoom.ol-unselectable.ol-control {
        button {
          background-color: rgba(0, 60, 136, 0.6) !important;
        }
        .split:not(.nTop) {
          margin-top: 10px;
        }
        .off {
          background-color: rgba(0, 60, 136, 0.3) !important;
        }
      }
    }
    &:-moz-full-screen,
    &:-webkit-full-screen,
    &:-ms-fullscreen,
    &:fullscreen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
  @media all and (max-width: 930px) {
    flex-direction: column;
    .map {
      width: 100%;
    }
  }
}
</style>
