<template>
  <div class="maps">
    <div class="map" ref="mapEl">
      <div class="info" ref="alertEl" v-show="showInfo">
        <div class="close" @click="showInfo = !showInfo">x</div>
        <div class="content" v-text="alertText" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";

import { apiUrl } from "@/config";

import Map from "./utils/map";
import { datasType, dataTypes } from "./utils/types";

const mapEl = ref<HTMLElement>();
const alertEl = ref<HTMLElement>();
const showInfo = ref<boolean>();
const alertText = ref<string>();

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
  source.addEventListener(
    "open",
    () => (alertText.value = "伺服器連線成功"),
    false
  );
  source.addEventListener(
    "close",
    () => (alertText.value = "伺服器斷開連線"),
    false
  );
});

let alertTextTimeout: NodeJS.Timeout;
watch(alertText, () => {
  if (!!alertText.value) {
    showInfo.value = true;
    clearTimeout(alertTextTimeout);
    alertTextTimeout = setTimeout(() => (alertText.value = ""), 2e3);
  } else showInfo.value = false;
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

    display: flex;
    justify-content: center;
    .info {
      position: absolute;
      top: 10px;
      border-radius: 5px;

      color: white;
      background-color: #000;
      padding: 1em;
      z-index: 1;
      .close {
        cursor: pointer;
        position: absolute;
        right: 3px;
        top: 0;
      }
      .content {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    :deep() {
      canvas {
        border-radius: 10px !important;
        overflow: hidden !important;
      }
      .ol-unselectable {
        &.ol-zoom {
          width: 1.5em;
          margin: 5px;
          div {
            flex-direction: column;
            display: flex;
          }
          button {
            cursor: pointer;
            width: 100%;
            color: white;
            background-color: #000;
            border: none;
            border-radius: 5px;
            margin: 5px 1px;
            padding: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            &.off,
            &.full {
              background-color: #00000080 !important;
            }
          }
        }
        &.ol-rotate,
        &.ol-attribution {
          display: none;
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
